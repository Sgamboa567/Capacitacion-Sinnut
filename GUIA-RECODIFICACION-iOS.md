# 🎬 Guía de Re-codificación para iOS Safari
# Configuración específica para arqueo-caja.mp4

## OPCIÓN 1: HandBrake (Recomendado - Gratuito)

### Descarga:
https://handbrake.fr/downloads.php

### Configuración exacta:
1. **General**:
   - Format: MP4
   - Web Optimized: ✅ Activado

2. **Video**:
   - Video Codec: H.264 (x264)
   - Framerate: 30 FPS
   - Quality: RF 23 (alta calidad)
   - Encoder Preset: Fast
   - Encoder Profile: Baseline
   - Encoder Level: 3.1

3. **Dimensions**:
   - Resolution: 1280x720 (máximo para iOS)
   - Anamorphic: None
   - Cropping: Automatic

4. **Audio**:
   - Codec: AAC (avcodec)
   - Bitrate: 128 kbps
   - Sample Rate: 48 khz

5. **Bitrate (Importante para iOS)**:
   - Average Bitrate: 1500 kbps
   - 2-Pass Encoding: ✅ Activado

## OPCIÓN 2: FFmpeg (Línea de comandos)

```bash
ffmpeg -i arqueo-caja.mp4 -c:v libx264 -profile:v baseline -level 3.1 -pix_fmt yuv420p -crf 23 -maxrate 1.5M -bufsize 3M -vf "scale=1280:720" -c:a aac -b:a 128k -ac 2 -ar 48000 -movflags +faststart arqueo-caja-ios.mp4
```

## OPCIÓN 3: Convertidor Online (Más fácil)

### CloudConvert (https://cloudconvert.com/mp4-converter):
1. Subir arqueo-caja.mp4
2. Seleccionar "MP4" como destino
3. Configuración avanzada:
   - Video Codec: h264
   - Profile: baseline
   - Resolution: 1280x720
   - Bitrate: 1500k
   - Audio Codec: aac
   - Audio Bitrate: 128k

### Online-Convert (https://video.online-convert.com/convert-to-mp4):
1. Subir archivo
2. Configuración:
   - Video Codec: H.264
   - Resolution: 1280x720
   - Bitrate: 1500 kbps
   - Audio: AAC, 128 kbps

## CONFIGURACIÓN CRÍTICA PARA iOS SAFARI:

⚠️ **MUY IMPORTANTE**:
- Profile DEBE ser "baseline" (no main, no high)
- Level 3.1 máximo
- Pixel format: yuv420p
- Fast start habilitado (movflags +faststart)
- Bitrate constante, no variable

## ARCHIVO RESULTANTE:
- Nombre: arqueo-caja-ios.mp4
- Tamaño estimado: 2-3 MB (reducción significativa)
- Duración: Misma que original
- Calidad: Óptima para web y móviles

## VALIDACIÓN POST-CONVERSIÓN:
Una vez convertido, subiremos el nuevo archivo y crearemos un test específico para verificar compatibilidad iOS Safari.
