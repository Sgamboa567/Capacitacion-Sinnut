# 📁 Estructura de Recursos - Capacitación Sinnut ERP

## 🎯 Propósito
Esta carpeta contiene todos los recursos multimedia y documentos necesarios para el curso de capacitación, alojados localmente para garantizar disponibilidad y rendimiento óptimo.

## 📂 Estructura de Carpetas

### 🖼️ `/assets/images/`
**Imágenes del curso**
- `logo-institucional.png` - Logo principal (reemplazar la URL externa)
- `video-placeholder.jpg` - Imagen de fondo para videos
- `module-icons/` - Iconos específicos de cada módulo
- `screenshots/` - Capturas de pantalla del sistema

### 🎬 `/assets/videos/`
**Videos instructivos**
- `apertura-caja/`
  - `video-1-introduccion.mp4` - Video de introducción (ID: 73)
  - `video-2-paso-a-paso.mp4` - Video paso a paso (ID: 72)
- `arqueo-caja/`
  - `video-arqueo-completo.mp4` - Video del proceso (ID: 71)
- `contratos/` - Videos del módulo de contratos
- `facturas/` - Videos del módulo de facturas

### 📄 `/assets/documents/`
**Documentos de apoyo**
- `instructivos/`
  - `arqueo-caja-instructivo.pdf` - Instructivo detallado (ID: 70)
- `plantillas/` - Plantillas para práctica
- `manuales/` - Manuales de referencia

## 🔄 Migración de Recursos

### URLs Externas a Reemplazar:

#### 🖼️ Logo:
```
ANTES: https://aula.aynn.pro/files/81
DESPUÉS: assets/images/logo-institucional.png
```

#### 🎬 Videos:
```
ANTES: https://aula.aynn.pro/files/73/download?download_frd=1
DESPUÉS: assets/videos/apertura-caja/video-1-introduccion.mp4

ANTES: https://aula.aynn.pro/files/72/download?download_frd=1
DESPUÉS: assets/videos/apertura-caja/video-2-paso-a-paso.mp4

ANTES: /courses/1/files/71/download
DESPUÉS: assets/videos/arqueo-caja/video-arqueo-completo.mp4
```

#### 📄 Documentos:
```
ANTES: https://aula.aynn.pro/courses/1/files/70/download
DESPUÉS: assets/documents/instructivos/arqueo-caja-instructivo.pdf
```

## 📋 Lista de Tareas

### ✅ Pasos para implementar:

1. **Descargar recursos desde Canvas LMS:**
   - [ ] Logo institucional (ID: 81)
   - [ ] Video apertura 1 (ID: 73)
   - [ ] Video apertura 2 (ID: 72)
   - [ ] Video arqueo (ID: 71)
   - [ ] Instructivo PDF (ID: 70)

2. **Colocar archivos en carpetas:**
   - [ ] Renombrar archivos con nombres descriptivos
   - [ ] Organizar por módulos
   - [ ] Optimizar tamaños si es necesario

3. **Actualizar referencias en HTML:**
   - [ ] Reemplazar URLs del logo en todos los archivos
   - [ ] Actualizar src de videos
   - [ ] Corregir enlaces de documentos

## ⚠️ Consideraciones Importantes

### 📏 Tamaño de Archivos:
- **Logo:** Máximo 500KB, formato PNG/SVG
- **Videos:** Máximo 50MB cada uno, formato MP4
- **Documentos:** Máximo 10MB, formato PDF

### 🔧 Optimización:
- Comprimir videos manteniendo calidad
- Usar formatos web-optimizados
- Crear versiones responsive de imágenes

### 🌐 Compatibilidad:
- Todos los navegadores modernos
- Dispositivos móviles y escritorio
- Canvas LMS iframe

## 🚀 Beneficios de Alojar Localmente

### ✅ Ventajas:
- ✅ **Independencia:** No depende de servicios externos
- ✅ **Velocidad:** Carga más rápida desde el mismo servidor
- ✅ **Confiabilidad:** Siempre disponible
- ✅ **Control:** Total control sobre los recursos
- ✅ **Offline:** Funciona sin conexión a Canvas
- ✅ **Versionado:** Control de versiones con Git

### 🎯 Resultado:
Un curso completamente autónomo y portable que puede funcionar en cualquier entorno web.
