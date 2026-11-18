"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { courseHref, courses, formatDuration, levelLabels, universities, uniTone, type Course, type Level, type UniversityId } from "@/data/courses";
import { ArrowRightIcon, ClockIcon } from "./icons";

type Filter = { kind: "level"; value: "all" | Level } | { kind: "uni"; value: UniversityId };

const levelItems: { value: "all" | Level; label: string }[] = [
  { value: "all", label: "All degrees" },
  { value: "pg", label: levelLabels.pg },
  { value: "ug", label: levelLabels.ug },
];
const uniOrder: UniversityId[] = ["muj", "smu"];

// Order the degree cards so the most asked-for programs come first.
const typeOrder = ["MBA", "MCA", "BBA", "BCA", "M.Com", "B.Com", "MA English", "MA Economics", "MA JMC", "MA Sociology", "MA Pol. Science", "BA", "PG Media", "PGP-EFMB"];

type DegreeType = { code: string; name: string; tag: string; duration: number; options: Course[] };

/** One card per degree (e.g. "MBA"), listing every university that offers it. */
function degreeTypes(filter: Filter): DegreeType[] {
  const list = courses.filter((c) => (filter.kind === "uni" ? c.university === filter.value : filter.value === "all" || c.level === filter.value));
  const map = new Map<string, DegreeType>();
  for (const c of list) {
    const t = map.get(c.code);
    if (t) t.options.push(c);
    else
      map.set(c.code, {
        code: c.code,
        name: c.name,
        tag: c.mode === "Online" ? `Online ${c.code.split(" ")[0]}` : "On campus",
        duration: c.durationMonths,
        options: [c],
      });
  }
  const rank = (code: string) => (typeOrder.indexOf(code) + 1 || 99);
  return [...map.values()].sort((a, b) => rank(a.code) - rank(b.code));
}

const sameFilter = (a: Filter, b: Filter) => a.kind === b.kind && a.value === b.value;

