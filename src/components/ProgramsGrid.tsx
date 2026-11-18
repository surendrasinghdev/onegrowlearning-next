"use client";

import { useMemo, useState } from "react";
import { courses, levelLabels, universities, type Level, type UniversityId } from "@/data/courses";
import { CourseCard } from "./CourseExplorer";

type LevelFilter = "all" | Level;
type UniFilter = "all" | UniversityId;

/** Every program in a filterable grid (Programs page). */
export function ProgramsGrid() {
  const [level, setLevel] = useState<LevelFilter>("all");
  const [uni, setUni] = useState<UniFilter>("all");
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    const term = q.trim().toLowerCase();
    return courses.filter(
      (c) =>
        (level === "all" || c.level === level) &&
        (uni === "all" || c.university === uni) &&
        (!term || `${c.code} ${c.name} ${universities[c.university].name}`.toLowerCase().includes(term)),
    );
  }, [level, uni, q]);

  const levels: LevelFilter[] = ["all", "pg", "ug", "executive"];
  const unis: UniFilter[] = ["all", "muj", "smu", "shoolini", "welingkar"];

  return (
    <div>
      <div className="flex flex-col gap-4 rounded-3xl bg-white p-4 shadow-card ring-1 ring-line lg:flex-row lg:items-center">
        <div role="group" aria-label="Degree level" className="no-scrollbar flex gap-1 overflow-x-auto rounded-full bg-peach p-1">
          {levels.map((l) => (
            <button
              key={l}
              type="button"
              aria-pressed={level === l}
              onClick={() => setLevel(l)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${level === l ? "bg-navy text-white shadow-card" : "text-ink/70 hover:text-navy"}`}
            >
              {l === "all" ? "All" : levelLabels[l]}
            </button>
          ))}
        </div>
        <label className="sr-only" htmlFor="programs-uni">
          University
        </label>
        <select
          id="programs-uni"
          value={uni}
          onChange={(e) => setUni(e.target.value as UniFilter)}
          className="rounded-full border border-line bg-white px-4 py-2.5 text-sm font-semibold text-ink outline-none focus:border-brand focus:ring-3 focus:ring-brand/15"
        >
          {unis.map((u) => (
            <option key={u} value={u}>
              {u === "all" ? "All universities" : universities[u].name}
            </option>
          ))}
        </select>
        <label className="relative flex-1">
          <span className="sr-only">Search programs</span>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search MBA, BCA, Commerce..."
            className="w-full rounded-full border border-line bg-cream px-5 py-2.5 text-sm outline-none focus:border-brand focus:ring-3 focus:ring-brand/15"
          />
        </label>
        <p className="shrink-0 px-2 text-sm text-muted" aria-live="polite">
          {list.length} program{list.length === 1 ? "" : "s"}
        </p>
      </div>

      {list.length ? (
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((c) => (
            <CourseCard key={c.slug} course={c} grid />
          ))}
        </ul>
      ) : (
        <p className="mt-8 rounded-3xl border border-dashed border-line bg-white p-10 text-center text-muted">No programs match. Try another filter or search.</p>
      )}
    </div>
  );
}
