const express = require('express');
const bodyParser = require('body-parser');
const { check } = require('express-validator');

const rootDir = require('../util/rootPath');
const emailController = require(rootDir + '/controllers/emailController');

const router = express.Router();

router.post('/contact',
  check('email')
    .isEmail()
    .withMessage('Please enter a valid Email'),
  emailController.postContact
);

module.exports = router;
