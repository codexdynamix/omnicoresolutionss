import { i as __toESM } from "../_runtime.mjs";
import { d as whatsappUrl } from "./site-NmzgmCl5.mjs";
import { c as require_jsx_runtime, l as require_react } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { M as Images, w as Maximize2 } from "../_libs/lucide-react.mjs";
import { E as WhatsAppIcon } from "./router-DUSCuKUA.mjs";
import { t as MediaImage } from "./media-image-BLH74n9U.mjs";
import { t as ProductPhotoLightbox } from "./product-photo-lightbox-9HwvvrXG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/equipment-card-B3WznzuQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function EquipmentCard({ item }) {
	const [lightboxOpen, setLightboxOpen] = (0, import_react.useState)(false);
	const message = `Hello Omnicore, I would like to inquire about the ${item.name} (${item.intent === "hire" ? "Hire" : "Purchase"}). Please provide current availability and pricing.`;
	const allPhotos = [item.image, ...item.gallery || []].filter(Boolean);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "group flex flex-col overflow-hidden rounded-3xl bg-white border border-black/[0.06] p-4 transition-all duration-300 hover:border-black/[0.12] hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] hover:-translate-y-0.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			role: "button",
			tabIndex: 0,
			onClick: () => setLightboxOpen(true),
			onKeyDown: (e) => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault();
					setLightboxOpen(true);
				}
			},
			className: "relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#f5f5f7] cursor-pointer",
			title: `Click to preview ${item.name} photo in large screen`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MediaImage, {
					src: item.image,
					alt: item.imageAlt,
					className: "h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute top-3 left-3 flex items-center gap-1.5 pointer-events-none",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full border border-black/[0.06] bg-white/80 backdrop-blur-md px-3 py-1 text-[11px] font-medium text-[#1d1d1f] shadow-2xs",
						children: item.intent === "hire" ? "Plant Hire" : "Direct Supply"
					}), item.badge ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full border border-black/[0.06] bg-white/70 backdrop-blur-md px-2.5 py-1 text-[11px] font-medium text-[#6e6e73]",
						children: item.badge
					}) : null]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute top-3 right-3 flex items-center gap-1.5",
					children: [allPhotos.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-semibold text-white backdrop-blur-md shadow-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Images, { className: "size-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: allPhotos.length })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: (e) => {
							e.stopPropagation();
							setLightboxOpen(true);
						},
						className: "flex items-center gap-1 rounded-full bg-black/60 hover:bg-black text-white px-2.5 py-1 text-[11px] font-medium backdrop-blur-md shadow-sm transition-all sm:opacity-0 sm:group-hover:opacity-100 active:scale-95 cursor-pointer",
						title: "Open full photo in large screen",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maximize2, { className: "size-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden sm:inline",
							children: "Preview"
						})]
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col pt-4 px-1 pb-1",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center justify-between text-[11px] font-medium text-[#86868b] tracking-wider uppercase",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.spec ?? item.category })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-1.5 text-[17px] font-semibold tracking-tight text-[#1d1d1f]",
					children: item.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1.5 flex-1 text-xs leading-relaxed text-[#6e6e73] line-clamp-2",
					children: item.blurb
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 pt-3 border-t border-black/[0.04] flex items-center justify-between gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] font-medium text-[#86868b] uppercase tracking-wider block",
						children: item.intent === "hire" ? "Hire Rate" : "Indicative Price"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-semibold text-[#1d1d1f]",
						children: item.price ?? item.priceNote ?? "Inquire for quote"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setLightboxOpen(true),
							className: "inline-flex items-center gap-1 rounded-full bg-black/[0.05] hover:bg-black/[0.1] text-[#1d1d1f] px-3 py-1.5 text-xs font-semibold transition-all active:scale-95 cursor-pointer",
							title: "View machine photos",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maximize2, { className: "size-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden xs:inline",
								children: "Photos"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: whatsappUrl(message),
							className: "inline-flex items-center gap-1.5 rounded-full bg-[#1fa855]/12 hover:bg-[#1fa855] text-[#1b7a40] hover:text-white px-3.5 py-1.5 text-xs font-semibold transition-all active:scale-95",
							title: "Inquire on WhatsApp",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WhatsAppIcon, { className: "size-3.5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Inquire" })]
						})]
					})]
				})
			]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductPhotoLightbox, {
		isOpen: lightboxOpen,
		onClose: () => setLightboxOpen(false),
		title: item.name,
		category: item.category,
		spec: item.spec,
		price: item.price ?? item.priceNote,
		intent: item.intent,
		images: allPhotos
	})] });
}
//#endregion
export { EquipmentCard as t };
