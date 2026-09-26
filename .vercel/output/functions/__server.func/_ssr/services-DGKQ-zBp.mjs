import { d as whatsappUrl, l as services } from "./site-NmzgmCl5.mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { V as CircleCheck, Z as ArrowRight } from "../_libs/lucide-react.mjs";
import { T as WhatsAppBadge } from "./router-DUSCuKUA.mjs";
import { t as MediaImage } from "./media-image-BLH74n9U.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/services-DGKQ-zBp.js
var import_jsx_runtime = require_jsx_runtime();
function ServicesIndex() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold tracking-wider text-[#86868b] uppercase",
					children: "Divisions · Harare Cranborne Desk"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl font-semibold tracking-tight text-[#1d1d1f] sm:text-5xl",
					children: "Five divisions. One engineering desk."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 max-w-2xl text-sm leading-relaxed text-[#6e6e73]",
					children: "Mining circuits, construction plant hire, hardware supplies, commercial farming equipment and industrial production machinery — engineered for Zimbabwe, quoted from Cranborne, dispatched nationwide."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-12 grid gap-8",
			children: services.map((service) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "group grid overflow-hidden rounded-3xl border border-black/[0.06] bg-white shadow-xs transition-all duration-300 hover:border-black/[0.12] hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] md:grid-cols-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative aspect-16/10 md:aspect-auto md:col-span-5 overflow-hidden bg-[#f5f5f7] min-h-[260px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaImage, {
						src: service.image,
						alt: service.imageAlt,
						className: "h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute top-4 left-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-block rounded-full bg-white/85 backdrop-blur-md px-3 py-1 text-[11px] font-medium text-[#1d1d1f] border border-black/[0.06]",
							children: service.eyebrow
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col justify-between p-6 sm:p-8 md:col-span-7",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/services/$slug",
							params: { slug: service.slug },
							className: "inline-block",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-2xl font-semibold tracking-tight text-[#1d1d1f] hover:text-[#0071e3] transition-colors",
								children: service.title
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs sm:text-sm leading-relaxed text-[#6e6e73]",
							children: service.summary
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 flex flex-wrap gap-2 text-xs text-[#86868b]",
							children: service.bullets?.slice(0, 3).map((hl) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5 rounded-full bg-[#f5f5f7] px-3 py-1 text-[11px] font-medium text-[#1d1d1f]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3 text-emerald-600" }), hl]
							}, hl))
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 pt-4 border-t border-black/[0.04] flex flex-wrap items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/services/$slug",
							params: { slug: service.slug },
							className: "inline-flex items-center text-xs font-medium text-[#0071e3] hover:underline",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Explore machinery line" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3 ml-1" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: whatsappUrl(`Hello Omnicore, I am interested in ${service.title}. What is your current availability and pricing?`),
							className: "inline-flex items-center gap-1.5",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppBadge, {
								compact: true,
								label: "Inquire on WhatsApp"
							})
						})]
					})]
				})]
			}, service.slug))
		})]
	});
}
//#endregion
export { ServicesIndex as component };
