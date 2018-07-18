const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Note} = require('./../models/note');
const {notes, generateNotes, users, generateUsers} = require('./seed/seed');


beforeEach(generateUsers);
beforeEach(generateNotes);

describe('POST /notes', () => {
  it('should create a new note', (done) => {
    const text = 'Test note text';

    request(app)
      .post('/notes')
      .set('x-auth', users[0].tokens[0].token)
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
    })
    .end((err, res) => {
      if(err) {
        return done(err);
      }

      Note.find({text}).then((notes) => {
        expect(notes.length).toBe(1);
        expect(notes[0].text).toBe(text);
        done();
      }).catch((e) => done(e));
    });
  });

  it('should not create note with invalid body data', (done) => {
    request(app)
      .post('/notes')
      .set('x-auth', users[0].tokens[0].token)
      .send({})
      .expect(400)
    .end((err, res) => {
      if(err) {
        return done(err);
      }

      Note.find().then((notes) => {
        expect(notes.length).toBe(2);
        done();
      }).catch((e) => done(e));
    });
  });
});

describe('GET /notes', () => {
  it('should get all notes', (done) => {
    request(app)
    .get('/notes')
    .set('x-auth', users[0].tokens[0].token)
    .expect(200)
    .expect((res) => {
      expect(res.body.notes.length).toBe(1);
    })
    .end(done)
  });
});

describe('GET /notes/:id', () => {
  it('should get a single note', (done) => {
    request(app)
    .get(`/notes/${notes[0]._id.toHexString()}`)
    .set('x-auth', users[0].tokens[0].token)
    .expect(200)
    .expect(res => {
      expect(res.body.note.text).toBe(notes[0].text)
    })
    .end(done);
  });

  it('should not get a note created by a different user', (done) => {
    request(app)
    .get(`/notes/${notes[1]._id.toHexString()}`)
    .set('x-auth', users[0].tokens[0].token)
    .expect(404)
    .end(done);
  });

  it('should return 404 if note is not found', (done) => {
    const outSideId = new ObjectID().toHexString();
    request(app)
    .get(`/notes/${outSideId}`)
    .set('x-auth', users[0].tokens[0].token)
    .expect(404)
    .end(done)
  });

  it('should return 404 for invalid ids', (done) => {
    request(app)
    .get(`/notes/invalidId`)
    .set('x-auth', users[0].tokens[0].token)
    .expect(404)
    .end(done)
  });
})

describe('DELETE /notes/:id', () => {
  it('should delete a single note', (done) => {
    const id = notes[1]._id.toHexString();

    request(app)
    .delete(`/notes/${id}`)
    .set('x-auth', users[1].tokens[0].token)
    .expect(200)
    .expect((res) => {
      expect(res.body.note._id).toBe(id)
    })
    .end((err, res) => {
      if(err){
        return done(err);
      }

      Note.findById(id).then((note) => {
        expect(note).toBeFalsy();
        done();
      }).catch((e) => done(e));
    })
  })

  it('should not delete a note created by a different user', (done) => {
    const id = notes[0]._id.toHexString();

    request(app)
    .delete(`/notes/${id}`)
    .set('x-auth', users[1].tokens[0].token)
    .expect(404)
    .end((err, res) => {
      if(err){
        return done(err);
      }

      Note.findById(id).then((note) => {
        expect(note).toBeTruthy();
        done();
      }).catch((e) => done(e));
    })
  })


  it('should return 404 if note is not found', done => {
    const outSideId = new ObjectID().toHexString();
    request(app)
    .delete(`/notes/${outSideId}`)
    .set('x-auth', users[1].tokens[0].token)
    .expect(404)
    .end(done)
  });

  it('should return 404 for invalid ids', (done) => {
    request(app)
    .delete(`/notes/invalidId`)
    .set('x-auth', users[1].tokens[0].token)
    .expect(404)
    .end(done)
  });
});

describe('PATCH /notes/:id', () => {
  it('should update the note', done => {
    const id = notes[1]._id.toHexString();
    const text = 'new text';

    request(app)
    .patch(`/notes/${id}`)
    .send({text})
    .expect(200)
    .expect(res => {
      expect(res.body.note.text).toBe(text)
    })
    .end(done);
  });
})
