const fs = require('fs');

const mongoose = require('mongoose');
const showdown = require('showdown');

const converter = new showdown.Converter();
converter.setOption('noHeaderId', true);

const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true
  },

  genre: {
    type: Schema.Types.ObjectId,
    ref: 'Genre',
    required: true
  },

  tags: [{type: Schema.Types.ObjectId}],

  date: {
    type: Date,
    required: true
  },

  markdown: {
    type: String,
    required: true
  },

  htmlSections: Array,
});

blogSchema.statics.toString = (markdownPath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(markdownPath, 'utf-8', (err, string) => {
      if (err) reject(new Error(err));

      resolve(string);
    });
  });
}

blogSchema.statics.markdownToHtml = (markdown) => {
  const html = converter.makeHtml(markdown);

  return html;
}

blogSchema.statics.htmlToSections = (html) => {
  const sectionsRegex = /\n(?=<h3>)/g;

  const sectionStrings = html.split(sectionsRegex);
  const sections = [];

  sectionStrings.shift();
  sectionStrings.forEach(str => {
    const section = {};
    const content = str.split('</h3>\n');

    section.heading = content[0].replace('<h3>', '');
    section.content = content[1];

    sections.push(section);
  });

  return sections;
}

blogSchema.statics.parseFormData = (fields, files) => {
  const temp_file_path = files.file.path;

  try {
    const mdText = await Blog.toString(temp_file_path);
  } catch (err) {
    console.log(err);
  }

  const html = Blog.markdownToHtml(mdText);
  const htmlSections = Blog.htmlToSections(html);
  const genreId = mongoose.Types.ObjectId(fields.genre);

  return {
    title: fields.title,
    date: fields.date,
    genre: genreId,
    // tags: tags,
    markdown: mdText,
    htmlSections: htmlSections,
  };
}

module.exports = mongoose.model('Blog', blogSchema);
