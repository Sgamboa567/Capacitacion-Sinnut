# Script simplificado para corregir videos en dispositivos móviles
param(
    [switch]$Force = $false
)

Write-Host "🎥 Aplicando correcciones de videos para dispositivos móviles..." -ForegroundColor Cyan

# Función para procesar archivos HTML
function Process-VideoFile {
    param($FilePath)
    
    try {
        $content = Get-Content -Path $FilePath -Raw -Encoding UTF8
        $originalContent = $content
        $changed = $false
        
        Write-Host "📄 Procesando: $((Get-Item $FilePath).Name)" -ForegroundColor Yellow
        
        # 1. Corregir etiquetas de video sin playsinline
        if ($content -match '<video[^>]*controls[^>]*>' -and $content -notmatch 'playsinline') {
            # Añadir atributos móviles a videos
            $content = $content -replace '(<video[^>]*controls[^>]*?)>', '$1 playsinline webkit-playsinline muted>'
            $changed = $true
            Write-Host "  ✓ Atributos móviles añadidos" -ForegroundColor Green
        }
        
        # 2. Incluir script de corrección si no existe
        if ($content -notmatch 'fix-mobile-videos\.js') {
            # Determinar ruta relativa correcta
            $relativePath = "../../fix-mobile-videos.js"
            $scriptInclude = "`n    <!-- Script para mejorar compatibilidad de videos en móviles -->`n    <script src=`"$relativePath`"></script>"
            
            if ($content -match '</head>') {
                $content = $content -replace '</head>', "$scriptInclude`n</head>"
                $changed = $true
                Write-Host "  ✓ Script de corrección incluido" -ForegroundColor Green
            }
        }
        
        # 3. Añadir estilos CSS mejorados
        if ($content -match '</style>' -and $content -notmatch 'webkit-tap-highlight-color') {
            $mobileStyles = @"

        /* Estilos mejorados para videos en móviles - Auto-generado */
        .video-container video {
            background-color: #000;
            outline: none;
            -webkit-tap-highlight-color: transparent;
        }
        
        .video-container video::-webkit-media-controls-panel {
            background-color: rgba(0, 0, 0, 0.8);
        }
        
        @media (max-width: 768px) {
            .video-container {
                will-change: transform;
                -webkit-transform: translateZ(0);
                transform: translateZ(0);
            }
            
            .video-container video::-webkit-media-controls-play-button,
            .video-container video::-webkit-media-controls-fullscreen-button {
                min-width: 44px !important;
                min-height: 44px !important;
            }
        }
"@
            $content = $content -replace '</style>', "$mobileStyles`n</style>"
            $changed = $true
            Write-Host "  ✓ Estilos CSS móviles añadidos" -ForegroundColor Green
        }
        
        # Solo guardar si hubo cambios
        if ($changed -or $Force) {
            Set-Content -Path $FilePath -Value $content -Encoding UTF8 -NoNewline
            Write-Host "  💾 Archivo actualizado exitosamente" -ForegroundColor Green
            return $true
        } else {
            Write-Host "  ℹ️  Sin cambios necesarios" -ForegroundColor Gray
            return $false
        }
        
    } catch {
        Write-Host "  ❌ Error: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Buscar archivos HTML con videos
Write-Host "🔍 Buscando archivos HTML con videos..." -ForegroundColor Cyan

$videoFiles = @()
$htmlFiles = Get-ChildItem -Path "." -Recurse -Filter "*.html"

foreach ($file in $htmlFiles) {
    $content = Get-Content -Path $file.FullName -Raw -ErrorAction SilentlyContinue
    if ($content -and $content -match '<video[^>]*>') {
        $videoFiles += $file.FullName
    }
}

Write-Host "📊 Encontrados $($videoFiles.Count) archivos con videos" -ForegroundColor Yellow

if ($videoFiles.Count -eq 0) {
    Write-Host "❌ No se encontraron archivos HTML con videos" -ForegroundColor Red
    return
}

# Procesar cada archivo
$processedCount = 0
$errorCount = 0

foreach ($file in $videoFiles) {
    if (Process-VideoFile -FilePath $file) {
        $processedCount++
    } else {
        $errorCount++
    }
}

# Resumen final
Write-Host "`n📈 RESUMEN DE CORRECCIONES:" -ForegroundColor Cyan
Write-Host "  ✅ Archivos procesados exitosamente: $processedCount" -ForegroundColor Green
Write-Host "  ❌ Archivos con errores: $errorCount" -ForegroundColor Red
Write-Host "  📁 Total de archivos encontrados: $($videoFiles.Count)" -ForegroundColor Yellow

if ($processedCount -gt 0) {
    Write-Host "`n🎉 ¡CORRECCIONES APLICADAS EXITOSAMENTE!" -ForegroundColor Green
    Write-Host "`n🔧 Cambios realizados:" -ForegroundColor White
    Write-Host "  • Atributos playsinline, webkit-playsinline y muted añadidos" -ForegroundColor Gray
    Write-Host "  • Script fix-mobile-videos.js incluido automáticamente" -ForegroundColor Gray
    Write-Host "  • Estilos CSS optimizados para dispositivos móviles" -ForegroundColor Gray
    Write-Host "  • Controles de video mejorados para pantallas táctiles" -ForegroundColor Gray
    
    Write-Host "`n📱 SIGUIENTE PASO:" -ForegroundColor Cyan
    Write-Host "Prueba los videos en un dispositivo móvil para verificar que funcionan correctamente" -ForegroundColor White
}

Write-Host "`n✨ Proceso completado" -ForegroundColor Green
