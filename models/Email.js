const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

require('dotenv').config();

class Email {
  constructor() {
    this.transporter = this.createTransport();
  }

  createTransport() {
    return nodemailer.createTransport(sendgridTransport({
      auth: {
        api_key: process.env.API_KEY,
      }
    }));
  }

  sendContactEmail(name, fromEmail, desc) {
    this.transporter.sendMail({
      to: process.env.EMAIL,
      from: fromEmail,
      subject: `Contact: ${name}, ${fromEmail}`,
      html: `<p>${desc}</p>`,
    });
  }
}

module.exports = Email;
