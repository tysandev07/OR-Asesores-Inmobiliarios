import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { PropertyCard } from "@/components/site/PropertyCard";
import { Button } from "@/components/ui/button";
import { CATEGORY_LABELS, CITIES, DEMO_PROPERTIES, filterProperties, PAGE_SIZE, type PropertyFilters } from "@/lib/properties";

const searchSchema = z.object({
  op: z.enum(["venta", "alquiler"]).optional().catch(undefined),
  cat: z.enum(["casa", "departamento", "terreno", "campo", "chacra", "local", "rural"]).optional().catch(undefined),
  city: z.string().optional().catch(undefined),
  min: z.number().optional().catch(undefined),
  max: z.number().optional().catch(undefined),
  q: z.string().optional().catch(undefined),
  sort: z.enum(["recientes", "precio-asc", "precio-desc"]).optional().catch(undefined),
  page: z.number().int().min(1).optional().catch(undefined),
});

export const Route = createFileRoute("/propiedades/")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Propiedades en venta y alquiler en Esquel | OR Inmobiliaria" },
      { name: "description", content: "Catálogo de casas, departamentos, terrenos, campos y chacras en Esquel y la Patagonia." },
      { property: "og:title", content: "Propiedades en Esquel | OR Inmobiliaria" },
      { property: "og:description", content: "Buscá casas, terrenos y alquileres en Esquel y la región." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Catalog,
});

function Catalog() {
  const s = Route.useSearch();
  const navigate = useNavigate({ from: "/propiedades/" });
  const set = (patch: Partial<PropertyFilters>) =>
    navigate({ search: (prev) => ({ ...prev, ...patch, page: undefined }) });

  const results = filterProperties(DEMO_PROPERTIES, s);
  const pages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const page = Math.min(s.page ?? 1, pages);
  const visible = results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const field = "h-11 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <SiteLayout>
      <PageHeader eyebrow="Catálogo" title="Propiedades" subtitle="Casas, departamentos, terrenos, campos y alquileres en Esquel y la región." />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-3 rounded-xl bg-card p-4 shadow-card sm:grid-cols-2 lg:grid-cols-6">
          <input aria-label="Buscar" placeholder="Buscar por texto o código" defaultValue={s.q ?? ""} onKeyDown={(e) => { if (e.key === "Enter") set({ q: e.currentTarget.value || undefined }); }} onBlur={(e) => set({ q: e.currentTarget.value || undefined })} className={`${field} lg:col-span-2`} />
          <select aria-label="Operación" value={s.op ?? ""} onChange={(e) => set({ op: (e.target.value || undefined) as PropertyFilters["op"] })} className={field}>
            <option value="">Operación</option><option value="venta">Venta</option><option value="alquiler">Alquiler</option>
          </select>
          <select aria-label="Categoría" value={s.cat ?? ""} onChange={(e) => set({ cat: (e.target.value || undefined) as PropertyFilters["cat"] })} className={field}>
            <option value="">Categoría</option>
            {Object.entries(CATEGORY_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
          <select aria-label="Localidad" value={s.city ?? ""} onChange={(e) => set({ city: e.target.value || undefined })} className={field}>
            <option value="">Localidad</option>
            {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select aria-label="Ordenar" value={s.sort ?? "recientes"} onChange={(e) => set({ sort: e.target.value as PropertyFilters["sort"] })} className={field}>
            <option value="recientes">Más recientes</option><option value="precio-asc">Menor precio</option><option value="precio-desc">Mayor precio</option>
          </select>
          <input aria-label="Precio mínimo" type="number" min={0} placeholder="Precio mín." defaultValue={s.min ?? ""} onBlur={(e) => set({ min: e.target.value ? Number(e.target.value) : undefined })} className={field} />
          <input aria-label="Precio máximo" type="number" min={0} placeholder="Precio máx." defaultValue={s.max ?? ""} onBlur={(e) => set({ max: e.target.value ? Number(e.target.value) : undefined })} className={field} />
          <Button variant="ghost" className="h-11" onClick={() => navigate({ search: {} })}>Limpiar filtros</Button>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">{results.length} {results.length === 1 ? "propiedad encontrada" : "propiedades encontradas"} · Las marcadas “Demo” son ejemplos de diseño.</p>

        {visible.length === 0 ? (
          <div className="mt-10 rounded-xl bg-secondary p-12 text-center">
            <p className="font-bold text-navy">No encontramos propiedades con esos filtros.</p>
            <p className="mt-2 text-sm text-muted-foreground">Probá ampliar la búsqueda o escribinos y te ayudamos.</p>
          </div>
        ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((p) => <PropertyCard key={p.slug} p={p} />)}
          </div>
        )}

        {pages > 1 && (
          <nav className="mt-10 flex justify-center gap-2" aria-label="Paginación">
            {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
              <Button key={n} variant={n === page ? "default" : "outline"} size="icon" onClick={() => navigate({ search: (prev) => ({ ...prev, page: n }) })}>{n}</Button>
            ))}
          </nav>
        )}
      </div>
    </SiteLayout>
  );
}
