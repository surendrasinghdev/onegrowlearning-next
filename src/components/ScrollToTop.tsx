"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Next.js keeps the old scroll position after a link click whenever the new page is
 * already "visible" (our pages all start at the very top, so they always are). That made
 * course pages open half-way down. This sends every new page to the top instead,
 * except for browser back/forward (which should restore the old position) and links
 * to a #section.
 */
export function ScrollToTop() {
  const pathname = usePathname();
  const isFirst = useRef(true);
  const isHistoryNav = useRef(false);

  useEffect(() => {
    const onPop = () => (isHistoryNav.current = true);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    if (isHistoryNav.current) {
      isHistoryNav.current = false;
      return;
    }
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
