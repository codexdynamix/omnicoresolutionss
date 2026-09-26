import { cn } from "@/lib/utils";

interface BadgeProps {
  className?: string;
  label?: string;
  compact?: boolean;
}

/**
 * Authentic WhatsApp Icon with speech bubble and phone handset.
 * Uses a refined, natural WhatsApp deep-forest tone (#128C7E / #25D366 balanced)
 * avoiding harsh radioactive neon.
 */
export function WhatsAppIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      {/* Speech bubble outline with tail */}
      <path
        fill="#25D366"
        d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.63C8.75 21.41 10.38 21.82 12.04 21.82C17.5 21.82 21.95 17.37 21.95 11.91C21.95 6.45 17.5 2 12.04 2Z"
      />
      {/* Handset glyph in white */}
      <path
        fill="#FFFFFF"
        d="M17.47 14.38C17.17 14.23 15.71 13.51 15.44 13.41C15.17 13.31 14.97 13.26 14.77 13.56C14.57 13.86 14 14.53 13.83 14.73C13.66 14.93 13.49 14.95 13.19 14.8C12.89 14.65 11.93 14.34 10.8 13.33C9.92 12.54 9.32 11.57 9.15 11.27C8.98 10.97 9.13 10.81 9.28 10.66C9.41 10.53 9.58 10.31 9.73 10.14C9.88 9.97 9.93 9.84 10.03 9.64C10.13 9.44 10.08 9.27 10 9.12C9.93 8.97 9.33 7.51 9.09 6.91C8.84 6.33 8.6 6.41 8.42 6.4C8.24 6.39 8.04 6.39 7.84 6.39C7.64 6.39 7.32 6.46 7.05 6.76C6.78 7.06 6.01 7.78 6.01 9.24C6.01 10.7 7.08 12.11 7.22 12.31C7.37 12.51 9.32 15.51 12.3 16.8C13.01 17.11 13.56 17.29 13.99 17.43C14.7 17.65 15.35 17.62 15.86 17.55C16.43 17.46 17.62 16.83 17.87 16.13C18.12 15.44 18.12 14.84 18.04 14.72C17.97 14.6 17.77 14.53 17.47 14.38Z"
      />
    </svg>
  );
}

/**
 * Natural, balanced WhatsApp Badge:
 * Uses natural forest-emerald tones (#1f9d55 to #128C7E) with subtle shadow
 * so it is clearly recognizable as WhatsApp without being harsh neon or washed out.
 */
export function WhatsAppBadge({ className, label = "WhatsApp", compact = false }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-semibold transition-all duration-200 shadow-2xs",
        "bg-[#1fa855] text-white hover:bg-[#1b934b] active:scale-95 border border-[#1b934b]",
        compact ? "px-2.5 py-1 text-xs" : "px-3.5 py-1.5 text-xs sm:text-sm",
        className,
      )}
    >
      <WhatsAppIcon className={compact ? "size-3.5 shrink-0" : "size-4 shrink-0"} />
      <span className="tracking-tight">{label}</span>
    </span>
  );
}

/** Official Google Maps Badge with genuine 4-color pin and clean card pill */
export function GoogleMapsBadge({ className, label = "Google Maps", compact = false }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full font-medium transition-all duration-200 shadow-2xs",
        "bg-white text-[#3c4043] border border-[#dadce0] hover:bg-[#f8f9fa] hover:border-[#bdc1c6] active:scale-95",
        compact ? "px-3 py-1 text-xs" : "px-4 py-2 text-xs sm:text-sm",
        className,
      )}
    >
      <svg className="size-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="#4285F4"
          d="M12 2C8.13 2 5 5.13 5 9c0 4.17 4.42 9.92 6.24 12.11.4.48 1.12.48 1.52 0C14.58 18.92 19 13.17 19 9c0-3.87-3.13-7-7-7z"
        />
        <path
          fill="#EA4335"
          d="M12 2C8.13 2 5 5.13 5 9c0 1.74.63 3.34 1.69 4.58L12 6.5l5.31 7.08C18.37 12.34 19 10.74 19 9c0-3.87-3.13-7-7-7z"
        />
        <path
          fill="#FBBC04"
          d="M6.69 13.58C7.94 15.05 9.77 17.58 12 20.5c2.23-2.92 4.06-5.45 5.31-6.92L12 6.5l-5.31 7.08z"
        />
        <circle cx="12" cy="9" r="2.5" fill="#34A853" />
      </svg>
      <span>{label}</span>
    </span>
  );
}

/** Official Gmail Badge with authentic 4-color M logo and crisp card pill */
export function GmailBadge({ className, label = "Email Desk", compact = false }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full font-medium transition-all duration-200 shadow-2xs",
        "bg-white text-[#3c4043] border border-[#dadce0] hover:bg-[#f8f9fa] hover:border-[#bdc1c6] active:scale-95",
        compact ? "px-3 py-1 text-xs" : "px-4 py-2 text-xs sm:text-sm",
        className,
      )}
    >
      <svg className="size-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="#4285F4"
          d="M20 18h-2V9.5L12 14 6 9.5V18H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2h1.5L12 9l6.5-5H20c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2z"
        />
        <path fill="#EA4335" d="M18.5 4H20c1.1 0 2 .9 2 2v2.5L12 14 2 8.5V6c0-1.1.9-2 2-2h1.5L12 9l6.5-5z" />
        <path fill="#FBBC04" d="M2 6v2.5L12 14 22 8.5V6H2z" opacity="0.1" />
      </svg>
      <span>{label}</span>
    </span>
  );
}

/** Official Phone Calling Badge with authentic telecom blue and handset */
export function PhoneBadge({ className, label = "Call Desk", compact = false }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full font-medium transition-all duration-200 shadow-2xs",
        "bg-white text-[#1a73e8] border border-[#dadce0] hover:bg-[#f8f9fa] hover:border-[#bdc1c6] active:scale-95",
        compact ? "px-3 py-1 text-xs" : "px-4 py-2 text-xs sm:text-sm",
        className,
      )}
    >
      <svg className="size-4 fill-[#1a73e8] shrink-0" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 0 0-1.01.24l-1.57 1.97c-2.83-1.44-5.15-3.75-6.59-6.59l1.97-1.57c.28-.28.37-.68.25-1.02A11.36 11.36 0 0 1 8.56 4c0-.55-.45-1-1-1H4.01c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.62c0-.55-.45-1-1-1z" />
      </svg>
      <span className="text-[#3c4043]">{label}</span>
    </span>
  );
}

/** Official Chat Badge */
export function ChatBadge({ className, label = "Live Chat", compact = false }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full font-semibold transition-all duration-200 shadow-2xs",
        "bg-[#1fa855] text-white hover:bg-[#1b934b] active:scale-95 border border-[#1b934b]",
        compact ? "px-3 py-1 text-xs" : "px-4 py-2 text-xs sm:text-sm",
        className,
      )}
    >
      <WhatsAppIcon className="size-4 shrink-0" />
      <span>{label}</span>
    </span>
  );
}
