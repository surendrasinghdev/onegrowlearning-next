import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import legal from "@/data/legal.json";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The terms and conditions that govern your use of the Onegrow Learning platform and services.",
};

export default function TermsPage() {
  return (
    <LegalPage
      crumb="Terms & Conditions"
      title="Terms & Conditions"
      sub="The essential terms that govern your use of the Onegrow Learning platform and our services."
      html={legal.terms}
    />
  );
}
