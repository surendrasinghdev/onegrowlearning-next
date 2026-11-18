// Extracts the Privacy Policy and Terms & Conditions text from the old Elementor pages into
// src/data/legal.json as clean HTML (only basic tags, no inline styles). Run: node scripts/extract-legal.mjs
import { readFileSync, writeFileSync } from "node:fs";

const pages = {
  privacy: "wp-export/raw/page__3821__privacy-policy.json",
  terms: "wp-export/raw/page__3443__terms-conditions.json",
};

function editorHtml(nodes, out = []) {
  for (const e of nodes) {
    const s = e.settings && !Array.isArray(e.settings) ? e.settings : {};
    if (s.hide_desktop) continue;
    if (e.widgetType === "text-editor") out.push(s.editor);
    editorHtml(e.elements || [], out);
  }
  return out;
}

const ALLOWED = new Set(["p", "h2", "h3", "ul", "ol", "li", "strong", "em", "a", "br"]);
const RENAME = { b: "strong", i: "em", h1: "h2", h4: "h3", h5: "h2", h6: "h3" };

function sanitize(html) {
  let out = html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, "")
    .replace(/<(\/?)([a-z0-9]+)([^>]*)>/gi, (_, slash, tag, attrs) => {
      tag = tag.toLowerCase();
      tag = RENAME[tag] ?? tag;
      if (!ALLOWED.has(tag)) return "";
      if (tag === "a" && !slash) {
        const href = attrs.match(/href\s*=\s*"([^"]+)"/i)?.[1] ?? "";
        const safe = /^(https?:|mailto:|tel:|\/)/i.test(href) ? href : "#";
        const external = /^https?:/i.test(safe) && !safe.includes("onegrowlearning.com");
        return `<a href="${safe}"${external ? ' target="_blank" rel="noopener noreferrer"' : ""}>`;
      }
      return `<${slash}${tag}>`;
    })
    .replace(/&nbsp;| /g, " ")
    .replace(/Onrgrow/g, "Onegrow")
    .replace(/—|–/g, "-")
    // headings that only wrapped bold text
    .replace(/<(h2|h3)>\s*<strong>([\s\S]*?)<\/strong>\s*<\/\1>/g, "<$1>$2</$1>")
    .replace(/<p>\s*(<br>)?\s*<\/p>/g, "")
    .replace(/<strong>\s*<\/strong>/g, "")
    .replace(/\s{2,}/g, " ");
  return out.trim();
}

const result = {};
for (const [key, file] of Object.entries(pages)) {
  const html = sanitize(editorHtml(JSON.parse(readFileSync(file, "utf8"))).join("\n"));
  result[key] = html;
  console.log(key, `${html.length} chars`, `h2:${(html.match(/<h2>/g) || []).length}`, `p:${(html.match(/<p>/g) || []).length}`);
}
writeFileSync("src/data/legal.json", JSON.stringify(result) + "\n");
