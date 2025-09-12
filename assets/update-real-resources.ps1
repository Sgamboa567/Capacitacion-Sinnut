# Script para actualizar referencias de logo y videos actuales
Write-Host "Actualizando referencias a archivos reales..." -ForegroundColor Cyan

# Obtener todos los archivos HTML
$htmlFiles = Get-ChildItem -Path . -Filter "*.html" -Recurse

foreach ($file in $htmlFiles) {
    Write-Host "Actualizando: $($file.FullName)" -ForegroundColor Yellow
    
    # Leer contenido del archivo
    $content = Get-Content -Path $file.FullName -Raw
    
    # Reemplazar logo (usando el logo completo blanco para mejor visibilidad)
    $content = $content -replace 'assets/images/logo-institucional\.png', 'assets/images/Logos/Logo Completo Blanco.png'
    
    # Reemplazar videos con los archivos reales
    $content = $content -replace 'assets/videos/apertura-caja/video-1-introduccion\.mp4', 'assets/videos/Caja/apertura-caja/2025-09-04 16-27-28 (Copy).mp4'
    $content = $content -replace 'assets/videos/apertura-caja/video-2-paso-a-paso\.mp4', 'assets/videos/Caja/apertura-caja/2025-09-04 17-04-32 (Copy).mp4'
    
    # Guardar archivo actualizado
    $content | Set-Content -Path $file.FullName -Encoding UTF8
}

Write-Host "Actualizacion de referencias completada!" -ForegroundColor Green
