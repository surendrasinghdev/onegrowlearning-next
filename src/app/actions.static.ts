// Used instead of actions.ts in the static GitHub Pages build (see next.config.ts), where
// server actions can't run. It validates in the browser and hands the lead over WhatsApp.
import { site } from "@/data/site";
import { parseLead, type LeadState } from "@/lib/lead";

export async function submitLead(_prev: LeadState, formData: FormData): Promise<LeadState> {
  const lead = parseLead(formData);
  if (lead === null) return { status: "success" };
  if ("errors" in lead) return { status: "error", errors: lead.errors };

  const text = ["Hi Onegrow, I'd like free counselling.", "", ...lead.rows.map(([k, v]) => `${k}: ${v}`)].join("\n");
  return { status: "success", whatsappHref: `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}` };
}
