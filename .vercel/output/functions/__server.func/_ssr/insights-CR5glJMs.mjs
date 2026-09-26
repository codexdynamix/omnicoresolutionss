import { o as insights } from "./site-NmzgmCl5.mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { Z as ArrowRight } from "../_libs/lucide-react.mjs";
import { t as MediaImage } from "./media-image-BLH74n9U.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/insights-CR5glJMs.js
var import_jsx_runtime = require_jsx_runtime();
function InsightsIndex() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold tracking-wider text-[#86868b] uppercase",
					children: "Field Economics & Guides · Cranborne Desk"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl font-semibold tracking-tight text-[#1d1d1f] sm:text-5xl",
					children: "ROI, uptime and field economics."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 max-w-2xl text-sm leading-relaxed text-[#6e6e73]",
					children: "How to evaluate wet vs dry plant hire, calculate hammer mill milling payback, and prepare mining claims before the Zimbabwean rainy season."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-12 grid gap-6 md:grid-cols-2",
			children: insights.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/insights/$slug",
				params: { slug: post.slug },
				className: "group flex flex-col overflow-hidden rounded-3xl border border-black/[0.06] bg-white shadow-xs transition-all duration-300 hover:border-black/[0.12] hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative aspect-16/10 overflow-hidden bg-[#f5f5f7]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaImage, {
						src: post.image,
						alt: post.imageAlt,
						className: "h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute top-4 left-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-block rounded-full bg-white/85 backdrop-blur-md px-3 py-1 text-xs font-medium text-[#1d1d1f] border border-black/[0.06]",
							children: post.category
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-1 flex-col p-6 sm:p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-xs text-[#86868b]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: post.read }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: post.date })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 text-xl font-semibold tracking-tight text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors",
							children: post.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 flex-1 text-xs sm:text-sm leading-relaxed text-[#6e6e73]",
							children: post.description
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 pt-4 border-t border-black/[0.04] flex items-center text-xs font-medium text-[#1d1d1f] group-hover:text-[#0071e3]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Read technical guide" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5 ml-1 transition-transform group-hover:translate-x-0.5" })]
						})
					]
				})]
			}, post.slug))
		})]
	});
}
//#endregion
export { InsightsIndex as component };
