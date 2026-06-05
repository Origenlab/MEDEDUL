/**
 * Datos de las páginas pilar de "Por qué Mededul".
 * Fuente única de verdad para la ruta dinámica `src/pages/porque-mededul/[pilar].astro`.
 * Cada pilar comparte exactamente la misma plantilla (Hero + PricingPackages +
 * WhyChooseUs + ProcessSteps + EventsGrid + FAQContactModule); aquí solo viven los datos.
 */

export interface PqmPackage {
  name: string;
  icon: string;
  price: string;
  currency: string;
  guests: string;
  tagline: string;
  features: string[];
  popular: boolean;
  ctaText: string;
  ctaUrl: string;
}

export interface PqmStat { number: string; label: string; }
export interface PqmFeature { num: number; title: string; desc: string; img: string; }
export interface PqmStep { num: number; title: string; desc: string; }
export interface PqmEventCard { title: string; excerpt: string; img: string; href: string; cta: string; }
export interface PqmFaq { question: string; answer: string; }

export interface PqmPillar {
  slug: string;
  breadcrumbName: string;
  meta: { title: string; description: string; ogImage: string; };
  hero: { title: string; highlight: string; subtitle: string; secondaryContent: string; };
  pricingSubtitle: string;
  why: { title: string; titleHighlight: string; descriptions: string[]; };
  processSubtitle: string;
  eventsSubtitle: string;
  schema: { name: string; description: string; offerPrefix: string; };
  faqs: PqmFaq[];
  packages: PqmPackage[];
  whyStats: PqmStat[];
  whyFeatures: PqmFeature[];
  processSteps: PqmStep[];
  eventCards: PqmEventCard[];
}

