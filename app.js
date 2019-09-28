const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer')

const hbs = require('express-handlebars');
const prism = require('prismjs');

const app = express();

const rootDir = require('./util/rootPath');
const mainRoutes = require('./routes/main');

app.engine('hbs', hbs({
  extname: 'hbs',
  defaultView: 'default',
  layoutsDir: rootDir + '/views/layouts/',
  partialsDir: rootDir + '/views/partials/',
  helpers: {
    htmlSnippetStart: function() {
      return '<pre>' + '<code class="language-html">' + '<script type="prism-html-markup">';
    },

    htmlSnippetEnd: function() {
      return '</script></code></pre>';
    },
  }
}));

app.set('view engine', 'hbs');

app.use(express.static(rootDir + '/public'));

app.use(mainRoutes);

app.listen(3000);