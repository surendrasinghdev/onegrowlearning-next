import { asset } from "@/lib/asset";
import Image from "next/image";
import Link from "next/link";
import { courses, courseHref, universities, type UniversityId } from "@/data/courses";
import { site } from "@/data/site";
import { InstagramIcon, LinkedInIcon, MailIcon, PhoneIcon, WhatsAppIcon } from "./icons";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us/" },
  { label: "All Programs", href: "/popular-programs/" },
  { label: "Our Partners", href: "/our-partners/" },
  { label: "Refer & Earn", href: "/circle-of-excellence-referee/" },
  { label: "Contact Us", href: "/contact-us/" },
];

export function Footer() {
  const unis: UniversityId[] = ["muj", "smu"];
  const year = process.env.NEXT_PUBLIC_BUILD_YEAR;
  return (
    <footer className="bg-navy-deep text-white/75">
      <div className="mx-auto max-w-site-px px-4 pt-16 pb-10 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Image src={asset("/images/brand/logo-light.png")} alt="Onegrow Learning" width={640} height={209} className="h-11 w-auto" />
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed">
              Our partnerships with leading universities let us offer high-quality, recognised online degree programs. Together, we
              help learners grow their careers.
            </p>
            <ul className="mt-6 space-y-3 text-[15px]">
              <li>
                <a href={site.phoneHref} className="inline-flex items-center gap-3 hover:text-white">
                  <PhoneIcon className="size-5 text-amber" /> {site.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="inline-flex items-center gap-3 hover:text-white">
                  <MailIcon className="size-5 text-amber" /> {site.email}
                </a>
              </li>
              <li>
                <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 hover:text-white">
                  <WhatsAppIcon className="size-5 text-amber" /> Chat on WhatsApp
                </a>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-3">
            <div>
              <h2 className="font-display text-base font-bold text-white">Quick links</h2>
              <ul className="mt-4 space-y-2.5 text-[15px]">
                {quickLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            {unis.map((u) => (
              <FooterCourses key={u} uni={u} />
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/terms-conditions/" className="hover:text-white">
              Terms & Conditions
            </Link>
            <Link href="/privacy-policy/" className="hover:text-white">
              Privacy Policy
            </Link>
            <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Onegrow on LinkedIn" className="hover:text-white">
              <LinkedInIcon className="size-5" />
            </a>
            <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Onegrow on Instagram" className="hover:text-white">
              <InstagramIcon className="size-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCourses({ uni }: { uni: UniversityId }) {
  return (
    <div>
      <h2 className="font-display text-base font-bold text-white">{universities[uni].name}</h2>
      <ul className="mt-4 space-y-2.5 text-[15px]">
        {courses
          .filter((c) => c.university === uni)
          .map((c) => (
            <li key={c.slug}>
              <Link href={courseHref(c)} className="hover:text-white">
                {c.code}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
