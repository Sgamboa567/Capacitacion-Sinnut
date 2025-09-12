# Script de PowerShell para corregir problemas de videos en dispositivos móviles
# Aplica las correcciones necesarias a todos los archivos HTML que contienen videos

Write-Host "🎥 Iniciando corrección de videos para dispositivos móviles..." -ForegroundColor Cyan

# Obtener la ruta base del proyecto
$basePath = $PSScriptRoot
if (-not $basePath) {
    $basePath = Get-Location
}

Write-Host "📂 Ruta base: $basePath" -ForegroundColor Gray

# Buscar todos los archivos HTML que contienen elementos de video
$videoFiles = Get-ChildItem -Path $basePath -Recurse -Filter "*.html" | Where-Object {
    $content = Get-Content $_.FullName -Raw -ErrorAction SilentlyContinue
    $content -match '<video.*?>' -and $content -notmatch 'playsinline'
}

Write-Host "📁 Encontrados $($videoFiles.Count) archivos con videos para corregir" -ForegroundColor Yellow

$correctedFiles = 0
$errorFiles = 0

foreach ($file in $videoFiles) {
    try {
        Write-Host "🔧 Procesando: $($file.Name)" -ForegroundColor Green
        
        $content = Get-Content $file.FullName -Raw -Encoding UTF8
        $originalContent = $content
        
        # 1. Añadir atributos playsinline y webkit-playsinline a videos
        $content = $content -replace '<video([^>]*?)(?<!playsinline)(?<!webkit-playsinline)>', '<video$1 playsinline webkit-playsinline>'
        
        # 2. Añadir muted por defecto para permitir autoplay en móviles
        $content = $content -replace '<video([^>]*?)(?<!muted)>', '<video$1 muted>'
        
        # 3. Mejorar configuración de preload
        $content = $content -replace 'preload="none"', 'preload="metadata"'
        
        # 4. Añadir poster por defecto si no existe
        $posterSvg = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4MCIgaGVpZ2h0PSI3MjAiIHZpZXdCb3g9IjAgMCAxMjgwIDcyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEyODAiIGhlaWdodD0iNzIwIiBmaWxsPSIjRjhGQUZDIi8+CjxjaXJjbGUgY3g9IjY0MCIgY3k9IjM2MCIgcj0iNjAiIGZpbGw9IiMzQjgyRjYiIG9wYWNpdHk9IjAuOCIvPgo8cGF0aCBkPSJNNjIwIDM0MEw2NzAgMzYwTDYyMCAzODBWMzQwWiIgZmlsbD0id2hpdGUiLz4KPHRLEVCB4PSI2NDAiIHk9IjQ1MCIgZm9udC1mYW1pbHk9IkludGVyLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjI0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjQ3NDhCIj4KVmlkZW8gLSBUb2NhIHBhcmEgcmVwcm9kdWNpcgo8L3RleHQ+Cjwvc3ZnPgo="
        $content = $content -replace '<video(?![^>]*poster)', "<video poster=`"$posterSvg`""
        
        # 5. Añadir el script de corrección móvil si no existe
        if ($content -notmatch 'fix-mobile-videos\.js') {
            $scriptPath = "../../fix-mobile-videos.js"
            # Ajustar la ruta relativa basada en la profundidad del archivo
            $depth = ($file.FullName.Replace($basePath, "").Split([IO.Path]::DirectorySeparatorChar).Length - 2)
            if ($depth -gt 2) {
                $scriptPath = "../" * ($depth - 2) + "fix-mobile-videos.js"
            }
            
            $scriptTag = "`n    <!-- Script para mejorar compatibilidad de videos en móviles -->`n    <script src=`"$scriptPath`"></script>"
            $content = $content -replace '(</head>)', "$scriptTag`n$1"
        }
        
        # 6. Añadir estilos CSS mejorados para móviles si no existen
        if ($content -notmatch 'enhanced-video') {
            $enhancedStyles = @"

        /* Estilos mejorados para videos en móviles */
        .video-container video {
            background-color: #000;
            outline: none;
            -webkit-tap-highlight-color: transparent;
        }
        
        .video-container video::-webkit-media-controls {
            opacity: 1;
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
                min-width: 44px;
                min-height: 44px;
            }
        }
"@
            $content = $content -replace '(</style>)', "$enhancedStyles`n$1"
        }
        
        # Solo escribir si hubo cambios
        if ($content -ne $originalContent) {
            Set-Content -Path $file.FullName -Value $content -Encoding UTF8
            $correctedFiles++
            Write-Host "  ✅ Correcciones aplicadas" -ForegroundColor Green
        } else {
            Write-Host "  ℹ️  Sin cambios necesarios" -ForegroundColor Yellow
        }
        
    } catch {
        Write-Host "  ❌ Error procesando archivo: $($_.Exception.Message)" -ForegroundColor Red
        $errorFiles++
    }
}

Write-Host "`n📊 Resumen de correcciones:" -ForegroundColor Cyan
Write-Host "  ✅ Archivos corregidos: $correctedFiles" -ForegroundColor Green
Write-Host "  ❌ Archivos con errores: $errorFiles" -ForegroundColor Red
Write-Host "  📁 Total procesados: $($videoFiles.Count)" -ForegroundColor Yellow

if ($correctedFiles -gt 0) {
    Write-Host "`n🎉 ¡Correcciones aplicadas exitosamente!" -ForegroundColor Green
    Write-Host "Los videos ahora deberían funcionar mejor en dispositivos móviles." -ForegroundColor Green
    Write-Host "Cambios aplicados:" -ForegroundColor Gray
    Write-Host "  • Atributos playsinline y webkit-playsinline añadidos" -ForegroundColor Gray
    Write-Host "  • Videos configurados como muted por defecto" -ForegroundColor Gray
    Write-Host "  • Preload optimizado para móviles" -ForegroundColor Gray
    Write-Host "  • Posters por defecto añadidos" -ForegroundColor Gray
    Write-Host "  • Script de corrección móvil incluido" -ForegroundColor Gray
    Write-Host "  • Estilos CSS mejorados para móviles" -ForegroundColor Gray
} else {
    Write-Host "`nℹ️  No se encontraron archivos que necesiten correcciones." -ForegroundColor Yellow
}

Write-Host "`n🔍 Para verificar los cambios, prueba los videos en un dispositivo móvil." -ForegroundColor Cyan
Read-Host "`nPresiona Enter para continuar..."
