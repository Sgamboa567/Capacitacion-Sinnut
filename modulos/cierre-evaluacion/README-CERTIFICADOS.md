# 🎓 Sistema de Certificación Sinnut ERP

## 📋 Descripción
Sistema completo para generar certificados de capacitación y enviarlos automáticamente por email usando Python y Gmail.

## 🚀 Flujo de Trabajo

### 1. Usuario Completa la Evaluación
- Accede a `evaluacion-final.html`
- Responde todas las preguntas
- Completa el formulario de datos personales

### 2. Generación Automática
- ✅ PDF del certificado se genera y descarga
- ✅ Archivo JSON con datos se crea y descarga
- ✅ Datos se guardan localmente para respaldo

### 3. Envío de Correos (Administrador)
```bash
# Para probar (sin enviar realmente)
python send_emails.py certificado.json --test

# Para enviar realmente
python send_emails.py certificado.json
```

## � Archivos del Sistema

| Archivo | Descripción |
|---------|-------------|
| `evaluacion-final.html` | Formulario principal de certificación |
| `send_emails.py` | Script Python para envío automático |
| `CONFIGURACION-EMAILJS.md` | Documentación del sistema |
| `js/main.js` | Lógica JavaScript del formulario |
| `css/main.css` | Estilos de la aplicación |

## 🔧 Requisitos

- ✅ Navegador web moderno
- ✅ Python 3.6+
- ✅ Conexión a internet
- ✅ Gmail con contraseña de aplicación

## 📧 Configuración de Email

### Credenciales (Ya Configuradas)
- **Email:** soporte.ti@oroexpress.com.co
- **App Password:** binz ibvq nmau uhkc
- **SMTP:** smtp.gmail.com:587

### Destinatarios Automáticos
1. **Usuario:** Recibe felicitaciones + PDF adjunto
2. **Gestión Humana:** soporte.ti@oroexpress.com.co

## 🎯 Ventajas del Sistema

- ✅ **Sin dependencias externas** (no EmailJS, no APIs)
- ✅ **Configuración mínima** (solo Python + Gmail)
- ✅ **Envío automático** con un solo comando
- ✅ **Respaldo local** de todos los datos
- ✅ **Modo de prueba** para verificar funcionamiento
- ✅ **Adjuntos PDF** en los correos

## 📖 Uso Paso a Paso

### Para el Usuario
1. Abrir `evaluacion-final.html`
2. Completar evaluación
3. Llenar datos personales
4. Descargar archivos generados

### Para el Administrador
1. Recibir archivo JSON del usuario
2. Ejecutar: `python send_emails.py archivo.json`
3. Verificar envío exitoso

## 🔍 Verificación

```bash
# Probar sin enviar correos
python send_emails.py test_certificado.json --test

# Salida esperada:
📧 Procesando certificado para: Juan Pérez
📧 Email: juan.perez@example.com
📧 Modo: PRUEBA
✅ Certificado procesado exitosamente (MODO PRUEBA)
```

## 🚨 Solución de Problemas

### Error de Conexión SMTP
- Verificar conexión a internet
- Confirmar credenciales de Gmail

### Emails no Llegan
- Revisar carpeta de spam
- Verificar configuración de Gmail

### Error de Sintaxis JSON
- Asegurar que el archivo JSON esté bien formado
- Verificar codificación UTF-8

## 📞 Soporte

Para problemas técnicos:
- Verificar logs del script Python
- Revisar configuración de Gmail
- Probar modo de prueba primero

---
**Versión:** 2.0 - Sistema Simplificado con Python
**Fecha:** Septiembre 2025
   - 📧 **Al usuario**: Felicitaciones con detalles del certificado
   - 📧 **A gestión humana**: Notificación con datos para archivar

### Configuración Necesaria
- **Cuenta EmailJS**: [www.emailjs.com](https://www.emailjs.com)
- **Servicio Gmail**: Configurado con App Password
- **Templates**: 2 templates de email personalizados
- **App Password Gmail**: `binz ibvq nmau uhkc`

### Credenciales de Gmail
- **Email**: `soporte.ti@oroexpress.com.co`
- **App Password**: `binz ibvq nmau uhkc`

### Archivos de Configuración
- 📄 `CONFIGURACION-EMAILJS.md`: Guía completa paso a paso
- 🔧 Incluye templates de email listos para usar

## 🔄 Método Anterior: Mailto (Mantenido como Fallback)

Si EmailJS no está configurado, automáticamente usa `mailto` para abrir el cliente de correo del usuario.

## 📁 Estructura de Archivos

```
modulos/cierre-evaluacion/
├── evaluacion-final.html    # Formulario de certificación con envío automático
└── README-CERTIFICADOS.md   # Esta documentación
```

## 🛠️ Tecnologías Utilizadas

- **jsPDF**: Generación de PDFs
- **Mailto Protocol**: Envío de correos vía cliente local
- **HTML/CSS/JavaScript**: Interfaz de usuario

## 📊 Campos del Certificado

- Nombre completo
- Número de documento
- Correo electrónico
- Fecha de emisión
- Fecha de finalización
- Módulos completados

## 🔐 Seguridad

- Certificados incluyen firma digital simulada
- Datos sensibles transmitidos vía correo electrónico seguro
- No se almacenan datos en el navegador

## 📞 Soporte

Para soporte técnico:
- Email: soporte.ti@oroexpress.com.co
- Teléfono: +57 316 470 6103

## 🚀 Implementación Actual

### ✅ **Envío Automático con EmailJS**
- Sistema configurado para envío automático
- Requiere configuración inicial de EmailJS
- Fallback automático a mailto si falla

### 📋 Para Activar Envío Automático:
1. Seguir guía en `CONFIGURACION-EMAILJS.md`
2. Configurar cuenta EmailJS
3. Reemplazar placeholders en el código:
   - `TU_PUBLIC_KEY_AQUI`
   - `TU_SERVICE_ID_AQUI`
4. Probar envío

### 🔄 Estados del Sistema:
- **Sin configuración**: Usa mailto (funciona inmediatamente)
- **Con EmailJS**: Envío 100% automático
- **Error en EmailJS**: Fallback automático a mailto