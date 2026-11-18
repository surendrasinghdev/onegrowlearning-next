import { asset } from "@/lib/asset";
// Fees verified on the universities' official sites in Nov 2026 (see CORRECTIONS.md for sources).
// Slugs match the old WordPress URLs so existing links and search rankings keep working.

export type UniversityId = "muj" | "smu" | "shoolini" | "welingkar";
export type Level = "pg" | "ug" | "executive";

export type University = {
  id: UniversityId;
  name: string;
  short: string;
  location: string;
  logo?: { src: string; width: number; height: number };
  highlights: string[];
  about: string;
  photo?: string;
};

export const universities: Record<UniversityId, University> = {
  muj: {
    id: "muj",
    name: "Manipal University Jaipur",
    short: "MUJ",
    location: "Jaipur, Rajasthan",
    logo: { src: asset("/images/universities/muj.png"), width: 480, height: 136 },
    highlights: ["NAAC A+", "UGC-entitled", "AICTE approved"],
    about: "A NAAC A+ accredited university in Jaipur, ranked 58 among India's top universities in NIRF 2025. Its UGC-entitled online degrees, delivered through Online Manipal, carry the same university seal and come with no-cost EMI and scholarships of up to 20%.",
    photo: asset("/images/photos/campus-muj.webp"),
  },
  smu: {
    id: "smu",
    name: "Sikkim Manipal University",
    short: "SMU",
    location: "Gangtok, Sikkim",
    logo: { src: asset("/images/universities/smu.png"), width: 480, height: 115 },
    highlights: ["NAAC A+", "UGC-entitled", "Affordable fees"],
    about: "Part of the Manipal group and NAAC A+ accredited, Sikkim Manipal University in Gangtok is known for some of the most affordable UGC-entitled online degrees, from BA and B.Com to MBA and MCA, with easy EMIs.",
    photo: asset("/images/photos/campus-smu.webp"),
  },
  shoolini: {
    id: "shoolini",
    name: "Shoolini University",
    short: "Shoolini",
    location: "Solan, Himachal Pradesh",
    highlights: ["UGC-entitled", "Pay After Placement option", "Scholarships"],
    about: "Ranked India's No. 1 private university by THE and QS (2023-24), Shoolini University in Solan, Himachal Pradesh offers fully online, UGC-entitled MBA, MCA, BBA, BCA and MA programs, with scholarships and a Pay After Placement option.",
  },
  welingkar: {
    id: "welingkar",
    name: "Welingkar Institute (WeSchool)",
    short: "WeSchool",
    location: "Mumbai campus",
    highlights: ["Full-time, on campus", "11 months", "Harvard ManageMentor access"],
    about: "Prin. L. N. Welingkar Institute of Management Development & Research (WeSchool) in Mumbai runs full-time, on-campus PG programs for next-generation business owners and future media professionals.",
  },
};

/** Tag colours per university, used on cards. */
export const uniTone: Record<UniversityId, string> = {
  muj: "bg-[#fde7d9] text-[#9a3a06]",
  smu: "bg-[#dcf2ef] text-[#0d5e55]",
  shoolini: "bg-[#ece4fb] text-[#55339b]",
  welingkar: "bg-[#e1e8fb] text-[#1d3d8f]",
};

export type Course = {
  slug: string;
  university: UniversityId;
  level: Level;
  code: string; // short label shown on cards, e.g. "MBA"
  name: string;
  durationMonths: number;
  mode: "Online" | "On campus";
  /** Total fee in INR payable by Indian students; null when the institute does not publish it. */
  fee: number | null;
  /** Fee before scholarship, shown struck through (Shoolini). */
  regularFee?: number;
  semesterFee?: number;
  emiFrom?: number;
  feeNote?: string;
};

