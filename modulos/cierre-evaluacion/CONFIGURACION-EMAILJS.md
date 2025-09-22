# Sistema de Certificación Simplificado - Python

## 🎯 Sistema Actual: Envío Automático con Python

Ya no necesitamos EmailJS ni páginas externas. El sistema funciona así:

### 1. El Usuario Completa el Formulario
- Se genera el PDF del certificado
- Se descarga automáticamente
- Se guarda un archivo JSON con todos los datos

### 2. Envío de Correos (Automático con Python)
- Descarga el archivo JSON generado
- Ejecuta: `python send_emails.py archivo.json`
- Los correos se envían automáticamente usando Gmail

## 📧 Configuración de Correos

### Credenciales Configuradas
- **Email remitente:** soporte.ti@oroexpress.com.co
- **Contraseña aplicación:** binz ibvq nmau uhkc
- **Servidor SMTP:** smtp.gmail.com:587

### Destinatarios
1. **Usuario:** Recibe felicitaciones y certificado adjunto
2. **Gestión Humana:** soporte.ti@oroexpress.com.co (para archivar)

## 🚀 Cómo Usar

### Para el Usuario Final
1. Completar la evaluación
2. Llenar formulario de certificación
3. Descargar PDF y archivo JSON
4. ¡Listo! El certificado está generado

### Para Enviar Correos (Administrador)
```bash
# Instalar dependencias (solo una vez)
pip install secure-smtplib

# Enviar correos
python send_emails.py certificado_juan_perez_1234567890.json
```

## 📁 Archivos del Sistema

- `evaluacion-final.html` - Formulario de certificación
- `send_emails.py` - Script de envío automático
- `js/main.js` - Lógica del formulario
- `css/main.css` - Estilos

## 🔧 Requisitos

- Python 3.6+
- Conexión a internet (para envío de correos)
- Gmail con contraseña de aplicación activada

## 📊 Flujo de Trabajo

```
Usuario completa evaluación
    ↓
Llena formulario de datos
    ↓
Se genera PDF + JSON
    ↓
Descarga automática
    ↓
Administrador ejecuta: python send_emails.py archivo.json
    ↓
Correos enviados automáticamente
```

¡Mucho más simple y sin dependencias externas!
Nombre: {{student_name}}
Email: {{student_email}}
Documento: {{student_document}}

📅 FECHAS
Fecha de finalización: {{completion_date}}
Fecha de emisión: {{emission_date}}

📄 ARCHIVO
{{certificate_file}}

Por favor, archivar este certificado en los registros de RRHH.

Sistema de Certificación Automática
Capacitación Sinnut ERP
```

### 4. Obtener IDs de Configuración
Después de configurar todo, obtendrás:

- **Public Key**: (se muestra en dashboard)
- **Service ID**: (de tu servicio Gmail)
- **Template IDs**: (de los templates creados)

### 5. Actualizar Código
En `evaluacion-final.html`, reemplaza:

```javascript
// Reemplaza TU_PUBLIC_KEY_AQUI
emailjs.init('TU_PUBLIC_KEY_AQUI');

// Reemplaza TU_SERVICE_ID_AQUI
await emailjs.send('TU_SERVICE_ID_AQUI', 'certificate_user_template', userEmailParams);
await emailjs.send('TU_SERVICE_ID_AQUI', 'certificate_admin_template', adminEmailParams);
```

## 🔧 Configuración de Seguridad en Gmail

### Habilitar App Passwords
1. Ve a [myaccount.google.com/security](https://myaccount.google.com/security)
2. Activa **"Verificación en 2 pasos"** si no está activada
3. Ve a **"Contraseñas de aplicaciones"**
4. Genera una nueva contraseña para **"Correo"**
5. Usa esa contraseña en EmailJS (ya tienes: `binz ibvq nmau uhkc`)

## ✅ Probar el Sistema

1. Llena el formulario de certificación
2. Haz clic en "Generar y Descargar Certificado"
3. Verifica que:
   - PDF se descarga
   - Correos se envían automáticamente
   - Gestión humana recibe notificación

## 🔄 Fallback Automático

Si EmailJS falla por algún motivo, el sistema automáticamente usa el método `mailto` como respaldo.

## 📊 Límites de EmailJS

- **Plan Gratuito**: 200 emails/mes
- **Plan Premium**: Más emails según plan
- Para uso intensivo, considera actualizar plan

## 🆘 Solución de Problemas

### Error: "Invalid login"
- Verifica que la App Password sea correcta
- Asegúrate de que la verificación en 2 pasos esté activada

### Error: "Daily sending quota exceeded"
- Has alcanzado el límite diario
- Espera 24 horas o actualiza plan

### Error: "Template not found"
- Verifica que los Template IDs sean correctos
- Asegúrate de que los templates estén publicados

## 📞 Soporte

Si tienes problemas con la configuración:
- Documentación EmailJS: https://www.emailjs.com/docs/
- Soporte: soporte.ti@oroexpress.com.co</content>
<parameter name="filePath">c:\Users\PERSONAL\Desktop\Capacitacion-Sinnut\modulos\cierre-evaluacion\CONFIGURACION-EMAILJS.md