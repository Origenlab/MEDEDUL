

document.addEventListener('DOMContentLoaded', function() {

    const header = document.getElementById('header');

    if (header) {
        const handleScroll = () => {
            header.classList.toggle('scrolled', window.pageYOffset > 50);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Check on load
    }

    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    const isMobile = () => window.innerWidth <= 768;

    document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
        const toggleLink = dropdown.querySelector('.nav-link-dropdown');

        if (toggleLink) {
            toggleLink.addEventListener('click', (e) => {
                if (isMobile()) {
                    e.preventDefault();

                    document.querySelectorAll('.nav-dropdown').forEach(d => {
                        if (d !== dropdown) d.classList.remove('active');
                    });

                    dropdown.classList.toggle('active');
                }
            });
        }
    });

    document.addEventListener('click', (e) => {
        if (navMenu && navMenu.classList.contains('active')) {
            if (!e.target.closest('.nav') && !e.target.closest('.hamburger')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });

    window.addEventListener('resize', () => {
        if (!isMobile() && navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');

            if (targetId !== '#') {
                e.preventDefault();
                const target = document.querySelector(targetId);

                if (target) {
                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = target.offsetTop - headerHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    if (navMenu && navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        hamburger.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                }
            }
        });
    });

    const initFAQ = () => {
        document.querySelectorAll('.faq-question').forEach(question => {
            question.addEventListener('click', () => {
                const item = question.parentElement;
                const isActive = item.classList.contains('active');

                item.classList.toggle('active', !isActive);
            });
        });
    };

    if (document.querySelector('.faq-section')) {
        initFAQ();
    }

    const initBlogFilter = () => {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const articleCards = document.querySelectorAll('.article-card');
        const noArticles = document.querySelector('.no-articles');

        if (filterBtns.length === 0) return;

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.dataset.category;

                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                let visibleCount = 0;

                articleCards.forEach(card => {
                    const cardCategory = card.dataset.category;
                    const shouldShow = category === 'all' || cardCategory === category;

                    card.style.display = shouldShow ? 'flex' : 'none';
                    if (shouldShow) visibleCount++;
                });

                if (noArticles) {
                    noArticles.style.display = visibleCount === 0 ? 'block' : 'none';
                }
            });
        });
    };

    if (document.querySelector('.blog-filters')) {
        initBlogFilter();
    }

    if ('loading' in HTMLImageElement.prototype) {

        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
            }
        });
    } else {

        const lazyImages = document.querySelectorAll('img[loading="lazy"]');

        if (lazyImages.length > 0) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                        }
                        observer.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px'
            });

            lazyImages.forEach(img => imageObserver.observe(img));
        }
    }

    const animateOnScroll = () => {
        const elements = document.querySelectorAll('[data-animate]');

        if (elements.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        elements.forEach(el => observer.observe(el));
    };

    animateOnScroll();

});

function debounce(func, wait = 100) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit = 100) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
