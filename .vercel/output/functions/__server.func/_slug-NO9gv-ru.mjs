import { a as hireRates, d as whatsappUrl, n as equipment, t as cn } from "./_ssr/site-NmzgmCl5.mjs";
import { a as Trigger2, c as require_jsx_runtime, i as Root2, n as Header, r as Item, t as Content2 } from "./_libs/@radix-ui/react-accordion+[...].mjs";
import { b as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { V as CircleCheck, Z as ArrowRight, q as ChevronDown } from "./_libs/lucide-react.mjs";
import { E as WhatsAppIcon, n as Route } from "./_ssr/router-DUSCuKUA.mjs";
import { t as MediaImage } from "./_ssr/media-image-BLH74n9U.mjs";
import { t as EquipmentCard } from "./_ssr/equipment-card-B3WznzuQ.mjs";
import { t as QuoteForm } from "./_ssr/quote-form-svz-Cv7a.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-NO9gv-ru.js
var import_jsx_runtime = require_jsx_runtime();
function Accordion({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root2, {
		className: cn("w-full", className),
		...props
	});
}
function AccordionItem({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
		className: cn("border-b border-border", className),
		...props
	});
}
function AccordionTrigger({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
		className: "flex",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Trigger2, {
			className: cn("flex flex-1 items-center justify-between gap-4 py-5 text-left text-base font-medium transition-colors hover:text-muted-foreground [&[data-state=open]>svg]:rotate-180", className),
			...props,
			children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-4 shrink-0 text-muted-foreground transition-transform duration-200" })]
		})
	});
}
function AccordionContent({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
		className: "overflow-hidden text-sm text-muted-foreground data-[state=closed]:animate-none",
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("pb-5 leading-relaxed", className),
			children
		})
	});
}
function ServicePage() {
	const { service } = Route.useLoaderData();
	const related = equipment.filter((item) => item.category === service.slug);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "pb-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 sm:py-20 lg:grid-cols-2 lg:items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-block rounded-full bg-black/[0.04] px-3.5 py-1 text-xs font-medium text-[#1d1d1f]",
						children: [service.eyebrow, " · Cranborne Desk"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-4 text-3xl font-semibold tracking-tight text-[#1d1d1f] sm:text-5xl",
						children: service.headline
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-base leading-relaxed text-[#6e6e73]",
						children: service.summary
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-col gap-3 sm:flex-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/quote",
							className: "inline-flex h-11 items-center justify-center rounded-full bg-[#1d1d1f] px-6 text-xs font-medium text-white shadow-xs hover:bg-[#333336] transition-all",
							children: "Get Firm Quote"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: whatsappUrl(`Hello Omnicore Harare Desk, I need a direct quote for ${service.title}.`),
							className: "inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#1fa855] px-5 text-xs font-semibold text-white shadow-[0_4px_14px_rgba(31,168,85,0.25)] transition-all hover:bg-[#1b934b] active:scale-95",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppIcon, { className: "size-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Chat on WhatsApp" })]
						})]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-hidden rounded-3xl border border-black/[0.06] bg-[#f5f5f7] shadow-xs",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaImage, {
						src: service.image,
						alt: service.imageAlt,
						className: "aspect-16/10 w-full object-cover"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto max-w-6xl px-4 py-8 sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-xs font-semibold tracking-wider text-[#86868b] uppercase mb-4",
					children: "Field Capabilities & Zimbabwe Standards"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3 sm:grid-cols-2",
					children: service.bullets.map((bullet) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-3 rounded-2xl border border-black/[0.06] bg-white p-5 transition-all",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 shrink-0 text-emerald-600 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs sm:text-sm text-[#1d1d1f] leading-relaxed",
							children: bullet
						})]
					}, bullet))
				})]
			}),
			service.slug === "hire" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto max-w-6xl px-4 py-12 sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold tracking-wider text-[#86868b] uppercase",
						children: "Plant Hire Rate Card"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-semibold tracking-tight text-[#1d1d1f] sm:text-3xl",
						children: "Wet and dry hire, firm transparency."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: whatsappUrl("Hello Omnicore, I want to book equipment hire."),
						className: "inline-flex items-center gap-1.5 text-xs font-medium text-[#0071e3] hover:underline",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Book dates on WhatsApp" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3" })]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 overflow-hidden rounded-3xl border border-black/[0.06] bg-white shadow-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden grid-cols-4 gap-4 border-b border-black/[0.06] bg-[#f5f5f7] px-6 py-3.5 text-xs font-semibold text-[#1d1d1f] uppercase tracking-wider md:grid",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Machinery Model" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Capacity / Output" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Wet Hire Rate" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Dry Hire Rate" })
						]
					}), hireRates.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1 border-b border-black/[0.04] px-6 py-4 transition-colors hover:bg-black/[0.02] last:border-0 md:grid-cols-4 md:gap-4 md:items-center text-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold text-[#1d1d1f]",
								children: row.machine
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[#6e6e73]",
								children: row.output
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "font-medium text-[#1d1d1f]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "md:hidden text-[#86868b] mr-1",
									children: "Wet:"
								}), row.wet]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-[#6e6e73]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "md:hidden text-[#86868b] mr-1",
									children: "Dry:"
								}), row.dry]
							})
						]
					}, row.machine))]
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto max-w-6xl px-4 py-12 sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl font-semibold tracking-tight text-[#1d1d1f] sm:text-3xl",
					children: "Machinery in this division"
				}), related.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
					children: related.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EquipmentCard, { item }, item.id))
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto max-w-6xl px-4 py-8 sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl font-semibold tracking-tight text-[#1d1d1f] sm:text-3xl",
					children: "Frequently asked questions"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
					type: "single",
					collapsible: true,
					className: "mt-4 rounded-3xl border border-black/[0.06] bg-white p-4 shadow-xs",
					children: service.faqs.map((faq) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
						value: faq.q,
						className: "border-b border-black/[0.04] last:border-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
							className: "text-sm font-semibold text-[#1d1d1f] hover:text-[#0071e3] py-4",
							children: faq.q
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, {
							className: "text-xs sm:text-sm text-[#6e6e73] leading-relaxed pb-4",
							children: faq.a
						})]
					}, faq.q))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mx-auto max-w-3xl px-4 py-12 sm:px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuoteForm, { defaultService: service.title })
			})
		]
	});
}
//#endregion
export { ServicePage as component };
