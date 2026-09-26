import { createFileRoute, Link } from "@tanstack/react-router";
import { MediaImage } from "@/components/media-image";
import { insights } from "@/data/site";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/insights/")({
  head: () => ({
    meta: [
      { title: "Technical Insights & Machinery Economics | Omnicore Solutions Zimbabwe" },
      {
        name: "description",
        content:
          "Practical engineering notes on wet vs dry plant hire, commercial hammer mills, gold circuit payback and rainy-season site planning in Zimbabwe.",
      },
    ],
  }),
  component: InsightsIndex,
});

function InsightsIndex() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold tracking-wider text-[#86868b] uppercase">
          Field Economics & Guides · Cranborne Desk
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-[#1d1d1f] sm:text-5xl">
          ROI, uptime and field economics.
        </h1>
        <p className="mt-1 max-w-2xl text-sm leading-relaxed text-[#6e6e73]">
          How to evaluate wet vs dry plant hire, calculate hammer mill milling payback, and prepare mining claims before the Zimbabwean rainy season.
        </p>
      </div>

      {/* Insights Grid */}
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {insights.map((post) => (
          <Link
            key={post.slug}
            to="/insights/$slug"
            params={{ slug: post.slug }}
            className="group flex flex-col overflow-hidden rounded-3xl border border-black/[0.06] bg-white shadow-xs transition-all duration-300 hover:border-black/[0.12] hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)]"
          >
            <div className="relative aspect-16/10 overflow-hidden bg-[#f5f5f7]">
              <MediaImage
                src={post.image}
                alt={post.imageAlt}
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute top-4 left-4">
                <span className="inline-block rounded-full bg-white/85 backdrop-blur-md px-3 py-1 text-xs font-medium text-[#1d1d1f] border border-black/[0.06]">
                  {post.category}
                </span>
              </div>
            </div>

            <div className="flex flex-1 flex-col p-6 sm:p-8">
              <div className="flex items-center gap-2 text-xs text-[#86868b]">
                <span>{post.read}</span>
                <span>·</span>
                <span>{post.date}</span>
              </div>

              <h2 className="mt-2 text-xl font-semibold tracking-tight text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors">
                {post.title}
              </h2>

              <p className="mt-2 flex-1 text-xs sm:text-sm leading-relaxed text-[#6e6e73]">
                {post.description}
              </p>

              <div className="mt-6 pt-4 border-t border-black/[0.04] flex items-center text-xs font-medium text-[#1d1d1f] group-hover:text-[#0071e3]">
                <span>Read technical guide</span>
                <ArrowRight className="size-3.5 ml-1 transition-transform group-hover:translate-x-0.5" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
