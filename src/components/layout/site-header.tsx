import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { nav, services, site, whatsappUrl } from "@/data/site";
import { WhatsAppIcon } from "@/components/ui/official-badges";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-paper/85 backdrop-blur-2xl transition-all">
      <div className="mx-auto flex h-14 sm:h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        {/* Brand Logo - Minimal, clean, Apple-grade */}
        <Link
          to="/"
          className="group flex items-center gap-2.5 py-1"
          onClick={() => setOpen(false)}
        >
          <img
            src="/mark.png"
            alt=""
            className="size-8 object-cover object-center"
          />
          <span className="text-[15px] font-semibold tracking-tight text-[#1d1d1f]">
            {site.shortName}
          </span>
        </Link>

        {/* Desktop Navigation - Apple-style understated links */}
        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            const active =
              item.href === "/services"
                ? pathname === "/services" ||
                  (pathname.startsWith("/services/") && pathname !== "/services/hire")
                : pathname === item.href || pathname.startsWith(`${item.href}/`);
            const className = cn(
              "rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-150",
              active
                ? "text-[#1d1d1f] font-semibold bg-black/[0.05]"
                : "text-[#6e6e73] hover:text-[#1d1d1f] hover:bg-black/[0.03]",
            );
            if (item.href === "/services/hire") {
              return (
                <Link
                  key={item.href}
                  to="/services/$slug"
                  params={{ slug: "hire" }}
                  className={className}
                >
                  {item.label}
                </Link>
              );
            }
            return (
              <Link key={item.href} to={item.href} className={className}>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2.5">
          <a
            href={whatsappUrl("Hello Omnicore Harare Desk — I need a quote.")}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-[#1fa855] px-3.5 py-1.5 text-xs font-semibold text-white shadow-2xs transition-all hover:bg-[#1b934b] active:scale-95"
          >
            <WhatsAppIcon className="size-3.5 shrink-0" />
            <span>Harare Desk</span>
          </a>

          <Link
            to="/quote"
            className="inline-flex items-center gap-1 rounded-full bg-[#1d1d1f] px-4 py-1.5 text-xs font-medium text-white shadow-xs transition-all hover:bg-[#333336] active:scale-95"
          >
            <span>Get Quote</span>
            <ArrowUpRight className="size-3 text-white/70" />
          </Link>

          <button
            type="button"
            className="md:hidden flex size-9 items-center justify-center rounded-full text-[#1d1d1f] hover:bg-black/[0.05] transition-colors"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Glass Dropdown */}
      {open ? (
        <div className="border-t border-black/[0.06] bg-[#fbfbfd]/95 backdrop-blur-2xl px-5 py-5 md:hidden shadow-lg animate-in fade-in duration-200">
          <nav className="flex flex-col space-y-1">
            {nav.map((item) =>
              item.href === "/services/hire" ? (
                <Link
                  key={item.href}
                  to="/services/$slug"
                  params={{ slug: "hire" }}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2 text-sm font-medium text-[#1d1d1f] hover:bg-black/[0.04]"
                >
                  {item.label}
                </Link>
              ) : (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2 text-sm font-medium text-[#1d1d1f] hover:bg-black/[0.04]"
                >
                  {item.label}
                </Link>
              ),
            )}

            <div className="pt-3 pb-1">
              <p className="px-3 text-[11px] font-medium tracking-wider text-[#86868b] uppercase">
                Specialized Divisions
              </p>
            </div>

            <div className="grid grid-cols-1 gap-1">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  to="/services/$slug"
                  params={{ slug: service.slug }}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-xl px-3 py-2 text-xs font-medium text-[#6e6e73] hover:bg-black/[0.04] hover:text-[#1d1d1f]"
                >
                  <span>{service.title}</span>
                  <span className="text-[10px] text-[#86868b]">{service.eyebrow}</span>
                </Link>
              ))}
            </div>

            <div className="pt-4 flex flex-col gap-2">
              <Link
                to="/quote"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center rounded-full bg-[#1d1d1f] py-2.5 text-xs font-medium text-white shadow-xs"
              >
                Request a Machine Quote
              </Link>
              <a
                href={whatsappUrl("Hello Omnicore Harare Desk — I need an equipment quote.")}
                className="flex items-center justify-center gap-1.5 rounded-full bg-[#25D366]/10 py-2.5 text-xs font-medium text-[#0f5132] border border-[#25D366]/20"
              >
                <span className="size-1.5 rounded-full bg-[#25D366]" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
