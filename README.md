# SubRedditBrowser

 SubRedditBrowser allows users to browse posts on reddit by subreddit, save posts, and record private memos about them. It's built with a MERN stack (MongoDB, Express, React+Redux, Node).


## Testing React Components

 To build to React components, TDD was employed with jest and enzyme. Below is the return value of the resultsFeed component's render method, along with some tests written with jest and enzyme.

 ```javascript
 return(
   <div className='feed'>
     <div>{previousArrow}</div>
     <div>
       {posts}
     </div>
     <div>{nextArrow}</div>
   </div>
 )

 describe('<ResultsFeed>', () => {
   let props;
   let mountedResultsFeed;

   const resultsFeed = () => {
     if (!mountedResultsFeed) {
       mountedResultsFeed = shallow(
         <ResultsFeed {...props} />
       );
     }
     return mountedResultsFeed;
   }

   beforeEach(() => {
     props = {
       searchResults: [],
       favorites: {},
       user: {}
     };

     mountedResultsFeed = undefined;
   })

   describe('when fed search results', () => {
     beforeEach(() => {
       props.searchResults = [
         {
           "author": 'Author1',
           "title": "Post1",
           "thumbnail": null,
           "selftext": "Some text",
           "otherProp": "A property"
         },
         {
           "author": 'Author2',
           "title": "Post2",
           "thumbnail": null,
           "selftext": "Some text",
           "otherProp": "A property"
         },
         {
           "author": 'Author3',
           "title": "Post3",
           "thumbnail": null,
           "selftext": "Some text",
           "otherProp": "A property"
         },
         {
           "author": 'Author4',
           "title": "Post4",
           "thumbnail": null,
           "selftext": "Some text",
           "otherProp": "A property"
         }
       ]
     });

     it("displays at most three posts", () => {
       expect(resultsFeed().find(Post).length).toBe(3);
     })

     it("displays a next arrow with the first three posts", () => {
       expect(resultsFeed().find('.next').length).toBe(1);
     })
   })

   describe('when not fed searchResults', () => {
     it('renders nothing', () => {
       expect(resultsFeed().children().length).toBe(0);
     })
   })
 })

 ```


## Testing Express Routes

TDD was also used on the backend to build out express routes. Below is the DELETE method  of the `/subreddits` route, along with tests written with supertest.

```javascript

//delete method
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

///tests
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
```


## Securing Routes

In order to prevent users from saving, updating, or editing posts that don't belong to them, it was necessary to secure express routes with JSON web tokens (jwt). Below are the methods for generating tokens and finding the user that matches the token sent from the client. The latter is used whenever a user signs in, and the former whenever a user makes a post, patch, or delete request.  

```javascript
UserSchema.methods.generateAuthToken = function () {
  const access = "auth";
  const token = jwt.sign({_id: this._id.toHexString(), access}, process.env.JWT_SECRET).toString();

  this.tokens = this.tokens.concat([{access, token}]);

  return this.save().then(() => {
    return token;
  })
}

UserSchema.statics.findByToken = function (token) {
  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (e) {
    return Promise.reject();
  }

  return this.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
}

UserSchema.methods.toJSON = function () {
  return _.pick(this.toObject(), ['_id', 'username']);
}

UserSchema.methods.removeToken = function (token) {
  return this.update({
    $pull: {
      tokens: {
        token
      }
    }
  })
}
```

## Retrieving and Parsing JSON from Reddit

By appending any reddit url with `.json`, you can access the JSON data for that url. This application leverages this API to display subreddits and posts. Below is the code for retrieving and parsing subreddit information.  

```javascript
filterResults = (results) => {
  return results.data.children.map(post => {
    return Object.keys(post.data).reduce((postData, key) => {
      if(["author", "title", "thumbnail", "selftext", "permalink"].includes(key)){
        postData[key] = post.data[key];
      }

      return postData;
    }, {});
  });
}


onSubmit = () => {
  this.retrieveData(this.state.input).done(res => {
    this.setState({
      subRedditTitle: this.state.input,
      searchResults: this.filterResults(res),
      errorMessage: ''
    });
    this.props.showSearchResults()
  }).fail(() => {
    this.setState({
      errorMessage: 'Please enter the name of an existing subreddit.'
    });
  });
}

parseInput = (input) => {
  return input.split(' ').join('');
}

retrieveData = (input) => {
  return $.getJSON(`https://www.reddit.com/r/${this.parseInput(input)}.json`, res => {
    return res;
  });
}
```

And here is the code for parsing post information:

```javascript
formatComments = (comments) => {
  return comments.data.children.map(comment => {
    let replies;
    if (comment.data.replies && comment.data.replies !== '') {
      replies = this.formatComments(comment.data.replies);
    }
    return <Comment author={comment.data.author} body={comment.data.body} replies={replies} />
  })
}

retrieveData = () => {
  return $.getJSON(`https://www.reddit.com${this.props.data.permalink}.json`, res => {
    return res;
  });
}

```
