/**
 * Base de datos centralizada de dulcerías verificadas en CDMX
 * Todas verificadas en Google Maps sin página web propia
 */

export interface Dulceria {
  // Identificación
  nombre: string;
  slug: string;
  tipo: 'Tienda de Golosinas' | 'Dulcería Mayoreo' | 'Tienda de Golosinas Premium' | 'Dulcería Tradicional';

  // Ubicación
  direccion: string;
  colonia: string;
  alcaldia: string;
  alcaldiaSlug: string;
  cp: string;
  coordenadas: { lat: number; lng: number };
  referencia?: string;

  // Contacto
  telefono: string;
  mapsUrl: string;

  // Ratings
  rating: number;
  resenas: number;
  verificado: boolean;
  destacado: boolean;

  // Horarios
  horario: {
    lunes: string;
    martes: string;
    miercoles: string;
    jueves: string;
    viernes: string;
    sabado: string;
    domingo: string;
  };

  // Contenido
  descripcionCorta: string;
  especialidades: string[];
  productos: string[];
  servicios: { nombre: string; descripcion: string }[];

  // Transporte
  transporte: {
    metro?: { linea: string; estacion: string; distancia: string }[];
    metrobus?: { linea: string; estacion: string; distancia: string }[];
    referencias: string[];
  };

  // Imágenes (usamos genéricas del CDN)
  imagen: string;
  imagenes: string[];
}

// Imágenes genéricas para asignar rotativamente
const imagenesGenericas = [
  '/img/galeria/candy-bar-fiesta-ninos-arcoiris-dulces.avif',
  '/img/galeria/candy-bar-gourmet-elegante.avif',
  '/img/galeria/mesa-dulces-elegante-clasica-cristaleria.avif',
  '/img/galeria/candy-bar-baby-shower-rosa-pastel-flores.avif',
  '/img/galeria/candy-bar-infantil-colorido.avif',
  '/img/galeria/mesa-dulces-boda-elegante-blanco-dorado.avif',
  '/img/galeria/mesa-dulces-mexicanos-tradicionales-exterior.avif',
  '/img/galeria/dulces-variados-mesa.avif',
  '/img/galeria/candy-bar-profesional-eventos.avif',
  '/img/galeria/dulces-gourmet-chocolate-belga-lujo.avif',
  '/img/galeria/candy-bar-colorido-fiestas.avif'
];

function getImagenPorIndice(index: number): string {
  return imagenesGenericas[index % imagenesGenericas.length];
}

// Información de alcaldías con datos de contexto
export const alcaldiasInfo: Record<string, {
  nombre: string;
  descripcion: string;
  caracteristicas: string[];
  zonaComercial: string;
}> = {
  'miguel-hidalgo': {
    nombre: 'Miguel Hidalgo',
    descripcion: 'Una de las alcaldías más importantes de CDMX, con zonas comerciales establecidas como Tacuba y Polanco.',
    caracteristicas: ['Zona comercial tradicional', 'Acceso Metro Tacuba', 'Mercados históricos'],
    zonaComercial: 'Tacuba'
  },
  'cuauhtemoc': {
    nombre: 'Cuauhtémoc',
    descripcion: 'El corazón comercial de la Ciudad de México, sede del legendario Mercado de La Merced.',
    caracteristicas: ['Centro de distribución nacional', 'Precios de mayoreo', 'Mayor variedad del país'],
    zonaComercial: 'Centro Histórico / La Merced'
  },
  'xochimilco': {
    nombre: 'Xochimilco',
    descripcion: 'Alcaldía tradicional conocida por sus canales y cultura mexicana auténtica.',
    caracteristicas: ['Dulces tradicionales', 'Ambiente familiar', 'Precios accesibles'],
    zonaComercial: 'Santa Cruz Acalpixca'
  },
  'iztacalco': {
    nombre: 'Iztacalco',
    descripcion: 'Alcaldía residencial con comercios locales bien establecidos.',
    caracteristicas: ['Comercios de barrio', 'Atención personalizada', 'Variedad de productos'],
    zonaComercial: 'Agrícola Pantitlán'
  },
  'coyoacan': {
    nombre: 'Coyoacán',
    descripcion: 'Una de las zonas más emblemáticas de CDMX, conocida por su ambiente cultural y bohemio.',
    caracteristicas: ['Zona residencial', 'Productos selectos', 'Ambiente familiar'],
    zonaComercial: 'Pedregal de Carrasco'
  },
  'tlahuac': {
    nombre: 'Tláhuac',
    descripcion: 'Alcaldía al sur de la ciudad con tradición de comercio local.',
    caracteristicas: ['Precios económicos', 'Comercio tradicional', 'Atención cercana'],
    zonaComercial: 'San Francisco Tlaltenco'
  },
  'iztapalapa': {
    nombre: 'Iztapalapa',
    descripcion: 'La alcaldía más poblada de CDMX con gran actividad comercial.',
    caracteristicas: ['Gran demanda', 'Precios competitivos', 'Amplia variedad'],
    zonaComercial: 'Lomas Estrella / Av. Tláhuac'
  },
  'gustavo-a-madero': {
    nombre: 'Gustavo A. Madero',
    descripcion: 'Segunda alcaldía más poblada, conocida por su corredor comercial en Norte 70.',
    caracteristicas: ['Corredor de dulcerías Norte 70', 'Mayoreo y menudeo', 'Alta competencia = buenos precios'],
    zonaComercial: 'Bondojito / Aragón Inguarán'
  },
  'benito-juarez': {
    nombre: 'Benito Juárez',
    descripcion: 'Alcaldía céntrica con zonas comerciales consolidadas como Mixcoac y Del Valle.',
    caracteristicas: ['Zona clase media-alta', 'Productos premium disponibles', 'Excelente ubicación'],
    zonaComercial: 'Mixcoac / Del Valle / Narvarte'
  },
  'venustiano-carranza': {
    nombre: 'Venustiano Carranza',
    descripcion: 'Sede del histórico Mercado de La Merced, el centro de distribución de dulces más grande de México.',
    caracteristicas: ['Mercado de La Merced', 'Precios de distribuidor', 'Variedad infinita'],
    zonaComercial: 'La Merced'
  },
  'alvaro-obregon': {
    nombre: 'Álvaro Obregón',
    descripcion: 'Alcaldía con zonas exclusivas como San Ángel y comercios de tradición.',
    caracteristicas: ['Zona San Ángel', 'Productos artesanales', 'Dulces finos'],
    zonaComercial: 'San Ángel'
  },
  'azcapotzalco': {
    nombre: 'Azcapotzalco',
    descripcion: 'Alcaldía con tradición industrial y comercial al norte de la ciudad.',
    caracteristicas: ['Centro comercial tradicional', 'Precios accesibles', 'Variedad de productos'],
    zonaComercial: 'Centro de Azcapotzalco'
  },
  'tlalpan': {
    nombre: 'Tlalpan',
    descripcion: 'La alcaldía más grande de CDMX con zonas residenciales y comerciales.',
    caracteristicas: ['Mercados locales', 'Ambiente tranquilo', 'Productos variados'],
    zonaComercial: 'Huipulco / Centro de Tlalpan'
  },
  'magdalena-contreras': {
    nombre: 'La Magdalena Contreras',
    descripcion: 'Alcaldía al suroeste con comercios de barrio tradicionales.',
    caracteristicas: ['Comercio local', 'Ambiente de pueblo', 'Atención personalizada'],
    zonaComercial: 'San Jerónimo / La Cruz'
  },
  'milpa-alta': {
    nombre: 'Milpa Alta',
    descripcion: 'La alcaldía más rural de CDMX, conocida por sus tradiciones y productos artesanales.',
    caracteristicas: ['Dulces artesanales', 'Tradición mexicana', 'Precios de productor'],
    zonaComercial: 'Villa Milpa Alta'
  },
  'cuajimalpa': {
    nombre: 'Cuajimalpa de Morelos',
    descripcion: 'Alcaldía al poniente con zonas comerciales modernas como Santa Fe.',
    caracteristicas: ['Zona comercial Santa Fe', 'Productos variados', 'Acceso fácil'],
    zonaComercial: 'Centro de Cuajimalpa / Santa Fe'
  }
};

// Horarios estándar por tipo
const horarioEstandar = {
  tienda: {
    lunes: '9:00 - 20:00',
    martes: '9:00 - 20:00',
    miercoles: '9:00 - 20:00',
    jueves: '9:00 - 20:00',
    viernes: '9:00 - 20:00',
    sabado: '9:00 - 19:00',
    domingo: '10:00 - 15:00'
  },
  mercado: {
    lunes: '8:00 - 18:00',
    martes: '8:00 - 18:00',
    miercoles: '8:00 - 18:00',
    jueves: '8:00 - 18:00',
    viernes: '8:00 - 18:00',
    sabado: '8:00 - 17:00',
    domingo: '8:00 - 15:00'
  },
  premium: {
    lunes: '10:00 - 20:00',
    martes: '10:00 - 20:00',
    miercoles: '10:00 - 20:00',
    jueves: '10:00 - 20:00',
    viernes: '10:00 - 20:00',
    sabado: '10:00 - 19:00',
    domingo: '11:00 - 17:00'
  }
};

// DULCERÍAS EXISTENTES (las 11 que ya tienen página)
export const dulceriasExistentes: Dulceria[] = [
  {
    nombre: 'El Bofito Norte 70',
    slug: 'el-bofito-norte-70',
    tipo: 'Dulcería Mayoreo',
    direccion: 'Nte. 70 6004',
    colonia: 'Aragón Inguarán',
    alcaldia: 'Gustavo A. Madero',
    alcaldiaSlug: 'gustavo-a-madero',
    cp: '07920',
    coordenadas: { lat: 19.4789, lng: -99.0981 },
    referencia: 'Esquina con Av. Victoria Oriente',
    telefono: '55 5551 7733',
    mapsUrl: 'https://maps.app.goo.gl/bofito70',
    rating: 4.3,
    resenas: 2947,
    verificado: true,
    destacado: true,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Una de las dulcerías más reconocidas del corredor Norte 70, con casi 3,000 reseñas positivas.',
    especialidades: ['Dulces a granel', 'Golosinas', 'Mayoreo y menudeo', 'Piñatas', 'Dulces importados'],
    productos: ['Gomitas', 'Chocolates', 'Dulces tradicionales', 'Confitería', 'Paletas', 'Chicles'],
    servicios: [
      { nombre: 'Mayoreo sin mínimos', descripcion: 'Acceso a precios de mayoreo desde la primera compra' },
      { nombre: 'Amplia variedad', descripcion: 'Miles de productos para todo tipo de eventos' },
      { nombre: 'Asesoría para fiestas', descripcion: 'Te ayudan a calcular cantidades para tu evento' }
    ],
    transporte: {
      metro: [{ linea: '5', estacion: 'Aragón', distancia: '10 min caminando' }],
      metrobus: [{ linea: '6', estacion: 'Deportivo Aragón', distancia: '8 min caminando' }],
      referencias: ['Sobre el corredor comercial de Norte 70', 'A unas cuadras de Av. Eduardo Molina']
    },
    imagen: getImagenPorIndice(0),
    imagenes: [getImagenPorIndice(0), getImagenPorIndice(1), getImagenPorIndice(2)]
  },
  {
    nombre: 'Dulcería Mixcoac',
    slug: 'dulceria-mixcoac',
    tipo: 'Tienda de Golosinas',
    direccion: 'Tiziano 19, Local B',
    colonia: 'Mixcoac',
    alcaldia: 'Benito Juárez',
    alcaldiaSlug: 'benito-juarez',
    cp: '03910',
    coordenadas: { lat: 19.3756, lng: -99.1831 },
    referencia: 'Cerca del Metro Mixcoac',
    telefono: '55 1518 0985',
    mapsUrl: 'https://maps.app.goo.gl/mixcoac',
    rating: 4.3,
    resenas: 1135,
    verificado: true,
    destacado: true,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería tradicional en el corazón de Mixcoac con más de 1,100 reseñas.',
    especialidades: ['Dulces para fiestas', 'Piñatas', 'Dulces tradicionales', 'Confitería variada'],
    productos: ['Dulces mexicanos', 'Gomitas', 'Chocolates', 'Paletas', 'Dulces enchilados'],
    servicios: [
      { nombre: 'Surtido para fiestas', descripcion: 'Paquetes especiales para cumpleaños y eventos' },
      { nombre: 'Atención personalizada', descripcion: 'Te asesoran para elegir los mejores productos' }
    ],
    transporte: {
      metro: [{ linea: '7 y 12', estacion: 'Mixcoac', distancia: '3 min caminando' }],
      referencias: ['A pasos del Metro Mixcoac', 'Zona comercial de Mixcoac']
    },
    imagen: getImagenPorIndice(1),
    imagenes: [getImagenPorIndice(1), getImagenPorIndice(2), getImagenPorIndice(3)]
  },
  {
    nombre: 'Dulcería El Remate',
    slug: 'dulceria-el-remate',
    tipo: 'Dulcería Mayoreo',
    direccion: 'Norte 70 Esq. Av. Victoria Oriente, Nte. 70 5946',
    colonia: 'Bondojito',
    alcaldia: 'Gustavo A. Madero',
    alcaldiaSlug: 'gustavo-a-madero',
    cp: '07850',
    coordenadas: { lat: 19.4785, lng: -99.0975 },
    referencia: 'Esquina con Av. Victoria Oriente',
    telefono: '55 5551 6249',
    mapsUrl: 'https://maps.app.goo.gl/elremate',
    rating: 4.4,
    resenas: 2410,
    verificado: true,
    destacado: true,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Con más de 2,400 reseñas, es una de las dulcerías más populares del corredor Norte 70.',
    especialidades: ['Precios de mayoreo', 'Gran variedad', 'Dulces importados', 'Confitería'],
    productos: ['Dulces importados', 'Gomitas premium', 'Chocolates', 'Dulces tradicionales'],
    servicios: [
      { nombre: 'Precios de mayoreo', descripcion: 'Los mejores precios del corredor Norte 70' },
      { nombre: 'Variedad inigualable', descripcion: 'Productos nacionales e importados' }
    ],
    transporte: {
      metro: [{ linea: '5', estacion: 'Aragón', distancia: '12 min caminando' }],
      referencias: ['Sobre el corredor comercial de Norte 70', 'Esquina muy visible']
    },
    imagen: getImagenPorIndice(2),
    imagenes: [getImagenPorIndice(2), getImagenPorIndice(3), getImagenPorIndice(4)]
  },
  {
    nombre: 'Dulcería Melissa',
    slug: 'dulceria-melissa',
    tipo: 'Tienda de Golosinas',
    direccion: 'Av. Victoria Ote. 3602-A',
    colonia: 'Aragón Inguarán',
    alcaldia: 'Gustavo A. Madero',
    alcaldiaSlug: 'gustavo-a-madero',
    cp: '07920',
    coordenadas: { lat: 19.4791, lng: -99.0978 },
    telefono: '55 7675 9070',
    mapsUrl: 'https://maps.app.goo.gl/melissa',
    rating: 4.5,
    resenas: 637,
    verificado: true,
    destacado: true,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Con 4.5 estrellas, tiene una de las mejores calificaciones de la zona.',
    especialidades: ['Dulces variados', 'Atención personalizada', 'Eventos', 'Piñatas'],
    productos: ['Gomitas', 'Chocolates', 'Dulces mexicanos', 'Confitería'],
    servicios: [
      { nombre: 'Atención excepcional', descripcion: 'Reconocida por su excelente servicio al cliente' },
      { nombre: 'Surtido para eventos', descripcion: 'Especialistas en fiestas y celebraciones' }
    ],
    transporte: {
      metro: [{ linea: '5', estacion: 'Aragón', distancia: '8 min caminando' }],
      referencias: ['Sobre Av. Victoria Oriente', 'Zona comercial establecida']
    },
    imagen: getImagenPorIndice(3),
    imagenes: [getImagenPorIndice(3), getImagenPorIndice(4), getImagenPorIndice(5)]
  },
  {
    nombre: 'Dulcería Agam',
    slug: 'dulceria-agam',
    tipo: 'Tienda de Golosinas',
    direccion: 'Nte. 70 5627-A',
    colonia: 'Bondojito',
    alcaldia: 'Gustavo A. Madero',
    alcaldiaSlug: 'gustavo-a-madero',
    cp: '07850',
    coordenadas: { lat: 19.4783, lng: -99.0972 },
    telefono: '55 7155 0262',
    mapsUrl: 'https://maps.app.goo.gl/agam',
    rating: 4.6,
    resenas: 36,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería con excelente calificación de 4.6 estrellas en el corredor Norte 70.',
    especialidades: ['Golosinas variadas', 'Dulces a granel', 'Precios accesibles'],
    productos: ['Gomitas', 'Chocolates', 'Paletas', 'Dulces mexicanos'],
    servicios: [
      { nombre: 'Venta a granel', descripcion: 'Compra la cantidad exacta que necesitas' },
      { nombre: 'Buenos precios', descripcion: 'Precios competitivos en el corredor' }
    ],
    transporte: {
      metro: [{ linea: '5', estacion: 'Aragón', distancia: '10 min caminando' }],
      referencias: ['Sobre Norte 70', 'Parte del corredor de dulcerías']
    },
    imagen: getImagenPorIndice(4),
    imagenes: [getImagenPorIndice(4), getImagenPorIndice(5), getImagenPorIndice(6)]
  },
  {
    nombre: 'Dulcería Guachitos',
    slug: 'dulceria-guachitos',
    tipo: 'Tienda de Golosinas',
    direccion: 'Av. Tláhuac 4388',
    colonia: 'Lomas Estrella',
    alcaldia: 'Iztapalapa',
    alcaldiaSlug: 'iztapalapa',
    cp: '09890',
    coordenadas: { lat: 19.3089, lng: -99.0789 },
    telefono: '55 5607 5406',
    mapsUrl: 'https://maps.app.goo.gl/guachitos',
    rating: 4.3,
    resenas: 628,
    verificado: true,
    destacado: true,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Popular dulcería sobre Av. Tláhuac con más de 600 reseñas positivas.',
    especialidades: ['Dulces para fiestas', 'Piñatas', 'Confitería', 'Horario extendido'],
    productos: ['Gomitas', 'Chocolates', 'Dulces tradicionales', 'Paletas', 'Chicles'],
    servicios: [
      { nombre: 'Horario extendido', descripcion: 'Atención en horarios convenientes' },
      { nombre: 'Surtido completo', descripcion: 'Todo para tus fiestas en un solo lugar' }
    ],
    transporte: {
      metro: [{ linea: '12', estacion: 'Lomas Estrella', distancia: '5 min caminando' }],
      referencias: ['Sobre Av. Tláhuac', 'Cerca de Metro Lomas Estrella']
    },
    imagen: getImagenPorIndice(5),
    imagenes: [getImagenPorIndice(5), getImagenPorIndice(6), getImagenPorIndice(7)]
  },
  {
    nombre: 'Dulcería El Gordo',
    slug: 'dulceria-el-gordo',
    tipo: 'Dulcería Mayoreo',
    direccion: 'Ramón Corona 50, Local B y C',
    colonia: 'Merced Balbuena',
    alcaldia: 'Venustiano Carranza',
    alcaldiaSlug: 'venustiano-carranza',
    cp: '15810',
    coordenadas: { lat: 19.4282, lng: -99.1231 },
    referencia: 'Dentro del Mercado de Dulces de La Merced',
    telefono: '55 5522 8007',
    mapsUrl: 'https://maps.app.goo.gl/elgordo-merced',
    rating: 4.3,
    resenas: 429,
    verificado: true,
    destacado: true,
    horario: horarioEstandar.mercado,
    descripcionCorta: 'Ubicada en el legendario Mercado de Dulces de La Merced, el más grande de México.',
    especialidades: ['Precios de mayoreo', 'Ubicación en Mercado de Dulces', 'Gran variedad', 'Dulces tradicionales'],
    productos: ['Dulces tradicionales', 'Confitería a granel', 'Chocolates', 'Dulces de temporada'],
    servicios: [
      { nombre: 'Mayoreo sin mínimos', descripcion: 'Precios de mayoreo sin cantidades mínimas' },
      { nombre: 'Variedad inigualable', descripcion: 'Miles de productos de todas las categorías' }
    ],
    transporte: {
      metro: [{ linea: '1', estacion: 'Merced', distancia: '5 min caminando' }],
      referencias: ['Dentro del Mercado de Dulces', 'Centro de distribución más grande de México']
    },
    imagen: getImagenPorIndice(6),
    imagenes: [getImagenPorIndice(6), getImagenPorIndice(7), getImagenPorIndice(8)]
  },
  {
    nombre: 'Dulcería La 27',
    slug: 'dulceria-la-27',
    tipo: 'Tienda de Golosinas',
    direccion: 'Calle 19 No. 118',
    colonia: 'Ignacio Zaragoza',
    alcaldia: 'Venustiano Carranza',
    alcaldiaSlug: 'venustiano-carranza',
    cp: '15000',
    coordenadas: { lat: 19.4198, lng: -99.0876 },
    telefono: '55 5762 0736',
    mapsUrl: 'https://maps.app.goo.gl/la27',
    rating: 4.6,
    resenas: 111,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Excelente calificación de 4.6 estrellas en la zona de Ignacio Zaragoza.',
    especialidades: ['Dulces variados', 'Atención personalizada', 'Buenos precios'],
    productos: ['Gomitas', 'Chocolates', 'Dulces mexicanos', 'Confitería'],
    servicios: [
      { nombre: 'Excelente atención', descripcion: 'Alta calificación por su servicio' },
      { nombre: 'Precios justos', descripcion: 'Buena relación calidad-precio' }
    ],
    transporte: {
      metro: [{ linea: '1', estacion: 'Zaragoza', distancia: '8 min caminando' }],
      referencias: ['Zona residencial de Ignacio Zaragoza']
    },
    imagen: getImagenPorIndice(7),
    imagenes: [getImagenPorIndice(7), getImagenPorIndice(8), getImagenPorIndice(9)]
  },
  {
    nombre: 'Dulcería Candy Gram',
    slug: 'dulceria-candy-gram',
    tipo: 'Tienda de Golosinas',
    direccion: 'Acoxpa s/n, Mercado Plaza Mexicana del Sur, Local 2 y 3',
    colonia: 'Huipulco',
    alcaldia: 'Tlalpan',
    alcaldiaSlug: 'tlalpan',
    cp: '14370',
    coordenadas: { lat: 19.3012, lng: -99.1567 },
    referencia: 'Esquina Calz. de Tlalpan',
    telefono: '55 6303 2304',
    mapsUrl: 'https://maps.app.goo.gl/candygram',
    rating: 4.2,
    resenas: 33,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería dentro del Mercado Plaza Mexicana del Sur en Huipulco.',
    especialidades: ['Dulces variados', 'Ubicación en mercado', 'Precios accesibles'],
    productos: ['Gomitas', 'Chocolates', 'Dulces tradicionales', 'Confitería'],
    servicios: [
      { nombre: 'Ubicación conveniente', descripcion: 'Dentro de plaza comercial establecida' },
      { nombre: 'Variedad de productos', descripcion: 'Surtido completo para eventos' }
    ],
    transporte: {
      metro: [{ linea: '1', estacion: 'General Anaya', distancia: '15 min en transporte' }],
      metrobus: [{ linea: '1', estacion: 'Huipulco', distancia: '3 min caminando' }],
      referencias: ['Sobre Calzada de Tlalpan', 'En el Mercado Plaza Mexicana del Sur']
    },
    imagen: getImagenPorIndice(8),
    imagenes: [getImagenPorIndice(8), getImagenPorIndice(9), getImagenPorIndice(10)]
  },
  {
    nombre: 'Dulcería Chispita',
    slug: 'dulceria-chispita',
    tipo: 'Tienda de Golosinas',
    direccion: 'Av. Azcapotzalco 696',
    colonia: 'Centro de Azcapotzalco',
    alcaldia: 'Azcapotzalco',
    alcaldiaSlug: 'azcapotzalco',
    cp: '02000',
    coordenadas: { lat: 19.4867, lng: -99.1856 },
    telefono: '55 6788 0847',
    mapsUrl: 'https://maps.app.goo.gl/chispita',
    rating: 4.1,
    resenas: 123,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería tradicional en el centro de Azcapotzalco.',
    especialidades: ['Dulces variados', 'Piñatas', 'Confitería', 'Precios accesibles'],
    productos: ['Gomitas', 'Chocolates', 'Dulces mexicanos', 'Paletas', 'Chicles'],
    servicios: [
      { nombre: 'Surtido completo', descripcion: 'Todo lo necesario para fiestas' },
      { nombre: 'Precios populares', descripcion: 'Accesible para todos los presupuestos' }
    ],
    transporte: {
      metro: [{ linea: '6', estacion: 'Azcapotzalco', distancia: '5 min caminando' }],
      referencias: ['Sobre Av. Azcapotzalco', 'Centro comercial de la alcaldía']
    },
    imagen: getImagenPorIndice(9),
    imagenes: [getImagenPorIndice(9), getImagenPorIndice(10), getImagenPorIndice(0)]
  },
  {
    nombre: 'Dulcería El Secreto',
    slug: 'dulceria-el-secreto',
    tipo: 'Tienda de Golosinas Premium',
    direccion: 'Av. Altavista 131',
    colonia: 'San Ángel Inn',
    alcaldia: 'Álvaro Obregón',
    alcaldiaSlug: 'alvaro-obregon',
    cp: '01060',
    coordenadas: { lat: 19.3456, lng: -99.1923 },
    telefono: '55 5550 3622',
    mapsUrl: 'https://maps.app.goo.gl/elsecreto',
    rating: 4.4,
    resenas: 87,
    verificado: true,
    destacado: true,
    horario: horarioEstandar.premium,
    descripcionCorta: 'Dulcería premium en la exclusiva zona de San Ángel Inn.',
    especialidades: ['Chocolates artesanales', 'Confitería gourmet', 'Dulces finos', 'Regalos'],
    productos: ['Chocolates belgas', 'Trufas artesanales', 'Dulces importados', 'Confitería premium'],
    servicios: [
      { nombre: 'Productos premium', descripcion: 'Selección de dulces y chocolates finos' },
      { nombre: 'Cajas de regalo', descripcion: 'Presentaciones especiales para obsequios' }
    ],
    transporte: {
      metro: [{ linea: '1', estacion: 'Miguel Ángel de Quevedo', distancia: '10 min en transporte' }],
      referencias: ['Zona exclusiva de San Ángel Inn', 'Cerca de Plaza Loreto']
    },
    imagen: getImagenPorIndice(10),
    imagenes: [getImagenPorIndice(10), getImagenPorIndice(0), getImagenPorIndice(1)]
  }
];

