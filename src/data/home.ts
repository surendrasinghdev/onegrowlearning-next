import { asset } from "@/lib/asset";
// Homepage copy, carried over from the WordPress site and tightened.

// Rankings and approvals held by partner universities, as published on their official sites.
export const accreditations: { src?: string; mark?: string; name: string; detail: string; ribbon?: string }[] = [
  { mark: "NIRF", name: "NIRF 2025", detail: "Manipal University Jaipur ranked 58 among India's top universities", ribbon: "Rank 58" },
  { src: asset("/images/accreditations/naac.png"), name: "NAAC A+", detail: "Manipal University Jaipur and Sikkim Manipal University are NAAC A+ accredited", ribbon: "Grade A+" },
  { src: asset("/images/accreditations/ugc.png"), name: "UGC-entitled", detail: "Online degrees at par with on-campus degrees" },
  { src: asset("/images/accreditations/aicte.png"), name: "AICTE", detail: "Programs follow AICTE norms where applicable" },
  { src: asset("/images/accreditations/the.webp"), name: "THE Rankings", detail: "Shoolini ranked India's No. 1 private university by THE and QS, 2023-24", ribbon: "No. 1 Pvt." },
  { src: asset("/images/accreditations/wes.png"), name: "WES", detail: "Degrees recognised by World Education Services for study and work abroad" },
  { src: asset("/images/accreditations/icas.png"), name: "ICAS", detail: "International Credential Assessment Service of Canada" },
  { src: asset("/images/accreditations/ices.png"), name: "ICES", detail: "International Credential Evaluation Service" },
];

export const highlights = [
  { title: "100% online learning", body: "Live and recorded classes you can attend from anywhere." },
  { title: "At par with campus degrees", body: "UGC-entitled degrees valid for jobs and higher studies." },
  { title: "No-cost EMI", body: "Spread your fee over easy monthly payments." },
  { title: "Placement assistance", body: "Career support until you land the right role." },
];

export const onlineAdvantages = [
  { title: "Flexible schedule", body: "Learn anywhere, any time, and balance your studies with work and family.", tone: "pink" },
  { title: "At par with on-campus degrees", body: "UGC-entitled online degrees are accepted for government jobs, corporate jobs and higher education.", tone: "blue" },
  { title: "Experienced faculty", body: "Learn from university faculty and industry mentors who share real, practical knowledge.", tone: "yellow" },
  { title: "Strong alumni network", body: "Join the alumni networks of established universities and grow your professional circle.", tone: "green" },
] as const;

export const benefits = [
  {
    title: "Free career counselling",
    body: "We don't charge for counselling. Talk to an expert, compare universities and pick the program that fits your goals.",
  },
  {
    title: "Help with education loans & EMI",
    body: "Our team guides you through loan options, paperwork and no-cost EMI plans, so fees don't hold you back.",
  },
  {
    title: "Placement assistance",
    body: "Resume support, interview preparation and job opportunities to help you turn your degree into a better role.",
  },
  {
    title: "Counselling at your doorstep",
    body: "Prefer to meet in person? Our counsellors can visit your home or office, or you can visit us.",
  },
];

export const steps = [
  { title: "Talk to a counsellor", body: "Share your background and goals on a free call." },
  { title: "Shortlist programs", body: "Compare universities, fees, EMI and specialisations side by side." },
  { title: "Apply with our help", body: "We help with documents, the application and loan or EMI setup." },
  { title: "Start learning", body: "Study online at your own pace while you keep working." },
];

export const testimonials = [
  {
    name: "Shaira Khan",
    quote:
      "Onegrow career counselling was a game-changer for me. Their personalised advice and support helped me find the right path. Thank you for guiding me to a career I love!",
  },
  {
    name: "Amit Sharma",
    quote:
      "Onegrow's personalised career counselling helped me find the perfect path. Their expert guidance and support transformed my journey, and now I'm in a career I truly love.",
  },
  {
    name: "Neha Verma",
    quote:
      "Thanks to Onegrow's career counselling, I discovered a job that fits my passions and skills perfectly. Their advice was spot-on, and I'm grateful for the positive impact they've made!",
  },
];

export const videos = [
  { id: "vhnhUq8E-ZA", title: "Most Vibrant Campus of India | Manipal University Jaipur" },
  { id: "S94e4acuEt0", title: "We're Manipal Academy of Higher Education | Destination Manipal" },
  { id: "DxHhBkL1-uE", title: "Manipal Institute of Technology | Campus tour" },
];

export const faqs = [
  {
    q: "Does Onegrow charge any counselling fee?",
    a: "No. Our career counselling is free, so everyone can get the right guidance without financial pressure. A fee applies only if you choose a specific third-party assessment through us.",
  },
  {
    q: "Are these online degrees valid?",
    a: "Yes. All online degrees we offer come from UGC-entitled universities, and they are treated the same as regular degrees for jobs and higher studies in India.",
  },
  {
    q: "Can Onegrow counsellors visit my home or office?",
    a: "Yes. Our counsellors can meet you at your home or office for a personalised session, or you can visit us. We fit around your schedule.",
  },
  {
    q: "Does Onegrow help with education loans?",
    a: "Yes. We support you through the whole education loan process, from comparing options to preparing documents and submitting the application. Most programs also offer no-cost EMI.",
  },
  {
    q: "How do I book a counselling session?",
    a: "Fill the form on this page, call us or message us on WhatsApp with the program you're interested in. A counsellor will get back to you and set up a session.",
  },
  {
    q: "Does Onegrow offer internships?",
    a: "Yes, through our specialised programs. These internships give you hands-on experience and help you build skills for your career. Contact us to know about current openings.",
  },
];
