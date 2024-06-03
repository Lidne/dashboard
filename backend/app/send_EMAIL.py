import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from backend.config import MAIL, PASS


def send_email(recipient, text=None, template=None):
    """отправка сообщения на EMAIL"""
    # почта нашего проекта
    sender = MAIL
    password = PASS

    server = smtplib.SMTP("smtp.gmail.com", 587)
    server.starttls()

    # считывание нужного html
    try:
        with open(template) as file:
            template = file.read()
    except IOError:
        return "The template file doesn't found!"

    try:
        server.login(sender, password)
        # msg = MIMEText(template, "html")
        msg = MIMEMultipart()
        msg["From"] = sender
        msg["To"] = recipient
        # тема сообщения
        msg["Subject"] = "С Днем Рождения! Только сегодня скидка по промокоду до 90%!"

        # считывание текста
        if text:
            msg.attach(MIMEText(text))

        # считывание html
        if template:
            msg.attach(MIMEText(template, "html"))
        server.sendmail(sender, recipient, msg.as_string())
        return "The message was sent successfully!"
    except Exception as _ex:
        return f"{_ex}\nCheck your login or password please!"


a = send_email("rusnakkaleksandr@gmail.com", "ПРИВЕТ", "email_template_1.html")
print(a)