export const porqueMededulPillars: PqmPillar[] = [
  {
    slug: 'calidad-premium',
    breadcrumbName: 'Calidad Premium',
    meta: {
      title: 'Calidad Premium en Mesas de Dulces en CDMX | Mededul',
      description: 'Mesas de dulces con calidad premium en CDMX: curaduria de producto, montaje profesional y estandar de servicio superior.',
      ogImage: '/img/porque-elegirnos/calidad-premium-dulces.avif'
    },
    hero: {
      title: 'Calidad Premium en Mesas de Dulces en CDMX',
      highlight: 'Calidad Premium',
      subtitle: 'Curaduria de producto y estandar profesional para elevar sabor, presentacion y experiencia',
      secondaryContent: `<p><strong>Calidad</strong> premium real no depende de una sola marca, sino de una curaduria profesional que garantiza frescura, coherencia y alto valor percibido en cada montaje. En Mededul seleccionamos producto y presentacion con criterios estrictos para sostener excelencia en todo el evento.</p><p><strong>Premium</strong> en mesas de dulces significa consistencia operativa: lo que prometemos en propuesta se refleja en montaje, servicio y experiencia final de invitados. Ese enfoque protege tu imagen y mejora resultados en celebraciones sociales y corporativas.</p>`
    },
    pricingSubtitle: 'Ajustamos nivel de curaduria premium segun aforo y alcance del evento.',
    why: {
      title: 'Por que elegir nuestra',
      titleHighlight: 'Calidad Premium',
      descriptions: [
        'Curaduria, frescura y presentacion alineadas a un estandar profesional.',
        'Mantenemos consistencia de calidad desde la seleccion del producto hasta el cierre operativo.'
      ]
    },
    processSubtitle: 'Cuatro pasos para asegurar calidad premium de inicio a fin.',
    eventsSubtitle: 'Estas capacidades complementan una propuesta premium orientada a resultados.',
    schema: {
      name: 'Calidad Premium en Mesas de Dulces en CDMX',
      description: 'Servicio de mesas de dulces con calidad premium en Ciudad de Mexico, con curaduria de producto y montaje profesional.',
      offerPrefix: 'Calidad Premium'
    },
    faqs: [
      { question: 'Que significa calidad premium en Mededul?', answer: 'Significa curaduria de producto, control de frescura, presentacion cuidada y estandares operativos consistentes.' },
      { question: 'Puedo solicitar tipos de dulces especificos?', answer: 'Si. Definimos surtido segun perfil del evento, preferencias y objetivo de experiencia.' },
      { question: 'Manejan opciones para restricciones alimentarias?', answer: 'Si. Ajustamos seleccion de producto en funcion de requerimientos del cliente y sus invitados.' },
      { question: 'Como garantizan frescura y calidad?', answer: 'Aplicamos control de seleccion, recepcion y montaje para mantener estandar de producto durante el servicio.' },
      { question: 'La calidad premium aplica en todos los paquetes?', answer: 'Si. Lo que cambia por paquete es alcance y volumen, no el estandar de calidad.' },
      { question: 'Se puede combinar con estaciones interactivas?', answer: 'Si. Integramos estaciones complementarias sin sacrificar calidad ni coherencia de montaje.' }
    ],
    packages: [
      { name: 'Esencial', icon: '🍬', price: '$5,100', currency: 'MXN', guests: '30-60 personas', tagline: 'Base premium para evento controlado', features: ['Surtido premium base', 'Control de calidad de producto', 'Montaje profesional', 'Mobiliario incluido', 'Desmontaje al finalizar'], popular: false, ctaText: 'Cotizar Paquete', ctaUrl: 'https://wa.me/525525226442?text=Hola! Quiero cotizar calidad premium (Esencial)' },
      { name: 'Premium', icon: '⭐', price: '$8,800', currency: 'MXN', guests: '60-120 personas', tagline: 'La opcion mas solicitada', features: ['Curaduria premium ampliada', 'Mayor variedad de producto', 'Montaje y coordinacion en sitio', 'Presentacion visual de alto nivel', 'Asesoria previa del evento', 'Mejor equilibrio costo-beneficio'], popular: true, ctaText: 'Cotizar Paquete', ctaUrl: 'https://wa.me/525525226442?text=Hola! Quiero cotizar calidad premium (Premium)' },
      { name: 'Luxury', icon: '💎', price: '$14,200', currency: 'MXN', guests: '120+ personas', tagline: 'Experiencia premium de alto impacto', features: ['Curaduria premium avanzada', 'Produccion de alto volumen', 'Operacion extendida en sitio', 'Configuracion para eventos grandes', 'Acompanamiento operativo total', 'Acabado premium integral'], popular: false, ctaText: 'Cotizar Paquete', ctaUrl: 'https://wa.me/525525226442?text=Hola! Quiero cotizar calidad premium (Luxury)' }
    ],
    whyStats: [
      { number: '50+', label: 'Variedades' },
      { number: '100%', label: 'Control de Calidad' },
      { number: '500+', label: 'Eventos' },
      { number: '24h', label: 'Respuesta Comercial' }
    ],
    whyFeatures: [
      { num: 1, title: 'Seleccion Rigurosa', desc: 'Curaduria de insumos para asegurar experiencia superior de sabor.', img: '/img/porque-elegirnos/calidad-premium-dulces.avif' },
      { num: 2, title: 'Frescura Controlada', desc: 'Procesos de recepcion y montaje para mantener calidad de producto.', img: '/img/galeria/chocolates-gourmet-macarons-trufas-premium.avif' },
      { num: 3, title: 'Presentacion Premium', desc: 'Composicion estetica que eleva valor percibido del evento.', img: '/img/galeria/mesa-postres-gourmet-premium-elegante.avif' },
      { num: 4, title: 'Consistencia Operativa', desc: 'Estandar profesional para sostener calidad durante todo el servicio.', img: '/img/galeria/candy-bar-gourmet-elegante.avif' }
    ],
    processSteps: [
      { num: 1, title: 'Brief de Calidad', desc: 'Definimos objetivo, perfil de invitados y nivel de propuesta requerido.' },
      { num: 2, title: 'Curaduria de Producto', desc: 'Seleccionamos surtido con criterio de calidad y coherencia visual.' },
      { num: 3, title: 'Planeacion de Montaje', desc: 'Alineamos logistica y detalles de presentacion para ejecucion impecable.' },
      { num: 4, title: 'Operacion Premium', desc: 'Implementamos y mantenemos estandar de calidad durante el evento.' }
    ],
    eventCards: [
      { title: 'Servicio Completo', excerpt: 'Planeacion y operacion integral para eventos sin fricciones.', img: '/img/porque-elegirnos/servicio-completo-mesas.avif', href: '/porque-mededul/servicio-completo', cta: 'Ver Servicio Completo' },
      { title: 'Diseno Personalizado', excerpt: 'Direccion visual adaptada al estilo de cada celebracion.', img: '/img/porque-elegirnos/diseno-personalizado-mesas-dulces.avif', href: '/porque-mededul/diseno-personalizado', cta: 'Ver Diseno Personalizado' },
      { title: 'Cero Estres', excerpt: 'Ejecucion profesional para que disfrutes sin preocupaciones.', img: '/img/porque-elegirnos/cero-estres-eventos.avif', href: '/porque-mededul/cero-estres', cta: 'Ver Cero Estres' },
      { title: 'Mesa de Postres', excerpt: 'Aplicamos calidad premium en montajes dulces de alto impacto.', img: '/img/galeria/mesa-postres-gourmet-premium-elegante.avif', href: '/tipos-de-mesas-de-dulces/mesa-de-postres', cta: 'Ver Mesa de Postres' }
    ]
  },
  {
    slug: 'cero-estres',
    breadcrumbName: 'Cero Estres',
    meta: {
      title: 'Servicio Cero Estres para Mesas de Dulces en CDMX | Mededul',
      description: 'Mesas de dulces en CDMX con servicio cero estres: planeacion, montaje, operacion y cierre profesional para eventos sin fricciones.',
      ogImage: '/img/porque-elegirnos/cero-estres-eventos.avif'
    },
    hero: {
      title: 'Servicio Cero Estres para Eventos en CDMX',
      highlight: 'Cero Estres',
      subtitle: 'Operacion profesional para que disfrutes tu evento sin carga ni preocupaciones',
      secondaryContent: `<p><strong>Estres</strong> operativo en un evento suele venir de decisiones fragmentadas, proveedores desalineados y falta de control en sitio. En Mededul resolvemos ese riesgo con una metodologia integral que unifica planeacion, montaje y ejecucion profesional.</p><p><strong>Servicio</strong> cero estres significa previsibilidad real: tiempos claros, comunicacion efectiva y respuesta operativa ante cualquier ajuste del evento. Asi proteges tu experiencia como anfitrion y aseguras un resultado consistente para tus invitados.</p>`
    },
    pricingSubtitle: 'Ajustamos el nivel de acompanamiento operativo segun complejidad y aforo.',
    why: {
      title: 'Por que elegir nuestro modelo',
      titleHighlight: 'Cero Estres',
      descriptions: [
        'Integramos operacion, seguimiento y cierre para reducir friccion en cada etapa.',
        'Garantizamos continuidad de servicio con enfoque profesional y controlado.'
      ]
    },
    processSubtitle: 'Cuatro pasos para ejecutar tu evento con control total y sin improvisaciones.',
    eventsSubtitle: 'Estas capacidades complementan una ejecucion estable y de alta calidad.',
    schema: {
      name: 'Servicio Cero Estres para Mesas de Dulces en CDMX',
      description: 'Servicio profesional de mesas de dulces en Ciudad de Mexico con enfoque cero estres: planeacion, montaje y operacion integral.',
      offerPrefix: 'Cero Estres'
    },
    faqs: [
      { question: 'Que significa cero estres en la practica?', answer: 'Significa delegar planeacion, montaje, operacion y cierre a un equipo profesional con control total del servicio.' },
      { question: 'Como garantizan puntualidad?', answer: 'Trabajamos con cronograma operativo y ventana de montaje anticipada para minimizar riesgos logísticos.' },
      { question: 'Debo supervisar durante el evento?', answer: 'No. Nuestro equipo ejecuta en sitio y te mantiene informado sin que debas intervenir en la operacion.' },
      { question: 'Que pasa si surge un imprevisto?', answer: 'Contamos con protocolos de respuesta y ajustes en sitio para mantener continuidad de servicio.' },
      { question: 'Incluye desmontaje?', answer: 'Si. El cierre operativo y desmontaje forman parte de la propuesta integral.' },
      { question: 'Aplica para eventos corporativos y sociales?', answer: 'Si. Adaptamos el modelo operativo al tipo de evento y dinamica de invitados.' }
    ],
    packages: [
      { name: 'Esencial', icon: '🛠️', price: '$5,000', currency: 'MXN', guests: '30-60 personas', tagline: 'Control operativo base', features: ['Planeacion operativa inicial', 'Montaje profesional', 'Operacion en sitio', 'Seguimiento de servicio', 'Desmontaje al finalizar'], popular: false, ctaText: 'Cotizar Paquete', ctaUrl: 'https://wa.me/525525226442?text=Hola! Quiero cotizar cero estres (Esencial)' },
      { name: 'Premium', icon: '⭐', price: '$8,700', currency: 'MXN', guests: '60-120 personas', tagline: 'La opcion mas solicitada', features: ['Coordinacion operativa integral', 'Diseno y montaje personalizado', 'Operacion extendida en sitio', 'Comunicacion directa de seguimiento', 'Asesoria previa del evento', 'Mejor equilibrio costo-beneficio'], popular: true, ctaText: 'Cotizar Paquete', ctaUrl: 'https://wa.me/525525226442?text=Hola! Quiero cotizar cero estres (Premium)' },
      { name: 'Luxury', icon: '💎', price: '$13,800', currency: 'MXN', guests: '120+ personas', tagline: 'Experiencia integral sin fricciones', features: ['Direccion operativa completa', 'Produccion premium de alto volumen', 'Operacion extendida en sitio', 'Configuracion para eventos grandes', 'Acompanamiento operativo total', 'Cierre operativo profesional'], popular: false, ctaText: 'Cotizar Paquete', ctaUrl: 'https://wa.me/525525226442?text=Hola! Quiero cotizar cero estres (Luxury)' }
    ],
    whyStats: [
      { number: '500+', label: 'Eventos' },
      { number: '100%', label: 'Puntualidad' },
      { number: '0', label: 'Improvisacion' },
      { number: '24h', label: 'Respuesta Comercial' }
    ],
    whyFeatures: [
      { num: 1, title: 'Planeacion Sin Fricciones', desc: 'Definimos ruta operativa para anticipar riesgos y evitar contratiempos.', img: '/img/porque-elegirnos/cero-estres-eventos.avif' },
      { num: 2, title: 'Montaje Puntual', desc: 'Implementacion anticipada para llegar al evento con todo listo.', img: '/img/home/servicio-profesional-mesas-dulces.avif' },
      { num: 3, title: 'Operacion Controlada', desc: 'Supervision en sitio para mantener presentacion y continuidad del servicio.', img: '/img/galeria/candy-bar-profesional-eventos.avif' },
      { num: 4, title: 'Cierre Ordenado', desc: 'Desmontaje y cierre operativo sin carga para el cliente.', img: '/img/galeria/mesa-dulces-eventos-especiales.avif' }
    ],
    processSteps: [
      { num: 1, title: 'Brief del Evento', desc: 'Recibimos contexto, objetivo y requerimientos operativos.' },
      { num: 2, title: 'Plan de Ejecucion', desc: 'Estructuramos cronograma, recursos y responsables del servicio.' },
      { num: 3, title: 'Montaje y Operacion', desc: 'Implementamos en sitio con monitoreo de continuidad y calidad.' },
      { num: 4, title: 'Cierre Profesional', desc: 'Realizamos desmontaje y entrega final sin fricciones.' }
    ],
    eventCards: [
      { title: 'Servicio Completo', excerpt: 'Centralizamos operacion para simplificar tu evento.', img: '/img/porque-elegirnos/servicio-completo-mesas.avif', href: '/porque-mededul/servicio-completo', cta: 'Ver Servicio Completo' },
      { title: 'Calidad Premium', excerpt: 'Curaduria profesional para elevar experiencia e imagen.', img: '/img/porque-elegirnos/calidad-premium-dulces.avif', href: '/porque-mededul/calidad-premium', cta: 'Ver Calidad Premium' },
      { title: 'Diseno Personalizado', excerpt: 'Direccion visual para montajes unicos y coherentes.', img: '/img/porque-elegirnos/diseno-personalizado-mesas-dulces.avif', href: '/porque-mededul/diseno-personalizado', cta: 'Ver Diseno Personalizado' },
      { title: 'Mesa de Dulces Corporativos', excerpt: 'Aplicamos control operativo en eventos empresariales exigentes.', img: '/img/eventos/corporativos/candy-bar-empresarial.avif', href: '/candy-bar-eventos/mesa-dulces-corporativos', cta: 'Ver Corporativos' }
    ]
  },
  {
    slug: 'diseno-personalizado',
    breadcrumbName: 'Diseno Personalizado',
    meta: {
      title: 'Diseno Personalizado de Mesas de Dulces en CDMX | Mededul',
      description: 'Diseno personalizado de mesas de dulces en CDMX para eventos sociales y corporativos con direccion visual profesional.',
      ogImage: '/img/porque-elegirnos/diseno-personalizado-mesas-dulces.avif'
    },
    hero: {
      title: 'Diseno Personalizado de Mesas de Dulces en CDMX',
      highlight: 'Diseno Personalizado',
      subtitle: 'Direccion visual a la medida para crear montajes unicos, coherentes y memorables',
      secondaryContent: `<p><strong>Diseno</strong> personalizado profesional evita montajes genericos y te permite construir una experiencia visual alineada al objetivo real de tu evento. En Mededul convertimos idea, estilo y contexto en una propuesta clara, funcional y de alto impacto.</p><p><strong>Personalizado</strong> no significa improvisado: implica metodologia, criterio estetico y ejecucion precisa para cuidar cada detalle del montaje. Asi logramos resultados consistentes que elevan imagen, experiencia de invitados y valor percibido.</p>`
    },
    pricingSubtitle: 'Ajustamos el nivel de diseno personalizado segun complejidad y aforo del evento.',
    why: {
      title: 'Por que elegir nuestro',
      titleHighlight: 'Diseno Personalizado',
      descriptions: [
        'Traducimos ideas en montajes funcionales y esteticamente coherentes.',
        'Integramos diseno, producto y operacion para resultados medibles en experiencia y presentacion.'
      ]
    },
    processSubtitle: 'Cuatro pasos para ejecutar tu diseno personalizado sin errores.',
    eventsSubtitle: 'Complementa tu decision con nuestros pilares de servicio y calidad.',
    schema: {
      name: 'Diseno Personalizado de Mesas de Dulces en CDMX',
      description: 'Servicio de diseno personalizado para mesas de dulces en Ciudad de Mexico con enfoque profesional y montaje premium.',
      offerPrefix: 'Diseno Personalizado'
    },
    faqs: [
      { question: 'Que tan personalizado puede ser el diseno?', answer: 'Podemos personalizar paleta, estilo, composicion, tipos de producto y narrativa visual segun tu objetivo.' },
      { question: 'Pueden trabajar referencias visuales?', answer: 'Si. Tomamos referencias como base para crear una propuesta original adaptada a tu evento.' },
      { question: 'Incluye asesoria de concepto?', answer: 'Si. Definimos direccion visual para asegurar coherencia entre montaje, espacio y tipo de celebracion.' },
      { question: 'Con cuanta anticipacion debo iniciar?', answer: 'Sugerimos iniciar de 2 a 4 semanas antes para aterrizar idea y ejecutar sin presion.' },
      { question: 'Aplica para eventos sociales y corporativos?', answer: 'Si. Adaptamos el enfoque de diseno segun naturaleza del evento y perfil de invitados.' },
      { question: 'Se puede combinar con estaciones interactivas?', answer: 'Si. Integrar estaciones permite ampliar experiencia y mantener unidad visual del proyecto.' },
      { question: 'Tienen un servicio especifico de mesas tematicas?', answer: 'Si. Nuestra linea Mesas Tematicas Personalizadas es el catalogo dedicado a conceptos integrales: producimos cuatro lineas (infantil, adultos, corporativa, tradicional mexicana) con moodboard previo, etiquetas a medida, props 3D, backdrop fotografico y direccion de arte completa. Conoce paquetes y casos en /candy-bar-eventos/mesas-tematicas desde $5,200 MXN.' }
    ],
    packages: [
      { name: 'Esencial', icon: '🎨', price: '$4,900', currency: 'MXN', guests: '30-60 personas', tagline: 'Ideal para concepto base', features: ['Direccion visual inicial', 'Composicion base del montaje', 'Surtido seleccionado', 'Montaje profesional', 'Desmontaje al finalizar'], popular: false, ctaText: 'Cotizar Paquete', ctaUrl: 'https://wa.me/525525226442?text=Hola! Quiero cotizar diseno personalizado (Esencial)' },
      { name: 'Premium', icon: '⭐', price: '$8,600', currency: 'MXN', guests: '60-120 personas', tagline: 'La opcion mas solicitada', features: ['Diseno integral por concepto', 'Mayor nivel de personalizacion', 'Montaje y coordinacion en sitio', 'Curaduria de producto y props', 'Asesoria previa del evento', 'Mejor equilibrio costo-beneficio'], popular: true, ctaText: 'Cotizar Paquete', ctaUrl: 'https://wa.me/525525226442?text=Hola! Quiero cotizar diseno personalizado (Premium)' },
      { name: 'Luxury', icon: '💎', price: '$13,900', currency: 'MXN', guests: '120+ personas', tagline: 'Experiencia integral de alto impacto', features: ['Direccion estetica completa', 'Produccion visual avanzada', 'Operacion extendida en sitio', 'Configuracion para eventos grandes', 'Acompanamiento operativo total', 'Acabado premium de alto nivel'], popular: false, ctaText: 'Cotizar Paquete', ctaUrl: 'https://wa.me/525525226442?text=Hola! Quiero cotizar diseno personalizado (Luxury)' }
    ],
    whyStats: [
      { number: '100%', label: 'A la Medida' },
      { number: '500+', label: 'Montajes' },
      { number: '4+', label: 'Etapas de Diseno' },
      { number: '24h', label: 'Respuesta Comercial' }
    ],
    whyFeatures: [
      { num: 1, title: 'Concepto Unico', desc: 'Cada proyecto parte de una idea propia alineada al tipo de evento.', img: '/img/porque-elegirnos/diseno-personalizado-mesas-dulces.avif' },
      { num: 2, title: 'Direccion Visual', desc: 'Definimos colores, alturas, materiales y lenguaje estetico coherente.', img: '/img/galeria/mesa-dulces-tematica-personalizada.avif' },
      { num: 3, title: 'Curaduria de Producto', desc: 'Seleccion estrategica de dulces y elementos para mejor impacto final.', img: '/img/galeria/candy-bar-tematico-eventos.avif' },
      { num: 4, title: 'Resultado Fotografiable', desc: 'Montajes pensados para destacar en experiencia en sitio y contenido visual.', img: '/img/galeria/mesa-dulces-eventos-especiales.avif' }
    ],
    processSteps: [
      { num: 1, title: 'Brief del Proyecto', desc: 'Definimos objetivo, estilo, invitados y contexto del evento.' },
      { num: 2, title: 'Propuesta de Diseno', desc: 'Presentamos direccion visual, composicion y alcance del montaje.' },
      { num: 3, title: 'Ajustes y Planeacion', desc: 'Refinamos detalles, cronograma y logistica de implementacion.' },
      { num: 4, title: 'Ejecucion en Sitio', desc: 'Montamos y operamos con fidelidad al concepto aprobado.' }
    ],
    eventCards: [
      { title: 'Servicio Completo', excerpt: 'Ejecucion integral con montaje y desmontaje profesional.', img: '/img/porque-elegirnos/servicio-completo-mesas.avif', href: '/porque-mededul/servicio-completo', cta: 'Ver Servicio Completo' },
      { title: 'Calidad Premium', excerpt: 'Curaduria de producto para elevar experiencia de invitados.', img: '/img/porque-elegirnos/calidad-premium-dulces.avif', href: '/porque-mededul/calidad-premium', cta: 'Ver Calidad Premium' },
      { title: 'Cero Estres', excerpt: 'Operacion profesional para que disfrutes el evento sin fricciones.', img: '/img/porque-elegirnos/cero-estres-eventos.avif', href: '/porque-mededul/cero-estres', cta: 'Ver Cero Estres' },
      { title: 'Mesa de Dulces', excerpt: 'Propuesta personalizada para todo tipo de celebraciones.', img: '/img/tipos-de-mesas/dulces-personalizadas/mesa-dulces-personalizada-elegante.avif', href: '/tipos-de-mesas-de-dulces/mesa-de-dulces', cta: 'Ver Mesa de Dulces' }
    ]
  },
  {
    slug: 'servicio-completo',
    breadcrumbName: 'Servicio Completo',
    meta: {
      title: 'Servicio Completo de Mesas de Dulces en CDMX | Mededul',
      description: 'Servicio completo de mesas de dulces en CDMX con planeacion, montaje y operacion profesional para eventos sin fricciones.',
      ogImage: '/img/porque-elegirnos/servicio-completo-mesas.avif'
    },
    hero: {
      title: 'Servicio Completo de Mesas de Dulces en CDMX',
      highlight: 'Servicio Completo',
      subtitle: 'Operacion integral para que tu evento se ejecute con calidad, control y cero improvisaciones',
      secondaryContent: `<p><strong>Servicio</strong> completo profesional elimina fricciones de coordinacion y te permite concentrarte en disfrutar el evento sin asumir carga operativa. En Mededul integramos planeacion, montaje, operacion y desmontaje bajo un solo estandar de ejecucion.</p><p><strong>Completo</strong> no solo significa incluir mas tareas, sino garantizar continuidad, puntualidad y calidad en cada fase del proyecto. Nuestra metodologia protege tu inversion y mejora la experiencia de tus invitados con resultados consistentes.</p>`
    },
    pricingSubtitle: 'Ajustamos el servicio completo segun complejidad, aforo y nivel de produccion.',
    why: {
      title: 'Por que elegir nuestro',
      titleHighlight: 'Servicio Completo',
      descriptions: [
        'Integramos planeacion, montaje y operacion para lograr ejecuciones estables.',
        'Reducimos carga operativa del cliente y elevamos calidad final del evento.'
      ]
    },
    processSubtitle: 'Cuatro pasos para implementar tu servicio completo sin errores.',
    eventsSubtitle: 'Estos pilares complementan una operacion integral orientada a resultados.',
    schema: {
      name: 'Servicio Completo de Mesas de Dulces en CDMX',
      description: 'Servicio completo de mesas de dulces en Ciudad de Mexico con planeacion, montaje, operacion y desmontaje profesional.',
      offerPrefix: 'Servicio Completo'
    },
    faqs: [
      { question: 'Que incluye el servicio completo?', answer: 'Incluye planeacion, diseno, curaduria de producto, montaje, operacion en sitio y desmontaje al finalizar.' },
      { question: 'Debo coordinar proveedores por separado?', answer: 'No. Centralizamos la operacion para reducir friccion y darte una sola linea de control.' },
      { question: 'El servicio incluye acompanamiento durante el evento?', answer: 'Si. Nuestro equipo opera y supervisa para mantener presentacion y flujo de servicio.' },
      { question: 'Con cuanta anticipacion debo contratar?', answer: 'Recomendamos entre 2 y 4 semanas para planear con precision y asegurar disponibilidad.' },
      { question: 'Atienden eventos pequenos y grandes?', answer: 'Si. Escalamos el alcance segun aforo, venue y complejidad del montaje.' },
      { question: 'Que pasa al finalizar el evento?', answer: 'Realizamos desmontaje total y cierre operativo para que no tengas carga adicional.' }
    ],
    packages: [
      { name: 'Esencial', icon: '📦', price: '$5,200', currency: 'MXN', guests: '30-60 personas', tagline: 'Ideal para evento controlado', features: ['Planeacion base del servicio', 'Montaje profesional', 'Surtido inicial de producto', 'Operacion en sitio', 'Desmontaje al finalizar'], popular: false, ctaText: 'Cotizar Paquete', ctaUrl: 'https://wa.me/525525226442?text=Hola! Quiero cotizar servicio completo (Esencial)' },
      { name: 'Premium', icon: '⭐', price: '$8,900', currency: 'MXN', guests: '60-120 personas', tagline: 'La opcion mas solicitada', features: ['Planeacion integral del evento', 'Diseno personalizado', 'Mayor volumen y variedad', 'Montaje y coordinacion en sitio', 'Asesoria previa del evento', 'Mejor equilibrio costo-beneficio'], popular: true, ctaText: 'Cotizar Paquete', ctaUrl: 'https://wa.me/525525226442?text=Hola! Quiero cotizar servicio completo (Premium)' },
      { name: 'Luxury', icon: '💎', price: '$14,500', currency: 'MXN', guests: '120+ personas', tagline: 'Experiencia integral de alto impacto', features: ['Direccion operativa completa', 'Produccion premium de alto volumen', 'Operacion extendida en sitio', 'Configuracion para eventos grandes', 'Acompanamiento operativo total', 'Acabado premium en cada etapa'], popular: false, ctaText: 'Cotizar Paquete', ctaUrl: 'https://wa.me/525525226442?text=Hola! Quiero cotizar servicio completo (Luxury)' }
    ],
    whyStats: [
      { number: '500+', label: 'Eventos' },
      { number: '100%', label: 'Integral' },
      { number: '0', label: 'Improvisacion' },
      { number: '24h', label: 'Respuesta Comercial' }
    ],
    whyFeatures: [
      { num: 1, title: 'Planeacion Integrada', desc: 'Concentramos decisiones clave para reducir errores operativos.', img: '/img/porque-elegirnos/servicio-completo-mesas.avif' },
      { num: 2, title: 'Montaje Profesional', desc: 'Ejecucion puntual con criterios de calidad y presentacion.', img: '/img/home/servicio-profesional-mesas-dulces.avif' },
      { num: 3, title: 'Operacion en Sitio', desc: 'Supervision continua para mantener experiencia y flujo de servicio.', img: '/img/galeria/mesa-dulces-evento-corporativo-profesional.avif' },
      { num: 4, title: 'Desmontaje Total', desc: 'Cierre ordenado para que el cliente no asuma carga operativa.', img: '/img/galeria/mesa-dulces-elegante-clasica-cristaleria.avif' }
    ],
    processSteps: [
      { num: 1, title: 'Brief Comercial', desc: 'Recibimos alcance, fecha, aforo y requerimientos del evento.' },
      { num: 2, title: 'Propuesta Integral', desc: 'Definimos diseno, producto, operacion y cronograma de ejecucion.' },
      { num: 3, title: 'Planeacion Final', desc: 'Alineamos logistica, accesos y coordinacion con sede.' },
      { num: 4, title: 'Ejecucion Completa', desc: 'Montamos, operamos y cerramos con estandar profesional.' }
    ],
    eventCards: [
      { title: 'Calidad Premium', excerpt: 'Curaduria de producto para elevar experiencia y percepcion.', img: '/img/porque-elegirnos/calidad-premium-dulces.avif', href: '/porque-mededul/calidad-premium', cta: 'Ver Calidad Premium' },
      { title: 'Cero Estres', excerpt: 'Operacion fluida para que disfrutes tu evento sin fricciones.', img: '/img/porque-elegirnos/cero-estres-eventos.avif', href: '/porque-mededul/cero-estres', cta: 'Ver Cero Estres' },
      { title: 'Diseno Personalizado', excerpt: 'Direccion visual para montar propuestas unicas y memorables.', img: '/img/porque-elegirnos/diseno-personalizado-mesas-dulces.avif', href: '/porque-mededul/diseno-personalizado', cta: 'Ver Diseno Personalizado' },
      { title: 'Mesa de Dulces', excerpt: 'Servicio completo aplicado a eventos sociales y corporativos.', img: '/img/tipos-de-mesas/dulces-personalizadas/mesa-dulces-personalizada-eventos.avif', href: '/tipos-de-mesas-de-dulces/mesa-de-dulces', cta: 'Ver Mesa de Dulces' }
    ]
  }
];
