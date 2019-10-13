const formidable = require('formidable');

const Blog = require('../models/Blog');

exports.renderBlogs = (req, res, err) => {
  Blog.fetchAll()
      .then(data => {
        res.render('blogs', {layout: 'default', template: 'about', blogs: data});
      })
      .catch(err => {
        throw err;
      });
}

exports.renderBlog = (req, res, err) => {
  const id = req.params.id;

  Blog.getById(id)
      .then(data => {
        const blog = data[0];

        blog.layout = 'default';
        blog.template = 'blog';

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
