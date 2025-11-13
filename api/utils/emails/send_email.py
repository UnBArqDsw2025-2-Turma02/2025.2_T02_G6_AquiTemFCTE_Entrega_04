import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from pathlib import Path

from api.core.settings import Settings


def get_email_template(verification_code: str) -> str:
    template_path = Path(__file__).parent / 'email.html'
    with open(template_path, encoding='utf-8') as f:
        template = f.read()
    return template.replace('{{CODE}}', verification_code)


async def send_verification_email(email: str, verification_code: str) -> bool:
    settings = Settings()
    try:
        msg = MIMEMultipart('alternative')
        msg['Subject'] = 'Código de Verificação AquiTemFCTE: '
        '{verification_code}'
        msg['From'] = f'{settings.SMTP_FROM_NAME} <{settings.SMTP_FROM_EMAIL}>'
        msg['To'] = email

        html_content = get_email_template(verification_code)
        html_part = MIMEText(html_content, 'html', 'utf-8')
        msg.attach(html_part)

        with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT) as server:
            server.starttls()
            server.login(settings.SMTP_USER, settings.SMTP_PASSWORD)
            server.send_message(msg)

        return True

    except Exception:
        return False
