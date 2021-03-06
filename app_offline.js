const express = require('express');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
var path = require('path');

// const mongoose = require('mongoose');
// const session = require('express-session');
// const MongoDBStore = require('connect-mongodb-session')(session);

const hbs = require('express-handlebars');
const prism = require('prismjs');

require('dotenv').config();
const pw = process.env.DB_PASS;

const MONGODB_URI = `mongodb+srv://Ian:${pw}@cluster0-ipbw3.mongodb.net/blog?retryWrites=true&w=majority`;

const app = express();

const rootDir = require('./util/rootPath');
const helpers = require('./util/handlebarsHelpers');
// const mongoConnect = require('./util/database').mongoConnect;

const mainRoutes = require('./routes/main');
const emailRoutes = require('./routes/email');
const blogRoutes = require('./routes/blog');
const adminRoutes = require('./routes/admin');

app.engine('hbs', hbs({
  extname: 'hbs',
  defaultView: 'default',
  layoutsDir: rootDir + '/views/layouts/',
  partialsDir: rootDir + '/views/partials/',
  helpers: helpers,
}));

app.set('view engine', 'hbs');

app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(rootDir + '/public'));

app.use(emailRoutes);
app.use(blogRoutes);
app.use(adminRoutes);
app.use(mainRoutes);

app.listen(3000);
