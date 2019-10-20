const formidable = require('formidable');

const Blog = require('../models/Blog');

exports.renderBlogs = (req, res, err) => {
  Blog.find()
      .then(blogs => {
        res.render('blogs', {layout: 'default', template: 'index', blogs: blogs});
      })
      .catch(err => {
        throw err;
      });
}

exports.renderBlog = (req, res, err) => {
  const id = req.params.id;

  Blog.findById(id)
    .then(blog => {
      blog.layout = 'default';
      blog.template = 'blog';

      console.log(blog.layout);

      res.render('blog', blog);
    })
    .catch(err => {
      throw err;
    });
}

// const title = req.body.title;
// const date = req.body.date;
// const content = req.body.file;

// console.log(req.body.title);

// const blog = new Blog(title, date, content);

// console.log(blog);
