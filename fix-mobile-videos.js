/**
 * Script para corregir problemas de reproducción de videos en dispositivos móviles
 * Aplica automáticamente los atributos y configuraciones necesarias
 */

// Función para aplicar correcciones a videos al cargar la página
function fixMobileVideoSupport() {
    // Detectar si es un dispositivo móvil
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Obtener todos los elementos de video
    const videos = document.querySelectorAll('video');
    
    videos.forEach((video, index) => {
        // Aplicar atributos necesarios para móviles
        video.setAttribute('playsinline', 'true');
        video.setAttribute('webkit-playsinline', 'true');
        
        // En móviles, iniciar con muted para permitir autoplay
        if (isMobile) {
            video.muted = true;
            video.preload = 'metadata'; // Cambiado de 'none' a 'metadata' para mejor experiencia
        }
        
        // Añadir poster por defecto si no tiene uno
        if (!video.getAttribute('poster')) {
            video.setAttribute('poster', generateDefaultPoster(index + 1));
        }
        
        // Configurar eventos específicos para móviles
        setupMobileVideoEvents(video, isMobile);
        
        // Configurar controles mejorados
        setupEnhancedControls(video);
    });
    
    console.log(`✅ Correcciones aplicadas a ${videos.length} videos para compatibilidad móvil`);
}

// Generar poster SVG por defecto
function generateDefaultPoster(videoNumber) {
    const svgContent = `
        <svg width="1280" height="720" viewBox="0 0 1280 720" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="1280" height="720" fill="#F8FAFC"/>
            <circle cx="640" cy="360" r="60" fill="#3B82F6" opacity="0.8"/>
            <path d="M620 340L670 360L620 380V340Z" fill="white"/>
            <text x="640" y="450" font-family="Inter, sans-serif" font-size="24" text-anchor="middle" fill="#64748B">
                Video ${videoNumber} - Toca para reproducir
            </text>
        </svg>
    `;
    
    return `data:image/svg+xml;base64,${btoa(svgContent)}`;
}

// Configurar eventos específicos para móviles
function setupMobileVideoEvents(video, isMobile) {
    // Evento para activar sonido después de la primera interacción
    video.addEventListener('loadedmetadata', () => {
        const enableAudio = () => {
            video.muted = false;
            document.removeEventListener('touchend', enableAudio);
            document.removeEventListener('click', enableAudio);
        };
        
        document.addEventListener('touchend', enableAudio, { once: true });
        document.addEventListener('click', enableAudio, { once: true });
    });
    
    // Prevenir comportamiento de zoom en iOS
    if (isMobile) {
        video.addEventListener('touchend', (e) => {
            e.preventDefault();
            // Control táctil simple: toque para play/pause
            if (video.paused) {
                video.play().catch(err => {
                    console.log('Error al reproducir video:', err);
                    showVideoError(video);
                });
            } else {
                video.pause();
            }
        });
    }
    
    // Manejar errores de carga
    video.addEventListener('error', (e) => {
        console.error('Error de video:', e);
        showVideoError(video);
    });
    
    // Mejorar experiencia de carga
    video.addEventListener('loadstart', () => {
        showLoadingIndicator(video);
    });
    
    video.addEventListener('canplay', () => {
        hideLoadingIndicator(video);
    });
}

// Configurar controles mejorados
function setupEnhancedControls(video) {
    // Añadir clase para estilos personalizados
    video.classList.add('enhanced-video');
    
    // Configurar comportamiento de pantalla completa en móviles
    video.addEventListener('dblclick', () => {
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen();
        } else if (video.mozRequestFullScreen) {
            video.mozRequestFullScreen();
        }
    });
}

// Mostrar indicador de carga
function showLoadingIndicator(video) {
    const container = video.closest('.video-container');
    if (container) {
        const loader = document.createElement('div');
        loader.className = 'video-loader';
        loader.innerHTML = `
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: #3B82F6;">
                <div style="width: 40px; height: 40px; border: 4px solid #E2E8F0; border-top: 4px solid #3B82F6; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                <p style="margin-top: 1rem; font-size: 0.875rem;">Cargando video...</p>
            </div>
        `;
        container.appendChild(loader);
    }
}

// Ocultar indicador de carga
function hideLoadingIndicator(video) {
    const container = video.closest('.video-container');
    if (container) {
        const loader = container.querySelector('.video-loader');
        if (loader) {
            loader.remove();
        }
    }
}

