#!/usr/bin/env node
const fs = require('fs');

const BATCH = {
  'src/content/blog/mesa-dulces-bautizo-elegante-cdmx.mdx': {
    intro: '**Un bautizo elegante requiere una mesa de dulces serena, cuidada y perfectamente integrada al ambiente familiar.** En **Mededul** diseñamos propuestas en CDMX que equilibran simbolismo, estética y operación discreta.',
    sections: [
      ['Definir tono ceremonial del montaje', 'Sin un tono claro, la mesa puede sentirse demasiado festiva o demasiado neutra para la ocasión.', 'Construimos una propuesta visual sobria con acentos delicados para respetar el carácter del bautizo.'],
      ['Seleccionar paleta suave y coherente', 'Paletas recargadas pueden romper la atmósfera espiritual y elegante del evento.', 'Trabajamos tonos suaves con un acento refinado para mantener armonía en iglesia o salón.'],
      ['Elegir dulces con presentación limpia', 'Productos muy llamativos o de difícil consumo desvían foco y complican servicio.', 'Curamos piezas de fácil consumo y acabados finos que aportan elegancia sin exceso.'],
      ['Integrar mesa con liturgia y recepción', 'Si no hay coordinación de tiempos, la mesa puede abrirse en un momento inadecuado.', 'Alineamos apertura y atención con protocolo. Puedes complementar con [bautizos y comuniones](/blog/candy-bar-bautizo-celeste-cruz-macarons) y [mesa de dulces tradicionales](/blog/mesa-dulces-mexicanos-tradicionales-eventos).'],
      ['Cuidar señalización y experiencia familiar', 'Sin orden visual y etiquetas claras, se pierde comodidad para invitados y familiares mayores.', 'Aplicamos señalética discreta y layout accesible para una experiencia fluida y cómoda.'],
      ['Cerrar con desmontaje discreto', 'Un cierre abrupto rompe el tono de una celebración íntima y religiosa.', 'Ejecutamos desmontaje ordenado y silencioso para proteger la experiencia hasta el final.']
    ],
    alert: 'En bautizos, la elegancia se expresa en sobriedad visual y ejecución silenciosa.',
    checklist: ['Tono ceremonial definido', 'Paleta suave y coherente', 'Dulces de presentación limpia', 'Timing coordinado con protocolo', 'Experiencia familiar accesible', 'Desmontaje discreto'],
    cta: ['¿Quieres una mesa elegante para bautizo en CDMX?', 'Diseñamos montajes delicados y profesionales para bautizos con estética refinada y operación impecable.', 'Hola! Quiero cotizar una mesa de dulces elegante para bautizo en CDMX']
  },
  'src/content/blog/mesa-dulces-boda-cdmx-elegancia-y-estilo.mdx': {
    intro: '**Una mesa de boda elegante no depende de cantidad, sino de decisiones precisas de estilo y ejecución.** En **Mededul** diseñamos en CDMX propuestas que elevan la experiencia visual de la boda con sofisticación sostenida.',
    sections: [
      ['Definir una identidad estética clara', 'Sin identidad visual, la mesa puede verse correcta pero sin carácter propio.', 'Traducimos el estilo de la pareja en una dirección estética consistente y memorable.'],
      ['Seleccionar materiales con lenguaje premium', 'Materiales poco coherentes reducen percepción de calidad incluso con buen producto.', 'Combinamos texturas y acabados que comunican elegancia desde el primer vistazo.'],
      ['Diseñar composición con ritmo visual', 'Montajes planos o saturados impiden lectura visual y bajan sofisticación.', 'Organizamos alturas y vacíos estratégicos para una composición equilibrada y fotogénica.'],
      ['Alinear mesa con diseño general de boda', 'Si la mesa no conversa con flores e iluminación, se percibe como elemento aislado.', 'Integramos propuesta al universo visual completo. Complementa con [colores para boda](/blog/como-elegir-colores-mesa-dulces-boda) y [errores comunes en boda](/blog/errores-comunes-mesa-dulces-boda).'],
      ['Sostener imagen durante todo el servicio', 'La calidad percibida cae cuando la mesa se desordena a mitad del evento.', 'Aplicamos reposición estética y control continuo para mantener nivel premium de inicio a cierre.'],
      ['Cerrar con protocolo de lujo discreto', 'Un cierre desordenado puede dañar la percepción final del evento.', 'Ejecutamos desmontaje limpio y reservado para cuidar la experiencia hasta el último minuto.']
    ],
    alert: 'La elegancia real en bodas se mantiene cuando el diseño sigue impecable durante todo el evento.',
    checklist: ['Identidad estética definida', 'Materiales premium seleccionados', 'Composición con ritmo visual', 'Integración total con diseño de boda', 'Imagen sostenida durante servicio', 'Cierre discreto de lujo'],
    cta: ['¿Buscas una mesa de boda con auténtica elegancia?', 'Diseñamos mesas de dulces en CDMX con estética refinada y ejecución impecable para bodas de alto nivel.', 'Hola! Quiero cotizar una mesa de dulces elegante para mi boda en CDMX']
  },
  'src/content/blog/mesa-dulces-boda-intima-pequena.mdx': {
    intro: '**Una boda íntima exige una mesa de dulces pensada para cercanía, calidez y detalle.** En **Mededul** diseñamos en CDMX propuestas pequeñas en escala, pero grandes en intención estética y emocional.',
    sections: [
      ['Aprovechar el formato íntimo como ventaja', 'Tratar una boda pequeña como versión reducida de una boda masiva resta personalidad.', 'Diseñamos una propuesta hecha a medida para la experiencia cercana de los invitados.'],
      ['Curar pocas piezas de alto impacto', 'Llenar de variedad innecesaria puede romper el equilibrio de un evento pequeño.', 'Priorizamos selección breve, elegante y deliciosa para una experiencia concentrada y memorable.'],
      ['Diseñar una mesa proporcional al espacio', 'Montajes sobredimensionados pueden invadir espacios y romper armonía del venue.', 'Ajustamos dimensiones y layout para una integración natural con el entorno íntimo.'],
      ['Coordinar servicio con dinámica de convivencia', 'Sin coordinación, la mesa puede interrumpir momentos de conversación y cercanía.', 'Sincronizamos servicio con la narrativa social. Puedes complementar con [boda en jardín](/blog/mesa-dulces-boda-jardin-exterior) y [guía completa de bodas](/blog/mesa-dulces-bodas-guia-completa).'],
      ['Potenciar experiencia sensorial', 'En eventos pequeños, cualquier desequilibrio de sabor o presentación se nota más.', 'Trabajamos contraste de texturas y perfiles de sabor para una experiencia cuidada en cada pieza.'],
      ['Cerrar sin perder calidez', 'Un desmontaje brusco rompe el cierre emocional de una boda íntima.', 'Aplicamos un cierre suave y ordenado para preservar la atmósfera cercana del evento.']
    ],
    alert: 'En bodas íntimas, cada detalle pesa más: diseño y operación deben sentirse personales y precisos.',
    checklist: ['Enfoque íntimo aprovechado', 'Selección curada de piezas', 'Mesa proporcional al espacio', 'Servicio alineado a convivencia', 'Experiencia sensorial equilibrada', 'Cierre cálido y ordenado'],
    cta: ['¿Planeas una boda íntima con estilo impecable?', 'Creamos mesas de dulces en CDMX para bodas pequeñas con diseño sensible y ejecución profesional.', 'Hola! Quiero cotizar una mesa de dulces para boda íntima en CDMX']
  },
  'src/content/blog/mesa-dulces-boda-jardin-exterior.mdx': {
    intro: '**Una boda en jardín tiene retos técnicos específicos que la mesa de dulces debe resolver desde la planeación.** En **Mededul** diseñamos en CDMX montajes exteriores resistentes, elegantes y visualmente consistentes.',
    sections: [
      ['Evaluar clima y exposición solar', 'Ignorar condiciones de temperatura y humedad puede arruinar producto y presentación.', 'Seleccionamos productos y materiales adecuados para exterior con margen de seguridad operativo.'],
      ['Elegir estructura estable para terreno real', 'Superficies irregulares o viento afectan estabilidad del montaje en exteriores.', 'Diseñamos base y soportes seguros para mantener integridad visual y funcional durante el evento.'],
      ['Curar surtido resistente al ambiente', 'Algunos postres delicados no soportan tiempos largos en jardín.', 'Priorizamos opciones de buena estabilidad térmica sin sacrificar estética premium.'],
      ['Definir ubicación estratégica en el jardín', 'Una mala ubicación puede exponer la mesa al sol directo o bloquear circulación de invitados.', 'Analizamos orientación y flujo. Complementa con [boda elegante en CDMX](/blog/mesa-dulces-boda-cdmx-elegancia-y-estilo) y [errores en boda](/blog/errores-comunes-mesa-dulces-boda).'],
      ['Operar reposición con protección', 'Reposición sin cobertura ni control degrada apariencia en poco tiempo.', 'Implementamos reposición por lotes protegidos para sostener frescura y volumen visual.'],
      ['Activar plan B por clima', 'Sin contingencia por lluvia o viento, un cambio de clima compromete toda la operación.', 'Preparamos alternativa de reubicación y protocolo rápido para mantener servicio continuo.']
    ],
    alert: 'En bodas de jardín, la previsión climática es parte del diseño, no un agregado de último momento.',
    checklist: ['Clima y exposición evaluados', 'Estructura estable definida', 'Surtido resistente seleccionado', 'Ubicación estratégica validada', 'Reposición protegida activa', 'Plan B por clima preparado'],
    cta: ['¿Quieres una mesa perfecta para boda en jardín?', 'Diseñamos mesas exteriores en CDMX con estética elegante y operación robusta frente al clima.', 'Hola! Quiero cotizar una mesa de dulces para boda en jardín en CDMX']
  },
  'src/content/blog/mesa-dulces-bodas-exclusivas-cdmx.mdx': {
    intro: '**En bodas exclusivas, la mesa de dulces debe comportarse como una pieza de alta producción, no como un extra decorativo.** En **Mededul** trabajamos en CDMX montajes premium para Polanco, Lomas y Santa Fe con estándar de lujo real.',
    sections: [
      ['Definir nivel de exclusividad esperado', 'Sin criterios claros de lujo, la propuesta puede quedar ambigua o inconsistente.', 'Aterrizamos nivel de exclusividad en materiales, producto, servicio y control visual.'],
      ['Diseñar curaduría premium de producto', 'Un surtido sin curaduría técnica baja percepción de sofisticación.', 'Seleccionamos piezas premium por acabado, sabor y estabilidad para una experiencia de alto nivel.'],
      ['Construir puesta en escena editorial', 'Sin dirección escénica, la mesa no alcanza impacto en bodas de alta producción.', 'Componemos montaje con narrativa visual, profundidad y focales de alto valor fotográfico.'],
      ['Alinear mesa con producción integral', 'Si la mesa no se integra a floristería e iluminación, rompe continuidad de la boda.', 'Coordinamos con proveedores clave. Revisa [bodas exclusivas guía](/blog/elegancia-dulce-mesas-bodas-exclusivas-cdmx) y [mesas de lujo](/blog/mesas-dulces-exclusivas-arte-sofisticacion-bodas).'],
      ['Operar servicio ultra discreto', 'Intervenciones visibles del staff afectan atmósfera de exclusividad.', 'Aplicamos servicio silencioso con reposición invisible para sostener experiencia premium.'],
      ['Proteger experiencia ante contingencias', 'En bodas de alto nivel, cualquier falla visible tiene costo reputacional alto.', 'Activamos protocolos de contingencia y respaldo para resolver incidencias sin fricción.']
    ],
    alert: 'Exclusividad no es exceso: es coherencia estética y operativa sostenida sin interrupciones.',
    checklist: ['Nivel de lujo definido', 'Curaduría premium seleccionada', 'Puesta en escena editorial diseñada', 'Integración con producción total', 'Servicio discreto activo', 'Contingencias cubiertas'],
    cta: ['¿Buscas una mesa de dulces exclusiva para tu boda?', 'Creamos montajes premium en CDMX para bodas de alto nivel con ejecución impecable.', 'Hola! Quiero cotizar una mesa de dulces exclusiva para boda en CDMX']
  },
  'src/content/blog/mesa-dulces-bodas-guia-completa.mdx': {
    intro: '**Esta guía completa para mesas de boda está pensada para tomar decisiones correctas desde la planeación inicial.** En **Mededul** aplicamos en CDMX una metodología práctica para diseño, operación y control de calidad.',
    sections: [
      ['Diagnosticar contexto de la boda', 'Sin diagnóstico de estilo, aforo y venue, la mesa se diseña sobre supuestos.', 'Levantamos información clave para construir una propuesta viable y coherente con el evento.'],
      ['Definir paleta, materiales y estilo', 'Elegir recursos visuales sin método genera montajes incoherentes o saturados.', 'Estructuramos dirección estética con jerarquía clara de color y acabados.'],
      ['Planear surtido según tipo de invitados', 'Sin estrategia de consumo, algunos productos sobran y otros se agotan temprano.', 'Balanceamos surtido por perfiles de invitado y momentos de consumo.'],
      ['Diseñar logística de montaje y servicio', 'Una mesa bien diseñada puede fallar si logística y tiempos no están controlados.', 'Planificamos operación completa. Complementa con [errores de boda](/blog/errores-comunes-mesa-dulces-boda) y [mesa elegante de boda](/blog/mesa-dulces-boda-cdmx-elegancia-y-estilo).'],
      ['Implementar control de calidad continuo', 'Sin supervisión durante la fiesta, la mesa pierde forma y coherencia visual.', 'Aplicamos rondas de ajuste para sostener calidad en cada fase del evento.'],
      ['Cerrar con evaluación para mejora', 'No medir desempeño impide optimizar próximas celebraciones.', 'Documentamos consumos, tiempos y hallazgos para decisiones más precisas en futuras bodas.']
    ],
    alert: 'Una guía de boda efectiva debe cubrir diseño, logística y control de calidad con el mismo nivel de detalle.',
    checklist: ['Diagnóstico inicial realizado', 'Dirección estética definida', 'Surtido por perfiles de invitados', 'Logística completa planificada', 'Control de calidad activo', 'Evaluación final documentada'],
    cta: ['¿Quieres aplicar esta guía completa en tu boda?', 'Te ayudamos a diseñar y operar una mesa de dulces en CDMX con estándar profesional.', 'Hola! Quiero cotizar una mesa de dulces para boda con guía completa en CDMX']
  },
  'src/content/blog/mesa-dulces-conferencias-congresos.mdx': {
    intro: '**En conferencias y congresos, la mesa de dulces debe funcionar como un punto de energía y networking sin fricción operativa.** En **Mededul** diseñamos en CDMX propuestas corporativas de alto flujo con imagen profesional.',
    sections: [
      ['Diseñar servicio para volumen alto', 'Una mesa pensada para eventos pequeños colapsa en aforos masivos de congreso.', 'Dimensionamos surtido y operación por picos horarios de asistencia para sostener flujo continuo.'],
      ['Ubicar estaciones en nodos estratégicos', 'Ubicación incorrecta genera aglomeraciones y frena movilidad en pasillos clave.', 'Distribuimos estaciones por zonas de tránsito para reducir filas y mejorar accesibilidad.'],
      ['Seleccionar productos de consumo ágil', 'Opciones complejas ralentizan el servicio en pausas cortas de agenda.', 'Curamos formatos rápidos y limpios, adecuados para recesos corporativos.'],
      ['Alinear servicio con agenda oficial', 'Sin cronograma sincronizado, la mesa puede abrir fuera del momento de mayor impacto.', 'Coordinamos operación por bloque horario. Puedes complementar con [eventos corporativos CDMX](/blog/mesa-dulces-eventos-corporativos-cdmx) y [catering empresarial](/blog/catering-dulces-eventos-empresariales-cdmx).'],
      ['Mantener imagen ejecutiva constante', 'Si la mesa pierde orden visual, afecta percepción de profesionalismo del evento.', 'Aplicamos mantenimiento continuo de presentación y limpieza para sostener estándar ejecutivo.'],
      ['Cerrar con datos de desempeño', 'Sin datos de consumo por franja, no hay base para optimizar futuras ediciones.', 'Registramos métricas operativas para mejorar eficiencia y experiencia en próximos congresos.']
    ],
    alert: 'En congresos, una mesa eficiente es la que sostiene flujo alto sin sacrificar imagen ejecutiva.',
    checklist: ['Servicio dimensionado para aforo', 'Ubicación estratégica validada', 'Productos de consumo ágil curados', 'Agenda y servicio sincronizados', 'Imagen ejecutiva sostenida', 'Métricas postevento registradas'],
    cta: ['¿Necesitas una mesa eficiente para conferencia o congreso?', 'Operamos mesas corporativas en CDMX con logística de alto flujo y estándar profesional.', 'Hola! Quiero cotizar una mesa de dulces para conferencia o congreso en CDMX']
  },
  'src/content/blog/mesa-dulces-cumpleanos-infantil-ideas.mdx': {
    intro: '**Las mejores ideas para cumpleaños infantil son las que entusiasman a los niños y simplifican la experiencia para adultos.** En **Mededul** transformamos ideas en montajes viables en CDMX con creatividad y control operativo.',
    sections: [
      ['Seleccionar ideas según edad y tema', 'Ideas genéricas no siempre conectan con el rango de edad del festejado y sus invitados.', 'Filtramos propuestas por edad, temática y estilo para una experiencia más relevante.'],
      ['Convertir ideas en layout funcional', 'Una idea bonita puede fallar si no se traduce bien en distribución de mesa.', 'Diseñamos layout práctico para que la creatividad se mantenga usable durante toda la fiesta.'],
      ['Equilibrar dulce, color y seguridad', 'Exceso de estímulos visuales y productos no aptos complica consumo infantil.', 'Combinamos estética divertida con selección segura y porciones manejables.'],
      ['Coordinar ideas con dinámica del evento', 'Sin coordinación con show o juegos, la mesa pierde protagonismo en momentos clave.', 'Alineamos servicio con actividad infantil. Revisa [cumpleaños infantil en CDMX](/blog/mesa-de-dulces-cumpleanos-infantil-en-cdmx) y [magia en fiestas infantiles](/blog/magia-de-mesas-dulces-en-fiestas-infantiles-condesa).'],
      ['Sostener impacto visual durante consumo', 'Si no hay reposición estructurada, la mesa pierde atractivo muy rápido.', 'Definimos recargas por módulos para mantener imagen vibrante y ordenada.'],
      ['Cerrar con experiencia positiva familiar', 'Un final desordenado reduce la percepción general del evento.', 'Planificamos desmontaje limpio y cierre amable para familias y venue.']
    ],
    alert: 'Las ideas infantiles más efectivas son las que combinan creatividad con una operación fácil de sostener.',
    checklist: ['Ideas filtradas por edad y tema', 'Layout funcional diseñado', 'Seguridad y color equilibrados', 'Servicio coordinado con dinámica', 'Impacto visual sostenido', 'Cierre familiar ordenado'],
    cta: ['¿Buscas ideas infantiles que sí funcionen en la práctica?', 'Diseñamos mesas para cumpleaños en CDMX con creatividad real y ejecución impecable.', 'Hola! Quiero cotizar una mesa de cumpleaños infantil con ideas creativas en CDMX']
  },
  'src/content/blog/mesa-dulces-estaciones-interactivas-gourmet-transforma-tu-evento.mdx': {
    intro: '**Las estaciones interactivas gourmet transforman un evento cuando están diseñadas para sorprender y operar sin fricción.** En **Mededul** creamos en CDMX experiencias sensoriales que combinan show, servicio y control técnico.',
    sections: [
      ['Definir transformación que buscas en el evento', 'Sin objetivo claro, la estación puede verse atractiva pero no cambiar la experiencia global.', 'Alineamos la estación al resultado buscado: engagement, diferenciación o experiencia premium.'],
      ['Elegir formato interactivo adecuado', 'No toda estación funciona igual para todos los tipos de evento y público.', 'Seleccionamos formato según perfil de asistentes y ritmo esperado de interacción.'],
      ['Diseñar experiencia sensorial completa', 'Si solo se prioriza lo visual, la experiencia se vuelve superficial y poco memorable.', 'Integramos sabor, textura, aroma e interacción para una propuesta multisensorial real.'],
      ['Integrar estación a la narrativa del evento', 'Una estación aislada del concepto general pierde potencia transformadora.', 'Conectamos diseño y narrativa. Puedes complementar con [estaciones gourmet](/blog/estaciones-interactivas-gourmet-para-eventos-exquisitos) y [fuentes de chocolate](/blog/guia-completa-fuentes-chocolate-eventos-cdmx).'],
      ['Operar alto rendimiento en picos', 'Sin control de picos, la interacción se vuelve lenta y frustrante.', 'Establecemos flujo por tandas y refuerzo operativo para sostener servicio premium.'],
      ['Medir impacto de la transformación', 'Sin medición, no se puede saber si la estación realmente elevó el evento.', 'Registramos indicadores de uso y percepción para validar impacto y optimizar próximas ediciones.']
    ],
    alert: 'Una estación transforma el evento cuando logra impacto sensorial y operación fluida al mismo tiempo.',
    checklist: ['Objetivo de transformación definido', 'Formato interactivo correcto', 'Experiencia sensorial diseñada', 'Integración narrativa lograda', 'Rendimiento en picos controlado', 'Impacto medido y documentado'],
    cta: ['¿Quieres transformar tu evento con estaciones gourmet?', 'Diseñamos experiencias interactivas en CDMX con alto impacto y ejecución técnica impecable.', 'Hola! Quiero cotizar estaciones interactivas gourmet para transformar mi evento en CDMX']
  },
  'src/content/blog/mesa-dulces-eventos-corporativos-cdmx.mdx': {
    intro: '**Una mesa de dulces corporativa bien ejecutada mejora experiencia del asistente y fortalece la imagen de tu empresa.** En **Mededul** diseñamos en CDMX propuestas para eventos empresariales con foco en eficiencia, branding y calidad constante.',
    sections: [
      ['Definir objetivo corporativo del servicio', 'Sin objetivo claro, la mesa se percibe como gasto accesorio y no como herramienta de experiencia.', 'Traducimos metas de negocio en diseño de servicio y métricas de desempeño.'],
      ['Alinear propuesta con identidad de marca', 'Branding sin criterio visual puede verse invasivo o poco profesional.', 'Aplicamos identidad de marca con equilibrio estético para reforzar percepción positiva.'],
      ['Optimizar operación por tipo de evento', 'Conferencias, lanzamientos y celebraciones internas requieren dinámicas distintas.', 'Adaptamos formato y logística según contexto para asegurar funcionalidad y experiencia.'],
      ['Diseñar servicio para networking', 'Una mesa mal ubicada desaprovecha su potencial como punto de interacción.', 'Ubicamos y operamos para favorecer conversaciones. Puedes complementar con [conferencias y congresos](/blog/mesa-dulces-conferencias-congresos) y [catering empresarial](/blog/catering-dulces-eventos-empresariales-cdmx).'],
      ['Mantener estándar visual continuo', 'Si la mesa pierde presentación, cae percepción de profesionalismo corporativo.', 'Controlamos reposición y limpieza para sostener imagen ejecutiva durante todo el evento.'],
      ['Cerrar con análisis de resultados', 'Sin evaluación posterior, es difícil justificar mejoras o escalar calidad en siguientes eventos.', 'Entregamos datos y recomendaciones para optimizar retorno en próximas activaciones.']
    ],
    alert: 'En corporativos, la mesa de dulces funciona mejor cuando se diseña como parte de la estrategia de experiencia.',
    checklist: ['Objetivo corporativo definido', 'Branding alineado con criterio', 'Formato adaptado al evento', 'Servicio orientado a networking', 'Estándar visual sostenido', 'Resultados analizados'],
    cta: ['¿Quieres una mesa corporativa con resultados reales?', 'Diseñamos y operamos mesas para eventos empresariales en CDMX con enfoque estratégico y ejecución profesional.', 'Hola! Quiero cotizar una mesa de dulces para evento corporativo en CDMX']
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

console.log(`Reescritos ${Object.keys(BATCH).length} artículos (lote 4).`);
