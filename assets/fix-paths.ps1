# Script para corregir rutas de CSS y JS en archivos de modulos
Write-Host "Corrigiendo rutas de CSS y JS en modulos..." -ForegroundColor Cyan

# Obtener todos los archivos HTML en la carpeta modulos
$htmlFiles = Get-ChildItem -Path "modulos" -Filter "*.html" -Recurse

foreach ($file in $htmlFiles) {
    Write-Host "Corrigiendo: $($file.FullName)" -ForegroundColor Yellow
    
    # Leer contenido del archivo
    $content = Get-Content -Path $file.FullName -Raw
    
    # Corregir rutas CSS (de ../assets a ../../assets)
    $content = $content -replace '\.\.\/assets\/css\/main\.css', '../../assets/css/main.css'
    
    # Corregir rutas JS (de ../assets a ../../assets)
    $content = $content -replace '\.\.\/assets\/js\/main\.js', '../../assets/js/main.js'
    
    # Guardar archivo actualizado
    $content | Set-Content -Path $file.FullName -Encoding UTF8
}

Write-Host "Correccion de rutas completada!" -ForegroundColor Green
