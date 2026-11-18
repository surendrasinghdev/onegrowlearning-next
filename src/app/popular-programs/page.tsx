import type { Metadata } from "next";
import Link from "next/link";
import { Advantage, AdvanceCareer, container, Eyebrow, PageHero, Title } from "@/components/blocks";
import { EnquireButton } from "@/components/Enquiry";
import { ArrowRightIcon } from "@/components/icons";
import { ProgramsGrid } from "@/components/ProgramsGrid";
import { courseHref, courses, formatDuration, formatINR, lowestEmi, universities, type UniversityId } from "@/data/courses";
import { site } from "@/data/site";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: "All Online Degree Programs: MBA, MCA, BBA, BCA, B.Com, MA",
  description:
    "Compare every online degree we offer from Manipal University Jaipur, Sikkim Manipal University, Shoolini and WeSchool: fees, duration, EMI and eligibility in one place.",
};

export default function ProgramsPage() {
  const uniOrder: UniversityId[] = ["muj", "smu", "shoolini", "welingkar"];
  return (
    <>
      <PageHero
        crumb="Programs"
        eyebrow="#UnlockYourPotential"
        title="Online degree programs from"
        highlight="top universities"
        sub="Choose the right career path for your goals, and let Onegrow guide you with personalised counselling and support so you succeed in your chosen field."
        image={asset("/images/photos/lecture.webp")}
        imageAlt="Students in a university lecture hall"
        chip={{ label: "No-cost EMI from", value: `${formatINR(lowestEmi)}/mo` }}
      >
        <ul className="flex flex-wrap gap-3 text-sm font-semibold">
          {[`${courses.length} programs`, `${uniOrder.length} universities`, "UGC-entitled degrees", "Free counselling"].map((t) => (
            <li key={t} className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-white/85">
              {t}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="#all-programs" className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-7 py-4 font-semibold text-white hover:bg-brand-dark">
            Browse programs <ArrowRightIcon className="size-5" />
          </a>
          <a href={site.phoneHref} className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 px-7 py-4 font-semibold text-white hover:bg-white/10">
            Call {site.phone}
          </a>
        </div>
      </PageHero>

      <section id="all-programs" className="scroll-mt-24 py-16 sm:py-20">
        <div className={container}>
          <ProgramsGrid />
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className={container}>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <Eyebrow>Compare</Eyebrow>
              <Title>Fees at a glance</Title>
              <p className="mt-3 text-muted">Total fee for Indian students, from each university&apos;s official website ({site.feesCheckedOn}).</p>
            </div>
            <EnquireButton source="Programs compare table" className="inline-flex shrink-0 items-center gap-2 self-start rounded-xl bg-navy px-5 py-3 font-semibold text-white hover:bg-navy-deep lg:self-auto">
              Help me choose <ArrowRightIcon className="size-4" />
            </EnquireButton>
          </div>

          <div className="mt-10 overflow-x-auto rounded-3xl ring-1 ring-line">
            <table className="w-full min-w-[720px] border-collapse text-left text-[15px]">
              <thead className="bg-navy text-white">
                <tr>
                  {["Program", "University", "Duration", "Total fee", "EMI from", ""].map((h) => (
                    <th key={h} scope="col" className="px-5 py-4 font-semibold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {uniOrder.flatMap((u) =>
                  courses
                    .filter((c) => c.university === u)
                    .map((c, i) => (
                      <tr key={c.slug} className={`border-t border-line ${i % 2 ? "bg-cream" : "bg-white"} hover:bg-peach`}>
                        <th scope="row" className="px-5 py-3.5 font-semibold text-navy">
                          {c.code}
                          <span className="block text-xs font-normal text-muted">{c.name}</span>
                        </th>
                        <td className="px-5 py-3.5 text-ink/80">{universities[c.university].name.replace(" (WeSchool)", "")}</td>
                        <td className="px-5 py-3.5 text-ink/80">{formatDuration(c.durationMonths)}</td>
                        <td className="px-5 py-3.5 font-semibold text-ink">{c.fee ? formatINR(c.fee) : "On request"}</td>
                        <td className="px-5 py-3.5 text-ink/80">{c.emiFrom ? `${formatINR(c.emiFrom)}/mo` : "-"}</td>
                        <td className="px-5 py-3.5 text-right">
                          <Link href={courseHref(c)} className="inline-flex items-center gap-1 font-semibold text-brand hover:text-brand-dark">
                            View <ArrowRightIcon className="size-4" />
                          </Link>
                        </td>
                      </tr>
                    )),
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Advantage />
      <div className="pt-20 sm:pt-24">
        <AdvanceCareer source="Programs page form" title="Not sure which program fits?" sub="Tell us your background and goals. A counsellor will compare options for you, free of cost." />
      </div>
    </>
  );
}
