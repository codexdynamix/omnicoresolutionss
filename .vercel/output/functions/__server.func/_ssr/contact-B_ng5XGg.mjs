import { u as site } from "./site-NmzgmCl5.mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { B as Clock, T as MapPin, V as CircleCheck, X as ArrowUpRight } from "../_libs/lucide-react.mjs";
import { C as GoogleMapsBadge, E as WhatsAppIcon, S as GmailBadge, T as WhatsAppBadge, b as useSiteCopy, w as PhoneBadge } from "./router-DUSCuKUA.mjs";
import { t as QuoteForm } from "./quote-form-svz-Cv7a.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-B_ng5XGg.js
var import_jsx_runtime = require_jsx_runtime();
function ContactPage() {
	const copy = useSiteCopy();
	const phoneDisplay = copy.primaryPhone || site.phoneDisplay;
	const phoneTel = copy.primaryPhoneTel || site.phoneTel;
	const phoneAltDisplay = copy.secondaryPhone || site.phoneAltDisplay;
	const phoneAltTel = copy.secondaryPhoneTel || site.phoneAltTel;
	const email = copy.email || site.email;
	const whatsappNum = copy.whatsappNumber || site.whatsappNumber;
	const whatsappMsg = copy.whatsappMessage || "Hello Omnicore Harare Desk — I would like an equipment quote.";
	const mapsUrl = copy.googleMapsUrl || site.address.maps;
	const addressLine1 = copy.yardAddressLine1 || site.address.line1;
	const addressLine2 = copy.yardAddressLine2 || site.address.line2;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs font-semibold tracking-wider text-[#86868b] uppercase",
						children: ["Harare Desk & Yard · ", addressLine2]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-3xl font-semibold tracking-tight text-[#1d1d1f] sm:text-5xl",
						children: "Contact our engineers."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 max-w-2xl text-sm leading-relaxed text-[#6e6e73]",
						children: [
							addressLine1,
							", ",
							addressLine2,
							". Direct WhatsApp, voice calling, and email lines. We provide firm price and hire availability for sites across Zimbabwe."
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: `https://wa.me/${whatsappNum}?text=${encodeURIComponent(whatsappMsg)}`,
						className: "group flex flex-col justify-between rounded-3xl bg-white p-6 border border-black/[0.06] shadow-xs transition-all duration-300 hover:border-black/[0.12] hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] hover:-translate-y-0.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppBadge, { label: "WhatsApp" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-4 text-[#86868b] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#1d1d1f]" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-sm font-semibold text-[#1d1d1f]",
								children: phoneDisplay
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-xs text-[#86868b] leading-relaxed",
								children: ["Instant quotes, plant photos & voice notes. ", copy.responseSLA || "Average reply: <15 mins."]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 pt-3 border-t border-black/[0.04] text-[11px] font-medium text-[#1d1d1f]",
							children: "Open WhatsApp Chat →"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: `tel:${phoneAltTel}`,
						className: "group flex flex-col justify-between rounded-3xl bg-white p-6 border border-black/[0.06] shadow-xs transition-all duration-300 hover:border-black/[0.12] hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] hover:-translate-y-0.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhoneBadge, { label: "Voice Calling" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-4 text-[#86868b] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#1d1d1f]" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-sm font-semibold text-[#1d1d1f]",
								children: phoneAltDisplay
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-[#86868b] leading-relaxed",
								children: "Urgent yard dispatch line, operator bookings & driver coordination."
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 pt-3 border-t border-black/[0.04] text-[11px] font-medium text-[#1d1d1f]",
							children: "Call Cranborne Desk →"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: `mailto:${email}`,
						className: "group flex flex-col justify-between rounded-3xl bg-white p-6 border border-black/[0.06] shadow-xs transition-all duration-300 hover:border-black/[0.12] hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] hover:-translate-y-0.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GmailBadge, { label: "Official Email" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-4 text-[#86868b] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#1d1d1f]" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-sm font-semibold text-[#1d1d1f] truncate",
								children: email
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-[#86868b] leading-relaxed",
								children: "Company pro-forma invoices, tender documents and equipment specifications."
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 pt-3 border-t border-black/[0.04] text-[11px] font-medium text-[#1d1d1f]",
							children: "Send Official Email →"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: mapsUrl,
						target: "_blank",
						rel: "noopener noreferrer",
						className: "group flex flex-col justify-between rounded-3xl bg-white p-6 border border-black/[0.06] shadow-xs transition-all duration-300 hover:border-black/[0.12] hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] hover:-translate-y-0.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoogleMapsBadge, { label: "Google Maps" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-4 text-[#86868b] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#1d1d1f]" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-sm font-semibold text-[#1d1d1f]",
								children: addressLine1
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-xs text-[#86868b] leading-relaxed",
								children: [addressLine2, ". Easy lowbed and flatbed truck loading access."]
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 pt-3 border-t border-black/[0.04] text-[11px] font-medium text-[#1d1d1f]",
							children: "Open Map Pin →"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 rounded-3xl bg-[#f5f5f7] p-6 border border-black/[0.06]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex size-9 items-center justify-center rounded-full bg-white text-[#1d1d1f] shadow-2xs",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold text-[#1d1d1f]",
							children: "Yard & Demonstration Hours"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-[#86868b]",
							children: "Open for physical machine inspection & loading"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2 text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-full bg-white px-3.5 py-1 text-xs text-[#1d1d1f] border border-black/[0.06]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[#86868b] mr-1.5",
									children: "Mon – Fri:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium",
									children: copy.hoursWeekday || "08:00 – 17:00"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-full bg-white px-3.5 py-1 text-xs text-[#1d1d1f] border border-black/[0.06]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[#86868b] mr-1.5",
									children: "Saturday:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium",
									children: copy.hoursSaturday || "08:00 – 13:00"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-full bg-white px-3.5 py-1 text-xs text-[#1d1d1f] border border-black/[0.06]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[#86868b] mr-1.5",
									children: "Sunday:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium",
									children: copy.hoursSunday || "Closed · WhatsApp monitored"
								})]
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 grid gap-8 lg:grid-cols-2 lg:items-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuoteForm, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl bg-white p-6 sm:p-8 border border-black/[0.06] shadow-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5 rounded-full bg-black/[0.04] px-3 py-1 text-xs font-medium text-[#1d1d1f]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3.5 text-[#0071e3]" }), "Harare Physical Yard"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: mapsUrl,
								target: "_blank",
								rel: "noopener noreferrer",
								className: "inline-flex items-center gap-1 text-xs font-medium text-[#0071e3] hover:underline",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Google Maps Pin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-3.5" })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-4 text-xl font-semibold tracking-tight text-[#1d1d1f]",
							children: "Visiting the Cranborne Yard."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs sm:text-sm leading-relaxed text-[#6e6e73]",
							children: copy.yardDirectionsNote || "Along Chiremba Road, close to major Harare arterial routes. Heavy machinery can be inspected, demonstrated, and loaded onto lowbeds directly from our yard."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 space-y-2.5 rounded-2xl bg-[#f5f5f7] p-4 text-xs text-[#1d1d1f]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 shrink-0 text-emerald-600 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Crane & Overhead Loading:" }), " Industrial rigging available on-site for secure truck loading."] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 shrink-0 text-emerald-600 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Live Machinery Run-Up:" }), " Testing of diesel engines, jaw crushers, and pumps before release."] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 shrink-0 text-emerald-600 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Nationwide Waybills:" }), " Cross-country delivery arranged to Bulawayo, Gweru, Mutare, Kadoma, and mining claims."] })]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex flex-wrap gap-2.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: mapsUrl,
									target: "_blank",
									rel: "noopener noreferrer",
									className: "inline-flex h-10 items-center justify-center gap-1.5 rounded-full bg-[#1d1d1f] px-5 text-xs font-medium text-white shadow-xs hover:bg-[#333336] transition-colors",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Get Directions" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-3" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: `tel:${phoneTel}`,
									className: "inline-flex h-10 items-center justify-center gap-1.5 rounded-full border border-black/[0.1] bg-white px-4 text-xs font-medium text-[#1d1d1f] shadow-2xs hover:bg-[#f5f5f7] transition-colors",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Call: ", phoneDisplay] })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: `https://wa.me/${whatsappNum}?text=${encodeURIComponent("Hello! I am planning to visit the Cranborne yard today.")}`,
									className: "inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#1fa855] px-5 text-xs font-semibold text-white shadow-[0_4px_14px_rgba(31,168,85,0.25)] hover:bg-[#1b934b] transition-all active:scale-95",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppIcon, { className: "size-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Notify Yard on WhatsApp" })]
								})
							]
						})
					]
				})]
			})
		]
	});
}
//#endregion
export { ContactPage as component };
