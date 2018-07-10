const mongoose = require('mongoose');

const User = mongoose.model('User', {
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 4
  }
})

module.exports = {User};
