const Blog = require('../models/Blog');
const Genre = require('../models/Genre');
const Tag = require('../models/Tag');

const mongoose = require('mongoose');

require('dotenv').config();

const toBlogData = async (req) => {
  const genreId = mongoose.Types.ObjectId(req.body.genre);
  let tags = req.body.tags || [];
  tags = tags.map(tagStr => mongoose.Types.ObjectId(tagStr));

  const data = {
    title: req.body.title,
    date: req.body.date,
    genre: genreId,
    tags: tags,
  };

  try {
    if (req.file) {
      const temp_file_path = req.file.path;
      const mdText = await Blog.toString(temp_file_path);
      const html = Blog.markdownToHtml(mdText);
      const htmlSections = Blog.htmlToSections(html);

      data.markdown = mdText;
      data.htmlSections = htmlSections;
    }

    return data;
  } catch (err) {
    console.log(err);
  }
}

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
    tags: tagData,
  });
}

exports.renderEditBlog = async (req, res, err) => {
  const blogId = mongoose.Types.ObjectId(req.params.id);

  try {
    const blog = await Blog.findById(blogId);
    const allGenres = await Genre.find();
    const allTags = await Tag.find();

    const dateStr = blog.date.toISOString().substr(0, 10);

    res.render('edit', {
      layout: 'default',
      template: 'aux',
      genres: allGenres,
      tags: allTags,
      blog: blog,
      dateStr: dateStr,
    });
  } catch (err) {
    console.log(err);
  }
}

exports.postAddBlog = async (req, res, err) => {
  try {
    const data = await toBlogData(req);
    const blog = new Blog(data);
    const blogData = await blog.save();

    const addBlogId = {$push: {"blogs": blogData._id}};

    Genre.findByIdAndUpdate(blogData.genre, addBlogId).exec();

    Tag.updateMany({_id: {$in: blogData.tags}}, addBlogId).exec();

    console.log('posted add blog');

    res.redirect('/admin/blog');
  } catch (err) {
    console.log(err);
  }
}

exports.postEditBlog = async (req, res, err) => {
  const id = mongoose.Types.ObjectId(req.params.id);

  try {
    const updateData = await toBlogData(req);
    const oldBlogData = await Blog.findById(id);

    const pullBlogId = {$pull: {"blogs": blogData._id}};
    const addBlogId = {$push: {"blogs": blogData._id}};

    Genre.findByIdAndUpdate(oldBlogData.genre, pullBlogId).exec();
    Tag.updateMany({_id: {$in: blogData.tags}}, pullBlogId).exec();

    Blog.findByIdAndUpdate(id, updateData).exec();

    Genre.findByIdAndUpdate(updateBlog.genre, addBlogId).exec();

    Tag.updateMany({_id: {$in: blogData.tags}}, addBlogId).exec();

    console.log('posted edit blog');

    res.redirect('/admin/blog');
  } catch (err) {
    console.log(err);
  }
}

exports.postAddGenre = (req, res, err) => {
  const title = req.body['genre-title'];
  const genre = new Genre({title: title});

  genre.save()
    .then(genreData => {
      res.redirect('/admin/blog');
    }).catch(err => {
      console.log(err);
    });
}

exports.postAddTag = (req, res, err) => {
  const title = req.body['tag-title'];
  const tag = new Tag({title: title});

  tag.save()
    .then(tagData => {
      res.redirect('/admin/blog');
    }).catch(err => {
      console.log(err);
    });
}

exports.postDeleteGenre = async (req,res, err) => {

}

exports.postDeleteTag = async (req,res, err) => {
  
}

exports.postEditGenre = async (req,res, err) => {

}

exports.postEditTag = async (req,res, err) => {
  
}