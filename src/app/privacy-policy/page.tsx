import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import legal from "@/data/legal.json";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Onegrow Learning collects, uses and protects your personal data, and the choices you have.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      crumb="Privacy Policy"
      title="Privacy Policy"
      sub="What information we collect, how we use it and the choices you have about it."
      html={legal.privacy}
    />
  );
}
