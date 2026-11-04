import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { MapPin, Phone, Instagram, Send } from "lucide-react";
import { SiteLayout, PageHeader } from "@/components/site/SiteLayout";
import { Button } from "@/components/ui/button";
import { ADDRESS, INSTAGRAM, WHATSAPP_DISPLAY, whatsappLink } from "@/lib/properties";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto | OR Inmobiliaria Esquel" },
      { name: "description", content: "Contactá a OR Inmobiliaria: 9 de Julio 765, Oficina 1, Esquel, Chubut. WhatsApp +54 2945 580909." },
      { property: "og:title", content: "Contacto | OR Inmobiliaria" },
      { property: "og:description", content: "Escribinos o visitanos en Esquel, Chubut." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contacto,
});

const schema = z.object({
  name: z.string().trim().min(2, "Ingresá tu nombre").max(100),
  phone: z.string().trim().min(6, "Ingresá un teléfono válido").max(30),
  email: z.string().trim().email("Ingresá un email válido").max(255),
  reason: z.string().min(1, "Elegí un motivo"),
  message: z.string().trim().min(5, "Escribí tu mensaje").max(1000),
});

function Contacto() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const field = "h-11 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring";

  return (
    <SiteLayout>
      <PageHeader eyebrow="Contacto" title="Hablemos" subtitle="Dejanos tu consulta y te respondemos a la brevedad." />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-6">
          {[
            { icon: MapPin, label: "Dirección", value: ADDRESS, href: `https://maps.google.com/?q=${encodeURIComponent(ADDRESS)}` },
            { icon: Phone, label: "WhatsApp", value: WHATSAPP_DISPLAY, href: whatsappLink("Hola OR Inmobiliaria") },
            { icon: Instagram, label: "Instagram", value: `@${INSTAGRAM}`, href: `https://instagram.com/${INSTAGRAM}` },
          ].map(({ icon: I, label, value, href }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="flex gap-4 rounded-xl bg-secondary p-5 transition-colors hover:bg-accent">
              <I className="h-6 w-6 shrink-0 text-primary" />
              <div><p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}</p><p className="font-semibold text-navy">{value}</p></div>
            </a>
          ))}
          <iframe title="Mapa de la oficina" className="h-64 w-full rounded-xl border-0" loading="lazy" src={`https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`} />
        </div>

        <form
          noValidate
          className="rounded-xl bg-card p-8 shadow-elevated"
          onSubmit={(e) => {
            e.preventDefault();
            const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
            const r = schema.safeParse(data);
            if (!r.success) {
              setErrors(Object.fromEntries(r.error.issues.map((i) => [String(i.path[0]), i.message])));
              return;
            }
            setErrors({});
            const v = r.data;
            window.open(whatsappLink(`Hola OR Inmobiliaria. Soy ${v.name} (${v.phone}, ${v.email}). Motivo: ${v.reason}.\n${v.message}`), "_blank", "noopener");
          }}
        >
          <h2 className="text-2xl font-extrabold text-navy">Envianos tu consulta</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {([["name", "Nombre", "text"], ["phone", "Teléfono", "tel"], ["email", "Email", "email"]] as const).map(([n, l, t]) => (
              <label key={n} className={n === "email" ? "sm:col-span-2" : ""}>
                <span className="text-sm font-semibold text-navy">{l}</span>
                <input name={n} type={t} className={`${field} mt-1`} />
                {errors[n] && <span className="mt-1 block text-xs text-destructive">{errors[n]}</span>}
              </label>
            ))}
            <label className="sm:col-span-2">
              <span className="text-sm font-semibold text-navy">Motivo</span>
              <select name="reason" defaultValue="" className={`${field} mt-1`}>
                <option value="" disabled>Elegí una opción</option>
                <option>Quiero comprar</option><option>Quiero alquilar</option><option>Quiero vender</option><option>Quiero poner en alquiler</option><option>Tasación</option><option>Otro</option>
              </select>
              {errors["reason"] && <span className="mt-1 block text-xs text-destructive">{errors["reason"]}</span>}
            </label>
            <label className="sm:col-span-2">
              <span className="text-sm font-semibold text-navy">Mensaje</span>
              <textarea name="message" rows={5} className="mt-1 w-full rounded-lg border border-input bg-background p-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
              {errors["message"] && <span className="mt-1 block text-xs text-destructive">{errors["message"]}</span>}
            </label>
          </div>
          <Button type="submit" size="lg" className="mt-6 w-full rounded-lg font-bold"><Send /> Enviar consulta</Button>
          <p className="mt-3 text-center text-xs text-muted-foreground">Por ahora la consulta se envía por WhatsApp.</p>
        </form>
      </div>
    </SiteLayout>
  );
}
