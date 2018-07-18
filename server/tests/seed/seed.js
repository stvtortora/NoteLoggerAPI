const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Note} = require('./../../models/note');
const {User} = require('./../../models/user');

const testUserOneId = new ObjectID();
const testUserTwoId = new ObjectID();

const users = [{
  _id: testUserOneId,
  username: 'Username',
  password: 'useronepassword',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: testUserOneId, access: 'auth'}, 'secret123').toString()
  }]
}, {
  _id: testUserTwoId,
  username: 'AnotherName',
  password: 'usertwopassword',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: testUserTwoId, access: 'auth'}, 'secret123').toString()
  }]
}];

const generateUsers = (done) => {
  User.remove({}).then(() => {
    const userOne = new User(users[0]).save();
    const userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo])
  }).then(() => done());
}

const notes = [{
  _id: new ObjectID(),
  text: 'test note 1',
  userId: testUserOneId
}, {
  _id: new ObjectID(),
  text: 'test note 2',
  userId: testUserTwoId
}];

const generateNotes = (done) => {
  Note.remove({}).then(() => {
    return Note.insertMany(notes);
  }).then(() => done());
}

module.exports = {notes, generateNotes, users, generateUsers};
