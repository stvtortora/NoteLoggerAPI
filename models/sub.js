const mongoose = require('mongoose');

var Sub = mongoose.model('Sub', {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  title: {
    type: String
  },
  permalink: {
    type: String
  },
  memo: {
    type: String
  }
})

module.exports = {Sub};
