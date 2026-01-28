/* ============================================
   AI Career Path Simulator - FUTURISTIC JavaScript
   Advanced Animations & Interactions
   ============================================ */

// Theme Management
const ThemeManager = {
    STORAGE_KEY: 'career-sim-theme',

    init() {
        // Check for saved theme or default to dark (cyberpunk default)
        const savedTheme = localStorage.getItem(this.STORAGE_KEY);

        if (savedTheme) {
            this.setTheme(savedTheme);
        } else {
            // Default to dark theme for cyberpunk aesthetic
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
    },

    toggle() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }
};

// Particle System (Enhanced CSS Particles)
const ParticleSystem = {
    init() {
        // Particles are handled via CSS, but we can add dynamic behavior
        this.addMouseInteraction();
    },

    addMouseInteraction() {
        // Add subtle parallax effect to particles based on mouse movement
        document.addEventListener('mousemove', (e) => {
            const particles = document.querySelectorAll('.particle');
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;

            particles.forEach((particle, index) => {
                const speed = (index % 3 + 1) * 0.5;
                const x = (mouseX - 0.5) * speed * 20;
                const y = (mouseY - 0.5) * speed * 20;
                particle.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
    }
};

// Form Handling with Futuristic Effects
const FormHandler = {
    init() {
        const form = document.querySelector('.career-form');
        if (form) {
            form.addEventListener('submit', this.handleSubmit.bind(this));
            this.addInputEffects();
        }
    },

    handleSubmit(e) {
        const btn = e.target.querySelector('.btn-primary');
        if (btn) {
            btn.classList.add('btn-loading');

            // Add glitch effect on submit
            btn.style.animation = 'glitch 0.3s ease infinite';

            setTimeout(() => {
                btn.style.animation = '';
            }, 500);
        }
    },

    addInputEffects() {
        const inputs = document.querySelectorAll('.form-input, .form-textarea');

        inputs.forEach(input => {
            // Add futuristic focus sound effect (visual only for now)
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('input-focused');
            });

            input.addEventListener('blur', () => {
                input.parentElement.classList.remove('input-focused');
            });

            // Add typing glow effect
            input.addEventListener('input', () => {
                input.style.boxShadow = '0 0 20px rgba(0, 255, 245, 0.3)';
                setTimeout(() => {
                    input.style.boxShadow = '';
                }, 100);
            });
        });
    }
};

// Smooth Scroll with Easing
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

// Scroll Animator with Intersection Observer
const ScrollAnimator = {
    init() {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-fadeInUp');
                        entry.target.style.opacity = '1';
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            el.style.opacity = '0';
            observer.observe(el);
        });

        // Also observe stagger children
        document.querySelectorAll('.stagger-children').forEach(container => {
            const containerObserver = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('stagger-visible');
                            containerObserver.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.1 }
            );
            containerObserver.observe(container);
        });
    }
};

// Header Effects
const HeaderEffect = {
    init() {
        const header = document.querySelector('.header');
        if (!header) return;

        let lastScroll = 0;

        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;

            if (currentScroll > 50) {
                header.style.boxShadow = '0 0 30px rgba(0, 255, 245, 0.2)';
                header.style.borderBottomColor = 'rgba(0, 255, 245, 0.4)';
            } else {
                header.style.boxShadow = 'none';
                header.style.borderBottomColor = 'rgba(0, 255, 245, 0.2)';
            }

            // Hide/show header on scroll
            if (currentScroll > lastScroll && currentScroll > 100) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }

            lastScroll = currentScroll;
        });
    }
};

// Counter Animation for Stats
const CounterAnimator = {
    init() {
        const counters = document.querySelectorAll('.stat-number');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    },

    animateCounter(element) {
        const text = element.textContent;
        const match = text.match(/(\d+)/);
        if (!match) return;

        const target = parseInt(match[0]);
        const suffix = text.replace(/[\d,]+/, '');
        const duration = 2000;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(easeOutQuart * target);

            element.textContent = current.toLocaleString() + suffix;

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                element.textContent = target.toLocaleString() + suffix;
            }
        };

        requestAnimationFrame(animate);
    }
};

// Tilt Effect for Cards
const TiltEffect = {
    init() {
        const cards = document.querySelectorAll('.glass-card, .feature-card, .dashboard-card');

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }
};

// Glitch Text Effect
const GlitchEffect = {
    init() {
        const glitchElements = document.querySelectorAll('.glitch-hover');

        glitchElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                el.classList.add('glitching');
                setTimeout(() => {
                    el.classList.remove('glitching');
                }, 300);
            });
        });
    }
};

// Typing Animation
const TypingAnimator = {
    type(element, text, speed = 50) {
        return new Promise(resolve => {
            let i = 0;
            element.textContent = '';

            const typeChar = () => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeChar, speed);
                } else {
                    resolve();
                }
            };

            typeChar();
        });
    },

    init() {
        const typingElements = document.querySelectorAll('[data-typing]');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const text = entry.target.getAttribute('data-typing') || entry.target.textContent;
                    this.type(entry.target, text);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        typingElements.forEach(el => observer.observe(el));
    }
};

// Cursor Trail Effect (Optional - Subtle)
const CursorTrail = {
    enabled: false,

    init() {
        if (!this.enabled) return;

        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(0,255,245,0.3), transparent);
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
        `;
        document.body.appendChild(trail);

        document.addEventListener('mousemove', (e) => {
            trail.style.left = e.clientX - 10 + 'px';
            trail.style.top = e.clientY - 10 + 'px';
        });
    }
};

// Neon Flicker Effect
const NeonFlicker = {
    init() {
        const neonElements = document.querySelectorAll('.neon-flicker');

        neonElements.forEach(el => {
            setInterval(() => {
                if (Math.random() > 0.95) {
                    el.style.opacity = '0.8';
                    setTimeout(() => {
                        el.style.opacity = '1';
                    }, 50);
                }
            }, 100);
        });
    }
};

// Initialize all modules
document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.init();
    ParticleSystem.init();
    FormHandler.init();
    SmoothScroll.init();
    ScrollAnimator.init();
    HeaderEffect.init();
    CounterAnimator.init();
    TiltEffect.init();
    GlitchEffect.init();
    TypingAnimator.init();
    CursorTrail.init();
    NeonFlicker.init();

    // Add loaded class to body for entry animations
    document.body.classList.add('loaded');

    console.log('%c🚀 CareerPath AI - Futuristic Mode Activated',
        'color: #00fff5; font-size: 16px; font-weight: bold; text-shadow: 0 0 10px #00fff5;');
});

// Expose toggle function globally for the theme button
window.toggleTheme = () => ThemeManager.toggle();

// Utility: Random Number Generator
const randomBetween = (min, max) => Math.random() * (max - min) + min;

// Utility: Debounce function
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Handle resize events
window.addEventListener('resize', debounce(() => {
    // Reinitialize effects that depend on window size
    TiltEffect.init();
}, 250));

// Preload critical resources
const preloadResources = () => {
    const fonts = [
        'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap',
        'https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&display=swap',
        'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap'
    ];

    fonts.forEach(font => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'style';
        link.href = font;
        document.head.appendChild(link);
    });
};

preloadResources();
