require('./config/config');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {Note} = require('./models/note');
const {User} = require('./models/user');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/notes', (req, res) => {
  const note = new Note({
    text: req.body.text
  });

  note.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/notes', (req, res) => {
  Note.find().then((notes) => {
    res.send({notes});
  }, (e) =>{
    res.status(400).send(e);
  });
});

app.get('/notes/:id', (req, res) => {
  const id = req.params.id;

  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Note.findById(id).then(note => {
    if(!note){
      return res.status(404).send();
    }
    res.send({note})
  }).catch((e) => {
    res.status(400).send();
  });
});

app.delete('/notes/:id', (req, res) => {
  const id = req.params.id;

  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Note.findByIdAndRemove(id).then(note => {
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
    res.status(400).send();
  })
})

app.listen(port, () => {
  console.log(`Started at port ${port}`);
})

module.exports = {app};
