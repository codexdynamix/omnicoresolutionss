import { i as __toESM } from "../_runtime.mjs";
import { d as whatsappUrl } from "./site-NmzgmCl5.mjs";
import { c as require_jsx_runtime, l as require_react } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { G as ChevronRight, K as ChevronLeft, R as ExternalLink, S as MessageCircle, n as ZoomOut, r as X, t as ZoomIn, w as Maximize2, x as Minimize2 } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/product-photo-lightbox-9HwvvrXG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProductPhotoLightbox({ isOpen, onClose, title, category, spec, price, intent, sku, images, initialIndex = 0 }) {
	const validImages = Array.from(new Set(images.filter(Boolean)));
	const photos = validImages.length > 0 ? validImages : ["/images/hero.jpg"];
	const [currentIndex, setCurrentIndex] = (0, import_react.useState)(initialIndex);
	const [zoomLevel, setZoomLevel] = (0, import_react.useState)(1);
	const [isFullscreen, setIsFullscreen] = (0, import_react.useState)(false);
	const containerRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (isOpen) {
			const idx = Math.max(0, Math.min(initialIndex, photos.length - 1));
			setCurrentIndex(idx);
			setZoomLevel(1);
		}
	}, [
		isOpen,
		initialIndex,
		photos.length
	]);
	(0, import_react.useEffect)(() => {
		if (!isOpen) return;
		const originalOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = originalOverflow;
		};
	}, [isOpen]);
	const handlePrev = (0, import_react.useCallback)(() => {
		setZoomLevel(1);
		setCurrentIndex((prev) => prev > 0 ? prev - 1 : photos.length - 1);
	}, [photos.length]);
	const handleNext = (0, import_react.useCallback)(() => {
		setZoomLevel(1);
		setCurrentIndex((prev) => prev < photos.length - 1 ? prev + 1 : 0);
	}, [photos.length]);
	const toggleZoom = (0, import_react.useCallback)(() => {
		setZoomLevel((prev) => prev === 1 ? 1.75 : prev === 1.75 ? 2.5 : 1);
	}, []);
	const toggleFullscreen = (0, import_react.useCallback)(() => {
		if (!document.fullscreenElement) {
			containerRef.current?.requestFullscreen().catch(() => {});
			setIsFullscreen(true);
		} else {
			document.exitFullscreen().catch(() => {});
			setIsFullscreen(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		if (!isOpen) return;
		function handleKeyDown(e) {
			if (e.key === "Escape") {
				if (zoomLevel > 1) setZoomLevel(1);
				else onClose();
			} else if (e.key === "ArrowLeft") handlePrev();
			else if (e.key === "ArrowRight") handleNext();
			else if (e.key === "z" || e.key === "Z") toggleZoom();
			else if (e.key === "f" || e.key === "F") toggleFullscreen();
		}
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [
		isOpen,
		zoomLevel,
		handlePrev,
		handleNext,
		toggleZoom,
		toggleFullscreen,
		onClose
	]);
	(0, import_react.useEffect)(() => {
		function onFullscreenChange() {
			setIsFullscreen(Boolean(document.fullscreenElement));
		}
		document.addEventListener("fullscreenchange", onFullscreenChange);
		return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
	}, []);
	if (!isOpen) return null;
	const currentPhoto = photos[currentIndex] || photos[0];
	const whatsappMsg = `Hello Omnicore Solutions, I am viewing the high-resolution photo of ${title} (${intent === "hire" ? "Hire" : "Purchase"}${sku ? ` - SKU: ${sku}` : ""}). Please send further details and availability.`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: containerRef,
		className: "fixed inset-0 z-[100] flex flex-col bg-black/95 text-white backdrop-blur-2xl transition-all duration-200 select-none animate-in fade-in",
		onClick: () => {
			if (zoomLevel > 1) setZoomLevel(1);
			else onClose();
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center justify-between px-4 py-3 sm:px-6 bg-gradient-to-b from-black/90 to-transparent z-20 shrink-0",
				onClick: (e) => e.stopPropagation(),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-3 min-w-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-sm sm:text-base font-semibold truncate leading-tight text-white tracking-tight",
								children: title
							}), category && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "hidden sm:inline-block rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-medium text-white/90 capitalize backdrop-blur-md",
								children: [category, " Division"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-xs text-white/60 mt-0.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									"Photo ",
									currentIndex + 1,
									" of ",
									photos.length
								] }),
								sku && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["· SKU: ", sku] }),
								spec && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "hidden md:inline",
									children: ["· ", spec]
								})
							]
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5 sm:gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: toggleZoom,
							className: "flex items-center gap-1 rounded-full bg-white/10 hover:bg-white/20 px-3 py-1.5 text-xs font-medium text-white transition-all active:scale-95 cursor-pointer",
							title: "Toggle HD Zoom (Z)",
							children: zoomLevel > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomOut, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "hidden sm:inline",
								children: [zoomLevel, "x"]
							})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ZoomIn, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden sm:inline",
								children: "Zoom HD"
							})] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: toggleFullscreen,
							className: "hidden sm:flex items-center justify-center size-8 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all active:scale-95 cursor-pointer",
							title: "Toggle Fullscreen (F)",
							children: isFullscreen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minimize2, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maximize2, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: currentPhoto,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "hidden md:flex items-center justify-center size-8 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all active:scale-95",
							title: "Open raw image in new tab",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3.5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: whatsappUrl(whatsappMsg),
							target: "_blank",
							rel: "noopener noreferrer",
							className: "hidden sm:inline-flex items-center gap-1.5 rounded-full bg-[#1FA855] hover:bg-[#1A8D47] text-white px-3.5 py-1.5 text-xs font-semibold shadow-sm transition-all active:scale-95",
							title: "Inquire about this machine on WhatsApp",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Inquire" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: onClose,
							className: "flex items-center justify-center size-8.5 rounded-full bg-white/15 hover:bg-white text-white hover:text-black transition-all active:scale-95 cursor-pointer ml-1",
							title: "Close (Esc)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex-1 flex items-center justify-center overflow-hidden p-2 sm:p-6",
				onClick: (e) => {
					e.stopPropagation();
					if (zoomLevel > 1) setZoomLevel(1);
					else toggleZoom();
				},
				children: [
					photos.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: (e) => {
							e.stopPropagation();
							handlePrev();
						},
						className: "absolute left-3 sm:left-6 z-30 flex size-10 sm:size-12 items-center justify-center rounded-full bg-black/60 hover:bg-black/90 text-white/80 hover:text-white border border-white/15 backdrop-blur-md transition-all active:scale-90 cursor-pointer shadow-xl",
						title: "Previous Photo (Left Arrow)",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-6 sm:size-7" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `relative max-w-full max-h-full flex items-center justify-center transition-transform duration-300 ease-out ${zoomLevel > 1 ? "cursor-zoom-out" : "cursor-zoom-in"}`,
						style: { transform: `scale(${zoomLevel})` },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: currentPhoto,
							alt: `${title} - Photo ${currentIndex + 1}`,
							className: "max-h-[75vh] sm:max-h-[82vh] w-auto max-w-[94vw] sm:max-w-[88vw] object-contain rounded-xl shadow-2xl transition-opacity duration-200",
							onError: (e) => {
								e.target.src = "/images/hero.jpg";
							}
						}, currentPhoto)
					}),
					photos.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: (e) => {
							e.stopPropagation();
							handleNext();
						},
						className: "absolute right-3 sm:right-6 z-30 flex size-10 sm:size-12 items-center justify-center rounded-full bg-black/60 hover:bg-black/90 text-white/80 hover:text-white border border-white/15 backdrop-blur-md transition-all active:scale-90 cursor-pointer shadow-xl",
						title: "Next Photo (Right Arrow)",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-6 sm:size-7" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "px-4 py-3 bg-gradient-to-t from-black via-black/90 to-transparent z-20 shrink-0 space-y-2.5",
				onClick: (e) => e.stopPropagation(),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-3 text-xs border-b border-white/10 pb-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-white",
								children: title
							}),
							spec && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-white/60",
								children: ["· ", spec]
							}),
							price && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full bg-[#1FA855]/20 text-[#25D366] px-2.5 py-0.5 font-semibold text-[11px] border border-[#1FA855]/30",
								children: price
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-2 text-[11px] text-white/50",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Use Left/Right arrows to flip photos · Z to zoom · Esc to exit" })
					})]
				}), photos.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center justify-center gap-2 overflow-x-auto py-1 max-w-full no-scrollbar",
					children: photos.map((src, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => {
							setZoomLevel(1);
							setCurrentIndex(idx);
						},
						className: `relative shrink-0 size-13 sm:size-15 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${idx === currentIndex ? "border-[#1FA855] ring-2 ring-[#1FA855]/40 scale-105 opacity-100 shadow-md" : "border-white/20 hover:border-white/50 opacity-60 hover:opacity-100"}`,
						title: `View Photo ${idx + 1}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src,
							alt: `Thumbnail ${idx + 1}`,
							className: "size-full object-cover",
							onError: (e) => {
								e.target.src = "/images/hero.jpg";
							}
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "absolute bottom-0.5 right-1 text-[8px] font-bold text-white drop-shadow-md",
							children: ["#", idx + 1]
						})]
					}, `${src}-${idx}`))
				})]
			})
		]
	});
}
//#endregion
export { ProductPhotoLightbox as t };
