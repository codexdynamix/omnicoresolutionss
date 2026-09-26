import { i as __toESM } from "../_runtime.mjs";
import { d as whatsappUrl, l as services, n as equipment, u as site } from "./site-NmzgmCl5.mjs";
import { c as require_jsx_runtime, l as require_react } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { Z as ArrowRight, f as ShieldCheck, i as Wrench, s as Truck, v as PhoneCall } from "../_libs/lucide-react.mjs";
import { E as WhatsAppIcon, d as getStoredSiteCopy, l as getStoredEquipment } from "./router-DUSCuKUA.mjs";
import { t as MediaImage } from "./media-image-BLH74n9U.mjs";
import { t as EquipmentCard } from "./equipment-card-B3WznzuQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CEtBrnS_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var featuredIds = [
	"jaw-crusher",
	"excavator-hire",
	"concrete-pump",
	"electric-fence",
	"farm-hammer-mill",
	"ball-mill"
];
function Home() {
	const [copy, setCopy] = (0, import_react.useState)(getStoredSiteCopy);
	const [equipmentList, setEquipmentList] = (0, import_react.useState)(getStoredEquipment);
	(0, import_react.useEffect)(() => {
		function onUpdate() {
			setCopy(getStoredSiteCopy());
			setEquipmentList(getStoredEquipment());
		}
		window.addEventListener("omnicore-copy-updated", onUpdate);
		window.addEventListener("omnicore-equipment-updated", onUpdate);
		return () => {
			window.removeEventListener("omnicore-copy-updated", onUpdate);
			window.removeEventListener("omnicore-equipment-updated", onUpdate);
		};
	}, []);
	const featuredEquipment = featuredIds.map((id) => equipmentList.find((item) => item.id === id) || equipment.find((item) => item.id === id)).filter((item) => Boolean(item));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative overflow-hidden bg-paper",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
				type: "application/ld+json",
				dangerouslySetInnerHTML: { __html: JSON.stringify({
					"@context": "https://schema.org",
					"@type": "LocalBusiness",
					name: copy.name || site.name,
					description: copy.heroSubheadline || site.description,
					telephone: copy.primaryPhone || site.phoneTel,
					email: copy.email || site.email,
					address: {
						"@type": "PostalAddress",
						streetAddress: copy.yardAddressLine1 || site.address.line1,
						addressLocality: "Harare",
						addressCountry: "ZW"
					},
					url: "https://omnicoresolutions.co.zw"
				}) }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative min-h-[88vh] overflow-hidden bg-ink text-paper",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute inset-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/images/hero.jpg",
							alt: "Omnicore yard: jaw crusher, self-loading mixer and boom pump on Zimbabwe laterite",
							className: "size-full object-cover object-center"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-r from-ink/82 via-ink/55 to-ink/25" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink/70 to-transparent" })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-end px-4 pb-16 pt-28 sm:px-6 sm:pb-20",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "inline-flex w-fit items-center gap-2 rounded-full border border-paper/15 bg-ink/40 px-3.5 py-1.5 text-xs font-medium text-paper/90 backdrop-blur-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-whatsapp" }), copy.heroBadge || "Cranborne yard · 115 Chiremba Road, Harare"]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-paper sm:text-6xl lg:text-7xl",
							children: copy.heroHeadline || "Plant for Zimbabwe’s mines, farms and pours."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 max-w-xl text-base leading-relaxed text-paper/80 sm:text-lg",
							children: copy.heroSubheadline || "Gold circuits, fence plant, self-loading mixers, excavators and farm mills — specified in Harare, delivered nationwide, commissioned on the ground."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-wrap items-center gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: `https://wa.me/${copy.whatsappNumber || site.whatsappNumber}?text=${encodeURIComponent(copy.whatsappMessage || "Hello Omnicore Harare Desk — I need a fast quote for machinery.")}`,
									className: "inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-whatsapp px-6 text-sm font-semibold text-paper transition-transform hover:brightness-110 active:scale-95",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppIcon, { className: "size-5 shrink-0" }), copy.heroCtaPrimary || "Chat on WhatsApp"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/quote",
									className: "inline-flex h-12 items-center justify-center gap-2 rounded-full bg-paper px-6 text-sm font-semibold text-ink transition-transform hover:bg-card active:scale-95",
									children: [copy.heroCtaSecondary || "Request a firm quote", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/catalogue",
									className: "inline-flex h-12 items-center justify-center rounded-full border border-paper/25 px-5 text-sm font-medium text-paper/90 hover:bg-paper/10",
									children: copy.heroCtaTertiary || "Open the catalogue"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4",
							children: [
								{
									label: copy.stat1Label || "Harare hub",
									detail: copy.stat1Detail || "Cranborne yard"
								},
								{
									label: copy.stat2Label || "1–25 TPH",
									detail: copy.stat2Detail || "Gold circuits"
								},
								{
									label: copy.stat3Label || "Wet & dry",
									detail: copy.stat3Detail || "Plant hire"
								},
								{
									label: copy.stat4Label || "10 provinces",
									detail: copy.stat4Detail || "Lowbed delivery"
								}
							].map((stat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-t border-paper/20 pt-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-semibold text-paper",
									children: stat.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-paper/65",
									children: stat.detail
								})]
							}, stat.label))
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-t border-border bg-paper py-16 sm:py-24",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl px-4 sm:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
							children: "Five worlds of plant"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-1 text-2xl font-semibold tracking-tight text-foreground sm:text-4xl",
							children: "Not one yellow truck. Five different jobs."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/services",
							className: "inline-flex items-center text-sm font-medium text-accent hover:underline",
							children: ["All divisions", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-1 size-3.5" })]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-10 grid gap-4 md:grid-cols-12",
						children: services.map((service, index) => {
							const span = index === 0 ? "md:col-span-7 md:row-span-2 min-h-[320px] md:min-h-[540px]" : index === 1 || index === 2 ? "md:col-span-5 min-h-[240px] md:min-h-[260px]" : "md:col-span-6 min-h-[220px] md:min-h-[260px]";
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/services/$slug",
								params: { slug: service.slug },
								className: `group relative overflow-hidden rounded-3xl ${span}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "photo-frame absolute inset-0",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaImage, {
											src: service.image,
											alt: service.imageAlt,
											framed: false
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-transparent" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "absolute inset-x-0 bottom-0 p-5 sm:p-7",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-[11px] font-semibold uppercase tracking-wider text-paper/70",
												children: service.eyebrow
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "mt-1 text-xl font-semibold text-paper sm:text-2xl",
												children: service.title
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-2 max-w-md text-xs leading-relaxed text-paper/80 sm:text-sm",
												children: service.headline
											})
										]
									})
								]
							}, service.slug);
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-t border-border bg-secondary/50 py-16 sm:py-24",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl px-4 sm:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
							children: "From the Cranborne yard"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-1 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl",
							children: "A catalogue that actually looks like the machines."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/catalogue",
							className: "inline-flex items-center text-sm font-medium text-accent hover:underline",
							children: ["Full stock list", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-1 size-3.5" })]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3",
						children: featuredEquipment.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EquipmentCard, { item }, item.id))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-t border-border bg-paper py-16 sm:py-24",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl px-4 sm:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-2xl text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
								children: "The Cranborne standard"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-1 text-2xl font-semibold tracking-tight text-foreground sm:text-4xl",
								children: "Engineered for Zimbabwe conditions."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm leading-relaxed text-muted-foreground",
								children: "We do not drop crates at the border. Omnicore delivers tested plant configured for local ores, power grids, and haul roads."
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-12 grid gap-6 sm:grid-cols-3",
						children: [
							{
								icon: ShieldCheck,
								title: "Pre-delivery testing",
								body: "Jaw crushers, mills, slurry pumps and generators are run up in Cranborne before they leave the yard."
							},
							{
								icon: Wrench,
								title: "On-site commissioning",
								body: "Staff travel with the plant for anchoring, alignment, electrics and the first-tonne run-up."
							},
							{
								icon: Truck,
								title: "Provincial logistics",
								body: "Lowbed and flatbed from Harare to Bulawayo, Kadoma, Gweru, Kwekwe, Mutare, Chinhoyi and remote claims."
							}
						].map((pillar) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-3xl border border-border bg-card p-8",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex size-11 items-center justify-center rounded-2xl bg-accent/10 text-accent",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(pillar.icon, { className: "size-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-5 text-base font-semibold text-foreground",
									children: pillar.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm leading-relaxed text-muted-foreground",
									children: pillar.body
								})
							]
						}, pillar.title))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-t border-border bg-ink py-16 text-paper sm:py-20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl px-4 sm:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto max-w-2xl text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold uppercase tracking-wider text-paper/55",
							children: "Nationwide footprint"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-1 text-2xl font-semibold tracking-tight sm:text-3xl",
							children: "Active machinery across Zimbabwe."
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
						children: [
							{
								city: "Midlands",
								focus: "Kwekwe · Gweru · Shurugwi",
								desc: "Gold milling circuits and trommel plants."
							},
							{
								city: "Mashonaland West",
								focus: "Kadoma · Chinhoyi",
								desc: "Hammer mills, jaw crushers and excavators."
							},
							{
								city: "Matabeleland",
								focus: "Bulawayo · Gwanda",
								desc: "Winches and high-tonnage ball mills."
							},
							{
								city: "Harare & surrounds",
								focus: "Cranborne · Msasa · Ruwa",
								desc: "Hire, fence machines and mixers."
							}
						].map((hub) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-paper/10 bg-paper/5 p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "text-sm font-semibold",
										children: hub.city
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-whatsapp" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs font-medium text-paper/70",
									children: hub.focus
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-xs leading-relaxed text-paper/55",
									children: hub.desc
								})
							]
						}, hub.city))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-t border-border bg-paper py-20",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-4xl px-4 text-center sm:px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-block rounded-full bg-whatsapp/12 px-4 py-1 text-xs font-semibold text-whatsapp",
							children: "Fast turnaround · Direct Harare support"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl",
							children: "Need specs, hire dates, or a firm quote?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base",
							children: "The Cranborne desk answers on WhatsApp with stock photos of the actual machine, pro-forma invoices, and freight."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-wrap items-center justify-center gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: whatsappUrl("Hello Omnicore Harare Desk — I need a fast quote."),
									className: "inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-whatsapp px-7 text-sm font-semibold text-paper hover:brightness-110",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppIcon, { className: "size-5 shrink-0" }), "WhatsApp Harare Desk"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/quote",
									className: "inline-flex h-12 items-center justify-center rounded-full bg-ink px-7 text-sm font-semibold text-paper hover:bg-foreground",
									children: "Request tender / pro-forma"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: `tel:${site.phoneTel}`,
									className: "inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-card px-6 text-sm font-medium text-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhoneCall, { className: "size-4 text-accent" }), site.phoneDisplay]
								})
							]
						})
					]
				})
			})
		]
	});
}
//#endregion
export { Home as component };
