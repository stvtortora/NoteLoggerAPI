require('./config/config');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const {ObjectID} = require('mongodb');

var { mongoose } = require('./db/mongoose');
const { SubReddit } = require('./models/subreddit');
const { Sub } = require('./models/sub');
const { User } = require('./models/user');
const { authenticate } = require('./middleware/authenticate');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, X-Auth, Accept");
  res.header("Access-Control-Expose-Headers", "x-auth")
  next();
});

app.get('/', (req, res) => {
  // res.send({"message": "it works"});
})

app.post('/api/subreddits', authenticate, (req, res) => {
  const subreddit = new SubReddit({
    selftext: req.body.selftext,
    userId: req.user._id,
    author: req.body.author,
    thumbnail: req.body.thumbnail,
    title: req.body.title,
    permalink: req.body.permalink,
    memo: req.body.memo,
    docType: req.body.docType
  });

  subreddit.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/api/subreddits', authenticate, (req, res) => {
  console.log('hello!!!!')
  SubReddit.find({
    userId: req.user._id
  }).then((subreddits) => {
    res.send({subreddits});
  }, (e) =>{
    res.status(400).send(e);
  });
});

app.patch('/api/subreddits/:id', authenticate, (req, res) => {
  const id = req.params.id;
  const body = _.pick(req.body, ['memo']);
   if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
   SubReddit.findOneAndUpdate({_id: id, userId: req.user._id}, {$set: body}, {new: true}).then(subreddit => {
    if(!subreddit) {
      return res.status(404).send();
    }
     res.send({subreddit});
  }).catch((e) => {
    res.status(400).send();
  })
})


app.delete('/api/subreddits/:id', authenticate, (req, res) => {
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

app.post('/api/users', (req, res) => {
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

app.get('/api/users/current', authenticate, (req, res) => {
  res.send(req.user);
});

app.post('/api/users/login', (req, res) => {
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

app.delete('/api/users/current/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  })
})

if (process.env.NODE_EV === 'production') {
  app.use(express.static(path.join(__dirname, "client", "build")));

  app.get('*', (req, res) => {
     res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  })
}


app.listen(port, () => {
  console.log(`Started at port ${port}`);
})

module.exports = {app};
