// Detailed page content for each program. Online degrees come from the old WordPress pages
// (src/data/course-content.json, made by scripts/extract-courses.mjs); the two Welingkar
// programs are written from WeSchool's official pages (welingkar.org, Nov 2026), since the
// old page mixed both programs together (see CORRECTIONS.md).
import content from "./course-content.json";
import degreeImages from "./degree-images.json";
import { asset } from "@/lib/asset";

export type CourseDetail = {
  overview: string;
  advantages: { title: string; body: string }[];
  jobProfiles: string[];
  industries: string[];
  curriculum: Record<string, string[]>;
  specialisations: Record<string, string[]>;
  admissionCriteria: string[];
  faqs: { q: string; a: string[] }[];
  degree?: { src: string; width: number; height: number };
  /** How the program runs, shown as steps (Welingkar). */
  structure?: { title: string; body: string }[];
  videos?: { id: string; title: string }[];
  /** Overrides the "Careers" section headings when the lists are not job roles. */
  careerLabels?: { title: string; left: string; right: string };
};

const welingkar: Record<string, CourseDetail> = {
  "pg-in-entrepreneurship-welingker-institute": {
    overview:
      "WeSchool's Post Graduate Program in Entrepreneurship & Family Managed Business (PGP-EFMB) is built for the next generation of business families. Over 11 months on the Mumbai campus, it tackles the real challenges of family enterprises: succession planning, professionalising operations, managing family dynamics, financial management, digital marketing and fundraising. You learn on campus one week a month and apply it straight away in your own business, with a personal mentor guiding you.",
    advantages: [
      { title: "Learn while you run the business", body: "Spend one week a month on campus and three weeks applying it in your family business, so work never stops." },
      { title: "Personal business mentor", body: "An expert mentor works with you on your own business challenges through the program." },
      { title: "Harvard ManageMentor access", body: "Get 42 interactive certification courses from Harvard ManageMentor along with the program." },
      { title: "Network of business families", body: "Build lasting connections with next-gen owners, industry experts and family business leaders." },
    ],
    jobProfiles: [
      "Scale your business with proven growth frameworks",
      "Create strategic business plans with financial projections",
      "Plan succession with clarity",
      "Professionalise operations while keeping family values",
      "Set up governance for smooth generational transitions",
      "Master financial management and fundraising",
      "Make data-driven business decisions",
      "Optimise operations and supply chains",
      "Drive innovation in a traditional business",
    ],
    industries: [
      "Improve productivity of existing operations without extra investment",
      "Analyse your own company's financial statements and spot opportunities",
      "Business Improvement Program with an expert mentor before the main program starts",
      "Only 7 days a month away, so the business runs as usual",
    ],
    careerLabels: { title: "What you'll achieve", left: "Program outcomes", right: "What it means for your business" },
    curriculum: {},
    specialisations: {},
    admissionCriteria: [
      "A graduate degree from a recognised university (graduation is mandatory).",
      "You must be a next-generation member actively involved in your family business.",
      "11-month, full-time program on WeSchool's Mumbai campus.",
    ],
    structure: [
      { title: "Acquisition: 1 week a month", body: "Immersive classroom sessions on the Mumbai campus, taught by business experts in small batches." },
      { title: "Application: 3 weeks a month", body: "Put what you learnt into practice directly in your own family business." },
      { title: "Assimilation: 1 day a month", body: "Personal mentoring and feedback sessions on your progress and challenges." },
      { title: "Beyond the classroom", body: "Domestic and international industrial visits, guest lectures and live case studies." },
    ],
    faqs: [
      { q: "Who is this program for?", a: ["Graduates who are actively involved in their family business, usually as second-generation members or beyond, and want to modernise, scale and future-proof it."] },
      { q: "How long is the program and how does the schedule work?", a: ["It is an 11-month program. Every month you study for one week on the Mumbai campus, apply the learning in your business for three weeks, and attend one day of mentoring."] },
      { q: "Where are classes held?", a: ["On WeSchool's campus in Mumbai."] },
      { q: "What is the fee?", a: ["WeSchool shares the fee for this program on request. Talk to our counsellor for the current fee, payment options and batch dates."] },
    ],
  },
  "pg-media-entertainment-welingkar": {
    overview:
      "Build a career in India's fast-growing media and entertainment industry with WeSchool's Post Graduate Program in Media & Entertainment Management. The 11-month, full-time program on the Matunga, Mumbai campus blends 9 months of classroom training with a 2-month capstone project with a company. You choose from 11 specialisations, from OTT and film marketing to digital media and event management.",
    advantages: [
      { title: "11 industry specialisations", body: "Choose from OTT & new-age media, film marketing, celebrity & sports management, advertising & PR and more." },
      { title: "Capstone with a company", body: "Spend the last 2 months on a real capstone project with an organisation in the industry." },
      { title: "Harvard ManageMentor access", body: "Get 42 interactive certification courses from Harvard ManageMentor." },
      { title: "Learn in Mumbai", body: "Study in the heart of India's media industry, on WeSchool's Matunga campus." },
    ],
    jobProfiles: [
      "Content strategy & production",
      "Brand & marketing management",
      "Media planning & buying",
      "Digital & social media marketing",
      "Advertising & public relations",
      "Film marketing & distribution",
      "Celebrity & sports management",
      "Event management",
      "OTT programming & acquisitions",
    ],
    industries: ["OTT & streaming", "Film & television", "Advertising & PR agencies", "Digital media", "Radio & print", "Sports & live events", "Music", "Brand marketing teams"],
    curriculum: {},
    specialisations: {
      "Specialisations (choose yours)": [
        "OTT & New-Age Media",
        "Film Marketing & Distribution",
        "Celebrity & Sports Management",
        "Advertising & PR",
        "Digital & Social Media",
        "Integrated Marketing Communications",
        "Content Marketing",
        "Media Budgeting & Finance",
        "Event Management",
        "Radio, Television & Print Media",
        "Brand & Marketing Management",
      ],
    },
    admissionCriteria: [
      "Graduate in any stream with at least 50% marks from a recognised university.",
      "Final-year students awaiting results can also apply.",
      "11-month, full-time program on WeSchool's Matunga, Mumbai campus.",
    ],
    structure: [
      { title: "Months 1 to 9: Classroom", body: "Full-time classroom training across media business, creativity and technology." },
      { title: "Your specialisation", body: "Pick one of 11 specialisations to build depth in the area you want to work in." },
      { title: "Months 10 to 11: Capstone", body: "Work on a capstone project with a company to get real industry experience." },
      { title: "Certifications", body: "Complete Harvard ManageMentor courses alongside the program." },
    ],
    videos: [
      { id: "Po_vS0fYQQY", title: "WeSchool Media & Entertainment program" },
      { id: "4jb3PbwIMSY", title: "Life at WeSchool, Mumbai" },
    ],
    faqs: [
      { q: "What is an entertainment and media degree?", a: ["It gives you a complete understanding of the industry, from content creation and marketing to business management and strategic planning, and opens doors to careers in film, television, digital media and more."] },
      { q: "What is media and entertainment?", a: ["It covers how media such as film, television, music, radio, print, digital media and advertising is created, distributed and consumed. The industry is shaped by technology, audience preferences and culture."] },
      { q: "What salary can I expect after this program?", a: ["Salaries vary by role, experience and company size. The program builds the skills employers look for, and your counsellor can share recent placement trends."] },
      { q: "Is Netflix a media and entertainment company?", a: ["Yes. As a leading streaming platform, Netflix has changed how content is made and watched, which shows how important digital media has become."] },
      { q: "What roles can I get after this program?", a: ["Creative roles such as content and scriptwriting, and business roles such as media planning, advertising, brand management and event management."] },
      { q: "What is the fee?", a: ["₹4 lakh plus GST for the 11-month program, as listed by WeSchool. EMI options are available through education finance partners."] },
    ],
  },
};

export function getCourseDetail(slug: string): CourseDetail | undefined {
  if (welingkar[slug]) return welingkar[slug];
  const c = (content as Record<string, Omit<CourseDetail, "degree">>)[slug];
  if (!c) return undefined;
  const img = (degreeImages as Record<string, { src: string; width: number; height: number }>)[slug];
  return { ...c, degree: img ? { ...img, src: asset(img.src) } : undefined };
}
