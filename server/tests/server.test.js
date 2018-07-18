const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {SubReddit} = require('./../models/subreddit');
const {subreddits, generateSubReddits, users, generateUsers} = require('./seed/seed');


beforeEach(generateUsers);
beforeEach(generateSubReddits);

describe('POST /subreddits', () => {
  it('should create a new subreddit', (done) => {
    const text = 'Test subreddit text';

    request(app)
      .post('/subreddits')
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

      SubReddit.find({text}).then((subreddits) => {
        expect(subreddits.length).toBe(1);
        expect(subreddits[0].text).toBe(text);
        done();
      }).catch((e) => done(e));
    });
  });

  it('should not create subreddit with invalid body data', (done) => {
    request(app)
      .post('/subreddits')
      .set('x-auth', users[0].tokens[0].token)
      .send({})
      .expect(400)
    .end((err, res) => {
      if(err) {
        return done(err);
      }

      SubReddit.find().then((subreddits) => {
        expect(subreddits.length).toBe(2);
        done();
      }).catch((e) => done(e));
    });
  });
});

describe('GET /subreddits', () => {
  it('should get all subreddits', (done) => {
    request(app)
    .get('/subreddits')
    .set('x-auth', users[0].tokens[0].token)
    .expect(200)
    .expect((res) => {
      expect(res.body.subreddits.length).toBe(1);
    })
    .end(done)
  });
});


describe('DELETE /subreddits/:id', () => {
  it('should delete a single subreddit', (done) => {
    const id = subreddits[1]._id.toHexString();

    request(app)
    .delete(`/subreddits/${id}`)
    .set('x-auth', users[1].tokens[0].token)
    .expect(200)
    .expect((res) => {
      expect(res.body.subreddit._id).toBe(id)
    })
    .end((err, res) => {
      if(err){
        return done(err);
      }

      SubReddit.findById(id).then((subreddit) => {
        expect(subreddit).toBeFalsy();
        done();
      }).catch((e) => done(e));
    })
  })

  it('should not delete a subreddit created by a different user', (done) => {
    const id = subreddits[0]._id.toHexString();

    request(app)
    .delete(`/subreddits/${id}`)
    .set('x-auth', users[1].tokens[0].token)
    .expect(404)
    .end((err, res) => {
      if(err){
        return done(err);
      }

      SubReddit.findById(id).then((subreddit) => {
        expect(subreddit).toBeTruthy();
        done();
      }).catch((e) => done(e));
    })
  })


  it('should return 404 if subreddit is not found', done => {
    const outSideId = new ObjectID().toHexString();
    request(app)
    .delete(`/subreddits/${outSideId}`)
    .set('x-auth', users[1].tokens[0].token)
    .expect(404)
    .end(done)
  });

  it('should return 404 for invalid ids', (done) => {
    request(app)
    .delete(`/subreddits/invalidId`)
    .set('x-auth', users[1].tokens[0].token)
    .expect(404)
    .end(done)
  });
});
