const express = require('express');
const bodyParser = require('body-parser');

const blogController = require('../controllers/blogController');

const router = express.Router();

router.get('/blogs', blogController.renderBlogs);

router.get('/blogs/:id', blogController.renderBlog);

module.exports = router;