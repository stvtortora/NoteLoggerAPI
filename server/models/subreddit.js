const mongoose = require('mongoose');

var SubReddit = mongoose.model('Note', {
  selftext: {
    type: String,
    trim: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  }
})

module.exports = {SubReddit};
