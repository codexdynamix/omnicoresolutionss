import { createFileRoute, Link } from "@tanstack/react-router";
import { MediaImage } from "@/components/media-image";
import { services, whatsappUrl } from "@/data/site";
import { WhatsAppBadge } from "@/components/ui/official-badges";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Specialized Machinery Lines | Omnicore Solutions Zimbabwe" },
      {
        name: "description",
        content:
          "Five specialized machinery lines from Harare: mining equipment, hardware & construction, machinery hire, farming plant, and industrial manufacturing.",
      },
    ],
  }),
  component: ServicesIndex,
});

function ServicesIndex() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold tracking-wider text-[#86868b] uppercase">
          Divisions · Harare Cranborne Desk
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-[#1d1d1f] sm:text-5xl">
          Five divisions. One engineering desk.
        </h1>
        <p className="mt-1 max-w-2xl text-sm leading-relaxed text-[#6e6e73]">
          Mining circuits, construction plant hire, hardware supplies, commercial farming equipment and industrial production machinery — engineered for Zimbabwe, quoted from Cranborne, dispatched nationwide.
        </p>
      </div>

      {/* Services List - Apple iOS rounded-3xl cards */}
      <div className="mt-12 grid gap-8">
        {services.map((service) => (
          <div
            key={service.slug}
            className="group grid overflow-hidden rounded-3xl border border-black/[0.06] bg-white shadow-xs transition-all duration-300 hover:border-black/[0.12] hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] md:grid-cols-12"
          >
            <div className="relative aspect-16/10 md:aspect-auto md:col-span-5 overflow-hidden bg-[#f5f5f7] min-h-[260px]">
              <MediaImage
                src={service.image}
                alt={service.imageAlt}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute top-4 left-4">
                <span className="inline-block rounded-full bg-white/85 backdrop-blur-md px-3 py-1 text-[11px] font-medium text-[#1d1d1f] border border-black/[0.06]">
                  {service.eyebrow}
                </span>
              </div>
            </div>

            <div className="flex flex-col justify-between p-6 sm:p-8 md:col-span-7">
              <div>
                <Link
                  to="/services/$slug"
                  params={{ slug: service.slug }}
                  className="inline-block"
                >
                  <h2 className="text-2xl font-semibold tracking-tight text-[#1d1d1f] hover:text-[#0071e3] transition-colors">
                    {service.title}
                  </h2>
                </Link>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#6e6e73]">
                  {service.summary}
                </p>

                {/* Bullets */}
                <div className="mt-4 flex flex-wrap gap-2 text-xs text-[#86868b]">
                  {service.bullets?.slice(0, 3).map((hl) => (
                    <span
                      key={hl}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#f5f5f7] px-3 py-1 text-[11px] font-medium text-[#1d1d1f]"
                    >
                      <CheckCircle2 className="size-3 text-emerald-600" />
                      {hl}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-black/[0.04] flex flex-wrap items-center justify-between gap-3">
                <Link
                  to="/services/$slug"
                  params={{ slug: service.slug }}
                  className="inline-flex items-center text-xs font-medium text-[#0071e3] hover:underline"
                >
                  <span>Explore machinery line</span>
                  <ArrowRight className="size-3 ml-1" />
                </Link>

                <a
                  href={whatsappUrl(`Hello Omnicore, I am interested in ${service.title}. What is your current availability and pricing?`)}
                  className="inline-flex items-center gap-1.5"
                >
                  <WhatsAppBadge compact label="Inquire on WhatsApp" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
