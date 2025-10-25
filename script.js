// script.js - Fonctionnalités pour le portfolio EN

// =============================================
// CONFIGURATION ET INITIALISATION
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio EN - Chargement des fonctionnalités...');
    
    // Initialisation de toutes les fonctionnalités
    initSmoothScroll();
    initNavbarScroll();
    initContactForm();
    initProjectFilters();
    initAnimations();
    initTypewriter();
    initImageLoading();
    initScrollToTop();
});

// =============================================
// FONCTIONNALITÉS DE NAVIGATION
// =============================================

// Scroll fluide vers les ancres
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Compensation navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Fermer le menu mobile après clic
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            }
        });
    });
}

// Navbar qui change au scroll
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        });
    }
}

// =============================================
// GESTION DES FORMULAIRES
// =============================================

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm(this)) {
                submitForm(this);
            }
        });
        
        // Validation en temps réel
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
    }
}

function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.getAttribute('name') || field.getAttribute('id');
    let isValid = true;
    
    // Réinitialiser les erreurs
    clearFieldError(field);
    
    // Validation basique required
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'Ce champ est obligatoire');
        isValid = false;
    }
    
    // Validation email
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Veuillez entrer un email valide');
            isValid = false;
        }
    }
    
    return isValid;
}

function showFieldError(field, message) {
    field.classList.add('is-invalid');
    
    let errorElement = field.parentNode.querySelector('.invalid-feedback');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'invalid-feedback';
        field.parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
}

function clearFieldError(field) {
    field.classList.remove('is-invalid');
    field.classList.add('is-valid');
    
    const errorElement = field.parentNode.querySelector('.invalid-feedback');
    if (errorElement) {
        errorElement.remove();
    }
}

function submitForm(form) {
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    // Simulation d'envoi
    submitButton.disabled = true;
    submitButton.innerHTML = `
        <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
        Envoi en cours...
    `;
    
    // Simuler un délai d'envoi
    setTimeout(() => {
        // Afficher le message de succès
        showFormMessage('Merci pour votre message ! Je vous répondrai dans les plus brefs délais.', 'success');
        
        // Réinitialiser le formulaire
        form.reset();
        
        // Réactiver le bouton
        submitButton.disabled = false;
        submitButton.innerHTML = originalText;
        
        // Réinitialiser les validations
        const fields = form.querySelectorAll('.is-valid');
        fields.forEach(field => field.classList.remove('is-valid'));
        
    }, 2000);
}

function showFormMessage(message, type = 'success') {
    let messageElement = document.getElementById('formMessage');
    
    if (!messageElement) {
        messageElement = document.createElement('div');
        messageElement.id = 'formMessage';
        messageElement.className = `alert alert-${type} mt-3`;
        document.querySelector('.contact-form').appendChild(messageElement);
    }
    
    messageElement.textContent = message;
    messageElement.className = `alert alert-${type} mt-3`;
    messageElement.classList.remove('d-none');
    
    // Masquer le message après 5 secondes
    setTimeout(() => {
        messageElement.classList.add('d-none');
    }, 5000);
}

// =============================================
// FILTRES DES PROJETS
// =============================================

function initProjectFilters() {
    const filterButtons = document.querySelectorAll('[data-filter]');
    const projectGrid = document.getElementById('projects-grid');
    
    if (!filterButtons.length || !projectGrid) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Mettre à jour les boutons actifs
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filtrer les projets
            filterProjects(filter);
        });
    });
}

function filterProjects(filter) {
    const projects = document.querySelectorAll('#projects-grid [data-category]');
    let visibleCount = 0;
    
    projects.forEach(project => {
        const categories = project.getAttribute('data-category').split(' ');
        
        if (filter === 'all' || categories.includes(filter)) {
            project.style.display = 'block';
            visibleCount++;
            
            // Animation d'apparition
            setTimeout(() => {
                project.style.opacity = '1';
                project.style.transform = 'translateY(0)';
            }, 100);
        } else {
            project.style.opacity = '0';
            project.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                project.style.display = 'none';
            }, 300);
        }
    });
    
    // Message si aucun projet trouvé
    showNoProjectsMessage(visibleCount === 0);
}

function showNoProjectsMessage(show) {
    let messageElement = document.getElementById('noProjectsMessage');
    
    if (show && !messageElement) {
        messageElement = document.createElement('div');
        messageElement.id = 'noProjectsMessage';
        messageElement.className = 'col-12 text-center py-5';
        messageElement.innerHTML = `
            <i class="bi bi-inbox display-1 text-muted mb-3"></i>
            <h4 class="text-muted">Aucun projet trouvé</h4>
            <p class="text-muted">Essayez avec un autre filtre</p>
        `;
        document.getElementById('projects-grid').appendChild(messageElement);
    } else if (!show && messageElement) {
        messageElement.remove();
    }
}

// =============================================
// ANIMATIONS ET EFFETS VISUELS
// =============================================

