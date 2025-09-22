#!/usr/bin/env python3
"""
Script para enviar certificados por email usando Gmail
Uso: python send_emails.py archivo_certificado.json
"""

import sys
import json
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
import os
from datetime import datetime

def send_certificate_email(data):
    """Envía el certificado por email usando Gmail"""

    # Configuración de Gmail
    SMTP_SERVER = 'smtp.gmail.com'
    SMTP_PORT = 587
    SENDER_EMAIL = 'soporte.ti@oroexpress.com.co'
    APP_PASSWORD = 'binz ibvq nmau uhkc'  # Tu contraseña de aplicación

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

        # Marcar como enviado
        data['status'] = 'sent'
        data['sent_at'] = datetime.now().isoformat()

        return True

    except Exception as e:
        print(f"❌ Error enviando correos: {str(e)}")
        return False

def main():
    if len(sys.argv) < 2:
        print("Uso: python send_emails.py archivo_certificado.json [--test]")
        print("  --test: Modo de prueba (no envía correos realmente)")
        sys.exit(1)

    json_file = sys.argv[1]
    test_mode = len(sys.argv) > 2 and sys.argv[2] == '--test'

    if not os.path.exists(json_file):
        print(f"❌ Archivo no encontrado: {json_file}")
        sys.exit(1)

    try:
        with open(json_file, 'r', encoding='utf-8') as f:
            data = json.load(f)

        print(f"📧 Procesando certificado para: {data['fullName']}")
        print(f"📧 Email: {data['email']}")
        print(f"📧 Modo: {'PRUEBA' if test_mode else 'PRODUCCIÓN'}")

        if test_mode:
            # Modo de prueba: simular envío
            print("🔍 Verificando configuración...")
            print("✅ Conexión SMTP simulada exitosamente")
            print("✅ Correo al usuario simulado")
            print("✅ Correo a gestión humana simulado")
            print("✅ Certificado procesado exitosamente (MODO PRUEBA)")

            # Marcar como enviado en modo prueba
            data['status'] = 'test_sent'
            data['test_sent_at'] = datetime.now().isoformat()

            with open(json_file, 'w', encoding='utf-8') as f:
                json.dump(data, f, indent=2, ensure_ascii=False)
        else:
            # Modo producción: enviar realmente
            if send_certificate_email(data):
                print("✅ Certificado enviado exitosamente")
            else:
                print("❌ Error enviando certificado")
                sys.exit(1)

    except json.JSONDecodeError:
        print(f"❌ Error leyendo archivo JSON: {json_file}")
        sys.exit(1)
    except KeyError as e:
        print(f"❌ Campo requerido faltante en JSON: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main()