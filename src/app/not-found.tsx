import Link from "next/link";
import { container } from "@/components/blocks";
import { ArrowRightIcon } from "@/components/icons";

export default function NotFound() {
  const links = [
    { href: "/", label: "Home" },
    { href: "/popular-programs/", label: "All programs" },
    { href: "/our-partners/", label: "Universities" },
    { href: "/contact-us/", label: "Contact us" },
  ];
  return (
    <section className="relative -mt-[76px] overflow-hidden bg-navy-deep pt-[76px] text-white">
      <div aria-hidden="true" className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_70%)]" />
      <div aria-hidden="true" className="absolute -top-32 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-brand/25 blur-[120px]" />
      <div className={`${container} relative py-24 text-center sm:py-32`}>
        <p className="font-display text-8xl font-bold text-amber sm:text-9xl">404</p>
        <h1 className="mt-4 text-3xl font-bold sm:text-5xl">This page took a different path</h1>
        <p className="mx-auto mt-4 max-w-lg text-lg text-white/70">The page you&apos;re looking for doesn&apos;t exist or has moved. These links will get you back on track.</p>
        <ul className="mt-10 flex flex-wrap justify-center gap-3">
          {links.map((l, i) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`inline-flex items-center gap-2 rounded-xl px-6 py-3.5 font-semibold ${i === 0 ? "bg-brand text-white hover:bg-brand-dark" : "border border-white/25 text-white hover:bg-white/10"}`}
              >
                {l.label} {i === 0 && <ArrowRightIcon className="size-4" />}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
