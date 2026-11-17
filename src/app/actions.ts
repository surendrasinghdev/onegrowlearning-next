"use server";

import nodemailer from "nodemailer";
import { courses, universities } from "@/data/courses";
import { NOT_SURE, profiles, states } from "@/data/form-options";

export type LeadState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<"name" | "phone" | "email" | "course" | "consent", string>>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function clean(v: FormDataEntryValue | null, max = 200) {
  return typeof v === "string" ? v.replace(/[\r\n]+/g, " ").trim().slice(0, max) : "";
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

export async function submitLead(_prev: LeadState, formData: FormData): Promise<LeadState> {
  // Honeypot: real visitors never see or fill this field.
  if (clean(formData.get("company"))) return { status: "success" };

  const name = clean(formData.get("name"), 80);
  const phone = clean(formData.get("phone"), 20).replace(/[^\d+]/g, "");
  const email = clean(formData.get("email"), 120);
  const courseSlug = clean(formData.get("course"), 120);
  const state = clean(formData.get("state"), 60);
  const profile = clean(formData.get("profile"), 60);
  const source = clean(formData.get("source"), 120);
  const consent = formData.get("consent") === "on";

  const errors: LeadState["errors"] = {};
  if (name.length < 2) errors.name = "Please enter your name.";
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 13) errors.phone = "Please enter a valid mobile number.";
  if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email.";
  const course = courses.find((c) => c.slug === courseSlug);
  if (!course && courseSlug !== NOT_SURE) errors.course = "Please choose a program.";
  if (!consent) errors.consent = "Please agree so our counsellor can contact you.";
  if (Object.keys(errors).length) return { status: "error", errors };

  const courseText = course
    ? `${course.code}: ${course.name} (${universities[course.university].name})`
    : "Not sure yet, needs guidance";

  const rows: [string, string][] = [
    ["Name", name],
    ["Phone", phone],
    ["Email", email],
    ["Program", courseText],
    ["State", states.includes(state) ? state : "-"],
    ["Profile", profiles.includes(profile) ? profile : "-"],
    ["Form on", source || "-"],
    ["Submitted", new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })],
  ];

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, LEAD_EMAIL_TO, LEAD_EMAIL_FROM } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !LEAD_EMAIL_TO) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[lead] SMTP not configured, lead not emailed:", Object.fromEntries(rows));
      return { status: "success" };
    }
    console.error("[lead] SMTP env vars missing; lead could not be sent");
    return { status: "error", message: "We couldn't send your request right now. Please call or WhatsApp us." };
  }

  try {
    const port = Number(SMTP_PORT || 465);
    const transport = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure: port === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
    await transport.sendMail({
      from: LEAD_EMAIL_FROM || `Onegrow Website <${SMTP_USER}>`,
      to: LEAD_EMAIL_TO.split(",").map((s) => s.trim()),
      replyTo: email,
      subject: `New enquiry: ${course ? `${course.code} (${universities[course.university].short})` : "Program guidance"} - ${name}`,
      text: rows.map(([k, v]) => `${k}: ${v}`).join("\n"),
      html: `<table cellpadding="6" style="font-family:sans-serif;font-size:14px;border-collapse:collapse">${rows
        .map(([k, v]) => `<tr><td style="color:#5a6275">${k}</td><td><strong>${escapeHtml(v)}</strong></td></tr>`)
        .join("")}</table>`,
    });
    return { status: "success" };
  } catch (err) {
    console.error("[lead] sending failed", err);
    return { status: "error", message: "We couldn't send your request right now. Please call or WhatsApp us." };
  }
}
