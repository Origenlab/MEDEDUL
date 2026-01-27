# Sistema de Workflow para Blog - Generacion Automatica de Articulos

## Descripcion

Este sistema permite generar articulos de blog automaticamente usando:
- **N8N** para orquestacion del workflow
- **OpenRouter/OpenAI** para generacion de contenido con IA
- **GitHub API** para subir articulos al repositorio

---

## Contenido de esta Carpeta

```
workflow/
├── README.md                           # Este archivo
├── CONFIGURACION-NUEVO-SITIO.md        # Guia paso a paso para nuevo sitio
├── GUIA-WORKFLOW-SITIO-WEB.md          # Documentacion tecnica completa
├── TEMPLATE-ARTICULO-UNIVERSAL.html    # Template HTML adaptable
├── workflow-MEDEDUL-mesas-dulces-v7-profesional.json  # Workflow N8N
│
├── css/
│   ├── blog-article-BASE.css           # CSS para articulos individuales
│   └── blog-BASE.css                   # CSS para listado del blog
│
└── scripts/
    ├── fix-articulos.py                # Corrige articulos existentes
    └── verificar-articulos.py          # Verifica estructura de articulos
```

---

## Inicio Rapido

### 1. Preparar tu Sitio

1. Copia la carpeta `workflow/` a tu proyecto
2. Lee `CONFIGURACION-NUEVO-SITIO.md` para la guia completa
3. Personaliza el template con datos de tu sitio

### 2. Configurar N8N

1. Importa el workflow JSON en N8N
2. Configura credenciales (GitHub, OpenRouter)
3. Actualiza variables del sitio

### 3. Generar Articulos

1. Ejecuta el workflow manualmente o por webhook
2. El articulo se sube automaticamente a GitHub
3. Verifica que se muestre correctamente

---

## Variables del Template

### Variables del Sitio (reemplazar manualmente)

| Variable | Descripcion | Ejemplo |
|----------|-------------|---------|
| `{{SITE_DOMAIN}}` | Dominio del sitio | `mi-sitio.com` |
| `{{SITE_NAME}}` | Nombre de la empresa | `Mi Empresa` |
| `{{SITE_PHONE}}` | Telefono con codigo | `+52-55-1234-5678` |
| `{{SITE_PHONE_DISPLAY}}` | Telefono para mostrar | `55 1234 5678` |
| `{{SITE_WHATSAPP}}` | Numero WhatsApp | `5551234567` |
| `{{SITE_EMAIL}}` | Email de contacto | `info@mi-sitio.com` |
| `{{SITE_COLOR}}` | Color principal hex | `#E91E8C` |
| `{{SITE_FACEBOOK}}` | URL Facebook | `https://facebook.com/mi-pagina` |
| `{{SITE_INSTAGRAM}}` | URL Instagram | `https://instagram.com/mi-cuenta` |
| `{{SITE_TIKTOK}}` | URL TikTok | `https://tiktok.com/@mi-cuenta` |

### Variables Dinamicas (N8N reemplaza)

| Variable | Descripcion |
|----------|-------------|
| `{{TITULO}}` | Titulo H1 del articulo |
| `{{SLUG}}` | URL amigable |
| `{{META_DESCRIPTION}}` | Descripcion SEO |
| `{{META_KEYWORDS}}` | Keywords separadas por coma |
| `{{CATEGORIA}}` | Nombre de categoria |
| `{{CATEGORIA_SLUG}}` | Slug de categoria |
| `{{IMAGEN_PRINCIPAL}}` | Ruta de imagen |
| `{{IMAGEN_ALT}}` | Alt de imagen |
| `{{BREADCRUMB_TEXT}}` | Texto corto breadcrumb |
| `{{TIEMPO_LECTURA}}` | Ej: "10 min lectura" |
| `{{CONTENIDO}}` | HTML del articulo |
| `{{FAQ_SCHEMA}}` | JSON-LD de FAQs |

---

## Scripts de Utilidad

### fix-articulos.py

Corrige articulos existentes agregando:
- CSS inline critico
- div header-spacer
- Elimina breadcrumbs duplicados

```bash
python3 scripts/fix-articulos.py /ruta/a/tu/blog
```

### verificar-articulos.py

Verifica que todos los articulos tengan la estructura correcta:

```bash
python3 scripts/verificar-articulos.py /ruta/a/tu/blog
```

---

## Estructura HTML Requerida

Para que los articulos se muestren correctamente, deben tener esta estructura:

```html
</header>

<!-- Espaciador para header fijo -->
<div class="header-spacer"></div>

<section class="breadcrumb-section">
    <!-- breadcrumb aqui -->
</section>

<article>
    <header class="article-hero">
        <!-- hero del articulo -->
    </header>

    <div class="article-wrapper">
        <div class="article-layout">
            <div class="article-container">
                <!-- contenido -->
            </div>
            <aside class="article-sidebar">
                <!-- sidebar -->
            </aside>
        </div>
    </div>
</article>
```

---

## CSS Critico

El template incluye CSS inline critico para asegurar que el breadcrumb se muestre correctamente debajo del header fijo:

```css
.header-spacer {
    height: 180px !important;
    width: 100% !important;
    display: block !important;
}

@media (max-width: 768px) {
    .header-spacer {
        height: 130px !important;
    }
}

.breadcrumb-section {
    margin-top: -10px !important;
    padding: 10px 0 5px !important;
}

.article-hero {
    padding: 150px 0 100px !important;
    min-height: 500px !important;
}
```

---

## Flujo del Workflow N8N

```
1. Trigger (Webhook/Manual)
      ↓
2. Validar Input (keyword, categoria)
      ↓
3. Obtener Template de GitHub
      ↓
4. Generar Contenido con IA
      ↓
5. Seleccionar Imagen de Galeria
      ↓
6. Reemplazar Variables en Template
      ↓
7. Subir Articulo a GitHub
      ↓
8. Responder con URL del articulo
```

---

## Soporte

Si tienes problemas:

1. Revisa los logs de N8N
2. Verifica que las credenciales esten correctas
3. Confirma que la estructura de carpetas sea correcta
4. Ejecuta `verificar-articulos.py` para diagnosticar

---

## Changelog

### v2.0
- Template universal adaptable a cualquier sitio
- Scripts de correccion automatica
- CSS base incluido
- Documentacion completa

### v1.0
- Workflow inicial para MEDEDUL
