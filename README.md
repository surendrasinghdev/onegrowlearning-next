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

## Where things are

| Path | What |
|---|---|
| `src/data/courses.ts` | All programs, universities and fees (fees checked Nov 2026) |
| `src/data/home.ts` | Homepage copy: benefits, steps, testimonials, FAQs, videos |
| `src/data/site.ts` | Phone, email, WhatsApp, nav |
| `src/app/actions.ts` | Lead form server action (validation + email) |
| `src/components/` | Header, footer, enquiry form and popup, course explorer |
| `content/` | Text of every old WordPress page, extracted from the backup |
| `INVENTORY.md`, `CORRECTIONS.md` | Old site inventory and the fixes being made |
| `wp-export/` | Original WordPress backup (private, not in git) |

Old WordPress URLs are kept as they were (trailing slash on), and removed pages redirect to the homepage (see `next.config.ts`).
