const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Note} = require('./../models/note');

const notes = [{
  text: 'test note 1'
},{
  text: 'test note 2'
}];

beforeEach((done) => {
  Note.remove({}).then(() => {
    return Note.insertMany(notes);
  }).then(() => done());
});

describe('POST /notes', () => {
  it('should create a new note', (done) => {
    const text = 'Test note text';

    request(app)
      .post('/notes')
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

  it('should not create todo with invalid body data', (done) => {
    request(app)
      .post('/notes')
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
    .expect(200)
    .expect((res) => {
      expect(res.body.notes.length).toBe(2);
    })
    .end(done)
  });
});
