/**
 * Subsections data for ServiceCard components
 * Centralized data to ensure consistency across all pages
 */

export interface Subsection {
  label: string;
  sublabel?: string;
  href: string;
}

// ==========================================
// TIPOS DE MESAS
// ==========================================

export const subsDulces: Subsection[] = [
  { label: "Candy Bar para Boda", sublabel: "Diseño nupcial elegante", href: "/candy-bar-eventos/mesa-dulces-boda" },
  { label: "Mesa para XV Años", sublabel: "Glamour y tendencia", href: "/candy-bar-eventos/mesa-dulces-xv-anos" },
  { label: "Para Baby Shower", sublabel: "Ternura y colores pastel", href: "/candy-bar-eventos/mesa-dulces-baby-shower" },
  { label: "Cumpleaños Infantil", sublabel: "Personajes y colores", href: "/candy-bar-eventos/mesa-dulces-cumpleanos-infantil" },
];

export const subsFrutas: Subsection[] = [
  { label: "Brochetas Artesanales", sublabel: "Frutas frescas ensartadas", href: "/tipos-de-mesas-de-dulces/mesa-de-frutas" },
  { label: "Torres Decorativas", sublabel: "Presentación escultural", href: "/tipos-de-mesas-de-dulces/mesa-de-frutas" },
  { label: "Con Chocolate Belga", sublabel: "La combinación perfecta", href: "/tipos-de-mesas-de-dulces/mesa-de-frutas" },
  { label: "Cortes Tropicales", sublabel: "Mango, piña, papaya y más", href: "/tipos-de-mesas-de-dulces/mesa-de-frutas" },
];

export const subsPostres: Subsection[] = [
  { label: "Macarons & Éclairs", sublabel: "Alta repostería francesa", href: "/tipos-de-mesas-de-dulces/mesa-de-postres" },
  { label: "Tartaletas Gourmet", sublabel: "Rellenos artesanales", href: "/tipos-de-mesas-de-dulces/mesa-de-postres" },
  { label: "Cupcakes Artísticos", sublabel: "Arte comestible decorado", href: "/tipos-de-mesas-de-dulces/mesa-de-donas-y-cupcakes" },
  { label: "Pays y Mini Pasteles", sublabel: "Sabores irresistibles", href: "/tipos-de-mesas-de-dulces/mesa-de-postres" },
];

export const subsQuesos: Subsection[] = [
  { label: "Quesos Europeos", sublabel: "Brie, gouda, manchego y más", href: "/tipos-de-mesas-de-dulces/mesa-de-quesos-y-embutidos" },
  { label: "Jamones Curados", sublabel: "Serrano, prosciutto, chorizo", href: "/tipos-de-mesas-de-dulces/mesa-de-quesos-y-embutidos" },
  { label: "Tabla Mixta Premium", sublabel: "La experiencia completa", href: "/tipos-de-mesas-de-dulces/mesa-de-quesos-y-embutidos" },
  { label: "Para Eventos Corporativos", sublabel: "Presentación ejecutiva", href: "/candy-bar-eventos/mesa-dulces-corporativos" },
];

export const subsSnacks: Subsection[] = [
  { label: "Snacks Gourmet Salados", sublabel: "Papas, nachos, palomitas artesanales", href: "/tipos-de-mesas-de-dulces/mesa-de-snacks" },
  { label: "Mix Dulce y Salado", sublabel: "El equilibrio perfecto", href: "/tipos-de-mesas-de-dulces/mesa-de-snacks" },
  { label: "Barra Infantil", sublabel: "Snacks para los más chicos", href: "/tipos-de-mesas-de-dulces/mesa-de-snacks" },
  { label: "Para Corporativos", sublabel: "Presentación ejecutiva", href: "/candy-bar-eventos/mesa-dulces-corporativos" },
];

