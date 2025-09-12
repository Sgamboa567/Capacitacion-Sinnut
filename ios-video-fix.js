// Script específico para iOS Safari - Solución de interacción de usuario
// Este script debe incluirse en TODOS los archivos HTML con videos

(function() {
    'use strict';
    
    let userInteracted = false;
    
    // Función para habilitar reproducción de videos después de interacción
    function enableVideoPlayback() {
        if (userInteracted) return;
        
        console.log('🍎 iOS Safari: Habilitando reproducción de videos después de interacción');
        
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            // Preparar el video para reproducción
            video.load();
            
            // Intentar reproducir silenciosamente (esto "desbloquea" la reproducción)
            const playPromise = video.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    // Pausar inmediatamente después de "desbloquear"
                    video.pause();
                    video.currentTime = 0;
                    console.log('✅ Video desbloqueado para reproducción:', video.id || 'video sin ID');
                }).catch(error => {
                    console.log('⚠️ No se pudo desbloquear video:', error.message);
                });
            }
        });
        
        userInteracted = true;
    }
    
    // Detectar primera interacción del usuario
    function setupUserInteractionDetection() {
        const events = ['touchstart', 'touchend', 'click', 'scroll', 'keydown'];
        
        function handleFirstInteraction() {
            enableVideoPlayback();
            
            // Remover listeners después de la primera interacción
            events.forEach(event => {
                document.removeEventListener(event, handleFirstInteraction, true);
            });
        }
        
        // Agregar listeners para detectar primera interacción
        events.forEach(event => {
            document.addEventListener(event, handleFirstInteraction, true);
        });
    }
    
    // Configuración específica para iOS Safari
    function setupIOSVideoOptimizations() {
        const videos = document.querySelectorAll('video');
        
        videos.forEach(video => {
            // Asegurar atributos correctos para iOS
            video.setAttribute('playsinline', 'true');
            video.setAttribute('webkit-playsinline', 'true');
            video.setAttribute('muted', 'true');
            video.setAttribute('preload', 'none');
            
            // Listener para manejar errores de carga
            video.addEventListener('error', function(e) {
                console.error('❌ Error cargando video:', this.src, e);
            });
            
            // Listener para cuando el video esté listo
            video.addEventListener('canplaythrough', function() {
                console.log('✅ Video listo para reproducir:', this.id || this.src);
            });
            
            // Mejorar compatibilidad con iOS
            video.addEventListener('loadstart', function() {
                console.log('📥 Iniciando carga de video:', this.id || this.src);
            });
        });
    }
    
    // Inicializar cuando el DOM esté listo
    function init() {
        console.log('🚀 Inicializando optimizaciones de video para iOS Safari');
        setupIOSVideoOptimizations();
        setupUserInteractionDetection();
    }
    
    // Ejecutar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();