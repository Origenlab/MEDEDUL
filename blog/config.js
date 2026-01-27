/**
 * ============================================
 * CONFIGURACION CENTRALIZADA DEL BLOG MEDEDUL
 * ============================================
 *
 * Este archivo contiene TODA la configuracion del blog.
 * N8N y el sitio web usan estas mismas constantes.
 *
 * IMPORTANTE: No modificar sin actualizar el WORKFLOW
 */

const BLOG_CONFIG = {
    // ============================================
    // ARCHIVOS Y RUTAS
    // ============================================
    jsonFile: 'articles.json',
    templateFile: 'TEMPLATE-ARTICULO.html',

    // ============================================
    // PAGINACION
    // ============================================
    itemsPerPage: 12,

    // ============================================
    // VALORES POR DEFECTO
    // ============================================
    defaults: {
        image: '../img/galeria/candy-bar-boda-rosa-dorado-elegante-peonias.avif',
        cta: 'Ver Articulo',
        readTime: '5 min lectura',
        category: 'guias'
    },

    // ============================================
    // CATEGORIAS VALIDAS
    // ============================================
    // IMPORTANTE: Si agregas una categoria, actualizala aqui
    categories: {
        'bodas': {
            name: 'Bodas',
            color: '#E91E8C',
            icon: 'heart'
        },
        'xv-anos': {
            name: 'XV Anos',
            color: '#9C27B0',
            icon: 'crown'
        },
        'baby-shower': {
            name: 'Baby Shower',
            color: '#03A9F4',
            icon: 'baby'
        },
        'corporativos': {
            name: 'Corporativos',
            color: '#607D8B',
            icon: 'briefcase'
        },
        'infantiles': {
            name: 'Infantiles',
            color: '#FF9800',
            icon: 'balloon'
        },
        'estaciones': {
            name: 'Estaciones',
            color: '#4CAF50',
            icon: 'utensils'
        },
        'guias': {
            name: 'Guias',
            color: '#795548',
            icon: 'book'
        },
        'tematicas': {
            name: 'Tematicas',
            color: '#673AB7',
            icon: 'palette'
        },
        'tendencias': {
            name: 'Tendencias',
            color: '#FF5722',
            icon: 'trending'
        },
        'tips-y-consejos': {
            name: 'Tips y Consejos',
            color: '#009688',
            icon: 'lightbulb'
        },
        'inspiracion': {
            name: 'Inspiracion',
            color: '#E91E63',
            icon: 'sparkle'
        }
    },

    // ============================================
    // IMAGENES POR CATEGORIA
    // ============================================
    // Imagenes disponibles para cada categoria
    imagesByCategory: {
        'bodas': [
            '../img/galeria/candy-bar-boda-rosa-dorado-elegante-peonias.avif',
            '../img/galeria/candy-bar-boda-contemporanea-geometrico.avif',
            '../img/galeria/candy-bar-boda-lujo-chocolates-dorado-cristaleria.avif',
            '../img/galeria/candy-bar-boda-vintage-madera-flores.avif',
            '../img/galeria/candy-bar-boda-blanca-total-minimalista.avif',
            '../img/galeria/candy-bar-boda-exterior-elegante-flores-rosas.avif',
            '../img/galeria/candy-bar-boda-lujoso-cristal-flores.avif'
        ],
        'xv-anos': [
            '../img/galeria/candy-bar-quinceanera-rosa-elegante-globos.avif',
            '../img/galeria/candy-bar-quinceanos-moderno-rosa-plateado.avif',
            '../img/galeria/candy-bar-tema-princesa-castillo-rosa.avif',
            '../img/galeria/candy-bar-princesa-elegante-cupcakes-coronas.avif',
            '../img/galeria/candy-bar-quinceanera-rosa-fresas-dorado.avif',
            '../img/galeria/candy-bar-quinceanera-violeta-macarons.avif',
            '../img/galeria/candy-bar-princesa-elegante-rosa-dorado.avif'
        ],
        'baby-shower': [
            '../img/galeria/candy-bar-baby-shower-celeste-macarons-osito.avif',
            '../img/galeria/candy-bar-baby-shower-rosa-macarons-fresas.avif',
            '../img/galeria/candy-bar-bautizo-comunion-celeste-palomas.avif'
        ],
        'corporativos': [
            '../img/galeria/candy-bar-empresarial-moderno-minimalista.avif',
            '../img/galeria/candy-bar-lanzamiento-producto-elegante.avif',
            '../img/galeria/candy-bar-gourmet-elegante.avif',
            '../img/galeria/candy-bar-profesional-eventos.avif',
            '../img/galeria/candy-bar-graduacion-birrete-elegante.avif',
            '../img/galeria/candy-bar-elegante-tonos-neutros-macarons.avif'
        ],
        'infantiles': [
            '../img/galeria/candy-bar-fiesta-ninos-arcoiris-dulces.avif'
        ],
        'estaciones': [
            '../img/galeria/candy-bar-elegante-terraza-atardecer.avif',
            '../img/galeria/candy-bar-chocolate-oscuro-elegante.avif'
        ],
        'tematicas': [
            '../img/galeria/candy-bar-dia-muertos-pan-muerto-cempasuchil.avif'
        ],
        'tendencias': [
            '../img/galeria/candy-bar-colorido-fiestas.avif'
        ]
    },

    // ============================================
    // VALIDACION
    // ============================================
    validation: {
        requiredFields: ['id', 'title', 'excerpt', 'category', 'slug'],
        slugPattern: /^[a-z0-9-]+$/,
        minExcerptLength: 100,
        maxExcerptLength: 300,
        minTitleLength: 20,
        maxTitleLength: 80
    },

    // ============================================
    // URLs BASE
    // ============================================
    urls: {
        base: 'https://mesas-de-dulces.com',
        blog: 'https://mesas-de-dulces.com/blog/',
        images: 'https://mesas-de-dulces.com/img/galeria/'
    }
};