export const courses: Course[] = [
  // Manipal University Jaipur
  { slug: "master-of-business-administration-muj", university: "muj", level: "pg", code: "MBA", name: "Master of Business Administration", durationMonths: 24, mode: "Online", fee: 184000, semesterFee: 46000, emiFrom: 6517 },
  { slug: "master-of-computer-application", university: "muj", level: "pg", code: "MCA", name: "Master of Computer Applications", durationMonths: 24, mode: "Online", fee: 164000, semesterFee: 41000, emiFrom: 6150 },
  { slug: "master-of-commerce", university: "muj", level: "pg", code: "M.Com", name: "Master of Commerce", durationMonths: 24, mode: "Online", fee: 108000, semesterFee: 27000, emiFrom: 4500 },
  { slug: "master-of-arts-in-journalism-mass-communication-online-ma-jmc", university: "muj", level: "pg", code: "MA JMC", name: "MA in Journalism & Mass Communication", durationMonths: 24, mode: "Online", fee: 80000, semesterFee: 20000, emiFrom: 3333 },
  { slug: "master-of-arts-economics", university: "muj", level: "pg", code: "MA Economics", name: "Master of Arts in Economics", durationMonths: 24, mode: "Online", fee: 80000, semesterFee: 20000, emiFrom: 3333 },
  { slug: "bachelor-of-business-administration", university: "muj", level: "ug", code: "BBA", name: "Bachelor of Business Administration", durationMonths: 36, mode: "Online", fee: 144000, semesterFee: 24000, emiFrom: 4000 },
  { slug: "bachelor-of-computer-applications-bca", university: "muj", level: "ug", code: "BCA", name: "Bachelor of Computer Applications", durationMonths: 36, mode: "Online", fee: 144000, semesterFee: 24000, emiFrom: 4000 },
  { slug: "bachelor-of-commerce-muj", university: "muj", level: "ug", code: "B.Com", name: "Bachelor of Commerce", durationMonths: 36, mode: "Online", fee: 105000, semesterFee: 17500, emiFrom: 2917 },

  // Sikkim Manipal University
  { slug: "master-of-business-administration", university: "smu", level: "pg", code: "MBA", name: "Master of Business Administration", durationMonths: 24, mode: "Online", fee: 120000, semesterFee: 30000, emiFrom: 4500 },
  { slug: "master-of-computer-application-smu", university: "smu", level: "pg", code: "MCA", name: "Master of Computer Applications", durationMonths: 24, mode: "Online", fee: 110000, semesterFee: 27500, emiFrom: 4125 },
  { slug: "master-of-commerce-smu", university: "smu", level: "pg", code: "M.Com", name: "Master of Commerce", durationMonths: 24, mode: "Online", fee: 75000, semesterFee: 18750, emiFrom: 3125 },
  { slug: "master-of-arts-english", university: "smu", level: "pg", code: "MA English", name: "Master of Arts in English", durationMonths: 24, mode: "Online", fee: 75000, semesterFee: 18750, emiFrom: 3125 },
  { slug: "master-of-arts-sociology", university: "smu", level: "pg", code: "MA Sociology", name: "Master of Arts in Sociology", durationMonths: 24, mode: "Online", fee: 75000, semesterFee: 18750, emiFrom: 3125 },
  { slug: "master-of-arts-political-science", university: "smu", level: "pg", code: "MA Pol. Science", name: "Master of Arts in Political Science", durationMonths: 24, mode: "Online", fee: 75000, semesterFee: 18750, emiFrom: 3125 },
  { slug: "bachelor-of-arts", university: "smu", level: "ug", code: "BA", name: "Bachelor of Arts", durationMonths: 36, mode: "Online", fee: 75000, semesterFee: 12500, emiFrom: 2083 },
  { slug: "bachelor-of-commerce", university: "smu", level: "ug", code: "B.Com", name: "Bachelor of Commerce", durationMonths: 36, mode: "Online", fee: 75000, semesterFee: 12500, emiFrom: 2083 },

  // Shoolini University: fee shown is the standard offer after scholarship
  { slug: "shoolini-online-mba", university: "shoolini", level: "pg", code: "MBA", name: "Master of Business Administration", durationMonths: 24, mode: "Online", fee: 130000, regularFee: 200000, semesterFee: 32500, feeNote: "After scholarship. Pay After Placement option available." },
  { slug: "shoolini-online-mca", university: "shoolini", level: "pg", code: "MCA", name: "Master of Computer Applications", durationMonths: 24, mode: "Online", fee: 125000, regularFee: 200000, semesterFee: 31250, feeNote: "After scholarship. Pay After Placement option available." },
  { slug: "shoolini-online-ma", university: "shoolini", level: "pg", code: "MA English", name: "MA in English Literature", durationMonths: 24, mode: "Online", fee: 60000, regularFee: 84000, semesterFee: 15000, feeNote: "After scholarship." },
  { slug: "shoolini-online-bba", university: "shoolini", level: "ug", code: "BBA", name: "Bachelor of Business Administration", durationMonths: 36, mode: "Online", fee: 96000, regularFee: 135000, semesterFee: 16000, feeNote: "After scholarship. Pay After Placement option available." },
  { slug: "shoolini-online-bca", university: "shoolini", level: "ug", code: "BCA", name: "Bachelor of Computer Applications", durationMonths: 36, mode: "Online", fee: 96000, regularFee: 135000, semesterFee: 16000, feeNote: "After scholarship. Pay After Placement option available." },

  // Welingkar (WeSchool), Mumbai
  { slug: "pg-in-entrepreneurship-welingker-institute", university: "welingkar", level: "executive", code: "PGP-EFMB", name: "PGP in Entrepreneurship & Family Managed Business", durationMonths: 11, mode: "On campus", fee: null, feeNote: "1 week a month on campus, 3 weeks in your family business." },
  { slug: "pg-media-entertainment-welingkar", university: "welingkar", level: "executive", code: "PG Media", name: "PG Program in Media & Entertainment Management", durationMonths: 11, mode: "On campus", fee: 400000, feeNote: "Plus GST. EMI available." },
];

