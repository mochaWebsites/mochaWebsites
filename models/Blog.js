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

  tags: [{type: Schema.Types.ObjectId, ref: 'Tag'}],

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

module.exports = mongoose.model('Blog', blogSchema);
