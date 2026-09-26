import { useRouterState } from "@tanstack/react-router";
import { site } from "@/data/site";
import { WhatsAppIcon } from "@/components/ui/official-badges";
import { useSiteCopy } from "@/lib/cms-store";

export function WhatsappFab() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const copy = useSiteCopy();
  if (pathname === "/quote" || pathname === "/contact") return null;

  const num = copy.whatsappNumber || site.whatsappNumber;
  const msg = copy.whatsappMessage || "Hello Omnicore Harare Desk — I would like an equipment quote.";
  const url = `https://wa.me/${num}?text=${encodeURIComponent(msg)}`;

  return (
    <aside aria-label="WhatsApp quick chat" className="fixed right-5 bottom-5 z-40 sm:right-7 sm:bottom-7">
      <a
        href={url}
        aria-label="Chat on WhatsApp with Harare Desk"
        className="group relative flex items-center gap-3 rounded-full bg-[#1fa855] px-4 py-2.5 text-white shadow-[0_6px_20px_rgba(31,168,85,0.35)] border border-[#1b934b] transition-all duration-300 hover:scale-105 hover:bg-[#1b934b] active:scale-95"
      >
        <WhatsAppIcon className="size-5 shrink-0 text-white" />
        <span className="text-[12px] font-bold text-white tracking-tight leading-none">
          WhatsApp Desk
        </span>
      </a>
    </aside>
  );
}
