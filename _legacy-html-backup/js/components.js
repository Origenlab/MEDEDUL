

document.addEventListener('DOMContentLoaded', function() {

    const path = window.location.pathname;
    let basePath = '';

    const pathWithoutFile = path.replace(/\/[^\/]*\.html$/, '').replace(/\/$/, '');
    const segments = pathWithoutFile.split('/').filter(s => s);

    if (segments.length === 0) {

        basePath = '';
    } else if (segments.length === 1) {

        basePath = '../';
    } else if (segments.length >= 2) {

        basePath = '../'.repeat(segments.length);
    }

    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        fetch(basePath + 'components/header.html')
            .then(response => {
                if (!response.ok) throw new Error('Header no encontrado');
                return response.text();
            })
            .then(html => {

                html = html.replace(/href="(?!http|#|tel:|mailto:|https:\/\/wa\.me|javascript:)/g, 'href="' + basePath);
                html = html.replace(/src="(?!http|data:)/g, 'src="' + basePath);
                html = html.replace(/srcset="(?!http)/g, 'srcset="' + basePath);
                headerPlaceholder.innerHTML = html;
                initHeaderFunctionality();
            })
            .catch(error => console.error('Error cargando header:', error));
    }

    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        fetch(basePath + 'components/footer.html')
            .then(response => {
                if (!response.ok) throw new Error('Footer no encontrado');
                return response.text();
            })
            .then(html => {

                html = html.replace(/href="(?!http|#|tel:|mailto:|https:\/\/wa\.me|javascript:)/g, 'href="' + basePath);
                html = html.replace(/src="(?!http|data:)/g, 'src="' + basePath);
                html = html.replace(/srcset="(?!http)/g, 'srcset="' + basePath);
                footerPlaceholder.innerHTML = html;
            })
            .catch(error => console.error('Error cargando footer:', error));
    }
});

function initHeaderFunctionality() {

    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.pageYOffset > 50);
        });

        header.classList.toggle('scrolled', window.pageYOffset > 50);
    }

    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        const navLinks = navMenu.querySelectorAll('.nav-link:not(.nav-link-dropdown)');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    initMobileAccordion();
}

function initMobileAccordion() {

    const isMobile = () => window.innerWidth <= 768;

    const dropdownParents = document.querySelectorAll('.nav-dropdown');
    dropdownParents.forEach(dropdown => {
        const toggleLink = dropdown.querySelector('.nav-link-dropdown');
        if (toggleLink) {
            toggleLink.addEventListener('click', (e) => {
                if (isMobile()) {
                    e.preventDefault();
                    e.stopPropagation();

                    dropdownParents.forEach(other => {
                        if (other !== dropdown) {
                            other.classList.remove('active');
                        }
                    });

                    dropdown.classList.toggle('active');
                }
            });
        }
    });

    const dropdownColumns = document.querySelectorAll('.dropdown-column');
    dropdownColumns.forEach(column => {
        const header = column.querySelector('.dropdown-header');
        if (header) {
            header.addEventListener('click', (e) => {
                if (isMobile()) {
                    e.preventDefault();
                    e.stopPropagation();

                    column.classList.toggle('active');
                }
            });
        }
    });

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

                document.querySelectorAll('.nav-dropdown, .dropdown-column').forEach(el => {
                    el.classList.remove('active');
                });
            }
        });
    });
}
