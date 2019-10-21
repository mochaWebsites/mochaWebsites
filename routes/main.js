const express = require('express');
const bodyParser = require('body-parser');

const rootDir = require('../util/rootPath');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('home', {layout: 'default', template: 'home'});
});

router.get('/about', (req, res, next) => {
  res.render('about', {layout: 'default', template: 'aux'});
});

module.exports = router;