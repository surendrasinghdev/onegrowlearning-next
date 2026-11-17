import Image from "next/image";
import { Carousel } from "@/components/Carousel";
import { CourseExplorer, ShowProgramsButton } from "@/components/CourseExplorer";
import { EnquireButton } from "@/components/Enquiry";
import { EnquiryForm } from "@/components/EnquiryForm";
import { LiteYouTube } from "@/components/LiteYouTube";
import {
  ArrowRightIcon,
  BookIcon,
  BriefcaseIcon,
  BuildingIcon,
  CalendarIcon,
  CheckIcon,
  CounselIcon,
  GraduationIcon,
  LaptopIcon,
  PercentIcon,
  PhoneIcon,
  PlusIcon,
  QuoteIcon,
  ShieldIcon,
  UsersIcon,
  WalletIcon,
  WhatsAppIcon,
} from "@/components/icons";
import { courses, formatINR, lowestEmi, universities, uniTone, type UniversityId } from "@/data/courses";
import { accreditations, faqs, highlights, onlineAdvantages, steps, testimonials, videos } from "@/data/home";
import { site } from "@/data/site";

export default function Home() {
  return (
    <>
      <Hero />
      <Highlights />
      <Rankings />
      <section id="programs" className="scroll-mt-24 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CourseExplorer />
        </div>
      </section>
      <Advantage />
      <Universities />
      <OnlineAdvantages />
      <SampleDegree />
      <HowItWorks />
      <Stories />
      <Faq />
      <AdvanceCareer />
    </>
  );
}

/* ---------- shared bits ---------- */

