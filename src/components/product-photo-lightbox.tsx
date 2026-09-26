import { useState, useEffect, useCallback, useRef } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  ExternalLink,
  MessageCircle,
} from "lucide-react";
import { whatsappUrl } from "@/data/site";

export interface ProductPhotoLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  category?: string;
  spec?: string;
  price?: string;
  intent?: "sale" | "hire";
  sku?: string;
  images: string[];
  initialIndex?: number;
}

export function ProductPhotoLightbox({
  isOpen,
  onClose,
  title,
  category,
  spec,
  price,
  intent,
  sku,
  images,
  initialIndex = 0,
}: ProductPhotoLightboxProps) {
  // Normalize images list (filter empty strings and duplicates)
  const validImages = Array.from(new Set(images.filter(Boolean)));
  const photos = validImages.length > 0 ? validImages : ["/images/hero.jpg"];

  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoomLevel, setZoomLevel] = useState<1 | 1.75 | 2.5>(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync initial index when modal opens
  useEffect(() => {
    if (isOpen) {
      const idx = Math.max(0, Math.min(initialIndex, photos.length - 1));
      setCurrentIndex(idx);
      setZoomLevel(1);
    }
  }, [isOpen, initialIndex, photos.length]);

  // Lock body scroll
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  const handlePrev = useCallback(() => {
    setZoomLevel(1);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
  }, [photos.length]);

  const handleNext = useCallback(() => {
    setZoomLevel(1);
    setCurrentIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
  }, [photos.length]);

  const toggleZoom = useCallback(() => {
    setZoomLevel((prev) => (prev === 1 ? 1.75 : prev === 1.75 ? 2.5 : 1));
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (zoomLevel > 1) {
          setZoomLevel(1);
        } else {
          onClose();
        }
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "z" || e.key === "Z") {
        toggleZoom();
      } else if (e.key === "f" || e.key === "F") {
        toggleFullscreen();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, zoomLevel, handlePrev, handleNext, toggleZoom, toggleFullscreen, onClose]);

  // Listen to native fullscreen changes
  useEffect(() => {
    function onFullscreenChange() {
      setIsFullscreen(Boolean(document.fullscreenElement));
    }
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  if (!isOpen) return null;

  const currentPhoto = photos[currentIndex] || photos[0];
  const whatsappMsg = `Hello Omnicore Solutions, I am viewing the high-resolution photo of ${title} (${intent === "hire" ? "Hire" : "Purchase"}${sku ? ` - SKU: ${sku}` : ""}). Please send further details and availability.`;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex flex-col bg-black/95 text-white backdrop-blur-2xl transition-all duration-200 select-none animate-in fade-in"
      onClick={() => {
        if (zoomLevel > 1) setZoomLevel(1);
        else onClose();
      }}
    >
      {/* Top Header Controls Bar */}
      <header
        className="flex items-center justify-between px-4 py-3 sm:px-6 bg-gradient-to-b from-black/90 to-transparent z-20 shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-semibold truncate leading-tight text-white tracking-tight">
                {title}
              </h2>
              {category && (
                <span className="hidden sm:inline-block rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-medium text-white/90 capitalize backdrop-blur-md">
                  {category} Division
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-white/60 mt-0.5">
              <span>
                Photo {currentIndex + 1} of {photos.length}
              </span>
              {sku && <span>· SKU: {sku}</span>}
              {spec && <span className="hidden md:inline">· {spec}</span>}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Zoom Toggle */}
          <button
            type="button"
            onClick={toggleZoom}
            className="flex items-center gap-1 rounded-full bg-white/10 hover:bg-white/20 px-3 py-1.5 text-xs font-medium text-white transition-all active:scale-95 cursor-pointer"
            title="Toggle HD Zoom (Z)"
          >
            {zoomLevel > 1 ? (
              <>
                <ZoomOut className="size-3.5" />
                <span className="hidden sm:inline">{zoomLevel}x</span>
              </>
            ) : (
              <>
                <ZoomIn className="size-3.5" />
                <span className="hidden sm:inline">Zoom HD</span>
              </>
            )}
          </button>

          {/* Fullscreen Toggle */}
          <button
            type="button"
            onClick={toggleFullscreen}
            className="hidden sm:flex items-center justify-center size-8 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all active:scale-95 cursor-pointer"
            title="Toggle Fullscreen (F)"
          >
            {isFullscreen ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
          </button>

          {/* Open Original in New Tab */}
          <a
            href={currentPhoto}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center justify-center size-8 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all active:scale-95"
            title="Open raw image in new tab"
          >
            <ExternalLink className="size-3.5" />
          </a>

          {/* WhatsApp Direct Inquire */}
          <a
            href={whatsappUrl(whatsappMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-[#1FA855] hover:bg-[#1A8D47] text-white px-3.5 py-1.5 text-xs font-semibold shadow-sm transition-all active:scale-95"
            title="Inquire about this machine on WhatsApp"
          >
            <MessageCircle className="size-3.5" />
            <span>Inquire</span>
          </a>

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="flex items-center justify-center size-8.5 rounded-full bg-white/15 hover:bg-white text-white hover:text-black transition-all active:scale-95 cursor-pointer ml-1"
            title="Close (Esc)"
          >
            <X className="size-5" />
          </button>
        </div>
      </header>

      {/* Main Image Viewport Area */}
      <div
        className="relative flex-1 flex items-center justify-center overflow-hidden p-2 sm:p-6"
        onClick={(e) => {
          e.stopPropagation();
          if (zoomLevel > 1) {
            setZoomLevel(1);
          } else {
            toggleZoom();
          }
        }}
      >
        {/* Navigation Arrow Previous */}
        {photos.length > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-3 sm:left-6 z-30 flex size-10 sm:size-12 items-center justify-center rounded-full bg-black/60 hover:bg-black/90 text-white/80 hover:text-white border border-white/15 backdrop-blur-md transition-all active:scale-90 cursor-pointer shadow-xl"
            title="Previous Photo (Left Arrow)"
          >
            <ChevronLeft className="size-6 sm:size-7" />
          </button>
        )}

        {/* Current Photo with smooth scale transition */}
        <div
          className={`relative max-w-full max-h-full flex items-center justify-center transition-transform duration-300 ease-out ${
            zoomLevel > 1 ? "cursor-zoom-out" : "cursor-zoom-in"
          }`}
          style={{
            transform: `scale(${zoomLevel})`,
          }}
        >
          <img
            key={currentPhoto}
            src={currentPhoto}
            alt={`${title} - Photo ${currentIndex + 1}`}
            className="max-h-[75vh] sm:max-h-[82vh] w-auto max-w-[94vw] sm:max-w-[88vw] object-contain rounded-xl shadow-2xl transition-opacity duration-200"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/images/hero.jpg";
            }}
          />
        </div>

        {/* Navigation Arrow Next */}
        {photos.length > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-3 sm:right-6 z-30 flex size-10 sm:size-12 items-center justify-center rounded-full bg-black/60 hover:bg-black/90 text-white/80 hover:text-white border border-white/15 backdrop-blur-md transition-all active:scale-90 cursor-pointer shadow-xl"
            title="Next Photo (Right Arrow)"
          >
            <ChevronRight className="size-6 sm:size-7" />
          </button>
        )}
      </div>

      {/* Bottom Thumbnails & Machine Spec Bar */}
      <footer
        className="px-4 py-3 bg-gradient-to-t from-black via-black/90 to-transparent z-20 shrink-0 space-y-2.5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Machine Highlights Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs border-b border-white/10 pb-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-white">{title}</span>
            {spec && <span className="text-white/60">· {spec}</span>}
            {price && (
              <span className="rounded-full bg-[#1FA855]/20 text-[#25D366] px-2.5 py-0.5 font-semibold text-[11px] border border-[#1FA855]/30">
                {price}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-[11px] text-white/50">
            <span>Use Left/Right arrows to flip photos · Z to zoom · Esc to exit</span>
          </div>
        </div>

        {/* Thumbnails Row if multiple photos */}
        {photos.length > 1 && (
          <div className="flex items-center justify-center gap-2 overflow-x-auto py-1 max-w-full no-scrollbar">
            {photos.map((src, idx) => (
              <button
                key={`${src}-${idx}`}
                type="button"
                onClick={() => {
                  setZoomLevel(1);
                  setCurrentIndex(idx);
                }}
                className={`relative shrink-0 size-13 sm:size-15 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                  idx === currentIndex
                    ? "border-[#1FA855] ring-2 ring-[#1FA855]/40 scale-105 opacity-100 shadow-md"
                    : "border-white/20 hover:border-white/50 opacity-60 hover:opacity-100"
                }`}
                title={`View Photo ${idx + 1}`}
              >
                <img
                  src={src}
                  alt={`Thumbnail ${idx + 1}`}
                  className="size-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/images/hero.jpg";
                  }}
                />
                <span className="absolute bottom-0.5 right-1 text-[8px] font-bold text-white drop-shadow-md">
                  #{idx + 1}
                </span>
              </button>
            ))}
          </div>
        )}
      </footer>
    </div>
  );
}
