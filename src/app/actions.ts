"use server";

import nodemailer from "nodemailer";
import { universities } from "@/data/courses";
import { parseLead, type LeadState } from "@/lib/lead";

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

const FAILED = "We couldn't send your request right now. Please call or WhatsApp us.";

/** Emails the lead over SMTP. The static GitHub Pages build swaps this file for actions.static.ts. */
export async function submitLead(_prev: LeadState, formData: FormData): Promise<LeadState> {
  const lead = parseLead(formData);
  if (lead === null) return { status: "success" };
  if ("errors" in lead) return { status: "error", errors: lead.errors };

  const { name, email, course } = lead;
  const rows: [string, string][] = [...lead.rows, ["Submitted", new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })]];

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, LEAD_EMAIL_TO, LEAD_EMAIL_FROM } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !LEAD_EMAIL_TO) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[lead] SMTP not configured, lead not emailed:", Object.fromEntries(rows));
      return { status: "success" };
    }
    console.error("[lead] SMTP env vars missing; lead could not be sent");
    return { status: "error", message: FAILED };
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
    return { status: "error", message: FAILED };
  }
}
