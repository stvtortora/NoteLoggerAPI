const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 4,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});


UserSchema.methods.generateAuthToken = function () {
  const access = "auth";
  const token = jwt.sign({_id: this._id.toHexString(), access}, 'secret123').toString();

  this.tokens = this.tokens.concat([{access, token}]);

  return this.save().then(() => {
    return token;
  })
}

UserSchema.statics.findByToken = function (token) {
  let decoded;

  try {
    decoded = jwt.verify(token, 'secret123');
  } catch (e) {
    return Promise.reject();
  }

  return this.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
}

UserSchema.methods.toJSON = function () {
  return _.pick(this.toObject(), ['_id', 'username']);
}

UserSchema.pre('save', function (next) {

  if(this.isModified('password')) {
    bcrypt.genSalt(8, (err, salt) => {
      bcrypt.hash(this.password, salt, (err, hash) => {
        this.password = hash;
        next();
      })
    })
  } else {
    next();
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = {User};
