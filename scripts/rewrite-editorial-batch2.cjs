#!/usr/bin/env node
const fs = require('fs');

const BATCH = {
  'src/content/blog/experiencias-dulces-inolvidables-quinceaneras.mdx': {
    intro: '**Una mesa de dulces en XV años debe sentirse como parte del espectáculo, no como un mueble más.** En **Mededul** diseñamos experiencias en CDMX donde estética, timing y servicio trabajan juntos para dejar una impresión inolvidable.',
    sections: [
      ['Convertir la mesa en experiencia, no solo decoración', 'Cuando la mesa se piensa al final, queda desconectada del concepto de la fiesta y pierde protagonismo.', 'Integramos la mesa desde el guion visual de la quinceañera para que dialogue con vestido, escenografía y momentos clave.'],
      ['Diseñar momentos de consumo por bloques', 'Abrir servicio sin estrategia provoca picos desordenados y desabasto temprano.', 'Planeamos consumo por etapas del evento con reposición inteligente para mantener abundancia visual toda la noche.'],
      ['Crear una narrativa visual fotogénica', 'Un montaje plano o saturado se ve regular en foto y video, y eso reduce recordación social.', 'Diseñamos composición por alturas y focos visuales para maximizar impacto en registro fotográfico y reels.'],
      ['Personalizar sin perder elegancia', 'Agregar demasiados elementos personalizados puede volver infantil una propuesta que debe verse sofisticada.', 'Seleccionamos personalización de alto impacto y bajo ruido. Complementa con [tendencias XV](/blog/tendencias-mesa-dulces-xv-anos-2025) y [guía completa de XV años](/blog/mesa-de-dulces-para-xv-anos-guia-completa).'],
      ['Coordinar mesa con protocolo del evento', 'Si la mesa compite con vals, brindis o ceremonia principal, interrumpe el flujo emocional de la fiesta.', 'Sincronizamos apertura y atención con timeline oficial para sumar experiencia sin robar foco.'],
      ['Mantener estándar hasta el cierre', 'Muchas mesas lucen perfectas al inicio pero se deterioran en la segunda mitad por falta de operación.', 'Aplicamos supervisión continua y cierre técnico para mantener calidad visual y funcional hasta el final.']
    ],
    alert: 'En quinceañeras, la consistencia visual durante todo el evento vale más que un montaje espectacular solo en los primeros minutos.',
    checklist: ['Concepto de experiencia definido', 'Consumo planificado por bloques', 'Montaje fotogénico por diseño', 'Personalización equilibrada', 'Timeline coordinado con protocolo', 'Operación continua hasta cierre'],
    cta: ['¿Quieres una mesa de XV años realmente inolvidable?', 'Diseñamos experiencias dulces en CDMX con dirección visual y ejecución profesional de principio a fin.', 'Hola! Quiero cotizar una mesa de dulces inolvidable para XV años en CDMX']
  },
  'src/content/blog/guia-completa-fuentes-chocolate-eventos-cdmx.mdx': {
    intro: '**Una fuente de chocolate puede transformar el ambiente de un evento cuando está bien dimensionada y operada.** En **Mededul** la tratamos como una estación técnica en CDMX, no solo como un elemento visual.',
    sections: [
      ['Elegir tipo de fuente según aforo real', 'Seleccionar fuente por apariencia y no por capacidad genera filas, pausas y frustración.', 'Calculamos volumen de servicio por número de asistentes y duración para definir equipo y ritmo de reposición.'],
      ['Definir chocolate por estabilidad y sabor', 'Usar mezclas inadecuadas rompe textura, afecta flujo y empeora experiencia de consumo.', 'Seleccionamos formulaciones con estabilidad térmica y perfil sensorial acorde al tipo de evento.'],
      ['Diseñar acompañamientos por contraste', 'Cuando todo sabe parecido, la estación pierde atractivo después de los primeros minutos.', 'Construimos una combinación de frutas, crocantes y bases suaves para mantener variedad y rotación.'],
      ['Planear ubicación y circulación', 'Una estación mal colocada bloquea tránsito y crea cuellos de botella en zonas clave del venue.', 'Definimos layout por flujo de invitados. Puedes complementar con [estaciones gourmet](/blog/estaciones-interactivas-gourmet-para-eventos-exquisitos) y [barra de postres gourmet](/blog/barra-postres-gourmet-eventos-cdmx).'],
      ['Controlar temperatura y limpieza operativa', 'Sin control térmico ni higiene visible, la percepción de calidad baja inmediatamente.', 'Implementamos protocolo de temperatura, reposición y limpieza en intervalos cortos durante el servicio.'],
      ['Preparar contingencias técnicas', 'Una falla eléctrica o mecánica sin plan B puede detener por completo la estación.', 'Incluimos respaldo operativo y revisión previa para asegurar continuidad en eventos críticos.']
    ],
    alert: 'La clave de una fuente de chocolate profesional es combinar flujo constante, control de temperatura y montaje limpio.',
    checklist: ['Fuente dimensionada por aforo', 'Chocolate estable seleccionado', 'Acompañamientos con contraste', 'Ubicación validada por circulación', 'Control térmico y limpieza activos', 'Contingencias técnicas cubiertas'],
    cta: ['¿Quieres una fuente de chocolate impecable para tu evento?', 'Operamos estaciones de chocolate en CDMX con calidad constante, estética premium y logística segura.', 'Hola! Quiero cotizar una fuente de chocolate para mi evento en CDMX']
  },
  'src/content/blog/ideas-mesa-dulces-baby-shower-perfecta.mdx': {
    intro: '**Un baby shower memorable se construye con detalles bien pensados, no con saturación de elementos.** En **Mededul** diseñamos mesas en CDMX que combinan ternura visual, funcionalidad y excelente experiencia para invitados.',
    sections: [
      ['Definir estilo emocional del baby shower', 'Copiar ideas sueltas de internet crea mesas bonitas pero sin identidad clara.', 'Traducimos la historia de la familia en una propuesta visual coherente y fácil de ejecutar.'],
      ['Elegir paleta que mantenga calma visual', 'Demasiados tonos pastel simultáneos pueden verse caóticos en vez de delicados.', 'Trabajamos una paleta principal y acentos suaves para sostener armonía en todo el montaje.'],
      ['Seleccionar dulces por practicidad y estética', 'Postres muy complejos o frágiles dificultan servicio y bajan rotación.', 'Curamos piezas fáciles de consumir y visualmente atractivas para mantener equilibrio entre forma y función.'],
      ['Diseñar montaje para foto social y comodidad', 'Si la mesa se diseña solo para foto fija, puede fallar en acceso y flujo de invitados.', 'Componemos para fotografía y consumo real. Puedes revisar [mesa baby shower guía](/blog/mesa-de-dulces-para-baby-shower-guia-completa) y [ideas creativas baby shower](/blog/mesa-dulces-baby-shower-ideas-creativas).'],
      ['Calcular cantidades sin desperdicio', 'Sobrestimar o subestimar consumo impacta presupuesto y percepción de calidad.', 'Proyectamos porciones por perfil de invitado y duración para un servicio continuo y rentable.'],
      ['Cuidar señalización y cierre', 'Sin etiquetas ni orden final, se pierde claridad y profesionalismo en la experiencia.', 'Integramos señalética limpia y protocolo de cierre para terminar con el mismo estándar del inicio.']
    ],
    alert: 'La mesa de baby shower ideal es la que mantiene dulzura visual sin comprometer funcionalidad durante el evento.',
    checklist: ['Concepto emocional definido', 'Paleta armónica controlada', 'Dulces funcionales seleccionados', 'Montaje fotogénico y accesible', 'Cantidades proyectadas correctamente', 'Señalización y cierre profesional'],
    cta: ['¿Quieres un baby shower con mesa de dulces perfecta?', 'Diseñamos propuestas en CDMX con equilibrio visual, logística eficiente y detalles memorables.', 'Hola! Quiero cotizar una mesa de dulces perfecta para mi baby shower en CDMX']
  },
  'src/content/blog/la-magia-de-la-mesa-de-dulces-en-baby-showers-bosques-de-las-loma.mdx': {
    intro: '**La magia en un baby shower no aparece por azar: se diseña con intención.** En **Mededul** creamos mesas en CDMX que convierten un evento íntimo en una experiencia cálida, elegante y memorable.',
    sections: [
      ['Construir una atmósfera acogedora desde la mesa', 'Cuando la mesa no conecta con la energía del evento, el ambiente se siente frío o impersonal.', 'Diseñamos una propuesta que refleje cercanía familiar con acabados suaves y composición envolvente.'],
      ['Elegir dulces que cuenten una historia', 'Una selección genérica de productos no transmite emoción ni singularidad.', 'Curamos piezas con significado visual para reforzar el tema del baby shower y su narrativa emocional.'],
      ['Equilibrar ternura y sofisticación', 'Exceso de recursos infantiles puede restar elegancia a la celebración.', 'Combinamos elementos tiernos con una base estética limpia para mantener estilo refinado.'],
      ['Integrar mesa con experiencia de invitados', 'Si la mesa se monta aislada del flujo, los invitados la ven pero no interactúan de forma natural.', 'Ubicamos y operamos la mesa como punto social estratégico. Puedes complementar con [ideas perfectas de baby shower](/blog/ideas-mesa-dulces-baby-shower-perfecta) y [guía general de baby shower](/blog/mesa-de-dulces-para-baby-shower-guia-completa).'],
      ['Cuidar detalles sensoriales', 'Ignorar aroma, textura y contraste limita la experiencia a lo visual.', 'Añadimos variedad sensorial para que la mesa se disfrute con vista, sabor y dinámica de consumo.'],
      ['Cerrar con recuerdo positivo', 'Sin una salida ordenada, el cierre del evento puede sentirse abrupto.', 'Planificamos una fase final limpia y armónica para sostener la experiencia emocional hasta el último momento.']
    ],
    alert: 'La magia real de una mesa de baby shower está en cómo hace sentir a los invitados durante toda la celebración.',
    checklist: ['Atmósfera emocional definida', 'Dulces con narrativa visual', 'Ternura con elegancia balanceada', 'Mesa integrada al flujo social', 'Experiencia sensorial cuidada', 'Cierre memorable planificado'],
    cta: ['¿Quieres una mesa de baby shower con verdadero efecto wow?', 'Diseñamos experiencias dulces en CDMX que combinan emoción, estética y operación impecable.', 'Hola! Quiero cotizar una mesa mágica para baby shower en CDMX']
  },
  'src/content/blog/magia-de-mesas-dulces-en-fiestas-infantiles-condesa.mdx': {
    intro: '**Una fiesta infantil memorable necesita más que colores llamativos: necesita estructura y ritmo.** En **Mededul** diseñamos mesas en CDMX que conectan con niños, organizan el consumo y elevan toda la celebración.',
    sections: [
      ['Diseñar para diversión controlada', 'Si la mesa solo busca impacto visual, puede volverse caótica en minutos durante la fiesta.', 'Combinamos diseño atractivo con lógica de servicio para mantener orden sin perder entusiasmo infantil.'],
      ['Seleccionar dulces por facilidad de consumo', 'Productos difíciles de manipular generan derrames, filas lentas y desperdicio.', 'Priorizamos formatos prácticos, porciones pequeñas y opciones seguras para diferentes edades.'],
      ['Crear puntos de interacción', 'Sin dinámicas simples, los niños consumen rápido y la mesa pierde protagonismo temprano.', 'Añadimos elementos de participación breve que sostienen interés y mejoran experiencia del grupo.'],
      ['Coordinar mesa con animación y juegos', 'Cuando la mesa compite con show principal, se divide la atención y baja disfrute general.', 'Sincronizamos servicio con actividades. Puedes reforzar con [ideas de cumpleaños infantil](/blog/mesa-dulces-cumpleanos-infantil-ideas) y [celebraciones infantiles de ensueño](/blog/celebraciones-infantiles-ensueno-cdmx).'],
      ['Controlar reposición en tiempo real', 'Si no hay control de reposición, la mesa se vacía o se ve desordenada en fase clave del evento.', 'Definimos rondas de ajuste para sostener volumen visual y disponibilidad de favoritos.'],
      ['Mantener limpieza y seguridad final', 'Un cierre sin protocolo deja residuos y una percepción poco profesional.', 'Aplicamos desmontaje higiénico y organización de sobrantes para un cierre limpio y seguro.']
    ],
    alert: 'La magia en fiestas infantiles se sostiene cuando diseño, animación y logística trabajan en el mismo ritmo.',
    checklist: ['Diversión con control operativo', 'Dulces prácticos y seguros', 'Interacción diseñada', 'Servicio coordinado con animación', 'Reposición en tiempo real', 'Cierre higiénico y ordenado'],
    cta: ['¿Buscas una mesa infantil que funcione y sorprenda?', 'Creamos experiencias dulces para fiestas infantiles en CDMX con creatividad y control total.', 'Hola! Quiero cotizar una mesa de dulces para fiesta infantil en CDMX']
  },
  'src/content/blog/mesa-de-dulces-baby-shower-transforma-tu-celebracion-con-enc-pedr.mdx': {
    intro: '**Transformar un baby shower en una experiencia elegante depende de decisiones precisas en diseño y servicio.** En **Mededul** trabajamos mesas en CDMX pensadas para emocionar, ordenar el evento y lucir impecables todo el tiempo.',
    sections: [
      ['Definir un concepto con intención', 'Sin concepto claro, la mesa termina mezclando estilos y perdiendo fuerza visual.', 'Construimos una propuesta con narrativa, paleta y selección de piezas coherente desde el inicio.'],
      ['Diseñar composición con foco principal', 'Cuando no existe punto focal, la mesa se percibe plana y poco memorable.', 'Creamos jerarquía visual con elementos clave que dirigen la mirada y elevan fotografía del evento.'],
      ['Elegir surtido por equilibrio de sabores', 'Ofrecer opciones muy similares reduce interés y repetición por parte de invitados.', 'Combinamos perfiles suaves, frutales y texturas contrastantes para una experiencia más rica y dinámica.'],
      ['Integrar funcionalidad de servicio', 'Una mesa muy estética pero poco funcional produce filas y desorden durante el consumo.', 'Diseñamos flujo de acceso real. Puedes complementar con [guía de baby shower](/blog/mesa-de-dulces-para-baby-shower-guia-completa) y [mesa perfecta para baby shower](/blog/ideas-mesa-dulces-baby-shower-perfecta).'],
      ['Cuidar detalles de ambientación', 'Sin coherencia entre mesa y decoración general, se pierde el efecto de celebración integral.', 'Alineamos fondo, props y señalética con la estética del baby shower para lograr unidad completa.'],
      ['Cerrar con experiencia redonda', 'Si el cierre se improvisa, se pierde impacto de todo el trabajo previo.', 'Planificamos último bloque de servicio y retiro para terminar con la misma calidad del arranque.']
    ],
    alert: 'Una mesa que transforma un baby shower es la que combina emoción visual, fluidez de servicio y continuidad estética.',
    checklist: ['Concepto visual definido', 'Composición con foco principal', 'Surtido balanceado de sabores', 'Flujo de servicio funcional', 'Ambientación integrada', 'Cierre planificado con calidad'],
    cta: ['¿Quieres transformar tu baby shower con una mesa excepcional?', 'Diseñamos mesas en CDMX con estética cuidada y operación profesional para celebraciones inolvidables.', 'Hola! Quiero cotizar una mesa de dulces para transformar mi baby shower en CDMX']
  },
  'src/content/blog/mesa-de-dulces-corporativo-catering-premium-para-eventos-emp-roma.mdx': {
    intro: '**En eventos empresariales premium, la mesa de dulces funciona como un activo de marca y hospitalidad.** En **Mededul** diseñamos catering corporativo en CDMX con ejecución precisa para entornos ejecutivos exigentes.',
    sections: [
      ['Definir estándar premium por tipo de evento', 'Sin criterio de nivel, la propuesta puede verse informal para audiencias ejecutivas.', 'Configuramos servicio premium según formato: lanzamiento, board meeting, networking o congreso.'],
      ['Diseñar identidad visual corporativa elegante', 'Branding excesivo reduce sofisticación y distrae del objetivo de hospitalidad.', 'Aplicamos branding sutil con acabados limpios para reforzar imagen sin saturar el espacio.'],
      ['Planear operación para espacios de alto ritmo', 'En sedes empresariales con agenda cerrada, cualquier demora afecta la experiencia del asistente.', 'Estructuramos montaje y reposición por ventanas operativas cortas para mantener continuidad.'],
      ['Seleccionar surtido con enfoque ejecutivo', 'Menús demasiado infantiles o recargados no conectan con el contexto corporativo premium.', 'Curamos opciones de consumo ágil y perfil sofisticado. Puedes revisar [catering empresarial](/blog/catering-dulces-eventos-empresariales-cdmx) y [mesa corporativa en CDMX](/blog/mesa-dulces-eventos-corporativos-cdmx).'],
      ['Controlar servicio y presentación constante', 'Si la mesa se deteriora visualmente, baja la percepción de calidad de marca.', 'Mantenemos ajustes continuos de alineación, limpieza y reposición para sostener estándar ejecutivo.'],
      ['Cerrar con indicadores de desempeño', 'Sin medición posterior no hay base para optimizar futuras activaciones corporativas.', 'Entregamos hallazgos operativos y de consumo para decisiones más rentables y efectivas.']
    ],
    alert: 'En corporativos premium, la calidad percibida depende de detalles de ejecución visibles minuto a minuto.',
    checklist: ['Nivel premium definido por formato', 'Branding elegante y equilibrado', 'Operación optimizada por agenda', 'Surtido adaptado a público ejecutivo', 'Presentación constante durante servicio', 'Métricas postevento registradas'],
    cta: ['¿Necesitas catering premium para tu evento empresarial?', 'Operamos mesas corporativas en CDMX con enfoque ejecutivo, estética refinada y logística impecable.', 'Hola! Quiero cotizar catering premium de mesa de dulces para evento empresarial en CDMX']
  },
  'src/content/blog/mesa-de-dulces-corporativos-eleva-tus-eventos-empresari-condesa.mdx': {
    intro: '**Una mesa de dulces corporativa bien diseñada eleva percepción de marca, hospitalidad y recordación del evento.** En **Mededul** trabajamos en CDMX con enfoque estratégico para que cada montaje aporte valor real al negocio.',
    sections: [
      ['Traducir objetivo empresarial en diseño de mesa', 'Sin objetivo definido, la mesa se vuelve decorativa y difícil de justificar en presupuesto.', 'Alineamos concepto de servicio con metas de engagement, networking o posicionamiento de marca.'],
      ['Definir experiencia para públicos mixtos', 'En eventos con clientes y colaboradores, una propuesta genérica no satisface expectativas diversas.', 'Segmentamos oferta y dinámica para cubrir perfiles distintos sin perder coherencia estética.'],
      ['Optimizar layout para interacción', 'Una distribución ineficiente limita conversación y reduce uso de la estación.', 'Diseñamos circulación y puntos de acceso que favorecen networking y consumo fluido.'],
      ['Integrar marca con lenguaje visual profesional', 'Si el branding domina la mesa, se percibe promocional y no experiencial.', 'Aplicamos integración sutil. Complementa con [mesa corporativa CDMX](/blog/mesa-dulces-eventos-corporativos-cdmx) y [ROI de eventos corporativos](/blog/roi-mesas-dulces-eventos-corporativos).'],
      ['Coordinar servicio con agenda del evento', 'Sin coordinación horaria, la mesa puede perder su mejor momento de interacción.', 'Sincronizamos operación con agenda oficial para maximizar impacto sin interrupciones.'],
      ['Documentar aprendizajes para próxima edición', 'No registrar resultados impide escalar calidad en futuros eventos.', 'Levantamos insights clave para mejorar surtido, operación y rendimiento en cada nueva activación.']
    ],
    alert: 'La mesa corporativa más efectiva es la que conecta experiencia del invitado con objetivos del negocio.',
    checklist: ['Objetivo empresarial traducido a diseño', 'Experiencia adaptada a público mixto', 'Layout optimizado para interacción', 'Branding integrado con sutileza', 'Servicio sincronizado con agenda', 'Aprendizajes documentados'],
    cta: ['¿Quieres elevar el nivel de tus eventos empresariales?', 'Diseñamos mesas corporativas en CDMX con foco en imagen, experiencia y resultados tangibles.', 'Hola! Quiero cotizar una mesa de dulces corporativa para elevar mis eventos en CDMX']
  },
  'src/content/blog/mesa-de-dulces-corporativos-endulza-tus-eventos-empresariale-sant.mdx': {
    intro: '**Endulzar un evento empresarial no significa improvisar: significa diseñar hospitalidad estratégica.** En **Mededul** creamos mesas corporativas en CDMX que mejoran experiencia del asistente y refuerzan percepción de marca.',
    sections: [
      ['Definir intención de hospitalidad', 'Sin una intención clara, la mesa no aporta a la experiencia general del evento.', 'Establecemos objetivos de recepción, pausa o cierre para que la mesa cumpla una función concreta.'],
      ['Seleccionar surtido alineado al contexto', 'Productos muy pesados o poco prácticos reducen consumo en eventos de ritmo corporativo.', 'Curamos opciones ágiles y equilibradas para mantener energía y satisfacción del público.'],
      ['Diseñar mesa para espacios ejecutivos', 'Montajes recargados pueden chocar con entornos sobrios y de negocio.', 'Aplicamos estética limpia con detalles de marca bien calibrados para una presencia elegante.'],
      ['Coordinar operación con áreas internas', 'Si logística, compras y producción no están alineadas, aparecen retrasos y quiebres de servicio.', 'Trabajamos coordinación interáreas. Puedes complementar con [catering corporativo](/blog/catering-dulces-eventos-empresariales-cdmx) y [eventos corporativos CDMX](/blog/mesa-dulces-eventos-corporativos-cdmx).'],
      ['Mantener reposición sin fricción', 'Una reposición visible y desordenada afecta percepción de profesionalismo.', 'Operamos recargas discretas y periódicas para sostener imagen impecable.'],
      ['Cerrar con evaluación de satisfacción', 'Sin feedback, es difícil saber qué funcionó para asistentes y tomadores de decisión.', 'Recabamos percepción y métricas de consumo para afinar futuras estrategias de hospitalidad.']
    ],
    alert: 'La hospitalidad corporativa bien diseñada impacta directamente en la calidad percibida del evento.',
    checklist: ['Intención de hospitalidad definida', 'Surtido alineado al contexto', 'Diseño apto para entorno ejecutivo', 'Coordinación interáreas asegurada', 'Reposición discreta continua', 'Evaluación de satisfacción registrada'],
    cta: ['¿Quieres endulzar tu evento empresarial con estrategia?', 'Operamos mesas corporativas en CDMX que combinan hospitalidad, estética y eficiencia.', 'Hola! Quiero cotizar una mesa de dulces corporativa para mi evento empresarial en CDMX']
  },
  'src/content/blog/mesa-de-dulces-corporativos-impresiona-en-eventos-empresaria-pola.mdx': {
    intro: '**Impresionar en un evento empresarial exige coherencia entre imagen, servicio y ejecución.** En **Mededul** desarrollamos mesas corporativas en CDMX que proyectan profesionalismo y dejan una impresión sólida en asistentes clave.',
    sections: [
      ['Definir qué significa “impresionar” para tu marca', 'Buscar impacto sin dirección puede llevar a decisiones visuales llamativas pero poco estratégicas.', 'Traducimos expectativas de marca en criterios claros de diseño, servicio y narrativa del montaje.'],
      ['Priorizar calidad percibida sobre volumen', 'Llenar la mesa sin curaduría puede verse abundante, pero no necesariamente premium.', 'Seleccionamos piezas y acabados que transmiten valor desde el primer vistazo y en cada interacción.'],
      ['Diseñar experiencia para momentos de networking', 'Si la mesa no acompaña momentos de conversación, se desaprovecha su potencial de conexión.', 'Ubicamos y operamos la estación para favorecer encuentro entre asistentes y flujo natural del evento.'],
      ['Integrar detalle corporativo con elegancia', 'Exceso de personalización gráfica puede romper sofisticación del entorno empresarial.', 'Aplicamos branding de alto criterio. Revisa también [mesa corporativa especializada](/blog/mesa-dulces-eventos-corporativos-cdmx) y [catering premium corporativo](/blog/mesa-de-dulces-corporativo-catering-premium-para-eventos-emp-roma).'],
      ['Mantener consistencia operativa en picos', 'En horas de mayor tráfico, una mala operación arruina percepción de calidad rápidamente.', 'Definimos protocolo de refuerzo para picos con reposición, limpieza y soporte de atención.'],
      ['Cerrar con huella positiva de marca', 'Sin una salida cuidada, el evento puede terminar sin consolidar el impacto logrado.', 'Cerramos con orden, continuidad visual y evaluación para convertir una buena ejecución en estándar repetible.']
    ],
    alert: 'Impresionar en corporativos no es exagerar el montaje; es sostener calidad visible en cada fase del servicio.',
    checklist: ['Impacto de marca definido con criterios', 'Calidad percibida priorizada', 'Experiencia orientada a networking', 'Branding elegante y funcional', 'Operación sólida en picos', 'Cierre con huella positiva'],
    cta: ['¿Quieres impresionar con una mesa corporativa de alto nivel?', 'Diseñamos experiencias dulces en CDMX para eventos empresariales donde la imagen sí importa.', 'Hola! Quiero cotizar una mesa de dulces corporativa para impresionar en mi evento en CDMX']
  }
};

