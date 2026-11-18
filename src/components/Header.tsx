"use client";

import { asset } from "@/lib/asset";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { nav, site } from "@/data/site";
import { useEnquiry } from "./Enquiry";
import { CloseIcon, MenuIcon, PhoneIcon } from "./icons";

// The floating header takes 76px (pt-3 + h-16). Pages with a dark hero use -mt-[76px] to sit under it.
export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const enquire = useEnquiry();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-4">
      <div
        className={`relative mx-auto flex h-16 max-w-site items-center gap-4 rounded-2xl bg-white/95 pr-2 pl-4 backdrop-blur transition-shadow sm:pl-5 ${
          scrolled ? "shadow-lift" : "shadow-card"
        }`}
      >
        <Link href="/" className="shrink-0" aria-label="Onegrow Learning home" onClick={() => setOpen(false)}>
          <Image src={asset("/images/brand/logo-dark.png")} alt="Onegrow Learning" width={640} height={209} className="h-9 w-auto" preload />
        </Link>

        <nav aria-label="Main" className="ml-auto hidden lg:block">
          <ul className="flex items-center">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="rounded-full px-3.5 py-2 text-[15px] font-medium text-ink/75 transition hover:text-navy">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-1.5 lg:ml-2">
          <a href={site.phoneHref} className="hidden items-center gap-2 rounded-full px-3 py-2 text-[15px] font-semibold text-navy hover:bg-peach xl:inline-flex">
            <PhoneIcon className="size-4 text-brand" />
            {site.phone}
          </a>
          <button
            type="button"
            onClick={() => enquire({ source: "Header" })}
            className="hidden rounded-xl bg-brand px-5 py-2.5 text-[15px] font-semibold text-white transition hover:bg-brand-dark sm:inline-flex"
          >
            Apply now
          </button>
          <a href={site.phoneHref} className="grid size-11 place-items-center rounded-xl bg-peach text-brand sm:hidden" aria-label={`Call ${site.phone}`}>
            <PhoneIcon className="size-5" />
          </a>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-xl text-navy hover:bg-peach lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
          </button>
        </div>

        {open && (
          <div id="mobile-menu" className="absolute inset-x-0 top-full mt-2 rounded-2xl bg-white p-4 shadow-lift lg:hidden">
            <nav aria-label="Mobile">
              <ul className="divide-y divide-line">
                {[{ label: "Home", href: "/" }, ...nav].map((n) => (
                  <li key={n.href}>
                    <Link href={n.href} onClick={() => setOpen(false)} className="block py-3.5 text-lg font-semibold text-navy">
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-4 grid gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  enquire({ source: "Mobile menu" });
                }}
                className="rounded-xl bg-brand px-5 py-3.5 text-base font-semibold text-white"
              >
                Get free counselling
              </button>
              <a href={site.phoneHref} className="rounded-xl border border-line px-5 py-3.5 text-center text-base font-semibold text-navy">
                Call {site.phone}
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
