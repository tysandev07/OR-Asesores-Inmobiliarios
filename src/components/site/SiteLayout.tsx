import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu, X, MessageCircle, MapPin, Instagram, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ADDRESS, INSTAGRAM, WHATSAPP_DISPLAY, whatsappLink } from "@/lib/properties";

const NAV = [
  { to: "/", label: "Inicio" },
  { to: "/propiedades", label: "Propiedades" },
  { to: "/servicios", label: "Servicios" },
  { to: "/nosotros", label: "Nosotros" },
  { to: "/contacto", label: "Contacto" },
] as const;

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-3" aria-label="OR Inmobiliaria – inicio">
      <span className="relative flex h-11 w-14 items-end justify-center">
        <svg viewBox="0 0 56 20" className="absolute top-0 h-4 w-14 text-navy" aria-hidden>
          <path d="M4 18 L28 3 L52 18" fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" className={light ? "text-navy-foreground" : ""} />
        </svg>
        <span className={`text-2xl font-extrabold leading-none tracking-tight ${light ? "text-sky" : "text-primary"}`}>OR</span>
      </span>
      <span className="leading-tight">
        <span className={`block text-sm font-extrabold tracking-wide ${light ? "text-navy-foreground" : "text-navy"}`}>OLGUIN - RAPOSEIRAS</span>
        <span className={`block text-[11px] font-medium tracking-wider ${light ? "text-navy-foreground/70" : "text-muted-foreground"}`}>ASESORES INMOBILIARIOS</span>
      </span>
    </Link>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Principal">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className="border-b-2 border-transparent py-2 text-sm font-semibold text-foreground transition-colors hover:text-primary data-[status=active]:border-primary data-[status=active]:text-navy"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:block">
          <Button asChild variant="navy" className="rounded-lg">
            <a href={whatsappLink("Hola OR Inmobiliaria, quisiera hacer una consulta.")} target="_blank" rel="noopener noreferrer">
              <MessageCircle /> Consultar por WhatsApp
            </a>
          </Button>
        </div>
        <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Abrir menú">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="border-t border-border bg-background px-4 pb-4 lg:hidden">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="block py-3 font-semibold text-foreground data-[status=active]:text-primary" activeOptions={{ exact: n.to === "/" }}>
              {n.label}
            </Link>
          ))}
          <Button asChild variant="whatsapp" className="mt-2 w-full">
            <a href={whatsappLink("Hola OR Inmobiliaria, quisiera hacer una consulta.")} target="_blank" rel="noopener noreferrer">
              <MessageCircle /> WhatsApp
            </a>
          </Button>
        </nav>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo light />
          <p className="mt-4 max-w-sm text-sm text-navy-foreground/70">
            Asesores inmobiliarios en Esquel y la región. Compra, venta, alquileres y tasaciones en la Patagonia.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-sky">Navegación</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {NAV.map((n) => (
              <li key={n.to}><Link to={n.to} className="text-navy-foreground/80 hover:text-navy-foreground">{n.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-sky">Contacto</h3>
          <ul className="mt-4 space-y-3 text-sm text-navy-foreground/80">
            <li className="flex gap-2"><MapPin className="h-4 w-4 shrink-0 text-sky" />{ADDRESS}</li>
            <li className="flex gap-2"><Phone className="h-4 w-4 shrink-0 text-sky" /><a href={whatsappLink("Hola OR Inmobiliaria")} className="hover:text-navy-foreground">{WHATSAPP_DISPLAY}</a></li>
            <li className="flex gap-2"><Instagram className="h-4 w-4 shrink-0 text-sky" /><a href={`https://instagram.com/${INSTAGRAM}`} target="_blank" rel="noopener noreferrer" className="hover:text-navy-foreground">@{INSTAGRAM}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-navy-foreground/10 py-5 text-center text-xs text-navy-foreground/60">
        © {new Date().getFullYear()} Olguin – Raposeiras Asesores Inmobiliarios · Desarrollado por Ghisla Digital Solutions
      </div>
    </footer>
  );
}

function FloatingWhatsapp() {
  return (
    <a
      href={whatsappLink("Hola OR Inmobiliaria, quisiera hacer una consulta.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-primary-foreground shadow-elevated transition-transform hover:scale-105"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingWhatsapp />
    </div>
  );
}

export function PageHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <section className="bg-navy text-navy-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <p className="text-sm font-bold uppercase tracking-widest text-sky">{eyebrow}</p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">{title}</h1>
        {subtitle && <p className="mt-4 max-w-2xl text-lg text-navy-foreground/75">{subtitle}</p>}
      </div>
    </section>
  );
}
