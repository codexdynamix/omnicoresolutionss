import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { EquipmentCard } from "@/components/equipment-card";
import { MediaImage } from "@/components/media-image";
import { QuoteForm } from "@/components/quote-form";
import { equipment, getService, hireRates, whatsappUrl } from "@/data/site";
import { WhatsAppIcon } from "@/components/ui/official-badges";
import { CheckCircle2, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData?.service.seoTitle ?? "Omnicore Solutions" },
      { name: "description", content: loaderData?.service.seoDescription ?? "" },
    ],
  }),
  component: ServicePage,
});

function ServicePage() {
  const { service } = Route.useLoaderData();
  const related = equipment.filter((item) => item.category === service.slug);

  return (
    <main className="pb-16">
      {/* Hero Section */}
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 sm:py-20 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="inline-block rounded-full bg-black/[0.04] px-3.5 py-1 text-xs font-medium text-[#1d1d1f]">
            {service.eyebrow} · Cranborne Desk
          </span>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[#1d1d1f] sm:text-5xl">
            {service.headline}
          </h1>

          <p className="mt-4 text-base leading-relaxed text-[#6e6e73]">
            {service.summary}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/quote"
              className="inline-flex h-11 items-center justify-center rounded-full bg-[#1d1d1f] px-6 text-xs font-medium text-white shadow-xs hover:bg-[#333336] transition-all"
            >
              Get Firm Quote
            </Link>
            <a
              href={whatsappUrl(`Hello Omnicore Harare Desk, I need a direct quote for ${service.title}.`)}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#1fa855] px-5 text-xs font-semibold text-white shadow-[0_4px_14px_rgba(31,168,85,0.25)] transition-all hover:bg-[#1b934b] active:scale-95"
            >
              <WhatsAppIcon className="size-4 shrink-0" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-black/[0.06] bg-[#f5f5f7] shadow-xs">
          <MediaImage
            src={service.image}
            alt={service.imageAlt}
            className="aspect-16/10 w-full object-cover"
          />
        </div>
      </section>

      {/* Field Capabilities */}
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <h3 className="text-xs font-semibold tracking-wider text-[#86868b] uppercase mb-4">
          Field Capabilities & Zimbabwe Standards
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {service.bullets.map((bullet) => (
            <div
              key={bullet}
              className="flex items-start gap-3 rounded-2xl border border-black/[0.06] bg-white p-5 transition-all"
            >
              <CheckCircle2 className="size-4 shrink-0 text-emerald-600 mt-0.5" />
              <p className="text-xs sm:text-sm text-[#1d1d1f] leading-relaxed">
                {bullet}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Hire Rates Table if hire line */}
      {service.slug === "hire" ? (
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold tracking-wider text-[#86868b] uppercase">
                Plant Hire Rate Card
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-[#1d1d1f] sm:text-3xl">
                Wet and dry hire, firm transparency.
              </h2>
            </div>
            <a
              href={whatsappUrl("Hello Omnicore, I want to book equipment hire.")}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#0071e3] hover:underline"
            >
              <span>Book dates on WhatsApp</span>
              <ArrowRight className="size-3" />
            </a>
          </div>

          <div className="mt-6 overflow-hidden rounded-3xl border border-black/[0.06] bg-white shadow-xs">
            <div className="hidden grid-cols-4 gap-4 border-b border-black/[0.06] bg-[#f5f5f7] px-6 py-3.5 text-xs font-semibold text-[#1d1d1f] uppercase tracking-wider md:grid">
              <span>Machinery Model</span>
              <span>Capacity / Output</span>
              <span>Wet Hire Rate</span>
              <span>Dry Hire Rate</span>
            </div>
            {hireRates.map((row) => (
              <div
                key={row.machine}
                className="grid gap-1 border-b border-black/[0.04] px-6 py-4 transition-colors hover:bg-black/[0.02] last:border-0 md:grid-cols-4 md:gap-4 md:items-center text-xs"
              >
                <p className="font-semibold text-[#1d1d1f]">{row.machine}</p>
                <p className="text-[#6e6e73]">{row.output}</p>
                <div className="font-medium text-[#1d1d1f]">
                  <span className="md:hidden text-[#86868b] mr-1">Wet:</span>
                  {row.wet}
                </div>
                <div className="text-[#6e6e73]">
                  <span className="md:hidden text-[#86868b] mr-1">Dry:</span>
                  {row.dry}
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* Equipment Grid */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <h2 className="text-2xl font-semibold tracking-tight text-[#1d1d1f] sm:text-3xl">
          Machinery in this division
        </h2>
        {related.length > 0 ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <EquipmentCard key={item.id} item={item} />
            ))}
          </div>
        ) : null}
      </section>

      {/* FAQs */}
      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <h2 className="text-2xl font-semibold tracking-tight text-[#1d1d1f] sm:text-3xl">
          Frequently asked questions
        </h2>
        <Accordion type="single" collapsible className="mt-4 rounded-3xl border border-black/[0.06] bg-white p-4 shadow-xs">
          {service.faqs.map((faq) => (
            <AccordionItem key={faq.q} value={faq.q} className="border-b border-black/[0.04] last:border-0">
              <AccordionTrigger className="text-sm font-semibold text-[#1d1d1f] hover:text-[#0071e3] py-4">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-xs sm:text-sm text-[#6e6e73] leading-relaxed pb-4">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Bottom Quote Form */}
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <QuoteForm defaultService={service.title} />
      </section>
    </main>
  );
}
