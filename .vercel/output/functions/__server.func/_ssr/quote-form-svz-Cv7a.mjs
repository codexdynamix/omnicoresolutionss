import { i as __toESM } from "../_runtime.mjs";
import { d as whatsappUrl, l as services, t as cn } from "./site-NmzgmCl5.mjs";
import { c as require_jsx_runtime, l as require_react } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { J as Check } from "../_libs/lucide-react.mjs";
import { E as WhatsAppIcon, T as WhatsAppBadge, o as addInboundLeadToCRM } from "./router-DUSCuKUA.mjs";
import { t as Input } from "./input-Dzoi6vCo.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/quote-form-svz-Cv7a.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
		className: cn("text-sm font-medium text-foreground", className),
		...props
	});
}
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-32 w-full rounded-xl bg-card px-3.5 py-3 text-sm text-foreground shadow-[0_0_0_1px_rgba(0,0,0,0.08)] transition-[box-shadow] duration-150 placeholder:text-muted-foreground focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_var(--color-background),0_0_0_4px_var(--color-ring)] disabled:cursor-not-allowed disabled:opacity-50", className),
		...props
	});
}
var intents = [
	"Buy",
	"Hire",
	"Both",
	"General"
];
function QuoteForm({ defaultService = "" }) {
	const [sent, setSent] = (0, import_react.useState)(false);
	const [waUrl, setWaUrl] = (0, import_react.useState)("");
	const [selectedIntent, setSelectedIntent] = (0, import_react.useState)("Buy");
	const [selectedService, setSelectedService] = (0, import_react.useState)(defaultService);
	function onSubmit(event) {
		event.preventDefault();
		const form = new FormData(event.currentTarget);
		const payload = {
			name: String(form.get("name") ?? "").trim(),
			phone: String(form.get("phone") ?? "").trim(),
			email: String(form.get("email") ?? "").trim(),
			service: selectedService || String(form.get("service") ?? "").trim(),
			intent: selectedIntent,
			message: String(form.get("message") ?? "").trim(),
			location: String(form.get("location") ?? "").trim(),
			at: (/* @__PURE__ */ new Date()).toISOString()
		};
		try {
			localStorage.setItem("omnicore-last-quote", JSON.stringify(payload));
			addInboundLeadToCRM({
				name: payload.name,
				phone: payload.phone,
				email: payload.email,
				service: payload.service,
				intent: payload.intent,
				message: payload.message,
				location: payload.location
			});
		} catch {}
		const text = [
			`Hello Omnicore Harare Desk, I need a machinery quote.`,
			`Name: ${payload.name || "Client"}.`,
			`Requirement: ${payload.intent}.`,
			payload.service ? `Category: ${payload.service}.` : "",
			payload.location ? `Site/Location: ${payload.location}.` : "",
			payload.message ? `Details: ${payload.message}.` : "",
			payload.phone ? `Phone: ${payload.phone}` : "",
			payload.email ? `Email: ${payload.email}` : ""
		].filter(Boolean).join("\n");
		const url = whatsappUrl(text);
		setWaUrl(url);
		setSent(true);
	}
	if (sent) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-3xl bg-white p-8 sm:p-10 border border-black/[0.06] shadow-xs text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto flex size-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-5" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-4 text-xl font-semibold tracking-tight text-[#1d1d1f]",
				children: "Ready to send on WhatsApp"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs sm:text-sm leading-relaxed text-[#6e6e73]",
				children: "Your machinery requirement is compiled. Launch WhatsApp to chat directly with our Cranborne engineering staff."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex flex-col gap-2.5 max-w-xs mx-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: waUrl,
					className: "flex items-center justify-center gap-2 rounded-full bg-[#1fa855] py-3 text-xs sm:text-sm font-semibold text-white shadow-[0_4px_14px_rgba(31,168,85,0.25)] hover:bg-[#1b934b] transition-all active:scale-95",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppIcon, { className: "size-5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Launch WhatsApp Desk" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setSent(false),
					className: "text-xs text-[#86868b] hover:text-[#1d1d1f] transition-colors py-1",
					children: "← Edit details"
				})]
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit,
		className: "flex flex-col rounded-3xl bg-white p-6 sm:p-10 border border-black/[0.06] shadow-xs",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-semibold tracking-tight text-[#1d1d1f]",
					children: "Request equipment pricing"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-0.5 text-xs text-[#86868b]",
					children: "Direct quote from Harare desk with stock status & rates."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppBadge, {
					compact: true,
					label: "Live Desk"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "quote-name",
								className: "text-xs font-medium text-[#1d1d1f]",
								children: "Name / Company *"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "quote-name",
								name: "name",
								required: true,
								placeholder: "e.g. Tendai Moyo",
								className: "h-10 rounded-xl text-xs bg-[#fbfbfd] border-black/[0.08] focus:border-[#0071e3]"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "quote-phone",
								className: "text-xs font-medium text-[#1d1d1f]",
								children: "WhatsApp Phone *"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "quote-phone",
								name: "phone",
								type: "tel",
								required: true,
								placeholder: "+263 7...",
								className: "h-10 rounded-xl text-xs bg-[#fbfbfd] border-black/[0.08] focus:border-[#0071e3]"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							className: "text-xs font-medium text-[#1d1d1f]",
							children: "Inquiry Type"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-4 gap-1 p-1 rounded-full bg-black/[0.04]",
							children: intents.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setSelectedIntent(item),
								className: `h-8 rounded-full text-xs font-medium transition-all ${selectedIntent === item ? "bg-white text-[#1d1d1f] shadow-2xs font-semibold" : "text-[#6e6e73] hover:text-[#1d1d1f]"}`,
								children: item
							}, item))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "quote-service",
							className: "text-xs font-medium text-[#1d1d1f]",
							children: "Machinery Category"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							id: "quote-service",
							name: "service",
							value: selectedService,
							onChange: (e) => setSelectedService(e.target.value),
							className: "flex h-10 w-full rounded-xl border border-black/[0.08] bg-[#fbfbfd] px-3 text-xs text-[#1d1d1f] focus:border-[#0071e3] focus:outline-hidden",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Select machinery category..."
							}), services.map((service) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: service.title,
								children: service.title
							}, service.slug))]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "quote-location",
							className: "text-xs font-medium text-[#1d1d1f]",
							children: "Site / Delivery Location in Zimbabwe"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "quote-location",
							name: "location",
							placeholder: "e.g. Kadoma Claim, Norton Farm, Harare Site",
							className: "h-10 rounded-xl text-xs bg-[#fbfbfd] border-black/[0.08] focus:border-[#0071e3]"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "quote-message",
							className: "text-xs font-medium text-[#1d1d1f]",
							children: "Machine Specifications / Output Requirements"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "quote-message",
							name: "message",
							rows: 3,
							placeholder: "Specify tonnage per hour, duration of hire, diesel or electric...",
							className: "rounded-xl text-xs bg-[#fbfbfd] border-black/[0.08] focus:border-[#0071e3] resize-none"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "submit",
				className: "mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#1d1d1f] text-xs font-medium text-white shadow-xs hover:bg-[#333336] transition-colors",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Format Quote on WhatsApp" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2.5 text-center text-[11px] text-[#86868b]",
				children: "Direct response from Harare technical desk during working hours."
			})
		]
	});
}
//#endregion
export { QuoteForm as t };
