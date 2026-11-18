"use client";

import { useEffect, useState } from "react";

/** Sticky in-page navigation that highlights the section in view. */
export function SectionNav({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-140px 0px -55% 0px" },
    );
    items.forEach((i) => {
      const el = document.getElementById(i.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="On this page" className="sticky top-[84px] z-30 border-b border-line bg-white lg:bg-white/90 lg:backdrop-blur">
      <ul className="no-scrollbar mx-auto flex max-w-site-px gap-1 overflow-x-auto px-4 py-2.5 sm:px-6 lg:px-8">
        {items.map((i) => (
          <li key={i.id}>
            <a
              href={`#${i.id}`}
              aria-current={active === i.id ? "true" : undefined}
              className={`block rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap transition ${
                active === i.id ? "bg-navy text-white" : "text-ink/70 hover:bg-peach hover:text-navy"
              }`}
            >
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
