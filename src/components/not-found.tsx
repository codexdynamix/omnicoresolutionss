import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-lg flex-col items-center justify-center px-6 text-center">
      <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
        404
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight">This page is not in the yard.</h1>
      <p className="mt-3 text-muted-foreground">
        The machine you are looking for may have moved. Try the catalogue, or talk to us on WhatsApp.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button asChild>
          <Link to="/">Home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/catalogue">Catalogue</Link>
        </Button>
      </div>
    </main>
  );
}
