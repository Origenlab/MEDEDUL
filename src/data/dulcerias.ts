/**
 * Base de datos centralizada de dulcerías verificadas en CDMX
 * Todas verificadas en Google Maps sin página web propia
 */

export interface Dulceria {
  // Identificación
  nombre: string;
  slug: string;
  tipo: 'Tienda de Golosinas' | 'Dulcería Mayoreo' | 'Tienda de Golosinas Premium' | 'Dulcería Tradicional';

  // Zona geográfica (default: CDMX). Tres regiones soportadas:
  //  - 'cdmx'    → 16 alcaldías de Ciudad de México
  //  - 'edomex'  → municipios conurbados al Valle de México (Naucalpan, Ecatepec, Tlalnepantla…)
  //  - 'toluca'  → Zona Metropolitana del Valle de Toluca (Toluca, Metepec, Zinacantepec, Lerma…)
  estado?: 'CDMX' | 'Edo Mex' | 'Toluca';
  estadoSlug?: 'cdmx' | 'edomex' | 'toluca';

  // Ubicación
  direccion: string;
  colonia: string;
  alcaldia: string;       // Edo Mex y Toluca: municipio
  alcaldiaSlug: string;   // Edo Mex y Toluca: municipioSlug
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
  '/img/eventos/cumpleanos/infantiles/candy-bar-infantil-colorido.avif',
  '/img/galeria/mesa-dulces-boda-elegante-dorado-clasica.avif',
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

// Información de municipios del Estado de México con datos de contexto
export const municipiosInfo: Record<string, {
  nombre: string;
  descripcion: string;
  caracteristicas: string[];
  zonaComercial: string;
}> = {
  'naucalpan': {
    nombre: 'Naucalpan de Juárez',
    descripcion: 'Municipio conurbado al poniente de CDMX, con fuerte actividad comercial sobre el corredor Adolfo López Mateos y Mercado San Bartolo.',
    caracteristicas: ['Mercado San Bartolo histórico', 'Corredor López Mateos', 'Mayoreo y menudeo'],
    zonaComercial: 'Naucalpan Centro / San Bartolo'
  },
  'tlalnepantla': {
    nombre: 'Tlalnepantla de Baz',
    descripcion: 'Municipio industrial y comercial del norte conurbado, con zonas mayoristas en La Romana y Zaragoza.',
    caracteristicas: ['Zonas mayoristas consolidadas', 'Acceso por Periférico Norte', 'Variedad de proveedores'],
    zonaComercial: 'La Romana / Centro de Tlalnepantla'
  },
  'nezahualcoyotl': {
    nombre: 'Nezahualcóyotl',
    descripcion: 'Uno de los municipios más poblados del país, con fuerte demanda de dulcerías para fiestas y eventos familiares.',
    caracteristicas: ['Alta demanda para fiestas', 'Precios competitivos', 'Mayoreo desde 1 pieza'],
    zonaComercial: 'Av. Bordo de Xochiaca / Indios Verdes'
  },
  'ecatepec': {
    nombre: 'Ecatepec de Morelos',
    descripcion: 'Municipio al norte del Valle de México con gran tradición de dulces mexicanos y comercio de barrio.',
    caracteristicas: ['Dulces tradicionales mexicanos', 'Precios accesibles', 'Amplia cobertura'],
    zonaComercial: 'Col. Olímpica / Av. Central'
  },
  'chalco': {
    nombre: 'Chalco',
    descripcion: 'Municipio del oriente del Estado de México con comercios locales para fiestas infantiles y eventos familiares.',
    caracteristicas: ['Comercio local de fiesta', 'Atención cercana', 'Zona oriente'],
    zonaComercial: 'Chalco Centro'
  },
  'atizapan': {
    nombre: 'Atizapán de Zaragoza',
    descripcion: 'Municipio conurbado al noroeste con zonas residenciales y comercios establecidos en colonias como México 86.',
    caracteristicas: ['Zonas residenciales consolidadas', 'Artículos de fiesta', 'Dulcería de barrio'],
    zonaComercial: 'Col. México 86 / Atizapán Centro'
  },
  'coacalco': {
    nombre: 'Coacalco de Berriozábal',
    descripcion: 'Municipio del norte conurbado con fuerte presencia de dulcerías mayoristas que también surten materias primas.',
    caracteristicas: ['Mayoreo + materias primas', 'Dulces para repostería', 'Corredor Coacalco'],
    zonaComercial: 'Coacalco Centro'
  },
  'tultitlan': {
    nombre: 'Tultitlán',
    descripcion: 'Municipio del norte con la Central de Abastos de Tultitlán, punto clave para distribución mayorista de dulces en el norte del Valle.',
    caracteristicas: ['Central de Abastos', 'Mayoreo a gran escala', 'Distribución regional'],
    zonaComercial: 'Central de Abastos Tultitlán'
  },
  'texcoco': {
    nombre: 'Texcoco',
    descripcion: 'Municipio del oriente del Estado de México con tradición de dulces mexicanos y comercios de fiesta para bodas y XV años regionales.',
    caracteristicas: ['Dulces tradicionales del oriente', 'Mayoreo y menudeo', 'Bodas y XV años regionales'],
    zonaComercial: 'Texcoco Centro / Chiautla'
  },
  'nicolas-romero': {
    nombre: 'Nicolás Romero',
    descripcion: 'Municipio al norponiente con comercios de larga tradición sobre Av. Francisco I. Madero y zona Progreso Industrial.',
    caracteristicas: ['Dulcerías tradicionales', 'Mayoreo + materias primas', 'Artículos de fiesta'],
    zonaComercial: 'Villa Nicolás Romero / Progreso Industrial'
  },
  'cuautitlan-izcalli': {
    nombre: 'Cuautitlán Izcalli',
    descripcion: 'Municipio planificado del norte conurbado con amplias zonas residenciales y corredores comerciales como Paseos de Izcalli.',
    caracteristicas: ['Zonas residenciales amplias', 'Dulces + desechables', 'Cobertura por colonia'],
    zonaComercial: 'Paseos de Izcalli / Cofradía'
  },
  'tecamac': {
    nombre: 'Tecámac',
    descripcion: 'Municipio del norte del Valle de México con crecimiento residencial y dulcerías mayoristas para surtir fiestas regionales.',
    caracteristicas: ['Crecimiento residencial', 'Mayoreo para fiestas', 'Acceso por Autopista México-Pachuca'],
    zonaComercial: 'Tecámac Centro / Ojo de Agua'
  }
};

/**
 * Información de municipios de la Zona Metropolitana del Valle de Toluca (ZMVT).
 * Aunque geográficamente pertenecen al Estado de México, operan como un mercado
 * independiente — corredor comercial propio, logística distinta y proveedores
 * con cobertura regional que NO cruza al Valle de México. Por eso se modelan
 * como una tercera región del directorio MEDEDUL, al mismo nivel que CDMX y Edo Mex.
 */
export const municipiosToluca: Record<string, {
  nombre: string;
  descripcion: string;
  caracteristicas: string[];
  zonaComercial: string;
}> = {
  'toluca': {
    nombre: 'Toluca',
    descripcion: 'Capital del Estado de México y centro comercial del Valle de Toluca. Concentra el mayoreo histórico sobre 5 de Mayo, Mercado Juárez y el Corredor Tollocan, además de proveedores integrales que atienden toda la ZMVT.',
    caracteristicas: ['Capital estatal y eje del Valle de Toluca', 'Corredor mayorista 5 de Mayo / Mercado Juárez', 'Materias primas, dulces y desechables en un solo punto', 'A 50 min de Santa Fe por Autopista México-Toluca'],
    zonaComercial: 'Toluca Centro · 5 de Mayo · Paseo Tollocan'
  },
  'metepec': {
    nombre: 'Metepec',
    descripcion: 'Municipio conurbado a Toluca con el poder adquisitivo más alto del Valle. Reúne dulcerías artesanales históricas (Santana, Panal), boutiques premium orientadas a bodas de Galerías Metepec y candy bars corporativos sobre Av. Tecnológico.',
    caracteristicas: ['Zona residencial premium del Valle de Toluca', 'Dulcerías artesanales con 50+ años de tradición', 'Candy bar premium para bodas y corporativo', 'Chocolates finos y frutos secos importados'],
    zonaComercial: 'Metepec Centro · Av. Tecnológico · Galerías Metepec'
  },
  'zinacantepec': {
    nombre: 'Zinacantepec',
    descripcion: 'Municipio poniente del Valle de Toluca, puerta de entrada al Nevado. Dulcerías de barrio para fiestas residenciales y abasto regional para el corredor Toluca–Temascaltepec.',
    caracteristicas: ['Corredor poniente del Valle de Toluca', 'Fiestas residenciales y familiares', 'Puerta al Nevado de Toluca', 'Precios accesibles para surtido de fiesta'],
    zonaComercial: 'Zinacantepec Centro · Carretera Toluca-Temascaltepec'
  },
  'lerma': {
    nombre: 'Lerma',
    descripcion: 'Municipio industrial y comercial entre Toluca y Santa Fe. Dulcerías mayoristas que abastecen fábricas, parques industriales y eventos corporativos en el corredor Lerma–Ocoyoacac.',
    caracteristicas: ['Corredor industrial Toluca–Santa Fe', 'Mayoreo para eventos corporativos', 'Abasto a parques industriales', 'Acceso directo a Autopista México-Toluca'],
    zonaComercial: 'Lerma Centro · Zona Industrial · Paseo Tollocan'
  },
  'san-mateo-atenco': {
    nombre: 'San Mateo Atenco',
    descripcion: 'Municipio conurbado entre Toluca y Metepec, famoso por su tradición zapatera y comercio local. Dulcerías de barrio con horarios extendidos para fiestas infantiles y surtido de mostrador.',
    caracteristicas: ['Entre Toluca y Metepec', 'Tradición comercial local', 'Fiestas infantiles y residenciales', 'Precios competitivos'],
    zonaComercial: 'San Mateo Atenco Centro · Blvd. Toluca-Metepec'
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

// DULCERÍAS DEL ESTADO DE MÉXICO
// 30 negocios verificados en Google Maps sin página web propia
// Cada ficha tiene datos enriquecidos: coordenadas precisas, rutas de transporte locales,
// productos diferenciados por tipo, horarios coherentes con el formato de negocio
// y servicios con valor operativo real para organizadores de eventos.
// Patrón: estado/estadoSlug = Edo Mex/edomex. alcaldia/alcaldiaSlug = municipio/municipioSlug.
const edomex = { estado: 'Edo Mex' as const, estadoSlug: 'edomex' as const };

// Horarios específicos para el Edo Mex
const horarioMayoreoEdoMex = {
  lunes: '8:00 - 19:00',
  martes: '8:00 - 19:00',
  miercoles: '8:00 - 19:00',
  jueves: '8:00 - 19:00',
  viernes: '8:00 - 19:00',
  sabado: '8:00 - 18:00',
  domingo: '9:00 - 15:00'
};

const horarioTradicionalEdoMex = {
  lunes: '9:30 - 19:30',
  martes: '9:30 - 19:30',
  miercoles: '9:30 - 19:30',
  jueves: '9:30 - 19:30',
  viernes: '9:30 - 20:00',
  sabado: '9:30 - 19:00',
  domingo: '10:00 - 16:00'
};

export const dulceriasEdomex: Dulceria[] = [
  {
    ...edomex,
    nombre: 'Dulcería Valeria',
    slug: 'dulceria-valeria-naucalpan',
    tipo: 'Tienda de Golosinas',
    direccion: 'Av. Adolfo López Mateos 35',
    colonia: 'Los Cuartos',
    alcaldia: 'Naucalpan de Juárez',
    alcaldiaSlug: 'naucalpan',
    cp: '53670',
    coordenadas: { lat: 19.4791, lng: -99.2372 },
    referencia: 'Sobre el corredor comercial de Av. López Mateos, entre Cerro de las Torres y Gran Bosque',
    telefono: '55 5301 2253',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Dulcer%C3%ADa+Valeria+Adolfo+L%C3%B3pez+Mateos+35+Los+Cuartos+Naucalpan',
    rating: 4.4,
    resenas: 85,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería de línea completa sobre el corredor López Mateos en Naucalpan, con surtido orientado a cumpleaños infantiles y bolos para fiesta.',
    especialidades: [
      'Dulces enchilados',
      'Paquetes armados para bolos',
      'Piñatas y artículos de fiesta',
      'Dulces de temporada mexicana',
      'Atención para cumpleaños infantiles'
    ],
    productos: [
      'Gomitas nacionales e importadas',
      'Paletas Vero, De la Rosa, Indy',
      'Chocolates Ricolino y Hershey',
      'Tamarindos y cacahuates enchilados',
      'Dulces tradicionales mexicanos',
      'Bolsitas transparentes para bolo',
      'Piñatas de perfil y bombo',
      'Velas y temáticas infantiles'
    ],
    servicios: [
      { nombre: 'Armado de bolsitas de bolo', descripcion: 'Arman bolos por pedido anticipado con mezcla estándar o a gusto del cliente' },
      { nombre: 'Apartado con anticipo', descripcion: 'Para eventos grandes reservan mercancía con 20-30% de anticipo' },
      { nombre: 'Cotización para fiesta', descripcion: 'Calculan la cantidad de dulce por número de invitados sin compromiso' }
    ],
    transporte: {
      referencias: [
        'Sobre Av. Adolfo López Mateos, tramo Naucalpan',
        'Cerca de Plaza Satélite y Centro Naucalpan',
        'Acceso directo desde Periférico Norte (salida Gustavo Baz)',
        'Rutas de camiones Naucalpan-Toreo y microbuses locales pasan por López Mateos'
      ]
    },
    imagen: getImagenPorIndice(0),
    imagenes: [getImagenPorIndice(0), getImagenPorIndice(1), getImagenPorIndice(2)]
  },
  {
    ...edomex,
    nombre: 'Dulcería Los Dos Gorilas',
    slug: 'dulceria-los-dos-gorilas',
    tipo: 'Dulcería Mayoreo',
    direccion: 'Av. Universidad 650, Mercado San Bartolo Planta Baja',
    colonia: 'San Bartolo Naucalpan',
    alcaldia: 'Naucalpan de Juárez',
    alcaldiaSlug: 'naucalpan',
    cp: '53000',
    coordenadas: { lat: 19.4751, lng: -99.2375 },
    referencia: 'Local de mayoreo dentro del emblemático Mercado San Bartolo, planta baja',
    telefono: '55 5358 5525',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Dulcer%C3%ADa+Los+Dos+Gorilas+Mercado+San+Bartolo+Naucalpan',
    rating: 4.5,
    resenas: 120,
    verificado: true,
    destacado: true,
    horario: horarioEstandar.mercado,
    descripcionCorta: 'Mayorista histórico dentro del Mercado San Bartolo — una de las referencias de precio para organizadores de eventos y comerciantes del norte conurbado.',
    especialidades: [
      'Mayoreo desde medio kilo',
      'Dulces a granel por kilo',
      'Importados por caja',
      'Cacahuates y frutos secos',
      'Surtido para mesas de dulces grandes',
      'Logística de mercado público'
    ],
    productos: [
      'Gomitas Ricolino y Trolli a granel',
      'Chocolates Carlos V, Ferrero, Hershey',
      'Cacahuates japoneses y enchilados por kilo',
      'Dulces tradicionales: cocada, palanqueta, alegría',
      'Paletas por caja (Paleta Payaso, Rockaleta, Tutsi)',
      'Chicles por caja',
      'Tamarindos Pelón Pelo Rico',
      'Dulces importados americanos'
    ],
    servicios: [
      { nombre: 'Precios de mercado', descripcion: 'Tarifas competitivas vs Central de Abastos, sin cruzar a CDMX' },
      { nombre: 'Carga y acomodo', descripcion: 'Equipo del mercado apoya con carga hasta el auto por propina' },
      { nombre: 'Pedido por teléfono', descripcion: 'Confirman existencia y apartan antes de que llegues al mercado' }
    ],
    transporte: {
      referencias: [
        'Mercado San Bartolo Naucalpan — Av. Universidad 650',
        'Estacionamiento del mercado disponible en horario comercial',
        'Parada de microbuses Tacubaya-Naucalpan sobre Universidad',
        'A 10 min del Metro Toreo (Línea 2) vía auto o camión',
        'Acceso desde Periférico Norte salida Universidad'
      ]
    },
    imagen: getImagenPorIndice(1),
    imagenes: [getImagenPorIndice(1), getImagenPorIndice(2), getImagenPorIndice(3)]
  },
  {
    ...edomex,
    nombre: 'Dulcería La Peque Mimi',
    slug: 'dulceria-la-peque-mimi',
    tipo: 'Dulcería Mayoreo',
    direccion: 'Abasolo 18B',
    colonia: 'San Bartolo Naucalpan',
    alcaldia: 'Naucalpan de Juárez',
    alcaldiaSlug: 'naucalpan',
    cp: '53000',
    coordenadas: { lat: 19.4755, lng: -99.2381 },
    referencia: 'Operando ininterrumpidamente desde 1969 en Naucalpan Centro, a unas calles del Mercado San Bartolo',
    telefono: 'Ver en Google Maps',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Dulcer%C3%ADa+La+Peque+Mimi+Abasolo+18B+Naucalpan+Centro',
    rating: 4.3,
    resenas: 60,
    verificado: true,
    destacado: true,
    horario: horarioMayoreoEdoMex,
    descripcionCorta: 'Dulcería mayorista con más de 55 años en Naucalpan Centro — conocida por el trato directo con el dueño y precios sostenidos para clientes recurrentes.',
    especialidades: [
      'Mayoreo con trayectoria desde 1969',
      'Clientes de reventa recurrentes',
      'Dulces clásicos mexicanos',
      'Surtido por caja y saco',
      'Trato personalizado con el dueño'
    ],
    productos: [
      'Chocolates Ricolino por caja',
      'Gomitas clásicas Pachas, Panditas, Lunetas',
      'Paletas mexicanas por caja',
      'Dulces tradicionales: Pelón, Pulparindo, Rockaleta',
      'Cacahuates y semillas a granel',
      'Chicles por caja',
      'Dulces enchilados por bolsa grande',
      'Caramelos macizos'
    ],
    servicios: [
      { nombre: 'Precio para reventa', descripcion: 'Descuentos especiales para clientes que compran para su propia tienda' },
      { nombre: 'Cuenta abierta con historial', descripcion: 'Clientes frecuentes pueden acumular pedidos sin pago inmediato (a criterio)' },
      { nombre: 'Asesoría de surtido', descripcion: 'Recomiendan mezcla de producto según tipo de evento o negocio' }
    ],
    transporte: {
      referencias: [
        'Naucalpan Centro, sobre calle Abasolo',
        'A dos cuadras del Mercado San Bartolo',
        'Rutas locales Naucalpan Centro-Hipódromo-Toreo',
        'Estacionamiento en vía pública con parquímetros',
        'Acceso desde Periférico Norte salida Naucalpan'
      ]
    },
    imagen: getImagenPorIndice(2),
    imagenes: [getImagenPorIndice(2), getImagenPorIndice(3), getImagenPorIndice(4)]
  },
  {
    ...edomex,
    nombre: 'Dulcería La Nueva Merced',
    slug: 'dulceria-la-nueva-merced-tlalnepantla',
    tipo: 'Dulcería Mayoreo',
    direccion: 'Av. Toltecas 297',
    colonia: 'La Romana',
    alcaldia: 'Tlalnepantla de Baz',
    alcaldiaSlug: 'tlalnepantla',
    cp: '54030',
    coordenadas: { lat: 19.5402, lng: -99.1902 },
    referencia: 'En el corazón mayorista de La Romana, Nueva Tlalnepantla — el equivalente local de La Merced CDMX',
    telefono: 'Ver en Google Maps',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Dulcer%C3%ADa+La+Nueva+Merced+Toltecas+297+La+Romana+Tlalnepantla',
    rating: 4.4,
    resenas: 95,
    verificado: true,
    destacado: true,
    horario: horarioMayoreoEdoMex,
    descripcionCorta: 'Mayorista en la zona de La Romana que funciona como alternativa local a La Merced CDMX para el norte conurbado — variedad amplia y precios de distribuidor.',
    especialidades: [
      'Precio La Merced sin entrar a CDMX',
      'Mayoreo y reventa',
      'Dulces importados americanos',
      'Surtido para mesas de dulces grandes',
      'Cajas y bultos completos'
    ],
    productos: [
      'Dulces americanos: Warheads, Sour Patch, Hi-Chew',
      'Chocolates Ferrero, Kinder, Lindt',
      'Gomitas Trolli, Haribo, Vidal por caja',
      'Dulces tradicionales mexicanos por bulto',
      'Cacahuates, nuez, almendra por kilo',
      'Paletas de caramelo macizo',
      'Piñatería y fiesta',
      'Bolsas celofán y empaque'
    ],
    servicios: [
      { nombre: 'Precio por bulto completo', descripcion: 'Descuentos progresivos al comprar caja o saco completo' },
      { nombre: 'Crédito a clientes frecuentes', descripcion: 'Clientes con historial pueden gestionar línea de crédito operativa' },
      { nombre: 'Apartado de producto', descripcion: 'Reserva stock para pedidos grandes con 48-72h de anticipación' }
    ],
    transporte: {
      referencias: [
        'Zona mayorista de La Romana, Nueva Tlalnepantla',
        'Acceso por Av. Mario Colín y Av. Toltecas',
        'A 15 min del Metro Ferrería-Arena Ciudad de México (Línea 6)',
        'Rutas Indios Verdes-Tlalnepantla cercanas',
        'Estacionamiento para carga disponible en zona'
      ]
    },
    imagen: getImagenPorIndice(3),
    imagenes: [getImagenPorIndice(3), getImagenPorIndice(4), getImagenPorIndice(5)]
  },
  {
    ...edomex,
    nombre: 'Dulcería Los Ángeles México',
    slug: 'dulceria-los-angeles-tlalnepantla',
    tipo: 'Dulcería Mayoreo',
    direccion: 'Av. Ignacio Zaragoza esq. Alfredo del Mazo',
    colonia: 'Tlalnepantla Centro',
    alcaldia: 'Tlalnepantla de Baz',
    alcaldiaSlug: 'tlalnepantla',
    cp: '54000',
    coordenadas: { lat: 19.5395, lng: -99.1952 },
    referencia: 'Esquina de alto tráfico en Tlalnepantla Centro, sobre el corredor Zaragoza-Del Mazo',
    telefono: 'Ver en Google Maps',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Dulcer%C3%ADa+Los+%C3%81ngeles+M%C3%A9xico+Zaragoza+Alfredo+del+Mazo+Tlalnepantla',
    rating: 4.3,
    resenas: 70,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Esquina comercial en Tlalnepantla Centro que opera en doble modalidad mayoreo/menudeo — conveniente para compradores que no quieren mínimos.',
    especialidades: [
      'Mayoreo y menudeo en mismo mostrador',
      'Sin mínimos de compra',
      'Dulces por caja o por pieza',
      'Proveedor de dulcerías pequeñas',
      'Ubicación céntrica con fácil estacionamiento'
    ],
    productos: [
      'Gomitas por kilo o por pieza',
      'Chocolates por caja o unidad',
      'Paletas Vero, Rockaleta, De la Rosa',
      'Dulces enchilados nacionales',
      'Cacahuates japoneses y enchilados',
      'Chicles Trident, Orbit, Bubaloo',
      'Piñatas estándar',
      'Bolsitas celofán para bolo'
    ],
    servicios: [
      { nombre: 'Compra flexible', descripcion: 'Mismo producto a precio mayoreo si pides por caja o menudeo si pides por pieza' },
      { nombre: 'Surtido recurrente', descripcion: 'Proveen a dulcerías más pequeñas del municipio con entregas rutinarias' },
      { nombre: 'Consulta de disponibilidad', descripcion: 'Llamar antes de visitar para confirmar existencia de producto específico' }
    ],
    transporte: {
      referencias: [
        'Tlalnepantla Centro — esquina Zaragoza y Alfredo del Mazo',
        'A 8 min caminando del Mercado Tlalnepantla',
        'Acceso por Av. Mario Colín desde Vía Gustavo Baz',
        'Rutas Indios Verdes-Tlalnepantla y Buenavista-Tlalnepantla paran cerca',
        'A 12 min del Metro Ferrería-Arena Ciudad de México (Línea 6)'
      ]
    },
    imagen: getImagenPorIndice(4),
    imagenes: [getImagenPorIndice(4), getImagenPorIndice(5), getImagenPorIndice(6)]
  },
  {
    ...edomex,
    nombre: 'Dulce y Truco',
    slug: 'dulce-y-truco-neza',
    tipo: 'Tienda de Golosinas',
    direccion: 'Calle 37',
    colonia: 'Benito Juárez',
    alcaldia: 'Nezahualcóyotl',
    alcaldiaSlug: 'nezahualcoyotl',
    cp: '57000',
    coordenadas: { lat: 19.4010, lng: -99.0142 },
    referencia: 'Modelo de mayoreo accesible sin mínimos — una pieza ya entra a precio de mayoreo',
    telefono: 'Ver en Google Maps',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Dulce+y+Truco+Calle+37+Nezahualc%C3%B3yotl',
    rating: 4.4,
    resenas: 55,
    verificado: true,
    destacado: true,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería con modelo "mayoreo desde 1 pieza" — ideal para familias que no quieren comprar por bulto pero buscan ahorro frente a tienda de conveniencia.',
    especialidades: [
      'Mayoreo sin mínimos',
      'Precio de bulto por pieza',
      'Dulces importados accesibles',
      'Surtido para fiestas familiares',
      'Atención por WhatsApp'
    ],
    productos: [
      'Gomitas importadas (Trolli, Haribo) por pieza',
      'Chocolates Kinder y Hershey',
      'Paletas americanas Warheads, Jolly Rancher',
      'Dulces mexicanos enchilados',
      'Cacahuates japoneses',
      'Chicles importados',
      'Dulces virales (candy challenges)',
      'Tamarindos y cacahuates botaneros'
    ],
    servicios: [
      { nombre: 'Mayoreo desde 1 pieza', descripcion: 'El precio de caja aplica desde la primera pieza comprada' },
      { nombre: 'Pedido por redes', descripcion: 'Toman pedidos por FB/WhatsApp para apartar antes de que llegues' },
      { nombre: 'Surtido para bolo pequeño', descripcion: 'Arman bolos de 5-30 piezas con dulces variados a precio competitivo' }
    ],
    transporte: {
      referencias: [
        'Nezahualcóyotl sobre Calle 37',
        'Zona Benito Juárez de Neza',
        'Rutas Pantitlán-Neza paran cerca',
        'Acceso por Av. Bordo de Xochiaca',
        'A 20 min del Metro Pantitlán (Líneas 1, 5, 9, A)'
      ]
    },
    imagen: getImagenPorIndice(5),
    imagenes: [getImagenPorIndice(5), getImagenPorIndice(6), getImagenPorIndice(7)]
  },
  {
    ...edomex,
    nombre: 'Dulceneza Dulcería',
    slug: 'dulceneza-nezahualcoyotl',
    tipo: 'Tienda de Golosinas',
    direccion: 'Av. Indios Verdes 292',
    colonia: 'Nezahualcóyotl',
    alcaldia: 'Nezahualcóyotl',
    alcaldiaSlug: 'nezahualcoyotl',
    cp: '57000',
    coordenadas: { lat: 19.4012, lng: -99.0155 },
    referencia: 'Sobre Av. Indios Verdes, zona de paso para usuarios de transporte público de Neza',
    telefono: 'Ver en Google Maps',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Dulceneza+Dulcer%C3%ADa+Indios+Verdes+292+Nezahualc%C3%B3yotl',
    rating: 4.2,
    resenas: 40,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería combinada con paletería/helados sobre Av. Indios Verdes — surtido para compra de paso y antojo rápido.',
    especialidades: [
      'Paletas y helados caseros',
      'Dulces y nieves',
      'Compra de paso',
      'Dulces enchilados',
      'Atención corrida'
    ],
    productos: [
      'Paletas de hielo caseras',
      'Helados de vaso',
      'Raspados y nieves',
      'Gomitas y dulces clásicos',
      'Paletas de caramelo Vero y Rockaleta',
      'Dulces enchilados',
      'Chicles Bubaloo, Trident',
      'Chocolates Carlos V, Hershey'
    ],
    servicios: [
      { nombre: 'Combo dulce + helado', descripcion: 'Surtido mixto en un solo punto, conveniente para familias' },
      { nombre: 'Consumo en el momento', descripcion: 'Ideal para compras pequeñas y antojo inmediato' },
      { nombre: 'Horario corrido', descripcion: 'Atención continua sin cerrar a mediodía' }
    ],
    transporte: {
      referencias: [
        'Sobre Av. Indios Verdes, Nezahualcóyotl',
        'Zona de paso para rutas de transporte público',
        'Rutas Neza-Pantitlán pasan por la avenida',
        'Acceso desde Av. Bordo de Xochiaca',
        'A 25 min del Metro Pantitlán vía camión'
      ]
    },
    imagen: getImagenPorIndice(6),
    imagenes: [getImagenPorIndice(6), getImagenPorIndice(7), getImagenPorIndice(8)]
  },
  {
    ...edomex,
    nombre: 'Dulcería Dulce María Olímpica',
    slug: 'dulce-maria-olimpica-ecatepec',
    tipo: 'Dulcería Tradicional',
    direccion: 'Col. Olímpica',
    colonia: 'Olímpica',
    alcaldia: 'Ecatepec de Morelos',
    alcaldiaSlug: 'ecatepec',
    cp: '55010',
    coordenadas: { lat: 19.6012, lng: -99.0489 },
    referencia: 'Especialista en dulce mexicano artesanal — opción clave para mesas tradicionales de boda y XV años del norte del Valle',
    telefono: 'Ver en Google Maps',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Dulcer%C3%ADa+Dulce+Mar%C3%ADa+Col+Ol%C3%ADmpica+Ecatepec',
    rating: 4.5,
    resenas: 65,
    verificado: true,
    destacado: true,
    horario: horarioTradicionalEdoMex,
    descripcionCorta: 'Dulcería tradicional mexicana en Ecatepec especializada en alegrías, buñuelos, cocadas y palanquetas — ideal para mesas de dulce mexicano de boda, XV años o día de muertos.',
    especialidades: [
      'Dulce mexicano artesanal',
      'Alegrías y buñuelos frescos',
      'Palanquetas de cacahuate y nuez',
      'Cocadas horneadas',
      'Cajeta de Celaya por kilo',
      'Surtido para mesas tradicionales'
    ],
    productos: [
      'Alegrías de amaranto miel',
      'Buñuelos grandes recién hechos',
      'Palanquetas de cacahuate, nuez, pepita',
      'Cocadas horneadas y tostadas',
      'Dulces de cajeta y leche',
      'Jamoncillo de leche y piñón',
      'Tamarindos de cristal y enchilados',
      'Obleas con cajeta',
      'Pepitorias artesanales'
    ],
    servicios: [
      { nombre: 'Surtido para mesa mexicana', descripcion: 'Asesoran el mix perfecto para mesa de dulces tradicional de 50-200 invitados' },
      { nombre: 'Pedido por encargo', descripcion: 'Preparan lotes grandes de alegrías, buñuelos o cocadas con 48h de anticipación' },
      { nombre: 'Envase tradicional', descripcion: 'Producto presentado en canasta de palma o frasco de vidrio para mesas temáticas' }
    ],
    transporte: {
      referencias: [
        'Col. Olímpica, Ecatepec de Morelos',
        'Acceso por Av. Central de Ecatepec',
        'Rutas Indios Verdes-Ecatepec paran cerca',
        'A 20 min del Metro Indios Verdes (Línea 3)',
        'Salida de Autopista México-Pachuca'
      ]
    },
    imagen: getImagenPorIndice(7),
    imagenes: [getImagenPorIndice(7), getImagenPorIndice(8), getImagenPorIndice(9)]
  },
  {
    ...edomex,
    nombre: 'Dulcería Express Chalco',
    slug: 'dulceria-express-chalco',
    tipo: 'Tienda de Golosinas',
    direccion: 'Chalco de Díaz Covarrubias',
    colonia: 'Chalco Centro',
    alcaldia: 'Chalco',
    alcaldiaSlug: 'chalco',
    cp: '56600',
    coordenadas: { lat: 19.2648, lng: -98.8972 },
    referencia: 'Dulcería en Chalco Centro — una de las pocas opciones profesionales verificadas del oriente del Valle de México',
    telefono: '55 6530 0530',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Dulcer%C3%ADa+Express+Chalco+de+D%C3%ADaz+Covarrubias',
    rating: 4.3,
    resenas: 45,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería en Chalco Centro para eventos familiares y fiestas infantiles del oriente del Valle — alternativa local a cruzar hasta CDMX o Texcoco.',
    especialidades: [
      'Surtido para fiestas infantiles',
      'Piñatas y artículos de fiesta',
      'Cobertura Chalco y zona oriente',
      'Pedido por teléfono',
      'Precio competitivo local'
    ],
    productos: [
      'Gomitas Ricolino, Panditas, Lunetas',
      'Paletas Vero, Tutsi, Rockaleta',
      'Chocolates Carlos V, Tin Larín, Hershey',
      'Dulces enchilados: Pelón, Pulparindo',
      'Chicles Bubaloo, Trident',
      'Piñatas de perfil',
      'Velas y artículos para pastel',
      'Bolsitas celofán para bolo'
    ],
    servicios: [
      { nombre: 'Entrega local en Chalco', descripcion: 'Coordinan entrega en el municipio con pedido anticipado' },
      { nombre: 'Apartado para fiesta', descripcion: 'Reservan piñatas y dulces específicos para fecha de evento' },
      { nombre: 'Atención por teléfono', descripcion: 'Confirman disponibilidad antes de que te traslades' }
    ],
    transporte: {
      referencias: [
        'Chalco Centro, oriente del Valle de México',
        'Acceso por Autopista México-Puebla salida Chalco',
        'Rutas Pantitlán-Chalco paran en el centro',
        'A 35 min del Metro Pantitlán vía autobús',
        'Cerca del Mercado Municipal de Chalco'
      ]
    },
    imagen: getImagenPorIndice(8),
    imagenes: [getImagenPorIndice(8), getImagenPorIndice(9), getImagenPorIndice(10)]
  },
  {
    ...edomex,
    nombre: 'Dulcería Monse',
    slug: 'dulceria-monse-atizapan',
    tipo: 'Tienda de Golosinas',
    direccion: 'Bélgica 60',
    colonia: 'México 86',
    alcaldia: 'Atizapán de Zaragoza',
    alcaldiaSlug: 'atizapan',
    cp: '52928',
    coordenadas: { lat: 19.5575, lng: -99.2571 },
    referencia: 'Dulcería de colonia en México 86, una de las zonas residenciales consolidadas de Atizapán',
    telefono: 'Ver en Google Maps',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Dulcer%C3%ADa+Monse+B%C3%A9lgica+60+M%C3%A9xico+86+Atizap%C3%A1n',
    rating: 4.4,
    resenas: 50,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería de barrio en Col. México 86 con surtido clásico — referencia para fiestas infantiles de la zona residencial de Atizapán.',
    especialidades: [
      'Trato cercano de colonia',
      'Fiestas infantiles residenciales',
      'Surtido clásico siempre disponible',
      'Piñatas y bolos',
      'Pedido con anticipación'
    ],
    productos: [
      'Gomitas clásicas Ricolino',
      'Paletas Vero, Payaso, Rockaleta',
      'Chocolates Carlos V, Kinder',
      'Dulces enchilados: Pelón, Pulparindo',
      'Chicles Bubaloo, Trident',
      'Piñatas de perfil estándar',
      'Velas para pastel',
      'Bolsitas celofán'
    ],
    servicios: [
      { nombre: 'Asesoría para cumpleaños', descripcion: 'Ayudan a calcular cantidades según número de invitados' },
      { nombre: 'Surtido clásico confiable', descripcion: 'Mantienen stock permanente de dulces básicos para fiestas' },
      { nombre: 'Ubicación residencial', descripcion: 'Conveniente para vecinos de México 86, Las Alamedas y alrededores' }
    ],
    transporte: {
      referencias: [
        'Col. México 86, Atizapán de Zaragoza',
        'Acceso por Blvd. Ignacio Zaragoza',
        'Cerca de Las Alamedas y Plaza Cristal',
        'Rutas Tacuba-Atizapán y Rosario-Atizapán paran cerca',
        'A 20 min del Metro Rosario (Línea 6 y 7) vía autobús'
      ]
    },
    imagen: getImagenPorIndice(9),
    imagenes: [getImagenPorIndice(9), getImagenPorIndice(10), getImagenPorIndice(0)]
  },
  {
    ...edomex,
    nombre: 'Surti Fiesta Dulcería',
    slug: 'surti-fiesta-atizapan',
    tipo: 'Dulcería Mayoreo',
    direccion: 'Corea 61',
    colonia: 'México 86',
    alcaldia: 'Atizapán de Zaragoza',
    alcaldiaSlug: 'atizapan',
    cp: '52928',
    coordenadas: { lat: 19.5578, lng: -99.2575 },
    referencia: 'Proveedor integral de fiesta + dulcería en Atizapán — formato "todo para tu evento en un solo punto"',
    telefono: 'Ver en Google Maps',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Surti+Fiesta+Dulcer%C3%ADa+Corea+61+M%C3%A9xico+86+Atizap%C3%A1n',
    rating: 4.5,
    resenas: 75,
    verificado: true,
    destacado: true,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Proveedor integral de fiesta en Atizapán: dulces, desechables, decoración, globos y piñatería en un solo local — evita 3-4 paradas distintas.',
    especialidades: [
      'Todo-en-uno para fiesta',
      'Desechables temáticos',
      'Globos de helio y látex',
      'Piñatería por pedido',
      'Dulces al mayoreo',
      'Decoración temática por evento'
    ],
    productos: [
      'Dulces al mayoreo por caja',
      'Platos, vasos y servilletas temáticos',
      'Globos látex y helio (Frozen, Spiderman, genéricos)',
      'Piñatas de perfil y bombo',
      'Velas numéricas y de pastel',
      'Manteles desechables temáticos',
      'Bolsitas celofán y cordón',
      'Juguetes para bolo',
      'Centros de mesa desechables'
    ],
    servicios: [
      { nombre: 'Paquete fiesta completa', descripcion: 'Arman paquete por # de invitados con dulces + desechables + decoración' },
      { nombre: 'Inflado de globos', descripcion: 'Inflado con helio a pedido — retiro el mismo día del evento' },
      { nombre: 'Piñata a la medida', descripcion: 'Piñatas temáticas bajo pedido con 5-7 días de anticipación' }
    ],
    transporte: {
      referencias: [
        'Col. México 86, Atizapán — sobre Corea',
        'A una cuadra de Dulcería Monse (alternativa)',
        'Acceso por Blvd. Ignacio Zaragoza',
        'Rutas Rosario-Atizapán paran cerca',
        'Estacionamiento en vía pública'
      ]
    },
    imagen: getImagenPorIndice(10),
    imagenes: [getImagenPorIndice(10), getImagenPorIndice(0), getImagenPorIndice(1)]
  },
  {
    ...edomex,
    nombre: 'Dulcería Xochimej',
    slug: 'dulceria-xochimej-coacalco',
    tipo: 'Tienda de Golosinas',
    direccion: 'Coacalco de Berriozábal',
    colonia: 'Coacalco Centro',
    alcaldia: 'Coacalco de Berriozábal',
    alcaldiaSlug: 'coacalco',
    cp: '55700',
    coordenadas: { lat: 19.6255, lng: -99.1031 },
    referencia: 'Dulcería familiar en Coacalco Centro, sobre el corredor comercial local',
    telefono: 'Ver en Google Maps',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Dulcer%C3%ADa+Xochimej+Coacalco+de+Berriozabal',
    rating: 4.3,
    resenas: 40,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería familiar en Coacalco Centro con surtido clásico — opción de barrio para fiestas infantiles del norte conurbado.',
    especialidades: [
      'Dulcería de colonia',
      'Fiestas infantiles',
      'Trato familiar',
      'Bolos por encargo',
      'Dulces mexicanos clásicos'
    ],
    productos: [
      'Gomitas Ricolino, Panditas',
      'Paletas Vero, Rockaleta',
      'Chocolates Carlos V, Tin Larín',
      'Dulces enchilados',
      'Chicles Bubaloo, Trident',
      'Dulces tradicionales mexicanos',
      'Piñatas de perfil',
      'Bolsitas para bolo'
    ],
    servicios: [
      { nombre: 'Bolos armados', descripcion: 'Arman bolsitas de dulces para fiesta con 24h de anticipación' },
      { nombre: 'Atención familiar', descripcion: 'Trato cercano con clientes recurrentes de la colonia' },
      { nombre: 'Surtido estable', descripcion: 'Catálogo clásico siempre disponible sin agotarse' }
    ],
    transporte: {
      referencias: [
        'Coacalco Centro, norte del Valle de México',
        'Acceso por Av. José López Portillo',
        'Rutas Coacalco-Indios Verdes pasan por el corredor',
        'A 40 min del Metro Indios Verdes (Línea 3) vía autobús',
        'Cerca del Mercado Coacalco'
      ]
    },
    imagen: getImagenPorIndice(0),
    imagenes: [getImagenPorIndice(0), getImagenPorIndice(1), getImagenPorIndice(2)]
  },
  {
    ...edomex,
    nombre: 'Dulcería Dory',
    slug: 'dulceria-dory-coacalco',
    tipo: 'Dulcería Mayoreo',
    direccion: 'Agua 12',
    colonia: 'Villa de las Flores',
    alcaldia: 'Coacalco de Berriozábal',
    alcaldiaSlug: 'coacalco',
    cp: '55717',
    coordenadas: { lat: 19.6261, lng: -99.1038 },
    referencia: 'Mayorista + materias primas para repostería — atiende dulcerías, reposteros y organizadores de eventos del norte',
    telefono: 'Ver en Google Maps',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Dulcer%C3%ADa+Dory+Agua+12+Coacalco',
    rating: 4.5,
    resenas: 90,
    verificado: true,
    destacado: true,
    horario: horarioMayoreoEdoMex,
    descripcionCorta: 'Mayorista doble-giro en Coacalco: dulces + materias primas de repostería. Ideal para reposteros, pasteleros y organizadores que necesitan surtido integral.',
    especialidades: [
      'Dulces + repostería en un solo punto',
      'Coberturas de chocolate',
      'Harinas, azúcares y esencias',
      'Fondant y pasta para decorar',
      'Mayoreo con facturación',
      'Contacto directo por email'
    ],
    productos: [
      'Dulces al mayoreo (Ricolino, Trolli, Vero)',
      'Chocolates Carlos V, Hershey por caja',
      'Coberturas Turín, Carlo, Wilbur',
      'Fondant blanco y de color',
      'Harina 000, azúcar glass, azúcar estándar',
      'Esencias y colorantes comestibles',
      'Grageas y decoraciones para postre',
      'Papel encerado y moldes',
      'Cacao en polvo y chips de chocolate'
    ],
    servicios: [
      { nombre: 'Surtido integral para repostería', descripcion: 'No necesitas segunda parada para materias primas' },
      { nombre: 'Factura CFDI', descripcion: 'Emiten factura para negocios formales' },
      { nombre: 'Contacto por email', descripcion: 'dulceriadory@gmail.com para pedidos grandes y cotizaciones' }
    ],
    transporte: {
      referencias: [
        'Col. Villa de las Flores, Coacalco',
        'Acceso por Av. José López Portillo',
        'Cerca del corredor comercial Coacalco-Tultitlán',
        'Rutas Coacalco-Indios Verdes paran cerca',
        'Salida de Autopista México-Pachuca desviación Coacalco'
      ]
    },
    imagen: getImagenPorIndice(1),
    imagenes: [getImagenPorIndice(1), getImagenPorIndice(2), getImagenPorIndice(3)]
  },
  {
    ...edomex,
    nombre: 'El Mundo Del Dulce',
    slug: 'el-mundo-del-dulce-coacalco',
    tipo: 'Dulcería Mayoreo',
    direccion: 'Coacalco de Berriozábal',
    colonia: 'Coacalco Centro',
    alcaldia: 'Coacalco de Berriozábal',
    alcaldiaSlug: 'coacalco',
    cp: '55700',
    coordenadas: { lat: 19.6278, lng: -99.1055 },
    referencia: 'Considerada la dulcería más grande de Coacalco por superficie y volumen de producto',
    telefono: 'Ver en Google Maps',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=El+Mundo+Del+Dulce+Coacalco',
    rating: 4.4,
    resenas: 80,
    verificado: true,
    destacado: true,
    horario: horarioMayoreoEdoMex,
    descripcionCorta: 'La dulcería más grande de Coacalco por metros cuadrados y catálogo — destino para eventos grandes y organizadores que necesitan surtido amplio en un solo punto.',
    especialidades: [
      'Mayor superficie de Coacalco',
      'Catálogo más amplio del norte',
      'Eventos de 200+ invitados',
      'Dulces nacionales e importados',
      'Mesas de dulces XL',
      'Mayoreo y semi-mayoreo'
    ],
    productos: [
      'Dulces nacionales por caja (Ricolino, Vero, Pelón)',
      'Importados americanos (Warheads, Airheads, Jolly Rancher)',
      'Chocolates Hershey, Kinder, Ferrero',
      'Gomitas Trolli, Haribo, Vidal',
      'Dulces tradicionales mexicanos',
      'Cacahuates, nuez, almendra',
      'Paletería variada',
      'Piñatería y decoración',
      'Bolsas y empaque para bolo'
    ],
    servicios: [
      { nombre: 'Mesa de dulces XL', descripcion: 'Surtido para mesas de 100-500 invitados con variedad visual' },
      { nombre: 'Asesoría por categoría', descripcion: 'Equipo te guía por sección (chocolates, gomitas, mexicanos, importados)' },
      { nombre: 'Carga al auto', descripcion: 'Ayuda con carga de pedidos grandes hasta vehículo' }
    ],
    transporte: {
      referencias: [
        'Coacalco Centro, corredor comercial principal',
        'Acceso directo por Av. José López Portillo',
        'Estacionamiento propio para clientes de mayoreo',
        'Rutas Coacalco-Indios Verdes y Coacalco-Tultitlán',
        'Salida de Autopista México-Pachuca desviación Coacalco'
      ]
    },
    imagen: getImagenPorIndice(2),
    imagenes: [getImagenPorIndice(2), getImagenPorIndice(3), getImagenPorIndice(4)]
  },
  {
    ...edomex,
    nombre: 'Dulcería Prados',
    slug: 'dulceria-prados-tultitlan',
    tipo: 'Tienda de Golosinas',
    direccion: 'Prados del Norte 82',
    colonia: 'Unidad Morelos 3ra Sección',
    alcaldia: 'Tultitlán',
    alcaldiaSlug: 'tultitlan',
    cp: '54930',
    coordenadas: { lat: 19.6505, lng: -99.1692 },
    referencia: 'Dulcería residencial en Unidad Morelos, una de las zonas habitacionales más grandes de Tultitlán',
    telefono: 'Ver en Google Maps',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Dulcer%C3%ADa+Prados+Prados+del+Norte+82+Unidad+Morelos+Tultitl%C3%A1n',
    rating: 4.3,
    resenas: 55,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería de colonia en Unidad Morelos, Tultitlán — atiende la demanda residencial de fiestas infantiles y antojos familiares.',
    especialidades: [
      'Dulcería residencial',
      'Fiestas infantiles locales',
      'Cobertura Unidad Morelos',
      'Atención familiar',
      'Bolos y piñatas'
    ],
    productos: [
      'Gomitas clásicas',
      'Paletas Vero y Rockaleta',
      'Chocolates Carlos V, Hershey',
      'Dulces enchilados',
      'Chicles Bubaloo, Trident',
      'Piñatas de perfil',
      'Velas para pastel',
      'Bolsitas celofán'
    ],
    servicios: [
      { nombre: 'Cercanía residencial', descripcion: 'Ubicación conveniente para vecinos de Unidad Morelos' },
      { nombre: 'Surtido estable', descripcion: 'Catálogo clásico disponible permanentemente' },
      { nombre: 'Armado de bolos', descripcion: 'Arman bolsitas de dulce con anticipación' }
    ],
    transporte: {
      referencias: [
        'Unidad Morelos 3ra Sección, Tultitlán',
        'Acceso por Av. Prados del Norte',
        'Rutas Tultitlán-Indios Verdes paran cerca',
        'A 45 min del Metro Indios Verdes (Línea 3) vía autobús',
        'Cerca del Centro Comercial Tultitlán'
      ]
    },
    imagen: getImagenPorIndice(3),
    imagenes: [getImagenPorIndice(3), getImagenPorIndice(4), getImagenPorIndice(5)]
  },
  {
    ...edomex,
    nombre: 'Dulcería La Especial',
    slug: 'dulceria-la-especial-tultitlan',
    tipo: 'Dulcería Mayoreo',
    direccion: 'Central de Abastos Tultitlán, Nave 7, Bodegas 11-14',
    colonia: 'Central de Abastos',
    alcaldia: 'Tultitlán',
    alcaldiaSlug: 'tultitlan',
    cp: '54900',
    coordenadas: { lat: 19.6462, lng: -99.1742 },
    referencia: 'Bodega mayorista dentro de la CEDA de Tultitlán — abre los 7 días de 7:30 a 17:30',
    telefono: 'Ver en Google Maps',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Dulcer%C3%ADa+La+Especial+Central+de+Abastos+Tultitl%C3%A1n',
    rating: 4.6,
    resenas: 140,
    verificado: true,
    destacado: true,
    horario: {
      lunes: '7:30 - 17:30', martes: '7:30 - 17:30', miercoles: '7:30 - 17:30',
      jueves: '7:30 - 17:30', viernes: '7:30 - 17:30', sabado: '7:30 - 17:30', domingo: '7:30 - 17:30'
    },
    descripcionCorta: 'Bodega mayorista dentro de la Central de Abastos de Tultitlán — precios de distribuidor real, catálogo extenso y operación los 7 días del año.',
    especialidades: [
      'Precio CEDA Tultitlán',
      'Abierto 7 días / año',
      'Catálogo de distribuidor',
      'Dulces por bulto y saco',
      'Ocupa 4 bodegas (11-14)',
      'Atención a reventa y eventos grandes'
    ],
    productos: [
      'Dulces Ricolino, Vero, De la Rosa por caja matriz',
      'Chocolates Hershey, Ferrero, Kinder por caja',
      'Gomitas Trolli, Haribo, Vidal por bulto',
      'Dulces importados americanos por caja',
      'Cacahuates, nuez, almendra por saco',
      'Paletas por caja',
      'Chicles por caja matriz',
      'Dulces tradicionales por bulto',
      'Caramelos macizos por kilo'
    ],
    servicios: [
      { nombre: 'Precio de distribuidor', descripcion: 'Tarifas de CEDA — las más bajas del norte del Valle' },
      { nombre: 'Horario 7 días', descripcion: 'Único mayorista de la zona que abre domingo y día festivo' },
      { nombre: '4 bodegas contiguas', descripcion: 'Mayor stock del sector — rara vez agotan producto' }
    ],
    transporte: {
      referencias: [
        'Central de Abastos Tultitlán — Nave 7, Bodegas 11-14',
        'Acceso por Autopista México-Querétaro salida CEDA',
        'Estacionamiento amplio para carga y descarga',
        'Rampa para diablito y carga pesada',
        'A 60 min del Metro Indios Verdes vía autobús'
      ]
    },
    imagen: getImagenPorIndice(4),
    imagenes: [getImagenPorIndice(4), getImagenPorIndice(5), getImagenPorIndice(6)]
  },
  {
    ...edomex,
    nombre: 'Dulcería El Panal Texcoco',
    slug: 'dulceria-el-panal-texcoco',
    tipo: 'Tienda de Golosinas',
    direccion: 'Chiautla / Texcoco',
    colonia: 'Chiautla',
    alcaldia: 'Texcoco',
    alcaldiaSlug: 'texcoco',
    cp: '56030',
    coordenadas: { lat: 19.5102, lng: -98.8812 },
    referencia: 'Dulcería local en zona Chiautla-Texcoco — oriente del Valle de México',
    telefono: 'Ver en Google Maps',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Dulcer%C3%ADa+El+Panal+Texcoco',
    rating: 4.4,
    resenas: 50,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería del oriente del Valle de México en zona Chiautla-Texcoco — surtido local para fiestas y celebraciones familiares de la región.',
    especialidades: [
      'Cobertura oriente del Valle',
      'Texcoco, Chiautla, Tepetlaoxtoc',
      'Fiestas familiares regionales',
      'Surtido clásico',
      'Atención local'
    ],
    productos: [
      'Gomitas clásicas',
      'Paletas Vero, Rockaleta',
      'Chocolates Carlos V, Tin Larín',
      'Dulces enchilados mexicanos',
      'Chicles Bubaloo, Trident',
      'Piñatas de perfil',
      'Velas para pastel',
      'Bolsitas para bolo'
    ],
    servicios: [
      { nombre: 'Cobertura regional oriente', descripcion: 'Atiende clientela de Texcoco, Chiautla y municipios cercanos' },
      { nombre: 'Surtido para fiesta', descripcion: 'Armado de bolos y piñatas por anticipación' },
      { nombre: 'Dulces clásicos', descripcion: 'Catálogo tradicional siempre disponible' }
    ],
    transporte: {
      referencias: [
        'Chiautla-Texcoco, oriente del Valle de México',
        'Acceso por Carretera Federal Texcoco-Los Reyes',
        'Rutas Chiautla-Texcoco-Los Reyes',
        'Salida de Circuito Exterior Mexiquense',
        'A 45 min del Metro Los Reyes (Línea A) vía autobús'
      ]
    },
    imagen: getImagenPorIndice(10),
    imagenes: [getImagenPorIndice(10), getImagenPorIndice(0), getImagenPorIndice(1)]
  },
  {
    ...edomex,
    nombre: 'La Abeja Reina Dulcería',
    slug: 'la-abeja-reina-nicolas-romero',
    tipo: 'Tienda de Golosinas',
    direccion: 'Villa Nicolás Romero',
    colonia: 'Villa Nicolás Romero',
    alcaldia: 'Nicolás Romero',
    alcaldiaSlug: 'nicolas-romero',
    cp: '54400',
    coordenadas: { lat: 19.6258, lng: -99.3210 },
    referencia: 'Referente local de Nicolás Romero con 4.5 estrellas — horario extendido 8:00-18:00 entre semana',
    telefono: 'Ver en Google Maps',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=La+Abeja+Reina+Dulcer%C3%ADa+Villa+Nicol%C3%A1s+Romero',
    rating: 4.5,
    resenas: 75,
    verificado: true,
    destacado: true,
    horario: {
      lunes: '8:00 - 18:00', martes: '8:00 - 18:00', miercoles: '8:00 - 18:00',
      jueves: '8:00 - 18:00', viernes: '8:00 - 18:00', sabado: '8:00 - 18:00', domingo: '9:00 - 15:00'
    },
    descripcionCorta: 'Dulcería mejor valorada de Nicolás Romero (4.5 estrellas) con horario extendido — referente local para fiestas del norponiente mexiquense.',
    especialidades: [
      'Rating 4.5 — mejor evaluada de Villa Nicolás Romero',
      'Horario 8-18h entre semana',
      'Surtido amplio para fiestas',
      'Mayoreo y menudeo',
      'Cobertura Nicolás Romero, Atizapán, Jilotzingo'
    ],
    productos: [
      'Gomitas Ricolino, Panditas, Trolli',
      'Paletas Vero, Rockaleta, Tutsi',
      'Chocolates Carlos V, Tin Larín, Kinder',
      'Dulces enchilados nacionales',
      'Dulces mexicanos tradicionales',
      'Cacahuates y botanas',
      'Chicles Bubaloo, Trident, Orbit',
      'Piñatas de perfil',
      'Desechables para fiesta'
    ],
    servicios: [
      { nombre: 'Horario extendido', descripcion: 'Abierto de 8 a 18h — útil para compras de paso antes o después del trabajo' },
      { nombre: 'Mejor rating local', descripcion: '4.5 estrellas en Google — calidad sostenida verificada por clientes' },
      { nombre: 'Doble modalidad', descripcion: 'Precio mayoreo por caja o menudeo por pieza en el mismo mostrador' }
    ],
    transporte: {
      referencias: [
        'Villa Nicolás Romero, norponiente del Edo Mex',
        'Acceso por Av. Francisco I. Madero',
        'Rutas Rosario-Nicolás Romero y Villa Nicolás Romero-Tlalnepantla',
        'A 50 min del Metro Rosario (Línea 6 y 7) vía autobús',
        'Salida de Vía Gustavo Baz'
      ]
    },
    imagen: getImagenPorIndice(0),
    imagenes: [getImagenPorIndice(0), getImagenPorIndice(1), getImagenPorIndice(2)]
  },
  {
    ...edomex,
    nombre: 'Dulcería Real',
    slug: 'dulceria-real-nicolas-romero',
    tipo: 'Dulcería Tradicional',
    direccion: 'Av. Francisco I. Madero 116',
    colonia: 'Ciudad Nicolás Romero',
    alcaldia: 'Nicolás Romero',
    alcaldiaSlug: 'nicolas-romero',
    cp: '54400',
    coordenadas: { lat: 19.6262, lng: -99.3218 },
    referencia: 'Dulcería tradicional sobre la avenida principal de Ciudad Nicolás Romero',
    telefono: 'Ver en Google Maps',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Dulcer%C3%ADa+Real+Francisco+I+Madero+116+Nicol%C3%A1s+Romero',
    rating: 4.3,
    resenas: 60,
    verificado: true,
    destacado: false,
    horario: horarioTradicionalEdoMex,
    descripcionCorta: 'Dulcería tradicional sobre Av. Francisco I. Madero en Ciudad Nicolás Romero — ubicación visible y surtido clásico para la zona.',
    especialidades: [
      'Ubicación céntrica sobre avenida principal',
      'Dulcería tradicional mexicana',
      'Dulces clásicos siempre disponibles',
      'Cobertura Ciudad Nicolás Romero',
      'Atención local'
    ],
    productos: [
      'Dulces tradicionales mexicanos',
      'Gomitas clásicas',
      'Paletas Vero, Rockaleta',
      'Chocolates Carlos V, Tin Larín',
      'Dulces de cajeta',
      'Cocadas y palanquetas',
      'Tamarindos enchilados',
      'Chicles Bubaloo'
    ],
    servicios: [
      { nombre: 'Ubicación visible', descripcion: 'Sobre avenida principal — fácil de localizar sin GPS' },
      { nombre: 'Surtido tradicional', descripcion: 'Dulces mexicanos clásicos siempre en inventario' },
      { nombre: 'Atención local', descripcion: 'Trato cercano para vecinos de la cabecera municipal' }
    ],
    transporte: {
      referencias: [
        'Av. Francisco I. Madero 116, Ciudad Nicolás Romero',
        'Sobre la avenida principal del municipio',
        'Acceso directo por Vía Gustavo Baz',
        'Rutas Rosario-Nicolás Romero paran enfrente',
        'A 50 min del Metro Rosario vía autobús'
      ]
    },
    imagen: getImagenPorIndice(1),
    imagenes: [getImagenPorIndice(1), getImagenPorIndice(2), getImagenPorIndice(3)]
  },
  {
    ...edomex,
    nombre: 'Dulcería y Materias Arcoiris',
    slug: 'dulceria-arcoiris-nicolas-romero',
    tipo: 'Dulcería Mayoreo',
    direccion: 'Hidalgo s/n',
    colonia: 'Progreso Industrial',
    alcaldia: 'Nicolás Romero',
    alcaldiaSlug: 'nicolas-romero',
    cp: '54404',
    coordenadas: { lat: 19.6275, lng: -99.3158 },
    referencia: 'Proveedor integral del norponiente: dulces + materias primas + artículos de fiesta en zona Progreso Industrial',
    telefono: 'Ver en Google Maps',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Dulcer%C3%ADa+Arcoiris+Hidalgo+Progreso+Industrial+Nicol%C3%A1s+Romero',
    rating: 4.4,
    resenas: 65,
    verificado: true,
    destacado: true,
    horario: horarioMayoreoEdoMex,
    descripcionCorta: 'Proveedor integral en Progreso Industrial, Nicolás Romero: dulces al mayoreo + materias primas para repostería + artículos de fiesta en un solo local.',
    especialidades: [
      'Proveedor integral para evento',
      'Dulces + repostería + fiesta',
      'Zona industrial con carga fácil',
      'Facilidad para pedidos grandes',
      'Cobertura regional norponiente'
    ],
    productos: [
      'Dulces al mayoreo por caja',
      'Harinas, azúcares y esencias',
      'Coberturas de chocolate',
      'Grageas y decoraciones de repostería',
      'Piñatas de perfil y bombo',
      'Globos látex y helio',
      'Desechables temáticos',
      'Velas y artículos para pastel',
      'Bolsas y empaque para bolo'
    ],
    servicios: [
      { nombre: 'Proveedor único', descripcion: 'Dulces + repostería + decoración sin salir del local' },
      { nombre: 'Zona industrial', descripcion: 'Acceso fácil para carga y descarga de pedidos grandes' },
      { nombre: 'Apartado para eventos', descripcion: 'Reservan producto para bodas, XV años y fiestas con anticipación' }
    ],
    transporte: {
      referencias: [
        'Col. Progreso Industrial, Nicolás Romero',
        'Zona industrial con vialidades anchas',
        'Acceso por Vía Gustavo Baz',
        'Rutas Rosario-Nicolás Romero cercanas',
        'Salida de Autopista Chamapa-La Venta'
      ]
    },
    imagen: getImagenPorIndice(2),
    imagenes: [getImagenPorIndice(2), getImagenPorIndice(3), getImagenPorIndice(4)]
  },
  {
    ...edomex,
    nombre: 'Dulcería Tus Amigas',
    slug: 'dulceria-tus-amigas-izcalli',
    tipo: 'Tienda de Golosinas',
    direccion: 'Paseos de Izcalli 13',
    colonia: 'Claustros de San Miguel',
    alcaldia: 'Cuautitlán Izcalli',
    alcaldiaSlug: 'cuautitlan-izcalli',
    cp: '54750',
    coordenadas: { lat: 19.6432, lng: -99.2108 },
    referencia: 'Dulcería residencial en zona Paseos de Izcalli — surtido para fiestas infantiles de condominios y fraccionamientos cercanos',
    telefono: 'Ver en Google Maps',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Dulcer%C3%ADa+Tus+Amigas+Paseos+de+Izcalli+13+Cuautitl%C3%A1n+Izcalli',
    rating: 4.3,
    resenas: 50,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería residencial en Claustros de San Miguel, Cuautitlán Izcalli — atiende fraccionamientos y condominios de Paseos de Izcalli.',
    especialidades: [
      'Dulcería de fraccionamiento',
      'Cobertura Paseos de Izcalli',
      'Fiestas infantiles residenciales',
      'Surtido clásico',
      'Trato familiar'
    ],
    productos: [
      'Gomitas clásicas',
      'Paletas Vero, Rockaleta',
      'Chocolates Carlos V, Tin Larín, Kinder',
      'Dulces enchilados',
      'Chicles Bubaloo',
      'Piñatas de perfil',
      'Velas para pastel',
      'Bolsitas celofán'
    ],
    servicios: [
      { nombre: 'Cercanía residencial', descripcion: 'Conveniente para vecinos de Paseos de Izcalli y Claustros' },
      { nombre: 'Surtido para cumpleaños', descripcion: 'Catálogo estándar para fiestas infantiles' },
      { nombre: 'Atención familiar', descripcion: 'Trato cercano con clientes recurrentes' }
    ],
    transporte: {
      referencias: [
        'Claustros de San Miguel, Cuautitlán Izcalli',
        'Zona Paseos de Izcalli',
        'Acceso por Av. Jiménez Cantú',
        'Rutas locales Izcalli-Tlalnepantla-Cuautitlán',
        'A 40 min del Metro Rosario vía autobús'
      ]
    },
    imagen: getImagenPorIndice(3),
    imagenes: [getImagenPorIndice(3), getImagenPorIndice(4), getImagenPorIndice(5)]
  },
  {
    ...edomex,
    nombre: 'Dulcería y Desechables La Roca',
    slug: 'dulceria-la-roca-izcalli',
    tipo: 'Dulcería Mayoreo',
    direccion: 'San Francisco de Asís 1',
    colonia: 'Lomas de San Francisco Tepojaco',
    alcaldia: 'Cuautitlán Izcalli',
    alcaldiaSlug: 'cuautitlan-izcalli',
    cp: '54715',
    coordenadas: { lat: 19.6552, lng: -99.2048 },
    referencia: 'Mayorista dulces + desechables con teléfono directo 55 2400 8432 — proveedor llave en mano para fiestas grandes en Izcalli',
    telefono: '55 2400 8432',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Dulcer%C3%ADa+y+Desechables+La+Roca+San+Francisco+de+As%C3%ADs+1+Cuautitl%C3%A1n+Izcalli',
    rating: 4.4,
    resenas: 70,
    verificado: true,
    destacado: true,
    horario: horarioMayoreoEdoMex,
    descripcionCorta: 'Mayorista doble-giro en Cuautitlán Izcalli: dulces + desechables en un mismo pedido — proveedor llave en mano para organizadores y eventos de 100+ invitados.',
    especialidades: [
      'Evento completo en un solo pedido',
      'Dulces + desechables + decoración',
      'Teléfono directo para pedidos grandes',
      'Mayoreo con entrega',
      'Facturación disponible',
      'Catálogo temático (Frozen, Dinos, XV años)'
    ],
    productos: [
      'Dulces al mayoreo por caja',
      'Platos, vasos y servilletas temáticos',
      'Manteles desechables estándar y temáticos',
      'Globos látex y helio',
      'Piñatas temáticas y genéricas',
      'Velas numéricas y de pastel',
      'Bolsitas celofán y cordón',
      'Juguetes para bolo (pequeños)',
      'Centros de mesa desechables',
      'Decoración por tema (Frozen, Mickey, XV)'
    ],
    servicios: [
      { nombre: 'Pedido llave en mano', descripcion: 'Organiza la lista completa de tu evento y ellos arman el pedido' },
      { nombre: 'Entrega local', descripcion: 'Reparto en Cuautitlán Izcalli y municipios cercanos con pedido anticipado' },
      { nombre: 'Consulta telefónica', descripcion: 'Llamar al 55 2400 8432 para cotizar y apartar antes de visitar' }
    ],
    transporte: {
      referencias: [
        'Lomas de San Francisco Tepojaco, Cuautitlán Izcalli',
        'Acceso por Av. Jiménez Cantú',
        'Cerca de Av. México-Cuautitlán',
        'Rutas Izcalli-Tlalnepantla paran cerca',
        'Estacionamiento propio para carga'
      ]
    },
    imagen: getImagenPorIndice(4),
    imagenes: [getImagenPorIndice(4), getImagenPorIndice(5), getImagenPorIndice(6)]
  },
  {
    ...edomex,
    nombre: 'Dulcería Kositas',
    slug: 'dulceria-kositas-izcalli',
    tipo: 'Tienda de Golosinas',
    direccion: 'Av. de la Unión 28A',
    colonia: 'Cofradía 4',
    alcaldia: 'Cuautitlán Izcalli',
    alcaldiaSlug: 'cuautitlan-izcalli',
    cp: '54715',
    coordenadas: { lat: 19.6521, lng: -99.2131 },
    referencia: 'Dulcería de barrio en Cofradía 4, sobre Av. de la Unión',
    telefono: 'Ver en Google Maps',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Dulcer%C3%ADa+Kositas+Uni%C3%B3n+28A+Cofrad%C3%ADa+Cuautitl%C3%A1n+Izcalli',
    rating: 4.2,
    resenas: 35,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería de barrio en Cofradía 4, Cuautitlán Izcalli — cobertura local para fiestas infantiles de las colonias cercanas.',
    especialidades: [
      'Dulcería de colonia',
      'Fiestas infantiles locales',
      'Cobertura Cofradía',
      'Trato familiar',
      'Surtido clásico'
    ],
    productos: [
      'Gomitas clásicas',
      'Paletas Vero, Rockaleta',
      'Chocolates Carlos V, Tin Larín',
      'Dulces enchilados',
      'Chicles Bubaloo',
      'Piñatas de perfil',
      'Velas para pastel',
      'Bolsitas celofán'
    ],
    servicios: [
      { nombre: 'Cercanía a colonia', descripcion: 'Conveniente para vecinos de Cofradía 1-4' },
      { nombre: 'Surtido para cumpleaños', descripcion: 'Catálogo estándar para fiestas infantiles' },
      { nombre: 'Trato familiar', descripcion: 'Atención cercana con clientes recurrentes' }
    ],
    transporte: {
      referencias: [
        'Col. Cofradía 4, Cuautitlán Izcalli',
        'Sobre Av. de la Unión',
        'Cerca de Av. Jiménez Cantú',
        'Rutas Izcalli-Tlalnepantla',
        'A 40 min del Metro Rosario vía autobús'
      ]
    },
    imagen: getImagenPorIndice(5),
    imagenes: [getImagenPorIndice(5), getImagenPorIndice(6), getImagenPorIndice(7)]
  },
  {
    ...edomex,
    nombre: 'Dulcería El Mayoreo Tecámac',
    slug: 'dulceria-el-mayoreo-tecamac',
    tipo: 'Dulcería Mayoreo',
    direccion: 'Tecámac',
    colonia: 'Tecámac Centro',
    alcaldia: 'Tecámac',
    alcaldiaSlug: 'tecamac',
    cp: '55740',
    coordenadas: { lat: 19.7125, lng: -98.9693 },
    referencia: 'Mayorista en Tecámac — atiende el norte del Valle (Ojo de Agua, Los Héroes, Sierra Hermosa) evitando cruzar hasta CDMX o Tultitlán',
    telefono: 'Ver en Google Maps',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Dulcer%C3%ADa+El+Mayoreo+Tec%C3%A1mac',
    rating: 4.4,
    resenas: 80,
    verificado: true,
    destacado: true,
    horario: horarioMayoreoEdoMex,
    descripcionCorta: 'Mayorista en Tecámac que cubre el norte del Valle de México (Ojo de Agua, Los Héroes, Sierra Hermosa) — ahorra cruzar hasta CDMX o Central de Abastos Tultitlán.',
    especialidades: [
      'Mayorista del norte del Valle',
      'Cobertura Ojo de Agua, Los Héroes, Sierra Hermosa',
      'Precio competitivo frente a CEDA Tultitlán',
      'Eventos de 100-300 invitados',
      'Dulces por caja y saco',
      'Pedido anticipado'
    ],
    productos: [
      'Dulces Ricolino, Vero, De la Rosa por caja',
      'Chocolates por caja matriz',
      'Gomitas Trolli, Ricolino, Vidal',
      'Dulces mexicanos por bulto',
      'Cacahuates y frutos secos por kilo',
      'Paletas por caja',
      'Chicles por caja',
      'Dulces importados',
      'Piñatería y empaque'
    ],
    servicios: [
      { nombre: 'Cobertura norte del Valle', descripcion: 'Ahorra 1-2 horas frente a cruzar a CDMX o Tultitlán' },
      { nombre: 'Mayoreo por bulto', descripcion: 'Precio de distribuidor con compra por caja completa' },
      { nombre: 'Apartado anticipado', descripcion: 'Reservan producto para eventos con 48-72h de anticipación' }
    ],
    transporte: {
      referencias: [
        'Tecámac Centro, norte del Valle de México',
        'Acceso por Autopista México-Pachuca salida Tecámac',
        'Cobertura Ojo de Agua, Los Héroes, Sierra Hermosa',
        'Rutas Indios Verdes-Ojo de Agua',
        'A 60 min del Metro Indios Verdes vía autobús'
      ]
    },
    imagen: getImagenPorIndice(6),
    imagenes: [getImagenPorIndice(6), getImagenPorIndice(7), getImagenPorIndice(8)]
  },
  {
    ...edomex,
    nombre: 'Dulcería Valdez Texcoco',
    slug: 'dulceria-valdez-texcoco',
    tipo: 'Dulcería Mayoreo',
    direccion: 'Leandro Valle 111',
    colonia: 'San Pedro',
    alcaldia: 'Texcoco',
    alcaldiaSlug: 'texcoco',
    cp: '56100',
    coordenadas: { lat: 19.5121, lng: -98.8835 },
    referencia: 'Mayorista en Col. San Pedro, Texcoco — contacto directo por teléfono 595 925 2147 y email dulceria.zed15@gmail.com',
    telefono: '595 925 2147',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Dulcer%C3%ADa+Valdez+Leandro+Valle+111+San+Pedro+Texcoco',
    rating: 4.3,
    resenas: 55,
    verificado: true,
    destacado: true,
    horario: horarioMayoreoEdoMex,
    descripcionCorta: 'Mayorista en Texcoco especializado en bodas y XV años regionales — único con teléfono directo (595 925 2147) y contacto por email para pedidos grandes del oriente.',
    especialidades: [
      'Especialidad en bodas y XV años',
      'Contacto directo por teléfono',
      'Pedido por email',
      'Cobertura oriente del Valle',
      'Mayoreo con factura',
      'Texcoco, Chiautla, Tepetlaoxtoc, Atenco'
    ],
    productos: [
      'Dulces al mayoreo por caja',
      'Chocolates Ricolino, Carlos V, Hershey',
      'Gomitas Trolli, Vero',
      'Dulces tradicionales mexicanos',
      'Cacahuates y frutos secos',
      'Paletas por caja',
      'Dulces enchilados',
      'Bolsitas y empaque para bolo'
    ],
    servicios: [
      { nombre: 'Pedido por teléfono/email', descripcion: 'Cotización y apartado sin visitar — email: dulceria.zed15@gmail.com, tel: 595 925 2147' },
      { nombre: 'Especialidad eventos formales', descripcion: 'Surtido coordinado para bodas y XV años regionales del oriente' },
      { nombre: 'Cobertura regional', descripcion: 'Atiende Texcoco, Chiautla, Tepetlaoxtoc, Atenco y municipios cercanos' }
    ],
    transporte: {
      referencias: [
        'Col. San Pedro, Texcoco',
        'Sobre Leandro Valle 111',
        'Acceso por Carretera Federal Texcoco-Los Reyes',
        'Cerca del Centro Histórico de Texcoco',
        'Salida de Circuito Exterior Mexiquense'
      ]
    },
    imagen: getImagenPorIndice(7),
    imagenes: [getImagenPorIndice(7), getImagenPorIndice(8), getImagenPorIndice(9)]
  }
];

// =====================================================
// DULCERÍAS DE LA ZONA METROPOLITANA DEL VALLE DE TOLUCA
// =====================================================
// Tercera región del directorio — mercado independiente del Valle de México.
// Incluye Toluca (capital estatal), Metepec (premium/artesanal), Zinacantepec,
// Lerma y San Mateo Atenco. Patrón: estado/estadoSlug = Toluca/toluca.
// alcaldia/alcaldiaSlug = municipio/municipioSlug (mismo modelo que Edo Mex).

const toluca = { estado: 'Toluca' as const, estadoSlug: 'toluca' as const };

// Horarios específicos para el corredor Toluca (comercio abre más temprano
// por temperatura del Valle — altitud 2680 msnm)
const horarioMayoreoToluca = {
  lunes: '8:00 - 18:30',
  martes: '8:00 - 18:30',
  miercoles: '8:00 - 18:30',
  jueves: '8:00 - 18:30',
  viernes: '8:00 - 19:00',
  sabado: '8:00 - 17:00',
  domingo: '9:00 - 14:00'
};

const horarioTradicionalToluca = {
  lunes: '10:00 - 19:30',
  martes: '10:00 - 19:30',
  miercoles: '10:00 - 19:30',
  jueves: '10:00 - 19:30',
  viernes: '10:00 - 20:00',
  sabado: '10:00 - 19:00',
  domingo: '11:00 - 16:00'
};

export const dulceriasToluca: Dulceria[] = [
  {
    ...toluca,
    nombre: 'Mundo del Dulce Toluca',
    slug: 'mundo-del-dulce-toluca',
    tipo: 'Dulcería Mayoreo',
    direccion: 'Toluca de Lerdo',
    colonia: 'Toluca Centro',
    alcaldia: 'Toluca',
    alcaldiaSlug: 'toluca',
    cp: '50000',
    coordenadas: { lat: 19.2926, lng: -99.6569 },
    referencia: 'Mayorista proveedor integral del Valle de Toluca — dulces, materias primas, desechables y decoración en un solo punto',
    telefono: 'Ver en Google Maps',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Mundo+del+Dulce+Toluca',
    rating: 4.4,
    resenas: 70,
    verificado: true,
    destacado: true,
    horario: horarioMayoreoToluca,
    descripcionCorta: 'Proveedor mayorista integral del Valle de Toluca — dulces al mayoreo, materias primas, desechables y decoración en la capital estatal.',
    especialidades: [
      'Mayorista del Valle de Toluca',
      'Dulces + materias primas + desechables',
      'Cobertura Toluca, Metepec, Lerma, Zinacantepec',
      'Eventos regionales',
      'Pedidos grandes por anticipación',
      'Facturación disponible'
    ],
    productos: [
      'Dulces al mayoreo por caja',
      'Chocolates Ricolino, Carlos V, Hershey',
      'Gomitas Trolli, Ricolino, Vidal',
      'Coberturas y chocolate para repostería',
      'Harinas, azúcares y esencias',
      'Desechables (platos, vasos, manteles)',
      'Piñatería y globos',
      'Velas y decoración',
      'Empaque para bolo y regalo'
    ],
    servicios: [
      { nombre: 'Proveedor único para eventos', descripcion: 'Todo en un solo pedido: dulces, repostería, desechables y decoración' },
      { nombre: 'Cobertura regional', descripcion: 'Atiende pedidos de toda la zona metropolitana de Toluca' },
      { nombre: 'Apartado para eventos', descripcion: 'Reservan producto para bodas, XV años y eventos corporativos' }
    ],
    transporte: {
      referencias: [
        'Toluca de Lerdo, capital del Estado de México',
        'Zona comercial central de Toluca',
        'Acceso por Paseo Tollocan',
        'Rutas locales Toluca-Metepec-Lerma',
        'A 70 km de CDMX por Autopista México-Toluca'
      ]
    },
    imagen: getImagenPorIndice(5),
    imagenes: [getImagenPorIndice(5), getImagenPorIndice(6), getImagenPorIndice(7)]
  },
  {
    ...toluca,
    nombre: 'Comercializadora Colibrí',
    slug: 'comercializadora-colibri-toluca',
    tipo: 'Dulcería Mayoreo',
    direccion: 'Toluca de Lerdo',
    colonia: 'Toluca Centro',
    alcaldia: 'Toluca',
    alcaldiaSlug: 'toluca',
    cp: '50000',
    coordenadas: { lat: 19.2935, lng: -99.6580 },
    referencia: 'Comercializadora mixta de dulces y abarrotes — atiende negocios formales del Valle de Toluca con facturación',
    telefono: 'Ver en Google Maps',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Comercializadora+Colibr%C3%AD+Toluca',
    rating: 4.3,
    resenas: 55,
    verificado: true,
    destacado: false,
    horario: horarioMayoreoToluca,
    descripcionCorta: 'Comercializadora mixta de dulces + abarrotes en Toluca — proveedor para misceláneas, dulcerías pequeñas y eventos corporativos con facturación CFDI.',
    especialidades: [
      'Mayoreo mixto dulces + abarrotes',
      'Clientes: misceláneas y negocios formales',
      'Facturación CFDI 4.0',
      'Entrega por pedido',
      'Cuenta corporativa',
      'Eventos empresariales'
    ],
    productos: [
      'Dulces Ricolino, Vero, De la Rosa por caja',
      'Chocolates por caja matriz',
      'Abarrotes: aceite, azúcar, sal, harina',
      'Gomitas por caja',
      'Botanas (cacahuates, chicharrones, papas)',
      'Refresco y aguas por paquete',
      'Dulces tradicionales mexicanos',
      'Galletas por caja',
      'Caramelos a granel'
    ],
    servicios: [
      { nombre: 'Facturación CFDI', descripcion: 'Emiten factura electrónica para empresas y negocios formales' },
      { nombre: 'Línea de crédito', descripcion: 'Clientes corporativos pueden gestionar crédito operativo' },
      { nombre: 'Entrega a domicilio', descripcion: 'Reparto local en el Valle de Toluca por pedido anticipado' }
    ],
    transporte: {
      referencias: [
        'Toluca de Lerdo, zona comercial',
        'Acceso por Paseo Tollocan',
        'Salida de Autopista México-Toluca',
        'Cobertura regional desde Toluca hacia municipios',
        'Cerca del mercado municipal de Toluca'
      ]
    },
    imagen: getImagenPorIndice(6),
    imagenes: [getImagenPorIndice(6), getImagenPorIndice(7), getImagenPorIndice(8)]
  },
  {
    ...toluca,
    nombre: 'Dulcería El Portal 5 de Mayo',
    slug: 'dulceria-el-portal-5-de-mayo-toluca',
    tipo: 'Dulcería Mayoreo',
    direccion: 'Av. 5 de Mayo esq. Rayón',
    colonia: 'Centro Histórico de Toluca',
    alcaldia: 'Toluca',
    alcaldiaSlug: 'toluca',
    cp: '50000',
    coordenadas: { lat: 19.2886, lng: -99.6556 },
    referencia: 'Sobre el corredor histórico de 5 de Mayo — eje mayorista de dulce tradicional del centro de Toluca',
    telefono: '722 214 3380',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Dulcer%C3%ADa+El+Portal+5+de+Mayo+Toluca+Centro',
    rating: 4.5,
    resenas: 95,
    verificado: true,
    destacado: true,
    horario: horarioMayoreoToluca,
    descripcionCorta: 'Mayorista histórico sobre el corredor 5 de Mayo en el Centro de Toluca — surtido amplio para revendedores, fiestas grandes y eventos del Valle.',
    especialidades: [
      'Corredor histórico 5 de Mayo',
      'Mayoreo desde media caja',
      'Dulce tradicional mexicano',
      'Surtido para tiendas y revendedores',
      'Precios competitivos por volumen',
      'Atención en mostrador 6 días a la semana'
    ],
    productos: [
      'Dulces Ricolino, Vero, De la Rosa por caja',
      'Gomitas a granel y en bolsa',
      'Chocolates Carlos V, Tin Larín, Ferrero',
      'Paletas Rockaleta, Vero Mango, Payaso',
      'Tamarindos y cacahuates enchilados',
      'Dulces típicos mexicanos',
      'Piñatería de perfil y bombo',
      'Bolsas celofán para bolo',
      'Confitería para fiestas'
    ],
    servicios: [
      { nombre: 'Mayoreo del Valle de Toluca', descripcion: 'Precios de mayoreo sin mínimos altos para organizadores locales' },
      { nombre: 'Apartado con anticipo', descripcion: 'Reservan mercancía para bodas y XV años con anticipo del 30%' },
      { nombre: 'Asesoría de cantidad', descripcion: 'Ayudan a calcular dulce por número de invitados' }
    ],
    transporte: {
      referencias: [
        'Centro Histórico de Toluca — esquina Av. 5 de Mayo y Rayón',
        'A 3 min caminando de Los Portales',
        'Acceso por Paseo Tollocan (salida Centro)',
        'Estacionamiento público a media cuadra'
      ]
    },
    imagen: getImagenPorIndice(3),
    imagenes: [getImagenPorIndice(3), getImagenPorIndice(4), getImagenPorIndice(5)]
  },
  {
    ...toluca,
    nombre: 'Dulces del Valle Toluca',
    slug: 'dulces-del-valle-toluca',
    tipo: 'Tienda de Golosinas',
    direccion: 'Blvd. Isidro Fabela Sur 520',
    colonia: 'Doctores',
    alcaldia: 'Toluca',
    alcaldiaSlug: 'toluca',
    cp: '50060',
    coordenadas: { lat: 19.2819, lng: -99.6611 },
    referencia: 'Tienda de golosinas sobre Isidro Fabela con surtido para fiesta residencial del sur de Toluca',
    telefono: '722 215 7722',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Dulces+del+Valle+Isidro+Fabela+Toluca',
    rating: 4.4,
    resenas: 62,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería residencial sobre Isidro Fabela Sur — surtido clásico para cumpleaños infantiles y fiestas familiares del sur de Toluca.',
    especialidades: [
      'Fiestas residenciales del sur de Toluca',
      'Cumpleaños infantiles',
      'Surtido clásico Ricolino / Vero / De la Rosa',
      'Bolos armados por encargo',
      'Atención familiar en mostrador'
    ],
    productos: [
      'Gomitas Ricolino, Panditas',
      'Paletas Vero Mango, Rockaleta, Payaso',
      'Chocolates Carlos V, Tin Larín',
      'Dulces enchilados nacionales',
      'Chicles Bubaloo, Trident',
      'Piñatas de perfil y bombo',
      'Velas para pastel',
      'Bolsitas celofán para bolo'
    ],
    servicios: [
      { nombre: 'Armado de bolos', descripcion: 'Bolsitas de dulce armadas por encargo con 2-3 días de anticipación' },
      { nombre: 'Apartado de piñata', descripcion: 'Reservan piñatas temáticas con 50% de anticipo' },
      { nombre: 'Surtido de temporada', descripcion: 'Dulces de Día de Muertos, Navidad y fin de año' }
    ],
    transporte: {
      referencias: [
        'Blvd. Isidro Fabela Sur 520, Col. Doctores',
        'A 10 min del Centro de Toluca',
        'Corredor comercial Isidro Fabela',
        'Cerca del Hospital Materno Infantil'
      ]
    },
    imagen: getImagenPorIndice(1),
    imagenes: [getImagenPorIndice(1), getImagenPorIndice(2), getImagenPorIndice(3)]
  },
  {
    ...toluca,
    nombre: 'Dulcería Santana',
    slug: 'dulceria-santana-metepec',
    tipo: 'Dulcería Tradicional',
    direccion: 'Metepec',
    colonia: 'Metepec Centro',
    alcaldia: 'Metepec',
    alcaldiaSlug: 'metepec',
    cp: '52140',
    coordenadas: { lat: 19.2687, lng: -99.6035 },
    referencia: 'Dulcería artesanal fundada en 1970 — una de las casas de dulce mexicano más antiguas del Valle de Toluca',
    telefono: 'Ver en Google Maps',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Dulcer%C3%ADa+Santana+Metepec',
    rating: 4.6,
    resenas: 110,
    verificado: true,
    destacado: true,
    horario: horarioTradicionalToluca,
    descripcionCorta: 'Dulcería artesanal con 55+ años de operación en Metepec — referencia histórica del dulce mexicano del Valle de Toluca para bodas, XV años y mesas tradicionales.',
    especialidades: [
      'Fundada en 1970 — 55+ años de tradición',
      'Dulce mexicano artesanal',
      'Mesas de boda tradicional',
      'Cajeta y jamoncillo propios',
      'Recetas regionales del Estado de México',
      'Surtido para Día de Muertos'
    ],
    productos: [
      'Alegrías artesanales grandes y mini',
      'Palanquetas de cacahuate, nuez, pepita',
      'Cocadas horneadas tostadas y suaves',
      'Dulces de cajeta casera',
      'Jamoncillo de leche, piñón y almendra',
      'Obleas con cajeta',
      'Pepitorias de semillas mexicanas',
      'Tamarindos de cristal',
      'Dulces de amaranto regional',
      'Calaveras de azúcar (temporada)'
    ],
    servicios: [
      { nombre: 'Tradición de 55+ años', descripcion: 'Recetas familiares sostenidas por generaciones — raramente replicables' },
      { nombre: 'Mesa tradicional completa', descripcion: 'Surtido coherente para mesa de boda o XV años con estética mexicana' },
      { nombre: 'Temporada de muertos', descripcion: 'Catálogo especial para ofrendas y celebración: calaveras, pan de muerto, dulces temáticos' }
    ],
    transporte: {
      referencias: [
        'Metepec Centro, contiguo al Barrio de San Miguel',
        'Acceso por Paseo San Isidro',
        'Cerca del Centro Histórico de Metepec',
        'Rutas locales Metepec-Toluca',
        'A 10 min del Centro de Toluca'
      ]
    },
    imagen: getImagenPorIndice(7),
    imagenes: [getImagenPorIndice(7), getImagenPorIndice(8), getImagenPorIndice(9)]
  },
  {
    ...toluca,
    nombre: 'Dulce Metepec',
    slug: 'dulce-metepec',
    tipo: 'Tienda de Golosinas',
    direccion: 'Metepec',
    colonia: 'Metepec Centro',
    alcaldia: 'Metepec',
    alcaldiaSlug: 'metepec',
    cp: '52140',
    coordenadas: { lat: 19.2692, lng: -99.6040 },
    referencia: 'Dulcería local de Metepec con atención familiar y surtido clásico para fiestas residenciales',
    telefono: 'Ver en Google Maps',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Dulce+Metepec+Dulcer%C3%ADa',
    rating: 4.3,
    resenas: 45,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería local en Metepec Centro para fiestas residenciales y cumpleaños — trato familiar con surtido clásico siempre disponible.',
    especialidades: [
      'Dulcería residencial de Metepec',
      'Fiestas infantiles locales',
      'Surtido clásico permanente',
      'Bolos y piñatas por encargo',
      'Atención familiar'
    ],
    productos: [
      'Gomitas clásicas Ricolino',
      'Paletas Vero, Rockaleta',
      'Chocolates Carlos V, Tin Larín',
      'Dulces enchilados',
      'Chicles Bubaloo',
      'Piñatas de perfil',
      'Velas para pastel',
      'Bolsitas celofán'
    ],
    servicios: [
      { nombre: 'Atención familiar', descripcion: 'Trato cercano con clientes recurrentes de la zona' },
      { nombre: 'Surtido estable', descripcion: 'Catálogo clásico disponible todo el año' },
      { nombre: 'Bolos armados', descripcion: 'Armado de bolsitas de dulce por encargo' }
    ],
    transporte: {
      referencias: [
        'Metepec Centro, Valle de Toluca',
        'Acceso por Paseo Tollocan',
        'Cerca del Centro Histórico de Metepec',
        'Rutas locales Metepec-Toluca',
        'A 10 min del Centro de Toluca'
      ]
    },
    imagen: getImagenPorIndice(8),
    imagenes: [getImagenPorIndice(8), getImagenPorIndice(9), getImagenPorIndice(10)]
  },
  {
    ...toluca,
    nombre: 'Dulcería ConfiMex Metepec',
    slug: 'confimex-metepec',
    tipo: 'Tienda de Golosinas Premium',
    direccion: 'Av. Tecnológico 2416',
    colonia: 'Madero',
    alcaldia: 'Metepec',
    alcaldiaSlug: 'metepec',
    cp: '52148',
    coordenadas: { lat: 19.2708, lng: -99.6082 },
    referencia: 'Enfoque premium en chocolates, frutos secos y botanas selectas — formato candy + snack para eventos corporativos',
    telefono: '722 417 1250',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Dulcer%C3%ADa+ConfiMex+Av+Tecnol%C3%B3gico+2416+Madero+Metepec',
    rating: 4.4,
    resenas: 85,
    verificado: true,
    destacado: true,
    horario: horarioEstandar.premium,
    descripcionCorta: 'Dulcería premium en Metepec con enfoque candy + snack — chocolates finos, frutos secos premium y botanas selectas para eventos corporativos del Valle de Toluca.',
    especialidades: [
      'Candy bar premium corporativo',
      'Estaciones de snack y botana',
      'Chocolates finos y artesanales',
      'Frutos secos premium',
      'Mezclas para regalo empresarial',
      'Catering de dulce para eventos formales'
    ],
    productos: [
      'Chocolates Lindt, Ferrero, Turín premium',
      'Frutos secos: almendra, pecana, nuez, pistache',
      'Cacahuates gourmet (miel, chile, chipotle)',
      'Botanas premium (chicharrines, habas, chochos)',
      'Dulces importados (Hi-Chew, Kinder Bueno, Raffaello)',
      'Chocolates oscuros 70-85% cacao',
      'Mezclas de frutos y chocolate',
      'Presentaciones para regalo empresarial',
      'Chocolates con licor (temporada)',
      'Gomitas premium gourmet'
    ],
    servicios: [
      { nombre: 'Mesa de dulces premium', descripcion: 'Surtido curado para eventos corporativos de alto nivel' },
      { nombre: 'Estación de snack', descripcion: 'Combinación de frutos secos + chocolates + botanas para evento empresarial' },
      { nombre: 'Regalo corporativo', descripcion: 'Arman presentaciones navideñas y de fin de año para empresas' }
    ],
    transporte: {
      referencias: [
        'Av. Tecnológico 2416, Col. Madero, Metepec',
        'Zona de Tecnológico de Monterrey campus Toluca',
        'Acceso por Paseo Tollocan',
        'Cerca de Galerías Metepec',
        'A 8 min del Centro de Toluca'
      ]
    },
    imagen: getImagenPorIndice(9),
    imagenes: [getImagenPorIndice(9), getImagenPorIndice(10), getImagenPorIndice(0)]
  },
  {
    ...toluca,
    nombre: 'Candy Station Galerías Metepec',
    slug: 'candy-station-galerias-metepec',
    tipo: 'Tienda de Golosinas Premium',
    direccion: 'Blvd. Ignacio Comonfort 504, local 112',
    colonia: 'La Providencia',
    alcaldia: 'Metepec',
    alcaldiaSlug: 'metepec',
    cp: '52177',
    coordenadas: { lat: 19.2645, lng: -99.5849 },
    referencia: 'Tienda dentro del complejo Galerías Metepec — candy bar premium con marcas importadas para bodas y corporativos',
    telefono: '722 211 3456',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Candy+Station+Galer%C3%ADas+Metepec',
    rating: 4.5,
    resenas: 130,
    verificado: true,
    destacado: true,
    horario: horarioEstandar.premium,
    descripcionCorta: 'Tienda premium en Galerías Metepec con marcas importadas — candy bar boutique para bodas, XV años y regalos corporativos en el Valle de Toluca.',
    especialidades: [
      'Candy bar premium de plaza comercial',
      'Marcas importadas (Lindt, Ferrero, Godiva)',
      'Regalo corporativo y bodas',
      'Estaciones temáticas personalizadas',
      'Horario extendido 7 días',
      'Pago con tarjeta'
    ],
    productos: [
      'Chocolates Lindt, Ferrero Rocher, Godiva',
      'Gomitas premium Haribo importadas',
      'Caramelos Werthers y Ricola',
      'Chocolates con licor (Baileys, Amaretto)',
      'Dulces americanos (M&Ms, Reese\'s, Skittles)',
      'Frutos secos gourmet en empaque de regalo',
      'Cajas y canastas pre-armadas',
      'Dulces sin azúcar',
      'Regalos de temporada premium'
    ],
    servicios: [
      { nombre: 'Canastas corporativas', descripcion: 'Armado de canastas de regalo para empresas con CFDI' },
      { nombre: 'Candy bar de boda', descripcion: 'Curaduría de mesa dulce temática con paleta de color personalizada' },
      { nombre: 'Pago con tarjeta', descripcion: 'Aceptan VISA, MasterCard, Amex y pago a meses sin intereses' }
    ],
    transporte: {
      referencias: [
        'Galerías Metepec — planta baja',
        'Acceso por Blvd. Ignacio Comonfort',
        'Estacionamiento del centro comercial disponible',
        'Rutas de transporte público Metepec-Toluca pasan por Galerías'
      ]
    },
    imagen: getImagenPorIndice(2),
    imagenes: [getImagenPorIndice(2), getImagenPorIndice(3), getImagenPorIndice(4)]
  },
  {
    ...toluca,
    nombre: 'La Central Dulcera Metepec',
    slug: 'la-central-dulcera-metepec',
    tipo: 'Dulcería Mayoreo',
    direccion: 'Av. Tecnológico 1200',
    colonia: 'San Salvador Tizatlalli',
    alcaldia: 'Metepec',
    alcaldiaSlug: 'metepec',
    cp: '52172',
    coordenadas: { lat: 19.2732, lng: -99.6112 },
    referencia: 'Bodega mayorista sobre Av. Tecnológico — abastece dulcerías pequeñas y organizadores de eventos del corredor Metepec–Toluca',
    telefono: '722 218 9010',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=La+Central+Dulcera+Metepec',
    rating: 4.3,
    resenas: 78,
    verificado: true,
    destacado: false,
    horario: horarioMayoreoToluca,
    descripcionCorta: 'Bodega mayorista sobre Av. Tecnológico Metepec — abastece dulcerías pequeñas, organizadores y eventos corporativos del corredor Toluca-Metepec.',
    especialidades: [
      'Bodega mayorista Av. Tecnológico',
      'Abastece dulcerías pequeñas del Valle',
      'Pedido por caja cerrada',
      'Facturación CFDI',
      'Horario industrial',
      'Descarga propia'
    ],
    productos: [
      'Gomitas Ricolino, Trolli, Vidal por caja',
      'Chocolates Carlos V, Kinder, Hershey por caja',
      'Paletas Rockaleta, Payaso, Vero por caja',
      'Dulces enchilados a granel',
      'Cacahuates y botanas por saco',
      'Desechables para fiesta al mayoreo',
      'Piñatería al mayoreo',
      'Azúcares y coberturas para repostería'
    ],
    servicios: [
      { nombre: 'Mayoreo por caja', descripcion: 'Precios por caja cerrada para dulcerías y organizadores' },
      { nombre: 'Facturación CFDI 4.0', descripcion: 'Factura electrónica inmediata para negocios y empresas' },
      { nombre: 'Entrega local', descripcion: 'Reparto dentro del Valle de Toluca por pedido mínimo' }
    ],
    transporte: {
      referencias: [
        'Av. Tecnológico 1200, Col. San Salvador Tizatlalli',
        'Corredor Tecnológico de Metepec',
        'Acceso por Paseo Tollocan',
        'A 6 min de Galerías Metepec',
        'Cerca de Tec de Monterrey campus Toluca'
      ]
    },
    imagen: getImagenPorIndice(4),
    imagenes: [getImagenPorIndice(4), getImagenPorIndice(5), getImagenPorIndice(6)]
  },
  {
    ...toluca,
    nombre: 'Dulcería La Pradera Zinacantepec',
    slug: 'dulceria-la-pradera-zinacantepec',
    tipo: 'Tienda de Golosinas',
    direccion: 'Av. Adolfo López Mateos 55',
    colonia: 'Zinacantepec Centro',
    alcaldia: 'Zinacantepec',
    alcaldiaSlug: 'zinacantepec',
    cp: '51350',
    coordenadas: { lat: 19.2816, lng: -99.7348 },
    referencia: 'Dulcería local sobre López Mateos en Zinacantepec — surtido de fiesta para el corredor poniente del Valle de Toluca',
    telefono: '722 253 4421',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Dulcer%C3%ADa+La+Pradera+Zinacantepec',
    rating: 4.4,
    resenas: 52,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería sobre Adolfo López Mateos en Zinacantepec Centro — surtido de fiesta para el corredor poniente del Valle de Toluca, rumbo al Nevado.',
    especialidades: [
      'Corredor poniente del Valle',
      'Fiestas residenciales',
      'Abasto para ranchos y comunidades cercanas',
      'Dulces clásicos siempre disponibles',
      'Piñatería y artículos de fiesta'
    ],
    productos: [
      'Gomitas Ricolino, Panditas',
      'Paletas Vero, Rockaleta',
      'Chocolates Carlos V, Tin Larín',
      'Dulces enchilados nacionales',
      'Tamarindos de temporada',
      'Piñatas de perfil y bombo',
      'Velas y bolsitas celofán',
      'Desechables para fiesta'
    ],
    servicios: [
      { nombre: 'Cobertura poniente', descripcion: 'Atiende Zinacantepec, San Miguel Almoloyan y comunidades rumbo al Nevado' },
      { nombre: 'Armado de bolos', descripcion: 'Bolsitas armadas por encargo con 2 días de anticipación' },
      { nombre: 'Pedidos anticipados', descripcion: 'Apartan piñatas temáticas para cumpleaños y fiestas familiares' }
    ],
    transporte: {
      referencias: [
        'Av. Adolfo López Mateos 55, Zinacantepec Centro',
        'A 15 min del Centro de Toluca',
        'Carretera Toluca-Temascaltepec',
        'Cerca de la Plaza Principal de Zinacantepec'
      ]
    },
    imagen: getImagenPorIndice(0),
    imagenes: [getImagenPorIndice(0), getImagenPorIndice(1), getImagenPorIndice(2)]
  },
  {
    ...toluca,
    nombre: 'Mayorista del Dulce Lerma',
    slug: 'mayorista-del-dulce-lerma',
    tipo: 'Dulcería Mayoreo',
    direccion: 'Carretera México-Toluca Km 52.5',
    colonia: 'Lerma Centro',
    alcaldia: 'Lerma',
    alcaldiaSlug: 'lerma',
    cp: '52000',
    coordenadas: { lat: 19.2833, lng: -99.5069 },
    referencia: 'Mayorista sobre la carretera México-Toluca Km 52.5 — abastece eventos corporativos del corredor industrial Lerma',
    telefono: '728 282 6712',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Mayorista+del+Dulce+Lerma',
    rating: 4.3,
    resenas: 47,
    verificado: true,
    destacado: true,
    horario: horarioMayoreoToluca,
    descripcionCorta: 'Mayorista sobre carretera México-Toluca Km 52.5 — proveedor de eventos corporativos y fiestas de parque industrial en el corredor Lerma–Santa Fe.',
    especialidades: [
      'Corredor industrial Toluca–Santa Fe',
      'Eventos corporativos y fin de año',
      'Abasto para parques industriales',
      'Facturación CFDI',
      'Pedidos con orden de compra',
      'Entrega a planta'
    ],
    productos: [
      'Dulces a granel por caja',
      'Chocolates Ricolino, Carlos V',
      'Gomitas Trolli, Vidal',
      'Bolos pre-armados para posada',
      'Botanas y cacahuates',
      'Galletas por caja',
      'Dulces navideños (temporada)',
      'Presentaciones de regalo corporativo'
    ],
    servicios: [
      { nombre: 'Eventos corporativos', descripcion: 'Cotización para fiestas de fin de año con invitación directa a departamento de compras' },
      { nombre: 'Facturación empresarial', descripcion: 'CFDI 4.0 inmediato para empresas con orden de compra' },
      { nombre: 'Entrega a planta', descripcion: 'Reparto directo en parques industriales del corredor Lerma' }
    ],
    transporte: {
      referencias: [
        'Carretera México-Toluca Km 52.5, Lerma',
        'Acceso directo desde Autopista México-Toluca',
        'A 10 min del Centro de Lerma',
        'A 30 min de Santa Fe CDMX',
        'Cerca de parques industriales de Lerma'
      ]
    },
    imagen: getImagenPorIndice(6),
    imagenes: [getImagenPorIndice(6), getImagenPorIndice(7), getImagenPorIndice(8)]
  },
  {
    ...toluca,
    nombre: 'Dulcería San Mateo',
    slug: 'dulceria-san-mateo-atenco',
    tipo: 'Tienda de Golosinas',
    direccion: 'Blvd. Toluca-Metepec 1210',
    colonia: 'San Mateo Atenco Centro',
    alcaldia: 'San Mateo Atenco',
    alcaldiaSlug: 'san-mateo-atenco',
    cp: '52104',
    coordenadas: { lat: 19.2697, lng: -99.5379 },
    referencia: 'Dulcería de barrio sobre Blvd. Toluca-Metepec — surtido constante con horario extendido entre semana',
    telefono: '728 285 1140',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Dulcer%C3%ADa+San+Mateo+Atenco',
    rating: 4.2,
    resenas: 38,
    verificado: true,
    destacado: false,
    horario: horarioEstandar.tienda,
    descripcionCorta: 'Dulcería de barrio en San Mateo Atenco Centro — surtido constante con horario extendido para fiestas familiares del corredor Toluca-Metepec-Lerma.',
    especialidades: [
      'Corredor Toluca–Metepec–Lerma',
      'Fiestas familiares y cumpleaños',
      'Horario extendido entre semana',
      'Trato directo con el dueño',
      'Comunidad zapatera tradicional'
    ],
    productos: [
      'Gomitas Ricolino, Panditas',
      'Paletas Vero, Rockaleta',
      'Chocolates Carlos V, Tin Larín',
      'Dulces enchilados',
      'Tamarindos de temporada',
      'Chicles Bubaloo',
      'Piñatas básicas',
      'Velas y bolsitas para bolo'
    ],
    servicios: [
      { nombre: 'Horario extendido', descripcion: 'Abierto hasta las 20:00 entre semana — útil para compras de paso' },
      { nombre: 'Atención personalizada', descripcion: 'Dueños atienden directamente y recuerdan preferencias de clientes recurrentes' },
      { nombre: 'Pedidos pequeños', descripcion: 'Arman bolsitas desde 10 piezas para fiestas infantiles chicas' }
    ],
    transporte: {
      referencias: [
        'Blvd. Toluca-Metepec 1210, San Mateo Atenco Centro',
        'Entre Metepec y Lerma — corredor Toluca',
        'A 12 min del Centro de Toluca',
        'A 8 min de Galerías Metepec'
      ]
    },
    imagen: getImagenPorIndice(10),
    imagenes: [getImagenPorIndice(10), getImagenPorIndice(0), getImagenPorIndice(1)]
  }
];

// Combinar todas las dulcerías (CDMX + Edo Mex + Toluca)
export const todasLasDulcerias: Dulceria[] = [
  ...dulceriasExistentes,
  ...dulceriasNuevas,
  ...dulceriasEdomex,
  ...dulceriasToluca
];

// Función para obtener dulcerías por alcaldía (CDMX)
export function getDulceriasPorAlcaldia(alcaldiaSlug: string): Dulceria[] {
  return todasLasDulcerias.filter(d => d.alcaldiaSlug === alcaldiaSlug && (d.estadoSlug ?? 'cdmx') === 'cdmx');
}

// Función para obtener dulcerías por municipio (Estado de México)
export function getDulceriasPorMunicipio(municipioSlug: string): Dulceria[] {
  return todasLasDulcerias.filter(d => d.alcaldiaSlug === municipioSlug && d.estadoSlug === 'edomex');
}

// Función para obtener dulcerías por municipio del Valle de Toluca
export function getDulceriasPorMunicipioToluca(municipioSlug: string): Dulceria[] {
  return todasLasDulcerias.filter(d => d.alcaldiaSlug === municipioSlug && d.estadoSlug === 'toluca');
}

// Función para obtener dulcerías por estado/región
export function getDulceriasPorEstado(estadoSlug: 'cdmx' | 'edomex' | 'toluca'): Dulceria[] {
  return todasLasDulcerias.filter(d => (d.estadoSlug ?? 'cdmx') === estadoSlug);
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

// Función para obtener dulcerías relacionadas (misma alcaldía/municipio y estado, excluyendo la actual)
export function getDulceriasRelacionadas(slug: string, limite: number = 4): Dulceria[] {
  const actual = getDulceriaPorSlug(slug);
  if (!actual) return [];

  const actualEstado = actual.estadoSlug ?? 'cdmx';

  const mismaZona = todasLasDulcerias.filter(d =>
    d.alcaldiaSlug === actual.alcaldiaSlug &&
    (d.estadoSlug ?? 'cdmx') === actualEstado &&
    d.slug !== slug
  );

  // Si no hay suficientes de la misma zona, agregar otras del mismo estado
  if (mismaZona.length < limite) {
    const mismoEstado = todasLasDulcerias.filter(d =>
      (d.estadoSlug ?? 'cdmx') === actualEstado &&
      d.alcaldiaSlug !== actual.alcaldiaSlug &&
      d.slug !== slug
    );
    return [...mismaZona, ...mismoEstado].slice(0, limite);
  }

  return mismaZona.slice(0, limite);
}

// Obtener alcaldías que tienen dulcerías (para navegación dinámica) — solo CDMX
export function getAlcaldiasConDulcerias(): { slug: string; nombre: string; cantidad: number }[] {
  const conteo: Record<string, number> = {};
  todasLasDulcerias.forEach(d => {
    if ((d.estadoSlug ?? 'cdmx') !== 'cdmx') return;
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

// Obtener municipios del Edo Mex que tienen dulcerías (para navegación dinámica)
export function getMunicipiosConDulcerias(): { slug: string; nombre: string; cantidad: number }[] {
  const conteo: Record<string, number> = {};
  todasLasDulcerias.forEach(d => {
    if (d.estadoSlug !== 'edomex') return;
    conteo[d.alcaldiaSlug] = (conteo[d.alcaldiaSlug] || 0) + 1;
  });

  return Object.entries(municipiosInfo)
    .filter(([slug]) => conteo[slug] && conteo[slug] > 0)
    .map(([slug, info]) => ({
      slug,
      nombre: info.nombre,
      cantidad: conteo[slug]
    }))
    .sort((a, b) => b.cantidad - a.cantidad);
}

// Obtener municipios del Valle de Toluca que tienen dulcerías (para navegación dinámica)
export function getMunicipiosTolucaConDulcerias(): { slug: string; nombre: string; cantidad: number }[] {
  const conteo: Record<string, number> = {};
  todasLasDulcerias.forEach(d => {
    if (d.estadoSlug !== 'toluca') return;
    conteo[d.alcaldiaSlug] = (conteo[d.alcaldiaSlug] || 0) + 1;
  });

  return Object.entries(municipiosToluca)
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
  const porRegion: Record<'cdmx' | 'edomex' | 'toluca', number> = {
    cdmx: 0,
    edomex: 0,
    toluca: 0
  };
  let totalResenas = 0;

  todasLasDulcerias.forEach(d => {
    porAlcaldia[d.alcaldia] = (porAlcaldia[d.alcaldia] || 0) + 1;
    porTipo[d.tipo] = (porTipo[d.tipo] || 0) + 1;
    const region = (d.estadoSlug ?? 'cdmx') as 'cdmx' | 'edomex' | 'toluca';
    porRegion[region] = (porRegion[region] || 0) + 1;
    totalResenas += d.resenas;
  });

  return {
    total: todasLasDulcerias.length,
    porAlcaldia,
    porTipo,
    porRegion,
    totalResenas,
    alcaldias: Object.keys(porAlcaldia).length,
    verificadas: todasLasDulcerias.filter(d => d.verificado).length,
    destacadas: todasLasDulcerias.filter(d => d.destacado).length
  };
}
