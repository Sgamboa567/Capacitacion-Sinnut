/**
 * 🎬 Solución limpia y efectiva para videos en iOS Safari
 * Implementación minimalista que funciona de manera confiable
 */

class IOSVideoManager {
    constructor() {
        this.isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        this.isSafari = /Safari/i.test(navigator.userAgent) && !/Chrome/i.test(navigator.userAgent);
        this.videosReady = false;
        this.videos = [];
        
        if (this.isIOS && this.isSafari) {
            this.init();
        } else {
            console.log('🔧 No es iOS Safari - Videos funcionan normalmente');
        }
    }
    
    init() {
        console.log('🍎 iOS Safari detectado - Iniciando configuración');
        
        // Esperar que el DOM esté listo
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }
    
    setup() {
        this.findAndConfigureVideos();
        this.createActivationInterface();
        this.setupGlobalTouchHandler();
    }
    
    findAndConfigureVideos() {
        this.videos = Array.from(document.querySelectorAll('video'));
        
        this.videos.forEach((video, index) => {
            // Configuración estricta para iOS
            video.setAttribute('playsinline', '');
            video.setAttribute('webkit-playsinline', '');
            video.muted = true;
            video.autoplay = false;
            video.preload = 'none';
            video.controls = true;
            
            // Remover eventos existentes
            video.removeAttribute('autoplay');
            
            // Agregar clase para identificación
            video.classList.add('ios-video');
            video.dataset.videoIndex = index;
            
            console.log(`📹 Video ${index + 1} configurado para iOS`);
        });
    }
    
    createActivationInterface() {
        // Crear botón de activación más visible pero no invasivo
        const activationBtn = document.createElement('div');
        activationBtn.id = 'ios-video-activator';
        activationBtn.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(0, 122, 255, 0.95);
                color: white;
                padding: 20px 30px;
                border-radius: 15px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                z-index: 10000;
                box-shadow: 0 8px 32px rgba(0, 122, 255, 0.4);
                backdrop-filter: blur(10px);
                border: 2px solid rgba(255, 255, 255, 0.2);
                display: flex;
                align-items: center;
                gap: 12px;
                transition: all 0.3s ease;
                font-family: system-ui, -apple-system, sans-serif;
            ">
                <span style="font-size: 24px;">🎬</span>
                <span>Toca para activar videos</span>
            </div>
        `;
        
        document.body.appendChild(activationBtn);
        
        // Evento de activación
        activationBtn.addEventListener('click', () => this.activateVideos());
        
        // Efecto hover
        const btnEl = activationBtn.firstElementChild;
        btnEl.addEventListener('mouseenter', () => {
            btnEl.style.transform = 'translate(-50%, -50%) scale(1.05)';
        });
        btnEl.addEventListener('mouseleave', () => {
            btnEl.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    }
    
    setupGlobalTouchHandler() {
        // Handler global para cualquier toque en la pantalla
        document.addEventListener('touchstart', () => {
            if (!this.videosReady) {
                this.prepareVideosForPlayback();
            }
        }, { once: true, passive: true });
    }
    
    async activateVideos() {
        console.log('🚀 Activando videos para iOS...');
        
        const activatorEl = document.getElementById('ios-video-activator');
        
        try {
            // Animación de carga
            const btnContent = activatorEl.firstElementChild;
            btnContent.innerHTML = `
                <span style="font-size: 24px;">⏳</span>
                <span>Activando videos...</span>
            `;
            
            // Preparar cada video
            for (let i = 0; i < this.videos.length; i++) {
                const video = this.videos[i];
                await this.prepareVideoForIOS(video, i + 1);
            }
            
            this.videosReady = true;
            this.showSuccessAndRemove(activatorEl);
            
        } catch (error) {
            console.error('❌ Error activando videos:', error);
            this.showError(activatorEl);
        }
    }
    
    async prepareVideoForIOS(video, videoNumber) {
        try {
            console.log(`🔧 Preparando video ${videoNumber}...`);
            
            // Cargar metadata primero
            video.load();
            
            // Esperar a que esté listo
            await new Promise((resolve, reject) => {
                const timeout = setTimeout(() => reject(new Error('Timeout')), 5000);
                
                video.addEventListener('loadedmetadata', () => {
                    clearTimeout(timeout);
                    resolve();
                }, { once: true });
                
                video.addEventListener('error', () => {
                    clearTimeout(timeout);
                    reject(new Error(`Error cargando video ${videoNumber}`));
                }, { once: true });
            });
            
            // Intentar reproducir y pausar inmediatamente para "desbloquearlo"
            const playPromise = video.play();
            if (playPromise !== undefined) {
                await playPromise;
                video.pause();
                video.currentTime = 0;
            }
            
            // Configurar evento de click para reproducción normal
            video.addEventListener('click', async () => {
                try {
                    if (video.paused) {
                        await video.play();
                        console.log(`▶️ Reproduciendo video ${videoNumber}`);
                    } else {
                        video.pause();
                        console.log(`⏸️ Pausando video ${videoNumber}`);
                    }
                } catch (err) {
                    console.error(`❌ Error controlando video ${videoNumber}:`, err);
                }
            });
            
            console.log(`✅ Video ${videoNumber} listo para reproducción`);
            
        } catch (error) {
            console.error(`⚠️ Error preparando video ${videoNumber}:`, error.message);
        }
    }
    
    prepareVideosForPlayback() {
        // Método alternativo sin botón
        this.videos.forEach(async (video, index) => {
            try {
                video.load();
                const playPromise = video.play();
                if (playPromise !== undefined) {
                    await playPromise;
                    video.pause();
                    video.currentTime = 0;
                }
                console.log(`🔓 Video ${index + 1} desbloqueado por toque`);
            } catch (error) {
                console.log(`⚠️ Video ${index + 1} no se pudo desbloquear:`, error.message);
            }
        });
        this.videosReady = true;
    }
    
    showSuccessAndRemove(activatorEl) {
        const btnContent = activatorEl.firstElementChild;
        btnContent.innerHTML = `
            <span style="font-size: 24px;">✅</span>
            <span>¡Videos activados!</span>
        `;
        btnContent.style.background = 'rgba(34, 197, 94, 0.95)';
        
        setTimeout(() => {
            activatorEl.style.opacity = '0';
            activatorEl.style.transform = 'scale(0.8)';
            setTimeout(() => {
                if (activatorEl.parentNode) {
                    activatorEl.parentNode.removeChild(activatorEl);
                }
            }, 300);
        }, 2000);
    }
    
    showError(activatorEl) {
        const btnContent = activatorEl.firstElementChild;
        btnContent.innerHTML = `
            <span style="font-size: 24px;">❌</span>
            <span>Error - Intenta de nuevo</span>
        `;
        btnContent.style.background = 'rgba(239, 68, 68, 0.95)';
        
        setTimeout(() => {
            btnContent.innerHTML = `
                <span style="font-size: 24px;">🎬</span>
                <span>Toca para activar videos</span>
            `;
            btnContent.style.background = 'rgba(0, 122, 255, 0.95)';
        }, 3000);
    }
}

// Inicializar automáticamente
document.addEventListener('DOMContentLoaded', () => {
    new IOSVideoManager();
});

console.log('🔧 iOS Video Cleaner cargado');