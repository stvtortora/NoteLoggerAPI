require('./config/config');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {ObjectID} = require('mongodb');

var { mongoose } = require('./db/mongoose');
const { SubReddit } = require('./models/subreddit');
const { User } = require('./models/user');
const { authenticate } = require('./middleware/authenticate');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, X-Auth, Accept");
  res.header("Access-Control-Expose-Headers", "x-auth")
  next();
});

app.get('/', (req, res) => {
  res.send({"message": "it works"});
})

app.post('/subreddits', authenticate, (req, res) => {
  const subreddit = new SubReddit({
    selftext: req.body.selftext,
    userId: req.user._id,
    author: req.body.author,
    thumbnail: req.body.thumbnail,
    title: req.body.title,
  });
  console.log(subreddit)

  subreddit.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    console.log('fuck')
    res.status(400).send(e);
  });
});

app.get('/subreddits', authenticate, (req, res) => {
  SubReddit.find({
    userId: req.user._id
  }).then((subreddits) => {
    res.send({subreddits});
  }, (e) =>{
    res.status(400).send(e);
  });
});


app.delete('/subreddits/:id', authenticate, (req, res) => {
  const id = req.params.id;

  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  SubReddit.findOneAndRemove({
    _id: id,
    userId: req.user._id
  }).then(subreddit => {
    if(!subreddit) {
      return res.status(404).send();
    }
    res.send({subreddit})
  }).catch((e) => {
    res.status(400).send();
  });
});

app.post('/users', (req, res) => {
  const userParams = _.pick(req.body, ['username', 'password']);
  const user = new User(userParams);



  user.save().then(() => {
    return user.generateAuthToken()
  }).then((token) => {
      res.header('x-auth', token).send(user);
  }).catch(e => {
    res.status(400).send(e);
  })
});

app.get('/users/current', authenticate, (req, res) => {
  res.send(req.user);
});

app.post('/users/login', (req, res) => {
  const userParams = _.pick(req.body, ['username', 'password']);

  User.findByCredentials(userParams.username, userParams.password).then(user => {

    return user.generateAuthToken().then(token => {
      res.header('x-auth', token).send(user);
    })
    res.send(user);
  }).catch((e) => {
    res.status(400).send();
  });
})

app.delete('/users/current/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  })
})


app.listen(port, () => {
  console.log(`Started at port ${port}`);
})

module.exports = {app};
