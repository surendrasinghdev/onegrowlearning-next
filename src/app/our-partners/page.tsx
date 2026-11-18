import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AdvanceCareer, container, Eyebrow, HowItWorks, PageHero, Rankings, Title } from "@/components/blocks";
import { EnquireButton } from "@/components/Enquiry";
import { ArrowRightIcon, CheckIcon } from "@/components/icons";
import { courseHref, courses, formatINR, universities, uniTone, type UniversityId } from "@/data/courses";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Our University Partners: Manipal University Jaipur & Sikkim Manipal University",
  description: "Onegrow works with UGC-entitled, NAAC A+ universities. Explore Manipal University Jaipur and Sikkim Manipal University and their online programs.",
};

const order: UniversityId[] = ["muj", "smu"];

export default function PartnersPage() {
  return (
    <>
      <PageHero
        crumb="Our Partners"
        eyebrow="Our partners"
        title="Universities you can"
        highlight="trust"
        sub="Our strong partnerships with leading universities let us offer high-quality, recognised degree programs. Compare them side by side and choose with confidence."
        image={asset("/images/photos/campus-muj.webp")}
        imageAlt="Manipal University Jaipur campus"
        chip={{ label: "Partner universities", value: String(order.length) }}
      >
        <div className="flex flex-wrap gap-3">
          {order.map((id) => (
            <a key={id} href={`#${id}`} className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/85 hover:bg-white/10">
              {universities[id].name}
            </a>
          ))}
        </div>
      </PageHero>

      <section className="py-20 sm:py-24">
        <div className={`${container} space-y-20`}>
          {order.map((id, i) => {
            const u = universities[id];
            const list = courses.filter((c) => c.university === id);
            return (
              <article key={id} id={id} className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <div className={`relative ${i % 2 ? "lg:order-2" : ""}`}>
                  <div aria-hidden="true" className={`absolute -inset-3 rounded-[2.5rem] bg-gradient-to-br from-brand/20 to-amber/30 ${i % 2 ? "-rotate-3" : "rotate-3"}`} />
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] shadow-lift">
                    {u.photo ? (
                      <Image src={u.photo} alt={`${u.name} campus`} fill sizes="(min-width:1024px) 600px, 90vw" className="object-cover" />
                    ) : (
                      <div className={`grid size-full place-items-center bg-gradient-to-br from-navy to-[#2b4fb8]`}>
                        <div className="text-center text-white">
                          <p className="font-display text-5xl font-bold">{u.short}</p>
                          <p className="mt-2 text-white/75">{u.location}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <span className={`absolute -bottom-4 left-6 rounded-xl px-4 py-2 text-sm font-bold shadow-lift ${uniTone[id]}`}>
                    {list.length} program{list.length > 1 ? "s" : ""}
                  </span>
                </div>

                <div>
                  {u.logo ? (
                    <Image src={u.logo.src} alt={u.name} width={u.logo.width} height={u.logo.height} className="h-14 w-auto" />
                  ) : (
                    <Eyebrow>{u.location}</Eyebrow>
                  )}
                  <Title className="mt-4">{u.name}</Title>
                  <p className="mt-4 text-lg leading-relaxed text-ink/75">{u.about}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {u.highlights.map((h) => (
                      <li key={h} className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-ink ring-1 ring-line">
                        <CheckIcon className="size-4 text-brand" /> {h}
                      </li>
                    ))}
                  </ul>
                  <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                    {list.map((c) => (
                      <li key={c.slug}>
                        <Link href={courseHref(c)} className="group flex items-center justify-between gap-3 rounded-2xl bg-white px-4 py-3 ring-1 ring-line transition hover:ring-brand/40">
                          <span>
                            <span className="block font-semibold text-navy">{c.code}</span>
                            <span className="text-xs text-muted">{c.fee ? formatINR(c.fee) : "Fee on request"}</span>
                          </span>
                          <ArrowRightIcon className="size-4 text-brand transition group-hover:translate-x-0.5" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <EnquireButton source={`Partners: ${u.short}`} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3.5 font-semibold text-white hover:bg-brand-dark">
                    Talk to a {u.short} counsellor <ArrowRightIcon className="size-5" />
                  </EnquireButton>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <Rankings />
      <HowItWorks />
      <AdvanceCareer source="Partners page form" />
    </>
  );
}
