const express = require('express');
const bodyParser = require('body-parser');

const rootDir = require('../util/rootPath');
const blogController = require('../controllers/blogController');

const router = express.Router();

router.get('/blogs', (req, res, next) => {
  res.render('blogs', {layout: 'default', template: 'blog'});
});

router.get('/:title', blogController.getBlog);

module.exports = router;