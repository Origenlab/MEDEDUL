/**
 * Mededul - Cargador de Componentes
 * Carga header y footer desde archivos externos
 * Ajusta rutas automaticamente segun la ubicacion del archivo
 */

document.addEventListener('DOMContentLoaded', function() {
    // Detectar la profundidad de la ruta actual
    const path = window.location.pathname;
    let basePath = '';

    // Contar cuantos niveles de profundidad tiene la URL
    // Quitamos el archivo .html y contamos carpetas
    const pathWithoutFile = path.replace(/\/[^\/]*\.html$/, '').replace(/\/$/, '');
    const segments = pathWithoutFile.split('/').filter(s => s);

    // Determinar el basePath segun la ubicacion
    // /pagina.html -> '' (root)
    // /carpeta/pagina.html -> '../'
    // /carpeta/subcarpeta/pagina.html -> '../../'
    if (segments.length === 0) {
        // Root: /index.html o /pagina.html
        basePath = '';
    } else if (segments.length === 1) {
        // Un nivel: /estaciones-interactivas/pagina.html o /tipos-de-mesas-de-dulces/pagina.html
        basePath = '../';
    } else if (segments.length >= 2) {
        // Dos o mas niveles: /blog/categoria/articulo.html
        basePath = '../'.repeat(segments.length);
    }

    // Cargar Header
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        fetch(basePath + 'components/header.html')
            .then(response => {
                if (!response.ok) throw new Error('Header no encontrado');
                return response.text();
            })
            .then(html => {
                // Ajustar todas las rutas relativas
                html = html.replace(/href="(?!http|#|tel:|mailto:|https:\/\/wa\.me|javascript:)/g, 'href="' + basePath);
                html = html.replace(/src="(?!http|data:)/g, 'src="' + basePath);
                html = html.replace(/srcset="(?!http)/g, 'srcset="' + basePath);
                headerPlaceholder.innerHTML = html;
                initHeaderFunctionality();
            })
            .catch(error => console.error('Error cargando header:', error));
    }

    // Cargar Footer
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        fetch(basePath + 'components/footer.html')
            .then(response => {
                if (!response.ok) throw new Error('Footer no encontrado');
                return response.text();
            })
            .then(html => {
                // Ajustar todas las rutas relativas
                html = html.replace(/href="(?!http|#|tel:|mailto:|https:\/\/wa\.me|javascript:)/g, 'href="' + basePath);
                html = html.replace(/src="(?!http|data:)/g, 'src="' + basePath);
                html = html.replace(/srcset="(?!http)/g, 'srcset="' + basePath);
                footerPlaceholder.innerHTML = html;
            })
            .catch(error => console.error('Error cargando footer:', error));
    }
});

/**
 * Inicializa la funcionalidad del header despues de cargarlo
 */
function initHeaderFunctionality() {
    // Header scroll effect
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.pageYOffset > 50);
        });
        // Verificar estado inicial
        header.classList.toggle('scrolled', window.pageYOffset > 50);
    }

    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Cerrar menu al hacer click en un enlace (excepto dropdowns)
        const navLinks = navMenu.querySelectorAll('.nav-link:not(.nav-link-dropdown)');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // Mobile accordion menu
    initMobileAccordion();
}

/**
 * Inicializa el menu acordeon para moviles
 */
function initMobileAccordion() {
    // Solo en mobile
    const isMobile = () => window.innerWidth <= 768;

    // Toggle para dropdown principal (Servicios)
    const dropdownParents = document.querySelectorAll('.nav-dropdown');
    dropdownParents.forEach(dropdown => {
        const toggleLink = dropdown.querySelector('.nav-link-dropdown');
        if (toggleLink) {
            toggleLink.addEventListener('click', (e) => {
                if (isMobile()) {
                    e.preventDefault();
                    e.stopPropagation();

                    // Cerrar otros dropdowns
                    dropdownParents.forEach(other => {
                        if (other !== dropdown) {
                            other.classList.remove('active');
                        }
                    });

                    // Toggle actual
                    dropdown.classList.toggle('active');
                }
            });
        }
    });

    // Toggle para columnas del mega menu (subsecciones)
    const dropdownColumns = document.querySelectorAll('.dropdown-column');
    dropdownColumns.forEach(column => {
        const header = column.querySelector('.dropdown-header');
        if (header) {
            header.addEventListener('click', (e) => {
                if (isMobile()) {
                    e.preventDefault();
                    e.stopPropagation();

                    // Toggle la columna actual
                    column.classList.toggle('active');
                }
            });
        }
    });

    // Cerrar menu al hacer click en un enlace final
    const menuLinks = document.querySelectorAll('.dropdown-column ul li a, .dropdown-column a.ver-todos');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMobile()) {
                const navMenu = document.getElementById('nav-menu');
                const hamburger = document.getElementById('hamburger');
                if (navMenu && hamburger) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                }
                // Resetear acordeones
                document.querySelectorAll('.nav-dropdown, .dropdown-column').forEach(el => {
                    el.classList.remove('active');
                });
            }
        });
    });
}
