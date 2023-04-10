import pandas as pd
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def alert_emailer(details):
    """
    Sends alert email to the administrator
    """

    # reading emails
    emails = pd.read_csv("data/emails.csv")['email'].values

    # sending alert email
    sender_email = "bmbvfx@gmail.com"
    print(emails)

    # creating message container
    message = MIMEMultipart()
    message['From'] = sender_email
    message['To'] = ", ".join(emails)
    message['Subject'] = "ISEEU - ACTION REQUIRED"
    
    # adding message to container
    message.attach(MIMEText("""Admin Alert: Malicious traffic detected in IDS. Immediate action required to mitigate potential damage. Please investigate and take necessary steps to secure our systems.""", "plain"))
    
    # sending email
    with smtplib.SMTP("smtp.gmail.com", 587) as mail_server:
        mail_server.starttls()
        mail_server.login(sender_email, "xnfpttfqsjcrjydn")
        mail_server.sendmail(sender_email, emails, message.as_string())

    print("Email sent")
    return "Email sent"