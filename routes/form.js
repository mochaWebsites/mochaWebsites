const express = require('express');
const bodyParser = require('body-parser');

const rootDir = require('../util/rootPath');
const EmailService = require(rootDir + '/controllers/email');

const router = express.Router();

router.post('/contact', EmailService.postContact);

module.exports = router;