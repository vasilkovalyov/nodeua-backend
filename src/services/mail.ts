import nodemailer from "nodemailer";

class MailService {
  private subject: string;
  private from: string;

  constructor() {
    this.subject = "Transport business school";
    this.from = process.env.GMAIL_LOGIN || "";
  }

  studentLessonRegistration(name: string): string {
    return `
      <h3>Dear ${name}</h3>
        <h4>Thanks you for registeration</h4>
    `;
  }

  sendMailStudentRegistrationOnLesson(to: string, name: string) {
    const body = {
      from: this.from,
      to: to,
      subject: this.subject,
      html: this.studentLessonRegistration(name)
    };

    return this.sendMail(body);
  }

  private async sendMail(message: object) {
    return new Promise((response, reject) => {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        service: "gmail",
        auth: {
          user: process.env.GMAIL_LOGIN,
          pass: process.env.GMAIL_PASSWORD
        }
      });
      transporter.sendMail(message, function (err, info) {
        if (err) {
          reject(err);
        } else {
          response(info);
        }
      });
    });
  }
}

export default MailService;
