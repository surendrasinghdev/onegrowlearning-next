import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: P) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const PhoneIcon = (p: P) => (
  <Base {...p}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
  </Base>
);

export const MailIcon = (p: P) => (
  <Base {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </Base>
);

export const ArrowRightIcon = (p: P) => (
  <Base {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Base>
);

export const CheckIcon = (p: P) => (
  <Base {...p}>
    <path d="m5 12 5 5L20 7" />
  </Base>
);

export const MenuIcon = (p: P) => (
  <Base {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Base>
);

export const CloseIcon = (p: P) => (
  <Base {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Base>
);

export const PlusIcon = (p: P) => (
  <Base {...p}>
    <path d="M12 5v14M5 12h14" />
  </Base>
);

export const ClockIcon = (p: P) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </Base>
);

export const PlayIcon = (p: P) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <path fill="currentColor" d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5" />
  </svg>
);

export const QuoteIcon = (p: P) => (
  <svg viewBox="0 0 32 32" aria-hidden="true" {...p}>
    <path
      fill="currentColor"
      d="M13 7C7.5 8.6 4 12.9 4 18.5V25h9v-9H8.6c.4-3 2.4-5.3 5.4-6.4zm15 0c-5.5 1.6-9 5.9-9 11.5V25h9v-9h-4.4c.4-3 2.4-5.3 5.4-6.4z"
    />
  </svg>
);

export const CounselIcon = (p: P) => (
  <Base {...p}>
    <path d="M7 10h10M7 14h6" />
    <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12" />
  </Base>
);

export const WalletIcon = (p: P) => (
  <Base {...p}>
    <path d="M4 7a2 2 0 0 1 2-2h11v4" />
    <rect x="4" y="9" width="16" height="11" rx="2" />
    <circle cx="16" cy="14.5" r="1.2" />
  </Base>
);

export const BriefcaseIcon = (p: P) => (
  <Base {...p}>
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2M3 13h18" />
  </Base>
);

export const HomeIcon = (p: P) => (
  <Base {...p}>
    <path d="m3 11 9-7 9 7" />
    <path d="M5 10v10h14V10M10 20v-5h4v5" />
  </Base>
);

export const GraduationIcon = (p: P) => (
  <Base {...p}>
    <path d="m2 9 10-5 10 5-10 5z" />
    <path d="M6 11v5c3 2.5 9 2.5 12 0v-5M22 9v6" />
  </Base>
);

export const SparkIcon = (p: P) => (
  <Base {...p}>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6" />
  </Base>
);

export const LaptopIcon = (p: P) => (
  <Base {...p}>
    <rect x="4" y="5" width="16" height="11" rx="1.5" />
    <path d="M2 19h20" />
  </Base>
);

export const ShieldIcon = (p: P) => (
  <Base {...p}>
    <path d="M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6z" />
    <path d="m9 12 2 2 4-4" />
  </Base>
);

export const PercentIcon = (p: P) => (
  <Base {...p}>
    <path d="M19 5 5 19" />
    <circle cx="7" cy="7" r="2.5" />
    <circle cx="17" cy="17" r="2.5" />
  </Base>
);

export const CalendarIcon = (p: P) => (
  <Base {...p}>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M3 10h18M8 3v4M16 3v4" />
  </Base>
);

export const UsersIcon = (p: P) => (
  <Base {...p}>
    <circle cx="9" cy="8" r="3.5" />
    <path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14.5a6.5 6.5 0 0 1 3.5 5.5" />
  </Base>
);

export const BookIcon = (p: P) => (
  <Base {...p}>
    <path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z" />
    <path d="M4 21V5M9 7h6" />
  </Base>
);

export const BuildingIcon = (p: P) => (
  <Base {...p}>
    <path d="m3 9 9-5 9 5M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 21h18" />
  </Base>
);

export const WhatsAppIcon = (p: P) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <path
      fill="currentColor"
      d="M12.04 2a9.9 9.9 0 0 0-8.48 15l-1.4 5.1 5.24-1.37A9.9 9.9 0 1 0 12.04 2m0 18.1a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.1.82.83-3.03-.2-.31a8.2 8.2 0 1 1 6.95 3.85m4.5-6.14c-.25-.12-1.46-.72-1.69-.8s-.39-.12-.55.12-.63.8-.78.97-.29.18-.53.06a6.7 6.7 0 0 1-3.32-2.9c-.25-.43.25-.4.72-1.33a.45.45 0 0 0-.02-.43c-.06-.12-.55-1.33-.76-1.82s-.4-.41-.55-.42h-.47a.9.9 0 0 0-.65.3 2.7 2.7 0 0 0-.85 2.03 4.7 4.7 0 0 0 1 2.5 10.8 10.8 0 0 0 4.13 3.65c1.54.66 2.14.72 2.9.6a2.5 2.5 0 0 0 1.64-1.15 2 2 0 0 0 .14-1.16c-.06-.1-.22-.16-.46-.28"
    />
  </svg>
);

export const LinkedInIcon = (p: P) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <path
      fill="currentColor"
      d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5M3 9.75h4v11H3zm7 0h3.8v1.5h.06a4.2 4.2 0 0 1 3.76-2.06c4 0 4.38 2.5 4.38 5.76v5.8h-4v-5.15c0-1.23 0-2.8-1.72-2.8s-1.98 1.34-1.98 2.72v5.23h-4z"
    />
  </svg>
);

export const InstagramIcon = (p: P) => (
  <Base {...p}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
  </Base>
);
