const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const genreSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  blogs: [{type: Schema.Types.ObjectId, ref: 'Blog'}],
});

module.exports = mongoose.model('Genre', genreSchema);