export const subsBotanas: Subsection[] = [
  { label: "Nueces Garapiñadas", sublabel: "El clásico irresistible", href: "/tipos-de-mesas-de-dulces/mesa-de-botanas" },
  { label: "Cacahuates Japoneses", sublabel: "Crujiente y adictivo", href: "/tipos-de-mesas-de-dulces/mesa-de-botanas" },
  { label: "Mix Premium", sublabel: "Combinación gourmet", href: "/tipos-de-mesas-de-dulces/mesa-de-botanas" },
  { label: "Botanas Artesanales", sublabel: "Sabores únicos de temporada", href: "/tipos-de-mesas-de-dulces/mesa-de-botanas" },
];

export const subsTradicionles: Subsection[] = [
  { label: "Alegrías y Pepitorias", sublabel: "Sabores ancestrales", href: "/tipos-de-mesas-de-dulces/mesa-de-dulces-tradicionales" },
  { label: "Mazapanes y Obleas", sublabel: "Memorias de infancia", href: "/tipos-de-mesas-de-dulces/mesa-de-dulces-tradicionales" },
  { label: "Jamoncillos y Cocadas", sublabel: "Dulces artesanales", href: "/tipos-de-mesas-de-dulces/mesa-de-dulces-tradicionales" },
  { label: "Tamarindos y Chilitos", sublabel: "Sabor picosito mexicano", href: "/tipos-de-mesas-de-dulces/mesa-de-dulces-tradicionales" },
];

export const subsDonas: Subsection[] = [
  { label: "Torres de Donas", sublabel: "Instagrammable al 100%", href: "/tipos-de-mesas-de-dulces/mesa-de-donas-y-cupcakes" },
  { label: "Donas Temáticas", sublabel: "Personalizadas a tu evento", href: "/tipos-de-mesas-de-dulces/mesa-de-donas-y-cupcakes" },
  { label: "Cupcakes con Fondant", sublabel: "Decorados con arte", href: "/tipos-de-mesas-de-dulces/mesa-de-donas-y-cupcakes" },
  { label: "Para Baby Shower", sublabel: "Diseños adorables y tiernos", href: "/candy-bar-eventos/mesa-dulces-baby-shower" },
];

// ==========================================
// CANDY BAR POR EVENTO
// ==========================================

export const subsCBBoda: Subsection[] = [
  { label: "Mesa de Postres", sublabel: "Repostería nupcial gourmet", href: "/tipos-de-mesas-de-dulces/mesa-de-postres" },
  { label: "Mesa de Frutas", sublabel: "Fresco y elegante", href: "/tipos-de-mesas-de-dulces/mesa-de-frutas" },
  { label: "Fuente de Chocolate", sublabel: "La estrella de tu boda", href: "/estaciones-interactivas/fuente-de-chocolate" },
  { label: "Quesos y Embutidos", sublabel: "Cóctel de boda premium", href: "/tipos-de-mesas-de-dulces/mesa-de-quesos-y-embutidos" },
];

export const subsCBXV: Subsection[] = [
  { label: "Mesa de Dulces", sublabel: "Candy bar para quinceañera", href: "/tipos-de-mesas-de-dulces/mesa-de-dulces" },
  { label: "Mesa de Postres", sublabel: "Macarons y éclairs", href: "/tipos-de-mesas-de-dulces/mesa-de-postres" },
  { label: "Pared de Dulces", sublabel: "Spot fotográfico imperdible", href: "/estaciones-interactivas/pared-de-dulces" },
  { label: "Fuente de Chocolate", sublabel: "Experiencia interactiva", href: "/estaciones-interactivas/fuente-de-chocolate" },
];

export const subsCBBabyShower: Subsection[] = [
  { label: "Mesa de Dulces", sublabel: "Tonos tiernos personalizados", href: "/tipos-de-mesas-de-dulces/mesa-de-dulces" },
  { label: "Donas y Cupcakes", sublabel: "Diseños adorables", href: "/tipos-de-mesas-de-dulces/mesa-de-donas-y-cupcakes" },
  { label: "Mesa de Frutas", sublabel: "Frescura y color", href: "/tipos-de-mesas-de-dulces/mesa-de-frutas" },
  { label: "Stand para Pastel", sublabel: "El momento más dulce", href: "/estaciones-interactivas/stand-para-pastel" },
];

