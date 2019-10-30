const Blog = require('../models/Blog');
const Genre = require('../models/Genre');
const Tag = require('../models/Tag');

const mongoose = require('mongoose');

const formidable = require('formidable');

require('dotenv').config();

exports.renderLogin = (req, res, err) => {
  res.render('admin', {layout: 'default', template: 'aux'});
}

exports.postLogin = (req, res, err) => {
  const username = req.body.username;
  const password = req.body.password;

   if (username === process.env.ADMIN_UN && password === process.env.ADMIN_PW) {
    req.session.isLoggedIn = true;
    req.session.user = 'admin';
    return req.session.save(err => {
      return res.redirect('/admin/blog');
    });
  } else {
    console.log('failed admin login');
    res.redirect('/');
  }
}

exports.renderAdminPanel = async (req, res, err) => {
  if (!req.session.isLoggedIn) {
    res.redirect('/');
  }

  const blogData = await Blog.find();
  const genreData = await Genre.find();
  const tagData = await Tag.find();

  res.render('add', {
    layout: 'default',
    template: 'aux',
    genres: genreData,
    blogs: blogData,
    tags: tagData
  });
}

exports.postAddBlog = async (req, res, err) => {
  const form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {
    const temp_file_path = files.file.path;

    const formData = Blog.parseFormData(fields, files);
    const blog = new Blog(formData);

    try {
      // save the blog
      const blogData = await blog.save();
      // add the id of the blog to genre used
      // 1. find genre Doucument
      const genreData = await Genre.findById(genreId);
      // 2. update genre Document
      genreData.blogs.push(blog.id);

      // add the id of the blog to each tag used
      // 1. find each tag used
      const tags = blogData.populate('tags');
      // 2. iterate over each tag used
      for (let i = 0; i < tags.length; tags += 1) {
        // 3. Add blogId to each tag
        console.log(tags[i]);
        // 
      }

    } catch (err) {
      console.log(err);
    }

      // genreData.blogs.push(blog.id);
      // ## add blog id to associated genre and tags
      // a. populate the blogData and add BlogId to blogs
      // b. find the genre and #each tag used in by blogData
      // then add blog id to each

      // #tags
      // - find id's of tags included in this blog post
      // - populate tags with real tag Documents
      // - for each tag Document, add this blog Id to it's array of blogs
      //   - if Id already exists, don't add it
  });
}

exports.postAddGenre = (req, res, err) => {
  const title = req.body['genre-title'];
  const genre = new Genre({title: title});

  genre.save()
    .then(genreData => {
      res.redirect('admin/blog');
    }).catch(err => {
      console.log(err);
    });
}

exports.postAddTag = (req, res, err) => {
  const title = req.body['tag-title'];
  const tag = new Tag({title: title});

  tag.save()
    .then(tagData => {
      res.redirect('admin/blog');
    }).catch(err => {
      console.log(err);
    });
}

exports.renderEditBlog = async (req, res, err) => {
  const blogId = req.params.id;

  try {
    const genreData = await Genre.find();
    const blogData = await Blog.findById(blogId);
    const dateString = blogData.date.toISOString().substr(0, 10);

    res.render('editBlog', {
      layout: 'default',
      template: 'aux',
      blog: blogData,
      date: dateString,
      genres: genreData
    });
  } catch (err) {
    console.log(err);
  }
}

exports.postEditBlog = async (req, res, err) => {
  const blogId = req.params.id;
  const form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {
    const temp_file_path = files.file.path;

    const formData = Blog.parseFormData(fields, files);
    const blog = new Blog(formData);

    try {
      // save the blog
      const blogData = await blog.save();
      // add the id of the blog to genre used
      // 1. find genre Doucument
      const genreData = await Genre.findById(genreId);
      // 2. update genre Document
      genreData.blogs.push(blog.id);

      // add the id of the blog to each tag used
      // 1. find each tag used
      const tags = blogData.populate('tags');
      // 2. iterate over each tag used
      for (let i = 0; i < tags.length; tags += 1) {
        // 3. Add blogId to each tag
        console.log(tags[i]);
        // ...
      }
    } catch (err) {
      console.log(err);
    }
  });
}
