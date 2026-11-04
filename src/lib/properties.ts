import casa from "@/assets/prop-casa.jpg";
import depto from "@/assets/prop-depto.jpg";
import terreno from "@/assets/prop-terreno.jpg";
import cabana from "@/assets/prop-cabana.jpg";
import hero from "@/assets/hero-patagonia.jpg";

export const WHATSAPP_NUMBER = "542945580909";
export const WHATSAPP_DISPLAY = "+54 2945 580909";
export const ADDRESS = "9 de Julio 765, Oficina 1, Esquel, Chubut, Argentina";
export const INSTAGRAM = "or.inmobiliaria";

export type Operation = "venta" | "alquiler";
export type Category =
  | "casa"
  | "departamento"
  | "terreno"
  | "campo"
  | "chacra"
  | "local"
  | "rural";

export const CATEGORY_LABELS: Record<Category, string> = {
  casa: "Casas",
  departamento: "Departamentos",
  terreno: "Terrenos",
  campo: "Campos",
  chacra: "Chacras",
  local: "Locales comerciales",
  rural: "Propiedades rurales",
};

export interface Property {
  code: string;
  slug: string;
  title: string;
  description: string;
  operation: Operation;
  category: Category;
  price: number | null;
  currency: "USD" | "ARS";
  city: string;
  province: string;
  neighborhood?: string;
  bedrooms?: number;
  bathrooms?: number;
  coveredArea?: number;
  landArea?: number;
  services: string[];
  features: string[];
  images: string[];
  featured: boolean;
  isDemo: true;
  createdAt: string;
}

// DATOS DE DEMOSTRACIÓN — no son publicaciones reales de OR Inmobiliaria.
// Se reemplazarán por la base de datos en la etapa de conexión.
export const DEMO_PROPERTIES: Property[] = [
  {
    code: "DEMO-001",
    slug: "demo-casa-zona-residencial",
    title: "Casa en zona residencial",
    description:
      "Propiedad de demostración. Casa de diseño con madera y piedra, amplios ventanales y parque. Ejemplo para visualizar cómo se verá una ficha publicada.",
    operation: "venta",
    category: "casa",
    price: 185000,
    currency: "USD",
    city: "Esquel",
    province: "Chubut",
    neighborhood: "Zona residencial",
    bedrooms: 3,
    bathrooms: 2,
    coveredArea: 150,
    landArea: 800,
    services: ["Luz", "Gas natural", "Agua corriente"],
    features: ["Parque", "Calefacción central", "Cochera"],
    images: [casa, hero, cabana],
    featured: true,
    isDemo: true,
    createdAt: "2026-10-20",
  },
  {
    code: "DEMO-002",
    slug: "demo-departamento-centrico",
    title: "Departamento céntrico",
    description:
      "Propiedad de demostración. Departamento con balcón y vista a las montañas, a pocas cuadras del centro.",
    operation: "alquiler",
    category: "departamento",
    price: 650000,
    currency: "ARS",
    city: "Esquel",
    province: "Chubut",
    neighborhood: "Centro",
    bedrooms: 2,
    bathrooms: 1,
    coveredArea: 70,
    services: ["Luz", "Gas natural", "Agua corriente", "Internet"],
    features: ["Balcón", "Ascensor"],
    images: [depto, hero],
    featured: true,
    isDemo: true,
    createdAt: "2026-10-22",
  },
  {
    code: "DEMO-003",
    slug: "demo-terreno-zona-crecimiento",
    title: "Terreno en zona de crecimiento",
    description:
      "Propiedad de demostración. Lote con vista abierta a la cordillera, ideal para construir.",
    operation: "venta",
    category: "terreno",
    price: 52000,
    currency: "USD",
    city: "Esquel",
    province: "Chubut",
    landArea: 600,
    services: ["Luz", "Agua"],
    features: ["Vista a la montaña", "Alambrado"],
    images: [terreno, hero],
    featured: true,
    isDemo: true,
    createdAt: "2026-10-25",
  },
  {
    code: "DEMO-004",
    slug: "demo-cabana-entorno-natural",
    title: "Cabaña en entorno natural",
    description:
      "Propiedad de demostración. Cabaña de madera rodeada de bosque, con galería y vista al lago.",
    operation: "venta",
    category: "casa",
    price: 110000,
    currency: "USD",
    city: "Trevelin",
    province: "Chubut",
    bedrooms: 2,
    bathrooms: 1,
    coveredArea: 80,
    landArea: 1200,
    services: ["Luz", "Agua de pozo"],
    features: ["Galería", "Hogar a leña", "Bosque nativo"],
    images: [cabana, hero],
    featured: true,
    isDemo: true,
    createdAt: "2026-10-28",
  },
  {
    code: "DEMO-005",
    slug: "demo-chacra-valle",
    title: "Chacra en el valle",
    description: "Propiedad de demostración. Chacra con álamos, agua para riego y acceso por camino consolidado.",
    operation: "venta",
    category: "chacra",
    price: null,
    currency: "USD",
    city: "Trevelin",
    province: "Chubut",
    landArea: 50000,
    services: ["Luz", "Agua de riego"],
    features: ["Álamos", "Acceso consolidado"],
    images: [terreno, hero],
    featured: false,
    isDemo: true,
    createdAt: "2026-10-30",
  },
  {
    code: "DEMO-006",
    slug: "demo-casa-alquiler-familiar",
    title: "Casa familiar en alquiler",
    description: "Propiedad de demostración. Casa amplia con parque, cercana a escuelas.",
    operation: "alquiler",
    category: "casa",
    price: 900000,
    currency: "ARS",
    city: "Esquel",
    province: "Chubut",
    bedrooms: 3,
    bathrooms: 2,
    coveredArea: 120,
    landArea: 500,
    services: ["Luz", "Gas natural", "Agua corriente"],
    features: ["Parque", "Parrilla"],
    images: [casa, cabana],
    featured: false,
    isDemo: true,
    createdAt: "2026-11-01",
  },
];

