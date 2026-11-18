import type { Metadata } from "next";
import { DM_Sans, Outfit } from "next/font/google";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { EnquiryProvider } from "@/components/Enquiry";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ScrollToTop } from "@/components/ScrollToTop";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { site } from "@/data/site";
import "./globals.css";

// Outfit for headlines (clean geometric), DM Sans for everything else.
const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"] });
const dmSans = DM_Sans({ variable: "--font-dm-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Onegrow Learning | Online Degrees from Top Universities, Free Counselling",
    template: "%s | Onegrow Learning",
  },
  description:
    "Compare UGC-entitled online MBA, MCA, BBA, BCA, B.Com and MA programs from Manipal University Jaipur and Sikkim Manipal University. Free career counselling, EMI and education loan help.",
  openGraph: { siteName: site.name, type: "website", locale: "en_IN" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" data-scroll-behavior="smooth" className={`${outfit.variable} ${dmSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col overflow-x-clip">
        <EnquiryProvider>
          <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-full focus:bg-navy focus:px-4 focus:py-2 focus:text-white">
            Skip to content
          </a>
          <AnnouncementBar />
          <ScrollToTop />
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
        </EnquiryProvider>
      </body>
    </html>
  );
}
