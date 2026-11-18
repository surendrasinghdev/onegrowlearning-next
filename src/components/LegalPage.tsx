import { container, PageHero } from "./blocks";
import { site } from "@/data/site";

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/&amp;/g, "and")
    .replace(/<[^>]+>/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}

/** Long-form legal text (Privacy Policy, Terms) with a table of contents. */
export function LegalPage({ title, crumb, sub, html }: { title: string; crumb: string; sub: string; html: string }) {
  const toc: { id: string; label: string }[] = [];
  const body = html.replace(/<h2>([\s\S]*?)<\/h2>/g, (_, inner: string) => {
    const label = inner.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").trim();
    let id = slugify(inner) || `section-${toc.length + 1}`;
    if (toc.some((t) => t.id === id)) id = `${id}-${toc.length + 1}`;
    toc.push({ id, label });
    return `<h2 id="${id}">${inner}</h2>`;
  });

  return (
    <>
      <PageHero crumb={crumb} eyebrow="Legal" title={title} sub={sub} />
      <section className="py-16 sm:py-20">
        <div className={`${container} grid gap-10 lg:grid-cols-[280px_1fr]`}>
          <aside className="lg:sticky lg:top-28 lg:max-h-[calc(100vh-8rem)] lg:self-start lg:overflow-y-auto">
            <details className="group rounded-3xl bg-white p-5 ring-1 ring-line lg:open:block" open>
              <summary className="cursor-pointer list-none font-semibold text-navy [&::-webkit-details-marker]:hidden">On this page ({toc.length})</summary>
              <ol className="mt-3 space-y-1.5 text-sm">
                {toc.map((t) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`} className="block rounded-lg px-2 py-1 text-ink/70 hover:bg-peach hover:text-navy">
                      {t.label}
                    </a>
                  </li>
                ))}
              </ol>
            </details>
          </aside>
          <article
            className="min-w-0 rounded-3xl bg-white p-6 text-[15px] leading-relaxed text-ink/80 ring-1 ring-line sm:p-10 [&_a]:font-semibold [&_a]:break-all [&_a]:text-brand [&_h2]:mt-10 [&_h2]:scroll-mt-28 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-navy [&_h2:first-child]:mt-0 [&_h3]:mt-6 [&_h3]:font-semibold [&_h3]:text-navy [&_li]:mt-1.5 [&_ol]:mt-3 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mt-3 [&_strong]:text-ink [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-6"
            // Trusted content: our own legal text, sanitised by scripts/extract-legal.mjs
            dangerouslySetInnerHTML={{ __html: body }}
          />
        </div>
        <p className={`${container} mt-8 text-sm text-muted`}>
          Questions about this page? Email us at{" "}
          <a href={`mailto:${site.email}`} className="font-semibold text-brand">
            {site.email}
          </a>
          .
        </p>
      </section>
    </>
  );
}
