# Script de Descarga de Recursos
# Este archivo contiene las instrucciones y URLs para descargar todos los recursos necesarios

## ðŸ"¥ RECURSOS PARA DESCARGAR

### 1. Logo Institucional
```
URL: https://aula.aynn.pro/files/81
Destino: assets/images/logo-institucional.png
Descripción: Logo oficial de la institución
```

### 2. Videos de Apertura de Caja
```
URL: https://aula.aynn.pro/files/73/download?download_frd=1
Destino: assets/videos/apertura-caja/video-1-introduccion.mp4
Descripción: Video introductorio

URL: https://aula.aynn.pro/files/72/download?download_frd=1
Destino: assets/videos/apertura-caja/video-2-paso-a-paso.mp4
Descripción: Tutorial paso a paso
```

### 3. Video de Arqueo de Caja
```
URL: /courses/1/files/71/download (desde Canvas LMS)
Destino: assets/videos/arqueo-caja/video-arqueo-completo.mp4
Descripción: Proceso completo de arqueo
```

### 4. Documentos PDF
```
URL: https://aula.aynn.pro/courses/1/files/70/download
Destino: assets/documents/instructivos/arqueo-caja-instructivo.pdf
Descripción: Manual de instrucciones
```

## ðŸ"§ HERRAMIENTAS DE DESCARGA

### PowerShell (Windows) - Descarga automática:
```powershell
# Crear función de descarga
function Download-Resource {
    param($url, $output)
    try {
        Write-Host "ðŸ"¥ Descargando: $url"
        Invoke-WebRequest -Uri $url -OutFile $output -UserAgent "Mozilla/5.0"
        Write-Host "âœ… Completado: $output"
    } catch {
        Write-Host "âŒ Error descargando $url : $($_.Exception.Message)"
    }
}

# Ejecutar descargas (requiere acceso a Canvas LMS)
Download-Resource "https://aula.aynn.pro/files/81" "assets/images/logo-institucional.png"
Download-Resource "https://aula.aynn.pro/files/73/download?download_frd=1" "assets/videos/apertura-caja/video-1-introduccion.mp4"
Download-Resource "https://aula.aynn.pro/files/72/download?download_frd=1" "assets/videos/apertura-caja/video-2-paso-a-paso.mp4"
Download-Resource "https://aula.aynn.pro/courses/1/files/70/download" "assets/documents/instructivos/arqueo-caja-instructivo.pdf"
```

### cURL (Linux/Mac/Windows WSL):
```bash
# Logo
curl -o assets/images/logo-institucional.png "https://aula.aynn.pro/files/81"

# Videos
curl -o assets/videos/apertura-caja/video-1-introduccion.mp4 "https://aula.aynn.pro/files/73/download?download_frd=1"
curl -o assets/videos/apertura-caja/video-2-paso-a-paso.mp4 "https://aula.aynn.pro/files/72/download?download_frd=1"

# Documentos
curl -o assets/documents/instructivos/arqueo-caja-instructivo.pdf "https://aula.aynn.pro/courses/1/files/70/download"
```

## â ï¸ CONSIDERACIONES IMPORTANTES

1. **Autenticación**: Algunas URLs pueden requerir estar autenticado en Canvas LMS
2. **Cookies**: Es posible que necesites copiar las cookies de tu sesión de Canvas
3. **Descarga Manual**: Si la descarga automática falla, usa el navegador para descargar manualmente
4. **Verificación**: Después de descargar, verifica que los archivos no estén corruptos
5. **Optimización**: Considera comprimir videos si son muy grandes (>10MB)

## ðŸ" VERIFICACIÓN POST-DESCARGA

Ejecuta esto para verificar que todos los archivos estén presentes:
```powershell
$requiredFiles = @(
    "assets/images/logo-institucional.png",
    "assets/videos/apertura-caja/video-1-introduccion.mp4",
    "assets/videos/apertura-caja/video-2-paso-a-paso.mp4",
    "assets/videos/arqueo-caja/video-arqueo-completo.mp4",
    "assets/documents/instructivos/arqueo-caja-instructivo.pdf"
)

foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "âœ… $file - OK"
    } else {
        Write-Host "âŒ $file - FALTANTE"
    }
}
```
