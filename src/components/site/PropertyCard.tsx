import { Link } from "@tanstack/react-router";
import { ArrowRight, BedDouble, Bath, Maximize, MapPin } from "lucide-react";
import { formatPrice, type Property } from "@/lib/properties";

export function PropertyCard({ p }: { p: Property }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl bg-card shadow-card transition-shadow hover:shadow-elevated">
      <Link to="/propiedades/$slug" params={{ slug: p.slug }} className="relative block aspect-[3/2] overflow-hidden">
        <img src={p.images[0]} alt={p.title} loading="lazy" width={1200} height={800} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <span className="absolute left-3 top-3 rounded-md bg-primary px-2.5 py-1 text-xs font-bold text-primary-foreground">
          {p.operation === "venta" ? "Venta" : "Alquiler"}
        </span>
        {p.isDemo && (
          <span className="absolute right-3 top-3 rounded-md bg-navy/80 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-navy-foreground">Demo</span>
        )}
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-bold text-navy">{p.title}</h3>
        <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3.5 w-3.5" />{p.city}, {p.province}</p>
        <div className="mt-4 flex gap-4 border-t border-border pt-3 text-sm text-foreground">
          {p.bedrooms != null && <span className="flex items-center gap-1"><BedDouble className="h-4 w-4 text-muted-foreground" />{p.bedrooms}</span>}
          {p.bathrooms != null && <span className="flex items-center gap-1"><Bath className="h-4 w-4 text-muted-foreground" />{p.bathrooms}</span>}
          {(p.coveredArea ?? p.landArea) != null && (
            <span className="flex items-center gap-1"><Maximize className="h-4 w-4 text-muted-foreground" />{new Intl.NumberFormat("es-AR").format((p.coveredArea ?? p.landArea)!)} m²</span>
          )}
        </div>
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-lg font-extrabold text-primary">{formatPrice(p)}</span>
          <Link to="/propiedades/$slug" params={{ slug: p.slug }} aria-label={`Ver propiedad ${p.title}`} className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-primary/30 text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