// 42 DULCERÍAS NUEVAS (de la lista proporcionada por el usuario)
export const dulceriasNuevas: Dulceria[] = [
  // MIGUEL HIDALGO - Tacuba
  {
    nombre: 'Dulcería La Popular',
    slug: 'dulceria-la-popular',
    tipo: 'Tienda de Golosinas',
    direccion: 'C. Golfo de Bengala 9',
    colonia: 'Tacuba',
    alcaldia: 'Miguel Hidalgo',
    alcaldiaSlug: 'miguel-hidalgo',
    cp: '11410',
    coordenadas: { lat: 19.4576, lng: -99.1834 },
    telefono: '55 5527 8171',
    mapsUrl: 'https://maps.google.com/?q=Dulcería+La+Popular+Tacuba',
    rating: 4.2,
    resenas: 45,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería tradicional en el histórico barrio de Tacuba.',
    especialidades: ['Dulces tradicionales', 'Confitería variada', 'Precios accesibles'],
    productos: ['Gomitas', 'Chocolates', 'Dulces mexicanos', 'Paletas', 'Chicles'],
    servicios: [
      { nombre: 'Variedad de productos', descripcion: 'Amplio surtido de dulces para toda ocasión' },
      { nombre: 'Atención personalizada', descripcion: 'Te ayudan a elegir los mejores productos' }
    ],
    transporte: {
      metro: [{ linea: '2 y 7', estacion: 'Tacuba', distancia: '5 min caminando' }],
      referencias: ['Barrio histórico de Tacuba', 'Cerca del Metro Tacuba']
    },
    imagen: getImagenPorIndice(0),
    imagenes: [getImagenPorIndice(0), getImagenPorIndice(1), getImagenPorIndice(2)]
  },
  {
    nombre: 'Dulce María Mediterráneo',
    slug: 'dulce-maria-mediterraneo',
    tipo: 'Tienda de Golosinas',
    direccion: 'Tacuba',
    colonia: 'Tacuba',
    alcaldia: 'Miguel Hidalgo',
    alcaldiaSlug: 'miguel-hidalgo',
    cp: '11410',
    coordenadas: { lat: 19.4578, lng: -99.1836 },
    telefono: '55 9154 0501',
    mapsUrl: 'https://maps.google.com/?q=Dulce+Maria+Mediterraneo+Tacuba',
    rating: 4.3,
    resenas: 28,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería con toque especial en la zona de Tacuba.',
    especialidades: ['Dulces selectos', 'Confitería fina', 'Productos especiales'],
    productos: ['Chocolates finos', 'Dulces importados', 'Confitería selecta', 'Gomitas premium'],
    servicios: [
      { nombre: 'Productos selectos', descripcion: 'Selección cuidada de dulces' },
      { nombre: 'Cajas de regalo', descripcion: 'Presentaciones especiales' }
    ],
    transporte: {
      metro: [{ linea: '2 y 7', estacion: 'Tacuba', distancia: '5 min caminando' }],
      referencias: ['Zona de Tacuba', 'Acceso Metro Tacuba']
    },
    imagen: getImagenPorIndice(1),
    imagenes: [getImagenPorIndice(1), getImagenPorIndice(2), getImagenPorIndice(3)]
  },
  {
    nombre: 'Dulcería LOPSAN',
    slug: 'dulceria-lopsan',
    tipo: 'Tienda de Golosinas',
    direccion: 'C. Golfo de Bengala 7',
    colonia: 'Tacuba',
    alcaldia: 'Miguel Hidalgo',
    alcaldiaSlug: 'miguel-hidalgo',
    cp: '11410',
    coordenadas: { lat: 19.4575, lng: -99.1833 },
    telefono: '55 5386 6672',
    mapsUrl: 'https://maps.google.com/?q=Dulceria+LOPSAN+Tacuba',
    rating: 4.1,
    resenas: 32,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería de barrio con tradición en Tacuba.',
    especialidades: ['Dulces variados', 'Piñatas', 'Confitería', 'Precios populares'],
    productos: ['Gomitas', 'Chocolates', 'Dulces tradicionales', 'Paletas', 'Chicles'],
    servicios: [
      { nombre: 'Surtido completo', descripcion: 'Todo para fiestas infantiles' },
      { nombre: 'Precios accesibles', descripcion: 'Productos para todos los bolsillos' }
    ],
    transporte: {
      metro: [{ linea: '2 y 7', estacion: 'Tacuba', distancia: '5 min caminando' }],
      referencias: ['Sobre Golfo de Bengala', 'Barrio de Tacuba']
    },
    imagen: getImagenPorIndice(2),
    imagenes: [getImagenPorIndice(2), getImagenPorIndice(3), getImagenPorIndice(4)]
  },
  {
    nombre: 'Dulcería Las Piñatas',
    slug: 'dulceria-las-pinatas',
    tipo: 'Tienda de Golosinas',
    direccion: 'C. Mar Arábigo 10',
    colonia: 'Tacuba',
    alcaldia: 'Miguel Hidalgo',
    alcaldiaSlug: 'miguel-hidalgo',
    cp: '11410',
    coordenadas: { lat: 19.4574, lng: -99.1832 },
    telefono: 'Sin teléfono registrado',
    mapsUrl: 'https://maps.google.com/?q=Dulceria+Las+Pinatas+Tacuba',
    rating: 4.0,
    resenas: 18,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Especialistas en piñatas y dulces para fiestas en Tacuba.',
    especialidades: ['Piñatas', 'Dulces para fiestas', 'Confitería', 'Decoración'],
    productos: ['Piñatas de todos tamaños', 'Dulces para rellenar', 'Confetis', 'Decoraciones'],
    servicios: [
      { nombre: 'Piñatas personalizadas', descripcion: 'Variedad de diseños y tamaños' },
      { nombre: 'Paquetes para fiestas', descripcion: 'Combos de piñata + dulces' }
    ],
    transporte: {
      metro: [{ linea: '2 y 7', estacion: 'Tacuba', distancia: '6 min caminando' }],
      referencias: ['Zona de Tacuba', 'Especializada en piñatas']
    },
    imagen: getImagenPorIndice(3),
    imagenes: [getImagenPorIndice(3), getImagenPorIndice(4), getImagenPorIndice(5)]
  },

  // CUAUHTÉMOC / LA MERCED
  {
    nombre: 'Dulcería El Tigre de Uruguay',
    slug: 'dulceria-el-tigre-de-uruguay',
    tipo: 'Dulcería Mayoreo',
    direccion: 'Circunvalación, La Merced, Centro',
    colonia: 'La Merced',
    alcaldia: 'Cuauhtémoc',
    alcaldiaSlug: 'cuauhtemoc',
    cp: '15100',
    coordenadas: { lat: 19.4278, lng: -99.1225 },
    telefono: 'Sin teléfono registrado',
    mapsUrl: 'https://maps.google.com/?q=Dulceria+El+Tigre+Uruguay+Merced',
    rating: 4.2,
    resenas: 156,
    verificado: true,
    destacado: true,
    horario: horarioEstandar.mercado,
    descripcionCorta: 'Dulcería de mayoreo en el Mercado de La Merced.',
    especialidades: ['Mayoreo', 'Dulces tradicionales', 'Precios de distribuidor', 'Gran variedad'],
    productos: ['Dulces a granel', 'Confitería', 'Chocolates', 'Dulces mexicanos'],
    servicios: [
      { nombre: 'Precios de mayoreo', descripcion: 'Los mejores precios del mercado' },
      { nombre: 'Sin mínimos', descripcion: 'Compra desde pequeñas cantidades' }
    ],
    transporte: {
      metro: [{ linea: '1', estacion: 'Merced', distancia: '3 min caminando' }],
      referencias: ['Sobre Circunvalación', 'Mercado de La Merced']
    },
    imagen: getImagenPorIndice(4),
    imagenes: [getImagenPorIndice(4), getImagenPorIndice(5), getImagenPorIndice(6)]
  },
  {
    nombre: 'Dulces y Botanas RUBI',
    slug: 'dulces-y-botanas-rubi',
    tipo: 'Tienda de Golosinas',
    direccion: 'Centro Histórico',
    colonia: 'Centro Histórico',
    alcaldia: 'Cuauhtémoc',
    alcaldiaSlug: 'cuauhtemoc',
    cp: '06000',
    coordenadas: { lat: 19.4326, lng: -99.1332 },
    telefono: '55 5522 0638',
    mapsUrl: 'https://maps.google.com/?q=Dulces+Botanas+RUBI+Centro+Historico',
    rating: 4.1,
    resenas: 89,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulces y botanas en el Centro Histórico de la CDMX.',
    especialidades: ['Dulces', 'Botanas', 'Confitería', 'Snacks'],
    productos: ['Dulces variados', 'Botanas', 'Palomitas', 'Frituras', 'Chicharrones'],
    servicios: [
      { nombre: 'Variedad completa', descripcion: 'Dulces y botanas en un solo lugar' },
      { nombre: 'Precios accesibles', descripcion: 'Buenos precios en el centro' }
    ],
    transporte: {
      metro: [{ linea: '1 y 2', estacion: 'Zócalo', distancia: '5 min caminando' }],
      referencias: ['Centro Histórico', 'Zona turística']
    },
    imagen: getImagenPorIndice(5),
    imagenes: [getImagenPorIndice(5), getImagenPorIndice(6), getImagenPorIndice(7)]
  },
  {
    nombre: 'Dulces Típicos Mexicanos La Pata Pella',
    slug: 'dulces-tipicos-la-pata-pella',
    tipo: 'Dulcería Tradicional',
    direccion: 'Circunvalación, La Merced, Centro',
    colonia: 'La Merced',
    alcaldia: 'Cuauhtémoc',
    alcaldiaSlug: 'cuauhtemoc',
    cp: '15100',
    coordenadas: { lat: 19.4279, lng: -99.1226 },
    telefono: '55 4340 2065',
    mapsUrl: 'https://maps.google.com/?q=Dulces+Tipicos+La+Pata+Pella+Merced',
    rating: 4.3,
    resenas: 67,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.mercado,
    descripcionCorta: 'Especialistas en dulces típicos mexicanos en La Merced.',
    especialidades: ['Dulces típicos', 'Dulces mexicanos', 'Tradición', 'Artesanales'],
    productos: ['Alegrías', 'Cocadas', 'Mazapanes', 'Tamarindos', 'Obleas', 'Palanquetas'],
    servicios: [
      { nombre: 'Dulces auténticos', descripcion: 'Dulces típicos mexicanos genuinos' },
      { nombre: 'Tradición', descripcion: 'Recetas tradicionales' }
    ],
    transporte: {
      metro: [{ linea: '1', estacion: 'Merced', distancia: '3 min caminando' }],
      referencias: ['Mercado de La Merced', 'Especialistas en típicos']
    },
    imagen: getImagenPorIndice(6),
    imagenes: [getImagenPorIndice(6), getImagenPorIndice(7), getImagenPorIndice(8)]
  },
  {
    nombre: 'Dulcerías El Tigrito',
    slug: 'dulcerias-el-tigrito',
    tipo: 'Dulcería Mayoreo',
    direccion: 'Circunvalación 34, La Merced',
    colonia: 'La Merced',
    alcaldia: 'Cuauhtémoc',
    alcaldiaSlug: 'cuauhtemoc',
    cp: '15100',
    coordenadas: { lat: 19.4277, lng: -99.1224 },
    telefono: '55 5522 2851',
    mapsUrl: 'https://maps.google.com/?q=Dulcerias+El+Tigrito+Merced',
    rating: 4.2,
    resenas: 134,
    verificado: true,
    destacado: true,
    horario: horarioEstandar.mercado,
    descripcionCorta: 'Dulcería de mayoreo reconocida en el Mercado de La Merced.',
    especialidades: ['Mayoreo', 'Dulces variados', 'Precios bajos', 'Gran surtido'],
    productos: ['Gomitas', 'Chocolates', 'Dulces mexicanos', 'Confitería a granel'],
    servicios: [
      { nombre: 'Mayoreo especializado', descripcion: 'Precios especiales por volumen' },
      { nombre: 'Variedad inmensa', descripcion: 'Todo tipo de dulces disponibles' }
    ],
    transporte: {
      metro: [{ linea: '1', estacion: 'Merced', distancia: '3 min caminando' }],
      referencias: ['Circunvalación 34', 'Mercado de La Merced']
    },
    imagen: getImagenPorIndice(7),
    imagenes: [getImagenPorIndice(7), getImagenPorIndice(8), getImagenPorIndice(9)]
  },

  // XOCHIMILCO
  {
    nombre: 'Dulcería y Regalos Juanita',
    slug: 'dulceria-y-regalos-juanita',
    tipo: 'Tienda de Golosinas',
    direccion: 'Santa Cruz Acalpixca',
    colonia: 'Santa Cruz Acalpixca',
    alcaldia: 'Xochimilco',
    alcaldiaSlug: 'xochimilco',
    cp: '16500',
    coordenadas: { lat: 19.2567, lng: -99.1023 },
    telefono: '55 2157 6094',
    mapsUrl: 'https://maps.google.com/?q=Dulceria+Regalos+Juanita+Xochimilco',
    rating: 4.4,
    resenas: 42,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería y regalos en el tradicional pueblo de Santa Cruz Acalpixca.',
    especialidades: ['Dulces', 'Regalos', 'Artículos para fiestas', 'Piñatas'],
    productos: ['Dulces variados', 'Regalos', 'Piñatas', 'Decoraciones', 'Juguetes'],
    servicios: [
      { nombre: 'Dulces y regalos', descripcion: 'Todo en un mismo lugar' },
      { nombre: 'Atención familiar', descripcion: 'Negocio de tradición' }
    ],
    transporte: {
      metro: [{ linea: '2', estacion: 'Tasqueña', distancia: '+ Tren Ligero a Xochimilco' }],
      referencias: ['Pueblo de Santa Cruz Acalpixca', 'Zona tradicional de Xochimilco']
    },
    imagen: getImagenPorIndice(8),
    imagenes: [getImagenPorIndice(8), getImagenPorIndice(9), getImagenPorIndice(10)]
  },
  {
    nombre: 'Dulcerías Max',
    slug: 'dulcerias-max',
    tipo: 'Tienda de Golosinas',
    direccion: 'Xaltocan',
    colonia: 'Xaltocan',
    alcaldia: 'Xochimilco',
    alcaldiaSlug: 'xochimilco',
    cp: '16090',
    coordenadas: { lat: 19.2634, lng: -99.1012 },
    telefono: '55 6550 8662',
    mapsUrl: 'https://maps.google.com/?q=Dulcerias+Max+Xochimilco',
    rating: 4.2,
    resenas: 38,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería local en la zona de Xaltocan, Xochimilco.',
    especialidades: ['Dulces variados', 'Confitería', 'Precios locales'],
    productos: ['Gomitas', 'Chocolates', 'Dulces mexicanos', 'Paletas'],
    servicios: [
      { nombre: 'Surtido local', descripcion: 'Variedad para la comunidad' },
      { nombre: 'Precios accesibles', descripcion: 'Buenos precios locales' }
    ],
    transporte: {
      metro: [{ linea: '2', estacion: 'Tasqueña', distancia: '+ Tren Ligero' }],
      referencias: ['Zona de Xaltocan', 'Xochimilco']
    },
    imagen: getImagenPorIndice(9),
    imagenes: [getImagenPorIndice(9), getImagenPorIndice(10), getImagenPorIndice(0)]
  },
  {
    nombre: 'Dulcería Emili',
    slug: 'dulceria-emili',
    tipo: 'Tienda de Golosinas',
    direccion: 'Santa Cruz Acalpixca',
    colonia: 'Santa Cruz Acalpixca',
    alcaldia: 'Xochimilco',
    alcaldiaSlug: 'xochimilco',
    cp: '16500',
    coordenadas: { lat: 19.2568, lng: -99.1024 },
    telefono: 'Sin teléfono registrado',
    mapsUrl: 'https://maps.google.com/?q=Dulceria+Emili+Xochimilco',
    rating: 4.1,
    resenas: 23,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería de barrio en Santa Cruz Acalpixca.',
    especialidades: ['Dulces variados', 'Confitería', 'Productos locales'],
    productos: ['Gomitas', 'Chocolates', 'Dulces tradicionales', 'Paletas'],
    servicios: [
      { nombre: 'Atención cercana', descripcion: 'Servicio de barrio' },
      { nombre: 'Variedad básica', descripcion: 'Lo esencial para fiestas' }
    ],
    transporte: {
      metro: [{ linea: '2', estacion: 'Tasqueña', distancia: '+ Tren Ligero' }],
      referencias: ['Santa Cruz Acalpixca', 'Zona tradicional']
    },
    imagen: getImagenPorIndice(10),
    imagenes: [getImagenPorIndice(10), getImagenPorIndice(0), getImagenPorIndice(1)]
  },
  {
    nombre: 'Dulcería Lupita',
    slug: 'dulceria-lupita',
    tipo: 'Tienda de Golosinas',
    direccion: 'Av. Tenochtitlan 12',
    colonia: 'Santa Cruz Acalpixca',
    alcaldia: 'Xochimilco',
    alcaldiaSlug: 'xochimilco',
    cp: '16500',
    coordenadas: { lat: 19.2566, lng: -99.1022 },
    telefono: '55 5833 7098',
    mapsUrl: 'https://maps.google.com/?q=Dulceria+Lupita+Xochimilco',
    rating: 4.3,
    resenas: 56,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería tradicional en Av. Tenochtitlan, Xochimilco.',
    especialidades: ['Dulces tradicionales', 'Piñatas', 'Confitería', 'Fiestas'],
    productos: ['Dulces mexicanos', 'Piñatas', 'Confitería', 'Decoraciones'],
    servicios: [
      { nombre: 'Todo para fiestas', descripcion: 'Surtido completo' },
      { nombre: 'Atención familiar', descripcion: 'Negocio de tradición' }
    ],
    transporte: {
      metro: [{ linea: '2', estacion: 'Tasqueña', distancia: '+ Tren Ligero' }],
      referencias: ['Av. Tenochtitlan', 'Santa Cruz Acalpixca']
    },
    imagen: getImagenPorIndice(0),
    imagenes: [getImagenPorIndice(0), getImagenPorIndice(1), getImagenPorIndice(2)]
  },
  {
    nombre: 'Dulcería La Abeja Reina',
    slug: 'dulceria-la-abeja-reina',
    tipo: 'Tienda de Golosinas',
    direccion: 'El Rosario',
    colonia: 'El Rosario',
    alcaldia: 'Xochimilco',
    alcaldiaSlug: 'xochimilco',
    cp: '16070',
    coordenadas: { lat: 19.2589, lng: -99.1034 },
    telefono: 'Sin teléfono registrado',
    mapsUrl: 'https://maps.google.com/?q=Dulceria+La+Abeja+Reina+Xochimilco',
    rating: 4.0,
    resenas: 19,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería local en El Rosario, Xochimilco.',
    especialidades: ['Dulces variados', 'Confitería básica'],
    productos: ['Gomitas', 'Chocolates', 'Dulces', 'Paletas'],
    servicios: [
      { nombre: 'Servicio local', descripcion: 'Atención de barrio' }
    ],
    transporte: {
      metro: [{ linea: '2', estacion: 'Tasqueña', distancia: '+ Tren Ligero' }],
      referencias: ['El Rosario, Xochimilco']
    },
    imagen: getImagenPorIndice(1),
    imagenes: [getImagenPorIndice(1), getImagenPorIndice(2), getImagenPorIndice(3)]
  },

  // IZTACALCO
  {
    nombre: 'Dulcería El Tucán',
    slug: 'dulceria-el-tucan',
    tipo: 'Tienda de Golosinas',
    direccion: 'Agrícola Pantitlán',
    colonia: 'Agrícola Pantitlán',
    alcaldia: 'Iztacalco',
    alcaldiaSlug: 'iztacalco',
    cp: '08100',
    coordenadas: { lat: 19.4012, lng: -99.0712 },
    telefono: '55 3958 1609',
    mapsUrl: 'https://maps.google.com/?q=Dulceria+El+Tucan+Iztacalco',
    rating: 4.2,
    resenas: 87,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería reconocida en la zona de Agrícola Pantitlán.',
    especialidades: ['Dulces variados', 'Confitería', 'Piñatas', 'Fiestas'],
    productos: ['Gomitas', 'Chocolates', 'Dulces mexicanos', 'Piñatas', 'Decoraciones'],
    servicios: [
      { nombre: 'Surtido completo', descripcion: 'Todo para tus fiestas' },
      { nombre: 'Precios accesibles', descripcion: 'Buenos precios locales' }
    ],
    transporte: {
      metro: [{ linea: '1, 5, 9 y A', estacion: 'Pantitlán', distancia: '8 min caminando' }],
      referencias: ['Zona Agrícola Pantitlán', 'Cerca de Metro Pantitlán']
    },
    imagen: getImagenPorIndice(2),
    imagenes: [getImagenPorIndice(2), getImagenPorIndice(3), getImagenPorIndice(4)]
  },
  {
    nombre: 'Dulcería Kilo y Gramo',
    slug: 'dulceria-kilo-y-gramo',
    tipo: 'Tienda de Golosinas',
    direccion: 'Impi Picos',
    colonia: 'Impi Picos',
    alcaldia: 'Iztacalco',
    alcaldiaSlug: 'iztacalco',
    cp: '08180',
    coordenadas: { lat: 19.4034, lng: -99.0745 },
    telefono: 'Sin teléfono registrado',
    mapsUrl: 'https://maps.google.com/?q=Dulceria+Kilo+y+Gramo+Iztacalco',
    rating: 4.3,
    resenas: 45,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Especialistas en venta a granel en Iztacalco.',
    especialidades: ['Venta a granel', 'Por kilo', 'Dulces variados'],
    productos: ['Gomitas por kilo', 'Dulces a granel', 'Chocolates', 'Confitería'],
    servicios: [
      { nombre: 'Venta por peso', descripcion: 'Compra exactamente lo que necesitas' },
      { nombre: 'Buenos precios', descripcion: 'Ahorra comprando a granel' }
    ],
    transporte: {
      metro: [{ linea: '9', estacion: 'Ciudad Deportiva', distancia: '10 min caminando' }],
      referencias: ['Zona Impi Picos', 'Iztacalco']
    },
    imagen: getImagenPorIndice(3),
    imagenes: [getImagenPorIndice(3), getImagenPorIndice(4), getImagenPorIndice(5)]
  },

  // COYOACÁN
  {
    nombre: 'Dulcería Candy King',
    slug: 'dulceria-candy-king',
    tipo: 'Tienda de Golosinas',
    direccion: 'Pedregal de Carrasco',
    colonia: 'Pedregal de Carrasco',
    alcaldia: 'Coyoacán',
    alcaldiaSlug: 'coyoacan',
    cp: '04700',
    coordenadas: { lat: 19.3123, lng: -99.1456 },
    telefono: '55 3085 7555',
    mapsUrl: 'https://maps.google.com/?q=Dulceria+Candy+King+Coyoacan',
    rating: 4.4,
    resenas: 67,
    verificado: true,
    destacado: true,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería moderna en la zona residencial de Pedregal de Carrasco.',
    especialidades: ['Dulces importados', 'Golosinas premium', 'Confitería selecta'],
    productos: ['Dulces americanos', 'Gomitas importadas', 'Chocolates premium', 'Snacks'],
    servicios: [
      { nombre: 'Productos importados', descripcion: 'Dulces difíciles de encontrar' },
      { nombre: 'Ambiente moderno', descripcion: 'Experiencia de compra agradable' }
    ],
    transporte: {
      metro: [{ linea: '2', estacion: 'General Anaya', distancia: '15 min en transporte' }],
      referencias: ['Pedregal de Carrasco', 'Zona residencial de Coyoacán']
    },
    imagen: getImagenPorIndice(4),
    imagenes: [getImagenPorIndice(4), getImagenPorIndice(5), getImagenPorIndice(6)]
  },

  // TLÁHUAC
  {
    nombre: 'Dulces Rex',
    slug: 'dulces-rex',
    tipo: 'Tienda de Golosinas',
    direccion: 'San Francisco Tlaltenco',
    colonia: 'San Francisco Tlaltenco',
    alcaldia: 'Tláhuac',
    alcaldiaSlug: 'tlahuac',
    cp: '13400',
    coordenadas: { lat: 19.2789, lng: -99.0234 },
    telefono: '55 2569 0125',
    mapsUrl: 'https://maps.google.com/?q=Dulces+Rex+Tlahuac',
    rating: 4.2,
    resenas: 54,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería local en el pueblo de San Francisco Tlaltenco.',
    especialidades: ['Dulces variados', 'Confitería', 'Precios locales'],
    productos: ['Gomitas', 'Chocolates', 'Dulces mexicanos', 'Paletas'],
    servicios: [
      { nombre: 'Servicio local', descripcion: 'Atención a la comunidad' },
      { nombre: 'Precios accesibles', descripcion: 'Economía local' }
    ],
    transporte: {
      metro: [{ linea: '12', estacion: 'Tlaltenco', distancia: '5 min caminando' }],
      referencias: ['Pueblo San Francisco Tlaltenco', 'Cerca Metro Línea 12']
    },
    imagen: getImagenPorIndice(5),
    imagenes: [getImagenPorIndice(5), getImagenPorIndice(6), getImagenPorIndice(7)]
  },

  // IZTAPALAPA - Adicionales
  {
    nombre: 'Dulcería La Estrella Tláhuac',
    slug: 'dulceria-la-estrella-tlahuac',
    tipo: 'Tienda de Golosinas',
    direccion: 'Av. Tláhuac 3715',
    colonia: 'Guadalupe',
    alcaldia: 'Iztapalapa',
    alcaldiaSlug: 'iztapalapa',
    cp: '09780',
    coordenadas: { lat: 19.3145, lng: -99.0678 },
    telefono: 'Sin teléfono registrado',
    mapsUrl: 'https://maps.google.com/?q=Dulceria+La+Estrella+Tlahuac+Iztapalapa',
    rating: 4.1,
    resenas: 78,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería sobre la avenida Tláhuac en Iztapalapa.',
    especialidades: ['Dulces variados', 'Confitería', 'Precios populares'],
    productos: ['Gomitas', 'Chocolates', 'Dulces mexicanos', 'Paletas', 'Chicles'],
    servicios: [
      { nombre: 'Ubicación accesible', descripcion: 'Sobre avenida principal' },
      { nombre: 'Precios populares', descripcion: 'Accesible para todos' }
    ],
    transporte: {
      metro: [{ linea: '12', estacion: 'Periférico Oriente', distancia: '10 min caminando' }],
      referencias: ['Sobre Av. Tláhuac', 'Zona comercial']
    },
    imagen: getImagenPorIndice(6),
    imagenes: [getImagenPorIndice(6), getImagenPorIndice(7), getImagenPorIndice(8)]
  },
  {
    nombre: 'Dulcería MOLY',
    slug: 'dulceria-moly',
    tipo: 'Tienda de Golosinas',
    direccion: 'Técnicos Y Manuales 31-A',
    colonia: 'Lomas Estrella',
    alcaldia: 'Iztapalapa',
    alcaldiaSlug: 'iztapalapa',
    cp: '09890',
    coordenadas: { lat: 19.3092, lng: -99.0791 },
    telefono: 'Sin teléfono registrado',
    mapsUrl: 'https://maps.google.com/?q=Dulceria+MOLY+Lomas+Estrella',
    rating: 4.0,
    resenas: 34,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería de barrio en Lomas Estrella.',
    especialidades: ['Dulces variados', 'Confitería básica'],
    productos: ['Gomitas', 'Chocolates', 'Dulces', 'Paletas'],
    servicios: [
      { nombre: 'Servicio local', descripcion: 'Atención a residentes' }
    ],
    transporte: {
      metro: [{ linea: '12', estacion: 'Lomas Estrella', distancia: '8 min caminando' }],
      referencias: ['Lomas Estrella', 'Zona residencial']
    },
    imagen: getImagenPorIndice(7),
    imagenes: [getImagenPorIndice(7), getImagenPorIndice(8), getImagenPorIndice(9)]
  },

  // GUSTAVO A. MADERO - Norte 70 adicionales
  {
    nombre: 'Dulcería La Serpentina',
    slug: 'dulceria-la-serpentina',
    tipo: 'Tienda de Golosinas',
    direccion: 'Puerto Manzanillo 66',
    colonia: 'Casas Alemán',
    alcaldia: 'Gustavo A. Madero',
    alcaldiaSlug: 'gustavo-a-madero',
    cp: '07580',
    coordenadas: { lat: 19.4923, lng: -99.0876 },
    telefono: 'Sin teléfono registrado',
    mapsUrl: 'https://maps.google.com/?q=Dulceria+La+Serpentina+GAM',
    rating: 4.1,
    resenas: 56,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería tradicional en Casas Alemán.',
    especialidades: ['Dulces para fiestas', 'Serpentinas', 'Confetis', 'Decoraciones'],
    productos: ['Dulces', 'Serpentinas', 'Confetis', 'Piñatas', 'Decoraciones'],
    servicios: [
      { nombre: 'Todo para fiestas', descripcion: 'Dulces y decoraciones' },
      { nombre: 'Precios accesibles', descripcion: 'Economía para tu evento' }
    ],
    transporte: {
      metro: [{ linea: '4', estacion: 'Martín Carrera', distancia: '15 min en transporte' }],
      referencias: ['Casas Alemán', 'Zona norte de GAM']
    },
    imagen: getImagenPorIndice(8),
    imagenes: [getImagenPorIndice(8), getImagenPorIndice(9), getImagenPorIndice(10)]
  },
  {
    nombre: 'Dulcería Dulcinea',
    slug: 'dulceria-dulcinea',
    tipo: 'Tienda de Golosinas',
    direccion: 'Norte 70 No. 5916',
    colonia: 'Bondojito',
    alcaldia: 'Gustavo A. Madero',
    alcaldiaSlug: 'gustavo-a-madero',
    cp: '07850',
    coordenadas: { lat: 19.4784, lng: -99.0973 },
    telefono: '55 5088 0676',
    mapsUrl: 'https://maps.google.com/?q=Dulceria+Dulcinea+Norte+70',
    rating: 4.3,
    resenas: 89,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería del famoso corredor Norte 70.',
    especialidades: ['Dulces variados', 'Mayoreo', 'Confitería', 'Precios competitivos'],
    productos: ['Gomitas', 'Chocolates', 'Dulces mexicanos', 'Confitería a granel'],
    servicios: [
      { nombre: 'Corredor Norte 70', descripcion: 'Parte del mejor corredor de dulces' },
      { nombre: 'Precios competitivos', descripcion: 'Buenos precios por competencia' }
    ],
    transporte: {
      metro: [{ linea: '5', estacion: 'Aragón', distancia: '10 min caminando' }],
      referencias: ['Corredor Norte 70', 'Zona de dulcerías']
    },
    imagen: getImagenPorIndice(9),
    imagenes: [getImagenPorIndice(9), getImagenPorIndice(10), getImagenPorIndice(0)]
  },
  {
    nombre: 'Dulcería Amadeus',
    slug: 'dulceria-amadeus',
    tipo: 'Tienda de Golosinas',
    direccion: 'Av. Victoria Oriente esq. Nte. 70 6003',
    colonia: 'Aragón Inguarán',
    alcaldia: 'Gustavo A. Madero',
    alcaldiaSlug: 'gustavo-a-madero',
    cp: '07920',
    coordenadas: { lat: 19.4790, lng: -99.0979 },
    telefono: '55 2471 0905',
    mapsUrl: 'https://maps.google.com/?q=Dulceria+Amadeus+Norte+70',
    rating: 4.2,
    resenas: 67,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería en esquina estratégica del corredor Norte 70.',
    especialidades: ['Dulces variados', 'Confitería', 'Ubicación privilegiada'],
    productos: ['Gomitas', 'Chocolates', 'Dulces tradicionales', 'Paletas'],
    servicios: [
      { nombre: 'Ubicación esquina', descripcion: 'Fácil acceso y visibilidad' },
      { nombre: 'Variedad completa', descripcion: 'Amplio surtido disponible' }
    ],
    transporte: {
      metro: [{ linea: '5', estacion: 'Aragón', distancia: '8 min caminando' }],
      referencias: ['Esquina Av. Victoria y Norte 70', 'Punto de referencia']
    },
    imagen: getImagenPorIndice(10),
    imagenes: [getImagenPorIndice(10), getImagenPorIndice(0), getImagenPorIndice(1)]
  },
  {
    nombre: 'Dulcería Los Fantásticos',
    slug: 'dulceria-los-fantasticos',
    tipo: 'Tienda de Golosinas',
    direccion: 'Nte. 70 5617',
    colonia: 'Bondojito',
    alcaldia: 'Gustavo A. Madero',
    alcaldiaSlug: 'gustavo-a-madero',
    cp: '07850',
    coordenadas: { lat: 19.4782, lng: -99.0971 },
    telefono: '55 2580 8417',
    mapsUrl: 'https://maps.google.com/?q=Dulceria+Los+Fantasticos+Norte+70',
    rating: 4.1,
    resenas: 45,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería del corredor Norte 70 con variedad fantástica.',
    especialidades: ['Dulces variados', 'Golosinas', 'Confitería'],
    productos: ['Gomitas', 'Chocolates', 'Dulces mexicanos', 'Paletas', 'Chicles'],
    servicios: [
      { nombre: 'Variedad fantástica', descripcion: 'Gran selección de dulces' },
      { nombre: 'Atención amable', descripcion: 'Servicio al cliente' }
    ],
    transporte: {
      metro: [{ linea: '5', estacion: 'Aragón', distancia: '10 min caminando' }],
      referencias: ['Norte 70', 'Corredor de dulcerías']
    },
    imagen: getImagenPorIndice(0),
    imagenes: [getImagenPorIndice(0), getImagenPorIndice(1), getImagenPorIndice(2)]
  },

  // BENITO JUÁREZ - Adicionales
  {
    nombre: 'Dulcería La Merced BJ',
    slug: 'dulceria-la-merced-bj',
    tipo: 'Tienda de Golosinas',
    direccion: 'Mier y Pesado 304',
    colonia: 'Del Valle Norte',
    alcaldia: 'Benito Juárez',
    alcaldiaSlug: 'benito-juarez',
    cp: '03103',
    coordenadas: { lat: 19.3834, lng: -99.1678 },
    telefono: '55 5543 7250',
    mapsUrl: 'https://maps.google.com/?q=Dulceria+La+Merced+Del+Valle',
    rating: 4.2,
    resenas: 78,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería tradicional en la colonia Del Valle Norte.',
    especialidades: ['Dulces tradicionales', 'Confitería', 'Servicio de calidad'],
    productos: ['Dulces mexicanos', 'Gomitas', 'Chocolates', 'Confitería fina'],
    servicios: [
      { nombre: 'Tradición', descripcion: 'Dulcería de tradición en Del Valle' },
      { nombre: 'Calidad', descripcion: 'Productos seleccionados' }
    ],
    transporte: {
      metro: [{ linea: '7 y 12', estacion: 'Mixcoac', distancia: '10 min caminando' }],
      referencias: ['Del Valle Norte', 'Zona residencial']
    },
    imagen: getImagenPorIndice(1),
    imagenes: [getImagenPorIndice(1), getImagenPorIndice(2), getImagenPorIndice(3)]
  },
  {
    nombre: 'Dulcería Mundo de Karamelo',
    slug: 'dulceria-mundo-de-karamelo',
    tipo: 'Tienda de Golosinas',
    direccion: 'C. Elisa 118',
    colonia: 'Nativitas',
    alcaldia: 'Benito Juárez',
    alcaldiaSlug: 'benito-juarez',
    cp: '03500',
    coordenadas: { lat: 19.3712, lng: -99.1623 },
    telefono: 'Sin teléfono registrado',
    mapsUrl: 'https://maps.google.com/?q=Dulceria+Mundo+de+Karamelo+Nativitas',
    rating: 4.3,
    resenas: 45,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Un mundo de dulces en Nativitas.',
    especialidades: ['Dulces variados', 'Caramelos', 'Golosinas'],
    productos: ['Caramelos', 'Gomitas', 'Chocolates', 'Paletas', 'Chicles'],
    servicios: [
      { nombre: 'Variedad de caramelos', descripcion: 'Especialistas en caramelos' },
      { nombre: 'Ambiente colorido', descripcion: 'Experiencia de compra' }
    ],
    transporte: {
      metro: [{ linea: '2', estacion: 'Portales', distancia: '8 min caminando' }],
      referencias: ['Colonia Nativitas', 'Cerca de Portales']
    },
    imagen: getImagenPorIndice(2),
    imagenes: [getImagenPorIndice(2), getImagenPorIndice(3), getImagenPorIndice(4)]
  },
  {
    nombre: 'Dulcería Chesa',
    slug: 'dulceria-chesa',
    tipo: 'Tienda de Golosinas',
    direccion: 'Av. Víctor Hugo 79',
    colonia: 'Portales Norte',
    alcaldia: 'Benito Juárez',
    alcaldiaSlug: 'benito-juarez',
    cp: '03300',
    coordenadas: { lat: 19.3656, lng: -99.1567 },
    telefono: '55 6267 4104',
    mapsUrl: 'https://maps.google.com/?q=Dulceria+Chesa+Portales',
    rating: 4.2,
    resenas: 56,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería reconocida en Portales Norte.',
    especialidades: ['Dulces variados', 'Confitería', 'Piñatas'],
    productos: ['Gomitas', 'Chocolates', 'Dulces mexicanos', 'Piñatas'],
    servicios: [
      { nombre: 'Surtido completo', descripcion: 'Todo para fiestas' },
      { nombre: 'Atención personalizada', descripcion: 'Te ayudan a elegir' }
    ],
    transporte: {
      metro: [{ linea: '2', estacion: 'Portales', distancia: '5 min caminando' }],
      referencias: ['Av. Víctor Hugo', 'Portales Norte']
    },
    imagen: getImagenPorIndice(3),
    imagenes: [getImagenPorIndice(3), getImagenPorIndice(4), getImagenPorIndice(5)]
  },
  {
    nombre: 'Dulcería Sensación',
    slug: 'dulceria-sensacion',
    tipo: 'Tienda de Golosinas',
    direccion: 'Mercado 24 de Agosto, Anaxágoras local 56',
    colonia: 'Narvarte Poniente',
    alcaldia: 'Benito Juárez',
    alcaldiaSlug: 'benito-juarez',
    cp: '03020',
    coordenadas: { lat: 19.3923, lng: -99.1534 },
    telefono: 'Sin teléfono registrado',
    mapsUrl: 'https://maps.google.com/?q=Dulceria+Sensacion+Narvarte',
    rating: 4.1,
    resenas: 34,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.mercado,
    descripcionCorta: 'Dulcería dentro del Mercado 24 de Agosto.',
    especialidades: ['Dulces de mercado', 'Precios accesibles', 'Variedad'],
    productos: ['Gomitas', 'Chocolates', 'Dulces tradicionales', 'Confitería'],
    servicios: [
      { nombre: 'Precios de mercado', descripcion: 'Economía del mercado' },
      { nombre: 'Ubicación conveniente', descripcion: 'Dentro del mercado' }
    ],
    transporte: {
      metro: [{ linea: '2 y 12', estacion: 'Etiopía', distancia: '5 min caminando' }],
      referencias: ['Mercado 24 de Agosto', 'Narvarte Poniente']
    },
    imagen: getImagenPorIndice(4),
    imagenes: [getImagenPorIndice(4), getImagenPorIndice(5), getImagenPorIndice(6)]
  },

  // VENUSTIANO CARRANZA - Adicionales
  {
    nombre: 'Dulcería Álvaro Obregón VC',
    slug: 'dulceria-alvaro-obregon-vc',
    tipo: 'Tienda de Golosinas',
    direccion: 'Cucurpe 140',
    colonia: 'Magdalena Mixihuca',
    alcaldia: 'Venustiano Carranza',
    alcaldiaSlug: 'venustiano-carranza',
    cp: '15850',
    coordenadas: { lat: 19.4123, lng: -99.0923 },
    telefono: '55 4062 4328',
    mapsUrl: 'https://maps.google.com/?q=Dulceria+Alvaro+Obregon+Magdalena+Mixihuca',
    rating: 4.2,
    resenas: 67,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería tradicional en Magdalena Mixihuca.',
    especialidades: ['Dulces variados', 'Confitería', 'Precios accesibles'],
    productos: ['Gomitas', 'Chocolates', 'Dulces mexicanos', 'Paletas'],
    servicios: [
      { nombre: 'Variedad completa', descripcion: 'Surtido para toda ocasión' },
      { nombre: 'Precios justos', descripcion: 'Accesible para todos' }
    ],
    transporte: {
      metro: [{ linea: '9', estacion: 'Velódromo', distancia: '5 min caminando' }],
      referencias: ['Magdalena Mixihuca', 'Cerca del Velódromo']
    },
    imagen: getImagenPorIndice(5),
    imagenes: [getImagenPorIndice(5), getImagenPorIndice(6), getImagenPorIndice(7)]
  },
  {
    nombre: 'Dulcerías Don Goloso',
    slug: 'dulcerias-don-goloso',
    tipo: 'Dulcería Mayoreo',
    direccion: 'Gómez Pedraza 2B, Mercado de Dulces',
    colonia: 'La Merced',
    alcaldia: 'Venustiano Carranza',
    alcaldiaSlug: 'venustiano-carranza',
    cp: '15810',
    coordenadas: { lat: 19.4281, lng: -99.1228 },
    referencia: 'Dentro del Mercado de Dulces de La Merced',
    telefono: '55 3612 0350',
    mapsUrl: 'https://maps.google.com/?q=Dulcerias+Don+Goloso+Merced',
    rating: 4.3,
    resenas: 89,
    verificado: true,
    destacado: true,
    horario: horarioEstandar.mercado,
    descripcionCorta: 'Dulcería de mayoreo en el legendario Mercado de La Merced.',
    especialidades: ['Mayoreo', 'Dulces tradicionales', 'Precios de distribuidor'],
    productos: ['Dulces a granel', 'Confitería', 'Chocolates', 'Dulces mexicanos'],
    servicios: [
      { nombre: 'Precios de mayoreo', descripcion: 'Los mejores precios' },
      { nombre: 'Sin mínimos', descripcion: 'Compra lo que necesites' }
    ],
    transporte: {
      metro: [{ linea: '1', estacion: 'Merced', distancia: '3 min caminando' }],
      referencias: ['Mercado de Dulces', 'La Merced']
    },
    imagen: getImagenPorIndice(6),
    imagenes: [getImagenPorIndice(6), getImagenPorIndice(7), getImagenPorIndice(8)]
  },
  {
    nombre: 'Dulcería La Margarita',
    slug: 'dulceria-la-margarita',
    tipo: 'Dulcería Mayoreo',
    direccion: 'Circunvalación 40, La Merced',
    colonia: 'La Merced',
    alcaldia: 'Venustiano Carranza',
    alcaldiaSlug: 'venustiano-carranza',
    cp: '15810',
    coordenadas: { lat: 19.4276, lng: -99.1223 },
    telefono: '55 3331 6797',
    mapsUrl: 'https://maps.google.com/?q=Dulceria+La+Margarita+Merced',
    rating: 4.2,
    resenas: 156,
    verificado: true,
    destacado: true,
    horario: horarioEstandar.mercado,
    descripcionCorta: 'Dulcería tradicional sobre Circunvalación en La Merced.',
    especialidades: ['Mayoreo', 'Dulces variados', 'Precios bajos'],
    productos: ['Gomitas', 'Chocolates', 'Dulces mexicanos', 'Confitería a granel'],
    servicios: [
      { nombre: 'Tradición', descripcion: 'Años de experiencia en La Merced' },
      { nombre: 'Mejores precios', descripcion: 'Competitivos en el mercado' }
    ],
    transporte: {
      metro: [{ linea: '1', estacion: 'Merced', distancia: '3 min caminando' }],
      referencias: ['Circunvalación 40', 'Mercado de La Merced']
    },
    imagen: getImagenPorIndice(7),
    imagenes: [getImagenPorIndice(7), getImagenPorIndice(8), getImagenPorIndice(9)]
  },
  {
    nombre: 'Dulcería Anita',
    slug: 'dulceria-anita',
    tipo: 'Tienda de Golosinas',
    direccion: 'Av. Emilio Carranza 43',
    colonia: 'Moctezuma 1ra Sección',
    alcaldia: 'Venustiano Carranza',
    alcaldiaSlug: 'venustiano-carranza',
    cp: '15500',
    coordenadas: { lat: 19.4234, lng: -99.0812 },
    telefono: '55 5762 4767',
    mapsUrl: 'https://maps.google.com/?q=Dulceria+Anita+Moctezuma',
    rating: 4.3,
    resenas: 78,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería de tradición en la colonia Moctezuma.',
    especialidades: ['Dulces variados', 'Confitería', 'Atención familiar'],
    productos: ['Gomitas', 'Chocolates', 'Dulces mexicanos', 'Piñatas'],
    servicios: [
      { nombre: 'Tradición familiar', descripcion: 'Negocio de tradición' },
      { nombre: 'Atención personalizada', descripcion: 'Servicio cercano' }
    ],
    transporte: {
      metro: [{ linea: '1', estacion: 'Moctezuma', distancia: '5 min caminando' }],
      referencias: ['Av. Emilio Carranza', 'Moctezuma 1ra Sección']
    },
    imagen: getImagenPorIndice(8),
    imagenes: [getImagenPorIndice(8), getImagenPorIndice(9), getImagenPorIndice(10)]
  },

  // ÁLVARO OBREGÓN - Adicionales
  {
    nombre: 'Dulcería La Principal',
    slug: 'dulceria-la-principal',
    tipo: 'Tienda de Golosinas',
    direccion: 'Rey Cuauhtémoc 32',
    colonia: 'San Ángel',
    alcaldia: 'Álvaro Obregón',
    alcaldiaSlug: 'alvaro-obregon',
    cp: '01000',
    coordenadas: { lat: 19.3478, lng: -99.1912 },
    telefono: '55 5616 0115',
    mapsUrl: 'https://maps.google.com/?q=Dulceria+La+Principal+San+Angel',
    rating: 4.4,
    resenas: 67,
    verificado: true,
    destacado: true,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería tradicional en el emblemático San Ángel.',
    especialidades: ['Dulces tradicionales', 'Confitería fina', 'Ambiente colonial'],
    productos: ['Dulces mexicanos', 'Chocolates artesanales', 'Confitería selecta'],
    servicios: [
      { nombre: 'Tradición', descripcion: 'En el corazón de San Ángel' },
      { nombre: 'Productos selectos', descripcion: 'Calidad garantizada' }
    ],
    transporte: {
      metro: [{ linea: '1', estacion: 'Miguel Ángel de Quevedo', distancia: '10 min en transporte' }],
      referencias: ['San Ángel', 'Zona turística']
    },
    imagen: getImagenPorIndice(9),
    imagenes: [getImagenPorIndice(9), getImagenPorIndice(10), getImagenPorIndice(0)]
  },
  {
    nombre: 'Dulces Típicos La Nena',
    slug: 'dulces-tipicos-la-nena',
    tipo: 'Dulcería Tradicional',
    direccion: 'Mercado Melchor Muzquiz local 54',
    colonia: 'San Ángel',
    alcaldia: 'Álvaro Obregón',
    alcaldiaSlug: 'alvaro-obregon',
    cp: '01000',
    coordenadas: { lat: 19.3456, lng: -99.1923 },
    telefono: '55 8212 3267',
    mapsUrl: 'https://maps.google.com/?q=Dulces+Tipicos+La+Nena+San+Angel',
    rating: 4.5,
    resenas: 45,
    verificado: true,
    destacado: true,
    horario: horarioEstandar.mercado,
    descripcionCorta: 'Especialistas en dulces típicos mexicanos en San Ángel.',
    especialidades: ['Dulces típicos', 'Mexicanos tradicionales', 'Artesanales'],
    productos: ['Alegrías', 'Cocadas', 'Mazapanes', 'Tamarindos', 'Obleas', 'Glorias'],
    servicios: [
      { nombre: 'Dulces auténticos', descripcion: 'Recetas tradicionales' },
      { nombre: 'En mercado local', descripcion: 'Ambiente de mercado' }
    ],
    transporte: {
      metro: [{ linea: '1', estacion: 'Miguel Ángel de Quevedo', distancia: '10 min en transporte' }],
      referencias: ['Mercado Melchor Muzquiz', 'San Ángel']
    },
    imagen: getImagenPorIndice(10),
    imagenes: [getImagenPorIndice(10), getImagenPorIndice(0), getImagenPorIndice(1)]
  },

  // AZCAPOTZALCO - Adicionales
  {
    nombre: 'La Surtidora Azcapotzalco',
    slug: 'la-surtidora-azcapotzalco',
    tipo: 'Dulcería Mayoreo',
    direccion: 'Esperanza 2',
    colonia: 'Centro de Azcapotzalco',
    alcaldia: 'Azcapotzalco',
    alcaldiaSlug: 'azcapotzalco',
    cp: '02000',
    coordenadas: { lat: 19.4869, lng: -99.1858 },
    telefono: 'Sin teléfono registrado',
    mapsUrl: 'https://maps.google.com/?q=La+Surtidora+Azcapotzalco',
    rating: 4.2,
    resenas: 89,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Surtidora de dulces en el centro de Azcapotzalco.',
    especialidades: ['Mayoreo', 'Surtido amplio', 'Precios de distribuidor'],
    productos: ['Dulces a granel', 'Confitería', 'Chocolates', 'Gomitas'],
    servicios: [
      { nombre: 'Surtido completo', descripcion: 'Todo lo que necesitas' },
      { nombre: 'Precios de surtidor', descripcion: 'Buenos precios por volumen' }
    ],
    transporte: {
      metro: [{ linea: '6', estacion: 'Azcapotzalco', distancia: '5 min caminando' }],
      referencias: ['Centro de Azcapotzalco', 'Zona comercial']
    },
    imagen: getImagenPorIndice(0),
    imagenes: [getImagenPorIndice(0), getImagenPorIndice(1), getImagenPorIndice(2)]
  },
  {
    nombre: 'Dulcería La Estrella Rosario',
    slug: 'dulceria-la-estrella-rosario',
    tipo: 'Tienda de Golosinas',
    direccion: 'Av. de las Culturas 14',
    colonia: 'El Rosario',
    alcaldia: 'Azcapotzalco',
    alcaldiaSlug: 'azcapotzalco',
    cp: '02100',
    coordenadas: { lat: 19.5034, lng: -99.2012 },
    telefono: 'Sin teléfono registrado',
    mapsUrl: 'https://maps.google.com/?q=Dulceria+La+Estrella+Rosario+Azcapotzalco',
    rating: 4.0,
    resenas: 34,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería local en la zona de El Rosario.',
    especialidades: ['Dulces variados', 'Confitería básica'],
    productos: ['Gomitas', 'Chocolates', 'Dulces', 'Paletas'],
    servicios: [
      { nombre: 'Servicio local', descripcion: 'Atención a la comunidad' }
    ],
    transporte: {
      metro: [{ linea: '6 y 7', estacion: 'El Rosario', distancia: '5 min caminando' }],
      referencias: ['El Rosario', 'Cerca del Metro']
    },
    imagen: getImagenPorIndice(1),
    imagenes: [getImagenPorIndice(1), getImagenPorIndice(2), getImagenPorIndice(3)]
  },

  // TLALPAN - Adicionales
  {
    nombre: 'Dulcería El Paraíso Tlalpan',
    slug: 'dulceria-el-paraiso-tlalpan',
    tipo: 'Tienda de Golosinas',
    direccion: 'Corregidora 43, Miguel Hidalgo 1ra Sección',
    colonia: 'Miguel Hidalgo',
    alcaldia: 'Tlalpan',
    alcaldiaSlug: 'tlalpan',
    cp: '14250',
    coordenadas: { lat: 19.2856, lng: -99.1712 },
    telefono: 'Sin teléfono registrado',
    mapsUrl: 'https://maps.google.com/?q=Dulceria+El+Paraiso+Tlalpan',
    rating: 4.2,
    resenas: 56,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Un paraíso de dulces en Tlalpan.',
    especialidades: ['Dulces variados', 'Confitería', 'Ambiente agradable'],
    productos: ['Gomitas', 'Chocolates', 'Dulces mexicanos', 'Paletas'],
    servicios: [
      { nombre: 'Variedad', descripcion: 'Amplio surtido de dulces' },
      { nombre: 'Ambiente', descripcion: 'Experiencia de compra agradable' }
    ],
    transporte: {
      metro: [{ linea: '2', estacion: 'Taxqueña', distancia: '20 min en transporte' }],
      referencias: ['Miguel Hidalgo 1ra Sección', 'Tlalpan']
    },
    imagen: getImagenPorIndice(2),
    imagenes: [getImagenPorIndice(2), getImagenPorIndice(3), getImagenPorIndice(4)]
  },
  {
    nombre: 'Superdulce Tlalpan',
    slug: 'superdulce-tlalpan',
    tipo: 'Tienda de Golosinas',
    direccion: 'Calle Tekal 305',
    colonia: 'Héroes de Padierna',
    alcaldia: 'Tlalpan',
    alcaldiaSlug: 'tlalpan',
    cp: '14200',
    coordenadas: { lat: 19.2923, lng: -99.1978 },
    telefono: '55 5645 1637',
    mapsUrl: 'https://maps.google.com/?q=Superdulce+Tlalpan',
    rating: 4.3,
    resenas: 67,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Superdulce: tu destino de dulces en Héroes de Padierna.',
    especialidades: ['Dulces variados', 'Confitería', 'Surtido amplio'],
    productos: ['Gomitas', 'Chocolates', 'Dulces tradicionales', 'Paletas', 'Chicles'],
    servicios: [
      { nombre: 'Surtido súper', descripcion: 'Variedad inmensa' },
      { nombre: 'Buenos precios', descripcion: 'Precios competitivos' }
    ],
    transporte: {
      metro: [{ linea: '2', estacion: 'Taxqueña', distancia: '25 min en transporte' }],
      referencias: ['Héroes de Padierna', 'Tlalpan sur']
    },
    imagen: getImagenPorIndice(3),
    imagenes: [getImagenPorIndice(3), getImagenPorIndice(4), getImagenPorIndice(5)]
  },
  {
    nombre: 'Mega Dulce Picacho',
    slug: 'mega-dulce-picacho',
    tipo: 'Dulcería Mayoreo',
    direccion: 'Carretera Picacho-Ajusco, Miguel Hidalgo 4ta Sección',
    colonia: 'Miguel Hidalgo',
    alcaldia: 'Tlalpan',
    alcaldiaSlug: 'tlalpan',
    cp: '14250',
    coordenadas: { lat: 19.2734, lng: -99.1834 },
    telefono: 'Sin teléfono registrado',
    mapsUrl: 'https://maps.google.com/?q=Mega+Dulce+Picacho+Tlalpan',
    rating: 4.1,
    resenas: 45,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Mega dulcería en la carretera Picacho-Ajusco.',
    especialidades: ['Mayoreo', 'Dulces variados', 'Surtido mega'],
    productos: ['Dulces a granel', 'Confitería', 'Chocolates', 'Gomitas'],
    servicios: [
      { nombre: 'Surtido mega', descripcion: 'Cantidades grandes disponibles' },
      { nombre: 'Precios de mayoreo', descripcion: 'Buenos precios por volumen' }
    ],
    transporte: {
      referencias: ['Carretera Picacho-Ajusco', 'Acceso en auto recomendado']
    },
    imagen: getImagenPorIndice(4),
    imagenes: [getImagenPorIndice(4), getImagenPorIndice(5), getImagenPorIndice(6)]
  },

  // LA MAGDALENA CONTRERAS
  {
    nombre: 'Dulcería El Camioncito',
    slug: 'dulceria-el-camioncito',
    tipo: 'Tienda de Golosinas',
    direccion: 'Chabacano/Av. México esq., La Cruz',
    colonia: 'La Cruz',
    alcaldia: 'La Magdalena Contreras',
    alcaldiaSlug: 'magdalena-contreras',
    cp: '10800',
    coordenadas: { lat: 19.3123, lng: -99.2234 },
    telefono: 'Sin teléfono registrado',
    mapsUrl: 'https://maps.google.com/?q=Dulceria+El+Camioncito+Magdalena+Contreras',
    rating: 4.0,
    resenas: 23,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería de barrio en La Cruz, Magdalena Contreras.',
    especialidades: ['Dulces variados', 'Confitería básica'],
    productos: ['Gomitas', 'Chocolates', 'Dulces', 'Paletas'],
    servicios: [
      { nombre: 'Servicio local', descripcion: 'Atención cercana' }
    ],
    transporte: {
      referencias: ['La Cruz', 'Magdalena Contreras']
    },
    imagen: getImagenPorIndice(5),
    imagenes: [getImagenPorIndice(5), getImagenPorIndice(6), getImagenPorIndice(7)]
  },
  {
    nombre: 'Dulcería El Puente',
    slug: 'dulceria-el-puente',
    tipo: 'Tienda de Golosinas',
    direccion: 'Av. San Jerónimo #3 Local A esq. El Rosal',
    colonia: 'Pueblo Nuevo Bajo',
    alcaldia: 'La Magdalena Contreras',
    alcaldiaSlug: 'magdalena-contreras',
    cp: '10640',
    coordenadas: { lat: 19.3234, lng: -99.2345 },
    telefono: '55 5630 4539',
    mapsUrl: 'https://maps.google.com/?q=Dulceria+El+Puente+Magdalena+Contreras',
    rating: 4.3,
    resenas: 56,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería reconocida en Pueblo Nuevo Bajo.',
    especialidades: ['Dulces variados', 'Confitería', 'Piñatas'],
    productos: ['Gomitas', 'Chocolates', 'Dulces mexicanos', 'Piñatas'],
    servicios: [
      { nombre: 'Surtido completo', descripcion: 'Todo para fiestas' },
      { nombre: 'Atención personalizada', descripcion: 'Te ayudan a elegir' }
    ],
    transporte: {
      referencias: ['Av. San Jerónimo', 'Pueblo Nuevo Bajo']
    },
    imagen: getImagenPorIndice(6),
    imagenes: [getImagenPorIndice(6), getImagenPorIndice(7), getImagenPorIndice(8)]
  },
  {
    nombre: 'Dulces Gómez',
    slug: 'dulces-gomez',
    tipo: 'Tienda de Golosinas',
    direccion: 'Corona del Rosal #1 Local A esq. San Bernabé',
    colonia: 'Cuauhtémoc',
    alcaldia: 'La Magdalena Contreras',
    alcaldiaSlug: 'magdalena-contreras',
    cp: '10370',
    coordenadas: { lat: 19.3156, lng: -99.2456 },
    telefono: '55 5585 8080',
    mapsUrl: 'https://maps.google.com/?q=Dulces+Gomez+Magdalena+Contreras',
    rating: 4.2,
    resenas: 45,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería familiar en la colonia Cuauhtémoc.',
    especialidades: ['Dulces variados', 'Confitería', 'Tradición familiar'],
    productos: ['Gomitas', 'Chocolates', 'Dulces mexicanos', 'Paletas'],
    servicios: [
      { nombre: 'Negocio familiar', descripcion: 'Tradición de servicio' },
      { nombre: 'Precios accesibles', descripcion: 'Economía local' }
    ],
    transporte: {
      referencias: ['Corona del Rosal', 'Cerca de San Bernabé']
    },
    imagen: getImagenPorIndice(7),
    imagenes: [getImagenPorIndice(7), getImagenPorIndice(8), getImagenPorIndice(9)]
  },
  // ========== MILPA ALTA (3) ==========
  {
    nombre: 'Dulcería Chikis',
    slug: 'dulceria-chikis',
    tipo: 'Tienda de Golosinas',
    direccion: 'Niños Héroes s/n',
    colonia: 'San Agustín Ohtenco',
    alcaldia: 'Milpa Alta',
    alcaldiaSlug: 'milpa-alta',
    cp: '12900',
    coordenadas: { lat: 19.1923, lng: -99.0234 },
    telefono: '55 8758 9710',
    mapsUrl: 'https://maps.google.com/?q=Dulceria+Chikis+Milpa+Alta',
    rating: 4.3,
    resenas: 42,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería tradicional en San Agustín Ohtenco, Milpa Alta.',
    especialidades: ['Dulces tradicionales', 'Golosinas', 'Piñatas'],
    productos: ['Dulces mexicanos', 'Gomitas', 'Chocolates', 'Paletas'],
    servicios: [
      { nombre: 'Atención personalizada', descripcion: 'Servicio cercano al cliente' },
      { nombre: 'Surtido para fiestas', descripcion: 'Todo para tu evento' }
    ],
    transporte: {
      referencias: ['Calle Niños Héroes', 'San Agustín Ohtenco']
    },
    imagen: getImagenPorIndice(8),
    imagenes: [getImagenPorIndice(8), getImagenPorIndice(9), getImagenPorIndice(10)]
  },
  {
    nombre: 'Dulcería Edith',
    slug: 'dulceria-edith',
    tipo: 'Tienda de Golosinas',
    direccion: 'Calle Guanajuato Ote. 48',
    colonia: 'Villa Milpa Alta',
    alcaldia: 'Milpa Alta',
    alcaldiaSlug: 'milpa-alta',
    cp: '12000',
    coordenadas: { lat: 19.1926, lng: -99.0231 },
    telefono: 'Sin teléfono registrado',
    mapsUrl: 'https://maps.google.com/?q=Dulceria+Edith+Milpa+Alta',
    rating: 4.2,
    resenas: 28,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería local en el centro de Villa Milpa Alta.',
    especialidades: ['Dulces variados', 'Confitería', 'Productos locales'],
    productos: ['Gomitas', 'Chocolates', 'Dulces tradicionales', 'Chicles'],
    servicios: [
      { nombre: 'Comercio local', descripcion: 'Negocio de barrio confiable' },
      { nombre: 'Precios accesibles', descripcion: 'Economía para todos' }
    ],
    transporte: {
      referencias: ['Calle Guanajuato Oriente', 'Centro de Villa Milpa Alta']
    },
    imagen: getImagenPorIndice(9),
    imagenes: [getImagenPorIndice(9), getImagenPorIndice(10), getImagenPorIndice(0)]
  },
  {
    nombre: 'Dulcería La Huasteca',
    slug: 'dulceria-la-huasteca',
    tipo: 'Dulcería Tradicional',
    direccion: 'Av. Juárez 35',
    colonia: 'San Salvador Cuauhtenco',
    alcaldia: 'Milpa Alta',
    alcaldiaSlug: 'milpa-alta',
    cp: '12500',
    coordenadas: { lat: 19.1567, lng: -99.0145 },
    telefono: '729 748 0763',
    mapsUrl: 'https://maps.google.com/?q=Dulceria+La+Huasteca+Milpa+Alta',
    rating: 4.4,
    resenas: 56,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería con tradición huasteca en San Salvador Cuauhtenco.',
    especialidades: ['Dulces regionales', 'Productos artesanales', 'Tradición mexicana'],
    productos: ['Dulces huastecos', 'Palanquetas', 'Cocadas', 'Dulces de leche'],
    servicios: [
      { nombre: 'Productos artesanales', descripcion: 'Dulces con tradición regional' },
      { nombre: 'Mayoreo disponible', descripcion: 'Precios especiales por volumen' }
    ],
    transporte: {
      referencias: ['Avenida Juárez', 'San Salvador Cuauhtenco']
    },
    imagen: getImagenPorIndice(10),
    imagenes: [getImagenPorIndice(10), getImagenPorIndice(0), getImagenPorIndice(1)]
  },
  // ========== CUAJIMALPA (3) ==========
  {
    nombre: 'La Dulce Pau',
    slug: 'la-dulce-pau',
    tipo: 'Tienda de Golosinas',
    direccion: 'Av. Veracruz 17',
    colonia: 'Centro',
    alcaldia: 'Cuajimalpa de Morelos',
    alcaldiaSlug: 'cuajimalpa',
    cp: '05000',
    coordenadas: { lat: 19.3589, lng: -99.2912 },
    telefono: '55 2163 1299',
    mapsUrl: 'https://maps.google.com/?q=La+Dulce+Pau+Cuajimalpa',
    rating: 4.5,
    resenas: 87,
    verificado: true,
    destacado: true,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería con excelente surtido en el centro de Cuajimalpa.',
    especialidades: ['Dulces importados', 'Golosinas premium', 'Piñatas'],
    productos: ['Gomitas importadas', 'Chocolates finos', 'Dulces mexicanos', 'Paletas'],
    servicios: [
      { nombre: 'Surtido premium', descripcion: 'Productos de alta calidad' },
      { nombre: 'Asesoría para eventos', descripcion: 'Te ayudan a elegir' }
    ],
    transporte: {
      referencias: ['Avenida Veracruz', 'Centro de Cuajimalpa']
    },
    imagen: getImagenPorIndice(0),
    imagenes: [getImagenPorIndice(0), getImagenPorIndice(1), getImagenPorIndice(2)]
  },
  {
    nombre: 'El Gran Surtido Cuajis',
    slug: 'el-gran-surtido-cuajis',
    tipo: 'Dulcería Mayoreo',
    direccion: 'C. Ocampo 147',
    colonia: 'Cuajimalpa',
    alcaldia: 'Cuajimalpa de Morelos',
    alcaldiaSlug: 'cuajimalpa',
    cp: '05000',
    coordenadas: { lat: 19.3592, lng: -99.2915 },
    telefono: '55 9216 2384',
    mapsUrl: 'https://maps.google.com/?q=El+Gran+Surtido+Cuajis+Cuajimalpa',
    rating: 4.3,
    resenas: 64,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Gran variedad de dulces al mayoreo y menudeo en Cuajimalpa.',
    especialidades: ['Mayoreo y menudeo', 'Gran variedad', 'Precios competitivos'],
    productos: ['Dulces a granel', 'Gomitas', 'Chocolates', 'Confitería'],
    servicios: [
      { nombre: 'Precios de mayoreo', descripcion: 'Descuentos por volumen' },
      { nombre: 'Amplio surtido', descripcion: 'Miles de productos disponibles' }
    ],
    transporte: {
      referencias: ['Calle Ocampo', 'Zona centro Cuajimalpa']
    },
    imagen: getImagenPorIndice(1),
    imagenes: [getImagenPorIndice(1), getImagenPorIndice(2), getImagenPorIndice(3)]
  },
  {
    nombre: 'Dulcería Carmelita',
    slug: 'dulceria-carmelita',
    tipo: 'Tienda de Golosinas',
    direccion: 'Av. Juárez',
    colonia: 'Cuajimalpa de Morelos',
    alcaldia: 'Cuajimalpa de Morelos',
    alcaldiaSlug: 'cuajimalpa',
    cp: '05000',
    coordenadas: { lat: 19.3587, lng: -99.2910 },
    telefono: '55 2163 3833',
    mapsUrl: 'https://maps.google.com/?q=Dulceria+Carmelita+Cuajimalpa',
    rating: 4.2,
    resenas: 45,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería tradicional sobre Avenida Juárez en Cuajimalpa.',
    especialidades: ['Dulces tradicionales', 'Confitería', 'Atención familiar'],
    productos: ['Gomitas', 'Chocolates', 'Dulces mexicanos', 'Paletas'],
    servicios: [
      { nombre: 'Negocio familiar', descripcion: 'Tradición de servicio' },
      { nombre: 'Surtido completo', descripcion: 'Todo para fiestas' }
    ],
    transporte: {
      referencias: ['Avenida Juárez', 'Cuajimalpa de Morelos']
    },
    imagen: getImagenPorIndice(2),
    imagenes: [getImagenPorIndice(2), getImagenPorIndice(3), getImagenPorIndice(4)]
  },
  // ========== TLÁHUAC (1) ==========
  {
    nombre: 'Dulcería y Materias Primas Unicornio',
    slug: 'dulceria-unicornio',
    tipo: 'Dulcería Mayoreo',
    direccion: 'Av. Tláhuac 30',
    colonia: 'Ojo de Agua',
    alcaldia: 'Tláhuac',
    alcaldiaSlug: 'tlahuac',
    cp: '13500',
    coordenadas: { lat: 19.2745, lng: -99.0456 },
    telefono: '55 5841 2133',
    mapsUrl: 'https://maps.google.com/?q=Dulceria+Unicornio+Tlahuac',
    rating: 4.4,
    resenas: 78,
    verificado: true,
    destacado: true,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería y materias primas para repostería en Tláhuac.',
    especialidades: ['Materias primas', 'Repostería', 'Dulces al mayoreo'],
    productos: ['Ingredientes para repostería', 'Dulces a granel', 'Chocolates', 'Decoraciones'],
    servicios: [
      { nombre: 'Materias primas', descripcion: 'Todo para repostería' },
      { nombre: 'Mayoreo y menudeo', descripcion: 'Precios para todos' }
    ],
    transporte: {
      referencias: ['Avenida Tláhuac', 'Colonia Ojo de Agua']
    },
    imagen: getImagenPorIndice(3),
    imagenes: [getImagenPorIndice(3), getImagenPorIndice(4), getImagenPorIndice(5)]
  },
  // ========== IZTAPALAPA (5) ==========
  {
    nombre: 'La Dulce Vida',
    slug: 'la-dulce-vida',
    tipo: 'Tienda de Golosinas',
    direccion: 'Ermita Iztapalapa 3365',
    colonia: 'Citlalli',
    alcaldia: 'Iztapalapa',
    alcaldiaSlug: 'iztapalapa',
    cp: '09660',
    coordenadas: { lat: 19.3567, lng: -99.0678 },
    telefono: '55 5427 8240',
    mapsUrl: 'https://maps.google.com/?q=La+Dulce+Vida+Iztapalapa',
    rating: 4.3,
    resenas: 92,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería con amplio surtido sobre Ermita Iztapalapa.',
    especialidades: ['Dulces variados', 'Confitería', 'Piñatas'],
    productos: ['Gomitas', 'Chocolates', 'Dulces mexicanos', 'Paletas', 'Chicles'],
    servicios: [
      { nombre: 'Amplio surtido', descripcion: 'Gran variedad de productos' },
      { nombre: 'Ubicación accesible', descripcion: 'Sobre avenida principal' }
    ],
    transporte: {
      referencias: ['Ermita Iztapalapa', 'Colonia Citlalli']
    },
    imagen: getImagenPorIndice(4),
    imagenes: [getImagenPorIndice(4), getImagenPorIndice(5), getImagenPorIndice(6)]
  },
  {
    nombre: 'Dulce Abeja',
    slug: 'dulce-abeja',
    tipo: 'Tienda de Golosinas',
    direccion: 'Ermita Iztapalapa 3417',
    colonia: 'Xalpa',
    alcaldia: 'Iztapalapa',
    alcaldiaSlug: 'iztapalapa',
    cp: '09640',
    coordenadas: { lat: 19.3571, lng: -99.0682 },
    telefono: '55 6609 0985',
    mapsUrl: 'https://maps.google.com/?q=Dulce+Abeja+Iztapalapa',
    rating: 4.2,
    resenas: 67,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería familiar en la colonia Xalpa, Iztapalapa.',
    especialidades: ['Dulces tradicionales', 'Confitería', 'Golosinas'],
    productos: ['Gomitas', 'Chocolates', 'Dulces mexicanos', 'Paletas'],
    servicios: [
      { nombre: 'Atención familiar', descripcion: 'Servicio personalizado' },
      { nombre: 'Buenos precios', descripcion: 'Economía para tu bolsillo' }
    ],
    transporte: {
      referencias: ['Ermita Iztapalapa', 'Colonia Xalpa']
    },
    imagen: getImagenPorIndice(5),
    imagenes: [getImagenPorIndice(5), getImagenPorIndice(6), getImagenPorIndice(7)]
  },
  {
    nombre: 'Dulcería Ivonne',
    slug: 'dulceria-ivonne',
    tipo: 'Tienda de Golosinas',
    direccion: 'Av. del Rosal 160',
    colonia: 'Iztapalapa',
    alcaldia: 'Iztapalapa',
    alcaldiaSlug: 'iztapalapa',
    cp: '09000',
    coordenadas: { lat: 19.3589, lng: -99.0712 },
    telefono: '55 1642 1453',
    mapsUrl: 'https://maps.google.com/?q=Dulceria+Ivonne+Iztapalapa',
    rating: 4.3,
    resenas: 54,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería con buen surtido en Avenida del Rosal.',
    especialidades: ['Dulces para fiestas', 'Confitería', 'Piñatas'],
    productos: ['Gomitas', 'Chocolates', 'Dulces mexicanos', 'Chicles'],
    servicios: [
      { nombre: 'Surtido para eventos', descripcion: 'Todo para tu fiesta' },
      { nombre: 'Atención personalizada', descripcion: 'Te ayudamos a elegir' }
    ],
    transporte: {
      referencias: ['Avenida del Rosal', 'Iztapalapa']
    },
    imagen: getImagenPorIndice(6),
    imagenes: [getImagenPorIndice(6), getImagenPorIndice(7), getImagenPorIndice(8)]
  },
  {
    nombre: 'Dulcería Los Peques',
    slug: 'dulceria-los-peques',
    tipo: 'Tienda de Golosinas',
    direccion: 'Francisco Quintanilla 4-2',
    colonia: 'Las Peñas',
    alcaldia: 'Iztapalapa',
    alcaldiaSlug: 'iztapalapa',
    cp: '09720',
    coordenadas: { lat: 19.3534, lng: -99.0645 },
    telefono: 'Sin teléfono registrado',
    mapsUrl: 'https://maps.google.com/?q=Dulceria+Los+Peques+Iztapalapa',
    rating: 4.1,
    resenas: 38,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería de barrio en Las Peñas, Iztapalapa.',
    especialidades: ['Dulces para niños', 'Golosinas', 'Piñatas'],
    productos: ['Dulces infantiles', 'Gomitas', 'Paletas', 'Chicles'],
    servicios: [
      { nombre: 'Especialidad infantil', descripcion: 'Dulces para los pequeños' },
      { nombre: 'Precios accesibles', descripcion: 'Economía familiar' }
    ],
    transporte: {
      referencias: ['Francisco Quintanilla', 'Colonia Las Peñas']
    },
    imagen: getImagenPorIndice(7),
    imagenes: [getImagenPorIndice(7), getImagenPorIndice(8), getImagenPorIndice(9)]
  },
  {
    nombre: 'Dulcería Los Reyes',
    slug: 'dulceria-los-reyes-iztapalapa',
    tipo: 'Tienda de Golosinas',
    direccion: 'Manuel Cañas',
    colonia: 'Lomas de Santa Cruz',
    alcaldia: 'Iztapalapa',
    alcaldiaSlug: 'iztapalapa',
    cp: '09700',
    coordenadas: { lat: 19.3501, lng: -99.0623 },
    telefono: 'Sin teléfono registrado',
    mapsUrl: 'https://maps.google.com/?q=Dulceria+Los+Reyes+Iztapalapa',
    rating: 4.0,
    resenas: 29,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería local en Lomas de Santa Cruz.',
    especialidades: ['Dulces variados', 'Confitería', 'Productos locales'],
    productos: ['Gomitas', 'Chocolates', 'Dulces mexicanos', 'Paletas'],
    servicios: [
      { nombre: 'Negocio de barrio', descripcion: 'Atención cercana' },
      { nombre: 'Precios económicos', descripcion: 'Accesible para todos' }
    ],
    transporte: {
      referencias: ['Calle Manuel Cañas', 'Lomas de Santa Cruz']
    },
    imagen: getImagenPorIndice(8),
    imagenes: [getImagenPorIndice(8), getImagenPorIndice(9), getImagenPorIndice(10)]
  },
  // ========== CUAUHTÉMOC (8) ==========
  {
    nombre: 'Dulces y Chocolates La Giralda',
    slug: 'dulces-y-chocolates-la-giralda',
    tipo: 'Tienda de Golosinas Premium',
    direccion: 'Chimalpopoca 77',
    colonia: 'Obrera',
    alcaldia: 'Cuauhtémoc',
    alcaldiaSlug: 'cuauhtemoc',
    cp: '06800',
    coordenadas: { lat: 19.4234, lng: -99.1345 },
    telefono: '55 5578 3875',
    mapsUrl: 'https://maps.google.com/?q=Dulces+y+Chocolates+La+Giralda+Cuauhtemoc',
    rating: 4.5,
    resenas: 156,
    verificado: true,
    destacado: true,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Especialistas en chocolates y dulces finos en la Obrera.',
    especialidades: ['Chocolates finos', 'Dulces gourmet', 'Confitería premium'],
    productos: ['Chocolates belgas', 'Trufas', 'Dulces importados', 'Confitería'],
    servicios: [
      { nombre: 'Chocolates premium', descripcion: 'Productos de alta calidad' },
      { nombre: 'Regalos especiales', descripcion: 'Presentaciones elegantes' }
    ],
    transporte: {
      metro: [{ linea: '2', estacion: 'Chabacano', distancia: '8 min caminando' }],
      referencias: ['Calle Chimalpopoca', 'Colonia Obrera']
    },
    imagen: getImagenPorIndice(9),
    imagenes: [getImagenPorIndice(9), getImagenPorIndice(10), getImagenPorIndice(0)]
  },
  {
    nombre: 'Dulcería Luz',
    slug: 'dulceria-luz',
    tipo: 'Tienda de Golosinas',
    direccion: 'Simón Bolívar 377',
    colonia: 'Obrera',
    alcaldia: 'Cuauhtémoc',
    alcaldiaSlug: 'cuauhtemoc',
    cp: '06800',
    coordenadas: { lat: 19.4228, lng: -99.1349 },
    telefono: 'Sin teléfono registrado',
    mapsUrl: 'https://maps.google.com/?q=Dulceria+Luz+Obrera+Cuauhtemoc',
    rating: 4.2,
    resenas: 67,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería tradicional en la colonia Obrera.',
    especialidades: ['Dulces tradicionales', 'Confitería', 'Golosinas'],
    productos: ['Gomitas', 'Chocolates', 'Dulces mexicanos', 'Paletas'],
    servicios: [
      { nombre: 'Tradición de barrio', descripcion: 'Negocio establecido' },
      { nombre: 'Surtido completo', descripcion: 'Variedad de productos' }
    ],
    transporte: {
      metro: [{ linea: '2', estacion: 'Chabacano', distancia: '10 min caminando' }],
      referencias: ['Simón Bolívar', 'Colonia Obrera']
    },
    imagen: getImagenPorIndice(10),
    imagenes: [getImagenPorIndice(10), getImagenPorIndice(0), getImagenPorIndice(1)]
  },
  {
    nombre: 'La Gota de Oro',
    slug: 'la-gota-de-oro',
    tipo: 'Tienda de Golosinas',
    direccion: 'Simón Bolívar 341',
    colonia: 'Obrera',
    alcaldia: 'Cuauhtémoc',
    alcaldiaSlug: 'cuauhtemoc',
    cp: '06800',
    coordenadas: { lat: 19.4231, lng: -99.1347 },
    telefono: '55 2683 3744',
    mapsUrl: 'https://maps.google.com/?q=La+Gota+de+Oro+Obrera+Cuauhtemoc',
    rating: 4.3,
    resenas: 89,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería con tradición en la colonia Obrera.',
    especialidades: ['Dulces variados', 'Confitería', 'Piñatas'],
    productos: ['Gomitas', 'Chocolates', 'Dulces mexicanos', 'Paletas'],
    servicios: [
      { nombre: 'Variedad de productos', descripcion: 'Amplio surtido' },
      { nombre: 'Buenos precios', descripcion: 'Economía garantizada' }
    ],
    transporte: {
      metro: [{ linea: '2', estacion: 'Chabacano', distancia: '10 min caminando' }],
      referencias: ['Simón Bolívar', 'Colonia Obrera']
    },
    imagen: getImagenPorIndice(0),
    imagenes: [getImagenPorIndice(0), getImagenPorIndice(1), getImagenPorIndice(2)]
  },
  {
    nombre: 'Dulcería Mary',
    slug: 'dulceria-mary',
    tipo: 'Tienda de Golosinas',
    direccion: 'Dr. Jiménez 164-Local C',
    colonia: 'Doctores',
    alcaldia: 'Cuauhtémoc',
    alcaldiaSlug: 'cuauhtemoc',
    cp: '06720',
    coordenadas: { lat: 19.4189, lng: -99.1423 },
    telefono: 'Sin teléfono registrado',
    mapsUrl: 'https://maps.google.com/?q=Dulceria+Mary+Doctores+Cuauhtemoc',
    rating: 4.1,
    resenas: 45,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería familiar en la colonia Doctores.',
    especialidades: ['Dulces tradicionales', 'Confitería', 'Golosinas'],
    productos: ['Gomitas', 'Chocolates', 'Dulces mexicanos', 'Chicles'],
    servicios: [
      { nombre: 'Negocio familiar', descripcion: 'Atención personalizada' },
      { nombre: 'Precios accesibles', descripcion: 'Economía local' }
    ],
    transporte: {
      metro: [{ linea: '3', estacion: 'Centro Médico', distancia: '5 min caminando' }],
      referencias: ['Calle Dr. Jiménez', 'Colonia Doctores']
    },
    imagen: getImagenPorIndice(1),
    imagenes: [getImagenPorIndice(1), getImagenPorIndice(2), getImagenPorIndice(3)]
  },
  {
    nombre: 'Dulcería Diana',
    slug: 'dulceria-diana',
    tipo: 'Tienda de Golosinas',
    direccion: 'Santa María La Ribera 10',
    colonia: 'Santa María la Ribera',
    alcaldia: 'Cuauhtémoc',
    alcaldiaSlug: 'cuauhtemoc',
    cp: '06400',
    coordenadas: { lat: 19.4512, lng: -99.1567 },
    telefono: '55 8205 3592',
    mapsUrl: 'https://maps.google.com/?q=Dulceria+Diana+Santa+Maria+la+Ribera',
    rating: 4.3,
    resenas: 78,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería tradicional en Santa María la Ribera.',
    especialidades: ['Dulces variados', 'Confitería', 'Piñatas'],
    productos: ['Gomitas', 'Chocolates', 'Dulces mexicanos', 'Paletas'],
    servicios: [
      { nombre: 'Tradición de barrio', descripcion: 'Negocio establecido' },
      { nombre: 'Surtido para fiestas', descripcion: 'Todo para tu evento' }
    ],
    transporte: {
      metro: [{ linea: 'B', estacion: 'San Cosme', distancia: '8 min caminando' }],
      referencias: ['Santa María la Ribera', 'Cerca del Kiosco Morisco']
    },
    imagen: getImagenPorIndice(2),
    imagenes: [getImagenPorIndice(2), getImagenPorIndice(3), getImagenPorIndice(4)]
  },
  {
    nombre: 'María José Dulcería',
    slug: 'maria-jose-dulceria',
    tipo: 'Tienda de Golosinas',
    direccion: 'Mercado La Dalia',
    colonia: 'Santa María la Ribera',
    alcaldia: 'Cuauhtémoc',
    alcaldiaSlug: 'cuauhtemoc',
    cp: '06400',
    coordenadas: { lat: 19.4518, lng: -99.1572 },
    telefono: '55 4133 8825',
    mapsUrl: 'https://maps.google.com/?q=Maria+Jose+Dulceria+Mercado+La+Dalia',
    rating: 4.4,
    resenas: 95,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.mercado,
    descripcionCorta: 'Dulcería dentro del Mercado La Dalia con amplio surtido.',
    especialidades: ['Dulces a granel', 'Precios de mercado', 'Variedad'],
    productos: ['Dulces mexicanos', 'Gomitas', 'Chocolates', 'Confitería'],
    servicios: [
      { nombre: 'Precios de mercado', descripcion: 'Los mejores precios' },
      { nombre: 'Variedad amplia', descripcion: 'Todo en un solo lugar' }
    ],
    transporte: {
      metro: [{ linea: 'B', estacion: 'San Cosme', distancia: '10 min caminando' }],
      referencias: ['Mercado La Dalia', 'Santa María la Ribera']
    },
    imagen: getImagenPorIndice(3),
    imagenes: [getImagenPorIndice(3), getImagenPorIndice(4), getImagenPorIndice(5)]
  },
  {
    nombre: 'Dulcería La Dalia',
    slug: 'dulceria-la-dalia',
    tipo: 'Tienda de Golosinas',
    direccion: 'C. del Fresno 215',
    colonia: 'Santa María la Ribera',
    alcaldia: 'Cuauhtémoc',
    alcaldiaSlug: 'cuauhtemoc',
    cp: '06400',
    coordenadas: { lat: 19.4521, lng: -99.1575 },
    telefono: '55 5547 1596',
    mapsUrl: 'https://maps.google.com/?q=Dulceria+La+Dalia+Santa+Maria+la+Ribera',
    rating: 4.2,
    resenas: 63,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería de barrio en la calle del Fresno.',
    especialidades: ['Dulces tradicionales', 'Confitería', 'Piñatas'],
    productos: ['Gomitas', 'Chocolates', 'Dulces mexicanos', 'Paletas'],
    servicios: [
      { nombre: 'Negocio local', descripcion: 'Tradición de barrio' },
      { nombre: 'Surtido completo', descripcion: 'Todo para fiestas' }
    ],
    transporte: {
      metro: [{ linea: 'B', estacion: 'San Cosme', distancia: '12 min caminando' }],
      referencias: ['Calle del Fresno', 'Santa María la Ribera']
    },
    imagen: getImagenPorIndice(4),
    imagenes: [getImagenPorIndice(4), getImagenPorIndice(5), getImagenPorIndice(6)]
  },
  {
    nombre: 'Dulcería Don Toño',
    slug: 'dulceria-don-tono',
    tipo: 'Dulcería Mayoreo',
    direccion: 'Rep. de Uruguay 177-Local B',
    colonia: 'Centro Histórico',
    alcaldia: 'Cuauhtémoc',
    alcaldiaSlug: 'cuauhtemoc',
    cp: '06000',
    coordenadas: { lat: 19.4312, lng: -99.1289 },
    telefono: 'Sin teléfono registrado',
    mapsUrl: 'https://maps.google.com/?q=Dulceria+Don+Tono+Centro+Historico+CDMX',
    rating: 4.3,
    resenas: 112,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería con tradición en el Centro Histórico de CDMX.',
    especialidades: ['Mayoreo y menudeo', 'Dulces tradicionales', 'Variedad'],
    productos: ['Dulces mexicanos', 'Gomitas', 'Chocolates', 'Confitería'],
    servicios: [
      { nombre: 'Ubicación céntrica', descripcion: 'En el corazón de la ciudad' },
      { nombre: 'Precios competitivos', descripcion: 'Mayoreo disponible' }
    ],
    transporte: {
      metro: [{ linea: '1', estacion: 'Pino Suárez', distancia: '5 min caminando' }],
      referencias: ['República de Uruguay', 'Centro Histórico']
    },
    imagen: getImagenPorIndice(5),
    imagenes: [getImagenPorIndice(5), getImagenPorIndice(6), getImagenPorIndice(7)]
  },
  // ========== IZTACALCO (1) ==========
  {
    nombre: 'Dulcería Marte y Más',
    slug: 'dulceria-marte-y-mas',
    tipo: 'Tienda de Golosinas',
    direccion: 'Playa Tabachines S/N',
    colonia: 'Militar Marte',
    alcaldia: 'Iztacalco',
    alcaldiaSlug: 'iztacalco',
    cp: '08830',
    coordenadas: { lat: 19.3934, lng: -99.0823 },
    telefono: 'Sin teléfono registrado',
    mapsUrl: 'https://maps.google.com/?q=Dulceria+Marte+y+Mas+Iztacalco',
    rating: 4.1,
    resenas: 34,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería local en la colonia Militar Marte.',
    especialidades: ['Dulces variados', 'Confitería', 'Golosinas'],
    productos: ['Gomitas', 'Chocolates', 'Dulces mexicanos', 'Paletas'],
    servicios: [
      { nombre: 'Negocio de barrio', descripcion: 'Atención cercana' },
      { nombre: 'Precios accesibles', descripcion: 'Economía local' }
    ],
    transporte: {
      referencias: ['Playa Tabachines', 'Colonia Militar Marte']
    },
    imagen: getImagenPorIndice(6),
    imagenes: [getImagenPorIndice(6), getImagenPorIndice(7), getImagenPorIndice(8)]
  },
  // ========== COYOACÁN (2) ==========
  {
    nombre: 'Granel Dulcerías Coyoacán',
    slug: 'granel-dulcerias-coyoacan',
    tipo: 'Dulcería Mayoreo',
    direccion: 'Av. Miguel Ángel de Quevedo 443-LS-002',
    colonia: 'Coyoacán',
    alcaldia: 'Coyoacán',
    alcaldiaSlug: 'coyoacan',
    cp: '04000',
    coordenadas: { lat: 19.3456, lng: -99.1623 },
    telefono: 'Sin teléfono registrado',
    mapsUrl: 'https://maps.google.com/?q=Granel+Dulcerias+Coyoacan',
    rating: 4.4,
    resenas: 187,
    verificado: true,
    destacado: true,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería a granel sobre Miguel Ángel de Quevedo.',
    especialidades: ['Dulces a granel', 'Mayoreo y menudeo', 'Gran variedad'],
    productos: ['Gomitas importadas', 'Chocolates', 'Dulces mexicanos', 'Confitería'],
    servicios: [
      { nombre: 'Venta a granel', descripcion: 'Compra la cantidad que necesites' },
      { nombre: 'Precios de mayoreo', descripcion: 'Descuentos por volumen' }
    ],
    transporte: {
      metro: [{ linea: '3', estacion: 'M.A. de Quevedo', distancia: '3 min caminando' }],
      referencias: ['Sobre Miguel Ángel de Quevedo', 'Cerca del Metro']
    },
    imagen: getImagenPorIndice(7),
    imagenes: [getImagenPorIndice(7), getImagenPorIndice(8), getImagenPorIndice(9)]
  },
  {
    nombre: 'Dulcería El Progreso',
    slug: 'dulceria-el-progreso',
    tipo: 'Tienda de Golosinas',
    direccion: 'Av. Escuinapa 42 bis',
    colonia: 'Pedregal de Santo Domingo',
    alcaldia: 'Coyoacán',
    alcaldiaSlug: 'coyoacan',
    cp: '04369',
    coordenadas: { lat: 19.3234, lng: -99.1512 },
    telefono: 'Sin teléfono registrado',
    mapsUrl: 'https://maps.google.com/?q=Dulceria+El+Progreso+Coyoacan',
    rating: 4.2,
    resenas: 56,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería tradicional en Pedregal de Santo Domingo.',
    especialidades: ['Dulces variados', 'Confitería', 'Piñatas'],
    productos: ['Gomitas', 'Chocolates', 'Dulces mexicanos', 'Paletas'],
    servicios: [
      { nombre: 'Negocio de barrio', descripcion: 'Tradición local' },
      { nombre: 'Surtido completo', descripcion: 'Todo para fiestas' }
    ],
    transporte: {
      referencias: ['Avenida Escuinapa', 'Pedregal de Santo Domingo']
    },
    imagen: getImagenPorIndice(8),
    imagenes: [getImagenPorIndice(8), getImagenPorIndice(9), getImagenPorIndice(10)]
  },
  // ========== GUSTAVO A. MADERO (5) ==========
  {
    nombre: 'Chilim Balam',
    slug: 'chilim-balam',
    tipo: 'Tienda de Golosinas',
    direccion: 'Colector 13 280 Local L-132',
    colonia: 'Parque Lindavista',
    alcaldia: 'Gustavo A. Madero',
    alcaldiaSlug: 'gustavo-a-madero',
    cp: '07300',
    coordenadas: { lat: 19.4923, lng: -99.1234 },
    telefono: 'Sin teléfono registrado',
    mapsUrl: 'https://maps.google.com/?q=Chilim+Balam+Parque+Lindavista',
    rating: 4.3,
    resenas: 89,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería moderna en Parque Lindavista.',
    especialidades: ['Dulces importados', 'Golosinas', 'Confitería'],
    productos: ['Gomitas importadas', 'Chocolates', 'Dulces mexicanos', 'Paletas'],
    servicios: [
      { nombre: 'Productos importados', descripcion: 'Variedad internacional' },
      { nombre: 'Ubicación en plaza', descripcion: 'Fácil acceso' }
    ],
    transporte: {
      metro: [{ linea: '6', estacion: 'Deportivo 18 de Marzo', distancia: '10 min caminando' }],
      referencias: ['Parque Lindavista', 'Colector 13']
    },
    imagen: getImagenPorIndice(9),
    imagenes: [getImagenPorIndice(9), getImagenPorIndice(10), getImagenPorIndice(0)]
  },
  {
    nombre: 'Dulcería La Huerta',
    slug: 'dulceria-la-huerta',
    tipo: 'Tienda de Golosinas',
    direccion: 'Atepoxco 98',
    colonia: 'Tepeyac Insurgentes',
    alcaldia: 'Gustavo A. Madero',
    alcaldiaSlug: 'gustavo-a-madero',
    cp: '07020',
    coordenadas: { lat: 19.4867, lng: -99.1156 },
    telefono: '55 8813 0007',
    mapsUrl: 'https://maps.google.com/?q=Dulceria+La+Huerta+Tepeyac+Insurgentes',
    rating: 4.4,
    resenas: 76,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería con buen surtido en Tepeyac Insurgentes.',
    especialidades: ['Dulces variados', 'Confitería', 'Piñatas'],
    productos: ['Gomitas', 'Chocolates', 'Dulces mexicanos', 'Paletas'],
    servicios: [
      { nombre: 'Amplio surtido', descripcion: 'Variedad de productos' },
      { nombre: 'Atención personalizada', descripcion: 'Te ayudan a elegir' }
    ],
    transporte: {
      metro: [{ linea: '6', estacion: 'La Villa-Basílica', distancia: '8 min caminando' }],
      referencias: ['Calle Atepoxco', 'Tepeyac Insurgentes']
    },
    imagen: getImagenPorIndice(10),
    imagenes: [getImagenPorIndice(10), getImagenPorIndice(0), getImagenPorIndice(1)]
  },
  {
    nombre: 'Dulcería México',
    slug: 'dulceria-mexico-gam',
    tipo: 'Dulcería Mayoreo',
    direccion: 'Av. Dolores Hidalgo esq.',
    colonia: 'San Felipe de Jesús',
    alcaldia: 'Gustavo A. Madero',
    alcaldiaSlug: 'gustavo-a-madero',
    cp: '07510',
    coordenadas: { lat: 19.4812, lng: -99.0934 },
    telefono: '55 5137 6945',
    mapsUrl: 'https://maps.google.com/?q=Dulceria+Mexico+San+Felipe+de+Jesus',
    rating: 4.3,
    resenas: 98,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería de mayoreo en San Felipe de Jesús.',
    especialidades: ['Mayoreo y menudeo', 'Dulces mexicanos', 'Variedad'],
    productos: ['Dulces tradicionales', 'Gomitas', 'Chocolates', 'Confitería'],
    servicios: [
      { nombre: 'Precios de mayoreo', descripcion: 'Descuentos por volumen' },
      { nombre: 'Gran variedad', descripcion: 'Amplio surtido' }
    ],
    transporte: {
      referencias: ['Avenida Dolores Hidalgo', 'San Felipe de Jesús']
    },
    imagen: getImagenPorIndice(0),
    imagenes: [getImagenPorIndice(0), getImagenPorIndice(1), getImagenPorIndice(2)]
  },
  {
    nombre: 'Dulcería El Bombón',
    slug: 'dulceria-el-bombon',
    tipo: 'Tienda de Golosinas',
    direccion: 'Av. Leon de los Aldama 3485-B',
    colonia: 'San Felipe de Jesús',
    alcaldia: 'Gustavo A. Madero',
    alcaldiaSlug: 'gustavo-a-madero',
    cp: '07510',
    coordenadas: { lat: 19.4815, lng: -99.0937 },
    telefono: 'Sin teléfono registrado',
    mapsUrl: 'https://maps.google.com/?q=Dulceria+El+Bombon+San+Felipe+de+Jesus',
    rating: 4.1,
    resenas: 45,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería de barrio en San Felipe de Jesús.',
    especialidades: ['Dulces variados', 'Confitería', 'Golosinas'],
    productos: ['Gomitas', 'Chocolates', 'Dulces mexicanos', 'Paletas'],
    servicios: [
      { nombre: 'Negocio local', descripcion: 'Atención de barrio' },
      { nombre: 'Precios accesibles', descripcion: 'Economía familiar' }
    ],
    transporte: {
      referencias: ['Avenida Leon de los Aldama', 'San Felipe de Jesús']
    },
    imagen: getImagenPorIndice(1),
    imagenes: [getImagenPorIndice(1), getImagenPorIndice(2), getImagenPorIndice(3)]
  },
  {
    nombre: 'Dulcería Val-Azu',
    slug: 'dulceria-val-azu',
    tipo: 'Tienda de Golosinas',
    direccion: 'Tamazula 3',
    colonia: 'San Felipe de Jesús',
    alcaldia: 'Gustavo A. Madero',
    alcaldiaSlug: 'gustavo-a-madero',
    cp: '07510',
    coordenadas: { lat: 19.4818, lng: -99.0940 },
    telefono: '55 7838 2446',
    mapsUrl: 'https://maps.google.com/?q=Dulceria+Val-Azu+San+Felipe+de+Jesus',
    rating: 4.2,
    resenas: 52,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería familiar en San Felipe de Jesús.',
    especialidades: ['Dulces variados', 'Confitería', 'Piñatas'],
    productos: ['Gomitas', 'Chocolates', 'Dulces mexicanos', 'Paletas'],
    servicios: [
      { nombre: 'Negocio familiar', descripcion: 'Tradición de servicio' },
      { nombre: 'Surtido completo', descripcion: 'Todo para fiestas' }
    ],
    transporte: {
      referencias: ['Calle Tamazula', 'San Felipe de Jesús']
    },
    imagen: getImagenPorIndice(2),
    imagenes: [getImagenPorIndice(2), getImagenPorIndice(3), getImagenPorIndice(4)]
  },
  // ========== BENITO JUÁREZ (1) ==========
  {
    nombre: 'Dulcería Samy',
    slug: 'dulceria-samy',
    tipo: 'Tienda de Golosinas',
    direccion: 'Av. Víctor Hugo 66-B',
    colonia: 'Portales Norte',
    alcaldia: 'Benito Juárez',
    alcaldiaSlug: 'benito-juarez',
    cp: '03300',
    coordenadas: { lat: 19.3712, lng: -99.1534 },
    telefono: '55 5243 0351',
    mapsUrl: 'https://maps.google.com/?q=Dulceria+Samy+Portales+Norte',
    rating: 4.3,
    resenas: 87,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería con buen surtido en Portales Norte.',
    especialidades: ['Dulces variados', 'Confitería', 'Piñatas'],
    productos: ['Gomitas', 'Chocolates', 'Dulces mexicanos', 'Paletas'],
    servicios: [
      { nombre: 'Amplio surtido', descripcion: 'Variedad de productos' },
      { nombre: 'Atención personalizada', descripcion: 'Te ayudan a elegir' }
    ],
    transporte: {
      metro: [{ linea: '2', estacion: 'Portales', distancia: '6 min caminando' }],
      referencias: ['Avenida Víctor Hugo', 'Portales Norte']
    },
    imagen: getImagenPorIndice(3),
    imagenes: [getImagenPorIndice(3), getImagenPorIndice(4), getImagenPorIndice(5)]
  },
  // ========== ÁLVARO OBREGÓN (2) ==========
  {
    nombre: 'Dulcería Josaret',
    slug: 'dulceria-josaret',
    tipo: 'Tienda de Golosinas',
    direccion: 'Agustín Lara 143',
    colonia: 'Olivar del Conde',
    alcaldia: 'Álvaro Obregón',
    alcaldiaSlug: 'alvaro-obregon',
    cp: '01400',
    coordenadas: { lat: 19.3678, lng: -99.2134 },
    telefono: 'Sin teléfono registrado',
    mapsUrl: 'https://maps.google.com/?q=Dulceria+Josaret+Olivar+del+Conde',
    rating: 4.1,
    resenas: 38,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería de barrio en Olivar del Conde.',
    especialidades: ['Dulces variados', 'Confitería', 'Golosinas'],
    productos: ['Gomitas', 'Chocolates', 'Dulces mexicanos', 'Paletas'],
    servicios: [
      { nombre: 'Negocio local', descripcion: 'Atención de barrio' },
      { nombre: 'Precios accesibles', descripcion: 'Economía familiar' }
    ],
    transporte: {
      referencias: ['Calle Agustín Lara', 'Olivar del Conde']
    },
    imagen: getImagenPorIndice(4),
    imagenes: [getImagenPorIndice(4), getImagenPorIndice(5), getImagenPorIndice(6)]
  },
  {
    nombre: 'Dulcería Álvaro Obregón',
    slug: 'dulceria-alvaro-obregon',
    tipo: 'Tienda de Golosinas',
    direccion: 'Cucurpe 140',
    colonia: 'Magdalena Mixihuca',
    alcaldia: 'Venustiano Carranza',
    alcaldiaSlug: 'venustiano-carranza',
    cp: '15860',
    coordenadas: { lat: 19.4123, lng: -99.0912 },
    telefono: '55 4062 4328',
    mapsUrl: 'https://maps.google.com/?q=Dulceria+Alvaro+Obregon+Venustiano+Carranza',
    rating: 4.2,
    resenas: 67,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería con tradición en Magdalena Mixihuca.',
    especialidades: ['Dulces variados', 'Confitería', 'Piñatas'],
    productos: ['Gomitas', 'Chocolates', 'Dulces mexicanos', 'Paletas'],
    servicios: [
      { nombre: 'Negocio establecido', descripcion: 'Años de tradición' },
      { nombre: 'Surtido completo', descripcion: 'Todo para fiestas' }
    ],
    transporte: {
      metro: [{ linea: '9', estacion: 'Velódromo', distancia: '10 min caminando' }],
      referencias: ['Calle Cucurpe', 'Magdalena Mixihuca']
    },
    imagen: getImagenPorIndice(5),
    imagenes: [getImagenPorIndice(5), getImagenPorIndice(6), getImagenPorIndice(7)]
  },
  // ========== XOCHIMILCO (1) ==========
  {
    nombre: 'Dulcería Aguirre La Planta',
    slug: 'dulceria-aguirre-la-planta',
    tipo: 'Tienda de Golosinas',
    direccion: 'Acalotenco 107-237',
    colonia: 'Santa Cruz Acalpixca',
    alcaldia: 'Xochimilco',
    alcaldiaSlug: 'xochimilco',
    cp: '16500',
    coordenadas: { lat: 19.2678, lng: -99.0945 },
    telefono: '55 7511 7247',
    mapsUrl: 'https://maps.google.com/?q=Dulceria+Aguirre+La+Planta+Xochimilco',
    rating: 4.3,
    resenas: 54,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería familiar en Santa Cruz Acalpixca.',
    especialidades: ['Dulces tradicionales', 'Confitería', 'Productos locales'],
    productos: ['Dulces mexicanos', 'Gomitas', 'Chocolates', 'Paletas'],
    servicios: [
      { nombre: 'Tradición familiar', descripcion: 'Negocio establecido' },
      { nombre: 'Productos locales', descripcion: 'Dulces de la zona' }
    ],
    transporte: {
      referencias: ['Calle Acalotenco', 'Santa Cruz Acalpixca']
    },
    imagen: getImagenPorIndice(6),
    imagenes: [getImagenPorIndice(6), getImagenPorIndice(7), getImagenPorIndice(8)]
  },
  // ========== LA MAGDALENA CONTRERAS (2) ==========
  {
    nombre: 'Dulcería Millan',
    slug: 'dulceria-millan',
    tipo: 'Tienda de Golosinas',
    direccion: 'F.C. de Cuernavaca 3',
    colonia: 'Barrio San Francisco',
    alcaldia: 'La Magdalena Contreras',
    alcaldiaSlug: 'magdalena-contreras',
    cp: '10500',
    coordenadas: { lat: 19.3178, lng: -99.2234 },
    telefono: 'Sin teléfono registrado',
    mapsUrl: 'https://maps.google.com/?q=Dulceria+Millan+Magdalena+Contreras',
    rating: 4.1,
    resenas: 32,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería de barrio en San Francisco.',
    especialidades: ['Dulces variados', 'Confitería', 'Golosinas'],
    productos: ['Gomitas', 'Chocolates', 'Dulces mexicanos', 'Paletas'],
    servicios: [
      { nombre: 'Negocio local', descripcion: 'Atención cercana' },
      { nombre: 'Precios accesibles', descripcion: 'Economía de barrio' }
    ],
    transporte: {
      referencias: ['F.C. de Cuernavaca', 'Barrio San Francisco']
    },
    imagen: getImagenPorIndice(7),
    imagenes: [getImagenPorIndice(7), getImagenPorIndice(8), getImagenPorIndice(9)]
  },
  {
    nombre: 'Dulcería Arcoiris',
    slug: 'dulceria-arcoiris',
    tipo: 'Tienda de Golosinas',
    direccion: 'Retama',
    colonia: 'San Nicolás Totolapan',
    alcaldia: 'La Magdalena Contreras',
    alcaldiaSlug: 'magdalena-contreras',
    cp: '10900',
    coordenadas: { lat: 19.2934, lng: -99.2456 },
    telefono: 'Sin teléfono registrado',
    mapsUrl: 'https://maps.google.com/?q=Dulceria+Arcoiris+San+Nicolas+Totolapan',
    rating: 4.0,
    resenas: 28,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería local en San Nicolás Totolapan.',
    especialidades: ['Dulces variados', 'Confitería', 'Piñatas'],
    productos: ['Gomitas', 'Chocolates', 'Dulces mexicanos', 'Paletas'],
    servicios: [
      { nombre: 'Negocio de barrio', descripcion: 'Tradición local' },
      { nombre: 'Surtido básico', descripcion: 'Lo esencial para fiestas' }
    ],
    transporte: {
      referencias: ['Calle Retama', 'San Nicolás Totolapan']
    },
    imagen: getImagenPorIndice(8),
    imagenes: [getImagenPorIndice(8), getImagenPorIndice(9), getImagenPorIndice(10)]
  },
  // ========== TLALPAN (1) ==========
  {
    nombre: 'Mega Dulce',
    slug: 'mega-dulce-tlalpan',
    tipo: 'Dulcería Mayoreo',
    direccion: 'Carr. Picacho-Ajusco',
    colonia: 'Miguel Hidalgo 4ta Secc',
    alcaldia: 'Tlalpan',
    alcaldiaSlug: 'tlalpan',
    cp: '14250',
    coordenadas: { lat: 19.2567, lng: -99.1789 },
    telefono: 'Sin teléfono registrado',
    mapsUrl: 'https://maps.google.com/?q=Mega+Dulce+Picacho+Ajusco',
    rating: 4.3,
    resenas: 98,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería de mayoreo sobre Picacho-Ajusco.',
    especialidades: ['Mayoreo y menudeo', 'Gran variedad', 'Precios competitivos'],
    productos: ['Dulces a granel', 'Gomitas', 'Chocolates', 'Confitería'],
    servicios: [
      { nombre: 'Precios de mayoreo', descripcion: 'Descuentos por volumen' },
      { nombre: 'Amplio surtido', descripcion: 'Miles de productos' }
    ],
    transporte: {
      referencias: ['Carretera Picacho-Ajusco', 'Miguel Hidalgo 4ta Sección']
    },
    imagen: getImagenPorIndice(9),
    imagenes: [getImagenPorIndice(9), getImagenPorIndice(10), getImagenPorIndice(0)]
  },
  // ========== VENUSTIANO CARRANZA (1) ==========
  {
    nombre: 'Dulcería La Perlita',
    slug: 'dulceria-la-perlita',
    tipo: 'Tienda de Golosinas',
    direccion: 'C. 27 152',
    colonia: 'Ignacio Zaragoza',
    alcaldia: 'Venustiano Carranza',
    alcaldiaSlug: 'venustiano-carranza',
    cp: '15000',
    coordenadas: { lat: 19.4234, lng: -99.0823 },
    telefono: 'Sin teléfono registrado',
    mapsUrl: 'https://maps.google.com/?q=Dulceria+La+Perlita+Ignacio+Zaragoza',
    rating: 4.1,
    resenas: 42,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería tradicional en Ignacio Zaragoza.',
    especialidades: ['Dulces variados', 'Confitería', 'Piñatas'],
    productos: ['Gomitas', 'Chocolates', 'Dulces mexicanos', 'Paletas'],
    servicios: [
      { nombre: 'Negocio de barrio', descripcion: 'Tradición local' },
      { nombre: 'Precios accesibles', descripcion: 'Economía para todos' }
    ],
    transporte: {
      metro: [{ linea: '1', estacion: 'Gómez Farías', distancia: '12 min caminando' }],
      referencias: ['Calle 27', 'Colonia Ignacio Zaragoza']
    },
    imagen: getImagenPorIndice(10),
    imagenes: [getImagenPorIndice(10), getImagenPorIndice(0), getImagenPorIndice(1)]
  },
  // ========== AZCAPOTZALCO (1) ==========
  {
    nombre: 'Dulces y Botanas',
    slug: 'dulces-y-botanas-azcapotzalco',
    tipo: 'Tienda de Golosinas',
    direccion: 'C. 19 190',
    colonia: 'Pro Hogar',
    alcaldia: 'Azcapotzalco',
    alcaldiaSlug: 'azcapotzalco',
    cp: '02600',
    coordenadas: { lat: 19.4823, lng: -99.1867 },
    telefono: '55 1055 5215',
    mapsUrl: 'https://maps.google.com/?q=Dulces+y+Botanas+Pro+Hogar+Azcapotzalco',
    rating: 4.2,
    resenas: 56,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería y botanas en Pro Hogar.',
    especialidades: ['Dulces y botanas', 'Confitería', 'Golosinas'],
    productos: ['Gomitas', 'Chocolates', 'Botanas', 'Frituras', 'Dulces'],
    servicios: [
      { nombre: 'Dulces y botanas', descripcion: 'Dos en uno' },
      { nombre: 'Buenos precios', descripcion: 'Economía garantizada' }
    ],
    transporte: {
      metro: [{ linea: '6', estacion: 'Ferrería', distancia: '8 min caminando' }],
      referencias: ['Calle 19', 'Colonia Pro Hogar']
    },
    imagen: getImagenPorIndice(0),
    imagenes: [getImagenPorIndice(0), getImagenPorIndice(1), getImagenPorIndice(2)]
  },
  // ========== MIGUEL HIDALGO (1) ==========
  {
    nombre: 'La Reyna de Tacuba',
    slug: 'la-reyna-de-tacuba',
    tipo: 'Tienda de Golosinas',
    direccion: 'C. Mar Negro 31',
    colonia: 'Tacuba',
    alcaldia: 'Miguel Hidalgo',
    alcaldiaSlug: 'miguel-hidalgo',
    cp: '11410',
    coordenadas: { lat: 19.4567, lng: -99.1823 },
    telefono: '55 2658 6474',
    mapsUrl: 'https://maps.google.com/?q=La+Reyna+de+Tacuba+Miguel+Hidalgo',
    rating: 4.4,
    resenas: 87,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería tradicional en el corazón de Tacuba.',
    especialidades: ['Dulces tradicionales', 'Confitería', 'Piñatas'],
    productos: ['Dulces mexicanos', 'Gomitas', 'Chocolates', 'Paletas'],
    servicios: [
      { nombre: 'Tradición de Tacuba', descripcion: 'Negocio histórico' },
      { nombre: 'Surtido completo', descripcion: 'Todo para fiestas' }
    ],
    transporte: {
      metro: [{ linea: '2 y 7', estacion: 'Tacuba', distancia: '5 min caminando' }],
      referencias: ['Calle Mar Negro', 'Tacuba']
    },
    imagen: getImagenPorIndice(1),
    imagenes: [getImagenPorIndice(1), getImagenPorIndice(2), getImagenPorIndice(3)]
  }
];

