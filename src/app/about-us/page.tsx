import type { Metadata } from "next";
import Image from "next/image";
import { Advantage, AdvanceCareer, container, Eyebrow, Faq, HowItWorks, PageHero, Stories, Title, Universities } from "@/components/blocks";
import { EnquireButton } from "@/components/Enquiry";
import { ArrowRightIcon, BriefcaseIcon, BuildingIcon, CounselIcon, GraduationIcon, UsersIcon, WalletIcon } from "@/components/icons";
import { site } from "@/data/site";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: "About Us: Career Counselling & Online Degree Guidance",
  description:
    "Onegrow Learning offers free, personalised career counselling and helps students and working professionals choose UGC-entitled online degrees from top universities.",
};

const audiences = [
  { icon: GraduationIcon, title: "Students", body: "Pick the right undergraduate or postgraduate degree and start your career on the right foot." },
  { icon: BriefcaseIcon, title: "Working professionals", body: "Earn a recognised degree while you keep working, and move up or switch careers." },
  { icon: BuildingIcon, title: "Organisations", body: "Upskill your teams with practical programs from established universities." },
];

const services = [
  { icon: CounselIcon, title: "Career counselling", body: "One-on-one guidance on career planning, skills and the program that fits your goals. Free of cost." },
  { icon: GraduationIcon, title: "Admissions support", body: "We help you compare universities, prepare documents and complete your application." },
  { icon: WalletIcon, title: "Loans & EMI", body: "Full support with education loan applications and no-cost EMI plans." },
  { icon: UsersIcon, title: "Placements & internships", body: "Placement assistance and internship opportunities through our specialised programs." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumb="About Us"
        eyebrow="About Onegrow"
        title="Empowering careers,"
        highlight="shaping futures"
        sub="At Onegrow, we believe every individual has the potential to excel in their career with the right guidance. In today's fast-changing job market, the right skills and knowledge help you stay ahead."
        image={asset("/images/photos/counsellor.webp")}
        imageAlt="Onegrow career counsellor"
        chip={{ label: "Counselling fee", value: "₹0" }}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <EnquireButton source="About hero" className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-7 py-4 font-semibold text-white hover:bg-brand-dark">
            Book free counselling <ArrowRightIcon className="size-5" />
          </EnquireButton>
          <a href={site.phoneHref} className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 px-7 py-4 font-semibold text-white hover:bg-white/10">
            Call {site.phone}
          </a>
        </div>
      </PageHero>

      <section className="py-20 sm:py-24">
        <div className={`${container} grid items-center gap-12 lg:grid-cols-2 lg:gap-16`}>
          <div className="relative">
            <div aria-hidden="true" className="absolute -inset-3 -rotate-3 rounded-[2.5rem] bg-gradient-to-br from-brand/20 to-amber/30" />
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-lift">
              <Image src={asset("/images/photos/graduate.webp")} alt="Graduate celebrating her degree" fill sizes="(min-width:1024px) 600px, 90vw" className="object-cover" />
            </div>
            <div className="absolute -right-3 -bottom-6 max-w-[15rem] rounded-2xl bg-navy px-5 py-4 text-white shadow-lift sm:-right-6">
              <p className="font-display text-lg font-semibold">Your better future starts here</p>
            </div>
          </div>
          <div>
            <Eyebrow>Who we are</Eyebrow>
            <Title>Practical guidance for every step of your career</Title>
            <p className="mt-5 text-lg leading-relaxed text-ink/75">
              We specialise in personalised career counselling, offering practical advice and support for students, professionals and organisations. Our mission is to help you
              navigate the changing world of work, so you are always prepared for the next step in your journey.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-ink/75">
              Whether you&apos;re just starting out, changing careers or aiming for growth, we provide tailored solutions in career planning, skills development and professional
              growth, helping you make informed decisions and seize new opportunities.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-3">
              {audiences.map((a) => (
                <li key={a.title} className="rounded-2xl bg-white p-4 ring-1 ring-line">
                  <a.icon className="size-6 text-brand" />
                  <p className="mt-3 font-semibold text-navy">{a.title}</p>
                  <p className="mt-1 text-sm leading-snug text-muted">{a.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className={container}>
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>What we do</Eyebrow>
            <Title>Everything you need, under one roof</Title>
          </div>
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <li key={s.title} className={`rounded-3xl p-7 ${i % 2 ? "bg-navy text-white" : "bg-peach"}`}>
                <span className={`grid size-12 place-items-center rounded-2xl ${i % 2 ? "bg-white/10 text-amber" : "bg-white text-brand"}`}>
                  <s.icon className="size-6" />
                </span>
                <p className={`mt-5 font-display text-xl font-semibold ${i % 2 ? "text-white" : "text-navy"}`}>{s.title}</p>
                <p className={`mt-2 text-[15px] leading-relaxed ${i % 2 ? "text-white/70" : "text-muted"}`}>{s.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Advantage />
      <Universities />
      <HowItWorks />
      <Stories />
      <Faq />
      <AdvanceCareer source="About page form" title="Join us and take control of your career path" />
    </>
  );
}
