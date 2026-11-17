"""Convert exported Elementor JSON (wp-export/raw/*.json) into readable markdown.

Usage: python3 -I scripts/elementor_to_md.py <raw_dir> <out_dir>
"""
import html
import json
import os
import re
import sys
from pathlib import Path

UPLOADS = "https://onegrowlearning.com/wp-content/uploads/"
TEMPLATE_RE = re.compile(r"\[elementor-template id=\"(\d+)\"\]")

SLUGS = {}  # page id -> slug
images = {}  # url -> set(page)
templates_used = {}  # template id -> set(page)


def strip_html(s):
    if not s:
        return ""
    s = re.sub(r"<br\s*/?>", "\n", s, flags=re.I)
    s = re.sub(r"</(p|div|li|h\d|tr)>", "\n", s, flags=re.I)
    s = re.sub(r"<li[^>]*>", "- ", s, flags=re.I)
    s = re.sub(r"<[^>]+>", "", s)
    s = html.unescape(s).replace("\xa0", " ")
    lines = [l.strip() for l in s.splitlines()]
    out, blank = [], False
    for l in lines:
        if not l:
            if not blank and out:
                out.append("")
            blank = True
        else:
            out.append(l)
            blank = False
    return "\n".join(out).strip()


def img(url, page):
    if url:
        images.setdefault(url, set()).add(page)
        return url.replace(UPLOADS, "uploads/")
    return ""


def link_of(s, key="link"):
    v = s.get(key)
    if isinstance(v, dict) and v.get("url"):
        return v["url"]
    dyn = (s.get("__dynamic__") or {}).get(key, "")
    if "popup" in dyn:
        m = re.search(r"popup%22%3A%22(\d+)", dyn)
        return f"(opens popup #{m.group(1)})" if m else "(opens popup)"
    m = re.search(r"post_id%22%3A%22(\d+)", dyn)
    if m:
        slug = SLUGS.get(m.group(1))
        return f"/{slug}/" if slug else f"(internal page #{m.group(1)})"
    if dyn:
        return "(dynamic link)"
    return ""


def visibility(s):
    hidden = [d for d in ("desktop", "tablet", "mobile") if s.get(f"hide_{d}")]
    return f" _[hidden on {', '.join(hidden)}]_" if hidden else ""


def note_templates(text, page):
    for tid in TEMPLATE_RE.findall(text or ""):
        templates_used.setdefault(tid, set()).add(page)


