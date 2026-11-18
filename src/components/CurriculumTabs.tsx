"use client";

import { useState } from "react";
import { BookIcon } from "./icons";

/** Semester-wise subjects with a tab per semester. */
export function CurriculumTabs({ curriculum, hasElectives }: { curriculum: Record<string, string[]>; hasElectives: boolean }) {
  const semesters = Object.keys(curriculum);
  const [active, setActive] = useState(semesters[0]);
  const subjects = curriculum[active] ?? [];
  const isLast = active === semesters[semesters.length - 1] || subjects.length <= 2;

  return (
    <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
      <div role="tablist" aria-label="Semesters" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:flex-col lg:px-0">
        {semesters.map((s, i) => (
          <button
            key={s}
            role="tab"
            type="button"
            aria-selected={active === s}
            onClick={() => setActive(s)}
            className={`flex shrink-0 items-center gap-3 rounded-2xl px-4 py-3 text-left font-semibold transition lg:py-4 ${
              active === s ? "bg-navy text-white shadow-card" : "bg-white text-ink/75 ring-1 ring-line hover:text-navy"
            }`}
          >
            <span className={`grid size-8 place-items-center rounded-lg text-sm ${active === s ? "bg-amber text-navy-deep" : "bg-peach text-brand"}`}>{i + 1}</span>
            {s}
            <span className={`ml-auto hidden text-xs font-medium lg:inline ${active === s ? "text-white/60" : "text-muted"}`}>{curriculum[s].length} subject{curriculum[s].length === 1 ? "" : "s"}</span>
          </button>
        ))}
      </div>

      <div role="tabpanel" aria-label={active} className="rounded-3xl bg-white p-5 shadow-card ring-1 ring-line sm:p-7">
        <p className="text-sm font-semibold text-muted">{active}</p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {subjects.map((sub) => (
            <li key={sub} className="flex items-start gap-3 rounded-2xl bg-cream px-4 py-3.5">
              <BookIcon className="mt-0.5 size-5 shrink-0 text-brand" />
              <span className="font-medium text-ink">{sub}</span>
            </li>
          ))}
        </ul>
        {hasElectives && isLast && (
          <p className="mt-5 rounded-2xl border border-dashed border-amber/60 bg-sun/60 px-4 py-3 text-sm text-ink/80">
            Plus elective subjects from the specialisation you choose. See the specialisations below.
          </p>
        )}
      </div>
    </div>
  );
}

/** Specialisation picker: chips on top, subjects of the selected one below. */
export function SpecialisationPicker({ specialisations }: { specialisations: Record<string, string[]> }) {
  const names = Object.keys(specialisations);
  const [active, setActive] = useState(names[0]);
  const single = names.length === 1;

  return (
    <div>
      {!single && (
        <div role="tablist" aria-label="Specialisations" className="flex flex-wrap gap-2">
          {names.map((n) => (
            <button
              key={n}
              role="tab"
              type="button"
              aria-selected={active === n}
              onClick={() => setActive(n)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                active === n ? "bg-brand text-white shadow-card" : "bg-white text-ink/75 ring-1 ring-line hover:text-brand"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      )}
      <ul className={`grid gap-3 sm:grid-cols-2 lg:grid-cols-3 ${single ? "" : "mt-6"}`} role={single ? undefined : "tabpanel"}>
        {specialisations[active].map((sub) => (
          <li key={sub} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3.5 font-medium text-ink ring-1 ring-line">
            <span className="size-2 shrink-0 rotate-45 bg-amber" />
            {sub}
          </li>
        ))}
      </ul>
    </div>
  );
}
