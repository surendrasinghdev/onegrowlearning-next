import type { Metadata } from "next";
import { MovedPage } from "@/components/MovedPage";

// Old program page of an institute that isn't an Onegrow partner (see next.config.ts redirects).
export const metadata: Metadata = { title: "Page moved", robots: { index: false } };

export default function Moved() {
  return <MovedPage to="/popular-programs/" label="all programs" />;
}
