#!/usr/bin/env node
const fs = require('fs');

const BATCH = {
  'src/content/blog/mesas-dulces-cuspide-lujo-celebraciones.mdx': {
    intro: '**Elegir qué dulces incluir según el tipo de evento evita desperdicio y mejora experiencia de invitados.** En **Mededul** aplicamos en CDMX una metodología práctica para construir surtidos inteligentes y visualmente poderosos.',
    sections: [
      ['Definir tipo de evento y perfil de consumo','Un surtido genérico no responde igual en boda, corporativo o infantil.','Segmentamos la selección por formato de evento, horario y perfil de invitados.'],
      ['Equilibrar variedad y coherencia visual','Demasiada variedad puede romper estética y complicar reposición.','Curamos opciones por familias de sabor y color para mantener orden y atractivo.'],
      ['Distribuir proporciones por categorías','Sin proporciones claras sobran ciertos dulces y faltan los más demandados.','Asignamos porcentajes por tipo de producto según comportamiento esperado de consumo.'],
      ['Alinear surtido con logística real','Un menú ambicioso sin operación adecuada termina deteriorándose en servicio.','Diseñamos surtido en función de montaje y reposición. Puedes complementar con [guía de bodas](/blog/mesa-dulces-bodas-guia-completa) y [eventos corporativos](/blog/mesa-dulces-eventos-corporativos-cdmx).'],
      ['Ajustar por restricciones alimentarias','Ignorar restricciones reduce satisfacción y puede generar incidencias evitables.','Incluimos opciones inclusivas con señalización clara para consumo seguro.'],
      ['Optimizar después del evento','Sin análisis de consumo, se repiten errores de surtido en siguientes eventos.','Documentamos salidas por categoría para mejorar decisiones futuras.']
    ],
    alert: 'Una mesa bien surtida no es la que tiene más piezas, sino la que tiene la mezcla correcta para ese evento.',
    checklist: ['Tipo de evento definido', 'Variedad visual controlada', 'Proporciones por categoría', 'Logística alineada al surtido', 'Opciones inclusivas consideradas', 'Optimización postevento'],
    cta: ['¿Quieres definir el surtido ideal para tu evento?', 'Diseñamos mesas en CDMX con selección estratégica de dulces y ejecución impecable.', 'Hola! Quiero cotizar una mesa de dulces con surtido ideal para mi evento en CDMX']
  },
  'src/content/blog/mesas-dulces-exclusivas-arte-sofisticacion-bodas.mdx': {
    intro: '**El venue define gran parte de las decisiones de una mesa de boda exclusiva.** En **Mededul** adaptamos en CDMX cada propuesta al espacio real para lograr sofisticación sin comprometer operación.',
    sections: [
      ['Leer condiciones del venue antes de diseñar','Diseñar sin considerar espacio, luz y flujo produce montajes incongruentes.','Hacemos diagnóstico técnico del venue para definir escala, estilo y logística correctos.'],
      ['Ajustar montaje al tipo de espacio','Un diseño pensado para salón cerrado puede fallar en jardín o hacienda abierta.','Adaptamos estructura visual y selección de piezas al comportamiento del entorno.'],
      ['Controlar proporción mesa-ambiente','Mesas sobredimensionadas invaden el espacio; subdimensionadas se pierden visualmente.','Calculamos proporciones para que la mesa se vea protagonista sin romper armonía.'],
      ['Integrar mesa al diseño nupcial general','Si no dialoga con floristería e iluminación, se percibe aislada del evento.','Coordinamos con producción global. Revisa [bodas exclusivas CDMX](/blog/mesa-dulces-bodas-exclusivas-cdmx) y [lujo y singularidad](/blog/mesas-de-dulces-elegancia-y-singularidad-en-bodas-de-lujo).'],
      ['Operar con protocolo según venue','Cada venue tiene reglas de acceso y tiempos distintos que pueden afectar servicio.','Definimos un protocolo operativo específico para cada espacio y su normativa.'],
      ['Blindar contingencias por ubicación','Sin plan de contingencia, cualquier limitación del lugar puede comprometer resultado.','Activamos alternativas de layout y servicio según condiciones del venue.']
    ],
    alert: 'En bodas exclusivas, el mismo diseño no funciona igual en todos los venues: la adaptación técnica es clave.',
    checklist: ['Diagnóstico técnico del venue', 'Montaje adaptado al espacio', 'Proporción mesa-ambiente correcta', 'Integración con diseño global', 'Protocolo operativo por venue', 'Contingencias por ubicación cubiertas'],
    cta: ['¿Quieres una mesa exclusiva adaptada a tu venue?', 'Diseñamos mesas de boda en CDMX con sofisticación editorial y ejecución técnica por tipo de espacio.', 'Hola! Quiero cotizar una mesa de dulces exclusiva para boda según mi venue en CDMX']
  },
  'src/content/blog/mesas-dulces-exclusivas-eventos-corporativos.mdx': {
    intro: '**Cada formato corporativo exige una mesa distinta para generar impacto real.** En **Mededul** diseñamos en CDMX propuestas exclusivas según tipo de evento empresarial y objetivo de negocio.',
    sections: [
      ['Identificar el formato corporativo','No es lo mismo diseñar para congreso, lanzamiento o evento interno.','Clasificamos el evento para definir experiencia y nivel de servicio adecuado.'],
      ['Ajustar estilo al objetivo de marca','Un diseño genérico puede no reflejar el posicionamiento de la empresa.','Traducimos valores de marca en una propuesta visual corporativa consistente.'],
      ['Dimensionar operación por aforo','Sin dimensionamiento por formato, se generan cuellos de botella y percepción negativa.','Planificamos capacidad y reposición según densidad de asistentes y agenda.'],
      ['Personalizar sin perder sobriedad','Exceso de branding visual puede restar elegancia en entornos ejecutivos.','Aplicamos personalización sutil. Complementa con [ROI corporativo](/blog/roi-mesas-dulces-eventos-corporativos) y [eventos corporativos CDMX](/blog/mesa-dulces-eventos-corporativos-cdmx).'],
      ['Medir interacción por formato','Sin métricas por tipo de evento no se optimizan futuras activaciones.','Registramos comportamiento y consumo para ajustar la estrategia.'],
      ['Estandarizar aprendizaje','Si no se sistematiza, cada evento comienza desde cero.','Convertimos resultados en lineamientos replicables para próximas ejecuciones.']
    ],
    alert: 'La exclusividad corporativa se construye cuando diseño y operación responden al tipo exacto de evento.',
    checklist: ['Formato corporativo identificado', 'Estilo alineado a marca', 'Operación dimensionada por aforo', 'Personalización sobria', 'Interacción medida por formato', 'Aprendizajes estandarizados'],
    cta: ['¿Necesitas una mesa corporativa exclusiva y estratégica?', 'Diseñamos propuestas en CDMX por tipo de evento empresarial con resultados medibles.', 'Hola! Quiero cotizar una mesa exclusiva para evento corporativo en CDMX']
  },
  'src/content/blog/mesas-dulces-magia-distincion-fiestas-infantiles.mdx': {
    intro: '**La edad del niño cambia por completo la forma correcta de diseñar y operar una mesa infantil.** En **Mededul** aplicamos en CDMX criterios por rango de edad para fiestas más seguras, divertidas y efectivas.',
    sections: [
      ['Segmentar por etapas de edad','Una mesa igual para 1-12 años pierde precisión y puede generar riesgos.','Dividimos propuesta por etapas para ajustar formato, altura y productos.'],
      ['Adaptar porciones y texturas','Sin ajuste de texturas, algunos dulces no son adecuados para todos los niños.','Seleccionamos piezas aptas por edad con foco en consumo seguro.'],
      ['Diseñar interacción apropiada','Dinámicas muy complejas aburren a pequeños y simples para mayores no enganchan.','Definimos interacción según nivel de desarrollo y atención del grupo.'],
      ['Alinear mesa con temática infantil','Sin coherencia temática, la experiencia pierde magia y recordación.','Construimos narrativa visual por edad. Revisa [cumpleaños infantil ideas](/blog/mesa-dulces-cumpleanos-infantil-ideas) y [guía infantil completa](/blog/mesa-de-dulces-infantil-guia-completa-para-fiestas-magi-polanco).'],
      ['Operar con control parental','Sin gestión de flujo, se generan aglomeraciones en momentos de alta emoción.','Organizamos acceso y reposición para convivencia segura y ordenada.'],
      ['Evaluar respuesta por grupo etario','Sin análisis por edad, se repiten errores de surtido y dinámica.','Registramos aceptación por rango para mejorar futuras fiestas infantiles.']
    ],
    alert: 'En fiestas infantiles, diseñar por edad es la forma más efectiva de elevar seguridad y disfrute.',
    checklist: ['Segmentación por edad aplicada', 'Porciones/texturas adaptadas', 'Interacción adecuada al grupo', 'Temática coherente', 'Flujo con control parental', 'Evaluación por grupo etario'],
    cta: ['¿Quieres una mesa infantil diseñada según edad?', 'Creamos mesas en CDMX con magia, seguridad y estrategia para cada etapa infantil.', 'Hola! Quiero cotizar una mesa infantil segmentada por edad en CDMX']
  },
  'src/content/blog/mesas-dulces-toque-lujo-bodas-exclusivas.mdx': {
    intro: '**El presupuesto de una mesa de boda no debe ser una cifra aislada, sino una estrategia de inversión visual y operativa.** En **Mededul** estructuramos en CDMX costos de forma transparente para bodas exclusivas.',
    sections: [
      ['Separar presupuesto por rubros','Un monto único sin desglose impide tomar buenas decisiones.','Dividimos en producto, montaje, operación y contingencia para control real.'],
      ['Definir prioridades de lujo','Invertir en todo por igual diluye impacto del presupuesto.','Priorizamos elementos que más elevan percepción de exclusividad.'],
      ['Calcular costo por invitado estratégico','Sin costo por invitado no se ajusta bien al aforo real de la boda.','Proyectamos inversión por rango de asistentes para optimizar retorno visual.'],
      ['Alinear presupuesto con venue y producción','Si el presupuesto no considera condiciones del venue, aparecen sobrecostos.','Integramos costos al contexto total del evento. Complementa con [guía de bodas](/blog/mesa-dulces-bodas-guia-completa) y [presupuesto de XV](/blog/presupuesto-mesa-dulces-quinceanera).'],
      ['Evitar recortes de alto impacto negativo','Recortar rubros críticos puede afectar toda la experiencia de servicio.','Identificamos qué se puede optimizar sin comprometer estándar premium.'],
      ['Validar presupuesto con plan de contingencia','Sin reserva para imprevistos, pequeños cambios generan desbalance financiero.','Incluimos margen controlado para resolver incidencias sin estrés.']
    ],
    alert: 'El lujo sostenible en bodas se logra con presupuesto inteligente, no solo con gasto elevado.',
    checklist: ['Desglose por rubros', 'Prioridades de lujo definidas', 'Costo por invitado calculado', 'Presupuesto alineado a venue', 'Recortes críticos evitados', 'Contingencia financiera incluida'],
    cta: ['¿Quieres planear tu presupuesto de boda con enfoque premium?', 'Te ayudamos a diseñar una mesa exclusiva en CDMX con inversión estratégica y ejecución impecable.', 'Hola! Quiero cotizar una mesa de boda con presupuesto estratégico en CDMX']
  },
  'src/content/blog/mesas-dulces-xv-anos-alta-sociedad-cdmx.mdx': {
    intro: '**Un checklist bien diseñado evita omisiones críticas en una mesa de XV años de alto nivel.** En **Mededul** usamos en CDMX listas de control por fases para garantizar resultados consistentes.',
    sections: [
      ['Crear checklist por fases del proyecto','Un checklist único y genérico no cubre planeación, montaje y servicio con precisión.','Dividimos control en preevento, evento y cierre para no omitir detalles críticos.'],
      ['Verificar dirección estética','Sin validación visual previa se detectan errores demasiado tarde.','Confirmamos paleta, focales y materiales con revisión anticipada.'],
      ['Controlar logística y proveedores','Una falla de coordinación puede afectar toda la producción en minutos.','Integramos checklist de tiempos, accesos y responsables por área.'],
      ['Validar operación en vivo','Sin control durante servicio, la mesa pierde calidad a media fiesta.','Aplicamos chequeos en tiempo real. Puedes complementar con [presupuesto XV](/blog/presupuesto-mesa-dulces-quinceanera) y [errores en XV](/blog/errores-comunes-mesa-dulces-xv-anos).'],
      ['Incluir checklist de contingencias','Sin plan de respuesta, cualquier imprevisto escala rápido.','Definimos protocolos de reacción por escenario crítico.'],
      ['Cerrar con checklist postevento','Sin cierre documentado no hay mejora continua para futuras celebraciones.','Registramos hallazgos y acciones para elevar el siguiente evento.']
    ],
    alert: 'En XV años de alto nivel, el checklist es una herramienta de control de calidad, no solo una lista de tareas.',
    checklist: ['Checklist por fases creado', 'Dirección estética validada', 'Logística/proveedores coordinados', 'Control en vivo activo', 'Contingencias definidas', 'Cierre postevento documentado'],
    cta: ['¿Quieres ejecutar tu mesa de XV con control total?', 'Aplicamos checklists profesionales en CDMX para asegurar una celebración impecable.', 'Hola! Quiero cotizar una mesa de XV años con checklist profesional en CDMX']
  },
  'src/content/blog/presupuesto-mesa-dulces-quinceanera.mdx': {
    intro: '**El presupuesto de una mesa de XV años debe ayudarte a priorizar, no solo a recortar.** En **Mededul** diseñamos en CDMX presupuestos claros para equilibrar impacto visual, operación y rentabilidad familiar.',
    sections: [
      ['Definir presupuesto objetivo realista','Arrancar sin cifra marco genera decisiones impulsivas y costos ocultos.','Establecemos un rango realista según aforo, estilo y expectativas del evento.'],
      ['Desglosar costos en componentes','Sin desglose, es imposible saber dónde optimizar sin afectar calidad.','Separar costos por producto, montaje, servicio y extras permite control efectivo.'],
      ['Priorizar rubros de mayor impacto','Gastar en elementos de bajo impacto reduce resultado visual final.','Priorizamos inversión en rubros que más elevan experiencia y percepción.'],
      ['Calcular escenarios de inversión','Un solo escenario limita capacidad de ajuste frente a cambios de último minuto.','Construimos escenarios base, recomendado y premium. Revisa [checklist XV](/blog/mesas-dulces-xv-anos-alta-sociedad-cdmx) y [guía completa XV](/blog/mesa-de-dulces-para-xv-anos-guia-completa).'],
      ['Prevenir sobrecostos frecuentes','No prever traslados, tiempos extra o reposición genera desviaciones relevantes.','Incluimos costos operativos clave desde la planeación inicial.'],
      ['Cerrar con control presupuestal final','Sin cierre financiero, no hay claridad sobre eficiencia de la inversión.','Documentamos ejecución real vs presupuesto para aprendizaje y mejora.']
    ],
    alert: 'Un buen presupuesto en XV años equilibra deseo estético con control financiero y operativo.',
    checklist: ['Rango presupuestal definido', 'Costos desglosados', 'Rubros prioritarios identificados', 'Escenarios de inversión creados', 'Sobrecostos prevenidos', 'Cierre presupuestal documentado'],
    cta: ['¿Quieres planear tu presupuesto de XV sin errores?', 'Te ayudamos a estructurar en CDMX una inversión inteligente para tu mesa de dulces.', 'Hola! Quiero cotizar una mesa de XV años con presupuesto bien planificado en CDMX']
  },
  'src/content/blog/roi-mesas-dulces-eventos-corporativos.mdx': {
    intro: '**Medir ROI en mesas corporativas permite pasar de decisiones intuitivas a estrategia basada en datos.** En **Mededul** implementamos en CDMX indicadores simples y accionables para evaluar impacto real.',
    sections: [
      ['Definir qué significa ROI para tu empresa','Sin definición clara, no se puede evaluar éxito de la activación.','Aterrizamos ROI en objetivos concretos: engagement, percepción de marca o retención.'],
      ['Seleccionar métricas medibles','Medir todo sin foco genera ruido y poca claridad para decisiones.','Priorizamos métricas clave de consumo, interacción y satisfacción.'],
      ['Relacionar costo con resultados observables','Sin vincular inversión y resultado, ROI queda en opinión subjetiva.','Cruzar costos por rubro con resultados permite lectura objetiva del desempeño.'],
      ['Comparar formatos de evento','No todos los eventos corporativos generan el mismo retorno con la misma mesa.','Analizamos por formato. Complementa con [mesas corporativas por tipo](/blog/mesas-dulces-exclusivas-eventos-corporativos) y [eventos corporativos CDMX](/blog/mesa-dulces-eventos-corporativos-cdmx).'],
      ['Construir tablero de mejora continua','Sin histórico, se repiten decisiones sin aprendizaje acumulado.','Creamos tablero simple para iterar mes a mes con evidencia.'],
      ['Comunicar ROI a dirección','Si el resultado no se comunica bien, se pierde apoyo para siguientes activaciones.','Presentamos hallazgos en lenguaje ejecutivo para facilitar decisiones de inversión.']
    ],
    alert: 'El ROI corporativo mejora cuando las métricas se diseñan desde la planeación, no al final del evento.',
    checklist: ['ROI definido por objetivo', 'Métricas clave seleccionadas', 'Costo vs resultado vinculado', 'Comparación por formato realizada', 'Tablero de mejora creado', 'Reporte ejecutivo entregado'],
    cta: ['¿Quieres medir el ROI de tu mesa corporativa?', 'Te ayudamos a diseñar y evaluar en CDMX activaciones dulces con métricas claras y decisiones basadas en datos.', 'Hola! Quiero cotizar y medir ROI de una mesa de dulces corporativa en CDMX']
  },
  'src/content/blog/tendencias-candy-bar-bodas-2025.mdx': {
    intro: '**Las tendencias de candy bar para bodas deben traducirse a decisiones aplicables en eventos reales.** En **Mededul** seleccionamos en CDMX tendencias que elevan la boda sin sacrificar operación ni elegancia.',
    sections: [
      ['Filtrar tendencias por estilo de boda','Aplicar tendencias sin contexto puede romper la coherencia del evento.','Elegimos tendencias compatibles con la identidad de la boda y su venue.'],
      ['Evaluar impacto visual vs funcionalidad','No toda tendencia fotogénica funciona bien en servicio real.','Priorizamos tendencias que mantengan experiencia estética y operativa.'],
      ['Adoptar materiales y acabados actuales','Tendencias mal ejecutadas en materiales pueden verse forzadas o poco premium.','Integramos acabados contemporáneos con criterio de calidad y durabilidad.'],
      ['Actualizar paletas con equilibrio','Cambiar toda la paleta por moda puede perder personalidad de la pareja.','Aplicamos tendencias cromáticas como acentos. Complementa con [colores para boda](/blog/como-elegir-colores-mesa-dulces-boda) y [tendencias generales 2025](/blog/tendencias-mesas-dulces-2025-cdmx).'],
      ['Medir recepción de invitados','Sin feedback, no sabes qué tendencia realmente funcionó en tu audiencia.','Recabamos percepción para validar qué innovaciones conservar.'],
      ['Mantener atemporalidad en el resultado','Seguir solo modas puede envejecer rápido la mesa en fotos y memoria.','Combinamos tendencia con base atemporal para un resultado duradero.']
    ],
    alert: 'La mejor tendencia de bodas es la que se adapta a tu estilo y se ejecuta con precisión.',
    checklist: ['Tendencias filtradas por estilo', 'Impacto y funcionalidad evaluados', 'Materiales actuales seleccionados', 'Paleta actualizada con equilibrio', 'Recepción de invitados medida', 'Atemporalidad preservada'],
    cta: ['¿Quieres aplicar tendencias de boda sin errores?', 'Diseñamos candy bars en CDMX con innovación inteligente y ejecución impecable.', 'Hola! Quiero cotizar un candy bar de boda con tendencias 2025 en CDMX']
  },
  'src/content/blog/tendencias-mesa-dulces-xv-anos-2025.mdx': {
    intro: '**Las tendencias de mesas de XV años evolucionan rápido, pero solo algunas elevan realmente la experiencia.** En **Mededul** aplicamos en CDMX tendencias 2025 con criterio estético y operativo.',
    sections: [
      ['Identificar tendencias con mayor vigencia','Seguir modas efímeras puede generar decisiones que envejecen en semanas.','Seleccionamos tendencias con permanencia visual y buena adaptabilidad.'],
      ['Alinear tendencia con estilo personal','Tendencia sin identidad propia produce una mesa bonita pero impersonal.','Personalizamos cada tendencia a la narrativa de la festejada.'],
      ['Integrar innovación en montaje','Innovar solo en color sin cambiar composición limita impacto real.','Combinamos tendencias de forma, altura y materiales para una puesta actual.'],
      ['Coordinar tendencia con experiencia social','Si no se piensa en foto/video y flujo, la tendencia pierde fuerza en ejecución.','Diseñamos para contenido y consumo. Complementa con [ideas y tendencias XV](/blog/mesa-dulces-xv-anos-ideas-tendencias) y [guía completa XV](/blog/mesa-de-dulces-para-xv-anos-guia-completa).'],
      ['Controlar costo de innovación','Innovar sin control puede elevar costos sin beneficio proporcional.','Evaluamos costo-beneficio de cada tendencia antes de implementarla.'],
      ['Documentar qué tendencias funcionaron','Sin registro, no hay base para repetir aciertos y descartar fallas.','Cerramos con evaluación para mejorar próximas propuestas de XV.']
    ],
    alert: 'En XV años, la tendencia correcta es la que se siente actual y al mismo tiempo personal.',
    checklist: ['Tendencias vigentes seleccionadas', 'Adaptación al estilo personal', 'Innovación en montaje aplicada', 'Experiencia social integrada', 'Costo de innovación controlado', 'Resultados documentados'],
    cta: ['¿Quieres una mesa XV con tendencias 2025 bien aplicadas?', 'Diseñamos propuestas en CDMX actuales, funcionales y personalizadas para quinceañeras.', 'Hola! Quiero cotizar una mesa de XV años con tendencias 2025 en CDMX']
  },
  'src/content/blog/tendencias-mesas-dulces-2025-cdmx.mdx': {
    intro: '**Conocer tendencias generales de mesas de dulces 2025 es útil solo si sabes cómo aplicarlas en tu contexto.** En **Mededul** traducimos en CDMX lo nuevo del sector en decisiones ejecutables para distintos tipos de evento.',
    sections: [
      ['Mapear tendencias transversales del año','Sin mapa claro, se mezclan modas aisladas y se pierde dirección estratégica.','Organizamos tendencias por diseño, producto, servicio y experiencia.'],
      ['Adaptar tendencias a cada categoría de evento','La misma tendencia no funciona igual en boda, corporativo o infantil.','Aplicamos criterios de adaptación por categoría para mantener pertinencia.'],
      ['Equilibrar innovación con operatividad','Innovar sin evaluar logística provoca fallas en montaje y servicio.','Seleccionamos tendencias que sostienen ejecución estable durante todo el evento.'],
      ['Integrar sostenibilidad y eficiencia','Muchas tendencias 2025 incorporan sostenibilidad, pero mal ejecutada puede verse forzada.','Implementamos prácticas sostenibles funcionales. Revisa [tendencias bodas 2025](/blog/tendencias-candy-bar-bodas-2025) y [tendencias XV 2025](/blog/tendencias-mesa-dulces-xv-anos-2025).'],
      ['Medir adopción real por audiencia','No toda tendencia gusta igual a todos los perfiles de invitados.','Validamos recepción para decidir qué mantener en siguientes eventos.'],
      ['Construir una línea propia de tendencia','Copiar todo el mercado elimina diferenciación de marca y propuesta.','Usamos tendencias como base para crear una firma visual propia.']
    ],
    alert: 'Las tendencias 2025 aportan valor cuando se convierten en sistema de decisiones, no en listas de inspiración.',
    checklist: ['Mapa de tendencias definido', 'Adaptación por categoría de evento', 'Innovación operativamente viable', 'Sostenibilidad aplicada con criterio', 'Adopción por audiencia medida', 'Línea propia de tendencia construida'],
    cta: ['¿Quieres aplicar tendencias 2025 con visión estratégica?', 'Te ayudamos en CDMX a transformar tendencias en mesas de dulces funcionales y memorables.', 'Hola! Quiero cotizar una mesa de dulces con tendencias 2025 en CDMX']
  }
};

function splitFrontmatter(raw) {
  if (!raw.startsWith('---\n')) return null;
  const end = raw.indexOf('\n---\n', 4);
  if (end === -1) return null;
  return { fm: raw.slice(0, end + 5) };
}

function renderBody(d) {
  const sections = d.sections.map((s, i) => `## ${i + 1}. ${s[0]}\n\n### ❌ El Problema\n\n${s[1]}\n\n### ✅ La Solución Mededul\n\n${s[2]}`).join('\n\n---\n\n');
  return [
    "import AlertBox from '@/components/content/AlertBox.astro';",
    "import InfoCard from '@/components/content/InfoCard.astro';",
    "import CTABox from '@/components/content/CTABox.astro';",
    '',
    d.intro,
    '',
    '---',
    '',
    sections.replace(/(## 3\.[\s\S]*?### ✅ La Solución Mededul\n\n[\s\S]*?)(\n\n---\n\n## 4\.)/, `$1\n\n<AlertBox variant=\"warning\" title=\"Dato estratégico\">\n  ${d.alert}\n</AlertBox>$2`),
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

console.log(`Reescritos ${Object.keys(BATCH).length} artículos (lote 6).`);