def widget(e, page, depth):
    s = e.get("settings") or {}
    if not isinstance(s, dict):
        s = {}
    w = e.get("widgetType")
    vis = visibility(s)
    out = []
    if w == "heading":
        lvl = {"h1": 1, "h2": 2, "h3": 3, "h4": 4, "h5": 5, "h6": 6}.get(s.get("header_size", "h2"), 2)
        t = strip_html(s.get("title", ""))
        if t:
            out.append("#" * min(lvl + 1, 6) + " " + t.replace("\n", " ") + vis)
    elif w == "elementskit-heading":
        if s.get("ekit_heading_sub_title"):
            out.append(f"_{strip_html(s['ekit_heading_sub_title'])}_")
        out.append("### " + strip_html(s.get("ekit_heading_title", "")) + vis)
    elif w == "animated-headline":
        out.append(
            f"## {strip_html(s.get('before_text',''))} [{s.get('highlighted_text') or ' / '.join((s.get('rotating_text') or '').split(chr(10)))}]{vis}"
        )
    elif w == "text-editor":
        note_templates(s.get("editor"), page)
        t = strip_html(s.get("editor", ""))
        if t:
            out.append(t + vis)
    elif w == "button":
        out.append(f"[Button: {strip_html(s.get('text','')) or '(no text)'}] -> {link_of(s) or '(no link)'}{vis}")
    elif w == "image":
        u = (s.get("image") or {}).get("url")
        cap = s.get("caption") or (s.get("image") or {}).get("alt") or ""
        lk = link_of(s)
        out.append(f"![{cap}]({img(u, page)})" + (f" -> {lk}" if lk else "") + vis)
    elif w == "image-box":
        u = (s.get("image") or {}).get("url")
        out.append(f"- ![]({img(u, page)}) **{strip_html(s.get('title_text',''))}** {strip_html(s.get('description_text',''))}{vis}".rstrip())
    elif w == "icon-box":
        out.append(f"- **{strip_html(s.get('title_text',''))}**: {strip_html(s.get('description_text',''))}{vis}")
    elif w == "icon-list":
        for it in s.get("icon_list", []):
            lk = link_of(it)
            out.append(f"- {strip_html(it.get('text',''))}" + (f" -> {lk}" if lk else ""))
        if vis:
            out.append(vis.strip())
    elif w == "icon":
        lk = link_of(s)
        if lk:
            out.append(f"[Icon link] -> {lk}{vis}")
    elif w == "divider":
        return []
    elif w == "elementskit-accordion":
        for it in s.get("ekit_accordion_items", []):
            note_templates(it.get("acc_content"), page)
            out.append(f"**{strip_html(it.get('acc_title',''))}**\n\n{strip_html(it.get('acc_content',''))}")
        if vis:
            out.append(vis.strip())
    elif w == "elementskit-simple-tab":
        for it in s.get("ekit_tab_items", []):
            note_templates(it.get("ekit_tab_content"), page)
            out.append(f"**Tab: {strip_html(it.get('ekit_tab_title',''))}**\n\n{strip_html(it.get('ekit_tab_content',''))}")
    elif w == "form":
        fields = []
        for f in s.get("form_fields", []):
            label = f.get("field_label") or f.get("placeholder") or f.get("custom_id")
            ftype = f.get("field_type", "text")
            opts = f.get("field_options")
            req = " *" if f.get("required") else ""
            fields.append(f"  - {label} ({ftype}{req})" + (f": {' | '.join(opts.splitlines())}" if opts else ""))
        actions = ", ".join(s.get("submit_actions", []))
        out.append(
            f"**Form: {s.get('form_name','')}** (submit: \"{s.get('button_text','Send')}\"; actions: {actions}"
            + (f"; redirect: {s.get('redirect_to')}" if s.get("redirect_to") else "")
            + f"){vis}\n" + "\n".join(fields)
        )
    elif w == "video":
        out.append(f"[Video] {s.get('youtube_url') or (s.get('hosted_url') or {}).get('url','')}{vis}")
    elif w == "image-carousel":
        out.append("Image carousel: " + ", ".join(img(c.get("url"), page) for c in s.get("carousel", [])) + vis)
    elif w == "elementskit-team":
        u = (s.get("ekit_team_image") or {}).get("url")
        out.append(f"- ![]({img(u, page)}) **{s.get('ekit_team_name','')}**, {s.get('ekit_team_position','')}{vis}")
    elif w == "elementskit-testimonial":
        for t in s.get("ekit_testimonial_data", []):
            u = (t.get("client_photo") or {}).get("url")
            out.append(f"> {strip_html(t.get('review',''))}\n> - {t.get('client_name','')}" + (f", {t['designation']}" if t.get("designation") else "") + (f" ![]({img(u, page)})" if u else ""))
    elif w == "social-icons":
        for it in s.get("social_icon_list", []):
            out.append(f"- {(it.get('social_icon') or {}).get('value','')} -> {link_of(it)}")
    elif w == "html":
        out.append("```html\n" + s.get("html", "").strip() + "\n```")
    elif w == "navigation-menu":
        out.append("[Navigation menu]")
    elif w in ("nested-tabs", "nested-carousel"):
        titles = [t.get("tab_title") or t.get("slide_title") for t in (s.get("tabs") or s.get("carousel_items") or [])]
        label = "Tab" if w == "nested-tabs" else "Slide"
        for i, child in enumerate(e.get("elements", [])):
            title = titles[i] if i < len(titles) else f"{label} {i+1}"
            out.append(f"**{label}: {strip_html(title or '')}**{vis if i == 0 else ''}")
            out.extend(walk([child], page, depth + 1))
        return out
    else:
        out.append(f"[Unhandled widget: {w}]")
    return out


def walk(nodes, page, depth=0):
    out = []
    for e in nodes:
        if e.get("elType") == "widget":
            out.extend(widget(e, page, depth))
        else:
            s = e.get("settings") or {}
            if not isinstance(s, dict):
                s = {}
            bg = (s.get("background_image") or {}).get("url")
            if bg:
                out.append(f"_[section background: {img(bg, page)}]_")
            vis = visibility(s)
            inner = walk(e.get("elements", []), page, depth + 1)
            if vis and inner:
                out.append(f"<!-- block{vis} -->")
            out.extend(inner)
            if depth == 0 and inner:
                out.append("---")
    return out


def main(raw_dir, out_dir):
    raw_dir, out_dir = Path(raw_dir), Path(out_dir)
    meta = json.loads((raw_dir / "_meta.json").read_text())
    for f in raw_dir.glob("page__*.json"):
        _, pid, slug = f.stem.split("__", 2)
        SLUGS[pid] = slug
    for f in sorted(raw_dir.glob("*.json")):
        if f.name.startswith("_"):
            continue
        ptype, pid, slug = f.stem.split("__", 2)
        info = meta.get(pid, {})
        page = slug
        body = walk(json.loads(f.read_text() or "[]"), page)
        sub = {"page": "pages", "elementor_library": "templates", "elementor-hf": "header-footer"}[ptype]
        dest = out_dir / sub / f"{slug}.md"
        dest.parent.mkdir(parents=True, exist_ok=True)
        head = [
            f"# {html.unescape(info.get('title', slug))}",
            "",
            f"- WP ID: {pid}",
            f"- URL: https://onegrowlearning.com/{slug}/" if ptype == "page" else f"- Type: {ptype}",
        ]
        for k in ("seo_title", "seo_desc"):
            if info.get(k):
                head.append(f"- {k}: {info[k]}")
        dest.write_text("\n".join(head) + "\n\n" + "\n\n".join(body).replace("\n---\n\n---", "\n---") + "\n")
    (out_dir / "_images_used.json").write_text(json.dumps({k: sorted(v) for k, v in sorted(images.items())}, indent=1))
    (out_dir / "_templates_embedded.json").write_text(json.dumps({k: sorted(v) for k, v in templates_used.items()}, indent=1))
    print("pages written; images referenced:", len(images), "; embedded templates:", sorted(templates_used))


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])
