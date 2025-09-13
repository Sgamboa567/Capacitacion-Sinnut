# Script para corregir todas las rutas de assets en modulos
Write-Host "Corrigiendo todas las rutas de assets en modulos..." -ForegroundColor Cyan

# Obtener todos los archivos HTML en la carpeta modulos
$htmlFiles = Get-ChildItem -Path "modulos" -Filter "*.html" -Recurse

foreach ($file in $htmlFiles) {
    Write-Host "Corrigiendo: $($file.FullName)" -ForegroundColor Yellow
    
    # Leer contenido del archivo
    $content = Get-Content -Path $file.FullName -Raw
    
    # Corregir todas las rutas de assets (de assets/ a ../../assets/)
    $content = $content -replace 'assets/', '../../assets/'
    
    # Guardar archivo actualizado
    $content | Set-Content -Path $file.FullName -Encoding UTF8
}

Write-Host "Correccion completa de rutas de assets completada!" -ForegroundColor Green
