import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MediaImage } from "@/components/media-image";
import { getInsight, insights, whatsappUrl } from "@/data/site";
import { WhatsAppBadge } from "@/components/ui/official-badges";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/insights/$slug")({
  loader: ({ params }) => {
    const post = getInsight(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData?.post.seoTitle ?? "Insights | Omnicore Solutions" },
      { name: "description", content: loaderData?.post.description ?? "" },
    ],
  }),
  component: InsightPage,
});

function InsightPage() {
  const { post } = Route.useLoaderData();
  const more = insights.filter((item) => item.slug !== post.slug).slice(0, 2);

  return (
    <main className="pb-20">
      {/* Article Header */}
      <article className="mx-auto max-w-3xl px-4 pt-12 sm:px-6 sm:pt-16">
        <Link
          to="/insights"
          className="inline-flex items-center text-xs font-medium text-[#86868b] hover:text-[#1d1d1f] mb-6 transition-colors"
        >
          <ArrowLeft className="size-3.5 mr-1" />
          <span>Back to field guides</span>
        </Link>

        <div className="flex items-center gap-2 text-xs font-medium text-[#86868b] uppercase tracking-wider">
          <span>{post.category}</span>
          <span>·</span>
          <span>{post.read}</span>
          <span>·</span>
          <span>{post.date}</span>
        </div>

        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#1d1d1f] sm:text-5xl">
          {post.title}
        </h1>
        <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#6e6e73]">
          {post.kicker}
        </p>
      </article>

      {/* Hero Image */}
      <div className="mx-auto mt-8 max-w-4xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-3xl border border-black/[0.06] bg-[#f5f5f7] shadow-xs">
          <MediaImage src={post.image} alt={post.imageAlt} className="aspect-16/9 w-full object-cover" />
        </div>
      </div>

      {/* Body Content */}
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        {post.body.map((block, index) => (
          <section key={index} className="mt-8 first:mt-0">
            {block.heading ? (
              <h2 className="text-xl font-semibold tracking-tight text-[#1d1d1f] sm:text-2xl">
                {block.heading}
              </h2>
            ) : null}
            {block.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="mt-4 text-sm sm:text-base leading-relaxed text-[#48484a]">
                {paragraph}
              </p>
            ))}
          </section>
        ))}

        {/* WhatsApp Consultation Box */}
        <div className="mt-14 flex flex-col gap-4 rounded-3xl border border-black/[0.06] bg-[#f5f5f7] p-6 sm:p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#1d1d1f]">Need this plant specified for your site?</p>
            <p className="text-xs text-[#86868b] mt-0.5">
              Discuss tonnages, freight, and operator requirements with Cranborne engineers.
            </p>
          </div>
          <a
            href={whatsappUrl(`Hello Omnicore — I read “${post.title}” and need a machinery quote.`)}
            className="inline-flex shrink-0 items-center justify-center gap-2"
          >
            <WhatsAppBadge label="WhatsApp Consultation" />
          </a>
        </div>

        {/* More Articles */}
        {more.length > 0 ? (
          <div className="mt-16 pt-10 border-t border-black/[0.06]">
            <h3 className="text-base font-semibold text-[#1d1d1f] mb-6">More field guides</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {more.map((item) => (
                <Link
                  key={item.slug}
                  to="/insights/$slug"
                  params={{ slug: item.slug }}
                  className="group rounded-3xl border border-black/[0.06] bg-white p-5 shadow-2xs hover:border-black/[0.12] hover:shadow-xs transition-all"
                >
                  <span className="text-[11px] font-semibold text-[#86868b] uppercase tracking-wider">
                    {item.category}
                  </span>
                  <h4 className="mt-1 text-sm font-semibold text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors">
                    {item.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}
