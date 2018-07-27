const mongoose = require('mongoose');

var SubReddit = mongoose.model('Note', {
  selftext: {
    type: String
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  author: {
    type: String
  },
  thumbnail: {
    type: String
  },
  title: {
    type: String
  },
  permalink: {
    type: String
  }
})

module.exports = {SubReddit};
