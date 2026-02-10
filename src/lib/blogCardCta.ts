const CTA_BY_CATEGORY: Record<string, string> = {
  'bodas': 'Ver bodas',
  'xv-anos': 'Ver XV',
  'baby-shower': 'Ver baby',
  'bautizos': 'Ver bautizo',
  'corporativos': 'Ver empresa',
  'fiestas-infantiles': 'Ver infantil',
  'infantiles': 'Ver infantil',
  'graduaciones': 'Ver graduacion',
  'despedidas-soltero': 'Ver despedida',
  'tips-consejos': 'Ver tips',
  'tendencias': 'Ver tendencias',
  'estaciones': 'Ver estaciones'
};

export function getBlogCardCta(category: string): string {
  return CTA_BY_CATEGORY[category] || 'Ver ideas';
}
