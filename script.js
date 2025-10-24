// Données des projets
const projects = [
    {
        id: 1,
        title: "Site E-commerce",
        description: "Développement d'une plateforme e-commerce complète avec React et Node.js",
        image: "https://via.placeholder.com/300x200",
        technologies: ["React", "Node.js", "MongoDB", "Stripe"],
        link: "#"
    },
    {
        id: 2,
        title: "Application Mobile",
        description: "Création d'une application de fitness avec React Native",
        image: "https://via.placeholder.com/300x200",
        technologies: ["React Native", "Firebase", "Redux"],
        link: "#"
    },
    {
        id: 3,
        title: "Portfolio Artistique",
        description: "Design et développement d'un portfolio pour un photographe professionnel",
        image: "https://via.placeholder.com/300x200",
        technologies: ["HTML", "CSS", "JavaScript", "GSAP"],
        link: "#"
    },
    {
        id: 4,
        title: "Dashboard Admin",
        description: "Interface d'administration avec analytics et gestion des utilisateurs",
        image: "https://via.placeholder.com/300x200",
        technologies: ["Vue.js", "Express", "MySQL", "Chart.js"],
        link: "#"
    },
    {
        id: 5,
        title: "Blog Technologie",
        description: "Plateforme de blog avec système de commentaires et authentification",
        image: "https://via.placeholder.com/300x200",
        technologies: ["Next.js", "Prisma", "PostgreSQL", "Auth0"],
        link: "#"
    },
    {
        id: 6,
        title: "Application Météo",
        description: "Application météo en temps réel avec prévisions sur 7 jours",
        image: "https://via.placeholder.com/300x200",
        technologies: ["JavaScript", "API REST", "CSS3", "LocalStorage"],
        link: "#"
    }
];

// Afficher les projets sur la page projects.html
function displayProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    
    if (projectsGrid) {
        projectsGrid.innerHTML = projects.map(project => `
            <div class="col-lg-4 col-md-6">
                <div class="card project-card h-100">
                    <img src="${project.image}" class="card-img-top" alt="${project.title}">
                    <div class="card-body">
                        <h5 class="card-title">${project.title}</h5>
                        <p class="card-text">${project.description}</p>
                        <div class="technologies mb-3">
                            ${project.technologies.map(tech => 
                                `<span class="badge bg-secondary me-1">${tech}</span>`
                            ).join('')}
                        </div>
                    </div>
                    <div class="card-footer">
                        <a href="${project.link}" class="btn btn-primary">Voir le projet</a>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Gestion du formulaire de contact
function handleContactForm() {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (!form.checkValidity()) {
                e.stopPropagation();
                form.classList.add('was-validated');
                return;
            }
            
            // Simulation d'envoi
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            submitButton.innerHTML = '<span class="loading"></span> Envoi en cours...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                successMessage.classList.remove('d-none');
                form.reset();
                form.classList.remove('was-validated');
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                
                // Masquer le message après 5 secondes
                setTimeout(() => {
                    successMessage.classList.add('d-none');
                }, 5000);
            }, 2000);
        });
    }
}

// Animation au scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observer les éléments à animer
    document.querySelectorAll('.skill-item, .project-card, .contact-info').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    displayProjects();
    handleContactForm();
    initScrollAnimations();
    
    // Highlight de la navigation active
    const currentPage = location.pathname.split('/').pop();
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});