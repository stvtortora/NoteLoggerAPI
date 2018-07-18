require('./config/config');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var { mongoose } = require('./db/mongoose');
const { Note } = require('./models/note');
const { User } = require('./models/user');
const { authenticate } = require('./middleware/authenticate');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/notes', authenticate, (req, res) => {
  const note = new Note({
    text: req.body.text,
    userId: req.user._id
  });

  note.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/notes', authenticate, (req, res) => {
  Note.find({
    userId: req.user._id
  }).then((notes) => {
    res.send({notes});
  }, (e) =>{
    res.status(400).send(e);
  });
});

app.get('/notes/:id', authenticate, (req, res) => {
  const id = req.params.id;

  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Note.findOne({
    _id: id,
    userId: req.user._id
  }).then(note => {
    if(!note){
      return res.status(404).send();
    }
    res.send({note})
  }).catch((e) => {
    res.status(400).send();
  });
});

app.delete('/notes/:id', authenticate, (req, res) => {
  const id = req.params.id;

  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Note.findOneAndRemove({
    _id: id,
    userId: req.user._id
  }).then(note => {
    if(!note) {
      return res.status(404).send();
    }
    res.send({note})
  }).catch((e) => {
    res.status(400).send();
  });
});

app.patch('/notes/:id', (req, res) => {
  const id = req.params.id;
  const body = _.pick(req.body, ['text']);

  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Note.findByIdAndUpdate(id, {$set: body}, {new: true}).then(note => {
    if(!note) {
      return res.status(404).send();
    }

    res.send({note});
  }).catch((e) => {
    res.status(400).send(e);
  })
})

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
