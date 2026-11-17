"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { courses, universities } from "@/data/courses";
import { EnquiryForm } from "./EnquiryForm";
import { CloseIcon } from "./icons";

type Open = (opts?: { course?: string; source?: string }) => void;

const EnquiryContext = createContext<Open>(() => {});

export function useEnquiry() {
  return useContext(EnquiryContext);
}

export function EnquiryProvider({ children }: { children: React.ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [opts, setOpts] = useState<{ course?: string; source: string; key: number } | null>(null);

  const open = useCallback<Open>((o) => {
    // A fresh key remounts the form so each opening starts clean.
    setOpts({ course: o?.course, source: o?.source ?? "Popup", key: Date.now() });
  }, []);

  useEffect(() => {
    if (opts && !dialogRef.current?.open) dialogRef.current?.showModal();
  }, [opts]);

  const course = courses.find((c) => c.slug === opts?.course);

  return (
    <EnquiryContext.Provider value={open}>
      {children}
      <dialog
        ref={dialogRef}
        onClose={() => setOpts(null)}
        onClick={(e) => {
          if (e.target === dialogRef.current) dialogRef.current.close();
        }}
        aria-labelledby="enquiry-title"
        className="m-auto w-[min(100%-2rem,34rem)] max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-3xl bg-white p-0 shadow-lift"
      >
        {opts && (
          <div className="p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">Free counselling</p>
                <h2 id="enquiry-title" className="mt-1 text-2xl font-bold text-navy">
                  {course ? `Enquire about ${course.code}` : "Talk to a career counsellor"}
                </h2>
                <p className="mt-1 text-sm text-muted">
                  {course
                    ? `${universities[course.university].name}. We'll share fees, EMI options and the brochure.`
                    : "Tell us a little about you and we'll call you back."}
                </p>
              </div>
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                className="-mr-2 -mt-1 rounded-full p-2 text-muted hover:bg-peach hover:text-ink"
                aria-label="Close"
              >
                <CloseIcon className="size-5" />
              </button>
            </div>
            <div className="mt-5">
              <EnquiryForm key={opts.key} defaultCourse={opts.course} source={opts.source} submitLabel={course ? "Get fees & brochure" : "Request a call back"} />
            </div>
          </div>
        )}
      </dialog>
    </EnquiryContext.Provider>
  );
}

export function EnquireButton({
  course,
  source,
  className,
  children,
}: {
  course?: string;
  source: string;
  className?: string;
  children: React.ReactNode;
}) {
  const open = useEnquiry();
  return (
    <button type="button" className={className} onClick={() => open({ course, source })}>
      {children}
    </button>
  );
}
