const Email = require('../models/Email.js');
const { validationResult } = require('express-validator');

exports.postContact = (req, res, err) => {
  const errors = validationResult(req);

  const messages = errors.array().map(errObj => errObj.msg);
  console.log(!errors.isEmpty(), messages);

  if (!errors.isEmpty()) {
    return res.status(422).render('home', {
      layout: 'default',
      template: 'home',
      errorMessages: messages,
    });
  }

  const name = req.body.name;
  const fromEmail = req.body.email || 'anonymous';
  const desc = req.body.desc;
  const email = new Email();

  email.sendContactEmail(name, fromEmail, desc);

  res.redirect('/');
}