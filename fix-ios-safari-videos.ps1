# Script para corregir videos iOS Safari
# Aplicar configuración específica para iOS Safari 18.6

$htmlFiles = @(
    "modulos/contabilidad/apertura-caja.html",
    "modulos/contabilidad/arqueo-caja.html",
    "modulos/facturas/factura-de-venta.html",
    "modulos/facturas/crear-plan-separe.html",
    "modulos/facturas/abonar-facturar-plan-separe.html",
    "modulos/facturas/consultar-plan-separe.html",
    "modulos/contratos/crear-contrato.html",
    "modulos/contratos/consultar-contrato.html",
    "modulos/contratos/pagar-prorroga.html",
    "modulos/contratos/pagar-retroventa.html"
)

Write-Host "🔧 CORRIGIENDO VIDEOS PARA iOS SAFARI 18.6..." -ForegroundColor Yellow
Write-Host ""

foreach ($file in $htmlFiles) {
    if (Test-Path $file) {
        Write-Host "📁 Procesando: $file" -ForegroundColor Cyan
        
        $content = Get-Content $file -Raw
        
        # Patrón para encontrar tags de video
        $videoPattern = '(<video[^>]*?)(\s+playsinline[^>]*?)(\s+webkit-playsinline[^>]*?)([^>]*>)'
        
        # Nueva configuración optimizada para iOS Safari
        $newVideoConfig = '$1 controls preload="none" playsinline="true" webkit-playsinline="true" muted="true" x-webkit-airplay="allow"$4'
        
        # Aplicar cambios
        $newContent = $content -replace $videoPattern, $newVideoConfig
        
        # Agregar CSS específico para iOS si no existe
        $iosCSS = @"
        /* iOS Safari Video Fix */
        video {
            -webkit-playsinline: true;
            -webkit-appearance: none;
            background-color: #000;
        }
        
        @media (-webkit-video-playable-inline) {
            video {
                -webkit-playsinline: true;
            }
        }
"@
        
        if ($newContent -notmatch "iOS Safari Video Fix") {
            $newContent = $newContent -replace '(</style>)', "$iosCSS`n        `$1"
        }
        
        # Guardar archivo
        Set-Content $file -Value $newContent -Encoding UTF8
        
        Write-Host "✅ Archivo actualizado" -ForegroundColor Green
    } else {
        Write-Host "❌ Archivo no encontrado: $file" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "🎉 ¡CORRECCIÓN COMPLETA!" -ForegroundColor Green
Write-Host "Videos optimizados para iOS Safari 18.6" -ForegroundColor White