const express = require('express');
const bodyParser = require('body-parser');

const hbs = require('express-handlebars');
const prism = require('prismjs');

const app = express();

const rootDir = require('./util/rootPath');
const helpers = require('./util/handlebarsHelpers');
const mainRoutes = require('./routes/main');
const formRoutes = require('./routes/form');
const blogRoutes = require('./routes/blog');

app.engine('hbs', hbs({
  extname: 'hbs',
  defaultView: 'default',
  layoutsDir: rootDir + '/views/layouts/',
  partialsDir: rootDir + '/views/partials/',
  helpers: helpers,
}));

app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(rootDir + '/public'));

app.use(formRoutes);
app.use(mainRoutes);
app.use(blogRoutes);

app.listen(3000);