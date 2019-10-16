const Blog = require('../models/Blog');

const formidable = require('formidable');

require('dotenv').config();

exports.renderLogin = (req, res, err) => {
  res.render('admin', {layout: 'default', template: 'about'});
}

exports.postLogin = (req, res, err) => {
  const username = req.body.username;
  const password = req.body.password;

   if (username === process.env.ADMIN_UN && password === process.env.ADMIN_PW) {
    req.session.isLoggedIn = true;
    req.session.user = 'admin';
    return req.session.save(err => {
      return res.redirect('/admin');
    });
  } else {
    console.log('failed admin login');
    res.redirect('/');
  }
}

exports.renderBlogAddForm = (req, res, err) => {
  if (!req.session.isLoggedIn) {
    res.redirect('/');
  }

  res.render('add', {layout: 'default', template: 'about'});
}

exports.postAddBlog = (req, res, err) => {
  const form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {
    const temp_file_path = files.file.path;

    Blog.toString(temp_file_path, mdText => {
      const html = Blog.markdownToHtml(mdText);
      const htmlSections = Blog.htmlToSections(html);

      const blogData = {
        title: fields.title,
        date: fields.date,
        markdown: mdText,
        htmlSections: htmlSections,
      }

      const blog = new Blog(blogData);
      blog.save()
          .then(result => {
            console.log('blog saved!');
            res.redirect('/blogs');
          })
          .catch(err => {
            console.log(err);
          })
    });
  });
}

// exports.renderCategoryForm = (req, res, err) => {
//   const data = Category.fetchAll(data => {
//     console.log(data);
//     // res.render('category', {layout: 'default', template: 'about', data: data});
//   });
// }

// exports.addCategory = (req, res, err) => {
//   const title = req.body.title;
//   const newCategory = new Category(title);

//   newCategory.add(result => {
//     res.redirect('/');
//   });
// }

// exports.editCategory = (req, res, err) => {

// }

// exports.deleteCategory = (req, res, err) => {

// }