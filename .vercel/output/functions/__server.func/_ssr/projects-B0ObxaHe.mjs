import { c as projects, d as whatsappUrl } from "./site-NmzgmCl5.mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { T as MapPin } from "../_libs/lucide-react.mjs";
import { T as WhatsAppBadge } from "./router-DUSCuKUA.mjs";
import { t as MediaImage } from "./media-image-BLH74n9U.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/projects-B0ObxaHe.js
var import_jsx_runtime = require_jsx_runtime();
function ProjectsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold tracking-wider text-[#86868b] uppercase",
					children: "Field Deployments · Zimbabwe"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl font-semibold tracking-tight text-[#1d1d1f] sm:text-5xl",
					children: "Machinery on the job."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 max-w-2xl text-sm leading-relaxed text-[#6e6e73]",
					children: "Active sites, mining claims, and commercial facilities equipped and supported by Omnicore Solutions from Cranborne, Harare."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-12 grid gap-6 md:grid-cols-2",
			children: projects.map((project) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "group flex flex-col overflow-hidden rounded-3xl border border-black/[0.06] bg-white shadow-xs transition-all duration-300 hover:border-black/[0.12] hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative aspect-16/10 overflow-hidden bg-[#f5f5f7]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaImage, {
						src: project.image,
						alt: project.imageAlt,
						className: "h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute top-4 left-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1 rounded-full bg-white/85 backdrop-blur-md px-3 py-1 text-xs font-medium text-[#1d1d1f] border border-black/[0.06]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3 text-[#0071e3]" }), project.location]
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-1 flex-col p-6 sm:p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[11px] font-semibold uppercase tracking-wider text-[#86868b]",
							children: project.sector
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-1.5 text-xl font-semibold tracking-tight text-[#1d1d1f]",
							children: project.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 flex-1 text-xs sm:text-sm leading-relaxed text-[#6e6e73]",
							children: project.body
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 pt-4 border-t border-black/[0.04] flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-[#86868b]",
								children: "Zimbabwe Commissioned"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: whatsappUrl(`Hello Omnicore, I saw the project "${project.title}" and would like a similar machinery setup.`),
								className: "inline-flex items-center gap-1.5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppBadge, {
									compact: true,
									label: "Inquire Similar Setup"
								})
							})]
						})
					]
				})]
			}, project.id))
		})]
	});
}
//#endregion
export { ProjectsPage as component };
