const express = require('express');
const bodyParser= require('body-parser');
const multer = require('multer');
// const formidableMiddleware = require('express-formidable');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const favicon = require('serve-favicon');

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

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('destination: mdFiles');
    cb(null, 'mdFiles');
  },
  filename: (req, file, cb) => {
    console.log('filename: ', file.originalname);
    cb(null, file.originalname)
  }
});

const fileFilter = (req, file, cb) => {
  const filename = file.originalname.split('.');
  const len = filename.length;

  if (filename[len - 1] === 'md') {
    console.log('correct mimetype');
    cb(null, true);
  } else {
    console.log('incorrect mimetype ', file.mimetype);
    cb(null, false);
  }
}

app.set('view engine', 'hbs');

app.use(favicon(__dirname + '/public/images/favicon.ico'))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('mdFile'));
// app.use(formidableMiddleware());

app.use(express.static(rootDir + '/public'));
app.use(session({
  secret: 'my secret',
  resave: false,
  saveUninitialized: false,
  store: store
}));

app.use(emailRoutes);
app.use(blogRoutes);
app.use(adminRoutes);
app.use(mainRoutes);

mongoose
  .connect(
    MONGODB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
  )
  .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
