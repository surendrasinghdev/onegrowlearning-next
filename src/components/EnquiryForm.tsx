"use client";

import { useActionState, useId, useTransition } from "react";
import { submitLead } from "@/app/actions";
import type { LeadState } from "@/lib/lead";
import { courses, universities, type UniversityId } from "@/data/courses";
import { NOT_SURE, profiles, states, STUDY_ABROAD } from "@/data/form-options";
import { site } from "@/data/site";
import { CheckIcon, WhatsAppIcon } from "./icons";

const initial: LeadState = { status: "idle" };

const field =
  "block w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-[15px] text-ink placeholder:text-muted/70 outline-none transition focus:border-brand focus:ring-3 focus:ring-brand/15 aria-[invalid=true]:border-red-500";

export function EnquiryForm({
  defaultCourse,
  source,
  submitLabel = "Get free counselling",
  variant = "default",
}: {
  defaultCourse?: string;
  source: string;
  submitLabel?: string;
  /** "referral" adds college/company and referred-by fields (Refer & Earn page). */
  variant?: "default" | "referral";
}) {
  const [state, action, pending] = useActionState(submitLead, initial);
  const [, startTransition] = useTransition();
  const id = useId();
  const err = state.errors ?? {};
  const referral = variant === "referral";

  // Submitting through onSubmit (instead of <form action>) stops React from clearing
  // what the visitor typed when the server sends back validation errors.
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    startTransition(() => action(data));
  };

  if (state.status === "success" && state.whatsappHref) {
    // Static site: the lead reaches the counsellor once the visitor sends it on WhatsApp.
    return (
      <div className="flex flex-col items-center py-6 text-center" role="status">
        <span className="grid size-14 place-items-center rounded-full bg-[#25D366]/15 text-[#128C4B]">
          <WhatsAppIcon className="size-7" />
        </span>
        <h3 className="mt-4 text-xl font-bold text-navy">One last step</h3>
        <p className="mt-2 max-w-xs text-sm text-muted">Send your details to our counsellor on WhatsApp. We&apos;ll get back to you shortly.</p>
        <a
          href={state.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 font-semibold text-white hover:brightness-95"
        >
          <WhatsAppIcon className="size-5" /> Send on WhatsApp
        </a>
        <p className="mt-3 text-xs text-muted">Or call us at {site.phone}</p>
      </div>
    );
  }

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-center py-6 text-center" role="status">
        <span className="grid size-14 place-items-center rounded-full bg-green-100 text-green-700">
          <CheckIcon className="size-7" />
        </span>
        <h3 className="mt-4 text-xl font-bold text-navy">Thank you! We&apos;ve got your request.</h3>
        <p className="mt-2 max-w-xs text-sm text-muted">
          A counsellor will call you shortly. Want to talk now? Message us on WhatsApp.
        </p>
        <a
          href={site.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white hover:brightness-95"
        >
          <WhatsAppIcon className="size-5" /> Chat on WhatsApp
        </a>
      </div>
    );
  }

  const byUni = Object.keys(universities) as UniversityId[];

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-3">
      <input type="hidden" name="source" value={source} />
      {referral && <input type="hidden" name="form" value="referral" />}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Company <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <Field id={`${id}-name`} label="Full name" error={err.name}>
        <input id={`${id}-name`} name="name" autoComplete="name" placeholder="Your full name" required className={field} aria-invalid={!!err.name} aria-describedby={err.name ? `${id}-name-err` : undefined} />
      </Field>

      <div className="grid gap-3 sm:grid-cols-2">
        <Field id={`${id}-phone`} label="Mobile number" error={err.phone}>
          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-3.5 flex items-center text-[15px] text-muted">+91</span>
            <input id={`${id}-phone`} name="phone" type="tel" inputMode="tel" autoComplete="tel-national" placeholder="98765 43210" required className={`${field} pl-12`} aria-invalid={!!err.phone} aria-describedby={err.phone ? `${id}-phone-err` : undefined} />
          </div>
        </Field>
        <Field id={`${id}-email`} label="Email" error={err.email}>
          <input id={`${id}-email`} name="email" type="email" autoComplete="email" placeholder="you@example.com" required className={field} aria-invalid={!!err.email} aria-describedby={err.email ? `${id}-email-err` : undefined} />
        </Field>
      </div>

      {referral && (
        <div className="grid gap-3 sm:grid-cols-2">
          <Field id={`${id}-org`} label="College / company" error={err.organisation}>
            <input id={`${id}-org`} name="organisation" autoComplete="organization" placeholder="Where you study or work" required className={field} aria-invalid={!!err.organisation} />
          </Field>
          <Field id={`${id}-ref`} label="Referred by" error={err.referredBy}>
            <input id={`${id}-ref`} name="referredBy" placeholder="Name of the person who referred you" required className={field} aria-invalid={!!err.referredBy} />
          </Field>
        </div>
      )}

      <Field id={`${id}-course`} label="Program you're interested in" error={err.course}>
        <select id={`${id}-course`} name="course" defaultValue={defaultCourse ?? ""} required className={field} aria-invalid={!!err.course}>
          <option value="" disabled>
            Select a program
          </option>
          <option value={NOT_SURE}>Not sure yet, help me choose</option>
          {referral && <option value={STUDY_ABROAD}>Study abroad</option>}
          {byUni.map((u) => (
            <optgroup key={u} label={universities[u].name}>
              {courses
                .filter((c) => c.university === u)
                .map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.code}: {c.name}
                  </option>
                ))}
            </optgroup>
          ))}
        </select>
      </Field>

      <div className="grid gap-3 sm:grid-cols-2">
        <Field id={`${id}-profile`} label="You are">
          <select id={`${id}-profile`} name="profile" defaultValue="" className={field}>
            <option value="">Select</option>
            {profiles.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </Field>
        <Field id={`${id}-state`} label="State">
          <select id={`${id}-state`} name="state" defaultValue="" className={field}>
            <option value="">Select state</option>
            {states.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </Field>
      </div>

      <div>
        <label className="flex items-start gap-2.5 text-[13px] leading-snug text-muted">
          <input type="checkbox" name="consent" className="mt-0.5 size-4 shrink-0 accent-brand" />
          I agree to be contacted by Email, Call, WhatsApp or SMS about my enquiry.
        </label>
        {err.consent && <p className="mt-1 text-xs text-red-600">{err.consent}</p>}
      </div>

      {state.message && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-1 inline-flex items-center justify-center rounded-xl bg-brand px-6 py-3.5 text-base font-semibold text-white shadow-[0_8px_20px_-8px_rgb(238_86_2/0.7)] transition hover:bg-brand-dark disabled:opacity-60"
      >
        {pending ? "Sending..." : submitLabel}
      </button>
      <p className="text-center text-xs text-muted">Free counselling. We never share your details.</p>
    </form>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-[13px] font-medium text-ink/80">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} className="mt-1 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
