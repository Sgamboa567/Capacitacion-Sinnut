#!/bin/bash
# Script para actualizar todas las referencias de recursos externos a locales

echo "🔄 Actualizando referencias de recursos externos a locales..."

# Buscar todos los archivos HTML
find . -name "*.html" -type f | while read file; do
    echo "📝 Actualizando: $file"
    
    # Reemplazar logo
    sed -i 's|https://aula\.aynn\.pro/files/81|assets/images/logo-institucional.png|g' "$file"
    
    # Reemplazar videos
    sed -i 's|https://aula\.aynn\.pro/files/73/download?download_frd=1|assets/videos/apertura-caja/video-1-introduccion.mp4|g' "$file"
    sed -i 's|https://aula\.aynn\.pro/files/72/download?download_frd=1|assets/videos/apertura-caja/video-2-paso-a-paso.mp4|g' "$file"
    sed -i 's|/courses/1/files/71/download|assets/videos/arqueo-caja/video-arqueo-completo.mp4|g' "$file"
    
    # Reemplazar documentos
    sed -i 's|https://aula\.aynn\.pro/courses/1/files/70/download|assets/documents/instructivos/arqueo-caja-instructivo.pdf|g' "$file"
done

echo "✅ Actualización completada!"
echo "📋 Próximos pasos:"
echo "1. Descargar los recursos desde Canvas LMS"
echo "2. Colocarlos en las carpetas correspondientes"
echo "3. Verificar que todos los enlaces funcionen"
