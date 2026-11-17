"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  courseEligibility,
  courseHref,
  courseImage,
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
import { site } from "@/data/site";
import { Carousel } from "./Carousel";
import { EnquireButton } from "./Enquiry";
import { ArrowRightIcon, ClockIcon, GraduationIcon, SparkIcon, WalletIcon } from "./icons";

type UniFilter = "all" | UniversityId;

const levels: Level[] = ["pg", "ug", "executive"];
const unis: UniFilter[] = ["all", "muj", "smu", "shoolini", "welingkar"];

/** Other parts of the page can call this to jump to the programs section filtered by university. */
export function showPrograms(uni: UniversityId) {
  window.dispatchEvent(new CustomEvent("programs:filter", { detail: uni }));
  document.getElementById("programs")?.scrollIntoView({ behavior: "smooth" });
}

export function ShowProgramsButton({ uni, className, children }: { uni: UniversityId; className?: string; children: React.ReactNode }) {
  return (
    <button type="button" className={className} onClick={() => showPrograms(uni)}>
      {children}
    </button>
  );
}

export function CourseExplorer() {
  const [level, setLevel] = useState<Level>("pg");
  const [uni, setUni] = useState<UniFilter>("all");

  useEffect(() => {
    const onFilter = (e: Event) => {
      const u = (e as CustomEvent<UniversityId>).detail;
      setUni(u);
      if (!courses.some((c) => c.university === u && c.level === level)) {
        setLevel(courses.find((c) => c.university === u)!.level);
      }
    };
    window.addEventListener("programs:filter", onFilter);
    return () => window.removeEventListener("programs:filter", onFilter);
  }, [level]);

  const list = useMemo(() => courses.filter((c) => c.level === level && (uni === "all" || c.university === uni)), [level, uni]);
  const count = (l: Level) => courses.filter((c) => c.level === l && (uni === "all" || c.university === uni)).length;

  return (
    <Carousel
      key={`${level}-${uni}`}
      label="programs"
      header={
        <>
          <p className="text-sm font-semibold tracking-[0.16em] text-brand uppercase">Programs</p>
          <h2 className="mt-2 text-3xl font-semibold text-navy sm:text-[2.6rem] sm:leading-tight">Explore top online degree courses</h2>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div role="tablist" aria-label="Degree level" className="no-scrollbar flex gap-1 overflow-x-auto rounded-full bg-peach p-1">
              {levels.map((l) => (
                <button
                  key={l}
                  role="tab"
                  type="button"
                  aria-selected={level === l}
                  disabled={!count(l)}
                  onClick={() => setLevel(l)}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition disabled:opacity-40 ${
                    level === l ? "bg-navy text-white shadow-card" : "text-ink/70 hover:text-navy"
                  }`}
                >
                  {levelLabels[l]} <span className={level === l ? "text-white/60" : "text-muted"}>{count(l)}</span>
                </button>
              ))}
            </div>
            <label className="sr-only" htmlFor="uni-filter">
              University
            </label>
            <select
              id="uni-filter"
              value={uni}
              onChange={(e) => {
                const u = e.target.value as UniFilter;
                setUni(u);
                if (u !== "all" && !courses.some((c) => c.university === u && c.level === level)) {
                  setLevel(courses.find((c) => c.university === u)!.level);
                }
              }}
              className="rounded-full border border-line bg-white px-4 py-2.5 text-sm font-semibold text-ink outline-none focus:border-brand focus:ring-3 focus:ring-brand/15"
            >
              {unis.map((u) => (
                <option key={u} value={u}>
                  {u === "all" ? "All universities" : universities[u].name}
                </option>
              ))}
            </select>
          </div>
        </>
      }
    >
      {list.map((c) => (
        <CourseCard key={c.slug} course={c} />
      ))}
      <li className="flex w-[78%] shrink-0 snap-start sm:w-[45%] lg:w-[calc(25%-15px)]">
        <div className="flex w-full flex-col justify-between rounded-3xl bg-navy p-7 text-white">
          <div>
            <p className="font-display text-2xl font-semibold">Not sure which one to pick?</p>
            <p className="mt-3 text-[15px] leading-relaxed text-white/70">
              Tell us your background and goals. A counsellor will compare options for you, free of cost.
            </p>
          </div>
          <div className="mt-6 grid gap-2.5">
            <EnquireButton source="Programs carousel" className="rounded-xl bg-brand px-5 py-3 font-semibold text-white hover:bg-brand-dark">
              Get free counselling
            </EnquireButton>
            <Link href="/popular-programs/" className="rounded-xl border border-white/20 px-5 py-3 text-center font-semibold hover:bg-white/10">
              View all programs
            </Link>
          </div>
          <p className="mt-5 text-xs leading-snug text-white/50">
            Fees as listed on each university&apos;s official website, {site.feesCheckedOn}. Your counsellor will confirm the latest amount.
          </p>
        </div>
      </li>
    </Carousel>
  );
}

function CourseCard({ course: c }: { course: Course }) {
  const u = universities[c.university];
  const tags = courseTags(c);
  return (
    <li className="group flex w-[85%] shrink-0 snap-start sm:w-[45%] lg:w-[calc(25%-15px)]">
      <article className="relative flex w-full flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-card transition hover:-translate-y-1 hover:shadow-lift">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image src={courseImage(c)} alt="" fill sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 85vw" className="object-cover transition duration-500 group-hover:scale-105" />
          <div className="absolute inset-x-0 top-0 flex flex-wrap gap-1.5 p-3">
            {tags.slice(0, 2).map((t, i) => (
              <span key={t} className={`rounded-md px-2 py-1 text-[11px] font-bold ${i === 0 ? "bg-amber text-navy-deep" : "bg-white/90 text-navy"}`}>
                {t}
              </span>
            ))}
          </div>
          <span className={`absolute bottom-3 left-3 rounded-md px-2 py-1 text-[11px] font-bold ${uniTone[c.university]}`}>{u.name.replace(" (WeSchool)", "")}</span>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <p className="text-xs font-bold tracking-wider text-brand uppercase">{c.code}</p>
          <h3 className="mt-1 min-h-[3.1rem] text-lg leading-snug font-bold text-navy">
            <Link href={courseHref(c)} className="after:absolute after:inset-0">
              {c.name}
            </Link>
          </h3>

          <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-3 border-t border-dashed border-line pt-4 text-[13px]">
            <Meta icon={<ClockIcon />} label="Duration" value={formatDuration(c.durationMonths)} />
            <Meta icon={<WalletIcon />} label="Total fee" value={c.fee ? formatINR(c.fee) : "On request"} />
            <Meta icon={<GraduationIcon />} label="Eligibility" value={courseEligibility(c)} />
            <Meta icon={<SparkIcon />} label={c.emiFrom ? "EMI from" : "Note"} value={c.emiFrom ? `${formatINR(c.emiFrom)}/mo` : c.regularFee ? `${formatINR(c.regularFee - (c.fee ?? 0))} scholarship` : c.mode} />
          </dl>

          <div className="relative z-10 mt-auto flex items-center gap-2 pt-5">
            <EnquireButton
              course={c.slug}
              source={`Course card: ${c.code} (${u.short})`}
              className="flex-1 rounded-xl bg-brand px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-dark"
            >
              Apply now
            </EnquireButton>
            <Link href={courseHref(c)} className="grid size-10 place-items-center rounded-xl border border-line text-navy hover:border-navy/30" aria-label={`View ${c.code} from ${u.name}`}>
              <ArrowRightIcon className="size-4" />
            </Link>
          </div>
        </div>
      </article>
    </li>
  );
}

function Meta({ icon, label, value }: { icon: React.ReactElement<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="flex gap-2">
      <span className="mt-0.5 size-4 shrink-0 text-brand [&>svg]:size-4">{icon}</span>
      <div className="min-w-0">
        <dt className="text-muted">{label}</dt>
        <dd className="font-semibold text-ink">{value}</dd>
      </div>
    </div>
  );
}