/** Desktop "Explore courses" button with a mega menu: filters on the left, one card per degree on the right. */
export function MegaMenu() {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<Filter>({ kind: "level", value: "all" });
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();
  const panelId = useId();

  const clearTimers = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (openTimer.current) clearTimeout(openTimer.current);
  };
  const show = useCallback(() => {
    clearTimers();
    openTimer.current = setTimeout(() => setOpen(true), 80);
  }, []);
  const hide = useCallback(() => {
    clearTimers();
    closeTimer.current = setTimeout(() => setOpen(false), 180);
  }, []);
  const close = useCallback(() => {
    clearTimers();
    setOpen(false);
  }, []);

  // Close when the route changes (React's "adjust state on prop change" pattern) and on Escape.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);
  useEffect(() => clearTimers, []);

  const types = degreeTypes(filter);
  const heading =
    filter.kind === "uni" ? universities[filter.value].name : filter.value === "all" ? "All degrees" : levelLabels[filter.value];

  return (
    <div className="hidden lg:block">
      {/* Dims the page. Sits outside the hover area so moving onto it closes the menu. */}
      {open && <div aria-hidden="true" className="fixed inset-0 -z-10 bg-navy-deep/40 backdrop-blur-[2px]" onClick={close} />}
      <div onMouseEnter={show} onMouseLeave={hide}>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => (open ? close() : (clearTimers(), setOpen(true)))}
          className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-[15px] font-semibold transition ${
            open ? "bg-navy text-white" : "bg-peach text-navy hover:bg-navy hover:text-white"
          }`}
        >
          <GridIcon className="size-4" />
          Explore courses
          <ChevronIcon className={`size-4 transition ${open ? "rotate-180" : ""}`} />
        </button>

        {open && (
          // pt-2 bridges the gap below the header so moving the mouse down doesn't close the menu
          <div id={panelId} role="region" aria-label="Courses" className="absolute inset-x-0 top-full pt-2">
            <div className="grid h-[min(74vh,600px)] grid-cols-[250px_1fr] gap-4 rounded-3xl bg-[#f4f2ef] p-4 shadow-[0_30px_80px_-20px_rgb(4_14_64/0.45)] ring-1 ring-line">
              {/* filters */}
              <nav aria-label="Filter courses" className="overflow-y-auto rounded-2xl bg-white px-5 py-6">
                <FilterGroup title="By degree">
                  {levelItems.map((l) => (
                    <FilterItem
                      key={l.value}
                      label={l.label}
                      count={l.value === "all" ? courses.length : courses.filter((c) => c.level === l.value).length}
                      active={sameFilter(filter, { kind: "level", value: l.value })}
                      onSelect={() => setFilter({ kind: "level", value: l.value })}
                    />
                  ))}
                </FilterGroup>
                <FilterGroup title="By university" className="mt-8">
                  {uniOrder.map((u) => (
                    <FilterItem
                      key={u}
                      label={universities[u].name}
                      count={courses.filter((c) => c.university === u).length}
                      active={sameFilter(filter, { kind: "uni", value: u })}
                      onSelect={() => setFilter({ kind: "uni", value: u })}
                    />
                  ))}
                </FilterGroup>
              </nav>

              {/* degree cards */}
              <div className="flex min-h-0 flex-col">
                <div className="flex items-baseline justify-between px-1 pb-3">
                  <p className="font-display text-lg font-semibold text-navy">{heading}</p>
                  <p className="text-sm text-muted">
                    {types.length} degree{types.length === 1 ? "" : "s"}
                  </p>
                </div>
                <ul className="grid min-h-0 flex-1 auto-rows-min grid-cols-3 gap-3 overflow-y-auto pr-1 pb-1">
                  {types.map((t) => (
                    <DegreeCard key={t.code} type={t} onNavigate={close} />
                  ))}
                </ul>
                <Link
                  href="/popular-programs/"
                  onClick={close}
                  className="mt-3 flex items-center justify-center gap-2 rounded-full border border-navy/15 bg-white py-3 font-semibold text-navy transition hover:border-navy hover:bg-navy hover:text-white"
                >
                  View all courses <ArrowRightIcon className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function FilterGroup({ title, className = "", children }: { title: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={className}>
      <p className="font-display text-xl font-semibold text-navy">{title}</p>
      <ul className="mt-3 divide-y divide-line">{children}</ul>
    </div>
  );
}

function FilterItem({ label, count, active, onSelect }: { label: string; count: number; active: boolean; onSelect: () => void }) {
  return (
    <li className="relative">
      {active && <span aria-hidden="true" className="absolute top-1/2 -left-5 h-8 w-1 -translate-y-1/2 rounded-r-full bg-brand" />}
      <button
        type="button"
        aria-pressed={active}
        onMouseEnter={onSelect}
        onFocus={onSelect}
        onClick={onSelect}
        className={`flex w-full items-center justify-between gap-3 py-3 text-left text-[15px] transition ${active ? "font-semibold text-navy" : "text-ink/70 hover:text-navy"}`}
      >
        {label}
        <span className={`text-xs ${active ? "text-brand" : "text-muted"}`}>{count}</span>
      </button>
    </li>
  );
}

function DegreeCard({ type: t, onNavigate }: { type: DegreeType; onNavigate: () => void }) {
  // The whole card opens the first university's course; the university chips sit above it (z-10)
  // and open that specific university's course.
  return (
    <li className="group relative flex flex-col rounded-2xl bg-white p-4 ring-1 ring-line transition hover:shadow-card hover:ring-navy/25">
      <span className="absolute top-0 right-0 rounded-tr-2xl rounded-bl-2xl bg-navy px-3 py-1.5 text-xs font-semibold text-white">{t.tag}</span>
      <p className="min-h-[2.75rem] pr-24 leading-snug font-semibold text-navy">
        <Link href={courseHref(t.options[0])} onClick={onNavigate} className="after:absolute after:inset-0 after:rounded-2xl group-hover:text-brand">
          {t.name}
        </Link>
      </p>
      <div className="mt-auto pt-4">
        <p className="text-xs text-muted">{t.options.length > 1 ? "Universities" : "University"}</p>
        <div className="mt-1.5 flex items-end justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            {t.options.map((c) => (
              <Link
                key={c.slug}
                href={courseHref(c)}
                onClick={onNavigate}
                title={`${c.name}, ${universities[c.university].name}`}
                className={`relative z-10 rounded-full px-2.5 py-1 text-xs font-bold ring-1 ring-black/5 transition hover:ring-2 hover:ring-navy/50 ${uniTone[c.university]}`}
              >
                {universities[c.university].short}
              </Link>
            ))}
          </div>
          <span className="flex shrink-0 items-center gap-1 text-xs font-medium text-muted">
            <ClockIcon className="size-3.5" />
            {formatDuration(t.duration)}
          </span>
        </div>
      </div>
    </li>
  );
}

/** Course list for the mobile menu: level pills, then one row per degree with university chips. */
export function MobileCourses({ onNavigate }: { onNavigate: () => void }) {
  const [level, setLevel] = useState<"all" | Level>("all");
  const types = degreeTypes({ kind: "level", value: level });
  return (
    <div className="rounded-2xl bg-cream p-3">
      <p className="px-1 text-xs font-semibold tracking-[0.14em] text-muted uppercase">Explore courses</p>
      <div role="group" aria-label="Degree level" className="no-scrollbar mt-2 flex gap-1 overflow-x-auto">
        {levelItems.map((l) => (
          <button
            key={l.value}
            type="button"
            aria-pressed={level === l.value}
            onClick={() => setLevel(l.value)}
            className={`shrink-0 rounded-full px-3.5 py-2 text-sm font-semibold ${level === l.value ? "bg-navy text-white" : "bg-white text-ink/70 ring-1 ring-line"}`}
          >
            {l.label}
          </button>
        ))}
      </div>
      <ul className="mt-3 space-y-2">
        {types.map((t) => (
          <li key={t.code} className="relative rounded-xl bg-white px-3 py-2.5 ring-1 ring-line">
            <div className="flex items-center justify-between gap-2">
              <Link href={courseHref(t.options[0])} onClick={onNavigate} className="text-sm font-semibold text-navy after:absolute after:inset-0 after:rounded-xl">
                {t.name}
              </Link>
              <span className="shrink-0 rounded-md bg-navy px-2 py-0.5 text-[11px] font-semibold text-white">{t.tag}</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {t.options.map((c) => (
                <Link key={c.slug} href={courseHref(c)} onClick={onNavigate} className={`relative z-10 rounded-full px-2.5 py-1 text-xs font-bold ${uniTone[c.university]}`}>
                  {universities[c.university].short}
                </Link>
              ))}
            </div>
          </li>
        ))}
      </ul>
      <Link href="/popular-programs/" onClick={onNavigate} className="mt-3 inline-flex items-center gap-1.5 px-1 text-sm font-semibold text-brand">
        View all courses <ArrowRightIcon className="size-4" />
      </Link>
    </div>
  );
}

function GridIcon(p: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}

function ChevronIcon(p: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