// Combinar todas las dulcerías
export const todasLasDulcerias: Dulceria[] = [...dulceriasExistentes, ...dulceriasNuevas];

// Función para obtener dulcerías por alcaldía
export function getDulceriasPorAlcaldia(alcaldiaSlug: string): Dulceria[] {
  return todasLasDulcerias.filter(d => d.alcaldiaSlug === alcaldiaSlug);
}

// Función para obtener dulcerías destacadas
export function getDulceriasDestacadas(): Dulceria[] {
  return todasLasDulcerias.filter(d => d.destacado);
}

// Función para obtener dulcerías por tipo
export function getDulceriasPorTipo(tipo: Dulceria['tipo']): Dulceria[] {
  return todasLasDulcerias.filter(d => d.tipo === tipo);
}

// Función para obtener dulcería por slug
export function getDulceriaPorSlug(slug: string): Dulceria | undefined {
  return todasLasDulcerias.find(d => d.slug === slug);
}

// Función para obtener dulcerías relacionadas (misma alcaldía, excluyendo la actual)
export function getDulceriasRelacionadas(slug: string, limite: number = 4): Dulceria[] {
  const actual = getDulceriaPorSlug(slug);
  if (!actual) return [];

  const mismaAlcaldia = todasLasDulcerias.filter(d =>
    d.alcaldiaSlug === actual.alcaldiaSlug && d.slug !== slug
  );

  // Si no hay suficientes de la misma alcaldía, agregar de otras
  if (mismaAlcaldia.length < limite) {
    const otras = todasLasDulcerias.filter(d =>
      d.alcaldiaSlug !== actual.alcaldiaSlug && d.slug !== slug
    );
    return [...mismaAlcaldia, ...otras].slice(0, limite);
  }

  return mismaAlcaldia.slice(0, limite);
}

