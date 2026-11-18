import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdvanceCareer, container, Eyebrow, Faq, Rankings, SampleDegree, Title } from "@/components/blocks";
import { Carousel } from "@/components/Carousel";
import { CourseCard } from "@/components/CourseExplorer";
import { CurriculumTabs, SpecialisationPicker } from "@/components/CurriculumTabs";
import { EnquireButton } from "@/components/Enquiry";
import { EnquiryForm } from "@/components/EnquiryForm";
import {
  ArrowRightIcon,
  BriefcaseIcon,
  BuildingIcon,
  CalendarIcon,
  CheckIcon,
  ClockIcon,
  GraduationIcon,
  LaptopIcon,
  PercentIcon,
  PhoneIcon,
  ShieldIcon,
  SparkIcon,
  UsersIcon,
  WalletIcon,
} from "@/components/icons";
import { LiteYouTube } from "@/components/LiteYouTube";
import { SectionNav } from "@/components/SectionNav";
import { getCourseDetail, type CourseDetail } from "@/data/course-details";
import {
  courseEligibility,
  courseImage,
  courses,
  courseTags,
  formatDuration,
  formatINR,
  universities,
  uniTone,
  type Course,
} from "@/data/courses";
import { accreditationsFor, steps } from "@/data/home";
import { site } from "@/data/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

function find(slug: string) {
  const course = courses.find((c) => c.slug === slug);
  const detail = course && getCourseDetail(slug);
  return course && detail ? { course, detail } : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const found = find((await params).slug);
  if (!found) return {};
  const { course: c, detail } = found;
  const u = universities[c.university];
  return {
    title: `${c.name} (${c.code}) from ${u.name}: Fees, Syllabus & Admission`,
    description: firstSentences(detail.overview, 155),
  };
}

function firstSentences(text: string, max: number) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const end = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("! "));
  return end > 60 ? cut.slice(0, end + 1) : cut.replace(/\s+\S*$/, "") + "...";
}

export default async function CoursePage({ params }: Props) {
  const found = find((await params).slug);
  if (!found) notFound();
  const { course: c, detail } = found;
  const u = universities[c.university];
  const rankings = accreditationsFor(c.university);
  const hasCurriculum = Object.keys(detail.curriculum).length > 0;
  const hasSpecs = Object.keys(detail.specialisations).length > 0;
  const hasCareers = detail.jobProfiles.length > 0 || detail.industries.length > 0;

  const nav = [
    { id: "overview", label: "Overview" },
    ...(hasCurriculum || hasSpecs || detail.structure ? [{ id: "curriculum", label: hasCurriculum ? "Curriculum" : "Program" }] : []),
    ...(detail.degree ? [{ id: "degree", label: "Sample degree" }] : []),
    { id: "fees", label: "Fees" },
    ...(hasCareers ? [{ id: "careers", label: detail.careerLabels ? "Outcomes" : "Careers" }] : []),
    ...(detail.admissionCriteria.length ? [{ id: "admission", label: "Admission" }] : []),
    ...(detail.faqs.length ? [{ id: "faq", label: "FAQ" }] : []),
  ];

  return (
    <>
      <CourseHero course={c} detail={detail} />
      <SectionNav items={nav} />
      <Overview course={c} detail={detail} />
      {rankings.length > 0 && <Rankings items={rankings} title={`${u.short} rankings & approvals`} className="bg-white py-16 sm:py-20" />}
      {(hasCurriculum || hasSpecs || detail.structure) && <Curriculum course={c} detail={detail} />}
      {detail.degree && (
        <div id="degree" className="scroll-mt-28">
          <SampleDegree image={detail.degree} alt={`Sample ${c.name} degree certificate from ${u.name}`} caption={`Sample degree, ${u.short} ${c.code}`} course={c.slug} />
        </div>
      )}
      <Fees course={c} />
      {hasCareers && <Careers course={c} detail={detail} />}
      {detail.admissionCriteria.length > 0 && <Admission course={c} detail={detail} />}
      {detail.faqs.length > 0 && <Faq id="faq" items={detail.faqs} title={`${c.code} FAQs`} className="bg-white py-20 sm:py-24" />}
      <Related course={c} />
      <AdvanceCareer source={`Course page: ${c.code} (${u.short})`} course={c.slug} title={`Ready to start your ${c.code}?`} sub="Share your details and a counsellor will send you the fee details, brochure and next batch dates." />
    </>
  );
}

/* ---------- hero ---------- */

