import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { BedDouble, Bath, Maximize, Trees, MapPin, MessageCircle, Check, ArrowLeft } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PropertyCard } from "@/components/site/PropertyCard";
import { Button } from "@/components/ui/button";
import { CATEGORY_LABELS, DEMO_PROPERTIES, formatPrice, propertyWhatsappMessage, whatsappLink } from "@/lib/properties";

export const Route = createFileRoute("/propiedades/$slug")({
  loader: ({ params }) => {
    const property = DEMO_PROPERTIES.find((p) => p.slug === params.slug);
    if (!property) throw notFound();
    return { property };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.property;
    const title = p ? `${p.title} en ${p.city} | OR Inmobiliaria` : "Propiedad no disponible | OR Inmobiliaria";
    const description = p ? `${p.title} · ${formatPrice(p)} · ${p.city}, ${p.province}.` : "Esta propiedad no está disponible.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(p ? [] : [{ name: "robots", content: "noindex" }]),
      ],
    };
  },
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="text-3xl font-extrabold text-navy">Propiedad no disponible</h1>
        <p className="mt-3 text-muted-foreground">Puede que ya no esté publicada.</p>
        <Button asChild className="mt-6"><Link to="/propiedades">Ver propiedades</Link></Button>
      </div>
    </SiteLayout>
  ),
  component: PropertyPage,
});

function PropertyPage() {
  const { property: p } = Route.useLoaderData();
  const [active, setActive] = useState(0);
  const related = DEMO_PROPERTIES.filter((x) => x.slug !== p.slug && (x.category === p.category || x.operation === p.operation)).slice(0, 3);
  const nf = new Intl.NumberFormat("es-AR");
  const specs = [
    p.bedrooms != null && { icon: BedDouble, label: "Dormitorios", value: p.bedrooms },
    p.bathrooms != null && { icon: Bath, label: "Baños", value: p.bathrooms },
    p.coveredArea != null && { icon: Maximize, label: "Sup. cubierta", value: `${nf.format(p.coveredArea)} m²` },
    p.landArea != null && { icon: Trees, label: "Sup. terreno", value: `${nf.format(p.landArea)} m²` },
  ].filter(Boolean) as { icon: typeof Bath; label: string; value: string | number }[];

  return (
    <SiteLayout>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <Link to="/propiedades" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"><ArrowLeft className="h-4 w-4" /> Volver al catálogo</Link>
        {p.isDemo && (
          <div className="mt-4 rounded-lg bg-accent px-4 py-3 text-sm text-accent-foreground">Publicación de demostración: no corresponde a una propiedad real de OR Inmobiliaria.</div>
        )}
        <div className="mt-6 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <div className="overflow-hidden rounded-xl">
              <img src={p.images[active]} alt={`${p.title} – foto ${active + 1}`} width={1200} height={800} className="aspect-[3/2] w-full object-cover" />
            </div>
            <div className="mt-3 grid grid-cols-4 gap-3 sm:grid-cols-6">
              {p.images.map((img, i) => (
                <button key={i} onClick={() => setActive(i)} aria-label={`Ver foto ${i + 1}`} className={`overflow-hidden rounded-lg ring-2 ${i === active ? "ring-primary" : "ring-transparent"}`}>
                  <img src={img} alt="" loading="lazy" className="aspect-square w-full object-cover" />
                </button>
              ))}
            </div>
            <section className="mt-10">
              <h2 className="text-xl font-bold text-navy">Descripción</h2>
              <p className="mt-3 leading-relaxed text-foreground">{p.description}</p>
            </section>
            {p.services.length > 0 && (
              <section className="mt-8">
                <h2 className="text-xl font-bold text-navy">Servicios</h2>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">{p.services.map((s) => <li key={s} className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />{s}</li>)}</ul>
              </section>
            )}
            {p.features.length > 0 && (
              <section className="mt-8">
                <h2 className="text-xl font-bold text-navy">Características adicionales</h2>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">{p.features.map((s) => <li key={s} className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" />{s}</li>)}</ul>
              </section>
            )}
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-xl bg-card p-6 shadow-elevated">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                <span className="rounded bg-primary px-2 py-1 text-primary-foreground">{p.operation === "venta" ? "Venta" : "Alquiler"}</span>
                <span className="text-muted-foreground">{CATEGORY_LABELS[p.category]}</span>
              </div>
              <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-navy">{p.title}</h1>
              <p className="mt-1 text-xs text-muted-foreground">Código: {p.code}</p>
              <p className="mt-2 flex items-center gap-1 text-sm text-foreground"><MapPin className="h-4 w-4 text-primary" />{[p.neighborhood, p.city, p.province].filter(Boolean).join(", ")}</p>
              <p className="mt-5 text-3xl font-extrabold text-primary">{formatPrice(p)}</p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {specs.map(({ icon: I, label, value }) => (
                  <div key={label} className="rounded-lg bg-secondary p-3">
                    <I className="h-5 w-5 text-primary" />
                    <p className="mt-1 text-xs text-muted-foreground">{label}</p>
                    <p className="font-bold text-navy">{value}</p>
                  </div>
                ))}
              </div>
              <Button asChild variant="whatsapp" size="lg" className="mt-6 w-full rounded-lg font-bold">
                <a href={whatsappLink(propertyWhatsappMessage(p))} target="_blank" rel="noopener noreferrer"><MessageCircle /> Consultar por WhatsApp</a>
              </Button>
              <Button asChild variant="outlinePrimary" size="lg" className="mt-3 w-full rounded-lg font-bold">
                <Link to="/contacto">Enviar consulta</Link>
              </Button>
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-20">
            <h2 className="text-2xl font-extrabold text-navy">Propiedades relacionadas</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{related.map((r) => <PropertyCard key={r.slug} p={r} />)}</div>
          </section>
        )}
      </div>
    </SiteLayout>
  );
}
