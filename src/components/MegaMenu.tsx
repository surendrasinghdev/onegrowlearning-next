"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  courseHref,
  courses,
  courseTags,
  formatDuration,
  formatINR,
  levelLabels,
  universities,
  uniTone,
  type Course,
  type Level,
  type UniversityId,
} from "@/data/courses";
import { asset } from "@/lib/asset";
import { useEnquiry } from "./Enquiry";
import {
  ArrowRightIcon,
  BriefcaseIcon,
  GraduationIcon,
  SparkIcon,
} from "./icons";

const levels: { id: Level; icon: typeof GraduationIcon; blurb: string }[] = [
  { id: "pg", icon: GraduationIcon, blurb: "MBA, MCA, M.Com, MA" },
  { id: "ug", icon: SparkIcon, blurb: "BBA, BCA, B.Com, BA" },
  { id: "executive", icon: BriefcaseIcon, blurb: "Full-time, Mumbai" },
];
const uniOrder: UniversityId[] = ["muj", "smu", "shoolini", "welingkar"];

function byUniversity(level: Level) {
  return uniOrder
    .map((u) => ({
      uni: u,
      list: courses.filter((c) => c.level === level && c.university === u),
    }))
    .filter((g) => g.list.length);
}

/** Desktop "Explore courses" button with a mega menu of every program, grouped by level and university. */
export function MegaMenu() {
  const [open, setOpen] = useState(false);
  const [level, setLevel] = useState<Level>("pg");
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();
  const enquire = useEnquiry();
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

  const groups = byUniversity(level);

  return (
    <div className="hidden lg:block">
      {/* dim the page; sits inside the header's stacking context, behind the bar.
          Kept outside the hover area so moving onto it closes the menu. */}
      {open && (
        <div
          aria-hidden="true"
          className="fixed inset-0 -z-10 bg-navy-deep/40 backdrop-blur-[2px]"
          onClick={close}
        />
      )}
      <div onMouseEnter={show} onMouseLeave={hide}>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => (open ? close() : (clearTimers(), setOpen(true)))}
          className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-[15px] font-semibold transition ${
            open
              ? "bg-navy text-white"
              : "bg-peach text-navy hover:bg-navy hover:text-white"
          }`}
        >
          <GridIcon className="size-4" />
          Explore courses
          <ChevronIcon
            className={`size-4 transition ${open ? "rotate-180" : ""}`}
          />
        </button>

        {open && (
          <>
            {/* pt-2 bridges the gap so moving the mouse down doesn't close the menu */}
            <div
              id={panelId}
              role="region"
              aria-label="Courses"
              className="absolute inset-x-0 top-full pt-2"
            >
              <div className="grid min-h-[440px] grid-cols-[250px_1fr_250px] overflow-hidden rounded-3xl bg-white shadow-[0_30px_80px_-20px_rgb(4_14_64/0.45)] ring-1 ring-line">
                {/* level tabs */}
                <div
                  role="tablist"
                  aria-orientation="vertical"
                  aria-label="Degree level"
                  className="flex flex-col gap-1.5 bg-cream p-4"
                >
                  <p className="px-3 pt-1 pb-2 text-xs font-semibold tracking-[0.14em] text-muted uppercase">
                    Browse by level
                  </p>
                  {levels.map((l) => {
                    const active = level === l.id;
                    const count = courses.filter(
                      (c) => c.level === l.id,
                    ).length;
                    return (
                      <button
                        key={l.id}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onMouseEnter={() => setLevel(l.id)}
                        onFocus={() => setLevel(l.id)}
                        onClick={() => setLevel(l.id)}
                        className={`group flex items-center gap-3 rounded-2xl px-3 py-3 text-left transition ${active ? "bg-white shadow-card ring-1 ring-line" : "hover:bg-white/70"}`}
                      >
                        <span
                          className={`grid size-10 shrink-0 place-items-center rounded-xl ${active ? "bg-navy text-amber" : "bg-white text-brand ring-1 ring-line"}`}
                        >
                          <l.icon className="size-5" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-center justify-between gap-2 font-semibold whitespace-nowrap text-navy">
                            {levelLabels[l.id]}
                            <span
                              className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${active ? "bg-brand text-white" : "bg-white text-muted"}`}
                            >
                              {count}
                            </span>
                          </span>
                          <span className="block truncate text-xs text-muted">
                            {l.blurb}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                  <Link
                    href="/popular-programs/"
                    onClick={close}
                    className="mt-auto inline-flex items-center gap-1.5 px-3 pt-4 text-sm font-semibold text-brand hover:text-brand-dark"
                  >
                    All {courses.length} programs{" "}
                    <ArrowRightIcon className="size-4" />
                  </Link>
                </div>

                {/* courses for the selected level, one column per university */}
                <div
                  role="tabpanel"
                  aria-label={levelLabels[level]}
                  className="max-h-[min(70vh,560px)] overflow-y-auto p-6"
                >
                  <div
                    className={`grid gap-6 ${groups.length >= 3 ? "grid-cols-3" : groups.length === 2 ? "grid-cols-2" : "grid-cols-1"}`}
                  >
                    {groups.map((g) => (
                      <div key={g.uni}>
                        <p
                          className={`inline-block rounded-md px-2 py-1 text-[11px] font-bold ${uniTone[g.uni]}`}
                        >
                          {universities[g.uni].name.replace(" (WeSchool)", "")}
                        </p>
                        <ul className="mt-3 space-y-1">
                          {g.list.map((c) => (
                            <CourseLink
                              key={c.slug}
                              course={c}
                              onClick={close}
                              wide={groups.length === 1}
                            />
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* promo */}
                <div className="relative flex flex-col justify-end overflow-hidden bg-navy p-5 text-white">
                  <Image
                    src={asset("/images/photos/graduate-2.webp")}
                    alt=""
                    fill
                    sizes="250px"
                    className="object-cover opacity-45"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/70 to-transparent" />
                  <div className="relative">
                    <p className="font-display text-xl leading-snug font-semibold">
                      Not sure which course fits you?
                    </p>
                    <p className="mt-2 text-sm text-white/75">
                      Talk to a counsellor and compare programs, fees and EMI,
                      free of cost.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        close();
                        enquire({ source: "Mega menu" });
                      }}
                      className="mt-4 w-full rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-white hover:bg-brand-dark"
                    >
                      Get free counselling
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function CourseLink({
  course: c,
  onClick,
  wide,
}: {
  course: Course;
  onClick: () => void;
  wide?: boolean;
}) {
  const tag = courseTags(c).find((t) => t !== "Scholarships up to 20%");
  return (
    <li>
      <Link
        href={courseHref(c)}
        onClick={onClick}
        className="group flex items-start gap-3 rounded-2xl p-2.5 transition hover:bg-peach"
      >
        <span className="mt-0.5 grid h-9 min-w-12 shrink-0 place-items-center rounded-lg bg-navy/5 px-2 text-xs font-bold text-navy group-hover:bg-brand group-hover:text-white">
          {c.code.split(/[\s-]/)[0]}
        </span>
        <span className="min-w-0">
          <span
            className={`block text-sm leading-snug font-semibold text-ink group-hover:text-navy ${wide ? "" : "line-clamp-2"}`}
          >
            {c.name}
          </span>
          <span className="mt-0.5 block text-xs text-muted">
            {formatDuration(c.durationMonths)} ·{" "}
            {c.fee ? formatINR(c.fee) : "Fee on request"}
            {tag && (
              <span className="ml-1.5 font-semibold text-brand">{tag}</span>
            )}
          </span>
        </span>
      </Link>
    </li>
  );
}

/** Course list for the mobile menu: level pills, then programs grouped by university. */
export function MobileCourses({ onNavigate }: { onNavigate: () => void }) {
  const [level, setLevel] = useState<Level>("pg");
  return (
    <div className="rounded-2xl bg-cream p-3">
      <p className="px-1 text-xs font-semibold tracking-[0.14em] text-muted uppercase">
        Explore courses
      </p>
      <div
        role="tablist"
        aria-label="Degree level"
        className="no-scrollbar mt-2 flex gap-1 overflow-x-auto"
      >
        {levels.map((l) => (
          <button
            key={l.id}
            type="button"
            role="tab"
            aria-selected={level === l.id}
            onClick={() => setLevel(l.id)}
            className={`shrink-0 rounded-full px-3.5 py-2 text-sm font-semibold ${level === l.id ? "bg-navy text-white" : "bg-white text-ink/70 ring-1 ring-line"}`}
          >
            {levelLabels[l.id]}
          </button>
        ))}
      </div>
      <div role="tabpanel" className="mt-3 space-y-3">
        {byUniversity(level).map((g) => (
          <div key={g.uni}>
            <p
              className={`inline-block rounded-md px-2 py-0.5 text-[11px] font-bold ${uniTone[g.uni]}`}
            >
              {universities[g.uni].short}
            </p>
            <ul className="mt-1.5 grid grid-cols-2 gap-1.5">
              {g.list.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={courseHref(c)}
                    onClick={onNavigate}
                    className="block rounded-xl bg-white px-3 py-2.5 ring-1 ring-line"
                  >
                    <span className="block text-sm font-semibold text-navy">
                      {c.code}
                    </span>
                    <span className="block text-xs text-muted">
                      {c.fee ? formatINR(c.fee) : "Fee on request"}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <Link
        href="/popular-programs/"
        onClick={onNavigate}
        className="mt-3 inline-flex items-center gap-1.5 px-1 text-sm font-semibold text-brand"
      >
        All {courses.length} programs <ArrowRightIcon className="size-4" />
      </Link>
    </div>
  );
}

function GridIcon(p: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...p}
    >
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}

function ChevronIcon(p: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...p}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