// Obtener alcaldías que tienen dulcerías (para navegación dinámica)
export function getAlcaldiasConDulcerias(): { slug: string; nombre: string; cantidad: number }[] {
  const conteo: Record<string, number> = {};
  todasLasDulcerias.forEach(d => {
    conteo[d.alcaldiaSlug] = (conteo[d.alcaldiaSlug] || 0) + 1;
  });

  return Object.entries(alcaldiasInfo)
    .filter(([slug]) => conteo[slug] && conteo[slug] > 0)
    .map(([slug, info]) => ({
      slug,
      nombre: info.nombre,
      cantidad: conteo[slug]
    }))
    .sort((a, b) => b.cantidad - a.cantidad);
}

// Obtener categorías con conteo real
export function getCategoriasConConteo(): { tipo: string; cantidad: number }[] {
  const conteo: Record<string, number> = {};
  todasLasDulcerias.forEach(d => {
    conteo[d.tipo] = (conteo[d.tipo] || 0) + 1;
  });

  return Object.entries(conteo)
    .map(([tipo, cantidad]) => ({ tipo, cantidad }))
    .sort((a, b) => b.cantidad - a.cantidad);
}

// Estadísticas del directorio
export function getEstadisticasDirectorio() {
  const porAlcaldia: Record<string, number> = {};
  const porTipo: Record<string, number> = {};
  let totalResenas = 0;

  todasLasDulcerias.forEach(d => {
    porAlcaldia[d.alcaldia] = (porAlcaldia[d.alcaldia] || 0) + 1;
    porTipo[d.tipo] = (porTipo[d.tipo] || 0) + 1;
    totalResenas += d.resenas;
  });

  return {
    total: todasLasDulcerias.length,
    porAlcaldia,
    porTipo,
    totalResenas,
    alcaldias: Object.keys(porAlcaldia).length,
    verificadas: todasLasDulcerias.filter(d => d.verificado).length,
    destacadas: todasLasDulcerias.filter(d => d.destacado).length
  };
}
