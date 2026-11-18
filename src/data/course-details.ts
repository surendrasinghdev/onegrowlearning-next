// Detailed page content for each program, from the old WordPress pages
// (src/data/course-content.json, made by scripts/extract-courses.mjs), plus sample degree images.
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

export function getCourseDetail(slug: string): CourseDetail | undefined {
  const c = (content as Record<string, Omit<CourseDetail, "degree">>)[slug];
  if (!c) return undefined;
  const img = (degreeImages as Record<string, { src: string; width: number; height: number }>)[slug];
  return { ...c, degree: img ? { ...img, src: asset(img.src) } : undefined };
}