export const subsCBCumple: Subsection[] = [
  { label: "Mesa de Dulces", sublabel: "Personajes y colores", href: "/tipos-de-mesas-de-dulces/mesa-de-dulces" },
  { label: "Fuente de Chocolate", sublabel: "La favorita de los niños", href: "/estaciones-interactivas/fuente-de-chocolate" },
  { label: "Pared de Dulces", sublabel: "Dispensadores divertidos", href: "/estaciones-interactivas/pared-de-dulces" },
  { label: "Donas y Cupcakes", sublabel: "Decorados con arte", href: "/tipos-de-mesas-de-dulces/mesa-de-donas-y-cupcakes" },
];

export const subsCBBautizo: Subsection[] = [
  { label: "Mesa de Dulces", sublabel: "Tonos blancos y celestes", href: "/tipos-de-mesas-de-dulces/mesa-de-dulces" },
  { label: "Mesa de Postres", sublabel: "Elegancia serena", href: "/tipos-de-mesas-de-dulces/mesa-de-postres" },
  { label: "Dulces Tradicionales", sublabel: "Sabores de hogar", href: "/tipos-de-mesas-de-dulces/mesa-de-dulces-tradicionales" },
  { label: "Stand para Pastel", sublabel: "El centro de la celebración", href: "/estaciones-interactivas/stand-para-pastel" },
];

export const subsCBComunion: Subsection[] = [
  { label: "Mesa de Dulces", sublabel: "Simbolismo y elegancia", href: "/tipos-de-mesas-de-dulces/mesa-de-dulces" },
  { label: "Mesa de Postres", sublabel: "Repostería fina", href: "/tipos-de-mesas-de-dulces/mesa-de-postres" },
  { label: "Dulces Tradicionales", sublabel: "Conexión con la fe", href: "/tipos-de-mesas-de-dulces/mesa-de-dulces-tradicionales" },
  { label: "Stand para Pastel", sublabel: "Momento espiritual", href: "/estaciones-interactivas/stand-para-pastel" },
];

export const subsCBCorporativo: Subsection[] = [
  { label: "Quesos y Embutidos", sublabel: "Presentación ejecutiva", href: "/tipos-de-mesas-de-dulces/mesa-de-quesos-y-embutidos" },
  { label: "Mesa de Snacks", sublabel: "Networking con estilo", href: "/tipos-de-mesas-de-dulces/mesa-de-snacks" },
  { label: "Mesa de Postres", sublabel: "Servicio de alto nivel", href: "/tipos-de-mesas-de-dulces/mesa-de-postres" },
  { label: "Fuente de Chocolate", sublabel: "Show gastronómico", href: "/estaciones-interactivas/fuente-de-chocolate" },
];

export const subsCBGraduacion: Subsection[] = [
  { label: "Mesa de Dulces", sublabel: "Con colores de tu escuela", href: "/tipos-de-mesas-de-dulces/mesa-de-dulces" },
  { label: "Fuente de Chamoy", sublabel: "El sabor de la victoria", href: "/estaciones-interactivas/fuente-de-chamoy" },
  { label: "Donas y Cupcakes", sublabel: "Celebra con estilo", href: "/tipos-de-mesas-de-dulces/mesa-de-donas-y-cupcakes" },
  { label: "Mesa de Botanas", sublabel: "Para la fiesta larga", href: "/tipos-de-mesas-de-dulces/mesa-de-botanas" },
];

// Alias para compatibilidad con index.astro (mesas temáticas)
export const subsCBTematicas: Subsection[] = [
  { label: "Temáticas Infantiles", sublabel: "Personajes y fantasía", href: "/candy-bar-eventos/mesa-dulces-cumpleanos-infantil" },
  { label: "Temáticas de Adultos", sublabel: "Glamour y sofisticación", href: "/candy-bar-eventos/mesa-dulces-xv-anos" },
  { label: "Temáticas Corporativas", sublabel: "Branding con identidad", href: "/candy-bar-eventos/mesa-dulces-corporativos" },
  { label: "Temáticas Tradicionales", sublabel: "Sabor y cultura mexicana", href: "/tipos-de-mesas-de-dulces/mesa-de-dulces-tradicionales" },
];

