# Script para iniciar el sistema de certificación
Write-Host "🚀 Iniciando Sistema de Certificación Sinnut ERP" -ForegroundColor Green
Write-Host ""

# Cambiar al directorio del script
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptDir

Write-Host "📁 Directorio actual: $scriptDir" -ForegroundColor Yellow

# Verificar que existan los archivos necesarios
$filesToCheck = @("server.py", "evaluacion-final.html")
foreach ($file in $filesToCheck) {
    if (!(Test-Path $file)) {
        Write-Host "❌ Error: Archivo $file no encontrado" -ForegroundColor Red
        Read-Host "Presiona Enter para salir"
        exit 1
    }
}

Write-Host "✅ Archivos verificados correctamente" -ForegroundColor Green

# Iniciar servidor web para archivos estáticos en segundo plano
Write-Host "🌐 Iniciando servidor web (puerto 8080)..." -ForegroundColor Cyan
$webServer = Start-Job -ScriptBlock {
    Set-Location $using:scriptDir
    python -m http.server 8080
}

Start-Sleep -Seconds 2

# Verificar que el servidor web esté funcionando
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8080" -TimeoutSec 5
    Write-Host "✅ Servidor web iniciado correctamente" -ForegroundColor Green
} catch {
    Write-Host "⚠️ Servidor web podría no estar respondiendo, pero continuando..." -ForegroundColor Yellow
}

# Iniciar servidor Flask
Write-Host "📧 Iniciando servidor de certificados (puerto 5000)..." -ForegroundColor Cyan
Write-Host ""
Write-Host "🌐 Aplicación web: http://localhost:8080/evaluacion-final.html" -ForegroundColor White
Write-Host "📧 API de certificados: http://localhost:5000/health" -ForegroundColor White
Write-Host ""
Write-Host "Presiona Ctrl+C para detener los servidores" -ForegroundColor Gray
Write-Host ""

try {
    python server.py
} finally {
    # Limpiar jobs al salir
    Write-Host "🛑 Deteniendo servidores..." -ForegroundColor Yellow
    Stop-Job $webServer -ErrorAction SilentlyContinue
    Remove-Job $webServer -ErrorAction SilentlyContinue
}