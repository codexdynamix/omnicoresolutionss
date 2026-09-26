import { useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { services, whatsappUrl } from "@/data/site";
import { WhatsAppBadge, WhatsAppIcon } from "@/components/ui/official-badges";
import { addInboundLeadToCRM } from "@/lib/cms-store";

const intents = ["Buy", "Hire", "Both", "General"] as const;

type QuoteFormProps = {
  defaultService?: string;
  compact?: boolean;
};

export function QuoteForm({ defaultService = "" }: QuoteFormProps) {
  const [sent, setSent] = useState(false);
  const [waUrl, setWaUrl] = useState("");
  const [selectedIntent, setSelectedIntent] = useState<string>("Buy");
  const [selectedService, setSelectedService] = useState<string>(defaultService);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get("name") ?? "").trim(),
      phone: String(form.get("phone") ?? "").trim(),
      email: String(form.get("email") ?? "").trim(),
      service: selectedService || String(form.get("service") ?? "").trim(),
      intent: selectedIntent,
      message: String(form.get("message") ?? "").trim(),
      location: String(form.get("location") ?? "").trim(),
      at: new Date().toISOString(),
    };

    try {
      localStorage.setItem("omnicore-last-quote", JSON.stringify(payload));
      addInboundLeadToCRM({
        name: payload.name,
        phone: payload.phone,
        email: payload.email,
        service: payload.service,
        intent: payload.intent,
        message: payload.message,
        location: payload.location,
      });
    } catch {
      /* private mode */
    }

    const text = [
      `Hello Omnicore Harare Desk, I need a machinery quote.`,
      `Name: ${payload.name || "Client"}.`,
      `Requirement: ${payload.intent}.`,
      payload.service ? `Category: ${payload.service}.` : "",
      payload.location ? `Site/Location: ${payload.location}.` : "",
      payload.message ? `Details: ${payload.message}.` : "",
      payload.phone ? `Phone: ${payload.phone}` : "",
      payload.email ? `Email: ${payload.email}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const url = whatsappUrl(text);
    setWaUrl(url);
    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-3xl bg-white p-8 sm:p-10 border border-black/[0.06] shadow-xs text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <Check className="size-5" />
        </div>
        <h3 className="mt-4 text-xl font-semibold tracking-tight text-[#1d1d1f]">
          Ready to send on WhatsApp
        </h3>
        <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#6e6e73]">
          Your machinery requirement is compiled. Launch WhatsApp to chat directly with our Cranborne engineering staff.
        </p>

        <div className="mt-6 flex flex-col gap-2.5 max-w-xs mx-auto">
          <a
            href={waUrl}
            className="flex items-center justify-center gap-2 rounded-full bg-[#1fa855] py-3 text-xs sm:text-sm font-semibold text-white shadow-[0_4px_14px_rgba(31,168,85,0.25)] hover:bg-[#1b934b] transition-all active:scale-95"
          >
            <WhatsAppIcon className="size-5 shrink-0" />
            <span>Launch WhatsApp Desk</span>
          </a>

          <button
            type="button"
            onClick={() => setSent(false)}
            className="text-xs text-[#86868b] hover:text-[#1d1d1f] transition-colors py-1"
          >
            ← Edit details
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col rounded-3xl bg-white p-6 sm:p-10 border border-black/[0.06] shadow-xs"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-[#1d1d1f]">
            Request equipment pricing
          </h2>
          <p className="mt-0.5 text-xs text-[#86868b]">
            Direct quote from Harare desk with stock status & rates.
          </p>
        </div>
        <WhatsAppBadge compact label="Live Desk" />
      </div>

      <div className="mt-6 space-y-4">
        {/* Name and Phone */}
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1">
            <Label htmlFor="quote-name" className="text-xs font-medium text-[#1d1d1f]">
              Name / Company *
            </Label>
            <Input
              id="quote-name"
              name="name"
              required
              placeholder="e.g. Tendai Moyo"
              className="h-10 rounded-xl text-xs bg-[#fbfbfd] border-black/[0.08] focus:border-[#0071e3]"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="quote-phone" className="text-xs font-medium text-[#1d1d1f]">
              WhatsApp Phone *
            </Label>
            <Input
              id="quote-phone"
              name="phone"
              type="tel"
              required
              placeholder="+263 7..."
              className="h-10 rounded-xl text-xs bg-[#fbfbfd] border-black/[0.08] focus:border-[#0071e3]"
            />
          </div>
        </div>

        {/* Intent Segmented Selector */}
        <div className="space-y-1">
          <Label className="text-xs font-medium text-[#1d1d1f]">Inquiry Type</Label>
          <div className="grid grid-cols-4 gap-1 p-1 rounded-full bg-black/[0.04]">
            {intents.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setSelectedIntent(item)}
                className={`h-8 rounded-full text-xs font-medium transition-all ${
                  selectedIntent === item
                    ? "bg-white text-[#1d1d1f] shadow-2xs font-semibold"
                    : "text-[#6e6e73] hover:text-[#1d1d1f]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Service Line */}
        <div className="space-y-1">
          <Label htmlFor="quote-service" className="text-xs font-medium text-[#1d1d1f]">
            Machinery Category
          </Label>
          <select
            id="quote-service"
            name="service"
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="flex h-10 w-full rounded-xl border border-black/[0.08] bg-[#fbfbfd] px-3 text-xs text-[#1d1d1f] focus:border-[#0071e3] focus:outline-hidden"
          >
            <option value="">Select machinery category...</option>
            {services.map((service) => (
              <option key={service.slug} value={service.title}>
                {service.title}
              </option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div className="space-y-1">
          <Label htmlFor="quote-location" className="text-xs font-medium text-[#1d1d1f]">
            Site / Delivery Location in Zimbabwe
          </Label>
          <Input
            id="quote-location"
            name="location"
            placeholder="e.g. Kadoma Claim, Norton Farm, Harare Site"
            className="h-10 rounded-xl text-xs bg-[#fbfbfd] border-black/[0.08] focus:border-[#0071e3]"
          />
        </div>

        {/* Message */}
        <div className="space-y-1">
          <Label htmlFor="quote-message" className="text-xs font-medium text-[#1d1d1f]">
            Machine Specifications / Output Requirements
          </Label>
          <Textarea
            id="quote-message"
            name="message"
            rows={3}
            placeholder="Specify tonnage per hour, duration of hire, diesel or electric..."
            className="rounded-xl text-xs bg-[#fbfbfd] border-black/[0.08] focus:border-[#0071e3] resize-none"
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#1d1d1f] text-xs font-medium text-white shadow-xs hover:bg-[#333336] transition-colors"
      >
        <span>Format Quote on WhatsApp</span>
      </button>

      <p className="mt-2.5 text-center text-[11px] text-[#86868b]">
        Direct response from Harare technical desk during working hours.
      </p>
    </form>
  );
}
