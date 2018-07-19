const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {SubReddit} = require('./../../models/subreddit');
const {User} = require('./../../models/user');

const testUserOneId = new ObjectID();
const testUserTwoId = new ObjectID();


const users = [{
  _id: testUserOneId,
  username: 'Username',
  password: 'useronepassword',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: testUserOneId, access: 'auth'}, process.env.JWT_SECRET).toString()
  }]
}, {
  _id: testUserTwoId,
  username: 'AnotherName',
  password: 'usertwopassword',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: testUserTwoId, access: 'auth'}, process.env.JWT_SECRET).toString()
  }]
}];

const generateUsers = (done) => {
  User.remove({}).then(() => {
    const userOne = new User(users[0]).save();
    const userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo])
  }).then(() => done());
}

const subreddits = [{
  _id: new ObjectID(),
  text: 'test subreddit 1',
  userId: testUserOneId
}, {
  _id: new ObjectID(),
  text: 'test subreddit 2',
  userId: testUserTwoId
}];

const generateSubReddits = (done) => {
  SubReddit.remove({}).then(() => {
    return SubReddit.insertMany(subreddits);
  }).then(() => done());
}

module.exports = {subreddits, generateSubReddits, users, generateUsers};
