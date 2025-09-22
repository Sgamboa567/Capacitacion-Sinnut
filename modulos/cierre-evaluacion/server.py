#!/usr/bin/env python3
"""
Servidor web para envío automático de certificados
Ejecutar: python server.py
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
import os
from datetime import datetime
import traceback

app = Flask(__name__)
CORS(app)  # Permitir requests desde cualquier origen

def send_certificate_email(data):
    """Envía el certificado por email usando Gmail"""

    # Configuración de Gmail
    SMTP_SERVER = 'smtp.gmail.com'
    SMTP_PORT = 587
    SENDER_EMAIL = 'soporte.ti@oroexpress.com.co'
    APP_PASSWORD = 'binz ibvq nmau uhkc'

    # Crear mensaje para el usuario
    user_msg = MIMEMultipart()
    user_msg['From'] = f'Equipo de Capacitación Sinnut ERP <{SENDER_EMAIL}>'
    user_msg['To'] = data['email']
    user_msg['Subject'] = '¡Felicitaciones! Certificado de Capacitación Sinnut ERP'

    completion_date = data.get('completionDate', datetime.now().strftime('%Y-%m-%d'))
    if completion_date:
        try:
            completion_date = datetime.fromisoformat(completion_date.replace('Z', '+00:00')).strftime('%d/%m/%Y')
        except:
            completion_date = datetime.now().strftime('%d/%m/%Y')

    user_body = f"""Hola {data['fullName']},

¡Felicitaciones! Has completado exitosamente la capacitación en Sinnut ERP.

Detalles de tu certificación:
- Nombre: {data['fullName']}
- Documento: {data['document']}
- Fecha de finalización: {completion_date}
- Archivo generado: {data['fileName']}

Tu certificado ha sido enviado también al departamento de gestión humana.

Atentamente,
Equipo de Capacitación Sinnut ERP
Oroexpress"""

    user_msg.attach(MIMEText(user_body, 'plain'))

    # Adjuntar PDF si existe
    pdf_path = data.get('fileName', '').replace('.pdf', '') + '.pdf'
    if os.path.exists(pdf_path):
        with open(pdf_path, 'rb') as attachment:
            part = MIMEBase('application', 'octet-stream')
            part.set_payload(attachment.read())
            encoders.encode_base64(part)
            part.add_header('Content-Disposition', f'attachment; filename={os.path.basename(pdf_path)}')
            user_msg.attach(part)

    # Crear mensaje para gestión humana
    admin_msg = MIMEMultipart()
    admin_msg['From'] = f'Sistema de Certificación Sinnut ERP <{SENDER_EMAIL}>'
    admin_msg['To'] = SENDER_EMAIL
    admin_msg['Subject'] = f'Nuevo Certificado Emitido - {data["fullName"]}'

    admin_body = f"""Nuevo certificado emitido:

Estudiante: {data['fullName']}
Email: {data['email']}
Documento: {data['document']}
Fecha de finalización: {completion_date}
Fecha de emisión: {datetime.now().strftime('%d/%m/%Y')}

Archivo generado: {data['fileName']}

Por favor, archivar este certificado en los registros de RRHH.

--
Sistema Automático de Certificación
Sinnut ERP"""

    admin_msg.attach(MIMEText(admin_body, 'plain'))

    # Adjuntar PDF si existe
    if os.path.exists(pdf_path):
        with open(pdf_path, 'rb') as attachment:
            part = MIMEBase('application', 'octet-stream')
            part.set_payload(attachment.read())
            encoders.encode_base64(part)
            part.add_header('Content-Disposition', f'attachment; filename={os.path.basename(pdf_path)}')
            admin_msg.attach(part)

    try:
        # Conectar al servidor SMTP
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(SENDER_EMAIL, APP_PASSWORD)

        # Enviar correos
        print(f"Enviando correo a {data['email']}...")
        server.send_message(user_msg)
        print("✓ Correo al usuario enviado exitosamente")

        print(f"Enviando correo a {SENDER_EMAIL}...")
        server.send_message(admin_msg)
        print("✓ Correo a gestión humana enviado exitosamente")

        server.quit()
        return True, "Correos enviados exitosamente"

    except Exception as e:
        error_msg = f"Error enviando correos: {str(e)}"
        print(f"❌ {error_msg}")
        return False, error_msg

@app.route('/send_certificate', methods=['POST'])
def send_certificate():
    try:
        data = request.get_json()

        if not data:
            return jsonify({'success': False, 'message': 'No se recibieron datos'}), 400

        required_fields = ['fullName', 'document', 'email', 'fileName']
        for field in required_fields:
            if field not in data:
                return jsonify({'success': False, 'message': f'Campo requerido faltante: {field}'}), 400

        print(f"📧 Procesando certificado para: {data['fullName']}")
        print(f"📧 Email: {data['email']}")

        success, message = send_certificate_email(data)

        if success:
            return jsonify({
                'success': True,
                'message': '¡Certificado enviado exitosamente!',
                'details': f"Correos enviados a {data['email']} y gestión humana"
            })
        else:
            return jsonify({'success': False, 'message': message}), 500

    except Exception as e:
        error_details = traceback.format_exc()
        print(f"❌ Error en el servidor: {error_details}")
        return jsonify({'success': False, 'message': f'Error interno del servidor: {str(e)}'}), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'OK', 'message': 'Servidor de certificados funcionando'})

if __name__ == '__main__':
    print("🚀 Iniciando servidor de certificados...")
    print("📧 Servidor SMTP configurado para: soporte.ti@oroexpress.com.co")
    print("🌐 Servidor web disponible en: http://localhost:5000")
    print("📋 Endpoints:")
    print("   GET  /health - Verificar estado del servidor")
    print("   POST /send_certificate - Enviar certificado por email")
    print("")
    print("Para probar: curl http://localhost:5000/health")
    print("")
    app.run(host='127.0.0.1', port=5000, debug=True)