const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

require('dotenv').config();

const transporter = nodemailer.createTransport(sendgridTransport({
  auth: {
    api_key: process.env.API_KEY,
  }
}));

exports.postContact = (req, res, err) => {
  const name = req.body.name;
  const fromEmail = req.body.email || 'anonymous';
  const desc = req.body.desc;

  transporter.sendMail({
    to: process.env.EMAIL,
    from: fromEmail,
    subject: `Contact: ${name}, ${fromEmail}`,
    html: `<p>${desc}</p>`,
  });

  res.redirect('/');
}