// const mongoDb = require('mongodb');
// const ObjectId = mongoDb.ObjectId;
// const getDb = require('../util/database.js').getDb;

const mongoose = require('mongoose');

const Schema = mongoose.Schema

const genreSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  blogs: {
    type: {
      type: Schema.Types.ObjectId, 
      ref: 'Blog'
    }
  }
});

module.exports = mongoose.model('Genre', genreSchema);

// class Category {
  //   constructor(title) {
  //     this.title = title;
  //   }
  
  //   static fetchAll(callback) {
  //     const db = getDb();
  
  //     db.collection('categories')
  //       .find()
  //       .toArray()
  //       .then(result => {
  //         callback(result);
  //       })
  //       .catch(err => {
  //         throw err
  //       });
  //   }
  
  //   add(callback) {
  //     const db = getDb();
  //     const objId = ObjectId();
  
  //     db.collection('categories_proxy')
  //       .insertOne({ '_id': this.title })
  //       .then(_ => {
  //         db.collection('categories')
  //           .insertOne({ '_id': objId, title: this.title })
  //           .then(result => {
  //             console.log('successfully added!');
  //             callback(result);
  //           })
  //           .catch(err => {
  //             throw err;
  //           });
  //       })
  //       .catch(err => {
  //         throw err;
  //       });
  //   }
  
  //   remove(id, callback) {
  //     const db = getDb();
  //     const objId = ObjectId(id);
  
  //     db.collection('categories')
  //       .deleteOne({ "_id": objId })
  //       .then(result => {
  //         console.log(result);
  //       })
  //       .catch(err => {
  //         throw err;
  //       });
  //   }
  
  //   edit(id, editObj, callback) {
  
  //   }
  // }