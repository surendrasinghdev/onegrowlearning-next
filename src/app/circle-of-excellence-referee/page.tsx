import type { Metadata } from "next";
import Image from "next/image";
import { container, Eyebrow, PageHero, Title, Universities } from "@/components/blocks";
import { EnquiryForm } from "@/components/EnquiryForm";
import { ArrowRightIcon, GraduationIcon, SparkIcon, UsersIcon } from "@/components/icons";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: "OneGrow Connect: Refer & Earn",
  description:
    "Refer friends and colleagues to graduation and post-graduation programs at top Indian and international universities through OneGrow Connect, and celebrate with exciting rewards.",
};

const how = [
  { icon: UsersIcon, title: "Refer someone", body: "Share the details of a friend, colleague or family member who wants to study further." },
  { icon: GraduationIcon, title: "We guide them", body: "Our counsellors help them pick the right program and complete their admission." },
  { icon: SparkIcon, title: "Celebrate together", body: "Enrol to get closer to your goals, and celebrate with exciting rewards along the way." },
];

export default function ReferPage() {
  return (
    <>
      <PageHero
        crumb="Refer & Earn"
        eyebrow="OneGrow Connect"
        title="Where dreams"
        highlight="take flight"
        sub="Refer passionate learners to prestigious graduation and post-graduation programs at top Indian and international universities, or to our Integrated MBA (6 months in India + 12 months abroad). Let's build a thriving network and grow stronger together."
        aside={
          <div className="overflow-hidden rounded-3xl bg-white p-6 text-ink shadow-[0_30px_60px_-20px_rgb(0_0_0/0.5)] sm:p-7">
            <h2 className="font-sans text-xl font-bold text-navy">Share your details</h2>
            <p className="mt-1 text-sm text-muted">Enrol to get closer to your professional goals.</p>
            <div className="mt-5">
              <EnquiryForm variant="referral" source="Referral page (Circle of Excellence)" submitLabel="Submit" />
            </div>
          </div>
        }
      >
        <a href="#how" className="inline-flex items-center gap-2 rounded-xl border border-white/25 px-6 py-3.5 font-semibold text-white hover:bg-white/10">
          How it works <ArrowRightIcon className="size-5" />
        </a>
      </PageHero>

      <section id="how" className="scroll-mt-24 py-20 sm:py-24">
        <div className={`${container} grid items-center gap-12 lg:grid-cols-2 lg:gap-16`}>
          <div>
            <Eyebrow>How it works</Eyebrow>
            <Title>Grow your circle, grow together</Title>
            <ol className="mt-8 space-y-4">
              {how.map((h, i) => (
                <li key={h.title} className="flex gap-4 rounded-3xl bg-white p-5 shadow-card ring-1 ring-line">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand to-amber text-white">
                    <h.icon className="size-6" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-brand">Step {i + 1}</p>
                    <p className="font-display text-lg font-semibold text-navy">{h.title}</p>
                    <p className="mt-1 text-[15px] text-muted">{h.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="relative">
            <div aria-hidden="true" className="absolute -inset-3 rotate-3 rounded-[2.5rem] bg-gradient-to-br from-brand/20 to-amber/30" />
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-lift">
              <Image src={asset("/images/photos/bba.webp")} alt="Friends studying together" fill sizes="(min-width:1024px) 600px, 90vw" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <Universities />
    </>
  );
}
