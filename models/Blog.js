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

blogSchema.statics.toString = (markdownPath, callback) => {
  fs.readFile(markdownPath, 'utf-8', (err, data) => {
    if (err) throw err;

    if (callback) {
      callback(data);
    };
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

// class Blog {
//   constructor(title, date, content) {
//     this.title = title;
//     this.date = date;
//     this.content = content;
//   }

//   static toString(markdownPath, callback) {
//     fs.readFile(markdownPath, 'utf-8', (err, data) => {
//       if (err) throw err;

//       if (callback) {
//         callback(data);
//       };
//     });
//   }

  // static fetchAll(callback) {
  //   const db = getDb();

  //   return db.collection('blog').find().toArray()
  //     .then(blogs => {
  //       callback(blogs);
  //     })
  //     .catch(err => {
  //       throw err;
  //     });
  // }

//   static getById(id) {
//     const db = getDb();
//     const objectId = new ObjectId(id);
//     const query = { '_id': objectId };

//     return db.collection('blog').find(query).toArray();
//       // .then(result => {
//       //   const blog = result[0];

//       //   callback(blog);
//       // })
//       // .catch(err => {
//       //   throw err;
//       // });
//   }

//   static markdownToHtml(markdown) {
//     const html = converter.makeHtml(markdown);

//     return html;
//   }

//   static htmlToSections(html) {
//     const sectionsRegex = /\n(?=<h3>)/g;

//     const sectionStrings = html.split(sectionsRegex);
//     const sections = [];

//     sectionStrings.shift();
//     sectionStrings.forEach(str => {
//       const section = {};
//       const content = str.split('</h3>\n');

//       section.heading = content[0].replace('<h3>', '');
//       section.content = content[1];

//       sections.push(section);
//     });

//     console.log(sections);

//     return sections;
//   }

//   add() {
//     const db = getDb();
//     const html = Blog.markdownToHtml(this.content);
//     const data = {
//       title: this.title,
//       date: this.date,
//       markdown: this.content,
//       sections: Blog.htmlToSections(html),
//     };

//     db.collection('blog')
//       .insertOne(data)
//       .then(result => {
//         // console.log('add success result: ' + result);
//       })
//       .catch(err => {
//         throw err;
//       })
//   }
// }

// module.exports = Blog;