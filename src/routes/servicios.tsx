import { createFileRoute, Link } from "@tanstack/react-router";
import { Home, KeyRound, Layers, FileCheck } from "lucide-react";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/servicios")({
  head: () => ({
    meta: [
      { title: "Servicios inmobiliarios en Esquel | OR Inmobiliaria" },
      { name: "description", content: "Compra y venta, alquileres, tasaciones y asesoramiento inmobiliario en Esquel y la Patagonia." },
      { property: "og:title", content: "Servicios inmobiliarios | OR Inmobiliaria" },
      { property: "og:description", content: "Compra, venta, alquileres, tasaciones y asesoramiento en Esquel." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Servicios,
});

const ITEMS = [
  { icon: Home, title: "Compra y venta", text: "Te acompañamos a encontrar la propiedad que buscás o a vender la tuya: publicación, visitas, negociación y cierre de la operación." },
  { icon: KeyRound, title: "Alquileres", text: "Gestión de alquileres residenciales y comerciales, desde la búsqueda del inquilino hasta la administración del contrato." },
  { icon: Layers, title: "Tasaciones", text: "Valoración profesional de tu inmueble basada en el conocimiento del mercado de Esquel y la región." },
  { icon: FileCheck, title: "Asesoramiento inmobiliario", text: "Orientación en cada etapa para que tomes decisiones informadas y seguras." },
];

function Servicios() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="Servicios" title="Soluciones inmobiliarias integrales" subtitle="Un equipo local para acompañarte en cada paso." />
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-16 sm:px-6 md:grid-cols-2">
        {ITEMS.map(({ icon: I, title, text }) => (
          <article key={title} className="flex gap-5 rounded-xl bg-card p-8 shadow-card">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-accent"><I className="h-7 w-7 text-primary" /></span>
            <div>
              <h2 className="text-xl font-bold text-navy">{title}</h2>
              <p className="mt-2 text-foreground">{text}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="mx-auto max-w-7xl px-4 pb-20 text-center sm:px-6">
        <Button asChild size="lg" className="rounded-lg font-bold"><Link to="/contacto">Consultanos</Link></Button>
      </div>
    </SiteLayout>
  );
}
