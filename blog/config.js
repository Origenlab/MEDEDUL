/**
 * ============================================
 * CONFIGURACION CENTRALIZADA BLOG MEDEDUL v2.0
 * Sistema Profesional de Gestion de Contenido
 * ============================================
 *
 * Este archivo es la UNICA fuente de verdad para:
 * - Configuracion del sitio web (blog/index.html)
 * - Workflow N8N de generacion de articulos
 *
 * IMPORTANTE: Cambios aqui afectan ambos sistemas
 */

const BLOG_CONFIG = {
    // ============================================
    // VERSION Y METADATA
    // ============================================
    version: '2.0.0',
    lastUpdate: '2025-01-27',

    // ============================================
    // ARCHIVOS Y RUTAS
    // ============================================
    paths: {
        jsonFile: 'articles.json',
        templateFile: 'TEMPLATE-ARTICULO.html',
        articlesDir: '/blog/',
        imagesDir: '../img/galeria/'
    },

    // ============================================
    // PAGINACION
    // ============================================
    pagination: {
        itemsPerPage: 12,
        maxVisiblePages: 5
    },

    // ============================================
    // VALORES POR DEFECTO
    // ============================================
    defaults: {
        image: '../img/galeria/candy-bar-boda-rosa-dorado-elegante-peonias.avif',
        cta: 'Ver Articulo',
        readTime: '8 min lectura',
        category: 'guias',
        excerpt: 'Descubre los mejores consejos y tendencias para mesas de dulces profesionales en CDMX.',
        breadcrumbMaxLength: 25
    },

    // ============================================
    // CATEGORIAS VALIDAS
    // ============================================
    categories: {
        'bodas': {
            name: 'Bodas',
            color: '#E91E8C',
            icon: 'heart',
            description: 'Mesas de dulces elegantes para bodas'
        },
        'xv-anos': {
            name: 'XV Anos',
            color: '#9C27B0',
            icon: 'crown',
            description: 'Celebraciones de quinceanera inolvidables'
        },
        'baby-shower': {
            name: 'Baby Shower',
            color: '#03A9F4',
            icon: 'baby',
            description: 'Dulces momentos para celebrar la llegada del bebe'
        },
        'corporativos': {
            name: 'Corporativos',
            color: '#607D8B',
            icon: 'briefcase',
            description: 'Eventos empresariales y ejecutivos'
        },
        'infantiles': {
            name: 'Infantiles',
            color: '#FF9800',
            icon: 'balloon',
            description: 'Fiestas magicas para los mas pequenos'
        },
        'estaciones': {
            name: 'Estaciones',
            color: '#4CAF50',
            icon: 'utensils',
            description: 'Experiencias interactivas gourmet'
        },
        'guias': {
            name: 'Guias',
            color: '#795548',
            icon: 'book',
            description: 'Guias completas y tutoriales'
        },
        'tematicas': {
            name: 'Tematicas',
            color: '#673AB7',
            icon: 'palette',
            description: 'Mesas de dulces con temas especiales'
        },
        'tendencias': {
            name: 'Tendencias',
            color: '#FF5722',
            icon: 'trending',
            description: 'Lo mas nuevo en mesas de dulces'
        },
        'tips-y-consejos': {
            name: 'Tips y Consejos',
            color: '#009688',
            icon: 'lightbulb',
            description: 'Consejos practicos de expertos'
        },
        'inspiracion': {
            name: 'Inspiracion',
            color: '#E91E63',
            icon: 'sparkle',
            description: 'Ideas creativas para tu evento'
        }
    },

    // ============================================
    // IMAGENES POR CATEGORIA
    // ============================================
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
    // REGLAS DE VALIDACION
    // ============================================
    validation: {
        requiredFields: ['id', 'title', 'excerpt', 'category', 'slug'],
        slugPattern: /^[a-z0-9][a-z0-9-]*[a-z0-9]$/,
        slugMinLength: 10,
        slugMaxLength: 70,
        titleMinLength: 30,
        titleMaxLength: 70,
        excerptMinLength: 80,
        excerptMaxLength: 200,
        metaDescriptionMinLength: 120,
        metaDescriptionMaxLength: 160
    },

    // ============================================
    // URLs BASE
    // ============================================
    urls: {
        base: 'https://mesas-de-dulces.com',
        blog: 'https://mesas-de-dulces.com/blog/',
        images: 'https://mesas-de-dulces.com/img/galeria/',
        whatsapp: 'https://wa.me/525525226442'
    },

    // ============================================
    // EMPRESA
    // ============================================
    empresa: {
        nombre: 'Mededul',
        nombreCompleto: 'Mededul - Mesas de Dulces de Alta Gama',
        telefono: '55 2522 6442',
        telefonoIntl: '+525525226442',
        email: 'info@mesas-de-dulces.com',
        ubicacion: 'CDMX y Area Metropolitana'
    }
};

// ============================================
// FUNCIONES DE VALIDACION
// ============================================

/**
 * Valida un articulo completo
 * @param {Object} article - Articulo a validar
 * @param {Number} index - Indice para mensajes de error
 * @returns {Object} - { valid: boolean, errors: [], warnings: [] }
 */
