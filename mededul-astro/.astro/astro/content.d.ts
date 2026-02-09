declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
			components: import('astro').MDXInstance<{}>['components'];
		}>;
	}
}

declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"blog": {
"barra-postres-gourmet-eventos-cdmx.md": {
	id: "barra-postres-gourmet-eventos-cdmx.md";
  slug: "barra-postres-gourmet-eventos-cdmx";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"catering-dulces-eventos-empresariales-cdmx.md": {
	id: "catering-dulces-eventos-empresariales-cdmx.md";
  slug: "catering-dulces-eventos-empresariales-cdmx";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"celebraciones-infantiles-ensueno-cdmx.md": {
	id: "celebraciones-infantiles-ensueno-cdmx.md";
  slug: "celebraciones-infantiles-ensueno-cdmx";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"colores-tematicas-mesa-dulces-quinceanera.md": {
	id: "colores-tematicas-mesa-dulces-quinceanera.md";
  slug: "colores-tematicas-mesa-dulces-quinceanera";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"como-elegir-colores-mesa-dulces-boda.md": {
	id: "como-elegir-colores-mesa-dulces-boda.md";
  slug: "como-elegir-colores-mesa-dulces-boda";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"elegancia-dulce-mesas-bodas-exclusivas-cdmx.md": {
	id: "elegancia-dulce-mesas-bodas-exclusivas-cdmx.md";
  slug: "elegancia-dulce-mesas-bodas-exclusivas-cdmx";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"errores-comunes-mesa-dulces-boda.md": {
	id: "errores-comunes-mesa-dulces-boda.md";
  slug: "errores-comunes-mesa-dulces-boda";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"errores-comunes-mesa-dulces-xv-anos.md": {
	id: "errores-comunes-mesa-dulces-xv-anos.md";
  slug: "errores-comunes-mesa-dulces-xv-anos";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"estaciones-interactivas-gourmet-para-eventos-exquisitos.md": {
	id: "estaciones-interactivas-gourmet-para-eventos-exquisitos.md";
  slug: "estaciones-interactivas-gourmet-para-eventos-exquisitos";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"estaciones-interactivas-team-building.md": {
	id: "estaciones-interactivas-team-building.md";
  slug: "estaciones-interactivas-team-building";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"experiencias-dulces-inolvidables-quinceaneras.md": {
	id: "experiencias-dulces-inolvidables-quinceaneras.md";
  slug: "experiencias-dulces-inolvidables-quinceaneras";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"guia-completa-fuentes-chocolate-eventos-cdmx.md": {
	id: "guia-completa-fuentes-chocolate-eventos-cdmx.md";
  slug: "guia-completa-fuentes-chocolate-eventos-cdmx";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"ideas-mesa-dulces-baby-shower-perfecta.md": {
	id: "ideas-mesa-dulces-baby-shower-perfecta.md";
  slug: "ideas-mesa-dulces-baby-shower-perfecta";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"la-magia-de-la-mesa-de-dulces-en-baby-showers-bosques-de-las-loma.md": {
	id: "la-magia-de-la-mesa-de-dulces-en-baby-showers-bosques-de-las-loma.md";
  slug: "la-magia-de-la-mesa-de-dulces-en-baby-showers-bosques-de-las-loma";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"magia-de-mesas-dulces-en-fiestas-infantiles-condesa.md": {
	id: "magia-de-mesas-dulces-en-fiestas-infantiles-condesa.md";
  slug: "magia-de-mesas-dulces-en-fiestas-infantiles-condesa";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"mesa-de-dulces-baby-shower-transforma-tu-celebracion-con-enc-pedr.md": {
	id: "mesa-de-dulces-baby-shower-transforma-tu-celebracion-con-enc-pedr.md";
  slug: "mesa-de-dulces-baby-shower-transforma-tu-celebracion-con-enc-pedr";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"mesa-de-dulces-corporativo-catering-premium-para-eventos-emp-roma.md": {
	id: "mesa-de-dulces-corporativo-catering-premium-para-eventos-emp-roma.md";
  slug: "mesa-de-dulces-corporativo-catering-premium-para-eventos-emp-roma";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"mesa-de-dulces-corporativos-eleva-tus-eventos-empresari-condesa.md": {
	id: "mesa-de-dulces-corporativos-eleva-tus-eventos-empresari-condesa.md";
  slug: "mesa-de-dulces-corporativos-eleva-tus-eventos-empresari-condesa";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"mesa-de-dulces-corporativos-endulza-tus-eventos-empresariale-sant.md": {
	id: "mesa-de-dulces-corporativos-endulza-tus-eventos-empresariale-sant.md";
  slug: "mesa-de-dulces-corporativos-endulza-tus-eventos-empresariale-sant";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"mesa-de-dulces-corporativos-impresiona-en-eventos-empresaria-pola.md": {
	id: "mesa-de-dulces-corporativos-impresiona-en-eventos-empresaria-pola.md";
  slug: "mesa-de-dulces-corporativos-impresiona-en-eventos-empresaria-pola";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"mesa-de-dulces-cumpleanos-infantil-en-cdmx.md": {
	id: "mesa-de-dulces-cumpleanos-infantil-en-cdmx.md";
  slug: "mesa-de-dulces-cumpleanos-infantil-en-cdmx";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"mesa-de-dulces-infantil-guia-completa-para-fiestas-magi-polanco.md": {
	id: "mesa-de-dulces-infantil-guia-completa-para-fiestas-magi-polanco.md";
  slug: "mesa-de-dulces-infantil-guia-completa-para-fiestas-magi-polanco";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"mesa-de-dulces-infantil-un-sueno-hecho-realidad-interlomas.md": {
	id: "mesa-de-dulces-infantil-un-sueno-hecho-realidad-interlomas.md";
  slug: "mesa-de-dulces-infantil-un-sueno-hecho-realidad-interlomas";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"mesa-de-dulces-para-baby-shower-guia-completa.md": {
	id: "mesa-de-dulces-para-baby-shower-guia-completa.md";
  slug: "mesa-de-dulces-para-baby-shower-guia-completa";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"mesa-de-dulces-para-baby-shower-magia-en-cada-dulce-interlomas.md": {
	id: "mesa-de-dulces-para-baby-shower-magia-en-cada-dulce-interlomas.md";
  slug: "mesa-de-dulces-para-baby-shower-magia-en-cada-dulce-interlomas";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"mesa-de-dulces-para-bodas-endulza-tu-dia-perfecto-cdmx.md": {
	id: "mesa-de-dulces-para-bodas-endulza-tu-dia-perfecto-cdmx.md";
  slug: "mesa-de-dulces-para-bodas-endulza-tu-dia-perfecto-cdmx";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"mesa-de-dulces-para-xv-anos-guia-completa-para-una-cele-pedregal.md": {
	id: "mesa-de-dulces-para-xv-anos-guia-completa-para-una-cele-pedregal.md";
  slug: "mesa-de-dulces-para-xv-anos-guia-completa-para-una-cele-pedregal";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"mesa-de-dulces-para-xv-anos-guia-completa.md": {
	id: "mesa-de-dulces-para-xv-anos-guia-completa.md";
  slug: "mesa-de-dulces-para-xv-anos-guia-completa";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"mesa-de-dulces-xv-anos-crea-una-celebracion-inolvidable-santa-fe.md": {
	id: "mesa-de-dulces-xv-anos-crea-una-celebracion-inolvidable-santa-fe.md";
  slug: "mesa-de-dulces-xv-anos-crea-una-celebracion-inolvidable-santa-fe";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"mesa-dulces-baby-shower-ideas-creativas.md": {
	id: "mesa-dulces-baby-shower-ideas-creativas.md";
  slug: "mesa-dulces-baby-shower-ideas-creativas";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"mesa-dulces-bautizo-elegante-cdmx.md": {
	id: "mesa-dulces-bautizo-elegante-cdmx.md";
  slug: "mesa-dulces-bautizo-elegante-cdmx";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"mesa-dulces-boda-cdmx-elegancia-y-estilo.md": {
	id: "mesa-dulces-boda-cdmx-elegancia-y-estilo.md";
  slug: "mesa-dulces-boda-cdmx-elegancia-y-estilo";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"mesa-dulces-boda-intima-pequena.md": {
	id: "mesa-dulces-boda-intima-pequena.md";
  slug: "mesa-dulces-boda-intima-pequena";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"mesa-dulces-boda-jardin-exterior.md": {
	id: "mesa-dulces-boda-jardin-exterior.md";
  slug: "mesa-dulces-boda-jardin-exterior";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"mesa-dulces-bodas-exclusivas-cdmx.md": {
	id: "mesa-dulces-bodas-exclusivas-cdmx.md";
  slug: "mesa-dulces-bodas-exclusivas-cdmx";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"mesa-dulces-bodas-guia-completa.md": {
	id: "mesa-dulces-bodas-guia-completa.md";
  slug: "mesa-dulces-bodas-guia-completa";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"mesa-dulces-conferencias-congresos.md": {
	id: "mesa-dulces-conferencias-congresos.md";
  slug: "mesa-dulces-conferencias-congresos";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"mesa-dulces-cumpleanos-infantil-ideas.md": {
	id: "mesa-dulces-cumpleanos-infantil-ideas.md";
  slug: "mesa-dulces-cumpleanos-infantil-ideas";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"mesa-dulces-estaciones-interactivas-gourmet-transforma-tu-evento.md": {
	id: "mesa-dulces-estaciones-interactivas-gourmet-transforma-tu-evento.md";
  slug: "mesa-dulces-estaciones-interactivas-gourmet-transforma-tu-evento";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"mesa-dulces-eventos-corporativos-cdmx.md": {
	id: "mesa-dulces-eventos-corporativos-cdmx.md";
  slug: "mesa-dulces-eventos-corporativos-cdmx";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"mesa-dulces-eventos-corporativos-empresas.md": {
	id: "mesa-dulces-eventos-corporativos-empresas.md";
  slug: "mesa-dulces-eventos-corporativos-empresas";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"mesa-dulces-lanzamiento-productos.md": {
	id: "mesa-dulces-lanzamiento-productos.md";
  slug: "mesa-dulces-lanzamiento-productos";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"mesa-dulces-mexicanos-tradicionales-eventos.md": {
	id: "mesa-dulces-mexicanos-tradicionales-eventos.md";
  slug: "mesa-dulces-mexicanos-tradicionales-eventos";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"mesa-dulces-xv-anos-elegante-cdmx.md": {
	id: "mesa-dulces-xv-anos-elegante-cdmx.md";
  slug: "mesa-dulces-xv-anos-elegante-cdmx";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"mesa-dulces-xv-anos-elegante-sofisticada.md": {
	id: "mesa-dulces-xv-anos-elegante-sofisticada.md";
  slug: "mesa-dulces-xv-anos-elegante-sofisticada";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"mesa-dulces-xv-anos-ideas-tendencias.md": {
	id: "mesa-dulces-xv-anos-ideas-tendencias.md";
  slug: "mesa-dulces-xv-anos-ideas-tendencias";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"mesas-de-dulces-elegancia-y-singularidad-en-bodas-de-lujo.md": {
	id: "mesas-de-dulces-elegancia-y-singularidad-en-bodas-de-lujo.md";
  slug: "mesas-de-dulces-elegancia-y-singularidad-en-bodas-de-lujo";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"mesas-de-dulces-elegantes-para-baby-showers-en-cdmx.md": {
	id: "mesas-de-dulces-elegantes-para-baby-showers-en-cdmx.md";
  slug: "mesas-de-dulces-elegantes-para-baby-showers-en-cdmx";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"mesas-de-dulces-elegantes-para-bodas-en-cdmx.md": {
	id: "mesas-de-dulces-elegantes-para-bodas-en-cdmx.md";
  slug: "mesas-de-dulces-elegantes-para-bodas-en-cdmx";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"mesas-de-dulces-para-bodas-elegantes-en-cdmx.md": {
	id: "mesas-de-dulces-para-bodas-elegantes-en-cdmx.md";
  slug: "mesas-de-dulces-para-bodas-elegantes-en-cdmx";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"mesas-dulces-cuspide-lujo-celebraciones.md": {
	id: "mesas-dulces-cuspide-lujo-celebraciones.md";
  slug: "mesas-dulces-cuspide-lujo-celebraciones";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"mesas-dulces-exclusivas-arte-sofisticacion-bodas.md": {
	id: "mesas-dulces-exclusivas-arte-sofisticacion-bodas.md";
  slug: "mesas-dulces-exclusivas-arte-sofisticacion-bodas";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"mesas-dulces-exclusivas-eventos-corporativos.md": {
	id: "mesas-dulces-exclusivas-eventos-corporativos.md";
  slug: "mesas-dulces-exclusivas-eventos-corporativos";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"mesas-dulces-magia-distincion-fiestas-infantiles.md": {
	id: "mesas-dulces-magia-distincion-fiestas-infantiles.md";
  slug: "mesas-dulces-magia-distincion-fiestas-infantiles";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"mesas-dulces-toque-lujo-bodas-exclusivas.md": {
	id: "mesas-dulces-toque-lujo-bodas-exclusivas.md";
  slug: "mesas-dulces-toque-lujo-bodas-exclusivas";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"mesas-dulces-xv-anos-alta-sociedad-cdmx.md": {
	id: "mesas-dulces-xv-anos-alta-sociedad-cdmx.md";
  slug: "mesas-dulces-xv-anos-alta-sociedad-cdmx";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"presupuesto-mesa-dulces-quinceanera.md": {
	id: "presupuesto-mesa-dulces-quinceanera.md";
  slug: "presupuesto-mesa-dulces-quinceanera";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"roi-mesas-dulces-eventos-corporativos.md": {
	id: "roi-mesas-dulces-eventos-corporativos.md";
  slug: "roi-mesas-dulces-eventos-corporativos";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"tendencias-candy-bar-bodas-2025.md": {
	id: "tendencias-candy-bar-bodas-2025.md";
  slug: "tendencias-candy-bar-bodas-2025";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"tendencias-mesa-dulces-xv-anos-2025.md": {
	id: "tendencias-mesa-dulces-xv-anos-2025.md";
  slug: "tendencias-mesa-dulces-xv-anos-2025";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"tendencias-mesas-dulces-2025-cdmx.md": {
	id: "tendencias-mesas-dulces-2025-cdmx.md";
  slug: "tendencias-mesas-dulces-2025-cdmx";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
};
"candy-bar": Record<string, {
  id: string;
  slug: string;
  body: string;
  collection: "candy-bar";
  data: InferEntrySchema<"candy-bar">;
  render(): Render[".md"];
}>;
"estaciones": Record<string, {
  id: string;
  slug: string;
  body: string;
  collection: "estaciones";
  data: InferEntrySchema<"estaciones">;
  render(): Render[".md"];
}>;
"porque-mededul": Record<string, {
  id: string;
  slug: string;
  body: string;
  collection: "porque-mededul";
  data: InferEntrySchema<"porque-mededul">;
  render(): Render[".md"];
}>;
"tipos-mesas": Record<string, {
  id: string;
  slug: string;
  body: string;
  collection: "tipos-mesas";
  data: InferEntrySchema<"tipos-mesas">;
  render(): Render[".md"];
}>;

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../../src/content/config.js");
}
