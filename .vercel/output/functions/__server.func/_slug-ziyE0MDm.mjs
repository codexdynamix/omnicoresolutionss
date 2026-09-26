import { d as whatsappUrl, o as insights } from "./_ssr/site-NmzgmCl5.mjs";
import { c as require_jsx_runtime } from "./_libs/@radix-ui/react-accordion+[...].mjs";
import { b as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { Q as ArrowLeft } from "./_libs/lucide-react.mjs";
import { T as WhatsAppBadge, r as Route$2 } from "./_ssr/router-DUSCuKUA.mjs";
import { t as MediaImage } from "./_ssr/media-image-BLH74n9U.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-ziyE0MDm.js
var import_jsx_runtime = require_jsx_runtime();
function InsightPage() {
	const { post } = Route$2.useLoaderData();
	const more = insights.filter((item) => item.slug !== post.slug).slice(0, 2);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "pb-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "mx-auto max-w-3xl px-4 pt-12 sm:px-6 sm:pt-16",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/insights",
						className: "inline-flex items-center text-xs font-medium text-[#86868b] hover:text-[#1d1d1f] mb-6 transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-3.5 mr-1" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Back to field guides" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-xs font-medium text-[#86868b] uppercase tracking-wider",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: post.category }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: post.read }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: post.date })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 text-3xl font-semibold tracking-tight text-[#1d1d1f] sm:text-5xl",
						children: post.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-base sm:text-lg leading-relaxed text-[#6e6e73]",
						children: post.kicker
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto mt-8 max-w-4xl px-4 sm:px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-hidden rounded-3xl border border-black/[0.06] bg-[#f5f5f7] shadow-xs",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaImage, {
						src: post.image,
						alt: post.imageAlt,
						className: "aspect-16/9 w-full object-cover"
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-3xl px-4 py-12 sm:px-6",
				children: [
					post.body.map((block, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-8 first:mt-0",
						children: [block.heading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xl font-semibold tracking-tight text-[#1d1d1f] sm:text-2xl",
							children: block.heading
						}) : null, block.paragraphs.map((paragraph) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm sm:text-base leading-relaxed text-[#48484a]",
							children: paragraph
						}, paragraph.slice(0, 40)))]
					}, index)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-14 flex flex-col gap-4 rounded-3xl border border-black/[0.06] bg-[#f5f5f7] p-6 sm:p-8 sm:flex-row sm:items-center sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold text-[#1d1d1f]",
							children: "Need this plant specified for your site?"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-[#86868b] mt-0.5",
							children: "Discuss tonnages, freight, and operator requirements with Cranborne engineers."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: whatsappUrl(`Hello Omnicore — I read “${post.title}” and need a machinery quote.`),
							className: "inline-flex shrink-0 items-center justify-center gap-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppBadge, { label: "WhatsApp Consultation" })
						})]
					}),
					more.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-16 pt-10 border-t border-black/[0.06]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-base font-semibold text-[#1d1d1f] mb-6",
							children: "More field guides"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: more.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/insights/$slug",
								params: { slug: item.slug },
								className: "group rounded-3xl border border-black/[0.06] bg-white p-5 shadow-2xs hover:border-black/[0.12] hover:shadow-xs transition-all",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] font-semibold text-[#86868b] uppercase tracking-wider",
									children: item.category
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "mt-1 text-sm font-semibold text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors",
									children: item.title
								})]
							}, item.slug))
						})]
					}) : null
				]
			})
		]
	});
}
//#endregion
export { InsightPage as component };