function splitFrontmatter(raw) {
  if (!raw.startsWith('---\n')) return null;
  const end = raw.indexOf('\n---\n', 4);
  if (end === -1) return null;
  return { fm: raw.slice(0, end + 5) };
}

function renderBody(d) {
  const sections = d.sections
    .map((s, i) => `## ${i + 1}. ${s[0]}\n\n### ❌ El Problema\n\n${s[1]}\n\n### ✅ La Solución Mededul\n\n${s[2]}`)
    .join('\n\n---\n\n');

  return [
    "import AlertBox from '@/components/content/AlertBox.astro';",
    "import InfoCard from '@/components/content/InfoCard.astro';",
    "import CTABox from '@/components/content/CTABox.astro';",
    '',
    d.intro,
    '',
    '---',
    '',
    sections.replace(/(## 3\.[\s\S]*?### ✅ La Solución Mededul\n\n[\s\S]*?)(\n\n---\n\n## 4\.)/, `$1\n\n<AlertBox variant="warning" title="Dato estratégico">\n  ${d.alert}\n</AlertBox>$2`),
    '',
    '---',
    '',
    '<InfoCard title="Checklist Editorial y Operativo" icon="✅" variant="highlight">',
    '',
    `- ✓ ${d.checklist[0]}`,
    `- ✓ ${d.checklist[1]}`,
    `- ✓ ${d.checklist[2]}`,
    `- ✓ ${d.checklist[3]}`,
    `- ✓ ${d.checklist[4]}`,
    `- ✓ ${d.checklist[5]}`,
    '',
    '</InfoCard>',
    '',
    '---',
    '',
    '<CTABox',
    `  title="${d.cta[0]}"`,
    `  description="${d.cta[1]}"`,
    '  buttonText="Cotizar mi Mesa de Dulces"',
    `  buttonUrl="https://wa.me/525525226442?text=${encodeURIComponent(d.cta[2])}"`,
    '  variant="whatsapp"',
    '/>',
    ''
  ].join('\n');
}

for (const [file, data] of Object.entries(BATCH)) {
  const raw = fs.readFileSync(file, 'utf8');
  const parsed = splitFrontmatter(raw);
  if (!parsed) continue;
  fs.writeFileSync(file, `${parsed.fm}${renderBody(data)}`);
}

console.log(`Reescritos ${Object.keys(BATCH).length} artículos (lote 2).`);
