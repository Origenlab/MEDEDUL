const CTA_BY_CATEGORY: Record<string, string> = {
  'bodas': 'Dulces para bodas',
  'xv-anos': 'Dulces para XV anos',
  'baby-shower': 'Dulces para baby shower',
  'bautizos': 'Dulces para bautizos',
  'corporativos': 'Dulces para empresas',
  'fiestas-infantiles': 'Dulces para fiestas',
  'infantiles': 'Dulces para fiestas',
  'graduaciones': 'Dulces para graduaciones',
  'despedidas-soltero': 'Dulces para despedidas',
  'tips-consejos': 'Tips de mesas de dulces',
  'tendencias': 'Tendencias de candy bar',
  'estaciones': 'Estaciones interactivas'
};

export function getBlogCardCta(category: string, title = ''): string {
  const normalizedTitle = title.toLowerCase();

  if (normalizedTitle.includes('boda')) return 'Mesas de dulces para bodas';
  if (normalizedTitle.includes('xv') || normalizedTitle.includes('quince')) return 'Dulces para XV anos';
  if (normalizedTitle.includes('baby')) return 'Dulces para baby shower';
  if (normalizedTitle.includes('bautizo')) return 'Dulces para bautizos';
  if (normalizedTitle.includes('corporat') || normalizedTitle.includes('empresa')) return 'Dulces para empresas';
  if (normalizedTitle.includes('infantil') || normalizedTitle.includes('ninos')) return 'Dulces para fiestas';
  if (normalizedTitle.includes('estacion') || normalizedTitle.includes('fuente')) return 'Estaciones interactivas';
  if (normalizedTitle.includes('tendencia')) return 'Tendencias de candy bar';
  if (normalizedTitle.includes('tip') || normalizedTitle.includes('guia')) return 'Tips de mesas de dulces';

  return CTA_BY_CATEGORY[category] || 'Ideas de mesas de dulces';
}
