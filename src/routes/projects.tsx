import { createFileRoute } from "@tanstack/react-router";
import { MediaImage } from "@/components/media-image";
import { projects, whatsappUrl } from "@/data/site";
import { WhatsAppBadge } from "@/components/ui/official-badges";
import { MapPin } from "lucide-react";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Site Deployments & Case Studies | Omnicore Solutions Zimbabwe" },
      {
        name: "description",
        content:
          "Gold circuits, concrete pours, on-farm feed lines and fence manufacturing — Omnicore machinery operational across Zimbabwe.",
      },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold tracking-wider text-[#86868b] uppercase">
          Field Deployments · Zimbabwe
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-[#1d1d1f] sm:text-5xl">
          Machinery on the job.
        </h1>
        <p className="mt-1 max-w-2xl text-sm leading-relaxed text-[#6e6e73]">
          Active sites, mining claims, and commercial facilities equipped and supported by Omnicore Solutions from Cranborne, Harare.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.id}
            className="group flex flex-col overflow-hidden rounded-3xl border border-black/[0.06] bg-white shadow-xs transition-all duration-300 hover:border-black/[0.12] hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)]"
          >
            <div className="relative aspect-16/10 overflow-hidden bg-[#f5f5f7]">
              <MediaImage
                src={project.image}
                alt={project.imageAlt}
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1 rounded-full bg-white/85 backdrop-blur-md px-3 py-1 text-xs font-medium text-[#1d1d1f] border border-black/[0.06]">
                  <MapPin className="size-3 text-[#0071e3]" />
                  {project.location}
                </span>
              </div>
            </div>

            <div className="flex flex-1 flex-col p-6 sm:p-8">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#86868b]">
                {project.sector}
              </span>
              <h2 className="mt-1.5 text-xl font-semibold tracking-tight text-[#1d1d1f]">
                {project.title}
              </h2>
              <p className="mt-2 flex-1 text-xs sm:text-sm leading-relaxed text-[#6e6e73]">
                {project.body}
              </p>

              <div className="mt-6 pt-4 border-t border-black/[0.04] flex items-center justify-between">
                <span className="text-xs text-[#86868b]">Zimbabwe Commissioned</span>
                <a
                  href={whatsappUrl(`Hello Omnicore, I saw the project "${project.title}" and would like a similar machinery setup.`)}
                  className="inline-flex items-center gap-1.5"
                >
                  <WhatsAppBadge compact label="Inquire Similar Setup" />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
