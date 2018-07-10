const express = require('express');
const bodyParser = require('body-parser');
const {ObjectId} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {Note} = require('./models/note');
const {User} = require('./models/user');

const app = express();

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

  if(!ObjectId.isValid(id)) {
    return res.status(404).send();
  }

  Note.findById(id).then(note => {
    if(!note){
      return res.status(404).send();res.send({note})
    }
    res.send({note})
  }).catch((e) => {
    res.status(400).send();
  });
});

app.listen(3000, () => {
  console.log('Started on port 3000');
})

module.exports = {app};
