export const site = {
  name: "Onegrow Learning",
  legalName: "Onegrow Learning Pvt Ltd",
  url: "https://onegrowlearning.com",
  tagline: "Best Online Degree Programs From Top Universities",
  phone: "+91-9318405586",
  phoneHref: "tel:+919318405586",
  email: "info@onegrowlearning.com",
  whatsappNumber: "919318405586",
  whatsappHref:
    "https://wa.me/919318405586?text=" + encodeURIComponent("Hi Onegrow, I want to know more about online degree programs."),
  social: {
    linkedin: "https://www.linkedin.com/company/onegrow-learning/",
    instagram: "https://www.instagram.com/onegrowlearning",
  },
  // Date the course fees in src/data/courses.ts were last checked against the universities' own sites.
  feesCheckedOn: "November 2026",
} as const;

export const announcements = [
  "Admissions open for UGC-entitled online degrees",
  "Free one-on-one career counselling",
  "No-cost EMI on most programs",
  "Scholarships up to 20% at Manipal universities",
  "Pay After Placement option at Shoolini",
  "Help with education loans",
];

export const nav = [
  { label: "Programs", href: "/popular-programs/" },
  { label: "Universities", href: "/our-partners/" },
  { label: "About Us", href: "/about-us/" },
  { label: "Refer & Earn", href: "/circle-of-excellence-referee/" },
  { label: "Contact", href: "/contact-us/" },
] as const;
