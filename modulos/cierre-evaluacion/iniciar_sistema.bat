@echo off
echo 🚀 Iniciando Sistema de Certificación Sinnut ERP
echo.

echo 📁 Cambiando al directorio del proyecto...
cd /d "%~dp0"

echo 🌐 Iniciando servidor web para archivos estáticos (puerto 8080)...
start "Servidor Web" python -m http.server 8080

echo ⏳ Esperando que el servidor web inicie...
timeout /t 2 /nobreak > nul

echo 📧 Iniciando servidor de certificados (puerto 5000)...
python server.py

echo.
echo ✅ Sistema iniciado correctamente!
echo.
echo 🌐 Aplicación web: http://localhost:8080/evaluacion-final.html
echo 📧 API de certificados: http://localhost:5000
echo.
echo Presiona Ctrl+C para detener los servidores
pause