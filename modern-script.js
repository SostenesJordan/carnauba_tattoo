// ===== MODERN JAVASCRIPT FOR CARNAUBA TATTOO =====

class CarnaaubaTattoo {
    constructor() {
        this.isLoading = true;
        this.init();
    }

    init() {
        // DOM Content Loaded Event
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupEventListeners());
        } else {
            this.setupEventListeners();
        }

        // Window Load Event for animations
        window.addEventListener('load', () => this.handleWindowLoad());
    }

    setupEventListeners() {
        // Navigation
        this.setupNavigation();
        
        // Scroll Events
        this.setupScrollEvents();
        
        // Forms
        this.setupForms();
        
        // Lightbox
        this.setupLightbox();
        
        // Smooth scrolling
        this.setupSmoothScrolling();
        
        // FAQ functionality
        this.setupFAQ();
        
        // Intersection Observer for animations
        this.setupIntersectionObserver();
        
        // Back to top button
        this.setupBackToTop();
        
        // Loading screen
        this.setupLoadingScreen();
        
        // Mobile optimizations
        this.setupMobileOptimizations();
    }

    // ===== LOADING SCREEN =====
    setupLoadingScreen() {
        const loadingScreen = document.getElementById('loading-screen');
        
        if (loadingScreen) {
            // Simulate loading time
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                this.isLoading = false;
                
                // Start animations after loading
                this.startInitialAnimations();
                
                // Remove loading screen from DOM after transition
                setTimeout(() => {
                    if (loadingScreen.parentNode) {
                        loadingScreen.parentNode.removeChild(loadingScreen);
                    }
                }, 500);
            }, 2500);
        }
    }

    startInitialAnimations() {
        // Add animation classes to elements that should animate on load
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.animation = 'fadeInUp 1s ease 0.5s both';
        }
    }

    handleWindowLoad() {
        // This runs after all resources are loaded
        console.log('Website fully loaded');
    }

    // ===== NAVIGATION =====
    setupNavigation() {
        const navbar = document.getElementById('navbar');
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Mobile menu toggle
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
                document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
            });
        }

        // Close mobile menu when clicking on links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu && navMenu.classList.contains('active')) {
                if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            }
        });

        // Active navigation highlighting
        this.updateActiveNavigation();
    }

    updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            if (this.isLoading) return;

            let current = '';
            const scrollPos = window.scrollY + 100;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;

                if (scrollPos >= sectionTop && scrollPos <= sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    // ===== SCROLL EVENTS =====
    setupScrollEvents() {
        const navbar = document.getElementById('navbar');
        let lastScrollTop = 0;
        let ticking = false;

        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            // Navbar background on scroll
            if (navbar) {
                if (scrollTop > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            }

            // Navbar hide/show on scroll direction
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down
                navbar.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                navbar.style.transform = 'translateY(0)';
            }

            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(handleScroll);
                ticking = true;
            }
        });
    }

    // ===== SMOOTH SCROLLING =====
    setupSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');

        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    const headerHeight = 80;
                    const targetPosition = targetElement.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ===== FAQ FUNCTIONALITY =====
    setupFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                if (isActive) {
                    item.classList.remove('active');
                } else {
                    item.classList.add('active');
                }
            });
        });
    }

    // ===== INTERSECTION OBSERVER =====
    setupIntersectionObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Add stagger animation to portfolio items
                    if (entry.target.classList.contains('portfolio-item')) {
                        const items = document.querySelectorAll('.portfolio-item');
                        items.forEach((item, index) => {
                            setTimeout(() => {
                                item.style.animationDelay = `${index * 0.1}s`;
                                item.classList.add('fade-in', 'visible');
                            }, index * 100);
                        });
                    }
                }
            });
        }, options);

        // Observe elements for animations
        const animatedElements = document.querySelectorAll(`
            .section-header,
            .about-image,
            .about-text,
            .portfolio-item,
            .contact-card,
            .contact-form-container
        `);

        animatedElements.forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    }

    // ===== FORMS =====
    setupForms() {
        const contactForm = document.getElementById('contact-form');

        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleContactForm(contactForm);
            });

            // Real-time validation
            const inputs = contactForm.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                input.addEventListener('blur', () => this.validateField(input));
                input.addEventListener('input', () => this.clearFieldError(input));
            });
        }
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let message = '';

        // Remove previous errors
        this.clearFieldError(field);

        // Validation rules
        switch (field.type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (value && !emailRegex.test(value)) {
                    isValid = false;
                    message = 'Por favor, insira um e-mail válido';
                }
                break;
            case 'tel':
                const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
                if (value && !phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
                    isValid = false;
                    message = 'Por favor, insira um telefone válido';
                }
                break;
        }

        // Required fields
        if (field.required && !value) {
            isValid = false;
            message = 'Este campo é obrigatório';
        }

        if (!isValid) {
            this.showFieldError(field, message);
        }

        return isValid;
    }

    showFieldError(field, message) {
        field.style.borderColor = '#ff6b35';
        
        let errorElement = field.parentNode.querySelector('.field-error');
        if (!errorElement) {
            errorElement = document.createElement('span');
            errorElement.className = 'field-error';
            errorElement.style.cssText = `
                color: #ff6b35;
                font-size: 0.875rem;
                margin-top: 4px;
                display: block;
            `;
            field.parentNode.appendChild(errorElement);
        }
        errorElement.textContent = message;
    }

    clearFieldError(field) {
        field.style.borderColor = '';
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    handleContactForm(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Validate all fields
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isFormValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });

        if (!isFormValid) {
            this.showNotification('Por favor, corrija os erros no formulário.', 'error');
            return;
        }

        // Create WhatsApp message
        const message = this.createWhatsAppMessage(data);
        const whatsappURL = `https://api.whatsapp.com/send?phone=12068804642&text=${encodeURIComponent(message)}`;

        // Show loading state
        const submitButton = form.querySelector('.form-submit');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;

        // Simulate processing time
        setTimeout(() => {
            window.open(whatsappURL, '_blank');
            
            // Reset form
            form.reset();
            
            // Reset button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            
            // Show success message
            this.showNotification('Redirecting to WhatsApp...', 'success');
        }, 1000);
    }

    createWhatsAppMessage(data) {
        let message = `🎨 *New Consultation Request - Carnauba Tattoo*\n\n`;
        message += `👤 *Name:* ${data.name}\n`;
        message += `📧 *Email:* ${data.email}\n`;
        
        if (data.phone) {
            message += `📱 *Phone:* ${data.phone}\n`;
        }
        
        if (data['tattoo-style']) {
            message += `🎯 *Style:* ${data['tattoo-style']}\n`;
        }
        
        if (data.size) {
            message += `📏 *Size:* ${data.size}\n`;
        }
        
        message += `\n💭 *Project Description:*\n${data.message || 'Not provided'}`;
        message += `\n\n_Message sent through official website_`;
        
        return message;
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'error' ? '#ff6b35' : type === 'success' ? '#28a745' : '#c9a961'};
            color: white;
            padding: 16px 24px;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
            word-wrap: break-word;
        `;
        
        notification.textContent = message;
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Auto remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }

    // ===== LIGHTBOX =====
    setupLightbox() {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');

        // Close lightbox events
        if (lightbox) {
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) {
                    this.closeLightbox();
                }
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                    this.closeLightbox();
                }
            });
        }

        // Make lightbox functions global
        window.openLightbox = (src) => {
            if (lightbox && lightboxImg) {
                lightboxImg.src = src;
                lightbox.style.display = 'flex';
                setTimeout(() => {
                    lightbox.classList.add('active');
                }, 10);
                document.body.style.overflow = 'hidden';
            }
        };

        window.closeLightbox = () => {
            if (lightbox) {
                lightbox.classList.remove('active');
                setTimeout(() => {
                    lightbox.style.display = 'none';
                }, 300);
                document.body.style.overflow = 'auto';
            }
        };
    }

    closeLightbox() {
        const lightbox = document.getElementById('lightbox');
        if (lightbox) {
            lightbox.classList.remove('active');
            setTimeout(() => {
                lightbox.style.display = 'none';
            }, 300);
            document.body.style.overflow = 'auto';
        }
    }

    // ===== BACK TO TOP =====
    setupBackToTop() {
        const backToTopButton = document.getElementById('back-to-top');

        if (backToTopButton) {
            // Show/hide button based on scroll position
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    backToTopButton.classList.add('visible');
                } else {
                    backToTopButton.classList.remove('visible');
                }
            });

            // Scroll to top on click
            backToTopButton.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    // ===== MOBILE OPTIMIZATIONS =====
    setupMobileOptimizations() {
        // Prevent zoom on input focus on iOS
        if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
            const inputs = document.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                input.addEventListener('focus', () => {
                    input.style.fontSize = '16px';
                });
                input.addEventListener('blur', () => {
                    input.style.fontSize = '';
                });
            });
        }

        // Handle orientation change
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                window.scrollTo(0, window.scrollY);
            }, 100);
        });

        // Optimize touch interactions
        let touchStartY = 0;
        document.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
        }, { passive: true });

        document.addEventListener('touchmove', (e) => {
            const touchY = e.touches[0].clientY;
            const touchDiff = touchStartY - touchY;

            // Prevent overscroll bouncing on iOS
            if (window.scrollY === 0 && touchDiff < 0) {
                e.preventDefault();
            }
        }, { passive: false });
    }

    // ===== PERFORMANCE MONITORING =====
    monitorPerformance() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = performance.timing;
                    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                    console.log(`Page load time: ${pageLoadTime}ms`);
                }, 0);
            });
        }
    }

    // ===== UTILITY METHODS =====
    debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                timeout = null;
                if (!immediate) func(...args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func(...args);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // ===== ANALYTICS & TRACKING =====
    trackEvent(action, category, label) {
        // Google Analytics 4 event tracking
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                event_category: category,
                event_label: label
            });
        }

        // Facebook Pixel event tracking
        if (typeof fbq !== 'undefined') {
            fbq('track', 'CustomEvent', {
                action: action,
                category: category,
                label: label
            });
        }
    }

    // ===== ACCESSIBILITY IMPROVEMENTS =====
    setupAccessibility() {
        // Add keyboard navigation for portfolio items
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        portfolioItems.forEach((item, index) => {
            item.setAttribute('tabindex', '0');
            item.setAttribute('role', 'button');
            item.setAttribute('aria-label', `Ver imagem ${index + 1} do portfólio`);

            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const img = item.querySelector('img');
                    if (img) {
                        window.openLightbox(img.src);
                    }
                }
            });
        });

        // Focus management for mobile menu
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    const firstLink = navMenu.querySelector('.nav-link');
                    if (firstLink) {
                        setTimeout(() => firstLink.focus(), 100);
                    }
                }
            });
        }

        // Skip to content link
        const skipLink = document.createElement('a');
        skipLink.href = '#home';
        skipLink.textContent = 'Pular para o conteúdo principal';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--primary-color);
            color: var(--secondary-color);
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 100;
            transition: top 0.3s;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
    }
}

// ===== INITIALIZE APPLICATION =====
const app = new CarnaaubaTattoo();

// ===== SERVICE WORKER REGISTRATION =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// ===== GLOBAL ERROR HANDLER =====
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    // You could send this to an error tracking service
});

// ===== ADDITIONAL FEATURES =====

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
}

// Progressive Web App features
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // Show install button
    const installButton = document.getElementById('install-app');
    if (installButton) {
        installButton.style.display = 'block';
        installButton.addEventListener('click', () => {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the A2HS prompt');
                }
                deferredPrompt = null;
            });
        });
    }
});

// Dark mode toggle (future feature)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Initialize dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CarnaaubaTattoo;
}