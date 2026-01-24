/* ============================================
   AI Career Path Simulator - JavaScript
   ============================================ */

// Theme Management
const ThemeManager = {
    STORAGE_KEY: 'career-sim-theme',
    
    init() {
        // Check for saved theme or system preference
        const savedTheme = localStorage.getItem(this.STORAGE_KEY);
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme) {
            this.setTheme(savedTheme);
        } else if (systemPrefersDark) {
            this.setTheme('dark');
        }
        
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem(this.STORAGE_KEY)) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    },
    
    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(this.STORAGE_KEY, theme);
        this.updateToggleIcon();
    },
    
    toggle() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    },
    
    updateToggleIcon() {
        // Icons are handled by CSS, but we can add additional logic here if needed
    }
};

// Form Handling
const FormHandler = {
    init() {
        const form = document.querySelector('.career-form');
        if (form) {
            form.addEventListener('submit', this.handleSubmit.bind(this));
        }
    },
    
    handleSubmit(e) {
        const btn = e.target.querySelector('.btn-primary');
        if (btn) {
            btn.classList.add('btn-loading');
        }
    }
};

// Smooth Scroll
const SmoothScroll = {
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
};

// Animate on Scroll
const ScrollAnimator = {
    init() {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-fadeInUp');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );
        
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }
};

// Header scroll effect
const HeaderEffect = {
    init() {
        const header = document.querySelector('.header');
        if (!header) return;
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.boxShadow = 'var(--shadow-lg)';
            } else {
                header.style.boxShadow = 'none';
            }
        });
    }
};

// Initialize all modules
document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.init();
    FormHandler.init();
    SmoothScroll.init();
    ScrollAnimator.init();
    HeaderEffect.init();
});

// Expose toggle function globally for the theme button
window.toggleTheme = () => ThemeManager.toggle();