function validateArticle(article, index = 0) {
    const result = { valid: true, errors: [], warnings: [] };
    const v = BLOG_CONFIG.validation;
    const prefix = `Articulo #${index + 1}`;

    // Campos requeridos
    v.requiredFields.forEach(field => {
        if (!article[field]) {
            result.errors.push(`${prefix}: Campo requerido "${field}" faltante`);
            result.valid = false;
        }
    });

    // Validar categoria
    if (article.category && !BLOG_CONFIG.categories[article.category]) {
        result.errors.push(`${prefix}: Categoria "${article.category}" no valida`);
        result.valid = false;
    }

    // Validar slug
    if (article.slug) {
        if (article.slug.length < v.slugMinLength) {
            result.warnings.push(`${prefix}: Slug muy corto (${article.slug.length} chars, min: ${v.slugMinLength})`);
        }
        if (article.slug.length > v.slugMaxLength) {
            result.warnings.push(`${prefix}: Slug muy largo (${article.slug.length} chars, max: ${v.slugMaxLength})`);
        }
        if (!v.slugPattern.test(article.slug)) {
            result.warnings.push(`${prefix}: Slug contiene caracteres no validos`);
        }
    }

    // Validar titulo
    if (article.title) {
        if (article.title.length < v.titleMinLength) {
            result.warnings.push(`${prefix}: Titulo corto (${article.title.length} chars)`);
        }
        if (article.title.length > v.titleMaxLength) {
            result.warnings.push(`${prefix}: Titulo largo (${article.title.length} chars)`);
        }
    }

    // Validar excerpt
    if (article.excerpt) {
        if (article.excerpt.length < v.excerptMinLength) {
            result.warnings.push(`${prefix}: Excerpt corto (${article.excerpt.length} chars)`);
        }
        if (article.excerpt.length > v.excerptMaxLength) {
            result.warnings.push(`${prefix}: Excerpt largo (${article.excerpt.length} chars)`);
        }
    }

    return result;
}

/**
 * Sanitiza un articulo aplicando valores por defecto
 * @param {Object} article - Articulo a sanitizar
 * @returns {Object} - Articulo sanitizado
 */
function sanitizeArticle(article) {
    const d = BLOG_CONFIG.defaults;
    const categoryData = BLOG_CONFIG.categories[article.category] || BLOG_CONFIG.categories[d.category];

    return {
        id: article.id || Date.now(),
        title: (article.title || 'Sin titulo').trim(),
        excerpt: (article.excerpt || d.excerpt).trim(),
        category: BLOG_CONFIG.categories[article.category] ? article.category : d.category,
        categoryName: categoryData.name,
        categoryColor: categoryData.color,
        image: article.image || d.image,
        slug: sanitizeSlug(article.slug || article.title || 'articulo-' + Date.now()),
        readTime: article.readTime || d.readTime,
        cta: article.cta || d.cta
    };
}

/**
 * Sanitiza un slug
 * @param {String} text - Texto a convertir en slug
 * @returns {String} - Slug sanitizado
 */
function sanitizeSlug(text) {
    if (!text) return 'articulo-' + Date.now();

    let slug = text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Remover acentos
        .replace(/[^a-z0-9\s-]/g, '')    // Solo letras, numeros, espacios y guiones
        .replace(/\s+/g, '-')            // Espacios a guiones
        .replace(/-+/g, '-')             // Multiples guiones a uno
        .replace(/^-|-$/g, '')           // Quitar guiones al inicio/fin
        .substring(0, 70);               // Limitar longitud

    // Si queda muy corto, agregar timestamp
    if (slug.length < 10) {
        slug = slug + '-' + Date.now();
    }

    return slug;
}

/**
 * Genera un ID unico para articulo
 * @returns {Number} - ID basado en timestamp
 */
function generateArticleId() {
    return Date.now();
}

/**
 * Obtiene nombre legible de categoria
 * @param {String} categorySlug - Slug de categoria
 * @returns {String} - Nombre legible
 */
function getCategoryName(categorySlug) {
    return BLOG_CONFIG.categories[categorySlug]?.name || categorySlug;
}

/**
 * Obtiene color de categoria
 * @param {String} categorySlug - Slug de categoria
 * @returns {String} - Color hex
 */
function getCategoryColor(categorySlug) {
    return BLOG_CONFIG.categories[categorySlug]?.color || '#795548';
}

/**
 * Obtiene lista de categorias validas
 * @returns {Array} - Array de slugs
 */
function getValidCategories() {
    return Object.keys(BLOG_CONFIG.categories);
}

/**
 * Obtiene imagen aleatoria de categoria
 * @param {String} category - Slug de categoria
 * @returns {String} - Ruta de imagen
 */
function getRandomImageForCategory(category) {
    const images = BLOG_CONFIG.imagesByCategory[category] || [BLOG_CONFIG.defaults.image];
    return images[Math.floor(Math.random() * images.length)];
}

/**
 * Valida si una imagen existe en la configuracion
 * @param {String} imagePath - Ruta de imagen
 * @returns {Boolean}
 */
function isValidImage(imagePath) {
    if (!imagePath) return false;
    const allImages = Object.values(BLOG_CONFIG.imagesByCategory).flat();
    return allImages.includes(imagePath);
}

// ============================================
// EXPORTAR PARA NODE.JS (N8N)
// ============================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        BLOG_CONFIG,
        validateArticle,
        sanitizeArticle,
        sanitizeSlug,
        generateArticleId,
        getCategoryName,
        getCategoryColor,
        getValidCategories,
        getRandomImageForCategory,
        isValidImage
    };
}
