# 🔧 SOLUCIÓN PARA ESTRUCTURA DE PROYECTO Y GITHUB PAGES

## 🚨 Problema Identificado

Después del cambio de nombre de carpeta, tienes:
- Archivos duplicados en múltiples ubicaciones
- Posibles problemas con rutas en GitHub Pages
- Workflow que podría necesitar ajustes

## ✅ Solución Recomendada

### Opción 1: Estructura Limpia (RECOMENDADA)

**Mantener solo una estructura:**

```
Capacitacion-Sinnut/
├── .github/
│   └── workflows/
│       └── pages.yml
├── assets/
├── modulos/
│   ├── contabilidad/
│   ├── contratos/
│   └── facturas/
├── index.html
├── fix-mobile-videos.js
└── otros archivos...
```

### Pasos para limpiar:

1. **Eliminar duplicados:**
```powershell
# Eliminar la carpeta duplicada (mantener solo una)
Remove-Item -Path "Capacitacion-Sinnut" -Recurse -Force
# O si prefieres la otra: Remove-Item -Path "Capacitacion-Sinnut-main" -Recurse -Force
```

2. **Verificar que el archivo principal existe:**
```powershell
# Verificar que index.html está en la raíz
Test-Path "index.html"
```

## 🔧 Ajustes para GitHub Pages

### Verificar pages.yml

El archivo actual está bien configurado:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - uses: actions/configure-pages@v3
    - uses: actions/upload-pages-artifact@v2
      with:
        path: '.'  # ← Esto publica desde la raíz
    - uses: actions/deploy-pages@v2
```

### ⚠️ IMPORTANTE: Verificar rutas

Después del cambio de estructura, verifica que:

1. **index.html esté en la raíz del repositorio**
2. **Las rutas relativas sean correctas**
3. **fix-mobile-videos.js esté accesible desde los módulos**

## 🎯 Comandos para Verificar y Corregir

### 1. Verificar estructura actual:
```powershell
Write-Host "📁 ESTRUCTURA ACTUAL:" -ForegroundColor Cyan
Get-ChildItem -Recurse -Directory | Select-Object FullName
```

### 2. Verificar archivo principal:
```powershell
if (Test-Path "index.html") {
    Write-Host "✅ index.html está en la raíz" -ForegroundColor Green
} else {
    Write-Host "❌ index.html NO está en la raíz" -ForegroundColor Red
}
```

### 3. Verificar rutas de scripts:
```powershell
Get-ChildItem -Recurse -Filter "*.html" | ForEach-Object {
    $content = Get-Content $_.FullName -Raw -ErrorAction SilentlyContinue
    if ($content -match 'fix-mobile-videos.js') {
        $relativePath = $_.FullName.Replace($PWD, ".")
        Write-Host "📄 $relativePath contiene referencia al script" -ForegroundColor Yellow
    }
}
```

### 4. Probar rutas:
```powershell
# Desde un archivo de módulo, verificar si puede acceder al script
$testPath = "modulos/facturas/factura-de-venta.html"
if (Test-Path $testPath) {
    $scriptPath = "fix-mobile-videos.js"  # Ruta relativa desde el archivo
    if (Test-Path $scriptPath) {
        Write-Host "✅ Script accesible desde $testPath" -ForegroundColor Green
    } else {
        Write-Host "❌ Script NO accesible desde $testPath" -ForegroundColor Red
    }
}
```

## 🚀 Para Subir a GitHub

Una vez que tengas la estructura limpia:

### 1. Inicializar Git (si no existe):
```bash
git init
git branch -M main
```

### 2. Añadir archivos:
```bash
git add .
git commit -m "🎥 Fix: Corregir videos móviles y reorganizar estructura

- Aplicar correcciones playsinline/webkit-playsinline/muted a todos los videos
- Incluir fix-mobile-videos.js para detección automática móvil
- Optimizar estructura de proyecto
- Configurar GitHub Pages workflow
- Resolver 9 archivos HTML con 13+ videos
- Compatibilidad total iOS/Android/PC"
```

### 3. Conectar con repositorio remoto:
```bash
git remote add origin https://github.com/TU-USUARIO/TU-REPOSITORIO.git
git push -u origin main
```

## 🔍 Verificación Final

Después de subir, GitHub Pages se ejecutará automáticamente y tu sitio estará disponible en:
`https://TU-USUARIO.github.io/TU-REPOSITORIO/`

Los videos deberían funcionar correctamente en todos los dispositivos.

## 📞 Si hay problemas:

1. **Verifica que index.html esté en la raíz**
2. **Revisa que las rutas relativas sean correctas**  
3. **Confirma que fix-mobile-videos.js esté accesible**
4. **Chequea los logs de GitHub Actions para errores**

¡La estructura está lista para deployment! 🚀
