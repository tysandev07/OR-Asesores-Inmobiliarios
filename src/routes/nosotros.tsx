import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import oficina from "@/assets/oficina.jpg";

export const Route = createFileRoute("/nosotros")({
  head: () => ({
    meta: [
      { title: "Nosotros | Olguin – Raposeiras Asesores Inmobiliarios" },
      { name: "description", content: "Conocé a OR Inmobiliaria, asesores inmobiliarios en Esquel, Chubut." },
      { property: "og:title", content: "Nosotros | OR Inmobiliaria" },
      { property: "og:description", content: "Asesores inmobiliarios en Esquel con trato cercano y profesional." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Nosotros,
});

const VALUES = [
  { title: "Confianza", text: "Trabajamos con transparencia en cada operación." },
  { title: "Cercanía", text: "Atención personalizada y comunicación clara." },
  { title: "Conocimiento local", text: "Conocemos Esquel y la región en profundidad." },
];

function Nosotros() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="Nosotros" title="Olguin – Raposeiras Asesores Inmobiliarios" subtitle="Una inmobiliaria de Esquel al servicio de quienes buscan su lugar en la Patagonia." />
      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center">
        <img src={oficina} alt="Oficina de OR Inmobiliaria" loading="lazy" width={1200} height={800} className="rounded-xl shadow-elevated" />
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-navy">Nuestra filosofía</h2>
          <p className="mt-4 leading-relaxed text-foreground">
            En OR Inmobiliaria acompañamos a cada cliente con un trato cercano y profesional. Creemos que comprar, vender o alquilar una propiedad es una decisión importante, y por eso ofrecemos información clara y seguimiento en cada etapa.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {VALUES.map((v) => (
              <div key={v.title} className="rounded-xl bg-secondary p-5">
                <h3 className="font-bold text-primary">{v.title}</h3>
                <p className="mt-1 text-sm text-foreground">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6">
          <h2 className="text-3xl font-extrabold text-navy">Nuestro equipo</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">Próximamente vas a conocer a los asesores de OR Inmobiliaria.</p>
          <Button asChild size="lg" className="mt-8 rounded-lg font-bold"><Link to="/contacto">Hablemos</Link></Button>
        </div>
      </section>
    </SiteLayout>
  );
}
