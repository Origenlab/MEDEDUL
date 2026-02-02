# Guia de Optimizacion Movil - MEDEDUL
## Version 1.0 | Mesas de Dulces CDMX

---

## Indice

1. [Resumen Ejecutivo](#resumen-ejecutivo)
2. [Breakpoints del Sistema](#breakpoints-del-sistema)
3. [Politica de Animaciones](#politica-de-animaciones)
4. [Seccion Hero](#seccion-hero)
5. [Seccion Caracteristicas](#seccion-caracteristicas)
6. [Seccion Galeria (Nuestros Trabajos)](#seccion-galeria-nuestros-trabajos)
7. [Seccion Proceso (Como Funciona)](#seccion-proceso-como-funciona)
8. [Seccion de Contacto/Cotizacion](#seccion-de-contactocotizacion)
9. [Footer Homologado](#footer-homologado)
10. [Formularios](#formularios)
11. [CSS Completo para Copiar](#css-completo-para-copiar)
12. [Checklist de Implementacion](#checklist-de-implementacion)

---

## Resumen Ejecutivo

Esta guia documenta todas las optimizaciones moviles implementadas en el sitio mesas-de-dulces.com. El objetivo es garantizar una experiencia de usuario profesional y consistente en dispositivos tactiles.

### Principios Fundamentales

1. **Mobile-First**: Los estilos base estan optimizados para moviles
2. **Sin Animaciones en Cards/Imagenes**: Solo botones y menu tienen transiciones
3. **Touch-Friendly**: Minimo 44px para elementos interactivos
4. **Prevencion de Zoom iOS**: Inputs con font-size 16px minimo
5. **Layouts Adaptativos**: Grid responsive en todas las secciones

### Archivos Afectados

- `css/styles.css` - Estilos globales
- `css/mobile-first.css` - Optimizaciones touch
- `css/blog.css` - Estilos del blog
- `tipos-de-mesas-de-dulces/*.html` - Paginas de servicios
- `candy-bar-eventos/*.html` - Paginas de eventos
- `estaciones-interactivas/*.html` - Paginas de estaciones

---

## Breakpoints del Sistema

El sitio utiliza 4 breakpoints principales:

| Breakpoint | Dispositivo | Uso Principal |
|------------|-------------|---------------|
| `1024px` | Tablets landscape | Grid 2 columnas, navegacion colapsada |
| `768px` | Tablets portrait | Layouts apilados, tipografia reducida |
| `480px` | Moviles grandes | Optimizaciones especificas movil |
| `380px` | Moviles pequenos | Ajustes extremos de espacio |

### Estructura de Media Queries

```css
/* Tablet */
@media (max-width: 1024px) { }

/* Mobile */
@media (max-width: 768px) { }

/* Mobile Small */
@media (max-width: 480px) { }

/* Mobile Extra Small */
@media (max-width: 380px) { }

/* Touch Devices */
@media (hover: none) and (pointer: coarse) { }
```

---

## Politica de Animaciones

### PERMITIDO (Solo estos elementos pueden tener transiciones)

```css
/* Botones */
.btn {
    transition: all 0.3s ease;
}

.btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(233, 30, 140, 0.3);
}

/* Menu de navegacion */
.nav-link {
    transition: color 0.3s ease;
}

/* Boton WhatsApp flotante */
.whatsapp-float {
    transition: transform 0.3s ease;
}
```

### PROHIBIDO (Eliminar de todos los archivos CSS)

```css
/* ❌ NO USAR - Cards */
.post-card { transition: all 0.4s ease; }
.post-card:hover { transform: translateY(-8px); }
.post-card::before { /* linea animada */ }

/* ❌ NO USAR - Imagenes */
.post-card img { transition: transform 0.5s ease; }
.post-card:hover img { transform: scale(1.08); }
.galeria-item:hover img { transform: scale(1.1); }

/* ❌ NO USAR - Caracteristicas */
.caracteristica-card:hover { transform: translateY(-8px); }
.caracteristica-card:hover .card-image img { transform: scale(1.1); }

/* ❌ NO USAR - Categorias */
.post-card .category { transition: all 0.3s ease; }
.post-card:hover .category { transform: scale(1.05); }

/* ❌ NO USAR - Overlays */
.galeria-item::before { /* gradientes animados */ }
.galeria-item::after { /* iconos de zoom */ }
```

### CSS para Touch Devices (mobile-first.css)

```css
@media (hover: none) and (pointer: coarse) {
    /* Active states SOLO para botones y navegacion */
    .btn:active {
        transform: scale(0.98);
        opacity: 0.9;
    }

    .nav-link:active {
        background: rgba(233, 30, 140, 0.1);
    }

    /* NO incluir estados hover para cards, imagenes, etc. */
}
```

---

## Seccion Hero

### Breakpoint 1024px
```css
@media (max-width: 1024px) {
    .servicio-hero {
        padding: 160px 0 80px;
    }

    .servicio-hero-content h1 {
        font-size: 2.5rem;
    }
}
```

### Breakpoint 768px
```css
@media (max-width: 768px) {
    .servicio-hero {
        padding: 140px 0 60px;
    }

    .servicio-hero-content h1 {
        font-size: 2rem;
    }
}
```

### Breakpoint 480px
```css
@media (max-width: 480px) {
    .servicio-hero {
        padding: 120px 0 50px;
    }

    .servicio-hero-content h1 {
        font-size: 1.6rem;
    }

    .servicio-hero-content p {
        font-size: 0.95rem;
    }
}
```

---

## Seccion Caracteristicas

### Estructura HTML
```html
<section class="caracteristicas-section">
    <div class="container">
        <div class="caracteristicas-grid">
            <div class="caracteristicas-left">
                <h2>Titulo</h2>
                <p class="header-description">Descripcion</p>
                <div class="header-stats">
                    <div class="stat-item">
                        <span class="stat-number">+500</span>
                        <span class="stat-label">Eventos</span>
                    </div>
                    <!-- mas stats -->
                </div>
            </div>
            <div class="caracteristicas-right">
                <div class="caracteristica-card">
                    <div class="card-image">
                        <img src="..." alt="...">
                    </div>
                    <div class="card-content">
                        <h3>Titulo</h3>
                        <p>Descripcion</p>
                    </div>
                </div>
                <!-- mas cards -->
            </div>
        </div>
    </div>
</section>
```

### CSS Responsive
```css
/* 768px */
@media (max-width: 768px) {
    .caracteristicas-left h2 {
        font-size: 1.7rem;
    }

    .caracteristicas-left .header-description {
        font-size: 0.95rem;
    }

    .header-stats {
        grid-template-columns: repeat(2, 1fr);
        gap: 15px;
        padding: 20px 15px;
    }

    .stat-number {
        font-size: 1.5rem;
    }

    .stat-label {
        font-size: 0.65rem;
    }

    .caracteristicas-right {
        grid-template-columns: 1fr 1fr;
        gap: 15px;
    }

    .caracteristica-card .card-image {
        height: 120px;
    }

    .caracteristica-card .card-content {
        padding: 15px;
    }

    .caracteristica-card h3 {
        font-size: 0.85rem;
    }

    .caracteristica-card p {
        font-size: 0.8rem;
    }
}

/* 480px */
@media (max-width: 480px) {
    .caracteristicas-left h2 {
        font-size: 1.5rem;
    }

    .header-stats {
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
        padding: 15px 12px;
    }

    .stat-number {
        font-size: 1.3rem;
    }

    .caracteristicas-right {
        grid-template-columns: 1fr;
        gap: 12px;
    }
}
```

---

## Seccion Galeria (Nuestros Trabajos)

### Layout Asimetrico para Movil

El objetivo es crear un layout tipo "masonry" que se vea profesional en moviles.

### CSS para Galeria Bento
```css
/* Desktop - Grid Bento */
.galeria-bento {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 200px);
    gap: 15px;
}

.galeria-item:nth-child(1) { grid-column: 1 / 2; grid-row: 1 / 3; }
.galeria-item:nth-child(2) { grid-column: 2 / 3; grid-row: 1 / 2; }
.galeria-item:nth-child(3) { grid-column: 3 / 4; grid-row: 1 / 2; }
.galeria-item:nth-child(4) { grid-column: 2 / 3; grid-row: 2 / 3; }
.galeria-item:nth-child(5) { grid-column: 3 / 4; grid-row: 2 / 3; }

/* 768px - Layout 2 columnas */
@media (max-width: 768px) {
    .galeria-bento {
        grid-template-columns: 1fr 1fr;
        grid-template-rows: repeat(4, 150px);
        gap: 10px;
    }

    .galeria-item:nth-child(1) {
        grid-column: span 2;
    }

    /* Reset otros items */
    .galeria-item:nth-child(n) {
        grid-column: auto;
        grid-row: auto;
    }
}

/* 480px - Layout Asimetrico Profesional */
@media (max-width: 480px) {
    .galeria-bento {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: 140px 180px 140px;
        gap: 10px;
    }

    /* Item 1: Normal */
    .galeria-item:nth-child(1) {
        grid-column: 1 / 2;
        grid-row: 1 / 2;
    }

    /* Item 2: Alto (ocupa 2 filas) */
    .galeria-item:nth-child(2) {
        grid-column: 2 / 3;
        grid-row: 1 / 3;
    }

    /* Item 3: Normal */
    .galeria-item:nth-child(3) {
        grid-column: 1 / 2;
        grid-row: 2 / 3;
    }

    /* Item 4: Normal */
    .galeria-item:nth-child(4) {
        grid-column: 1 / 2;
        grid-row: 3 / 4;
    }

    /* Item 5: Normal */
    .galeria-item:nth-child(5) {
        grid-column: 2 / 3;
        grid-row: 3 / 4;
    }

    /* Item 6: Ocultar si existe */
    .galeria-item:nth-child(6) {
        display: none;
    }
}
```

### Importante: Eliminar Hover Effects
```css
/* ELIMINAR estos estilos */
.galeria-item:hover img {
    transform: scale(1.1); /* ❌ ELIMINAR */
}

.galeria-item::before,
.galeria-item::after {
    /* ❌ ELIMINAR overlays animados */
}

/* MANTENER solo estilos estaticos */
.galeria-item {
    border-radius: 12px;
    overflow: hidden;
}

.galeria-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
```

---

## Seccion Proceso (Como Funciona)

### Estructura HTML
```html
<section class="proceso-section">
    <div class="container">
        <div class="section-header" style="text-align: center">
            <h2>¿Como <span class="titulo-decorativo">Funciona</span>?</h2>
            <p class="subtitulo">4 simples pasos para tu mesa de dulces perfecta</p>
        </div>

        <div class="proceso-timeline">
            <div class="proceso-step">
                <div class="number">1</div>
                <h4>Contactanos</h4>
                <p>Escribenos por WhatsApp o llena el formulario con los detalles de tu evento.</p>
            </div>
            <div class="proceso-step">
                <div class="number">2</div>
                <h4>Diseñamos</h4>
                <p>Creamos una propuesta a tu medida segun tu tematica, colores y presupuesto.</p>
            </div>
            <div class="proceso-step">
                <div class="number">3</div>
                <h4>Confirmamos</h4>
                <p>Apartas tu fecha con un anticipo y seleccionas los dulces de nuestro catalogo.</p>
            </div>
            <div class="proceso-step">
                <div class="number">4</div>
                <h4>Disfrutas</h4>
                <p>Llegamos, montamos todo y tu solo te dedicas a pasarla increible.</p>
            </div>
        </div>
    </div>
</section>
```

### CSS Base (Desktop)
```css
.proceso-timeline {
    display: flex;
    justify-content: space-between;
    position: relative;
    margin-top: 50px;
}

.proceso-timeline::before {
    content: '';
    position: absolute;
    top: 40px;
    left: 10%;
    right: 10%;
    height: 3px;
    background: #eee;
}

.proceso-step {
    text-align: center;
    position: relative;
    flex: 1;
}

.proceso-step .number {
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, #E91E8C 0%, #FF6BB3 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0 auto 20px;
    position: relative;
    z-index: 1;
}

.proceso-step h4 {
    font-size: 1.1rem;
    color: #1a1a1a;
    margin-bottom: 10px;
    font-weight: 700;
}

.proceso-step p {
    font-size: 0.9rem;
    color: #666;
    max-width: 200px;
    margin: 0 auto;
    line-height: 1.5;
}
```

### CSS Responsive - 2 COLUMNAS EN MOVIL
```css
/* 1024px - Columna */
@media (max-width: 1024px) {
    .proceso-timeline {
        flex-direction: column;
        gap: 30px;
    }

    .proceso-timeline::before {
        display: none;
    }
}

/* 480px - GRID 2 COLUMNAS */
@media (max-width: 480px) {
    .proceso-timeline {
        display: grid !important;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
    }

    .proceso-step {
        text-align: center;
    }

    .proceso-step .number {
        width: 50px;
        height: 50px;
        font-size: 1.1rem;
        margin: 0 auto 10px;
    }

    .proceso-step h4 {
        font-size: 0.85rem;
        margin-bottom: 6px;
    }

    .proceso-step p {
        font-size: 0.75rem;
        line-height: 1.4;
    }
}
```

### Resultado Visual en Movil
```
┌─────────────┬─────────────┐
│     (1)     │     (2)     │
│ Contactanos │  Diseñamos  │
│   texto     │    texto    │
├─────────────┼─────────────┤
│     (3)     │     (4)     │
│ Confirmamos │  Disfrutas  │
│   texto     │    texto    │
└─────────────┴─────────────┘
```

---

## Seccion de Contacto/Cotizacion

### Estructura HTML ACTUALIZADA
```html
<section class="contacto-section section-padding" id="contacto">
    <div class="container">
        <div class="contacto-grid">
            <div class="contacto-info">
                <h2>Cotiza tu Mesa de Dulces</h2>
                <p class="contacto-intro">Estamos listos para crear la mesa perfecta para tu evento en Ciudad de Mexico. Contactanos y recibe una cotizacion a tu medida sin compromiso.</p>

                <!-- CONTENEDOR GRID PARA INFO ITEMS -->
                <div class="info-items-grid">
                    <div class="info-item info-sucursal">
                        <h4>Sucursal Condesa</h4>
                        <p>Torre A, Av. Baja California 255, Col. Condesa, Cuauhtemoc, 06170 CDMX</p>
                        <a href="https://www.google.com/maps/..." target="_blank" rel="noopener" class="maps-link">Ver en Google Maps</a>
                    </div>

                    <div class="info-item info-sucursal">
                        <h4>Sucursal Anzures</h4>
                        <p>Av. Ejercito Nacional Mexicano 216, Anzures, Miguel Hidalgo, 11590 CDMX</p>
                        <a href="https://www.google.com/maps/..." target="_blank" rel="noopener" class="maps-link">Ver en Google Maps</a>
                    </div>

                    <div class="info-item info-contacto">
                        <h4>WhatsApp</h4>
                        <p><a href="tel:+525525226442">55 2522 6442</a></p>
                    </div>

                    <div class="info-item info-contacto">
                        <h4>Email</h4>
                        <p><a href="mailto:info@mesas-de-dulces.com">info@mesas-de-dulces.com</a></p>
                    </div>

                    <div class="info-item info-horario">
                        <h4>Horario de Atencion</h4>
                        <p>Lun - Vie: 9:00 AM - 7:00 PM<br>Sabados: 10:00 AM - 3:00 PM</p>
                    </div>
                </div>
            </div>

            <div class="contacto-form-wrapper">
                <h3>Solicita tu Cotizacion</h3>
                <p>Completa el formulario y te contactaremos por WhatsApp</p>
                <form id="contacto-form" class="contacto-form">
                    <!-- campos del formulario -->
                </form>
            </div>
        </div>
    </div>
</section>
```

### Clases CSS para Info Items

| Clase | Uso | Comportamiento Movil |
|-------|-----|---------------------|
| `info-sucursal` | Direcciones de sucursales | Ancho completo (span 2) |
| `info-contacto` | WhatsApp y Email | 2 columnas lado a lado |
| `info-horario` | Horario de atencion | Ancho completo con fondo rosa |

### CSS Completo de Contacto
```css
/* ===============================================
   SECCION DE CONTACTO - RESPONSIVE
   =============================================== */

/* Base styles */
.contacto-section {
    background: linear-gradient(180deg, #fdf7fa 0%, #fff 100%);
}

.contacto-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 50px;
    align-items: start;
}

.contacto-info h2 {
    font-size: 2rem;
    color: #1a1a1a;
    margin-bottom: 15px;
    font-weight: 700;
}

.contacto-intro {
    color: #666;
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 30px;
}

.info-item {
    background: #fff;
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 15px;
    border: 1px solid rgba(233, 30, 140, 0.1);
    box-shadow: 0 2px 10px rgba(0,0,0,0.03);
}

.info-item h4 {
    color: #E91E8C;
    font-size: 0.9rem;
    font-weight: 700;
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.info-item p {
    color: #555;
    font-size: 0.95rem;
    line-height: 1.5;
    margin: 0;
}

.info-item a {
    color: #E91E8C;
    text-decoration: none;
    font-weight: 600;
}

.maps-link {
    display: inline-block;
    margin-top: 8px;
    font-size: 0.85rem;
}

/* Grid de info items */
.info-items-grid {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

/* Formulario */
.contacto-form-wrapper {
    background: #fff;
    border-radius: 20px;
    padding: 35px;
    box-shadow: 0 10px 40px rgba(233, 30, 140, 0.1);
    border: 1px solid rgba(233, 30, 140, 0.08);
}

.contacto-form-wrapper h3 {
    font-size: 1.5rem;
    color: #1a1a1a;
    margin-bottom: 8px;
}

.contacto-form-wrapper > p {
    color: #888;
    font-size: 0.9rem;
    margin-bottom: 25px;
}

.form-group {
    margin-bottom: 18px;
}

.form-group label {
    display: block;
    font-size: 0.85rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 6px;
}

.form-group input,
.form-group select,
.form-group textarea {
    width: 100%;
    padding: 12px 15px;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    font-size: 0.95rem;
    background: #fafafa;
    box-sizing: border-box;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
    outline: none;
    border-color: #E91E8C;
    background: #fff;
}

.btn-submit {
    width: 100%;
    padding: 16px;
    background: linear-gradient(135deg, #E91E8C 0%, #FF6BB3 100%);
    color: #fff;
    border: none;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
}

/* Tablet - 1024px */
@media (max-width: 1024px) {
    .contacto-grid {
        gap: 35px;
    }

    .contacto-form-wrapper {
        padding: 30px;
    }
}

/* Mobile - 768px */
@media (max-width: 768px) {
    .contacto-section {
        padding: 50px 0;
    }

    .contacto-grid {
        grid-template-columns: 1fr;
        gap: 30px;
    }

    .contacto-info h2 {
        font-size: 1.6rem;
        text-align: center;
    }

    .contacto-intro {
        text-align: center;
        font-size: 0.95rem;
    }

    /* Info items en grid */
    .info-items-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
    }

    /* Sucursales ocupan ancho completo */
    .info-item.info-sucursal {
        grid-column: span 2;
    }

    /* Horario ocupa ancho completo */
    .info-item.info-horario {
        grid-column: span 2;
        text-align: center;
        background: linear-gradient(135deg, rgba(233, 30, 140, 0.05) 0%, rgba(255, 107, 179, 0.05) 100%);
    }

    .info-item {
        padding: 15px;
        margin-bottom: 0;
    }

    .info-item h4 {
        font-size: 0.75rem;
    }

    .info-item p {
        font-size: 0.85rem;
    }

    .contacto-form-wrapper {
        padding: 25px 20px;
        border-radius: 16px;
    }

    .contacto-form-wrapper h3 {
        font-size: 1.3rem;
        text-align: center;
    }

    .contacto-form-wrapper > p {
        text-align: center;
        font-size: 0.85rem;
    }

    /* Form row en 1 columna */
    .form-row {
        grid-template-columns: 1fr !important;
        gap: 15px !important;
    }

    .form-group input,
    .form-group select,
    .form-group textarea {
        padding: 14px 12px;
        font-size: 16px; /* Prevenir zoom iOS */
    }

    .btn-submit {
        padding: 16px;
        font-size: 1rem;
    }
}

/* Mobile pequeño - 480px */
@media (max-width: 480px) {
    .contacto-section {
        padding: 40px 0;
    }

    .contacto-info h2 {
        font-size: 1.4rem;
    }

    .contacto-intro {
        font-size: 0.9rem;
        margin-bottom: 20px;
    }

    .info-items-grid {
        gap: 10px;
    }

    .info-item {
        padding: 14px 12px;
    }

    /* Contacto items mas compactos */
    .info-item.info-contacto {
        padding: 12px 10px;
        text-align: center;
    }

    .info-item h4 {
        font-size: 0.7rem;
        margin-bottom: 6px;
    }

    .info-item p {
        font-size: 0.8rem;
    }

    .maps-link {
        font-size: 0.8rem;
    }

    .contacto-form-wrapper {
        padding: 20px 16px;
    }

    .contacto-form-wrapper h3 {
        font-size: 1.2rem;
    }

    .form-group {
        margin-bottom: 14px;
    }

    .form-group label {
        font-size: 0.8rem;
    }
}
```

### Layout Visual en Movil (768px)
```
┌─────────────────────────────┐
│     Cotiza tu Mesa de       │
│         Dulces              │
│     [intro centrada]        │
├─────────────────────────────┤
│   ┌─────────────────────┐   │
│   │ SUCURSAL CONDESA    │   │
│   │ Direccion...        │   │
│   │ Ver en Google Maps  │   │
│   └─────────────────────┘   │
│   ┌─────────────────────┐   │
│   │ SUCURSAL ANZURES    │   │
│   │ Direccion...        │   │
│   │ Ver en Google Maps  │   │
│   └─────────────────────┘   │
│   ┌──────────┬──────────┐   │
│   │ WHATSAPP │  EMAIL   │   │
│   │ 55 2522  │ info@... │   │
│   └──────────┴──────────┘   │
│   ┌─────────────────────┐   │
│   │ HORARIO (rosa sutil)│   │
│   │ Lun-Vie: 9-7        │   │
│   │ Sab: 10-3           │   │
│   └─────────────────────┘   │
├─────────────────────────────┤
│   ┌─────────────────────┐   │
│   │     FORMULARIO      │   │
│   │  Solicita Cotizacion│   │
│   │  [campos]           │   │
│   │  [Enviar WhatsApp]  │   │
│   └─────────────────────┘   │
└─────────────────────────────┘
```

---

## Footer Homologado

### Estructura HTML Estandar
```html
<footer class="footer">
    <div class="footer-top">
        <div class="container">
            <div class="footer-row-1">
                <div class="footer-brand">
                    <a href="https://mesas-de-dulces.com/" class="footer-logo">
                        <picture>
                            <source srcset="https://mesas-de-dulces.com/img/branding/logo-mededul-mesas-de-dulces.avif" type="image/avif">
                            <img decoding="async" loading="lazy" src="https://mesas-de-dulces.com/img/branding/logo-mededul-mesas-de-dulces.avif" alt="Mededul" width="180" height="60">
                        </picture>
                    </a>
                    <p class="footer-tagline">Transformamos tus eventos en experiencias deliciosamente inolvidables. Mesas de dulces profesionales en CDMX y area metropolitana.</p>
                    <div class="footer-social">
                        <a href="https://www.facebook.com/mededul" class="social-link" target="_blank" rel="noopener">Facebook</a>
                        <a href="https://www.instagram.com/mededul" class="social-link" target="_blank" rel="noopener">Instagram</a>
                        <a href="https://www.tiktok.com/@mededul" class="social-link" target="_blank" rel="noopener">TikTok</a>
                        <a href="https://wa.me/525525226442" class="social-link" target="_blank" rel="noopener">WhatsApp</a>
                    </div>
                </div>
                <div class="footer-links">
                    <h4>Navegacion</h4>
                    <ul>
                        <li><a href="https://mesas-de-dulces.com/">Inicio</a></li>
                        <li><a href="https://mesas-de-dulces.com/servicios">Servicios</a></li>
                        <li><a href="https://mesas-de-dulces.com/tipos-de-mesas-de-dulces">Tipos de Mesas</a></li>
                        <li><a href="https://mesas-de-dulces.com/candy-bar-eventos">Eventos</a></li>
                        <li><a href="https://mesas-de-dulces.com/blog/">Blog</a></li>
                        <li><a href="https://mesas-de-dulces.com/contacto">Contacto</a></li>
                    </ul>
                </div>
                <div class="footer-links">
                    <h4>Tipos de Mesas</h4>
                    <ul>
                        <li><a href="https://mesas-de-dulces.com/tipos-de-mesas-de-dulces/mesa-de-dulces">Mesa de Dulces</a></li>
                        <li><a href="https://mesas-de-dulces.com/tipos-de-mesas-de-dulces/mesa-de-frutas">Mesa de Frutas</a></li>
                        <li><a href="https://mesas-de-dulces.com/tipos-de-mesas-de-dulces/mesa-de-postres">Mesa de Postres</a></li>
                    </ul>
                </div>
                <div class="footer-links">
                    <h4>Candy Bar por Evento</h4>
                    <ul>
                        <li><a href="https://mesas-de-dulces.com/candy-bar-eventos/mesa-dulces-baby-shower">Baby Shower</a></li>
                        <li><a href="https://mesas-de-dulces.com/candy-bar-eventos/mesa-dulces-xv-anos">XV Anos</a></li>
                        <li><a href="https://mesas-de-dulces.com/candy-bar-eventos/mesa-dulces-boda">Bodas</a></li>
                        <li><a href="https://mesas-de-dulces.com/candy-bar-eventos/mesa-dulces-corporativos">Corporativos</a></li>
                    </ul>
                </div>
                <div class="footer-links">
                    <h4>Estaciones Interactivas</h4>
                    <ul>
                        <li><a href="https://mesas-de-dulces.com/estaciones-interactivas/fuente-de-chocolate">Fuente de Chocolate</a></li>
                        <li><a href="https://mesas-de-dulces.com/estaciones-interactivas/fuente-de-chamoy">Fuente de Chamoy</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-row-2">
                <div class="footer-contact">
                    <h4>Contacto</h4>
                    <div class="sucursal-card">
                        <span class="sucursal-badge">Sucursal Condesa</span>
                        <p class="sucursal-direccion">Torre A, Av. Baja California 255, Col. Condesa, Cuauhtemoc, 06170 CDMX</p>
                        <a href="https://maps.app.goo.gl/JV69HuQt3djPx9WZ9" target="_blank" rel="noopener" class="sucursal-mapa">Ver en Google Maps</a>
                    </div>
                    <div class="sucursal-card">
                        <span class="sucursal-badge">Sucursal Anzures</span>
                        <p class="sucursal-direccion">Av. Ejercito Nacional Mexicano 216, Anzures, Miguel Hidalgo, 11590 CDMX</p>
                        <a href="https://maps.app.goo.gl/Ze5acD2HRQ73QTa86" target="_blank" rel="noopener" class="sucursal-mapa">Ver en Google Maps</a>
                    </div>
                    <div class="contacto-directo">
                        <a href="tel:+525525226442" class="footer-phone">55 2522 6442</a>
                        <a href="mailto:info@mesas-de-dulces.com" class="footer-email">info@mesas-de-dulces.com</a>
                    </div>
                </div>
                <div class="footer-zona-col">
                    <h5>Colonias CDMX</h5>
                    <ul>
                        <li>Polanco</li>
                        <li>Lomas de Chapultepec</li>
                        <li>Santa Fe</li>
                        <li>Condesa</li>
                        <li>Roma</li>
                    </ul>
                </div>
                <div class="footer-zona-col">
                    <h5>Alcaldias CDMX</h5>
                    <ul>
                        <li>Miguel Hidalgo</li>
                        <li>Benito Juarez</li>
                        <li>Cuauhtemoc</li>
                        <li>Coyoacan</li>
                        <li>Alvaro Obregon</li>
                    </ul>
                </div>
                <div class="footer-zona-col">
                    <h5>Zona Metropolitana</h5>
                    <ul>
                        <li>Huixquilucan</li>
                        <li>Naucalpan</li>
                        <li>Tlalnepantla</li>
                        <li>Atizapan</li>
                        <li>Metepec</li>
                    </ul>
                </div>
                <div class="footer-zona-col">
                    <h5>Zonas Exclusivas</h5>
                    <ul>
                        <li>Pedregal</li>
                        <li>Tecamachalco</li>
                        <li>Interlomas</li>
                        <li>Bosques de las Lomas</li>
                        <li>San Angel</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="footer-bottom">
        <div class="container">
            <div class="footer-bottom-content">
                <p>&copy; 2026 Mededul. Todos los derechos reservados.</p>
                <div class="footer-legal">
                    <a href="https://mesas-de-dulces.com/aviso-privacidad">Aviso de Privacidad</a>
                    <a href="https://mesas-de-dulces.com/terminos-condiciones">Terminos y Condiciones</a>
                </div>
            </div>
        </div>
    </div>
</footer>
```

### Boton WhatsApp Flotante
```html
<a href="https://wa.me/525525226442?text=Hola! Me gustaria cotizar una mesa de dulces para mi evento" class="whatsapp-float" target="_blank" rel="noopener" aria-label="Contactar por WhatsApp" onclick="if(typeof rybbit!=='undefined')rybbit.event('whatsapp_click',{page:location.pathname})">
    <span class="whatsapp-badge">1</span>
    <svg viewBox="0 0 32 32" fill="currentColor">
        <path d="M16.004 0C7.166 0 .004 7.16.004 15.996c0 2.816.736 5.576 2.136 8.004L.004 32l8.188-2.144a15.94 15.94 0 007.812 2.016C24.84 31.872 32 24.712 32 15.876 32 7.16 24.84 0 16.004 0zm0 29.312a13.36 13.36 0 01-6.812-1.868l-.488-.292-5.064 1.328 1.352-4.936-.32-.508a13.28 13.28 0 01-2.04-7.04c0-7.36 5.992-13.352 13.36-13.352 7.372 0 13.364 5.992 13.364 13.36 0 7.372-5.988 13.308-13.352 13.308zm7.328-9.996c-.4-.2-2.368-1.168-2.736-1.3-.368-.136-.636-.2-.904.2s-1.04 1.3-1.272 1.572c-.236.268-.468.304-.868.104-.4-.204-1.688-.624-3.216-1.984-1.188-1.06-1.992-2.368-2.224-2.768-.236-.4-.028-.616.176-.816.18-.18.4-.468.6-.704.2-.232.268-.4.4-.664.136-.268.068-.5-.032-.7-.1-.2-.904-2.176-1.24-2.98-.324-.78-.656-.676-.904-.688-.232-.008-.5-.012-.768-.012s-.7.1-1.068.5c-.368.4-1.404 1.372-1.404 3.348s1.44 3.88 1.64 4.148c.2.268 2.832 4.32 6.864 6.06.96.416 1.708.664 2.292.848.964.308 1.84.264 2.532.16.772-.116 2.368-.968 2.704-1.904.332-.936.332-1.74.232-1.904-.1-.168-.368-.268-.768-.468z"/>
    </svg>
</a>
```

---

## Formularios

### Regla Critica: Prevenir Zoom en iOS

iOS hace zoom automatico en inputs con font-size menor a 16px. Para prevenirlo:

```css
@media (max-width: 768px) {
    .form-group input,
    .form-group select,
    .form-group textarea {
        font-size: 16px; /* MINIMO 16px */
        padding: 14px 12px;
    }
}
```

### Form Row Responsive

El form-row con fecha e invitados debe colapsar a 1 columna en movil:

```css
/* Form row en 1 columna */
@media (max-width: 768px) {
    .form-row {
        grid-template-columns: 1fr !important;
        gap: 15px !important;
    }
}
```

### Touch-Friendly Targets

Todos los elementos interactivos deben tener minimo 44px de altura:

```css
@media (max-width: 768px) {
    .btn,
    .btn-submit,
    .form-group input,
    .form-group select {
        min-height: 44px;
    }
}
```

---

## CSS Completo para Copiar

Este es el bloque CSS completo para agregar al `<style>` de cada pagina de servicios:

```css
/* ===============================================
   MOBILE 480px - Optimizaciones adicionales
   =============================================== */
@media (max-width: 480px) {
    .servicio-hero {
        padding: 120px 0 50px;
    }

    .servicio-hero-content h1 {
        font-size: 1.6rem;
    }

    .servicio-hero-content p {
        font-size: 0.95rem;
    }

    .caracteristicas-left h2 {
        font-size: 1.5rem;
    }

    .header-stats {
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
        padding: 15px 12px;
    }

    .stat-number {
        font-size: 1.3rem;
    }

    .caracteristicas-right {
        grid-template-columns: 1fr;
        gap: 12px;
    }

    .ideal-grid {
        grid-template-columns: 1fr;
        gap: 16px;
    }

    /* Proceso - 2 columnas en móvil */
    .proceso-timeline {
        display: grid !important;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
    }

    .proceso-step {
        text-align: center;
    }

    .proceso-step .number {
        width: 50px;
        height: 50px;
        font-size: 1.1rem;
        margin: 0 auto 10px;
    }

    .proceso-step h4 {
        font-size: 0.85rem;
        margin-bottom: 6px;
    }

    .proceso-step p {
        font-size: 0.75rem;
        line-height: 1.4;
    }

    /* CTA Final */
    .cta-final {
        padding: 50px 0;
    }

    .cta-final h2 {
        font-size: 1.5rem;
    }

    .cta-final p {
        font-size: 0.95rem;
    }

    .cta-final .btn-white {
        padding: 14px 28px;
        font-size: 0.95rem;
    }
}

/* ===============================================
   SECCION DE CONTACTO - RESPONSIVE
   =============================================== */

/* Base styles */
.contacto-section {
    background: linear-gradient(180deg, #fdf7fa 0%, #fff 100%);
}

.contacto-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 50px;
    align-items: start;
}

.contacto-info h2 {
    font-size: 2rem;
    color: #1a1a1a;
    margin-bottom: 15px;
    font-weight: 700;
}

.contacto-intro {
    color: #666;
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 30px;
}

.info-item {
    background: #fff;
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 15px;
    border: 1px solid rgba(233, 30, 140, 0.1);
    box-shadow: 0 2px 10px rgba(0,0,0,0.03);
}

.info-item h4 {
    color: #E91E8C;
    font-size: 0.9rem;
    font-weight: 700;
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.info-item p {
    color: #555;
    font-size: 0.95rem;
    line-height: 1.5;
    margin: 0;
}

.info-item a {
    color: #E91E8C;
    text-decoration: none;
    font-weight: 600;
}

.maps-link {
    display: inline-block;
    margin-top: 8px;
    font-size: 0.85rem;
}

.info-items-grid {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.contacto-form-wrapper {
    background: #fff;
    border-radius: 20px;
    padding: 35px;
    box-shadow: 0 10px 40px rgba(233, 30, 140, 0.1);
    border: 1px solid rgba(233, 30, 140, 0.08);
}

.contacto-form-wrapper h3 {
    font-size: 1.5rem;
    color: #1a1a1a;
    margin-bottom: 8px;
}

.contacto-form-wrapper > p {
    color: #888;
    font-size: 0.9rem;
    margin-bottom: 25px;
}

.form-group {
    margin-bottom: 18px;
}

.form-group label {
    display: block;
    font-size: 0.85rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 6px;
}

.form-group input,
.form-group select,
.form-group textarea {
    width: 100%;
    padding: 12px 15px;
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    font-size: 0.95rem;
    background: #fafafa;
    box-sizing: border-box;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
    outline: none;
    border-color: #E91E8C;
    background: #fff;
}

.btn-submit {
    width: 100%;
    padding: 16px;
    background: linear-gradient(135deg, #E91E8C 0%, #FF6BB3 100%);
    color: #fff;
    border: none;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
}

@media (max-width: 1024px) {
    .contacto-grid {
        gap: 35px;
    }

    .contacto-form-wrapper {
        padding: 30px;
    }
}

@media (max-width: 768px) {
    .contacto-section {
        padding: 50px 0;
    }

    .contacto-grid {
        grid-template-columns: 1fr;
        gap: 30px;
    }

    .contacto-info h2 {
        font-size: 1.6rem;
        text-align: center;
    }

    .contacto-intro {
        text-align: center;
        font-size: 0.95rem;
    }

    .info-items-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
    }

    .info-item.info-sucursal {
        grid-column: span 2;
    }

    .info-item.info-horario {
        grid-column: span 2;
        text-align: center;
        background: linear-gradient(135deg, rgba(233, 30, 140, 0.05) 0%, rgba(255, 107, 179, 0.05) 100%);
    }

    .info-item {
        padding: 15px;
        margin-bottom: 0;
    }

    .info-item h4 {
        font-size: 0.75rem;
    }

    .info-item p {
        font-size: 0.85rem;
    }

    .contacto-form-wrapper {
        padding: 25px 20px;
        border-radius: 16px;
    }

    .contacto-form-wrapper h3 {
        font-size: 1.3rem;
        text-align: center;
    }

    .contacto-form-wrapper > p {
        text-align: center;
        font-size: 0.85rem;
    }

    .form-row {
        grid-template-columns: 1fr !important;
        gap: 15px !important;
    }

    .form-group input,
    .form-group select,
    .form-group textarea {
        padding: 14px 12px;
        font-size: 16px;
    }

    .btn-submit {
        padding: 16px;
        font-size: 1rem;
    }
}

@media (max-width: 480px) {
    .contacto-section {
        padding: 40px 0;
    }

    .contacto-info h2 {
        font-size: 1.4rem;
    }

    .contacto-intro {
        font-size: 0.9rem;
        margin-bottom: 20px;
    }

    .info-items-grid {
        gap: 10px;
    }

    .info-item {
        padding: 14px 12px;
    }

    .info-item.info-contacto {
        padding: 12px 10px;
        text-align: center;
    }

    .info-item h4 {
        font-size: 0.7rem;
        margin-bottom: 6px;
    }

    .info-item p {
        font-size: 0.8rem;
    }

    .maps-link {
        font-size: 0.8rem;
    }

    .contacto-form-wrapper {
        padding: 20px 16px;
    }

    .contacto-form-wrapper h3 {
        font-size: 1.2rem;
    }

    .form-group {
        margin-bottom: 14px;
    }

    .form-group label {
        font-size: 0.8rem;
    }
}
```

---

## Checklist de Implementacion

### Para cada pagina de servicio:

- [ ] **1. Verificar breakpoints existentes**
  - Debe tener: 1024px, 768px
  - Agregar si falta: 480px

- [ ] **2. Eliminar animaciones de cards/imagenes**
  - Buscar: `transition`, `transform`, `:hover`
  - Eliminar de: `.caracteristica-card`, `.galeria-item`, `.post-card`

- [ ] **3. Actualizar seccion de proceso**
  - En 480px: `display: grid; grid-template-columns: repeat(2, 1fr);`
  - Verificar que .number tenga `margin: 0 auto`

- [ ] **4. Actualizar seccion de contacto**
  - Agregar contenedor `.info-items-grid` en HTML
  - Agregar clases: `.info-sucursal`, `.info-contacto`, `.info-horario`
  - Copiar CSS de contacto responsive

- [ ] **5. Homologar footer**
  - Verificar estructura identica al index
  - Formato de listas de zonas en multiples lineas
  - SVG de WhatsApp formateado

- [ ] **6. Verificar formularios**
  - Inputs con `font-size: 16px` en movil
  - `.form-row` colapsado a 1 columna
  - Botones con `min-height: 44px`

- [ ] **7. Probar en dispositivos**
  - Chrome DevTools: iPhone SE, iPhone 12, Pixel 5
  - Verificar que no haya zoom en inputs
  - Verificar layouts de proceso y contacto

### Paginas a actualizar:

| Pagina | Estado |
|--------|--------|
| `tipos-de-mesas-de-dulces/mesa-de-dulces.html` | ✅ Completado |
| `tipos-de-mesas-de-dulces/mesa-de-frutas.html` | ✅ Completado |
| `tipos-de-mesas-de-dulces/mesa-de-postres.html` | ⏳ Pendiente |
| `candy-bar-eventos/mesa-dulces-boda.html` | ⏳ Pendiente |
| `candy-bar-eventos/mesa-dulces-xv-anos.html` | ⏳ Pendiente |
| `candy-bar-eventos/mesa-dulces-baby-shower.html` | ⏳ Pendiente |
| `candy-bar-eventos/mesa-dulces-cumpleanos-infantil.html` | ⏳ Pendiente |
| `candy-bar-eventos/mesa-dulces-corporativos.html` | ⏳ Pendiente |
| `estaciones-interactivas/fuente-de-chocolate.html` | ⏳ Pendiente |
| `estaciones-interactivas/fuente-de-chamoy.html` | ⏳ Pendiente |
| `estaciones-interactivas/pared-de-dulces.html` | ⏳ Pendiente |

---

## Control de Versiones

| Version | Fecha | Cambios |
|---------|-------|---------|
| 1.0 | 2026-02-01 | Version inicial con todas las optimizaciones moviles |

---

## Contacto

Para dudas sobre esta guia, contactar al equipo de desarrollo.

**Sitio**: mesas-de-dulces.com
**Desarrollado por**: MEDEDUL Team
