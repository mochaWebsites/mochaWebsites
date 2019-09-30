const express = require('express');
const bodyParser = require('body-parser');

const rootDir = require('../util/rootPath');
const EmailService = require(rootDir + '/controllers/email');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('home', {layout: 'default', template: 'home'});
});

router.get('/blog', (req, res, next) => {
  res.render('blog', {layout: 'default', template: 'blog'});
});

router.get('/blog_1', (req, res, next) => {
  res.render('blog_1', {layout: 'default', template: 'blog'});
});

router.get('/about', (req, res, next) => {
  res.render('about', {layout: 'default', template: 'about'});
});

module.exports = router;