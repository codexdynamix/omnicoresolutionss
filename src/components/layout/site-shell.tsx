import { useRouterState } from "@tanstack/react-router";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { WhatsappFab } from "@/components/layout/whatsapp-fab";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-svh flex-col bg-background text-foreground">
      <SiteHeader />
      <div className="flex-1 pb-16">{children}</div>
      <SiteFooter />
      <WhatsappFab />
    </div>
  );
}
