#!/usr/bin/env node
const fs = require('fs');

const BATCH = {
  'src/content/blog/mesa-de-dulces-cumpleanos-infantil-en-cdmx.mdx': {
    intro: '**Un cumpleaños infantil exitoso necesita una mesa de dulces que soporte ritmo, emoción y orden al mismo tiempo.** En **Mededul** diseñamos en CDMX propuestas que encantan a niños y simplifican la operación para familias y organizadores.',
    sections: [
      ['Definir experiencia infantil según edad', 'Cuando no se distingue edad de invitados, la mesa pierde impacto o se vuelve poco funcional.', 'Segmentamos diseño y producto por rangos de edad para asegurar interacción y consumo adecuados.'],
      ['Seleccionar formatos de alto flujo', 'Dulces grandes o complicados ralentizan servicio y aumentan desperdicio.', 'Priorizamos porciones prácticas que permiten rotación rápida sin perder estética.'],
      ['Diseñar una mesa visualmente narrativa', 'Sin narrativa temática, la mesa se percibe genérica aunque tenga variedad.', 'Construimos una historia visual con personajes, color y focales claros para potenciar recuerdo.'],
      ['Sincronizar mesa con juegos y show', 'Si el servicio compite con animación, se dispersa atención y baja disfrute global.', 'Programamos aperturas por bloque. Puedes complementar con [ideas infantiles](/blog/mesa-dulces-cumpleanos-infantil-ideas) y [fiestas mágicas](/blog/mesa-de-dulces-infantil-guia-completa-para-fiestas-magi-polanco).'],
      ['Gestionar reposición en tiempo real', 'Una mesa vacía a mitad de fiesta rompe percepción de calidad y abundancia.', 'Operamos reposición por fases para mantener volumen y variedad en los momentos de mayor demanda.'],
      ['Cerrar con protocolo higiénico', 'Sin cierre ordenado, el final del evento deja una impresión descuidada.', 'Aplicamos desmontaje limpio y clasificación de sobrantes para cerrar con estándar profesional.']
    ],
    alert: 'En cumpleaños infantiles, la mejor mesa es la que combina diversión visual con operación fluida y segura.',
    checklist: ['Segmentación por edad definida', 'Porciones prácticas seleccionadas', 'Narrativa temática construida', 'Servicio coordinado con animación', 'Reposición por fases activa', 'Cierre higiénico protocolizado'],
    cta: ['¿Quieres una mesa infantil que funcione de verdad?', 'Diseñamos mesas para cumpleaños en CDMX con creatividad, seguridad y logística impecable.', 'Hola! Quiero cotizar una mesa de dulces para cumpleaños infantil en CDMX']
  },
  'src/content/blog/mesa-de-dulces-infantil-guia-completa-para-fiestas-magi-polanco.mdx': {
    intro: '**Esta guía está pensada para quienes quieren una mesa infantil bien hecha desde la planeación, no solo decorada al final.** En **Mededul** aplicamos en CDMX una metodología clara para lograr fiestas mágicas con orden real.',
    sections: [
      ['Iniciar con un brief de fiesta infantil', 'Sin brief, la mesa se define por intuición y aparecen ajustes de último minuto.', 'Reunimos objetivo, edad, temática y presupuesto para diseñar una propuesta sin improvisaciones.'],
      ['Definir estructura de montaje por niveles', 'Montar todo a una misma altura resta impacto visual y dificulta acceso de los niños.', 'Organizamos niveles por seguridad, alcance y fotografía para una experiencia integral.'],
      ['Construir surtido por equilibrio', 'Cuando predomina un solo tipo de dulce, baja la participación y variedad de consumo.', 'Diseñamos surtido mixto: piezas suaves, crujientes y frutales para mantener interés en toda la fiesta.'],
      ['Asegurar circulación y accesibilidad', 'Una mesa sin espacio de circulación genera empujones y esperas en eventos infantiles.', 'Definimos layout accesible con flujo claro. Puedes revisar [cumpleaños infantil en CDMX](/blog/mesa-de-dulces-cumpleanos-infantil-en-cdmx) y [magia infantil en fiestas](/blog/magia-de-mesas-dulces-en-fiestas-infantiles-condesa).'],
      ['Planear operación durante el evento', 'Sin operador responsable, la mesa pierde orden visual rápidamente.', 'Asignamos control de reposición y limpieza para sostener calidad durante toda la celebración.'],
      ['Evaluar para próximas fiestas', 'No documentar aprendizajes obliga a repetir errores en futuros eventos infantiles.', 'Cerramos con notas de consumo y logística para escalar calidad en siguientes celebraciones.']
    ],
    alert: 'Una guía infantil útil no se queda en ideas; debe traducirse en decisiones operativas concretas.',
    checklist: ['Brief inicial completo', 'Montaje por niveles definido', 'Surtido balanceado diseñado', 'Flujo accesible validado', 'Operación activa durante evento', 'Aprendizajes documentados'],
    cta: ['¿Quieres aplicar una guía profesional a tu fiesta infantil?', 'Te ayudamos a diseñar y operar una mesa mágica en CDMX con resultados medibles.', 'Hola! Quiero cotizar una mesa infantil con guía profesional en CDMX']
  },
  'src/content/blog/mesa-de-dulces-infantil-un-sueno-hecho-realidad-interlomas.mdx': {
    intro: '**Cuando una mesa infantil está bien diseñada, los niños la viven como parte del juego y los adultos la perciben como producción cuidada.** En **Mededul** transformamos esa expectativa en realidad con ejecución precisa en CDMX.',
    sections: [
      ['Traducir el “sueño” a un concepto viable', 'Las ideas aspiracionales sin aterrizaje técnico terminan en montajes incompletos.', 'Convertimos inspiración en un plan ejecutable con prioridades visuales y operativas.'],
      ['Elegir piezas con alto impacto emocional', 'Un surtido sin intención puede verse correcto pero no memorable para los niños.', 'Seleccionamos piezas ícono que conecten con el tema y generen emoción inmediata.'],
      ['Diseñar fondos y props con criterio', 'Exceso de decoración puede tapar dulces y saturar la experiencia visual.', 'Usamos fondos estratégicos que enmarcan la mesa sin competir con el producto principal.'],
      ['Integrar mesa al guion de fiesta', 'Si la mesa no entra en el ritmo del evento, pierde protagonismo y efecto wow.', 'Sincronizamos momentos clave y foto social. Puedes complementar con [guía infantil completa](/blog/mesa-de-dulces-infantil-guia-completa-para-fiestas-magi-polanco) y [celebraciones infantiles de ensueño](/blog/celebraciones-infantiles-ensueno-cdmx).'],
      ['Cuidar detalle de experiencia familiar', 'Pensar solo en niños deja fuera comodidad y expectativas de padres e invitados adultos.', 'Incluimos zonas y productos pensados para convivencia familiar completa.'],
      ['Sostener calidad hasta el final', 'Muchas mesas pierden forma a media fiesta por falta de mantenimiento visual.', 'Ejecutamos microajustes permanentes para que la mesa cierre con la misma calidad del inicio.']
    ],
    alert: 'Convertir una mesa infantil en experiencia de ensueño depende de diseño emocional y disciplina operativa.',
    checklist: ['Concepto aterrizado técnicamente', 'Piezas de alto impacto seleccionadas', 'Fondos y props equilibrados', 'Integración con guion de fiesta', 'Experiencia familiar considerada', 'Calidad sostenida hasta cierre'],
    cta: ['¿Quieres una mesa infantil de ensueño para tu próxima fiesta?', 'Diseñamos propuestas en CDMX que combinan emoción, estética y operación impecable.', 'Hola! Quiero cotizar una mesa infantil de ensueño en CDMX']
  },
  'src/content/blog/mesa-de-dulces-para-baby-shower-guia-completa.mdx': {
    intro: '**Esta guía completa de baby shower está diseñada para que tomes decisiones correctas desde la primera reunión.** En **Mededul** usamos en CDMX un enfoque práctico que combina ternura visual con logística clara.',
    sections: [
      ['Definir objetivo y estilo del baby shower', 'Sin objetivo, la mesa se llena de ideas inconexas y pierde intención.', 'Partimos de estilo emocional, número de invitados y formato del evento para construir una base sólida.'],
      ['Elegir paleta y materiales coherentes', 'Paletas sin jerarquía generan ruido visual y restan delicadeza.', 'Aplicamos color dominante y acentos suaves con materiales compatibles para mantener armonía.'],
      ['Diseñar menú de dulces por funcionalidad', 'Postres complejos o poco prácticos bajan ritmo de consumo y elevan desperdicio.', 'Seleccionamos productos fáciles de servir, con buena presentación y rotación estable.'],
      ['Planear montaje y flujo de invitados', 'Un montaje sin flujo claro crea aglomeraciones en momentos clave.', 'Diseñamos layout accesible. Puedes complementar con [ideas perfectas de baby shower](/blog/ideas-mesa-dulces-baby-shower-perfecta) y [magia en cada dulce](/blog/mesa-de-dulces-para-baby-shower-magia-en-cada-dulce-interlomas).'],
      ['Calcular cantidades de forma precisa', 'La falta de cálculo impacta presupuesto y continuidad visual de la mesa.', 'Proyectamos porciones por perfil y duración para evitar faltantes o exceso innecesario.'],
      ['Cerrar con checklist final', 'Sin verificación final, pequeños errores afectan una celebración emocionalmente importante.', 'Validamos montaje, señalización y operación antes de abrir servicio para un resultado impecable.']
    ],
    alert: 'Una guía de baby shower útil debe ayudarte a ejecutar, no solo a inspirarte.',
    checklist: ['Objetivo del evento definido', 'Paleta y materiales coherentes', 'Menú funcional seleccionado', 'Flujo de invitados planificado', 'Cantidades calculadas con precisión', 'Checklist final validado'],
    cta: ['¿Quieres aplicar esta guía completa en tu baby shower?', 'Te acompañamos en CDMX con diseño y operación profesional para una celebración sin errores.', 'Hola! Quiero cotizar una mesa de dulces para baby shower con guía completa en CDMX']
  },
  'src/content/blog/mesa-de-dulces-para-baby-shower-magia-en-cada-dulce-interlomas.mdx': {
    intro: '**Un baby shower se vuelve especial cuando cada detalle de la mesa transmite emoción y cuidado.** En **Mededul** diseñamos en CDMX propuestas donde cada dulce aporta a una experiencia cálida y memorable.',
    sections: [
      ['Diseñar una propuesta con sensibilidad', 'Montajes sin intención emocional pueden verse correctos, pero no conectar con los invitados.', 'Trabajamos narrativa visual y selección de piezas para construir una experiencia afectiva y elegante.'],
      ['Cuidar microdetalles de presentación', 'Ignorar pequeños detalles de acabado reduce percepción general de calidad.', 'Elevamos la mesa con detalles finos en etiquetas, alturas y distribución para un acabado premium.'],
      ['Seleccionar dulces con identidad', 'Un surtido genérico no deja huella ni diferencia la celebración.', 'Elegimos piezas con carácter visual y sabor equilibrado para reforzar estilo del evento.'],
      ['Integrar la mesa al espacio del evento', 'Si la mesa no dialoga con el lugar, pierde presencia y cohesión estética.', 'Adaptamos composición al venue. Revisa también [guía completa baby shower](/blog/mesa-de-dulces-para-baby-shower-guia-completa) y [ideas creativas](/blog/mesa-dulces-baby-shower-ideas-creativas).'],
      ['Mantener abundancia visual real', 'Una mesa que se vacía rápido rompe magia y percepción de preparación.', 'Aplicamos reposición estratégica para sostener plenitud visual durante toda la celebración.'],
      ['Cerrar con experiencia emotiva', 'Sin una salida cuidada, el último recuerdo puede ser operativo y no emocional.', 'Diseñamos cierre armónico para que la experiencia termine con la misma calidez con que empezó.']
    ],
    alert: 'La magia en baby shower se construye con detalles consistentes, no con excesos visuales.',
    checklist: ['Narrativa emocional definida', 'Microdetalles de presentación cuidados', 'Surtido con identidad propia', 'Montaje adaptado al espacio', 'Abundancia visual sostenida', 'Cierre emotivo planificado'],
    cta: ['¿Quieres magia real en tu mesa de baby shower?', 'Creamos experiencias dulces en CDMX con diseño emocional y ejecución profesional.', 'Hola! Quiero cotizar una mesa de baby shower con magia en cada dulce en CDMX']
  },
  'src/content/blog/mesa-de-dulces-para-bodas-endulza-tu-dia-perfecto-cdmx.mdx': {
    intro: '**En una boda, la mesa de dulces debe acompañar el estilo del evento y reforzar la experiencia de los invitados.** En **Mededul** diseñamos en CDMX propuestas que combinan elegancia, timing y servicio continuo.',
    sections: [
      ['Definir propósito de la mesa en la boda', 'Sin propósito claro, la mesa puede quedar decorativa pero subutilizada.', 'Alineamos la mesa con momentos sociales y objetivos de hospitalidad para que tenga función estratégica.'],
      ['Diseñar estética coherente con la boda', 'Una mesa con estilo ajeno al concepto del evento rompe armonía visual.', 'Construimos diseño en línea con flores, mobiliario y atmósfera general de la boda.'],
      ['Seleccionar surtido para invitados diversos', 'Si el surtido no contempla perfiles distintos, baja satisfacción y consumo.', 'Curamos mezcla equilibrada para distintos gustos y horarios de consumo.'],
      ['Coordinar montaje con venue y timeline', 'Sin coordinación operativa, aparecen retrasos y conflictos en momentos clave.', 'Planificamos ingreso, montaje y apertura con precisión. Puedes complementar con [colores para boda](/blog/como-elegir-colores-mesa-dulces-boda) y [errores comunes en boda](/blog/errores-comunes-mesa-dulces-boda).'],
      ['Sostener presentación durante la fiesta', 'Una mesa que se desordena rápido da sensación de improvisación.', 'Implementamos reposición y cuidado visual permanente para mantener nivel premium.'],
      ['Cerrar con operación discreta', 'Un desmontaje invasivo puede romper la atmósfera en fase final del evento.', 'Ejecutamos cierre discreto y ordenado para proteger experiencia hasta el último momento.']
    ],
    alert: 'En bodas, la mesa ideal es la que se integra al evento y mantiene calidad visual durante toda la noche.',
    checklist: ['Propósito estratégico definido', 'Estética alineada a la boda', 'Surtido para públicos diversos', 'Montaje coordinado con timeline', 'Presentación sostenida', 'Cierre discreto y profesional'],
    cta: ['¿Quieres una mesa de boda que realmente eleve tu celebración?', 'Diseñamos mesas de dulces en CDMX con elegancia, logística impecable y servicio continuo.', 'Hola! Quiero cotizar una mesa de dulces para boda en CDMX']
  },
  'src/content/blog/mesa-de-dulces-para-xv-anos-guia-completa-para-una-cele-pedregal.mdx': {
    intro: '**Esta guía de XV años está enfocada en convertir una gran idea en una mesa ejecutable y visualmente potente.** En **Mededul** diseñamos en CDMX con método para que la producción se vea impecable y funcione toda la noche.',
    sections: [
      ['Definir dirección creativa de la mesa', 'Sin dirección creativa, la mesa se llena de elementos sin relación entre sí.', 'Partimos de estilo de la festejada y guion del evento para crear una línea visual consistente.'],
      ['Planear volumen de producto por fases', 'Subestimar consumo en picos genera faltantes justo en momentos de mayor exposición.', 'Calculamos volumen por fase de fiesta para asegurar continuidad visual y de servicio.'],
      ['Diseñar puntos focales para foto social', 'Sin focales claros, la mesa pierde presencia en contenido de invitados y producción.', 'Componemos elementos hero y alturas estratégicas para alto rendimiento fotográfico.'],
      ['Alinear mesa con show y protocolo', 'Si la mesa no respeta timing del programa, compite con momentos principales del evento.', 'Sincronizamos operación con cronograma. Puedes revisar [experiencias inolvidables de XV](/blog/experiencias-dulces-inolvidables-quinceaneras) y [tendencias de XV años](/blog/tendencias-mesa-dulces-xv-anos-2025).'],
      ['Controlar estética en reposición', 'Cada reposición desalineada reduce calidad visual y coherencia de montaje.', 'Estandarizamos reposiciones para mantener composición uniforme durante toda la noche.'],
      ['Preparar contingencias de producción', 'Sin plan de contingencia, cualquier ajuste de venue o clima compromete resultado final.', 'Definimos alternativas de ubicación y soporte para resolver imprevistos con rapidez.']
    ],
    alert: 'Una guía de XV años profesional debe proteger tanto el impacto visual como la estabilidad operativa.',
    checklist: ['Dirección creativa definida', 'Volumen por fases calculado', 'Puntos focales fotográficos diseñados', 'Operación alineada al protocolo', 'Reposición estética estandarizada', 'Contingencias de producción listas'],
    cta: ['¿Quieres aplicar una guía profesional en tu mesa de XV años?', 'Te ayudamos a diseñar y operar una mesa impecable en CDMX con enfoque visual y técnico.', 'Hola! Quiero cotizar una mesa de dulces para XV años con guía profesional en CDMX']
  },
  'src/content/blog/mesa-de-dulces-para-xv-anos-guia-completa.mdx': {
    intro: '**Si buscas una guía integral para mesa de XV años, el enfoque correcto combina estética, logística y experiencia de invitado.** En **Mededul** aplicamos este modelo en CDMX para lograr resultados consistentes y memorables.',
    sections: [
      ['Diagnosticar contexto del evento', 'Sin diagnóstico de venue, aforo y estilo, la propuesta se arma sobre supuestos.', 'Levantamos datos clave para diseñar una mesa realista y alineada a condiciones del evento.'],
      ['Definir paleta y materiales principales', 'Elegir materiales sin criterio técnico puede afectar estabilidad y apariencia.', 'Seleccionamos acabados compatibles con iluminación, temperatura y tipo de montaje.'],
      ['Armar surtido con estrategia de consumo', 'Sin estrategia de consumo, algunos productos se agotan mientras otros no rotan.', 'Balanceamos surtido por preferencia y practicidad para sostener ritmo de servicio.'],
      ['Diseñar layout y accesos','Un layout mal resuelto crea aglomeraciones y complica operación en momentos críticos.','Proyectamos accesos y zonas de servicio. Puedes complementar con [guía extendida de XV](/blog/mesa-de-dulces-para-xv-anos-guia-completa-para-una-cele-pedregal) y [errores comunes en XV](/blog/errores-comunes-mesa-dulces-xv-anos).'],
      ['Operar con control visual continuo', 'Sin supervisión activa, la mesa pierde orden estético a mitad de la fiesta.', 'Aplicamos rondas de ajuste para mantener composición y limpieza en todo momento.'],
      ['Cerrar con evaluación técnica', 'No evaluar desempeño limita mejoras en futuros eventos.', 'Documentamos datos de consumo, flujo y operación para iterar con evidencia.']
    ],
    alert: 'Una guía integral de XV años debe ayudarte a tomar decisiones medibles, no solo estéticas.',
    checklist: ['Diagnóstico del evento realizado', 'Paleta y materiales validados', 'Surtido con estrategia de consumo', 'Layout y accesos optimizados', 'Control visual continuo activo', 'Evaluación técnica final registrada'],
    cta: ['¿Quieres una mesa de XV años planificada de forma integral?', 'Diseñamos y operamos en CDMX mesas con enfoque estratégico para resultados de alto nivel.', 'Hola! Quiero cotizar una mesa de dulces para XV años con enfoque integral en CDMX']
  },
  'src/content/blog/mesa-de-dulces-xv-anos-crea-una-celebracion-inolvidable-santa-fe.mdx': {
    intro: '**Crear una celebración inolvidable en XV años requiere una mesa que aporte emoción, estilo y ritmo social.** En **Mededul** desarrollamos en CDMX montajes que se convierten en punto de referencia de toda la fiesta.',
    sections: [
      ['Diseñar para generar “momento wow”', 'Sin un elemento diferenciador, la mesa se diluye dentro de la producción general.', 'Creamos un punto de impacto principal que ordena el resto de la composición visual.'],
      ['Combinar estética juvenil y elegancia', 'Extremos demasiado infantiles o demasiado sobrios rompen conexión con la festejada.', 'Equilibramos lenguaje juvenil con acabados sofisticados para un resultado contemporáneo.'],
      ['Activar interacción de invitados', 'Si la mesa es solo decorativa, pierde capacidad de dinamizar la fiesta.', 'Diseñamos consumo e interacción para convertir la estación en punto social activo.'],
      ['Sincronizar con contenido social', 'No pensar en foto y video limita recordación y alcance del evento en redes.', 'Optimizar ángulos y fondo mejora resultados. Revisa [experiencias inolvidables XV](/blog/experiencias-dulces-inolvidables-quinceaneras) y [mesa XV guía completa](/blog/mesa-de-dulces-para-xv-anos-guia-completa).'],
      ['Mantener energía visual durante horas', 'El montaje puede perder fuerza visual si no se cuida la reposición.', 'Programamos ajustes para conservar densidad y armonía hasta cierre de evento.'],
      ['Cerrar con impacto positivo final', 'Sin un final cuidado, el recuerdo del montaje se desvanece rápidamente.', 'Diseñamos cierre ordenado para que la experiencia termine con el mismo nivel de impacto.']
    ],
    alert: 'Una celebración inolvidable se logra cuando el montaje mantiene impacto desde apertura hasta el cierre.',
    checklist: ['Momento wow definido', 'Estética juvenil-elegante equilibrada', 'Interacción social activada', 'Diseño optimizado para contenido', 'Energía visual sostenida', 'Cierre con impacto final'],
    cta: ['¿Quieres una mesa de XV años que marque la fiesta?', 'Creamos propuestas en CDMX con alto impacto visual y operación impecable para celebraciones memorables.', 'Hola! Quiero cotizar una mesa de XV años para una celebración inolvidable en CDMX']
  },
  'src/content/blog/mesa-dulces-baby-shower-ideas-creativas.mdx': {
    intro: '**Las ideas creativas funcionan cuando se aterrizan en una mesa que sí puede montarse y operarse bien.** En **Mededul** transformamos inspiración en propuestas viables en CDMX con identidad propia y resultados consistentes.',
    sections: [
      ['Filtrar ideas por viabilidad real', 'Copiar propuestas complejas sin evaluar espacio y tiempo produce montajes incompletos.', 'Seleccionamos ideas creativas que se adaptan al venue, presupuesto y logística del evento.'],
      ['Construir un concepto creativo coherente', 'Mezclar varias ideas fuertes sin criterio provoca saturación visual.', 'Unificamos la creatividad bajo un concepto principal para mantener claridad estética.'],
      ['Innovar en presentación sin perder funcionalidad', 'La creatividad extrema puede dificultar acceso y consumo de invitados.', 'Diseñamos recursos visuales innovadores que mantienen flujo práctico de servicio.'],
      ['Alinear creatividad con emoción del evento', 'Una mesa muy “de diseño” puede desconectarse del tono íntimo del baby shower.', 'Ajustamos creatividad al tono emocional. Complementa con [guía completa baby shower](/blog/mesa-de-dulces-para-baby-shower-guia-completa) y [mesa perfecta para baby shower](/blog/ideas-mesa-dulces-baby-shower-perfecta).'],
      ['Planear reposición sin romper diseño', 'La reposición improvisada altera composición y reduce el efecto creativo inicial.', 'Preparamos reposiciones por módulos visuales para mantener diseño intacto durante el evento.'],
      ['Cerrar con consistencia estética', 'Si el cierre no se cuida, la propuesta creativa pierde fuerza en su tramo final.', 'Aplicamos protocolo de cierre visual para sostener coherencia hasta desmontaje.']
    ],
    alert: 'La creatividad más efectiva es la que se mantiene bella y funcional durante toda la celebración.',
    checklist: ['Ideas filtradas por viabilidad', 'Concepto creativo unificado', 'Presentación innovadora funcional', 'Creatividad alineada a emoción', 'Reposición modular planificada', 'Cierre estético consistente'],
    cta: ['¿Quieres ideas creativas que sí funcionen en tu baby shower?', 'Diseñamos mesas en CDMX que combinan creatividad real, emoción y operación impecable.', 'Hola! Quiero cotizar una mesa creativa para baby shower en CDMX']
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

console.log(`Reescritos ${Object.keys(BATCH).length} artículos (lote 3).`);
