const Email = require('../models/Email.js');

exports.postContact = (req, res, err) => {
  const name = req.body.name;
  const fromEmail = req.body.email || 'anonymous';
  const desc = req.body.desc;
  const email = new Email();

  email.sendContactEmail(name, fromEmail, desc);

  res.redirect('/');
}