// ============================================
// FUNCIONES DE VALIDACION
// ============================================

/**
 * Valida un articulo y retorna errores encontrados
 * @param {Object} article - Objeto del articulo
 * @param {Number} index - Indice del articulo
 * @returns {Array} - Array de errores (vacio si todo OK)
 */
function validateArticle(article, index) {
    const errors = [];
    const v = BLOG_CONFIG.validation;

    // Verificar campos requeridos
    v.requiredFields.forEach(field => {
        if (!article[field]) {
            errors.push(`[ERROR] Articulo #${index + 1}: Falta campo requerido "${field}"`);
        }
    });

    // Validar categoria
    if (article.category && !BLOG_CONFIG.categories[article.category]) {
        errors.push(`[ERROR] Articulo #${index + 1}: Categoria "${article.category}" no valida. Categorias permitidas: ${Object.keys(BLOG_CONFIG.categories).join(', ')}`);
    }

    // Validar slug
    if (article.slug && !v.slugPattern.test(article.slug)) {
        errors.push(`[ERROR] Articulo #${index + 1}: Slug "${article.slug}" contiene caracteres no validos. Solo usar: a-z, 0-9, guiones`);
    }

    // Validar longitud del excerpt
    if (article.excerpt) {
        if (article.excerpt.length < v.minExcerptLength) {
            errors.push(`[WARN] Articulo #${index + 1}: Excerpt muy corto (${article.excerpt.length} chars). Minimo recomendado: ${v.minExcerptLength}`);
        }
        if (article.excerpt.length > v.maxExcerptLength) {
            errors.push(`[WARN] Articulo #${index + 1}: Excerpt muy largo (${article.excerpt.length} chars). Maximo recomendado: ${v.maxExcerptLength}`);
        }
    }

    // Validar longitud del titulo
    if (article.title) {
        if (article.title.length < v.minTitleLength) {
            errors.push(`[WARN] Articulo #${index + 1}: Titulo muy corto (${article.title.length} chars)`);
        }
        if (article.title.length > v.maxTitleLength) {
            errors.push(`[WARN] Articulo #${index + 1}: Titulo muy largo (${article.title.length} chars)`);
        }
    }

    return errors;
}

/**
 * Sanitiza un articulo aplicando valores por defecto
 * @param {Object} article - Objeto del articulo
 * @returns {Object} - Articulo sanitizado
 */
function sanitizeArticle(article) {
    const d = BLOG_CONFIG.defaults;
    const categoryData = BLOG_CONFIG.categories[article.category] || BLOG_CONFIG.categories[d.category];

    return {
        id: article.id || Date.now(),
        title: article.title || 'Sin titulo',
        excerpt: article.excerpt || 'Descripcion no disponible.',
        category: BLOG_CONFIG.categories[article.category] ? article.category : d.category,
        categoryName: categoryData.name,
        image: article.image || d.image,
        slug: article.slug || 'articulo-' + Date.now(),
        readTime: article.readTime || d.readTime,
        cta: article.cta || d.cta
    };
}

/**
 * Genera un ID unico para un nuevo articulo
 * @returns {Number} - ID unico basado en timestamp
 */
function generateArticleId() {
    return Date.now();
}

/**
 * Genera un slug a partir de un titulo
 * @param {String} title - Titulo del articulo
 * @returns {String} - Slug URL-friendly
 */
function generateSlug(title) {
    return title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remover acentos
        .replace(/[^a-z0-9\s-]/g, '')    // Solo letras, numeros, espacios y guiones
        .replace(/\s+/g, '-')            // Espacios a guiones
        .replace(/-+/g, '-')             // Multiples guiones a uno
        .replace(/^-|-$/g, '')           // Quitar guiones al inicio/fin
        .substring(0, 60);               // Limitar longitud
}

/**
 * Obtiene el nombre legible de una categoria
 * @param {String} categorySlug - Slug de la categoria
 * @returns {String} - Nombre legible
 */
function getCategoryName(categorySlug) {
    return BLOG_CONFIG.categories[categorySlug]?.name || categorySlug;
}

/**
 * Obtiene lista de categorias validas
 * @returns {Array} - Array de slugs de categorias
 */
function getValidCategories() {
    return Object.keys(BLOG_CONFIG.categories);
}

// Exportar para uso en Node.js (N8N) si aplica
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        BLOG_CONFIG,
        validateArticle,
        sanitizeArticle,
        generateArticleId,
        generateSlug,
        getCategoryName,
        getValidCategories
    };
}
