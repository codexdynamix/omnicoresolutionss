import { createFileRoute } from "@tanstack/react-router";
import { Clock, MapPin, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { QuoteForm } from "@/components/quote-form";
import { site } from "@/data/site";
import {
  WhatsAppBadge,
  WhatsAppIcon,
  GmailBadge,
  GoogleMapsBadge,
  PhoneBadge,
} from "@/components/ui/official-badges";
import { useSiteCopy } from "@/lib/cms-store";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Harare Machinery Desk | Omnicore Solutions" },
      {
        name: "description",
        content:
          "Visit Omnicore Solutions at 115 Chiremba Road, Cranborne, Harare. Direct WhatsApp quoting +263 77 733 4569. Machinery sales and plant hire nationwide.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const copy = useSiteCopy();
  const phoneDisplay = copy.primaryPhone || site.phoneDisplay;
  const phoneTel = copy.primaryPhoneTel || site.phoneTel;
  const phoneAltDisplay = copy.secondaryPhone || site.phoneAltDisplay;
  const phoneAltTel = copy.secondaryPhoneTel || site.phoneAltTel;
  const email = copy.email || site.email;
  const whatsappNum = copy.whatsappNumber || site.whatsappNumber;
  const whatsappMsg = copy.whatsappMessage || "Hello Omnicore Harare Desk — I would like an equipment quote.";
  const mapsUrl = copy.googleMapsUrl || site.address.maps;
  const addressLine1 = copy.yardAddressLine1 || site.address.line1;
  const addressLine2 = copy.yardAddressLine2 || site.address.line2;

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
      {/* Page Header */}
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold tracking-wider text-[#86868b] uppercase">
          Harare Desk & Yard · {addressLine2}
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-[#1d1d1f] sm:text-5xl">
          Contact our engineers.
        </h1>
        <p className="mt-1 max-w-2xl text-sm leading-relaxed text-[#6e6e73]">
          {addressLine1}, {addressLine2}. Direct WhatsApp, voice calling, and email lines. We provide firm price and hire availability for sites across Zimbabwe.
        </p>
      </div>

      {/* Official Channel Badges Grid - Apple Rounded-3xl Cards */}
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* WhatsApp Card */}
        <a
          href={`https://wa.me/${whatsappNum}?text=${encodeURIComponent(whatsappMsg)}`}
          className="group flex flex-col justify-between rounded-3xl bg-white p-6 border border-black/[0.06] shadow-xs transition-all duration-300 hover:border-black/[0.12] hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] hover:-translate-y-0.5"
        >
          <div>
            <div className="flex items-center justify-between">
              <WhatsAppBadge label="WhatsApp" />
              <ArrowUpRight className="size-4 text-[#86868b] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#1d1d1f]" />
            </div>
            <p className="mt-4 text-sm font-semibold text-[#1d1d1f]">
              {phoneDisplay}
            </p>
            <p className="mt-1 text-xs text-[#86868b] leading-relaxed">
              Instant quotes, plant photos & voice notes. {copy.responseSLA || "Average reply: <15 mins."}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-black/[0.04] text-[11px] font-medium text-[#1d1d1f]">
            Open WhatsApp Chat →
          </div>
        </a>

        {/* Alternative Phone Card */}
        <a
          href={`tel:${phoneAltTel}`}
          className="group flex flex-col justify-between rounded-3xl bg-white p-6 border border-black/[0.06] shadow-xs transition-all duration-300 hover:border-black/[0.12] hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] hover:-translate-y-0.5"
        >
          <div>
            <div className="flex items-center justify-between">
              <PhoneBadge label="Voice Calling" />
              <ArrowUpRight className="size-4 text-[#86868b] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#1d1d1f]" />
            </div>
            <p className="mt-4 text-sm font-semibold text-[#1d1d1f]">
              {phoneAltDisplay}
            </p>
            <p className="mt-1 text-xs text-[#86868b] leading-relaxed">
              Urgent yard dispatch line, operator bookings & driver coordination.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-black/[0.04] text-[11px] font-medium text-[#1d1d1f]">
            Call Cranborne Desk →
          </div>
        </a>

        {/* Email Card */}
        <a
          href={`mailto:${email}`}
          className="group flex flex-col justify-between rounded-3xl bg-white p-6 border border-black/[0.06] shadow-xs transition-all duration-300 hover:border-black/[0.12] hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] hover:-translate-y-0.5"
        >
          <div>
            <div className="flex items-center justify-between">
              <GmailBadge label="Official Email" />
              <ArrowUpRight className="size-4 text-[#86868b] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#1d1d1f]" />
            </div>
            <p className="mt-4 text-sm font-semibold text-[#1d1d1f] truncate">
              {email}
            </p>
            <p className="mt-1 text-xs text-[#86868b] leading-relaxed">
              Company pro-forma invoices, tender documents and equipment specifications.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-black/[0.04] text-[11px] font-medium text-[#1d1d1f]">
            Send Official Email →
          </div>
        </a>

        {/* Google Maps Card */}
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col justify-between rounded-3xl bg-white p-6 border border-black/[0.06] shadow-xs transition-all duration-300 hover:border-black/[0.12] hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] hover:-translate-y-0.5"
        >
          <div>
            <div className="flex items-center justify-between">
              <GoogleMapsBadge label="Google Maps" />
              <ArrowUpRight className="size-4 text-[#86868b] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#1d1d1f]" />
            </div>
            <p className="mt-4 text-sm font-semibold text-[#1d1d1f]">
              {addressLine1}
            </p>
            <p className="mt-1 text-xs text-[#86868b] leading-relaxed">
              {addressLine2}. Easy lowbed and flatbed truck loading access.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-black/[0.04] text-[11px] font-medium text-[#1d1d1f]">
            Open Map Pin →
          </div>
        </a>
      </div>

      {/* Yard Schedule Bar - Apple iOS clean style */}
      <div className="mt-6 rounded-3xl bg-[#f5f5f7] p-6 border border-black/[0.06]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-full bg-white text-[#1d1d1f] shadow-2xs">
              <Clock className="size-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#1d1d1f]">
                Yard & Demonstration Hours
              </p>
              <p className="text-xs text-[#86868b]">
                Open for physical machine inspection & loading
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            <div className="rounded-full bg-white px-3.5 py-1 text-xs text-[#1d1d1f] border border-black/[0.06]">
              <span className="text-[#86868b] mr-1.5">Mon – Fri:</span>
              <span className="font-medium">{copy.hoursWeekday || "08:00 – 17:00"}</span>
            </div>
            <div className="rounded-full bg-white px-3.5 py-1 text-xs text-[#1d1d1f] border border-black/[0.06]">
              <span className="text-[#86868b] mr-1.5">Saturday:</span>
              <span className="font-medium">{copy.hoursSaturday || "08:00 – 13:00"}</span>
            </div>
            <div className="rounded-full bg-white px-3.5 py-1 text-xs text-[#1d1d1f] border border-black/[0.06]">
              <span className="text-[#86868b] mr-1.5">Sunday:</span>
              <span className="font-medium">{copy.hoursSunday || "Closed · WhatsApp monitored"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Form & Yard Map Section */}
      <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:items-start">
        <QuoteForm />

        {/* Physical Yard Details */}
        <div className="rounded-3xl bg-white p-6 sm:p-8 border border-black/[0.06] shadow-xs">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-black/[0.04] px-3 py-1 text-xs font-medium text-[#1d1d1f]">
              <MapPin className="size-3.5 text-[#0071e3]" />
              Harare Physical Yard
            </span>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-medium text-[#0071e3] hover:underline"
            >
              <span>Google Maps Pin</span>
              <ArrowUpRight className="size-3.5" />
            </a>
          </div>

          <h2 className="mt-4 text-xl font-semibold tracking-tight text-[#1d1d1f]">
            Visiting the Cranborne Yard.
          </h2>
          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#6e6e73]">
            {copy.yardDirectionsNote || "Along Chiremba Road, close to major Harare arterial routes. Heavy machinery can be inspected, demonstrated, and loaded onto lowbeds directly from our yard."}
          </p>

          <div className="mt-6 space-y-2.5 rounded-2xl bg-[#f5f5f7] p-4 text-xs text-[#1d1d1f]">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="size-4 shrink-0 text-emerald-600 mt-0.5" />
              <span><strong>Crane & Overhead Loading:</strong> Industrial rigging available on-site for secure truck loading.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="size-4 shrink-0 text-emerald-600 mt-0.5" />
              <span><strong>Live Machinery Run-Up:</strong> Testing of diesel engines, jaw crushers, and pumps before release.</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="size-4 shrink-0 text-emerald-600 mt-0.5" />
              <span><strong>Nationwide Waybills:</strong> Cross-country delivery arranged to Bulawayo, Gweru, Mutare, Kadoma, and mining claims.</span>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2.5">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full bg-[#1d1d1f] px-5 text-xs font-medium text-white shadow-xs hover:bg-[#333336] transition-colors"
            >
              <span>Get Directions</span>
              <ArrowUpRight className="size-3" />
            </a>
            <a
              href={`tel:${phoneTel}`}
              className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full border border-black/[0.1] bg-white px-4 text-xs font-medium text-[#1d1d1f] shadow-2xs hover:bg-[#f5f5f7] transition-colors"
            >
              <span>Call: {phoneDisplay}</span>
            </a>
            <a
              href={`https://wa.me/${whatsappNum}?text=${encodeURIComponent("Hello! I am planning to visit the Cranborne yard today.")}`}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#1fa855] px-5 text-xs font-semibold text-white shadow-[0_4px_14px_rgba(31,168,85,0.25)] hover:bg-[#1b934b] transition-all active:scale-95"
            >
              <WhatsAppIcon className="size-4 shrink-0" />
              <span>Notify Yard on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