function initAnimations() {
    // Animation au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observer les éléments à animer
    const animatedElements = document.querySelectorAll('.project-card, .skill-card, .expertise-item, .timeline-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Effet machine à écrire pour le hero
function initTypewriter() {
    const heroText = document.querySelector('.hero-section h1');
    if (!heroText) return;
    
    const text = heroText.textContent;
    heroText.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            heroText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    // Démarrer l'animation après un délai
    setTimeout(typeWriter, 1000);
}

// Chargement progressif des images
function initImageLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback pour les navigateurs sans support
        images.forEach(img => {
            img.src = img.getAttribute('data-src');
        });
    }
}

// =============================================
// BOUTON SCROLL TO TOP
// =============================================

function initScrollToTop() {
    // Créer le bouton
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '<i class="bi bi-chevron-up"></i>';
    scrollButton.className = 'btn-scroll-top';
    scrollButton.setAttribute('aria-label', 'Retour en haut');
    document.body.appendChild(scrollButton);
    
    // Afficher/masquer le bouton
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollButton.classList.add('show');
        } else {
            scrollButton.classList.remove('show');
        }
    });
    
    // Scroll vers le haut
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// =============================================
// FONCTIONNALITÉS AVANCÉES
// =============================================

// Compteur de visite (simulé)
function initVisitCounter() {
    let visits = localStorage.getItem('portfolioVisits') || 0;
    visits = parseInt(visits) + 1;
    localStorage.setItem('portfolioVisits', visits);
    
    console.log(`Nombre de visites: ${visits}`);
}

// Mode sombre/clair
function initThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '<i class="bi bi-moon"></i>';
    themeToggle.className = 'btn-theme-toggle';
    themeToggle.setAttribute('aria-label', 'Changer le thème');
    document.body.appendChild(themeToggle);
    
    // Vérifier la préférence système
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark-theme');
        themeToggle.innerHTML = '<i class="bi bi-sun"></i>';
    }
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="bi bi-sun"></i>';
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="bi bi-moon"></i>';
        }
    });
}

// Partage sur les réseaux sociaux
function initSocialShare() {
    const shareButtons = document.querySelectorAll('[data-share]');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.getAttribute('data-share');
            const url = encodeURIComponent(window.location.href);
            const title = encodeURIComponent(document.title);
            let shareUrl;
            
            switch (platform) {
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?text=${title}&url=${url}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
                    break;
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                    break;
                default:
                    return;
            }
            
            window.open(shareUrl, '_blank', 'width=600,height=400');
        });
    });
}

// =============================================
// UTILITAIRES
// =============================================

// Détection du navigateur et appareil
function getDeviceInfo() {
    return {
        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
        isTouch: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
        browser: detectBrowser(),
        viewport: {
            width: window.innerWidth,
            height: window.innerHeight
        }
    };
}

function detectBrowser() {
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Edge';
    return 'Unknown';
}

// Logger pour le débogage
function debugLog(message, data = null) {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log(`[PORTFOLIO DEBUG] ${message}`, data);
    }
}

// Gestion des erreurs
window.addEventListener('error', function(e) {
    console.error('Erreur JavaScript:', e.error);
    debugLog('Erreur capturée', {
        message: e.message,
        filename: e.filename,
        lineno: e.lineno,
        colno: e.colno
    });
});

// =============================================
// PERFORMANCE ET OPTIMISATIONS
// =============================================

// Debounce pour les événements de resize
function debounce(func, wait) {
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

// Optimisation du resize
window.addEventListener('resize', debounce(function() {
    debugLog('Fenêtre redimensionnée', getDeviceInfo().viewport);
}, 250));

// Preload des images critiques
function preloadCriticalImages() {
    const criticalImages = [
        'images/profile.jpg',
        'images/hero-bg.jpg'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// =============================================
// API ET DONNÉES EXTERNES (EXEMPLE)
// =============================================

// Récupération des projets depuis une API (exemple)
async function fetchProjects() {
    try {
        const response = await fetch('/api/projects');
        const projects = await response.json();
        return projects;
    } catch (error) {
        console.error('Erreur lors du chargement des projets:', error);
        return [];
    }
}

// Envoi du formulaire vers un service externe (exemple avec Formspree)
async function submitToFormService(formData) {
    try {
        const response = await fetch('https://formspree.io/f/your-form-id', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        return response.ok;
    } catch (error) {
        console.error('Erreur envoi formulaire:', error);
        return false;
    }
}

// =============================================
// INITIALISATION AVANCÉE
// =============================================

// Démarrer les fonctionnalités avancées après le chargement complet
window.addEventListener('load', function() {
    initVisitCounter();
    initThemeToggle();
    initSocialShare();
    preloadCriticalImages();
    
    // Analytics personnalisé (exemple)
    debugLog('Portfolio complètement chargé', {
        performance: performance.timing,
        device: getDeviceInfo()
    });
});

// Service Worker pour le cache (optionnel)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('Service Worker enregistré avec succès:', registration);
            })
            .catch(function(error) {
                console.log("Échec de l'enregistrement du Service Worker:", error);
            });
    });
}