// ==========================================
// ESTACIONES INTERACTIVAS
// ==========================================

export const subsFuenteChocolate: Subsection[] = [
  { label: "Para Bodas", sublabel: "Estación estrella nupcial", href: "/candy-bar-eventos/mesa-dulces-boda" },
  { label: "Para XV Años", sublabel: "La más solicitada", href: "/candy-bar-eventos/mesa-dulces-xv-anos" },
  { label: "Para Fiestas Infantiles", sublabel: "Los niños la adoran", href: "/candy-bar-eventos/mesa-dulces-cumpleanos-infantil" },
  { label: "Para Corporativos", sublabel: "Show gastronómico premium", href: "/candy-bar-eventos/mesa-dulces-corporativos" },
];

export const subsFuenteChamoy: Subsection[] = [
  { label: "Para XV Años", sublabel: "Toque picosito mexicano", href: "/candy-bar-eventos/mesa-dulces-xv-anos" },
  { label: "Para Cumpleaños", sublabel: "Sabor que celebra", href: "/candy-bar-eventos/mesa-dulces-cumpleanos-infantil" },
  { label: "Para Bodas", sublabel: "Estación diferenciadora", href: "/candy-bar-eventos/mesa-dulces-boda" },
  { label: "Para Graduaciones", sublabel: "El brindis de la victoria", href: "/candy-bar-eventos/mesa-dulces-graduacion" },
];

export const subsParedDulces: Subsection[] = [
  { label: "Para Baby Shower", sublabel: "Spot fotográfico tierno", href: "/candy-bar-eventos/mesa-dulces-baby-shower" },
  { label: "Para XV Años", sublabel: "Instagrammable total", href: "/candy-bar-eventos/mesa-dulces-xv-anos" },
  { label: "Para Bodas", sublabel: "Decoración y servicio", href: "/candy-bar-eventos/mesa-dulces-boda" },
  { label: "Para Corporativos", sublabel: "Branding con dulzura", href: "/candy-bar-eventos/mesa-dulces-corporativos" },
];

export const subsStandPastel: Subsection[] = [
  { label: "Para Bodas", sublabel: "El escenario del sí", href: "/candy-bar-eventos/mesa-dulces-boda" },
  { label: "Para XV Años", sublabel: "Momento protagonista", href: "/candy-bar-eventos/mesa-dulces-xv-anos" },
  { label: "Para Baby Shower", sublabel: "El dulce anuncio", href: "/candy-bar-eventos/mesa-dulces-baby-shower" },
  { label: "Para Bautizo", sublabel: "Celebración serena", href: "/candy-bar-eventos/mesa-dulces-bautizo" },
];

// ==========================================
// PORQUE MEDEDUL (pilares)
// ==========================================

export const subsDisenoPersonalizado: Subsection[] = [
  { label: "Bodas Elegantes", sublabel: "Diseño nupcial premium", href: "/candy-bar-eventos/mesa-dulces-boda" },
  { label: "XV Años", sublabel: "Glamour y color únicos", href: "/candy-bar-eventos/mesa-dulces-xv-anos" },
  { label: "Baby Shower", sublabel: "Ternura personalizada", href: "/candy-bar-eventos/mesa-dulces-baby-shower" },
  { label: "Eventos Corporativos", sublabel: "Identidad ejecutiva", href: "/candy-bar-eventos/mesa-dulces-corporativos" },
];

export const subsCalidadPremium: Subsection[] = [
  { label: "Chocolates y Dulces Finos", sublabel: "Importados y artesanales", href: "/tipos-de-mesas-de-dulces/mesa-de-dulces" },
  { label: "Postres Gourmet", sublabel: "Alta repostería", href: "/tipos-de-mesas-de-dulces/mesa-de-postres" },
  { label: "Quesos Europeos", sublabel: "Selección curada", href: "/tipos-de-mesas-de-dulces/mesa-de-quesos-y-embutidos" },
  { label: "Frutas de Temporada", sublabel: "Frescura garantizada", href: "/tipos-de-mesas-de-dulces/mesa-de-frutas" },
];