export const levelLabels: Record<Level, string> = {
  pg: "Master's",
  ug: "Bachelor's",
  executive: "PG Programs",
};

export function formatINR(n: number) {
  return "₹" + n.toLocaleString("en-IN");
}

export function formatDuration(months: number) {
  if (months % 12 === 0) return `${months / 12} years`;
  return `${months} months`;
}

export function courseHref(c: Course) {
  return `/${c.slug}/`;
}

export function courseLabel(c: Course) {
  return `${c.code} (${universities[c.university].short})`;
}

/** Card photo for a course, picked by subject (photos live in public/images/photos). */
export function courseImage(c: Course) {
  const code = c.code.toLowerCase();
  // A few photos per subject; each university gets a different one so related cards don't repeat.
  const pick = (...names: string[]) => {
    const i = ["muj", "smu", "shoolini", "welingkar"].indexOf(c.university);
    return asset(`/images/photos/${names[i % names.length]}.webp`);
  };
  if (c.slug.includes("media") || code.includes("jmc")) return pick("media");
  if (c.university === "welingkar") return pick("business");
  if (code.includes("mba")) return pick("mba", "hero-professional", "lecture");
  if (code.includes("mca") || code.includes("bca")) return pick("computers", "lecture", "bba");
  if (code.includes("bba")) return pick("bba", "graduate-2", "graduate-2");
  if (code.includes("com")) return pick("commerce", "graduate");
  if (code === "ba") return pick("student", "student");
  return pick("arts", "graduate-3", "graduate-3");
}

/** Short, factual highlights shown on course cards. */
export function courseTags(c: Course): string[] {
  const tags: string[] = [];
  if (c.university === "muj" || c.university === "smu") tags.push("Scholarships up to 20%");
  if (c.slug === "master-of-business-administration") tags.push("Dual specialisation");
  if (c.feeNote?.includes("Pay After Placement")) tags.push("Pay After Placement");
  if (c.mode === "On campus") tags.push("On campus, Mumbai");
  return tags;
}

export function courseEligibility(c: Course) {
  if (c.slug === "pg-in-entrepreneurship-welingker-institute") return "Graduate, in a family business";
  if (c.slug === "pg-media-entertainment-welingkar") return "Graduate with 50% marks";
  return c.level === "ug" ? "Class 12 pass" : "Any bachelor's degree";
}

export const lowestEmi =Math.min(...courses.flatMap((c) => (c.emiFrom ? [c.emiFrom] : [])));
