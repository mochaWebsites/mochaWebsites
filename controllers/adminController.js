const Category = require('../models/Category');

require('dotenv').config();

exports.renderLogin = (req, res, err) => {
  res.render('admin', {layout: 'default', template: 'about'});
}

exports.postLogin = (req, res, err) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username === process.env.ADMIN_UN && password === process.env.ADMIN_PW) {
    console.log('log in success!');
    res.redirect('/');
  } else {
    console.log('fail');
    res.redirect('/admin');
  }
}

exports.renderBlogAddForm = (req, res, err) => {
  res.render('add', {layout: 'default', template: 'about'});
}


exports.renderBlogEditForm = (req, res, err) => {

}

exports.addBlog = (req, res, err) => {
  const form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {
    const temp_file_path = files.file.path;

    Blog.toString(temp_file_path, mdText => {
      const blog = new Blog(fields.title, fields.date, mdText);

      blog.add();

      res.redirect('/blogs');
    });
  });
}

exports.renderCategoryForm = (req, res, err) => {
  const data = Category.fetchAll(data => {
    console.log(data);
    // res.render('category', {layout: 'default', template: 'about', data: data});
  });
}

exports.addCategory = (req, res, err) => {
  const title = req.body.title;
  const newCategory = new Category(title);

  newCategory.add(result => {
    res.redirect('/');
  });
}

exports.editCategory = (req, res, err) => {

}

exports.deleteCategory = (req, res, err) => {

}