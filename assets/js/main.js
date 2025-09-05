/**
 * CAPACITACIÓN SINNUT ERP - JavaScript Principal
 * Funcionalidades globales y optimización para Canvas LMS
 * Versión 2.0 - Septiembre 2025
 */

// Configuración global
const SinnutTraining = {
    version: '2.0.0',
    canvasMode: false,
    progressData: {},
    
    // Inicialización
    init() {
        this.detectCanvasMode();
        this.loadProgress();
        this.setupEventListeners();
        this.initializeComponents();
        console.log(`Sinnut Training ${this.version} - Inicializado`);
    },

    // Detectar si estamos en iframe de Canvas LMS
    detectCanvasMode() {
        try {
            this.canvasMode = window.self !== window.top;
            if (this.canvasMode) {
                document.body.classList.add('canvas-mode');
                this.setupCanvasIntegration();
            }
        } catch (e) {
            this.canvasMode = true; // Asumir Canvas si hay error
            document.body.classList.add('canvas-mode');
        }
    },

    // Configurar integración con Canvas LMS
    setupCanvasIntegration() {
        // Comunicación con el parent frame (Canvas LMS)
        window.addEventListener('message', (event) => {
            if (event.data.type === 'canvasResize') {
                this.handleCanvasResize(event.data);
            }
        });

        // Ajustar altura automáticamente
        this.autoResizeCanvas();
        
        // Notificar a Canvas sobre carga completa
        this.notifyCanvasLoaded();
    },

    // Auto-resize para Canvas LMS
    autoResizeCanvas() {
        if (!this.canvasMode) return;

        const resizeObserver = new ResizeObserver(() => {
            const height = Math.max(
                document.documentElement.scrollHeight,
                document.body.scrollHeight
            );
            
            window.parent.postMessage({
                type: 'resize',
                height: height + 50 // Padding adicional
            }, '*');
        });

        resizeObserver.observe(document.body);
    },

    // Notificar a Canvas que la página está lista
    notifyCanvasLoaded() {
        window.parent.postMessage({
            type: 'loaded',
            timestamp: new Date().toISOString(),
            version: this.version
        }, '*');
    },

    // Configurar event listeners globales
    setupEventListeners() {
        // Navegación suave
        this.setupSmoothScroll();
        
        // Tracking de clicks
        this.setupClickTracking();
        
        // Observador de intersección para animaciones
        this.setupIntersectionObserver();
        
        // Gestión de formularios
        this.setupFormHandlers();
    },

    // Navegación suave
    setupSmoothScroll() {
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (link) {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    const offset = this.canvasMode ? 20 : 80;
                    const targetPosition = target.offsetTop - offset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    },

    // Tracking de interacciones
    setupClickTracking() {
        document.addEventListener('click', (e) => {
            const target = e.target.closest('[data-track]');
            if (target) {
                const action = target.dataset.track;
                this.trackEvent(action, {
                    element: target.tagName,
                    text: target.textContent.trim().substring(0, 50),
                    timestamp: new Date().toISOString()
                });
            }
        });
    },

    // Observador de intersección para animaciones
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -20px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Tracking de secciones vistas
                    const sectionId = entry.target.id || entry.target.dataset.section;
                    if (sectionId) {
                        this.trackEvent('section_viewed', { section: sectionId });
                    }
                }
            });
        }, observerOptions);

        // Observar secciones principales
        document.querySelectorAll('.section, .module-card, .info-card').forEach(el => {
            observer.observe(el);
        });
    },

    // Gestión de formularios
    setupFormHandlers() {
        document.addEventListener('submit', (e) => {
            const form = e.target;
            if (form.dataset.validate) {
                if (!this.validateForm(form)) {
                    e.preventDefault();
                    return false;
                }
            }
        });

        // Auto-save para formularios largos
        document.addEventListener('input', (e) => {
            if (e.target.dataset.autosave) {
                this.debounce(() => {
                    this.saveFormData(e.target.form);
                }, 1000)();
            }
        });
    },

    // Inicializar componentes interactivos
    initializeComponents() {
        this.initVideoTracking();
        this.initProgressBars();
        this.initTooltips();
        this.initModals();
        this.initCounters();
        this.initStickyNavigation();
    },

    // Tracking de videos
    initVideoTracking() {
        document.querySelectorAll('video').forEach(video => {
            let progressSent = false;
            
            video.addEventListener('loadedmetadata', () => {
                this.trackEvent('video_loaded', {
                    duration: video.duration,
                    src: video.src
                });
            });

            video.addEventListener('play', () => {
                this.trackEvent('video_played', { src: video.src });
            });

            video.addEventListener('pause', () => {
                this.trackEvent('video_paused', {
                    currentTime: video.currentTime,
                    src: video.src
                });
            });

            video.addEventListener('timeupdate', () => {
                const progress = (video.currentTime / video.duration) * 100;
                
                // Enviar progreso cada 25%
                if (progress > 25 && !progressSent) {
                    progressSent = true;
                    this.updateProgress('video', Math.floor(progress));
                }
                
                // Video completado (80% o más)
                if (progress > 80) {
                    this.updateProgress('video', 100);
                    this.trackEvent('video_completed', { src: video.src });
                }
            });
        });
    },

    // Inicializar barras de progreso
    initProgressBars() {
        document.querySelectorAll('.progress-bar').forEach(bar => {
            const target = parseInt(bar.dataset.target) || 0;
            this.animateProgressBar(bar, target);
        });
    },

    // Animar barra de progreso
    animateProgressBar(bar, target) {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            bar.style.width = current + '%';
            bar.textContent = Math.round(current) + '%';
        }, 20);
    },

    // Inicializar tooltips
    initTooltips() {
        document.querySelectorAll('[data-tooltip]').forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                this.showTooltip(e.target, e.target.dataset.tooltip);
            });
            
            element.addEventListener('mouseleave', () => {
                this.hideTooltip();
            });
        });
    },

    // Mostrar tooltip
    showTooltip(element, text) {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = text;
        tooltip.style.cssText = `
            position: absolute;
            background: var(--primary-color);
            color: white;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 0.875rem;
            white-space: nowrap;
            z-index: 1000;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.2s ease;
        `;
        
        document.body.appendChild(tooltip);
        
        const rect = element.getBoundingClientRect();
        tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
        
        setTimeout(() => tooltip.style.opacity = '1', 10);
        
        this.currentTooltip = tooltip;
    },

    // Ocultar tooltip
    hideTooltip() {
        if (this.currentTooltip) {
            this.currentTooltip.remove();
            this.currentTooltip = null;
        }
    },

    // Inicializar modales
    initModals() {
        document.addEventListener('click', (e) => {
            if (e.target.dataset.modal) {
                this.openModal(e.target.dataset.modal);
            }
            
            if (e.target.classList.contains('modal-close') || 
                e.target.classList.contains('modal-overlay')) {
                this.closeModal();
            }
        });

        // Cerrar modal con ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.currentModal) {
                this.closeModal();
            }
        });
    },

    // Abrir modal
    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            this.currentModal = modal;
            
            setTimeout(() => {
                modal.classList.add('modal-open');
            }, 10);
        }
    },

    // Cerrar modal
    closeModal() {
        if (this.currentModal) {
            this.currentModal.classList.remove('modal-open');
            setTimeout(() => {
                this.currentModal.style.display = 'none';
                document.body.style.overflow = '';
                this.currentModal = null;
            }, 300);
        }
    },

    // Inicializar contadores animados
    initCounters() {
        document.querySelectorAll('[data-counter]').forEach(counter => {
            const target = parseInt(counter.dataset.counter);
            const duration = parseInt(counter.dataset.duration) || 2000;
            this.animateCounter(counter, target, duration);
        });
    },

    // Animar contador
    animateCounter(element, target, duration) {
        const start = parseInt(element.textContent) || 0;
        const increment = (target - start) / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.round(current);
        }, 16);
    },

    // Gestión de progreso
    updateProgress(section, progress) {
        this.progressData[section] = progress;
        this.saveProgress();
        
        // Notificar a Canvas LMS
        if (this.canvasMode) {
            window.parent.postMessage({
                type: 'progress',
                section: section,
                progress: progress,
                totalProgress: this.calculateTotalProgress()
            }, '*');
        }
        
        this.trackEvent('progress_updated', {
            section: section,
            progress: progress
        });
    },

    // Calcular progreso total
    calculateTotalProgress() {
        const sections = Object.keys(this.progressData);
        if (sections.length === 0) return 0;
        
        const total = sections.reduce((sum, section) => {
            return sum + this.progressData[section];
        }, 0);
        
        return Math.round(total / sections.length);
    },

    // Guardar progreso localmente
    saveProgress() {
        try {
            localStorage.setItem('sinnut_training_progress', JSON.stringify(this.progressData));
        } catch (e) {
            console.warn('No se pudo guardar el progreso localmente');
        }
    },

    // Cargar progreso guardado
    loadProgress() {
        try {
            const saved = localStorage.getItem('sinnut_training_progress');
            if (saved) {
                this.progressData = JSON.parse(saved);
            }
        } catch (e) {
            console.warn('No se pudo cargar el progreso guardado');
            this.progressData = {};
        }
    },

    // Tracking de eventos
    trackEvent(action, data = {}) {
        const event = {
            action: action,
            data: data,
            timestamp: new Date().toISOString(),
            page: window.location.pathname,
            userAgent: navigator.userAgent,
            canvasMode: this.canvasMode
        };
        
        // Enviar a Canvas LMS si está disponible
        if (this.canvasMode) {
            window.parent.postMessage({
                type: 'analytics',
                event: event
            }, '*');
        }
        
        // Log local para debugging
        console.log('Event tracked:', event);
        
        // Aquí podrías enviar a Google Analytics, etc.
    },

    // Utilidades
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Validación de formularios
    validateForm(form) {
        let isValid = true;
        const errors = [];
        
        form.querySelectorAll('[required]').forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                errors.push(`${field.name || field.id} es requerido`);
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        });
        
        if (!isValid) {
            this.showNotification('Por favor completa todos los campos requeridos', 'error');
        }
        
        return isValid;
    },

    // Guardar datos de formulario
    saveFormData(form) {
        if (!form) return;
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        try {
            localStorage.setItem(`form_${form.id}`, JSON.stringify(data));
        } catch (e) {
            console.warn('No se pudo guardar los datos del formulario');
        }
    },

    // Mostrar notificaciones
    showNotification(message, type = 'info', duration = 5000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.remove()">&times;</button>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'error' ? '#ff4757' : type === 'success' ? '#2ed573' : '#3742fa'};
            color: white;
            padding: 16px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            max-width: 300px;
            animation: slideIn 0.3s ease;
            display: flex;
            align-items: center;
            gap: 12px;
        `;
        
        document.body.appendChild(notification);
        
        if (duration > 0) {
            setTimeout(() => {
                notification.remove();
            }, duration);
        }
    },

    // Manejo de errores
    handleError(error, context = '') {
        console.error('Error en Sinnut Training:', error, context);
        
        this.trackEvent('error', {
            message: error.message,
            context: context,
            stack: error.stack
        });
        
        // No mostrar errores técnicos al usuario en producción
        if (process.env.NODE_ENV === 'development') {
            this.showNotification(`Error: ${error.message}`, 'error');
        }
    },

    // ====================================
    // NAVEGACIÓN STICKY Y SCROLL
    // ====================================
    
    // Inicializar navegación sticky
    initStickyNavigation() {
        // Crear navegación sticky
        this.createStickyNav();
        
        // Setup scroll listeners
        this.setupScrollListeners();
        
        // Crear botón scroll to top
        this.createScrollToTopButton();
    },
    
    // Crear barra de navegación sticky
    createStickyNav() {
        // Buscar logo existente
        const existingLogo = document.querySelector('img[alt*="Logo"]');
        const logoSrc = existingLogo ? existingLogo.src : 'assets/images/Logos/Logo Completo Blanco.png';
        
        // Obtener título de la página
        const pageTitle = document.title.split(' - ')[0] || 'Capacitación Sinnut ERP';
        
        // Crear elemento sticky nav
        const stickyNav = document.createElement('div');
        stickyNav.className = 'sticky-nav';
        stickyNav.innerHTML = `
            <div class="sticky-nav-content">
                <img src="${logoSrc}" alt="Logo" class="logo">
                <h3 class="nav-title">${pageTitle}</h3>
                <div class="nav-actions">
                    <a href="../../index.html" class="btn btn-sm btn-outline">🏠 Inicio</a>
                    <button class="btn btn-sm btn-secondary" onclick="SinnutTraining.toggleProgress()">📊 Progreso</button>
                </div>
            </div>
        `;
        
        // Insertar al inicio del body
        document.body.insertBefore(stickyNav, document.body.firstChild);
        
        this.stickyNav = stickyNav;
    },
    
    // Configurar listeners de scroll
    setupScrollListeners() {
        let lastScrollY = window.scrollY;
        let ticking = false;
        
        const updateNavigation = () => {
            const currentScrollY = window.scrollY;
            
            // Mostrar/ocultar navegación sticky
            if (currentScrollY > 100) {
                this.stickyNav.classList.add('visible');
                document.body.classList.add('has-sticky-nav');
            } else {
                this.stickyNav.classList.remove('visible');
                document.body.classList.remove('has-sticky-nav');
            }
            
            // Mostrar/ocultar botón scroll to top
            if (currentScrollY > 300) {
                this.scrollToTopBtn?.classList.add('visible');
            } else {
                this.scrollToTopBtn?.classList.remove('visible');
            }
            
            lastScrollY = currentScrollY;
            ticking = false;
        };
        
        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateNavigation);
                ticking = true;
            }
        };
        
        window.addEventListener('scroll', requestTick, { passive: true });
    },
    
    // Crear botón scroll to top
    createScrollToTopButton() {
        const scrollBtn = document.createElement('button');
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.innerHTML = '⬆️';
        scrollBtn.title = 'Volver arriba';
        
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        document.body.appendChild(scrollBtn);
        this.scrollToTopBtn = scrollBtn;
    },
    
    // Toggle panel de progreso
    toggleProgress() {
        // Implementar panel de progreso (opcional)
        console.log('Progress panel toggled');
    }
};

// Estilos adicionales para componentes JavaScript
const additionalStyles = `
    .canvas-mode .main-container {
        margin: 0;
        border-radius: 0;
        box-shadow: none;
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .notification {
        font-family: inherit;
        font-size: 0.9rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: inherit;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .error {
        border-color: #ff4757 !important;
        box-shadow: 0 0 0 2px rgba(255, 71, 87, 0.2) !important;
    }
    
    .tooltip {
        font-family: inherit;
    }
    
    @media (max-width: 768px) {
        .notification {
            right: 10px;
            left: 10px;
            max-width: none;
        }
    }
`;

// Inyectar estilos adicionales
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => SinnutTraining.init());
} else {
    SinnutTraining.init();
}

// Exportar para uso global
window.SinnutTraining = SinnutTraining;
