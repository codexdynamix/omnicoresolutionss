import { createFileRoute } from "@tanstack/react-router";
import { QuoteForm } from "@/components/quote-form";
import { site, whatsappUrl } from "@/data/site";
import { WhatsAppBadge, GmailBadge, PhoneBadge } from "@/components/ui/official-badges";
import { ShieldCheck, Clock, Truck } from "lucide-react";

export const Route = createFileRoute("/quote")({
  head: () => ({
    meta: [
      { title: "Get a Machinery Quote | Omnicore Solutions Harare" },
      {
        name: "description",
        content:
          "Request a machinery quote from Omnicore Solutions. Direct quoting for heavy plant, mining circuits, concrete pump hire and agricultural mills across Zimbabwe.",
      },
    ],
  }),
  component: QuotePage,
});

function QuotePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
        {/* Left Side: Information & Value Proof */}
        <div>
          <p className="text-xs font-semibold tracking-wider text-[#86868b] uppercase">
            Harare Technical Desk
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#1d1d1f] sm:text-5xl">
            Send the site details. Receive a tender rate.
          </h1>

          <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#6e6e73]">
            Direct supply or hire. Wet or dry. We respond directly on WhatsApp with current Cranborne stock, freight lead-time, and a transparent rate you can defend in a project budget.
          </p>

          {/* Value points - Apple clean style */}
          <div className="mt-8 space-y-3">
            {[
              {
                icon: Clock,
                title: "Under 15-Minute Response",
                desc: "Direct contact with technical personnel in Cranborne during working hours.",
              },
              {
                icon: ShieldCheck,
                title: "Pre-Tested Machinery",
                desc: "Every diesel engine, hydraulic circuit and mechanical drive tested before release.",
              },
              {
                icon: Truck,
                title: "Freight Across All Provinces",
                desc: "Direct lowbed delivery to claims, farms, and infrastructure sites across Zimbabwe.",
              },
            ].map((pt) => (
              <div
                key={pt.title}
                className="flex items-start gap-3.5 rounded-2xl border border-black/[0.06] bg-white p-4 transition-all"
              >
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#f5f5f7] text-[#1d1d1f]">
                  <pt.icon className="size-4" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[#1d1d1f]">{pt.title}</h4>
                  <p className="text-xs text-[#86868b] mt-0.5">{pt.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Direct channels */}
          <div className="mt-8 pt-6 border-t border-black/[0.04]">
            <p className="text-xs font-semibold text-[#1d1d1f] mb-3">
              Direct Contact
            </p>
            <div className="flex flex-wrap gap-2">
              <a href={whatsappUrl("Hello Omnicore — I need a fast quote.")}>
                <WhatsAppBadge label="WhatsApp +263 77 733 4569" />
              </a>
              <a href={`mailto:${site.email}`}>
                <GmailBadge label={site.email} />
              </a>
              <a href={`tel:${site.phoneTel}`}>
                <PhoneBadge label="Call Desk" />
              </a>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div>
          <QuoteForm />
        </div>
      </div>
    </main>
  );
}
