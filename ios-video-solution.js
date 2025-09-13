/**
 * 🎬 Solución definitiva para videos en iOS Safari
 * Requiere un toque del usuario para activar la reproducción
 */

class iOSVideoManager {
    constructor() {
        this.videosUnlocked = false;
        this.allVideos = [];
        this.touchOverlay = null;
        
        this.init();
    }
    
    init() {
        // Esperar a que el DOM esté listo
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }
    
    setup() {
        // Detectar si es iOS Safari
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        const isSafari = /Safari/i.test(navigator.userAgent) && !/Chrome/i.test(navigator.userAgent);
        
        if (!isIOS || !isSafari) {
            console.log('🔧 No es iOS Safari, no se necesita activación especial');
            return;
        }
        
        console.log('🍎 iOS Safari detectado - Configurando solución de videos');
        
        // Encontrar todos los videos
        this.findAllVideos();
        
        // Crear overlay de activación
        this.createTouchOverlay();
        
        // Configurar eventos
        this.setupVideoEvents();
    }
    
    findAllVideos() {
        this.allVideos = Array.from(document.querySelectorAll('video'));
        console.log(`🎬 ${this.allVideos.length} videos encontrados`);
        
        // Configurar cada video para iOS
        this.allVideos.forEach((video, index) => {
            video.setAttribute('playsinline', 'true');
            video.setAttribute('webkit-playsinline', 'true');
            video.setAttribute('muted', 'true');
            video.preload = 'none';
            
            console.log(`📹 Video ${index + 1} configurado para iOS`);
        });
    }
    
    createTouchOverlay() {
        this.touchOverlay = document.createElement('div');
        this.touchOverlay.id = 'ios-video-overlay';
        this.touchOverlay.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                color: white;
                font-family: Arial, sans-serif;
                text-align: center;
                padding: 20px;
                box-sizing: border-box;
            ">
                <div style="
                    background: white;
                    color: #333;
                    padding: 30px;
                    border-radius: 15px;
                    max-width: 350px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                ">
                    <div style="font-size: 48px; margin-bottom: 20px;">🎬</div>
                    <h2 style="margin: 0 0 15px 0; font-size: 20px;">Activar Videos</h2>
                    <p style="margin: 0 0 25px 0; color: #666; line-height: 1.4;">
                        Para ver los videos en iOS Safari, toca el botón de abajo para activarlos.
                    </p>
                    <button id="activate-videos-btn" style="
                        background: #007AFF;
                        color: white;
                        border: none;
                        padding: 15px 30px;
                        border-radius: 8px;
                        font-size: 16px;
                        font-weight: bold;
                        cursor: pointer;
                        width: 100%;
                        transition: background 0.3s;
                    ">
                        ▶️ Activar Videos
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(this.touchOverlay);
        
        // Evento del botón
        const activateBtn = document.getElementById('activate-videos-btn');
        activateBtn.addEventListener('click', () => this.activateVideos());
        
        // También activar con cualquier toque en el overlay
        this.touchOverlay.addEventListener('click', (e) => {
            if (e.target === this.touchOverlay) {
                this.activateVideos();
            }
        });
    }
    
    async activateVideos() {
        console.log('🚀 Activando videos...');
        
        try {
            // Intentar reproducir y pausar cada video para desbloquearlo
            for (let i = 0; i < this.allVideos.length; i++) {
                const video = this.allVideos[i];
                try {
                    console.log(`🔓 Desbloqueando video ${i + 1}...`);
                    
                    // Cargar el video primero
                    video.load();
                    
                    // Reproducir y pausar inmediatamente
                    await video.play();
                    video.pause();
                    video.currentTime = 0;
                    
                    console.log(`✅ Video ${i + 1} desbloqueado`);
                } catch (error) {
                    console.log(`⚠️ Error desbloqueando video ${i + 1}:`, error.message);
                }
            }
            
            this.videosUnlocked = true;
            this.removeTouchOverlay();
            
            // Configurar controles normales
            this.setupNormalVideoControls();
            
            console.log('🎉 ¡Todos los videos activados exitosamente!');
            
        } catch (error) {
            console.error('❌ Error activando videos:', error);
        }
    }
    
    removeTouchOverlay() {
        if (this.touchOverlay && this.touchOverlay.parentNode) {
            // Animación de salida
            this.touchOverlay.style.transition = 'opacity 0.3s ease';
            this.touchOverlay.style.opacity = '0';
            
            setTimeout(() => {
                if (this.touchOverlay && this.touchOverlay.parentNode) {
                    this.touchOverlay.parentNode.removeChild(this.touchOverlay);
                }
            }, 300);
        }
    }
    
    setupVideoEvents() {
        this.allVideos.forEach((video, index) => {
            video.addEventListener('loadstart', () => {
                console.log(`📥 Video ${index + 1}: Iniciando carga`);
            });
            
            video.addEventListener('canplay', () => {
                console.log(`▶️ Video ${index + 1}: Listo para reproducir`);
            });
            
            video.addEventListener('error', (e) => {
                console.error(`❌ Video ${index + 1} error:`, e.target.error);
            });
        });
    }
    
    setupNormalVideoControls() {
        this.allVideos.forEach((video, index) => {
            // Agregar evento de click para reproducir
            video.addEventListener('click', async () => {
                if (this.videosUnlocked) {
                    try {
                        if (video.paused) {
                            await video.play();
                            console.log(`▶️ Reproduciendo video ${index + 1}`);
                        } else {
                            video.pause();
                            console.log(`⏸️ Pausando video ${index + 1}`);
                        }
                    } catch (error) {
                        console.error(`❌ Error controlando video ${index + 1}:`, error);
                    }
                }
            });
        });
    }
}

// Inicializar automáticamente
new iOSVideoManager();

console.log('🔧 iOS Video Solution cargado correctamente');