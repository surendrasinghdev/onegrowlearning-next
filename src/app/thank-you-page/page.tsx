import type { Metadata } from "next";
import Link from "next/link";
import { container, Eyebrow, Title } from "@/components/blocks";
import { Carousel } from "@/components/Carousel";
import { CourseCard } from "@/components/CourseExplorer";
import { ArrowRightIcon, CheckIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { courses } from "@/data/courses";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Thank You",
  robots: { index: false },
};

const next = [
  { title: "We review your details", body: "Your enquiry reaches our counselling team right away." },
  { title: "A counsellor calls you", body: "Expect a call or WhatsApp message from us shortly." },
  { title: "Get your plan", body: "Fees, EMI options, brochure and the best-fit programs for you." },
];

export default function ThankYouPage() {
  const popular = ["master-of-business-administration-muj", "master-of-business-administration", "master-of-computer-application", "bachelor-of-business-administration", "bachelor-of-computer-applications-bca"]
    .map((s) => courses.find((c) => c.slug === s)!)
    .filter(Boolean);
  return (
    <>
      <section className="relative -mt-[76px] overflow-hidden bg-navy-deep pt-[76px] text-white">
        <div aria-hidden="true" className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_70%)]" />
        <div aria-hidden="true" className="absolute -top-32 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-brand/25 blur-[120px]" />
        <div className={`${container} relative py-20 text-center sm:py-28`}>
          <span className="mx-auto grid size-20 place-items-center rounded-full bg-green-400/15 text-green-300 ring-8 ring-green-400/10">
            <CheckIcon className="size-10" />
          </span>
          <h1 className="mt-8 text-4xl font-bold sm:text-6xl">
            Thank you! <span className="text-amber">We&apos;ve got your request.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/70">A counsellor will get in touch with you shortly. Want to talk now? Call or message us.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-7 py-4 font-semibold text-white hover:brightness-95">
              <WhatsAppIcon className="size-5" /> Chat on WhatsApp
            </a>
            <a href={site.phoneHref} className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 px-7 py-4 font-semibold text-white hover:bg-white/10">
              <PhoneIcon className="size-5" /> {site.phone}
            </a>
          </div>
          <ol className="mx-auto mt-14 grid max-w-4xl gap-4 text-left sm:grid-cols-3">
            {next.map((n, i) => (
              <li key={n.title} className="rounded-3xl border border-white/10 bg-white/[0.06] p-5">
                <span className="grid size-9 place-items-center rounded-xl bg-amber font-display font-semibold text-navy-deep">{i + 1}</span>
                <p className="mt-4 font-semibold">{n.title}</p>
                <p className="mt-1 text-sm text-white/65">{n.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className={container}>
          <Carousel
            label="popular programs"
            header={
              <>
                <Eyebrow>While you wait</Eyebrow>
                <Title>Explore popular programs</Title>
              </>
            }
          >
            {popular.map((c) => (
              <CourseCard key={c.slug} course={c} />
            ))}
          </Carousel>
          <Link href="/popular-programs/" className="mt-8 inline-flex items-center gap-2 font-semibold text-brand hover:text-brand-dark">
            See all programs <ArrowRightIcon className="size-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
