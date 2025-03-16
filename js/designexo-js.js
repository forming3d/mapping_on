document.addEventListener('DOMContentLoaded', function () {
    // Variables
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const backToTopBtn = document.querySelector('.back-to-top');
    const portfolioFilters = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const contactForm = document.getElementById('contactForm');

    // Cambiar estilo del navbar al hacer scroll
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Resaltar enlace de navegación según la sección visible
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });

        // Mostrar u ocultar el botón "Volver arriba"
        if (backToTopBtn) {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }
    });

    // Navegación suave al hacer clic en los enlaces
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });

                    // Cerrar menú móvil si está abierto
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        navbarCollapse.classList.remove('show');
                    }
                }
            }
        });
    });

    // Inicializar carrusel de testimonios con Slick
    if (typeof $.fn.slick !== 'undefined') {
        $('.testimonial-carousel').slick({
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });
    }

    // Filtros de Portfolio
    portfolioFilters.forEach(filter => {
        filter.addEventListener('click', function () {
            // Remover clase activa de todos los filtros
            portfolioFilters.forEach(btn => {
                btn.classList.remove('active');
            });

            // Agregar clase activa al filtro seleccionado
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            // Filtrar elementos del portfolio
            portfolioItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else if (item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Inicializar lightbox para imágenes del portfolio (usando FancyBox)
    if (typeof $.fn.fancybox !== 'undefined') {
        $('[data-fancybox="gallery"]').fancybox({
            buttons: [
                "zoom",
                "share",
                "slideShow",
                "fullScreen",
                "download",
                "thumbs",
                "close"
            ],
            loop: true,
            protect: true
        });
    }

    // Inicializar contador para estadísticas
    const counters = document.querySelectorAll('.counter');

    function startCounter() {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const count = +counter.innerText;
            const increment = target / 100;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(startCounter, 10);
            } else {
                counter.innerText = target;
            }
        });
    }

    // Iniciar contador cuando el usuario llegue a la sección de estadísticas
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > (statsSection.offsetTop - window.innerHeight)) {
                startCounter();
            }
        });
    }

    // Validación de formulario de contacto
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Validación simple
            let isValid = true;
            const inputs = contactForm.querySelectorAll('.form-control');

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('is-invalid');
                } else {
                    input.classList.remove('is-invalid');
                }
            });

            // Si el formulario es válido, mostrar mensaje de éxito
            if (isValid) {
                const successMessage = document.createElement('div');
                successMessage.className = 'alert alert-success mt-3';
                successMessage.textContent = '¡Gracias! Tu mensaje ha sido enviado correctamente.';

                contactForm.reset();
                contactForm.appendChild(successMessage);

                // Eliminar mensaje después de 5 segundos
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }
        });

        // Eliminar mensaje de error al escribir
        contactForm.querySelectorAll('.form-control').forEach(input => {
            input.addEventListener('input', function () {
                if (this.value.trim()) {
                    this.classList.remove('is-invalid');
                }
            });
        });
    }

    // Animaciones al hacer scroll (requiere AOS)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }

    // Botón volver arriba
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Inicialización para elementos que requieran ejecución adicional
    function initializeComponents() {
        // Agregar cualquier inicialización adicional aquí

        // Preloader (mostrar/ocultar)
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            window.addEventListener('load', function () {
                preloader.style.opacity = '0';
                setTimeout(function () {
                    preloader.style.display = 'none';
                }, 500);
            });
        }
    }

    // Llamar a la función de inicialización
    initializeComponents();
});

// Funciones adicionales
function toggleMobileMenu() {
    const navbarCollapse = document.querySelector('.navbar-collapse');
    if (navbarCollapse.classList.contains('show')) {
        navbarCollapse.classList.remove('show');
    } else {
        navbarCollapse.classList.add('show');
    }
}

// Función para mostrar trabajos recientes dinámicamente
function loadPortfolioItems(items) {
    const portfolioContainer = document.querySelector('.portfolio-container');

    if (portfolioContainer && items && items.length > 0) {
        // Limpiar contenedor
        portfolioContainer.innerHTML = '';

        // Agregar elementos
        items.forEach(item => {
            const portfolioItem = document.createElement('div');
            portfolioItem.className = `col-lg-4 col-md-6 portfolio-item ${item.category}`;

            portfolioItem.innerHTML = `
                <div class="portfolio-img">
                    <img src="${item.image}" alt="${item.title}">
                    <div class="portfolio-overlay">
                        <h4>${item.title}</h4>
                        <p>${item.description}</p>
                        <a href="${item.image}" data-fancybox="gallery" class="portfolio-icon">
                            <i class="fas fa-search"></i>
                        </a>
                    </div>
                </div>
            `;

            portfolioContainer.appendChild(portfolioItem);
        });

        // Reinicializar lightbox si es necesario
        if (typeof $.fn.fancybox !== 'undefined') {
            $('[data-fancybox="gallery"]').fancybox();
        }
    }
}

// Detectar cambio de tema (modo claro/oscuro) si se implementa
function detectColorScheme() {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const htmlElement = document.documentElement;

    function setTheme(isDark) {
        if (isDark) {
            htmlElement.setAttribute('data-theme', 'dark');
        } else {
            htmlElement.setAttribute('data-theme', 'light');
        }
    }

    // Establecer tema inicial
    setTheme(darkModeMediaQuery.matches);

    // Cambiar tema cuando cambie la preferencia del sistema
    darkModeMediaQuery.addEventListener('change', e => {
        setTheme(e.matches);
    });
}