export const CITIES = Array.from(new Set(DEMO_PROPERTIES.map((p) => p.city)));

export function formatPrice(p: Pick<Property, "price" | "currency" | "operation">) {
  if (p.price == null) return "Consultar precio";
  const n = new Intl.NumberFormat("es-AR").format(p.price);
  const s = p.currency === "USD" ? `USD ${n}` : `$ ${n}`;
  return p.operation === "alquiler" ? `${s} / mes` : s;
}

export interface PropertyFilters {
  op?: Operation | undefined;
  cat?: Category | undefined;
  city?: string | undefined;
  min?: number | undefined;
  max?: number | undefined;
  q?: string | undefined;
  sort?: "recientes" | "precio-asc" | "precio-desc" | undefined;
  page?: number | undefined;
}

export const PAGE_SIZE = 6;

export function filterProperties(list: Property[], f: PropertyFilters) {
  let r = list.filter((p) => {
    if (f.op && p.operation !== f.op) return false;
    if (f.cat && p.category !== f.cat) return false;
    if (f.city && p.city !== f.city) return false;
    if (f.min != null && (p.price == null || p.price < f.min)) return false;
    if (f.max != null && (p.price == null || p.price > f.max)) return false;
    if (f.q) {
      const q = f.q.toLowerCase();
      if (!`${p.title} ${p.description} ${p.city} ${p.code}`.toLowerCase().includes(q)) return false;
    }
    return true;
  });
  const sort = f.sort ?? "recientes";
  r = [...r].sort((a, b) => {
    if (sort === "precio-asc") return (a.price ?? Infinity) - (b.price ?? Infinity);
    if (sort === "precio-desc") return (b.price ?? -1) - (a.price ?? -1);
    return b.createdAt.localeCompare(a.createdAt);
  });
  return r;
}

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function propertyWhatsappMessage(p: Pick<Property, "title" | "code">) {
  return `Hola OR Inmobiliaria, me interesa la propiedad "${p.title}" (código ${p.code}). ¿Me podrían dar más información?`;
}