// Mostrar error de video
function showVideoError(video) {
    const container = video.closest('.video-container');
    if (!container) return;
    
    const videoSrc = video.querySelector('source')?.src || video.src;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'video-error';
    errorDiv.innerHTML = `
        <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; background: linear-gradient(135deg, #FEF2F2 0%, #FECACA 100%); text-align: center; padding: 2rem;">
            <i class="fas fa-exclamation-triangle" style="font-size: 3rem; color: #EF4444; margin-bottom: 1rem;"></i>
            <h4 style="color: #DC2626; margin-bottom: 1rem; font-size: 1.25rem;">Error al cargar el video</h4>
            <p style="color: #7F1D1D; margin-bottom: 2rem; line-height: 1.5;">
                ${isMobile ? 
                    'En dispositivos móviles, algunos videos pueden requerir descarga.' : 
                    'No se pudo cargar el video. Puedes descargarlo para verlo.'}
            </p>
            <div style="display: flex; flex-direction: column; gap: 1rem; align-items: center;">
                ${videoSrc ? `
                    <a href="${videoSrc}" 
                       download 
                       style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.5rem; background: #EF4444; color: white; text-decoration: none; border-radius: 0.5rem; font-weight: 600; transition: all 0.3s ease;">
                        <i class="fas fa-download"></i> Descargar Video
                    </a>
                ` : ''}
                <button onclick="location.reload()" 
                        style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.5rem; background: transparent; color: #DC2626; border: 2px solid #DC2626; border-radius: 0.5rem; font-weight: 600; cursor: pointer; transition: all 0.3s ease;">
                    <i class="fas fa-refresh"></i> Recargar página
                </button>
            </div>
        </div>
    `;
    
    container.appendChild(errorDiv);
}

// Añadir estilos CSS para las mejoras
function addEnhancedVideoStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Estilos para videos mejorados */
        .enhanced-video {
            background-color: #000;
            outline: none;
        }
        
        .enhanced-video::-webkit-media-controls {
            opacity: 1;
        }
        
        .enhanced-video::-webkit-media-controls-panel {
            background-color: rgba(0, 0, 0, 0.8);
        }
        
        .enhanced-video::-webkit-media-controls-play-button {
            background-color: rgba(255, 255, 255, 0.9);
            border-radius: 50%;
        }
        
        /* Animación de carga */
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        /* Responsividad mejorada para videos */
        @media (max-width: 768px) {
            .video-container {
                margin: 1rem 0;
                border-radius: 0.5rem;
            }
            
            .enhanced-video {
                -webkit-tap-highlight-color: transparent;
            }
            
            .video-container .video-error,
            .video-container .video-loader {
                border-radius: 0.5rem;
            }
        }
        
        /* Mejorar visibilidad de controles en pantallas pequeñas */
        @media (max-width: 480px) {
            .enhanced-video::-webkit-media-controls-panel {
                background-color: rgba(0, 0, 0, 0.9);
            }
            
            .enhanced-video::-webkit-media-controls-play-button,
            .enhanced-video::-webkit-media-controls-fullscreen-button {
                min-width: 44px;
                min-height: 44px;
            }
        }
    `;
    
    document.head.appendChild(style);
}

// Función principal que se ejecuta al cargar la página
function initializeMobileVideoSupport() {
    // Esperar a que el DOM esté completamente cargado
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            addEnhancedVideoStyles();
            fixMobileVideoSupport();
        });
    } else {
        addEnhancedVideoStyles();
        fixMobileVideoSupport();
    }
    
    // También aplicar correcciones si se añaden videos dinámicamente
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === 1) { // Element node
                    const videos = node.querySelectorAll ? node.querySelectorAll('video') : [];
                    videos.forEach(video => {
                        setupMobileVideoEvents(video, /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
                        setupEnhancedControls(video);
                    });
                }
            });
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

// Exportar funciones para uso global
window.MobileVideoFix = {
    init: initializeMobileVideoSupport,
    fixVideos: fixMobileVideoSupport,
    addStyles: addEnhancedVideoStyles
};

// Auto-inicializar
initializeMobileVideoSupport();

console.log('🎥 Script de corrección de videos móviles cargado correctamente');