function CourseHero({ course: c, detail }: { course: Course; detail: CourseDetail }) {
  const u = universities[c.university];
  const facts = [
    { icon: ClockIcon, label: "Duration", value: formatDuration(c.durationMonths) },
    { icon: WalletIcon, label: "Total fee", value: c.fee ? formatINR(c.fee) : "On request", strike: c.regularFee ? formatINR(c.regularFee) : undefined },
    c.emiFrom
      ? { icon: SparkIcon, label: "No-cost EMI", value: `${formatINR(c.emiFrom)}/mo` }
      : { icon: CalendarIcon, label: c.semesterFee ? "Per semester" : "Mode", value: c.semesterFee ? formatINR(c.semesterFee) : c.mode },
    { icon: GraduationIcon, label: "Eligibility", value: courseEligibility(c) },
  ];
  return (
    <section className="relative -mt-[76px] overflow-hidden bg-navy-deep pt-[76px] text-white">
      <div aria-hidden="true" className="absolute inset-y-0 right-0 hidden w-[55%] lg:block">
        <Image src={courseImage(c)} alt="" fill sizes="55vw" className="object-cover opacity-30 [mask-image:linear-gradient(to_right,transparent,black_60%)]" />
      </div>
      <div aria-hidden="true" className="bg-grid absolute inset-0 hidden lg:block [mask-image:radial-gradient(ellipse_at_top_left,black_30%,transparent_70%)]" />
      <div aria-hidden="true" className="absolute -top-32 left-1/4 size-[36rem] rounded-full bg-[radial-gradient(closest-side,rgb(238_86_2/0.32),transparent)]" />

      <div className={`${container} relative grid gap-10 pt-10 pb-16 lg:grid-cols-[1fr_400px] lg:gap-14 lg:pt-14 lg:pb-20`}>
        <div>
          <nav aria-label="Breadcrumb" className="text-sm text-white/60">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/popular-programs/" className="hover:text-white">
                  Programs
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-white/90">
                {c.code} ({u.short})
              </li>
            </ol>
          </nav>

          <div className="mt-6 flex flex-wrap gap-2">
            <span className={`rounded-md px-2.5 py-1 text-xs font-bold ${uniTone[c.university]}`}>{u.name}</span>
            <span className="rounded-md bg-white/10 px-2.5 py-1 text-xs font-bold text-white/85">{c.mode}</span>
            {courseTags(c).map((t) => (
              <span key={t} className="rounded-md bg-amber px-2.5 py-1 text-xs font-bold text-navy-deep">
                {t}
              </span>
            ))}
          </div>

          <h1 className="mt-5 text-[2.3rem] leading-[1.08] font-bold sm:text-[3.2rem]">
            {c.name} <span className="text-amber">({c.code})</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/70">{firstSentences(detail.overview, 240)}</p>

          <dl className="mt-8 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
            {facts.map((f) => (
              <div key={f.label} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                <f.icon className="size-5 text-amber" />
                <dt className="mt-3 text-xs text-white/60">{f.label}</dt>
                <dd className="mt-0.5 font-display text-lg leading-tight font-semibold">
                  {f.value}
                  {"strike" in f && f.strike && <s className="ml-1.5 text-xs font-medium text-white/50">{f.strike}</s>}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <EnquireButton
              course={c.slug}
              source={`Course hero: ${c.code} (${u.short})`}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-7 py-4 font-semibold text-white transition hover:bg-brand-dark"
            >
              Apply now <ArrowRightIcon className="size-5" />
            </EnquireButton>
            <EnquireButton
              course={c.slug}
              source={`Course brochure: ${c.code} (${u.short})`}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 px-7 py-4 font-semibold text-white transition hover:bg-white/10"
            >
              Get the brochure
            </EnquireButton>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-3xl bg-white text-ink shadow-[0_30px_60px_-20px_rgb(0_0_0/0.5)]">
            <div className="p-6 sm:p-7">
              <h2 className="font-sans text-xl font-bold text-navy">Get {c.code} fees &amp; brochure</h2>
              <p className="mt-1 text-sm text-muted">Free counselling from our {u.short} program experts.</p>
              <div className="mt-5">
                <EnquiryForm defaultCourse={c.slug} source={`Course form: ${c.code} (${u.short})`} submitLabel="Get details" />
              </div>
            </div>
            <a href={site.phoneHref} className="flex items-center justify-between gap-3 bg-amber px-6 py-3.5 text-sm font-semibold text-navy-deep hover:brightness-95 sm:px-7">
              <span className="flex items-center gap-2">
                <PhoneIcon className="size-4" /> Prefer to talk now?
              </span>
              <span>{site.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- overview ---------- */

const advTones = ["bg-[#ffe1ea] text-[#b4234f]", "bg-[#dcebff] text-[#1f57b8]", "bg-[#fff0bf] text-[#8a5a00]", "bg-[#e1f3d2] text-[#3b7a17]"];
const advIcons = [SparkIcon, LaptopIcon, ShieldIcon, UsersIcon];

function Overview({ course: c, detail }: { course: Course; detail: CourseDetail }) {
  const u = universities[c.university];
  return (
    <section id="overview" className="scroll-mt-28 py-20 sm:py-24">
      <div className={container}>
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
          <div>
            <Eyebrow>Overview</Eyebrow>
            <Title>About the {c.code} program</Title>
            <p className="mt-5 text-lg leading-relaxed text-ink/75">{detail.overview}</p>

            <div className="mt-8 flex items-center gap-4 rounded-3xl border border-line bg-white p-5">
              {u.logo ? (
                <Image src={u.logo.src} alt={u.name} width={u.logo.width} height={u.logo.height} className="h-10 w-auto shrink-0" />
              ) : (
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-navy text-amber">
                  <BuildingIcon className="size-6" />
                </span>
              )}
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-navy">{u.name}</p>
                <p className="text-sm text-muted">
                  {u.location} · {u.highlights.join(" · ")}
                </p>
              </div>
              <Link href="/our-partners/" className="hidden shrink-0 items-center gap-1 text-sm font-semibold text-brand hover:text-brand-dark sm:inline-flex">
                About {u.short} <ArrowRightIcon className="size-4" />
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div aria-hidden="true" className="absolute -inset-3 rotate-3 rounded-[2.5rem] bg-gradient-to-br from-brand/20 to-amber/30" />
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-lift">
              <Image src={courseImage(c)} alt={`${c.name} students`} fill sizes="(min-width:1024px) 520px, 90vw" className="object-cover" />
            </div>
            <div className="absolute -bottom-5 left-5 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-lift">
              <span className="grid size-10 place-items-center rounded-xl bg-navy text-amber">
                <ClockIcon className="size-5" />
              </span>
              <div>
                <p className="text-xs text-muted">{c.mode} program</p>
                <p className="font-display font-semibold text-navy">{formatDuration(c.durationMonths)}</p>
              </div>
            </div>
          </div>
        </div>

        {detail.advantages.length > 0 && (
          <>
            <h3 className="mt-20 text-2xl font-bold text-navy">Why choose this program</h3>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {detail.advantages.map((a, i) => {
                const Icon = advIcons[i % advIcons.length];
                return (
                  <li key={a.title} className="rounded-3xl bg-white p-6 shadow-card ring-1 ring-line">
                    <span className={`grid size-12 place-items-center rounded-full ${advTones[i % advTones.length]}`}>
                      <Icon className="size-6" />
                    </span>
                    <p className="mt-5 font-display text-lg leading-snug font-semibold text-navy">{a.title}</p>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted">{a.body}</p>
                  </li>
                );
              })}
            </ul>
          </>
        )}

        {detail.videos && (
          <ul className="mt-12 grid gap-5 md:grid-cols-2">
            {detail.videos.map((v) => (
              <li key={v.id}>
                <LiteYouTube id={v.id} title={v.title} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

/* ---------- curriculum / program structure ---------- */

function Curriculum({ course: c, detail }: { course: Course; detail: CourseDetail }) {
  const hasCurriculum = Object.keys(detail.curriculum).length > 0;
  const specCount = Object.keys(detail.specialisations).length;
  return (
    <section id="curriculum" className="scroll-mt-28 bg-peach py-20 sm:py-24">
      <div className={container}>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Eyebrow>{hasCurriculum ? "Curriculum" : "Program structure"}</Eyebrow>
            <Title>{hasCurriculum ? `What you'll study in the ${c.code}` : "How the program works"}</Title>
          </div>
          <EnquireButton course={c.slug} source={`Syllabus: ${c.code}`} className="inline-flex shrink-0 items-center gap-2 self-start rounded-xl bg-navy px-5 py-3 font-semibold text-white hover:bg-navy-deep lg:self-auto">
            Get the full syllabus <ArrowRightIcon className="size-4" />
          </EnquireButton>
        </div>

        {detail.structure && (
          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {detail.structure.map((s, i) => (
              <li key={s.title} className="relative rounded-3xl bg-white p-6 pt-8 shadow-card">
                <span className="absolute -top-5 left-6 grid size-10 place-items-center rounded-xl bg-gradient-to-br from-brand to-amber font-display text-lg font-semibold text-white shadow-card">{i + 1}</span>
                <p className="font-display text-lg font-semibold text-navy">{s.title}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.body}</p>
              </li>
            ))}
          </ol>
        )}

        {hasCurriculum && (
          <div className="mt-10">
            <CurriculumTabs curriculum={detail.curriculum} hasElectives={specCount > 0} />
          </div>
        )}

        {specCount > 0 && (
          <div className="mt-14">
            <h3 className="text-2xl font-bold text-navy">{specCount > 1 ? `Choose from ${specCount} specialisations` : Object.keys(detail.specialisations)[0]}</h3>
            {specCount > 1 && <p className="mt-2 text-muted">Pick a specialisation to see its elective subjects.</p>}
            <div className="mt-6">
              <SpecialisationPicker specialisations={detail.specialisations} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------- fees ---------- */

function Fees({ course: c }: { course: Course }) {
  const u = universities[c.university];
  const semesters = c.durationMonths >= 12 ? Math.round(c.durationMonths / 6) : 0;
  const offer =
    c.university === "muj" || c.university === "smu"
      ? { title: "Scholarships up to 20%", body: "Manipal scholarships for defence personnel, government employees, differently-abled and meritorious students. You also save when you pay the full fee upfront." }
      : { title: "EMI options", body: "Spread the fee with easy EMI plans. Your counsellor will share the options." };

  return (
    <section id="fees" className="scroll-mt-28 bg-white py-20 sm:py-24">
      <div className={container}>
        <div className="max-w-2xl">
          <Eyebrow>Fees</Eyebrow>
          <Title>
            {c.code} fee &amp; {c.emiFrom ? "EMI" : "payment options"}
          </Title>
        </div>
        <div className="mt-10 grid gap-4 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div className="relative overflow-hidden rounded-3xl bg-navy p-7 text-white">
            <div aria-hidden="true" className="absolute -right-10 -bottom-16 size-48 rounded-full bg-[radial-gradient(closest-side,rgb(238_86_2/0.55),transparent)]" />
            <p className="relative text-white/70">Total course fee{semesters ? ` (${semesters} semesters)` : ""}</p>
            <p className="relative mt-1 font-display text-5xl font-semibold">{c.fee ? formatINR(c.fee) : "On request"}</p>
            {c.regularFee && (
              <p className="relative mt-2 text-sm text-white/70">
                Regular fee <s>{formatINR(c.regularFee)}</s>, you save {formatINR(c.regularFee - (c.fee ?? 0))}
              </p>
            )}
            {c.feeNote && <p className="relative mt-3 text-sm text-white/70">{c.feeNote}</p>}
            <EnquireButton course={c.slug} source={`Fees: ${c.code} (${u.short})`} className="relative mt-6 inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-3 font-semibold text-white hover:bg-brand-dark">
              Apply now <ArrowRightIcon className="size-4" />
            </EnquireButton>
          </div>
          <div className="grid gap-4">
            <FeeStat icon={CalendarIcon} label="Per semester" value={c.semesterFee ? formatINR(c.semesterFee) : "Ask counsellor"} />
            <FeeStat icon={SparkIcon} label={c.emiFrom ? "No-cost EMI from" : "EMI options"} value={c.emiFrom ? `${formatINR(c.emiFrom)}/month` : "Ask your counsellor"} />
          </div>
          <div className="rounded-3xl bg-gradient-to-br from-brand to-amber p-7 text-white">
            <PercentIcon className="size-8" />
            <p className="mt-4 font-display text-2xl leading-tight font-semibold">{offer.title}</p>
            <p className="mt-2 text-[15px] text-white/90">{offer.body}</p>
          </div>
        </div>
        <p className="mt-6 text-sm text-muted">
          Fees for Indian students as listed on the {u.name} official website in {site.feesCheckedOn}. NRI and international fees differ. Fees can
          change, so your counsellor will confirm the latest amount.
        </p>
      </div>
    </section>
  );
}

function FeeStat({ icon: Icon, label, value }: { icon: typeof WalletIcon; label: string; value: string }) {
  return (
    <div className="flex items-center gap-4 rounded-3xl bg-cream p-6 ring-1 ring-line">
      <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-navy text-amber">
        <Icon className="size-6" />
      </span>
      <div>
        <p className="text-sm text-muted">{label}</p>
        <p className="font-display text-2xl font-semibold text-navy">{value}</p>
      </div>
    </div>
  );
}

/* ---------- careers ---------- */

function Careers({ course: c, detail }: { course: Course; detail: CourseDetail }) {
  const labels = detail.careerLabels ?? { title: `Careers after the ${c.code}`, left: "Job profiles", right: "Industries hiring" };
  return (
    <section id="careers" className="relative scroll-mt-28 overflow-hidden bg-sun py-20 sm:py-24">
      <svg aria-hidden="true" viewBox="0 0 600 600" className="absolute -bottom-40 -left-40 size-[36rem] text-amber/20">
        <path d="M300 40c143 0 260 117 260 260S443 560 300 560 40 443 40 300" fill="none" stroke="currentColor" strokeWidth="70" strokeLinecap="round" />
      </svg>
      <div className={`${container} relative`}>
        <div className="max-w-2xl">
          <Eyebrow>{detail.careerLabels ? "Outcomes" : "Careers"}</Eyebrow>
          <Title>{labels.title}</Title>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {[
            { title: labels.left, items: detail.jobProfiles, icon: BriefcaseIcon },
            { title: labels.right, items: detail.industries, icon: BuildingIcon },
          ]
            .filter((g) => g.items.length)
            .map((g) => (
              <div key={g.title} className="rounded-3xl bg-white p-7 shadow-card">
                <div className="flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-xl bg-navy text-amber">
                    <g.icon className="size-5" />
                  </span>
                  <h3 className="text-xl font-bold text-navy">{g.title}</h3>
                </div>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {g.items.map((i) => (
                    <li key={i} className="rounded-full bg-cream px-3.5 py-2 text-sm font-medium text-ink ring-1 ring-line">
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- admission ---------- */

function Admission({ course: c, detail }: { course: Course; detail: CourseDetail }) {
  return (
    <section id="admission" className="scroll-mt-28 py-20 sm:py-24">
      <div className={`${container} grid gap-10 lg:grid-cols-2`}>
        <div>
          <Eyebrow>Admission</Eyebrow>
          <Title>Who can apply</Title>
          <div className="mt-8 rounded-3xl bg-white p-7 shadow-card ring-1 ring-line">
            <ul className="space-y-3.5">
              {detail.admissionCriteria.map((line) =>
                line.length < 40 && !/\.$/.test(line) ? (
                  <li key={line} className="pt-2 font-semibold text-navy first:pt-0">
                    {line.replace(/:$/, "")}
                  </li>
                ) : (
                  <li key={line} className="flex gap-3 text-[15px] leading-relaxed text-ink/80">
                    <CheckIcon className="mt-0.5 size-5 shrink-0 text-brand" />
                    {line.replace(/:$/, "")}
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>
        <div>
          <Eyebrow>How to apply</Eyebrow>
          <Title>Get admitted in four steps</Title>
          <ol className="mt-8 space-y-4">
            {steps.map((s, i) => (
              <li key={s.title} className="flex gap-4 rounded-3xl bg-white p-5 ring-1 ring-line">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand to-amber font-display text-lg font-semibold text-white">{i + 1}</span>
                <div>
                  <p className="font-semibold text-navy">{s.title}</p>
                  <p className="mt-0.5 text-[15px] text-muted">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <EnquireButton course={c.slug} source={`Admission: ${c.code}`} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3.5 font-semibold text-white hover:bg-brand-dark">
            Start my application <ArrowRightIcon className="size-5" />
          </EnquireButton>
        </div>
      </div>
    </section>
  );
}

/* ---------- related ---------- */

function Related({ course: c }: { course: Course }) {
  const sameCode = courses.filter((o) => o.slug !== c.slug && o.code === c.code);
  const sameUni = courses.filter((o) => o.slug !== c.slug && o.university === c.university && o.code !== c.code);
  const sameLevel = courses.filter((o) => o.slug !== c.slug && o.level === c.level && !sameCode.includes(o) && !sameUni.includes(o));
  const picked = [...sameCode, ...sameUni, ...sameLevel];
  // Top up thin lists with the most popular programs.
  const popular = ["master-of-business-administration-muj", "master-of-business-administration", "master-of-computer-application"]
    .map((s) => courses.find((o) => o.slug === s)!)
    .filter((o) => o.slug !== c.slug && !picked.includes(o));
  const list = [...picked, ...popular].slice(0, 8);
  if (!list.length) return null;
  return (
    <section className="bg-peach py-20 sm:py-24">
      <div className={container}>
        <Carousel
          label="related programs"
          header={
            <>
              <Eyebrow>Explore more</Eyebrow>
              <Title>Programs you may also like</Title>
            </>
          }
        >
          {list.map((o) => (
            <CourseCard key={o.slug} course={o} />
          ))}
        </Carousel>
      </div>
    </section>
  );
}
