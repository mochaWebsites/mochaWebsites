const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const hbs = require('express-handlebars');
const prism = require('prismjs');

require('dotenv').config();
const pw = process.env.DB_PASS;

const MONGODB_URI = `mongodb+srv://Ian:${pw}@cluster0-ipbw3.mongodb.net/blog?retryWrites=true&w=majority`;

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

const rootDir = require('./util/rootPath');
const helpers = require('./util/handlebarsHelpers');
// const mongoConnect = require('./util/database').mongoConnect;

const mainRoutes = require('./routes/main');
const formRoutes = require('./routes/email');
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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(rootDir + '/public'));
app.use(session({
  secret: 'my secret',
  resave: false,
  saveUninitialized: false,
  store: store
}));

app.use(formRoutes);
app.use(mainRoutes);
app.use(blogRoutes);
app.use(adminRoutes);

app.listen(3000);

mongoose
  .connect(
    MONGODB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });