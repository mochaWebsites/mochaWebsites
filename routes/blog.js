const express = require('express');
const bodyParser = require('body-parser');

const blogController = require('../controllers/blogController');

const router = express.Router();

router.get('/blogs', blogController.renderBlogs);

router.get('/blogs/test', (req, res, err) => {
  res.render('blog_1', {layout: 'default', template: 'blog'});
});

router.get('/blogs/:id', blogController.renderBlog);

module.exports = router;