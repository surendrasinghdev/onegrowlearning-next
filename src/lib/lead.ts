// Lead form parsing and validation, shared by the server action (email) and the
// static GitHub Pages build (WhatsApp).
import { courses, universities, type Course } from "@/data/courses";
import { NOT_SURE, profiles, states } from "@/data/form-options";

export type LeadState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<"name" | "phone" | "email" | "course" | "consent", string>>;
  /** Static build only: WhatsApp link that carries the lead to the counsellor. */
  whatsappHref?: string;
};

export type Lead = {
  name: string;
  phone: string;
  email: string;
  course?: Course;
  rows: [string, string][];
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function clean(v: FormDataEntryValue | null, max = 200) {
  return typeof v === "string" ? v.replace(/[\r\n]+/g, " ").trim().slice(0, max) : "";
}

/** Returns the cleaned lead, `null` for a bot (honeypot filled), or field errors. */
export function parseLead(formData: FormData): Lead | null | { errors: NonNullable<LeadState["errors"]> } {
  // Honeypot: real visitors never see or fill this field.
  if (clean(formData.get("company"))) return null;

  const name = clean(formData.get("name"), 80);
  const phone = clean(formData.get("phone"), 20).replace(/[^\d+]/g, "");
  const email = clean(formData.get("email"), 120);
  const courseSlug = clean(formData.get("course"), 120);
  const state = clean(formData.get("state"), 60);
  const profile = clean(formData.get("profile"), 60);
  const source = clean(formData.get("source"), 120);
  const consent = formData.get("consent") === "on";

  const errors: NonNullable<LeadState["errors"]> = {};
  if (name.length < 2) errors.name = "Please enter your name.";
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 13) errors.phone = "Please enter a valid mobile number.";
  if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email.";
  const course = courses.find((c) => c.slug === courseSlug);
  if (!course && courseSlug !== NOT_SURE) errors.course = "Please choose a program.";
  if (!consent) errors.consent = "Please agree so our counsellor can contact you.";
  if (Object.keys(errors).length) return { errors };

  const courseText = course ? `${course.code}: ${course.name} (${universities[course.university].name})` : "Not sure yet, needs guidance";

  return {
    name,
    phone,
    email,
    course,
    rows: [
      ["Name", name],
      ["Phone", phone],
      ["Email", email],
      ["Program", courseText],
      ["State", states.includes(state) ? state : "-"],
      ["Profile", profiles.includes(profile) ? profile : "-"],
      ["Form on", source || "-"],
    ],
  };
}
