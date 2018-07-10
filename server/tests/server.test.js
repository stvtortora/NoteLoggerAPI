const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Note} = require('./../models/note');

beforeEach((done) => {
  Note.remove({}).then(() => {
    done();
  });
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

      Note.find().then((notes) => {
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
        expect(notes.length).toBe(0);
        done();
      }).catch((e) => done(e));
    });
  });
});
