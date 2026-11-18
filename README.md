# onegrowlearning.com (Next.js)

Redesign of onegrowlearning.com, moving from WordPress/Elementor to Next.js 16 + Tailwind CSS 4.

## Run locally

```bash
npm install
npm run dev -- -p 3130
```

Open http://localhost:3130.

## Lead emails

Every form on the site sends the lead by email. Copy `.env.example` to `.env.local` and fill in the SMTP details (Hostinger: `smtp.hostinger.com`, port 465). Without SMTP settings, leads are only printed to the dev server log in development, and the form shows an error in production.

## Preview on GitHub Pages

Every push to `main` publishes a static copy to https://surendrasinghdev.github.io/onegrowlearning-next/ (`.github/workflows/pages.yml`). That build (`GITHUB_PAGES=true npx next build`) has no server, so:

- the enquiry form sends the lead over WhatsApp instead of email (`src/app/actions.static.ts`)
- old WordPress URLs that were removed use a meta refresh page instead of a server redirect (`src/components/MovedPage.tsx`)
- image paths go through `asset()` in `src/lib/asset.ts` to add the `/onegrowlearning-next` prefix

For the real launch, host the normal build on a Node server (e.g. Vercel) so leads are emailed.

## Pages

Every page of the old WordPress site exists at the same URL.

| URL | Source |
|---|---|
| `/` | `src/app/page.tsx` (sections in `src/components/blocks.tsx`) |
| `/<course-slug>/` (23 programs) | `src/app/[slug]/page.tsx`, data from `src/data/courses.ts` + `src/data/course-details.ts` |
| `/popular-programs/`, `/our-partners/`, `/about-us/`, `/contact-us/` | `src/app/<name>/page.tsx` |
| `/circle-of-excellence-referee/` | Referral form (`EnquiryForm variant="referral"`) |
| `/thank-you-page/`, `/privacy-policy/`, `/terms-conditions/` | `src/app/<name>/page.tsx`, legal text in `src/data/legal.json` |
| `/homepage/`, `/career-support/`, `/success-stories/`, `/resource/` | Redirect to `/` (removed pages) |
| `/pg-media-entertainment-welingkar/` | New: the Media program that was mixed into the old Welingkar page |

## Where things are

| Path | What |
|---|---|
| `src/data/courses.ts` | All programs, universities and fees (fees checked Nov 2026) |
| `src/data/course-content.json` | Curriculum, specialisations, careers, admission and FAQs per course, from the backup |
| `src/data/course-details.ts` | Adds sample degrees and the two WeSchool programs to the above |
| `src/data/home.ts` | Homepage copy: benefits, steps, testimonials, FAQs, videos, rankings |
| `src/data/site.ts` | Phone, email, WhatsApp, nav |
| `src/app/actions.ts`, `src/lib/lead.ts` | Lead form validation + email |
| `src/components/` | Header, footer, page sections, enquiry form and popup, course explorer |
| `scripts/` | One-off scripts that pulled content and images out of the WordPress backup |
| `content/` | Text of every old WordPress page, extracted from the backup |
| `INVENTORY.md`, `CORRECTIONS.md` | Old site inventory and the fixes made |
| `wp-export/` | Original WordPress backup (private, not in git) |

The scripts in `scripts/` read `wp-export/`, so they only run on a machine that has the backup.