function Eyebrow({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return <p className={`text-sm font-semibold tracking-[0.16em] uppercase ${light ? "text-amber" : "text-brand"}`}>{children}</p>;
}

function Title({ children, light, className = "" }: { children: React.ReactNode; light?: boolean; className?: string }) {
  return <h2 className={`mt-2 text-3xl font-semibold sm:text-[2.6rem] sm:leading-tight ${light ? "text-white" : "text-navy"} ${className}`}>{children}</h2>;
}

const container = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";

/* ---------- 1. Hero ---------- */

function Hero() {
  const badges = accreditations.filter((a) => ["NAAC A+", "UGC-entitled", "AICTE"].includes(a.name));
  const programs = ["MBA", "MCA", "BBA", "BCA", "B.Com", "M.Com", "MA", "MA JMC"];
  return (
    <section className="relative -mt-[76px] overflow-hidden bg-navy-deep pt-[76px] text-white">
      <div aria-hidden="true" className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_left,black_30%,transparent_75%)]" />
      <div aria-hidden="true" className="absolute -top-32 left-1/3 size-[40rem] rounded-full bg-brand/25 blur-[120px]" />
      <div aria-hidden="true" className="absolute right-0 -bottom-40 size-[28rem] rounded-full bg-amber/15 blur-[100px]" />

      <div className={`${container} relative grid gap-10 pt-12 pb-16 lg:grid-cols-[1fr_400px] lg:pt-16 lg:pb-20 xl:grid-cols-[1fr_250px_400px] xl:gap-8`}>
        {/* Copy */}
        <div className="xl:pt-4">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm text-white/80">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-green-400" />
            </span>
            Admissions open
          </p>
          <h1 className="mt-6 text-[2.5rem] leading-[1.08] font-bold sm:text-[3.4rem]">
            Online degrees from India’s <span className="text-amber">top universities</span>
          </h1>
          <p className="mt-5 flex flex-wrap gap-x-2 gap-y-1 text-[15px] font-semibold text-white/85">
            {programs.map((p, i) => (
              <span key={p} className="flex items-center gap-2">
                {p}
                {i < programs.length - 1 && <span className="text-white/30">|</span>}
              </span>
            ))}
          </p>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/70">
            Manipal University Jaipur, Sikkim Manipal, Shoolini and WeSchool in one place. Free counselling, honest fee advice and
            help with EMI and education loans.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#programs" className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-7 py-4 font-semibold text-white transition hover:bg-brand-dark">
              Explore programs <ArrowRightIcon className="size-5" />
            </a>
            <EnquireButton
              source="Hero brochure"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 px-7 py-4 font-semibold text-white transition hover:bg-white/10"
            >
              Get the brochure
            </EnquireButton>
          </div>

          <ul className="mt-10 inline-grid grid-cols-3 gap-2 rounded-2xl bg-white p-3 text-ink sm:gap-4 sm:p-4">
            {badges.map((b) => (
              <li key={b.name} className="flex flex-col items-center px-1 text-center sm:px-3">
                {b.src && <Image src={b.src} alt="" width={160} height={160} className="size-12 sm:size-14" />}
                <span className="mt-1.5 text-xs leading-tight font-semibold text-navy">{b.name}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Photo with floating facts (wide screens only) */}
        <div className="relative hidden xl:block">
          <div className="relative mt-6 h-[440px] overflow-hidden rounded-t-[999px] rounded-b-3xl ring-1 ring-white/15">
            <Image src="/images/photos/hero-professional.webp" alt="Working professional studying an online degree" fill sizes="250px" className="object-cover" preload />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/60 via-transparent" />
          </div>
          <div className="absolute top-24 -left-12 rounded-2xl bg-white px-4 py-3 text-ink shadow-lift">
            <p className="text-xs text-muted">No-cost EMI from</p>
            <p className="font-display text-xl font-semibold text-navy">{formatINR(lowestEmi)}/mo</p>
          </div>
          <div className="absolute -right-6 bottom-10 flex items-center gap-2.5 rounded-2xl bg-amber px-4 py-3 text-navy-deep shadow-lift">
            <CounselIcon className="size-6" />
            <p className="text-sm leading-tight font-bold">
              Free 1:1
              <br />
              counselling
            </p>
          </div>
        </div>

        {/* Lead form */}
        <div className="relative">
          <div className="overflow-hidden rounded-3xl bg-white text-ink shadow-[0_30px_60px_-20px_rgb(0_0_0/0.5)]">
            <div className="p-6 sm:p-7">
              <h2 className="font-sans text-xl font-bold text-navy">Get a free career counselling session</h2>
              <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold">
                <span className="inline-flex items-center gap-1.5 rounded-md bg-peach px-2 py-1 text-brand-dark">
                  <WalletIcon className="size-3.5" /> Easy EMI options
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-md bg-peach px-2 py-1 text-brand-dark">
                  <PercentIcon className="size-3.5" /> Scholarships
                </span>
              </div>
              <div className="mt-5">
                <EnquiryForm source="Homepage hero" submitLabel="Apply now" />
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

/* ---------- 2. Highlights strip ---------- */

const highlightIcons = [LaptopIcon, ShieldIcon, WalletIcon, BriefcaseIcon];

function Highlights() {
  return (
    <section aria-label="Highlights" className="border-b border-line bg-white">
      <ul className={`${container} grid grid-cols-2 gap-x-6 gap-y-7 py-9 lg:grid-cols-4 lg:divide-x lg:divide-line`}>
        {highlights.map((h, i) => {
          const Icon = highlightIcons[i];
          return (
            <li key={h.title} className="flex items-start gap-3.5 lg:px-6 lg:first:pl-0">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-navy text-amber">
                <Icon className="size-5" />
              </span>
              <div>
                <p className="font-display text-lg leading-snug font-semibold text-navy">{h.title}</p>
                <p className="mt-0.5 hidden text-sm text-muted sm:block">{h.body}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/* ---------- 3. Rankings & accreditations ---------- */

function Rankings() {
  return (
    <section className="bg-white pt-16 pb-12 sm:pt-20">
      <div className={container}>
        <Carousel
          label="rankings and accreditations"
          header={
            <>
              <Eyebrow>Recognition</Eyebrow>
              <Title>Rankings &amp; accreditations</Title>
            </>
          }
        >
          {accreditations.map((a) => (
            <li key={a.name} className="w-[62%] shrink-0 snap-start sm:w-[30%] lg:w-[calc(20%-16px)]">
              <div className="relative flex h-full flex-col items-center rounded-3xl border border-line bg-cream px-5 pt-8 pb-6 text-center">
                {a.ribbon && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-b-lg rounded-t-sm bg-gradient-to-b from-brand to-brand-dark px-3 py-1 text-xs font-bold whitespace-nowrap text-white shadow-card">
                    {a.ribbon}
                  </span>
                )}
                <div className="grid size-24 place-items-center rounded-2xl bg-white shadow-card">
                  {a.src ? (
                    <Image src={a.src} alt="" width={160} height={160} className="size-20 object-contain" />
                  ) : (
                    <span className="font-display text-2xl font-bold text-navy">{a.mark}</span>
                  )}
                </div>
                <p className="mt-4 font-bold text-navy">{a.name}</p>
                <p className="mt-1 text-[13px] leading-snug text-muted">{a.detail}</p>
              </div>
            </li>
          ))}
        </Carousel>
      </div>
    </section>
  );
}

/* ---------- 5. The Onegrow advantage (bento) ---------- */

function Advantage() {
  const small = [
    { icon: CounselIcon, title: "Free 1:1 counselling", body: "Honest advice on the right program, without any fee." },
    { icon: BuildingIcon, title: "4 universities, one place", body: "Compare MUJ, SMU, Shoolini and WeSchool side by side." },
    { icon: BookIcon, title: "Help with loans & paperwork", body: "We guide you through documents and education loans." },
    { icon: BriefcaseIcon, title: "Placement assistance", body: "Resume help, interview prep and job opportunities." },
  ];
  return (
    <section className="relative overflow-hidden bg-sun py-20 sm:py-24">
      <svg aria-hidden="true" viewBox="0 0 600 600" className="absolute -top-32 -right-40 size-[44rem] text-amber/20">
        <path d="M300 40c143 0 260 117 260 260S443 560 300 560 40 443 40 300" fill="none" stroke="currentColor" strokeWidth="70" strokeLinecap="round" />
      </svg>
      <div className={`${container} relative`}>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Eyebrow>Why Onegrow</Eyebrow>
            <Title>The Onegrow 360° advantage</Title>
            <p className="mt-4 text-lg text-ink/70">Whether you&apos;re starting out, switching careers or aiming higher, we stay with you from the first call to your first job.</p>
          </div>
          <EnquireButton source="Advantage section" className="inline-flex shrink-0 items-center gap-2 self-start rounded-xl bg-navy px-6 py-3.5 font-semibold text-white hover:bg-navy-deep lg:self-auto">
            Request a call back <ArrowRightIcon className="size-5" />
          </EnquireButton>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {small.map((s) => (
            <div key={s.title} className="rounded-3xl bg-white p-6 shadow-card">
              <span className="grid size-12 place-items-center rounded-2xl bg-navy text-amber">
                <s.icon className="size-6" />
              </span>
              <p className="mt-5 font-display text-xl leading-snug font-semibold text-navy">{s.title}</p>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.body}</p>
            </div>
          ))}

          <div className="relative overflow-hidden rounded-3xl bg-navy p-7 text-white md:col-span-1 lg:col-span-2">
            <div aria-hidden="true" className="absolute -right-10 -bottom-16 size-48 rounded-full bg-brand/40 blur-2xl" />
            <WalletIcon className="relative size-8 text-amber" />
            <p className="relative mt-5 text-white/70">No-cost EMI starting at</p>
            <p className="relative font-display text-5xl font-semibold">
              {formatINR(lowestEmi)}
              <span className="text-xl text-white/60">/month</span>
            </p>
            <p className="relative mt-3 max-w-sm text-[15px] text-white/70">Spread your fee over easy monthly instalments, so cost never decides your career.</p>
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand to-amber p-7 text-white md:col-span-1 lg:col-span-2">
            <PercentIcon className="size-8" />
            <p className="mt-5 font-display text-3xl leading-tight font-semibold">Scholarships &amp; Pay After Placement</p>
            <p className="mt-3 max-w-md text-[15px] text-white/90">
              Scholarships of up to 20% at Manipal universities for defence personnel, government employees, differently-abled and
              meritorious students. Shoolini lets you pay part of the fee after you get placed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 6. Universities ---------- */

const campusPhoto: Partial<Record<UniversityId, string>> = {
  muj: "/images/photos/campus-muj.webp",
  smu: "/images/photos/campus-smu.webp",
};

function Universities() {
  const order: UniversityId[] = ["muj", "smu", "shoolini", "welingkar"];
  return (
    <section className="py-20 sm:py-24">
      <div className={container}>
        <div className="max-w-2xl">
          <Eyebrow>Our partners</Eyebrow>
          <Title>Choose from universities you can trust</Title>
        </div>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {order.map((id) => {
            const u = universities[id];
            const n = courses.filter((c) => c.university === id).length;
            const photo = campusPhoto[id];
            return (
              <li key={id} className="group flex flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-card">
                <div className="relative h-40 overflow-hidden">
                  {photo ? (
                    <Image src={photo} alt={`${u.name} campus`} fill sizes="(min-width:1024px) 300px, 50vw" className="object-cover transition duration-500 group-hover:scale-105" />
                  ) : (
                    <div className={`grid size-full place-items-center ${id === "shoolini" ? "bg-gradient-to-br from-[#4b2a8f] to-[#8a5cd6]" : "bg-gradient-to-br from-navy to-[#2b4fb8]"}`}>
                      <span className="font-display text-3xl font-semibold text-white/90">{u.short}</span>
                    </div>
                  )}
                  <span className={`absolute top-3 left-3 rounded-md px-2 py-1 text-[11px] font-bold ${uniTone[id]}`}>
                    {n} program{n > 1 ? "s" : ""}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  {u.logo ? (
                    <Image src={u.logo.src} alt={u.name} width={u.logo.width} height={u.logo.height} className="h-10 w-auto self-start object-contain" />
                  ) : (
                    <p className="flex h-10 items-center font-display text-xl font-semibold text-navy">{u.name.replace(" (WeSchool)", "")}</p>
                  )}
                  <p className="mt-2 text-sm text-muted">{u.location}</p>
                  <ul className="mt-4 space-y-1.5 text-sm">
                    {u.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2 text-ink/80">
                        <CheckIcon className="size-4 shrink-0 text-brand" /> {h}
                      </li>
                    ))}
                  </ul>
                  <ShowProgramsButton uni={id} className="mt-auto inline-flex items-center gap-1.5 self-start pt-5 font-semibold text-brand hover:text-brand-dark">
                    View programs <ArrowRightIcon className="size-4" />
                  </ShowProgramsButton>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ---------- 7. Why study online ---------- */

const tone = {
  pink: "bg-[#ffe1ea] text-[#b4234f]",
  blue: "bg-[#dcebff] text-[#1f57b8]",
  yellow: "bg-[#fff0bf] text-[#8a5a00]",
  green: "bg-[#e1f3d2] text-[#3b7a17]",
};
const advIcons = [CalendarIcon, ShieldIcon, UsersIcon, GraduationIcon];

function OnlineAdvantages() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className={container}>
        <div className="max-w-2xl">
          <Eyebrow>Why study online</Eyebrow>
          <Title>A real degree that fits around your life</Title>
        </div>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {onlineAdvantages.map((a, i) => {
            const Icon = advIcons[i];
            return (
              <li key={a.title} className="rounded-3xl bg-[#f5f4f2] p-6">
                <span className={`grid size-12 place-items-center rounded-full ${tone[a.tone]}`}>
                  <Icon className="size-6" />
                </span>
                <p className="mt-5 font-display text-xl leading-snug font-semibold text-navy">{a.title}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{a.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ---------- 8. Sample degree ---------- */

function SampleDegree() {
  const points = [
    "Degree awarded directly by the university, under its own seal",
    "UGC-entitled, so it is valid for government jobs, private jobs and higher studies",
    "Credits recorded in your Academic Bank of Credits (ABC) account",
    "Recognised abroad by WES and ICAS for study and work",
  ];
  return (
    <section className="overflow-hidden bg-navy py-20 text-white sm:py-24">
      <div className={`${container} grid items-center gap-14 lg:grid-cols-2`}>
        <div className="relative order-2 lg:order-1">
          <div aria-hidden="true" className="absolute inset-6 -rotate-6 rounded-3xl bg-gradient-to-br from-brand to-amber opacity-80" />
          <div className="relative rotate-2 rounded-3xl bg-white p-3 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.7)]">
            <Image src="/images/photos/degree-sample-muj.webp" alt="Sample online MBA degree certificate from Manipal University Jaipur" width={960} height={735} className="rounded-2xl" />
          </div>
          <span className="absolute -bottom-4 left-6 rounded-full bg-white px-4 py-2 text-sm font-semibold text-navy shadow-lift">Sample degree, MUJ Online MBA</span>
        </div>
        <div className="order-1 lg:order-2">
          <Eyebrow light>Your degree</Eyebrow>
          <Title light>Earn a respected university degree, without leaving your job</Title>
          <ul className="mt-8 space-y-4">
            {points.map((p) => (
              <li key={p} className="flex gap-3 text-[17px] text-white/80">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-amber text-navy-deep">
                  <CheckIcon className="size-4" />
                </span>
                {p}
              </li>
            ))}
          </ul>
          <EnquireButton source="Sample degree" className="mt-9 inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3.5 font-semibold text-white hover:bg-brand-dark">
            Check your eligibility <ArrowRightIcon className="size-5" />
          </EnquireButton>
        </div>
      </div>
    </section>
  );
}

/* ---------- 9. How it works ---------- */

function HowItWorks() {
  return (
    <section className="py-20 sm:py-24">
      <div className={container}>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>How it works</Eyebrow>
          <Title>From first call to first class in four steps</Title>
        </div>
        <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="relative rounded-3xl border border-line bg-white p-6 pt-8">
              <span className="absolute -top-5 left-6 grid size-10 place-items-center rounded-xl bg-gradient-to-br from-brand to-amber font-display text-lg font-semibold text-white shadow-card">
                {i + 1}
              </span>
              <p className="font-display text-xl font-semibold text-navy">{s.title}</p>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- 10. Stories ---------- */

function Stories() {
  return (
    <section className="bg-peach py-20 sm:py-24">
      <div className={container}>
        <Carousel
          label="stories"
          header={
            <>
              <Eyebrow>Stories</Eyebrow>
              <Title>Real stories, real growth</Title>
            </>
          }
        >
          {testimonials.map((t) => (
            <li key={t.name} className="w-[85%] shrink-0 snap-start sm:w-[45%] lg:w-[calc(33.333%-14px)]">
              <figure className="flex h-full flex-col rounded-3xl bg-white p-7 shadow-card">
                <QuoteIcon className="size-8 text-amber" />
                <blockquote className="mt-4 flex-1 text-[17px] leading-relaxed text-ink/85">{t.quote}</blockquote>
                <figcaption className="mt-6 flex items-center gap-3 font-semibold text-navy">
                  <span className="grid size-11 place-items-center rounded-full bg-navy font-display text-lg text-white">{t.name[0]}</span>
                  {t.name}
                </figcaption>
              </figure>
            </li>
          ))}
          {videos.map((v) => (
            <li key={v.id} className="w-[85%] shrink-0 snap-start sm:w-[45%] lg:w-[calc(33.333%-14px)]">
              <div className="flex h-full flex-col justify-center rounded-3xl bg-white p-3 shadow-card">
                <LiteYouTube id={v.id} title={v.title} />
              </div>
            </li>
          ))}
        </Carousel>
      </div>
    </section>
  );
}

/* ---------- 11. FAQ ---------- */

function Faq() {
  return (
    <section className="py-20 sm:py-24">
      <div className={`${container} grid gap-12 lg:grid-cols-[1fr_1.6fr]`}>
        <div>
          <Eyebrow>FAQ</Eyebrow>
          <Title>Questions students ask us</Title>
          <p className="mt-4 text-lg text-muted">Can&apos;t find your answer? Our counsellors are a call or message away.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={site.phoneHref} className="inline-flex items-center gap-2 rounded-xl bg-navy px-5 py-3 font-semibold text-white hover:bg-navy-deep">
              <PhoneIcon className="size-5" /> Call us
            </a>
            <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-5 py-3 font-semibold text-navy hover:border-navy/30">
              <WhatsAppIcon className="size-5 text-[#25D366]" /> WhatsApp
            </a>
          </div>
        </div>
        <div className="space-y-3">
          {faqs.map((f) => (
            <details key={f.q} className="group rounded-2xl border border-line bg-white px-6 py-5 open:shadow-card [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold text-navy">
                {f.q}
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-peach text-brand transition group-open:rotate-45">
                  <PlusIcon className="size-4" />
                </span>
              </summary>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 12. Advance your career (closing form) ---------- */

function AdvanceCareer() {
  return (
    <section className="px-4 pb-20 sm:px-6 sm:pb-24 lg:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-mint">
        <svg aria-hidden="true" viewBox="0 0 800 400" className="absolute inset-0 size-full text-[#d7eac2]" preserveAspectRatio="none">
          <path d="M-20 320C120 120 260 380 400 200S640 20 820 140" fill="none" stroke="currentColor" strokeWidth="60" strokeLinecap="round" />
        </svg>
        <div className="relative grid items-end gap-6 lg:grid-cols-[1.3fr_1fr]">
          <div className="p-6 sm:p-10 lg:p-14">
            <Eyebrow>Free counselling</Eyebrow>
            <Title>Advance your career</Title>
            <p className="mt-3 text-lg text-ink/70">Fill in your details and our team will connect with you shortly.</p>
            <div className="mt-8 rounded-3xl bg-white p-5 shadow-card sm:p-7">
              <EnquiryForm source="Homepage footer form" submitLabel="Apply now" />
            </div>
          </div>
          <div className="relative hidden self-center p-10 pl-0 lg:block">
            <div className="relative mx-auto aspect-[4/5] max-w-sm overflow-hidden rounded-t-[999px] rounded-b-[2rem] ring-8 ring-white/70">
              <Image src="/images/photos/counsellor.webp" alt="" fill sizes="384px" className="object-cover" />
            </div>
            <div className="absolute bottom-16 left-0 rounded-2xl bg-white px-5 py-4 shadow-lift">
              <p className="text-sm text-muted">Talk to us directly</p>
              <a href={site.phoneHref} className="font-display text-xl font-semibold text-navy">
                {site.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
