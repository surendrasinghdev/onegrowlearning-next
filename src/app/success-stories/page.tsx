import type { Metadata } from "next";
import { MovedPage } from "@/components/MovedPage";

// Old WordPress URL kept so existing links don't break (see next.config.ts redirects).
export const metadata: Metadata = { title: "Page moved", robots: { index: false } };

export default function Moved() {
  return <MovedPage />;
}
