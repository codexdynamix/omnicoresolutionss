import { useMemo, useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { EquipmentCard } from "@/components/equipment-card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { equipment as defaultEquipment, services, type Category, type Intent, whatsappUrl } from "@/data/site";
import { getStoredEquipment } from "@/lib/cms-store";

type CatalogueSearch = {
  category?: Category;
  intent?: Intent;
  q?: string;
};

export const Route = createFileRoute("/catalogue")({
  validateSearch: (search: Record<string, unknown>): CatalogueSearch => ({
    category: isCategory(search.category) ? search.category : undefined,
    intent: search.intent === "sale" || search.intent === "hire" ? search.intent : undefined,
    q: typeof search.q === "string" && search.q.length > 0 ? search.q : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Equipment Catalogue | Sale & Hire Zimbabwe | Omnicore Solutions" },
      {
        name: "description",
        content:
          "Searchable catalogue of mining, construction, farming and industrial machinery for sale and hire in Zimbabwe. Real stock at Cranborne yard, Harare.",
      },
    ],
  }),
  component: CataloguePage,
});

function isCategory(value: unknown): value is Category {
  return services.some((service) => service.slug === value);
}

function CataloguePage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const category = search.category ?? "all";
  const intent = search.intent ?? "all";
  const [query, setQuery] = useState(search.q ?? "");
  const [equipmentList, setEquipmentList] = useState(getStoredEquipment);

  useEffect(() => {
    function onUpdate() {
      setEquipmentList(getStoredEquipment());
    }
    window.addEventListener("omnicore-equipment-updated", onUpdate);
    return () => {
      window.removeEventListener("omnicore-equipment-updated", onUpdate);
    };
  }, []);

  const filtered = useMemo(() => {
    const q = (search.q ?? "").trim().toLowerCase();
    const source = equipmentList.length > 0 ? equipmentList : defaultEquipment;
    return source.filter((item) => {
      if (category !== "all" && item.category !== category) return false;
      if (intent !== "all" && item.intent !== intent) return false;
      if (!q) return true;
      return `${item.name} ${item.blurb} ${item.spec} ${item.category}`.toLowerCase().includes(q);
    });
  }, [search, category, intent, equipmentList]);

  function setFilter(next: {
    category?: "all" | Category;
    intent?: "all" | Intent;
    q?: string;
  }) {
    const nextCategory = next.category === undefined ? search.category : next.category === "all" ? undefined : next.category;
    const nextIntent = next.intent === undefined ? search.intent : next.intent === "all" ? undefined : next.intent;
    const nextQ = next.q !== undefined ? (next.q || undefined) : search.q;
    void navigate({
      search: {
        category: nextCategory,
        intent: nextIntent,
        q: nextQ,
      },
      replace: true,
    });
  }

  const chips: { label: string; category: "all" | Category }[] = [
    { label: "All Machinery", category: "all" },
    ...services.map((service) => ({ label: service.navLabel, category: service.slug })),
  ];

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold tracking-wider text-[#86868b] uppercase">
          Inventory & Fleet · Cranborne Yard
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-[#1d1d1f] sm:text-5xl">
          Machinery catalogue.
        </h1>
        <p className="mt-1 max-w-2xl text-sm leading-relaxed text-[#6e6e73]">
          Browse plant and industrial equipment in stock. Direct rates, wet/dry options, and nationwide transport arranged from Harare.
        </p>
      </div>

      {/* Apple-style Filter & Search Console */}
      <div className="mt-8 flex flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Rounded-full Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-[#86868b]" />
            <Input
              value={query}
              onChange={(event) => {
                const value = event.target.value;
                setQuery(value);
                setFilter({ q: value });
              }}
              placeholder="Search machinery, crushers, mixers…"
              className="pl-11 h-11 text-xs rounded-full border-black/[0.08] bg-white shadow-2xs focus:border-[#0071e3]"
              aria-label="Search equipment"
            />
          </div>

          {/* Segmented Control for Intent */}
          <div className="inline-flex rounded-full bg-black/[0.04] p-1 w-fit">
            {(["all", "sale", "hire"] as const).map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setFilter({ intent: value })}
                className={cn(
                  "rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-150",
                  intent === value
                    ? "bg-white text-[#1d1d1f] shadow-2xs font-semibold"
                    : "text-[#6e6e73] hover:text-[#1d1d1f]",
                )}
              >
                {value === "all" ? "All" : value === "sale" ? "For Sale" : "Plant Hire"}
              </button>
            ))}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {chips.map((chip) => (
            <button
              key={chip.category}
              type="button"
              onClick={() => setFilter({ category: chip.category })}
              className={cn(
                "rounded-full px-3.5 py-1 text-xs font-medium transition-all duration-150",
                category === chip.category
                  ? "bg-[#1d1d1f] text-white"
                  : "bg-black/[0.03] text-[#6e6e73] hover:text-[#1d1d1f] hover:bg-black/[0.06]",
              )}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>

      {/* Result stats */}
      <div className="mt-8 flex items-center justify-between text-xs text-[#86868b] border-b border-black/[0.04] pb-3">
        <span>
          Showing <strong className="text-[#1d1d1f] font-medium">{filtered.length}</strong> items
        </span>
        <a
          href={whatsappUrl("Hello Omnicore Harare Desk — I am looking for a machine not listed on the website.")}
          className="text-[#0071e3] hover:underline"
        >
          Special order? Ask Harare Desk
        </a>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="mt-12 rounded-3xl border border-black/[0.06] bg-white p-12 text-center">
          <h3 className="text-base font-semibold text-[#1d1d1f]">No machinery found</h3>
          <p className="mt-1 text-xs text-[#86868b]">
            We frequently have equipment arriving in Cranborne. Inquire directly on WhatsApp.
          </p>
          <div className="mt-5 flex justify-center">
            <a
              href={whatsappUrl(`Hello Omnicore, I am searching for "${query}". Do you have this in stock?`)}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#1d1d1f] px-5 py-2 text-xs font-medium text-white shadow-xs hover:bg-[#333336]"
            >
              Ask on WhatsApp
            </a>
          </div>
        </div>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <EquipmentCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </main>
  );
}
