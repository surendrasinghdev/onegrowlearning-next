"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRightIcon } from "./icons";

/**
 * Horizontal, swipeable row with previous/next buttons. Children should be <li> items;
 * give them a fixed width (e.g. w-[85%] sm:w-[45%] lg:w-[calc(25%-15px)]).
 */
export function Carousel({
  label,
  children,
  dark,
  header,
}: {
  label: string;
  children: React.ReactNode;
  dark?: boolean;
  /** Shown on the left of the previous/next buttons, usually the section heading. */
  header?: React.ReactNode;
}) {
  const ref = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setAtStart(el.scrollLeft < 8);
    setAtEnd(el.scrollLeft + el.clientWidth > el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    update();
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [update, children]);

  const scroll = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: "smooth" });
  };

  const btn = `grid size-11 place-items-center rounded-full border transition disabled:opacity-30 ${
    dark ? "border-white/20 text-white hover:bg-white/10" : "border-line bg-white text-navy hover:border-navy/30"
  }`;

  return (
    <div>
      <div className="flex items-end justify-between gap-6">
        <div className="min-w-0 flex-1">{header}</div>
        <div className={`flex shrink-0 gap-2 ${atStart && atEnd ? "invisible" : ""}`}>
          <button type="button" className={btn} onClick={() => scroll(-1)} disabled={atStart} aria-label={`Previous ${label}`}>
            <ArrowRightIcon className="size-5 rotate-180" />
          </button>
          <button type="button" className={btn} onClick={() => scroll(1)} disabled={atEnd} aria-label={`Next ${label}`}>
            <ArrowRightIcon className="size-5" />
          </button>
        </div>
      </div>
      <ul
        ref={ref}
        onScroll={update}
        aria-label={label}
        className="no-scrollbar -mx-4 mt-5 flex snap-x snap-mandatory scroll-px-4 gap-5 overflow-x-auto px-4 pt-3 pb-4 sm:-mx-6 sm:scroll-px-6 sm:px-6 lg:mx-0 lg:scroll-px-0 lg:px-0"
      >
        {children}
      </ul>
    </div>
  );
}
