import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Award, Handshake, Layers, MapPin, Home, KeyRound, FileCheck, Search, MessageCircle } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PropertyCard } from "@/components/site/PropertyCard";
import { Button } from "@/components/ui/button";
import { CATEGORY_LABELS, CITIES, DEMO_PROPERTIES, whatsappLink, type Category, type Operation } from "@/lib/properties";
import hero from "@/assets/hero-patagonia.jpg";
import oficina from "@/assets/oficina.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "OR Inmobiliaria | Propiedades en Esquel y la Patagonia" },
      { name: "description", content: "Casas, departamentos, terrenos, campos y alquileres en Esquel, Chubut. Olguin – Raposeiras Asesores Inmobiliarios." },
      { property: "og:title", content: "OR Inmobiliaria | Propiedades en Esquel y la Patagonia" },
      { property: "og:description", content: "Encontrá tu próximo lugar en la Patagonia con asesores inmobiliarios de Esquel." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const SERVICES = [
  { icon: Home, title: "Compra y Venta", text: "Te ayudamos a encontrar o vender tu propiedad." },
  { icon: KeyRound, title: "Alquileres", text: "Gestión de alquileres residenciales y comerciales." },
  { icon: Layers, title: "Tasaciones", text: "Valoración profesional de tu inmueble." },
  { icon: FileCheck, title: "Asesoramiento", text: "Acompañamiento en todo el proceso." },
];

const ADVANTAGES = [
  { icon: Award, text: "Asesoramiento profesional" },
  { icon: Handshake, text: "Acompañamiento en todo el proceso" },
  { icon: Layers, text: "Amplio portfolio de propiedades" },
  { icon: MapPin, text: "Conocimiento del mercado local" },
];

function SearchBox() {
  const navigate = useNavigate();
  const [op, setOp] = useState<Operation | "">("venta");
  const [cat, setCat] = useState<Category | "">("");
  const [city, setCity] = useState("");
  const [min, setMin] = useState("");
  const [max, setMax] = useState("");
  const field = "h-12 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        navigate({
          to: "/propiedades",
          search: {
            op: op || undefined,
            cat: cat || undefined,
            city: city || undefined,
            min: min ? Number(min) : undefined,
            max: max ? Number(max) : undefined,
          },
        });
      }}
      className="mt-8 max-w-5xl"
    >
      <div className="inline-flex overflow-hidden rounded-t-xl bg-background" role="tablist">
        {([["venta", "Comprar"], ["alquiler", "Alquilar"], ["", "Todos"]] as const).map(([v, l]) => (
          <button key={l} type="button" role="tab" aria-selected={op === v} onClick={() => setOp(v)}
            className={`px-6 py-3 text-sm font-bold transition-colors ${op === v ? "bg-primary text-primary-foreground" : "text-navy hover:bg-muted"}`}>
            {l}
          </button>
        ))}
      </div>
      <div className="grid gap-3 rounded-b-xl rounded-tr-xl bg-background p-4 shadow-elevated md:grid-cols-[1fr_1fr_0.7fr_0.7fr_auto]">
        <select aria-label="Tipo de propiedad" value={cat} onChange={(e) => setCat(e.target.value as Category | "")} className={field}>
          <option value="">Tipo de propiedad: Todos</option>
          {Object.entries(CATEGORY_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
        <select aria-label="Ubicación" value={city} onChange={(e) => setCity(e.target.value)} className={field}>
          <option value="">Ubicación: Esquel y zona</option>
          {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <input aria-label="Precio mínimo" type="number" min={0} placeholder="Precio mín." value={min} onChange={(e) => setMin(e.target.value)} className={field} />
        <input aria-label="Precio máximo" type="number" min={0} placeholder="Precio máx." value={max} onChange={(e) => setMax(e.target.value)} className={field} />
        <Button type="submit" size="lg" className="h-12 rounded-lg font-bold"><Search /> Buscar propiedades</Button>
      </div>
    </form>
  );
}

function Index() {
  const featured = DEMO_PROPERTIES.filter((p) => p.featured).slice(0, 4);
  return (
    <SiteLayout>
      <section className="relative overflow-hidden">
        <img src={hero} alt="Vista panorámica de Esquel y la cordillera" width={1920} height={912} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-20 sm:px-6 md:pb-24 md:pt-28">
          <p className="text-sm font-bold uppercase tracking-widest text-navy-foreground/90">Inmobiliaria en Esquel</p>
          <h1 className="mt-3 max-w-2xl text-4xl font-extrabold leading-[1.05] tracking-tight text-navy-foreground md:text-6xl">
            Encontrá tu próximo lugar <span className="text-sky">en la Patagonia</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-navy-foreground/90">
            Casas, departamentos, terrenos, campos y alquileres en Esquel y la región.
          </p>
          <SearchBox />
        </div>
      </section>

      <section className="bg-secondary">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 sm:px-6 md:grid-cols-4">
          {ADVANTAGES.map(({ icon: I, text }) => (
            <div key={text} className="flex items-center gap-3">
              <I className="h-9 w-9 shrink-0 text-primary" strokeWidth={1.5} />
              <span className="text-sm font-semibold text-navy">{text}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-navy md:text-4xl">Propiedades destacadas</h2>
            <div className="mt-3 h-1 w-16 rounded bg-primary" />
          </div>
          <Link to="/propiedades" className="flex items-center gap-2 text-sm font-bold text-primary hover:underline">
            Ver todas las propiedades <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">Las publicaciones marcadas como “Demo” son ejemplos de diseño y no corresponden a propiedades reales.</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => <PropertyCard key={p.slug} p={p} />)}
        </div>
      </section>

      <section className="bg-secondary">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_3fr] lg:items-center">
          <div>
            <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-navy">Nuestros <span className="text-primary">servicios</span></h2>
            <p className="mt-4 text-foreground">Soluciones integrales en el mercado inmobiliario, con la confianza de un equipo local.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map(({ icon: I, title, text }) => (
              <Link to="/servicios" key={title} className="rounded-xl bg-card p-6 text-center shadow-card transition-transform hover:-translate-y-1">
                <I className="mx-auto h-11 w-11 text-primary" strokeWidth={1.5} />
                <h3 className="mt-4 font-bold text-navy">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="grid lg:grid-cols-2">
        <img src={oficina} alt="Oficina de atención" loading="lazy" width={1200} height={800} className="h-72 w-full object-cover lg:h-full" />
        <div className="flex flex-col justify-center px-6 py-16 sm:px-12">
          <p className="text-sm font-bold uppercase tracking-widest text-primary">Conocé OR</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-navy md:text-4xl">Olguin – Raposeiras Asesores Inmobiliarios</h2>
          <p className="mt-4 max-w-lg text-foreground">
            Somos un equipo de Esquel dedicado al mercado inmobiliario local. Te ofrecemos un trato cercano, profesional y transparente para que tomes cada decisión con seguridad.
          </p>
          <div className="mt-6">
            <Button asChild variant="outlinePrimary" className="rounded-lg font-bold">
              <Link to="/nosotros">Conocé más sobre nosotros <ArrowRight /></Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-navy text-navy-foreground">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-16 sm:px-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight">¿Querés vender o alquilar tu propiedad?</h2>
            <p className="mt-2 max-w-xl text-navy-foreground/75">Te asesoramos con la tasación, la publicación y todo el proceso hasta concretar la operación.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-lg font-bold"><Link to="/contacto">Contactanos</Link></Button>
            <Button asChild size="lg" variant="whatsapp" className="rounded-lg font-bold">
              <a href={whatsappLink("Hola OR Inmobiliaria, quiero vender/alquilar mi propiedad.")} target="_blank" rel="noopener noreferrer"><MessageCircle /> WhatsApp</a>
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
