// Pulls structured course content (overview, advantages, careers, curriculum, specialisations,
// admission, FAQs) out of the old Elementor pages in wp-export/raw and writes
// src/data/course-content.json. Run: node scripts/extract-courses.mjs
//
// Only the desktop version of each section is read; Elementor kept separate copies for mobile.
// Fees are NOT taken from here: the old fees were out of date (see src/data/courses.ts).
import { readFileSync, readdirSync, writeFileSync } from "node:fs";

const RAW = "wp-export/raw";
const OUT = "src/data/course-content.json";

const decode = (s) =>
  s
    .replace(/&nbsp;| /g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#8217;|&rsquo;/g, "’")
    .replace(/&#8216;|&lsquo;/g, "‘")
    .replace(/&#8220;|&ldquo;/g, "“")
    .replace(/&#8221;|&rdquo;/g, "”")
    .replace(/&#8211;|&ndash;/g, "-")
    .replace(/&#8212;|&mdash;/g, "-")
    .replace(/&quot;/g, '"')
    .replace(/&#039;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    // spelling mistakes carried on the old site (see CORRECTIONS.md)
    .replace(/Dregree/g, "Degree")
    .replace(/Managment/g, "Management")
    .replace(/Enterpreneurship/g, "Entrepreneurship")
    .replace(/Word Education Services/g, "World Education Services")
    .replace(/Onrgrow/g, "Onegrow");

/** HTML -> clean text lines (one per paragraph / list item / line break). */
function lines(html = "") {
  return decode(
    html
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/(p|div|li|h\d|tr)>/gi, "\n")
      .replace(/<[^>]+>/g, ""),
  )
    .split("\n")
    .map((l) => l.replace(/\s+/g, " ").replace(/\s+([,.])/g, "$1").trim())
    .filter((l) => l && !/^\[elementor-template/.test(l));
}
const text = (html) => lines(html).join(" ").trim();
const tidy = (s = "") => decode(s).replace(/\s+/g, " ").replace(/—|–/g, "-").trim();

const hiddenOnDesktop = (s) => !!s?.hide_desktop;
const settingsOf = (e) => (e.settings && !Array.isArray(e.settings) ? e.settings : {});

/** Flatten visible widgets in order, remembering the latest heading and any enclosing tab title. */
function flatten(nodes, ctx = { tab: null }, out = []) {
  for (const e of nodes) {
    const s = settingsOf(e);
    if (hiddenOnDesktop(s)) continue;
    if (e.elType === "widget" && e.widgetType === "nested-tabs") {
      const titles = (s.tabs || []).map((t) => tidy(t.tab_title));
      (e.elements || []).forEach((child, i) => flatten([child], { tab: titles[i] || `Tab ${i + 1}` }, out));
      continue;
    }
    if (e.elType === "widget") out.push({ w: e.widgetType, s, tab: ctx.tab });
    flatten(e.elements || [], ctx, out);
  }
  return out;
}

function extract(json) {
  const widgets = flatten(json);
  let section = "";
  const data = {
    overview: "",
    advantages: [],
    jobProfiles: [],
    industries: [],
    curriculum: {},
    specialisations: {},
    admissionCriteria: [],
    faqs: [],
  };
  const push = (obj, key, items) => {
    if (!items.length) return;
    obj[key] = obj[key] || [];
    for (const it of items) if (!obj[key].includes(it)) obj[key].push(it);
  };

  for (const { w, s, tab } of widgets) {
    if (w === "heading") {
      const t = tidy(text(s.title));
      if (t.length > 8) section = t;
      continue;
    }
    const sec = section.toLowerCase();
    const semesterTab = tab && /^semester\s*\d/i.test(tab) ? tab.replace(/\s+/g, " ") : null;

    if (w === "text-editor") {
      const ls = lines(s.editor);
      if (!data.overview && text(s.editor).length > 140 && !/faq|question/i.test(sec)) data.overview = text(s.editor);
      if (semesterTab) push(data.curriculum, semesterTab, ls);
      else if (tab && /elective|speciali/.test(sec)) push(data.specialisations, tab, ls);
      else if (tab && /job profile/i.test(tab)) data.jobProfiles.push(...ls);
      else if (tab && /industr/i.test(tab)) data.industries.push(...ls);
      else if (/admission criteria/.test(sec)) data.admissionCriteria.push(...ls);
    } else if (w === "icon-list") {
      const ls = (s.icon_list || []).map((i) => tidy(text(i.text))).filter(Boolean);
      if (tab && /job profile/i.test(tab)) data.jobProfiles.push(...ls);
      else if (tab && /industr/i.test(tab)) data.industries.push(...ls);
      else if (semesterTab) push(data.curriculum, semesterTab, ls);
      else if (tab && /elective|speciali/.test(sec)) push(data.specialisations, tab, ls);
      else if (/admission criteria/.test(sec)) data.admissionCriteria.push(...ls);
    } else if (w === "icon-box" || w === "image-box") {
      const title = tidy(text(s.title_text));
      const body = tidy(text(s.description_text));
      if (/advantage/.test(sec) && title && body) data.advantages.push({ title, body });
    } else if (w === "elementskit-accordion") {
      for (const it of s.ekit_accordion_items || []) {
        const title = tidy(it.acc_title);
        const body = lines(it.acc_content);
        if (/^semester\s*\d/i.test(title)) push(data.curriculum, title.replace(/\s+/g, " "), body);
        else if (/\?\s*$/.test(title) || /faq|question/.test(sec)) {
          const q = title.replace(/^\d+\s*\.\s*/, "");
          if (q && body.length && !data.faqs.some((f) => f.q === q)) data.faqs.push({ q, a: body });
        }
      }
    }
  }

  const uniq = (a) => [...new Set(a.map(tidy))].filter((x) => x.length > 1);
  data.jobProfiles = uniq(data.jobProfiles);
  data.industries = uniq(data.industries);
  data.admissionCriteria = uniq(data.admissionCriteria);
  data.overview = tidy(data.overview);
  // Old pages had placeholder "Project"-only or empty tabs; keep tabs with real subjects.
  for (const k of Object.keys(data.specialisations)) if (data.specialisations[k].length < 2) delete data.specialisations[k];
  for (const k of Object.keys(data.curriculum)) data.curriculum[k] = uniq(data.curriculum[k]);
  return data;
}

const COURSE = /^page__\d+__(.+)\.json$/;
const skip = new Set(["about-us", "contact-us", "homepage", "our-partners", "popular-programs", "privacy-policy", "terms-conditions", "thank-you-page", "circle-of-excellence-referee", "pg-in-entrepreneurship-welingker-institute"]);
const result = {};
for (const f of readdirSync(RAW).sort()) {
  const m = f.match(COURSE);
  // Only Manipal University Jaipur and Sikkim Manipal University are partners; skip the old Shoolini pages.
  if (!m || skip.has(m[1]) || m[1].startsWith("shoolini-")) continue;
  result[m[1]] = extract(JSON.parse(readFileSync(`${RAW}/${f}`, "utf8")));
}
writeFileSync(OUT, JSON.stringify(result, null, 1) + "\n");
for (const [slug, d] of Object.entries(result)) {
  console.log(
    slug.padEnd(62),
    `ov:${d.overview.length} adv:${d.advantages.length} jobs:${d.jobProfiles.length} ind:${d.industries.length} sem:${Object.keys(d.curriculum).length}(${Object.values(d.curriculum).map((v) => v.length).join("/")}) spec:${Object.keys(d.specialisations).length} adm:${d.admissionCriteria.length} faq:${d.faqs.length}`,
  );
}
