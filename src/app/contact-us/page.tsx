import type { Metadata } from "next";
import { container, Eyebrow, Faq, HowItWorks, PageHero, Title } from "@/components/blocks";
import { EnquiryForm } from "@/components/EnquiryForm";
import { InstagramIcon, LinkedInIcon, MailIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Talk to an Onegrow career counsellor. Call ${site.phone}, WhatsApp us or email ${site.email} for free guidance on online degrees.`,
};

const channels = [
  { icon: PhoneIcon, title: "Call us", value: site.phone, href: site.phoneHref, note: "Speak to a counsellor directly", tone: "bg-navy text-amber" },
  { icon: WhatsAppIcon, title: "WhatsApp", value: "Chat with us", href: site.whatsappHref, note: "Quick answers on chat", tone: "bg-[#25D366] text-white", external: true },
  { icon: MailIcon, title: "Email", value: site.email, href: `mailto:${site.email}`, note: "We reply within a working day", tone: "bg-brand text-white" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumb="Contact Us"
        eyebrow="Contact us"
        title="Get in touch"
        highlight="with us"
        sub="We're here to help with any questions about programs, fees, admissions or loans. Fill in the form, call or message us, and a counsellor will get back to you."
        aside={
          <div className="overflow-hidden rounded-3xl bg-white p-6 text-ink shadow-[0_30px_60px_-20px_rgb(0_0_0/0.5)] sm:p-7">
            <h2 className="font-sans text-xl font-bold text-navy">Send us a message</h2>
            <p className="mt-1 text-sm text-muted">Free counselling. We&apos;ll call you back.</p>
            <div className="mt-5">
              <EnquiryForm source="Contact page" submitLabel="Request a call back" />
            </div>
          </div>
        }
      >
        <ul className="grid gap-3 sm:grid-cols-3 lg:max-w-sm lg:grid-cols-1">
          {channels.map((c) => (
            <li key={c.title}>
              <a
                href={c.href}
                {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="flex h-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-4 transition hover:bg-white/10"
              >
                <span className={`grid size-11 shrink-0 place-items-center rounded-xl ${c.tone}`}>
                  <c.icon className="size-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs text-white/60">{c.title}</span>
                  <span className="block truncate font-semibold">{c.value}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </PageHero>

      <section className="py-20 sm:py-24">
        <div className={container}>
          <div className="max-w-2xl">
            <Eyebrow>Reach us</Eyebrow>
            <Title>Whichever way works for you</Title>
          </div>
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {channels.map((c) => (
              <li key={c.title} className="rounded-3xl bg-white p-7 shadow-card ring-1 ring-line">
                <span className={`grid size-14 place-items-center rounded-2xl ${c.tone}`}>
                  <c.icon className="size-7" />
                </span>
                <p className="mt-5 font-display text-xl font-semibold text-navy">{c.title}</p>
                <p className="mt-1 text-muted">{c.note}</p>
                <a
                  href={c.href}
                  {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="mt-4 inline-block font-semibold break-all text-brand hover:text-brand-dark"
                >
                  {c.value}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-4 rounded-3xl bg-navy px-7 py-6 text-white">
            <p className="font-display text-lg font-semibold">Follow Onegrow</p>
            <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 font-semibold hover:bg-white/15">
              <LinkedInIcon className="size-5" /> LinkedIn
            </a>
            <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 font-semibold hover:bg-white/15">
              <InstagramIcon className="size-5" /> Instagram
            </a>
          </div>
        </div>
      </section>

      <HowItWorks />
      <Faq />
    </>
  );
}
