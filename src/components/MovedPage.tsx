import Link from "next/link";
import { basePath } from "@/lib/asset";
import { container } from "./blocks";

/**
 * Stand-in for an old WordPress URL that no longer has its own page. The server build
 * redirects these in next.config.ts; this page covers the static GitHub Pages build,
 * where redirects don't run, by sending the browser on with a meta refresh.
 */
export function MovedPage({ to = "/", label = "the homepage" }: { to?: string; label?: string }) {
  return (
    <section className={`${container} py-24 text-center`}>
      <meta httpEquiv="refresh" content={`0; url=${basePath}${to}`} />
      <h1 className="text-3xl font-bold text-navy">This page has moved</h1>
      <p className="mt-3 text-muted">
        Taking you to{" "}
        <Link href={to} className="font-semibold text-brand">
          {label}
        </Link>
        ...
      </p>
    </section>
  );
}
