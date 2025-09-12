/**
 * 🎬 Solución simple para videos en iOS Safari
 * Un pequeño botón discreto para activar videos
 */

class SimpleIOSVideoFix {
    constructor() {
        this.videosUnlocked = false;
        this.allVideos = [];
        this.activateButton = null;
        
        this.init();
    }
    
    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }
    
    setup() {
        // Solo activar en iOS Safari
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        const isSafari = /Safari/i.test(navigator.userAgent) && !/Chrome/i.test(navigator.userAgent);
        
        if (!isIOS || !isSafari) {
            console.log('🔧 No es iOS Safari, videos funcionan normalmente');
            return;
        }
        
        console.log('🍎 iOS Safari detectado - Configurando videos');
        
        this.findVideos();
        this.configureVideos();
        this.createActivateButton();
    }
    
    findVideos() {
        this.allVideos = Array.from(document.querySelectorAll('video'));
        console.log(`🎬 ${this.allVideos.length} videos encontrados`);
    }
    
    configureVideos() {
        this.allVideos.forEach((video, index) => {
            // Configurar atributos para iOS
            video.setAttribute('playsinline', 'true');
            video.setAttribute('webkit-playsinline', 'true');
            video.setAttribute('muted', 'true');
            video.preload = 'none';
            
            // Agregar evento de click para reproducir después de activación
            video.addEventListener('click', () => this.handleVideoClick(video, index));
            
            console.log(`📹 Video ${index + 1} configurado`);
        });
    }
    
    createActivateButton() {
        // Crear botón pequeño y discreto
        this.activateButton = document.createElement('div');
        this.activateButton.innerHTML = `
            <div style="
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 1000;
                background: #007AFF;
                color: white;
                padding: 12px 16px;
                border-radius: 25px;
                box-shadow: 0 4px 12px rgba(0,122,255,0.3);
                cursor: pointer;
                font-size: 14px;
                font-weight: 600;
                display: flex;
                align-items: center;
                gap: 8px;
                transition: all 0.3s ease;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255,255,255,0.2);
            " id="ios-video-activator">
                🎬 Activar Videos
            </div>
        `;
        
        document.body.appendChild(this.activateButton);
        
        // Evento de click
        const button = document.getElementById('ios-video-activator');
        button.addEventListener('click', () => this.activateVideos());
        
        // Efecto hover
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.05)';
            button.style.background = '#0056CC';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
            button.style.background = '#007AFF';
        });
    }
    
    async activateVideos() {
        console.log('🚀 Activando videos iOS...');
        
        try {
            // Activar cada video
            for (let i = 0; i < this.allVideos.length; i++) {
                const video = this.allVideos[i];
                try {
                    video.load();
                    await video.play();
                    video.pause();
                    video.currentTime = 0;
                    console.log(`✅ Video ${i + 1} activado`);
                } catch (error) {
                    console.log(`⚠️ Video ${i + 1}: ${error.message}`);
                }
            }
            
            this.videosUnlocked = true;
            this.removeActivateButton();
            
            // Mostrar mensaje de éxito discreto
            this.showSuccessMessage();
            
        } catch (error) {
            console.error('❌ Error activando videos:', error);
        }
    }
    
    removeActivateButton() {
        if (this.activateButton && this.activateButton.parentNode) {
            const button = document.getElementById('ios-video-activator');
            button.style.opacity = '0';
            button.style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                if (this.activateButton && this.activateButton.parentNode) {
                    this.activateButton.parentNode.removeChild(this.activateButton);
                }
            }, 300);
        }
    }
    
    showSuccessMessage() {
        const message = document.createElement('div');
        message.innerHTML = `
            <div style="
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 1000;
                background: #22C55E;
                color: white;
                padding: 12px 16px;
                border-radius: 25px;
                box-shadow: 0 4px 12px rgba(34,197,94,0.3);
                font-size: 14px;
                font-weight: 600;
                display: flex;
                align-items: center;
                gap: 8px;
                opacity: 0;
                transform: scale(0.8);
                transition: all 0.3s ease;
                backdrop-filter: blur(10px);
            ">
                ✅ Videos activados
            </div>
        `;
        
        document.body.appendChild(message);
        const msgEl = message.firstElementChild;
        
        // Animación de entrada
        setTimeout(() => {
            msgEl.style.opacity = '1';
            msgEl.style.transform = 'scale(1)';
        }, 100);
        
        // Remover después de 3 segundos
        setTimeout(() => {
            msgEl.style.opacity = '0';
            msgEl.style.transform = 'scale(0.8)';
            setTimeout(() => {
                if (message && message.parentNode) {
                    message.parentNode.removeChild(message);
                }
            }, 300);
        }, 3000);
    }
    
    handleVideoClick(video, index) {
        if (!this.videosUnlocked) {
            console.log('⚠️ Videos no activados aún');
            return;
        }
        
        try {
            if (video.paused) {
                video.play();
                console.log(`▶️ Reproduciendo video ${index + 1}`);
            } else {
                video.pause();
                console.log(`⏸️ Pausando video ${index + 1}`);
            }
        } catch (error) {
            console.error(`❌ Error controlando video ${index + 1}:`, error);
        }
    }
}

// Inicializar
new SimpleIOSVideoFix();

console.log('🔧 Simple iOS Video Fix cargado');