import { d as whatsappUrl, u as site } from "./site-NmzgmCl5.mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { B as Clock, f as ShieldCheck, s as Truck } from "../_libs/lucide-react.mjs";
import { S as GmailBadge, T as WhatsAppBadge, w as PhoneBadge } from "./router-DUSCuKUA.mjs";
import { t as QuoteForm } from "./quote-form-svz-Cv7a.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/quote-hqI0teeO.js
var import_jsx_runtime = require_jsx_runtime();
function QuotePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-12 lg:grid-cols-2 lg:items-start",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold tracking-wider text-[#86868b] uppercase",
					children: "Harare Technical Desk"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 text-3xl font-semibold tracking-tight text-[#1d1d1f] sm:text-5xl",
					children: "Send the site details. Receive a tender rate."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm sm:text-base leading-relaxed text-[#6e6e73]",
					children: "Direct supply or hire. Wet or dry. We respond directly on WhatsApp with current Cranborne stock, freight lead-time, and a transparent rate you can defend in a project budget."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 space-y-3",
					children: [
						{
							icon: Clock,
							title: "Under 15-Minute Response",
							desc: "Direct contact with technical personnel in Cranborne during working hours."
						},
						{
							icon: ShieldCheck,
							title: "Pre-Tested Machinery",
							desc: "Every diesel engine, hydraulic circuit and mechanical drive tested before release."
						},
						{
							icon: Truck,
							title: "Freight Across All Provinces",
							desc: "Direct lowbed delivery to claims, farms, and infrastructure sites across Zimbabwe."
						}
					].map((pt) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-3.5 rounded-2xl border border-black/[0.06] bg-white p-4 transition-all",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex size-8 shrink-0 items-center justify-center rounded-full bg-[#f5f5f7] text-[#1d1d1f]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(pt.icon, { className: "size-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "text-xs font-semibold text-[#1d1d1f]",
							children: pt.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-[#86868b] mt-0.5",
							children: pt.desc
						})] })]
					}, pt.title))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 pt-6 border-t border-black/[0.04]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold text-[#1d1d1f] mb-3",
						children: "Direct Contact"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: whatsappUrl("Hello Omnicore — I need a fast quote."),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppBadge, { label: "WhatsApp +263 77 733 4569" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: `mailto:${site.email}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GmailBadge, { label: site.email })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: `tel:${site.phoneTel}`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhoneBadge, { label: "Call Desk" })
							})
						]
					})]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuoteForm, {}) })]
		})
	});
}
//#endregion
export { QuotePage as component };
