const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

require('dotenv').config();
const pw = process.env.DB_PASS;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    `mongodb+srv://Ian:${pw}@cluster0-ipbw3.mongodb.net/blog?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(client => {
    console.log('Connected!');
    _db = client.db();
    callback(client);
  })
  .catch(err => {
    console.log(err);
  });
}

const getDb = () => {
  if (_db) {
    return _db;
  }

  throw 'No database found!';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;