export const subsServicioCompleto: Subsection[] = [
  { label: "Mesas de Dulces", sublabel: "Desde cotización hasta fin", href: "/tipos-de-mesas-de-dulces" },
  { label: "Estaciones Interactivas", sublabel: "Operamos el evento completo", href: "/estaciones-interactivas" },
  { label: "Eventos Corporativos", sublabel: "Servicio ejecutivo integral", href: "/candy-bar-eventos/mesa-dulces-corporativos" },
  { label: "Bodas y XV Años", sublabel: "Los momentos más importantes", href: "/candy-bar-eventos/mesa-dulces-boda" },
];

export const subsCeroEstres: Subsection[] = [
  { label: "Respuesta en 2 horas", sublabel: "Por WhatsApp sin compromiso", href: "/cotizar" },
  { label: "Proceso Claro", sublabel: "Sin sorpresas ni letra chica", href: "/proceso" },
  { label: "500+ Eventos", sublabel: "Experiencia comprobada en CDMX", href: "/galeria" },
  { label: "Puntualidad Garantizada", sublabel: "Llegamos antes que nadie", href: "/porque-mededul/cero-estres" },
];

// ==========================================
// CATEGORÍAS OVERVIEW (para cards de sección/categoría)
// ==========================================

export const subsCatTiposMesas: Subsection[] = [
  { label: "Mesa de Dulces", sublabel: "El candy bar clásico", href: "/tipos-de-mesas-de-dulces/mesa-de-dulces" },
  { label: "Mesa de Postres", sublabel: "Alta repostería gourmet", href: "/tipos-de-mesas-de-dulces/mesa-de-postres" },
  { label: "Quesos y Embutidos", sublabel: "Sofisticación europea", href: "/tipos-de-mesas-de-dulces/mesa-de-quesos-y-embutidos" },
  { label: "Dulces Tradicionales", sublabel: "Sabores mexicanos", href: "/tipos-de-mesas-de-dulces/mesa-de-dulces-tradicionales" },
];

export const subsCatCandyBar: Subsection[] = [
  { label: "Candy Bar para Boda", sublabel: "Elegancia nupcial", href: "/candy-bar-eventos/mesa-dulces-boda" },
  { label: "Para XV Años", sublabel: "Glamour quinceañero", href: "/candy-bar-eventos/mesa-dulces-xv-anos" },
  { label: "Para Baby Shower", sublabel: "Ternura y pastel", href: "/candy-bar-eventos/mesa-dulces-baby-shower" },
  { label: "Corporativos", sublabel: "Presentación ejecutiva", href: "/candy-bar-eventos/mesa-dulces-corporativos" },
];

export const subsCatEstaciones: Subsection[] = [
  { label: "Fuente de Chocolate", sublabel: "La más solicitada", href: "/estaciones-interactivas/fuente-de-chocolate" },
  { label: "Fuente de Chamoy", sublabel: "Sabor mexicano", href: "/estaciones-interactivas/fuente-de-chamoy" },
  { label: "Pared de Dulces", sublabel: "Spot fotográfico", href: "/estaciones-interactivas/pared-de-dulces" },
  { label: "Stand para Pastel", sublabel: "Escenario del pastel", href: "/estaciones-interactivas/stand-para-pastel" },
];

export const subsCatServicios: Subsection[] = [
  { label: "Tipos de Mesas", sublabel: "8 opciones disponibles", href: "/tipos-de-mesas-de-dulces" },
  { label: "Candy Bar por Evento", sublabel: "Personalizado para tu fiesta", href: "/candy-bar-eventos" },
  { label: "Estaciones Interactivas", sublabel: "Fuentes y candy wall", href: "/estaciones-interactivas" },
  { label: "Ver Paquetes", sublabel: "Desde $4,500 MXN", href: "/servicios#paquetes" },
];
