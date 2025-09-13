# PowerShell script para actualizar referencias de recursos externos a locales
Write-Host "Actualizando referencias de recursos externos a locales..." -ForegroundColor Cyan

# Obtener todos los archivos HTML
$htmlFiles = Get-ChildItem -Path . -Filter "*.html" -Recurse

foreach ($file in $htmlFiles) {
    Write-Host "Actualizando: $($file.FullName)" -ForegroundColor Yellow
    
    # Leer contenido del archivo
    $content = Get-Content -Path $file.FullName -Raw
    
    # Reemplazar logo
    $content = $content -replace 'https://aula\.aynn\.pro/files/81', 'assets/images/logo-institucional.png'
    
    # Reemplazar videos
    $content = $content -replace 'https://aula\.aynn\.pro/files/73/download\?download_frd=1', 'assets/videos/apertura-caja/video-1-introduccion.mp4'
    $content = $content -replace 'https://aula\.aynn\.pro/files/72/download\?download_frd=1', 'assets/videos/apertura-caja/video-2-paso-a-paso.mp4'
    $content = $content -replace '/courses/1/files/71/download', 'assets/videos/arqueo-caja/video-arqueo-completo.mp4'
    
    # Reemplazar documentos
    $content = $content -replace 'https://aula\.aynn\.pro/courses/1/files/70/download', 'assets/documents/instructivos/arqueo-caja-instructivo.pdf'
    
    # Guardar archivo actualizado
    $content | Set-Content -Path $file.FullName -Encoding UTF8
}

Write-Host "Actualizacion completada!" -ForegroundColor Green
Write-Host "Proximos pasos:" -ForegroundColor White
Write-Host "1. Descargar los recursos desde Canvas LMS" -ForegroundColor White
Write-Host "2. Colocarlos en las carpetas correspondientes" -ForegroundColor White
Write-Host "3. Verificar que todos los enlaces funcionen" -ForegroundColor White
