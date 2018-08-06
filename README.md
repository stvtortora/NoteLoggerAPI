# SubRedditBrowser

 SubRedditBrowser allows users to browse posts on reddit by subreddit, save posts, and record private memos about them. It's built with a MERN stack (MongoDB, Express, React+Redux, Node). Check it out at https://glacial-reef-22216.herokuapp.com/.


## Testing React Components

 To build out React components, TDD was applied with jest and enzyme. Below are tests for the resultsFeed component written with jest and enzyme.

 ```javascript

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
         //...three more
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

TDD was also used on the backend to build out express routes. Below are tests for the DELETE method  of the `/subreddits` route written with supertest.

```javascript

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

In order to prevent users from performing CRUD operations on posts that don't belong to them, it was necessary to secure express routes with JSON web tokens (jwt). Below is the method for generating tokens, which is used whenever a user signs in.  

```javascript
UserSchema.methods.generateAuthToken = function () {
  const access = "auth";
  const token = jwt.sign({_id: this._id.toHexString(), access}, process.env.JWT_SECRET).toString();

  this.tokens = this.tokens.concat([{access, token}]);

  return this.save().then(() => {
    return token;
  })
}
```

## Retrieving and Parsing JSON from Reddit

By appending any reddit url with `.json`, you can access the JSON data for that url. This application leverages this API to display subreddits and posts. Below is the code for retrieving and parsing post data. Since reddit comments follow a nested tree structure where each subtree is arbitrarily deep, `formatComments` recursively generates instances of `Comment` components, where comments are passed as props to the comment they're replying to.

```javascript
componentDidMount () {
  this.retrieveData().done(res => {
    this.setState({
      comments: this.formatComments(res[1])
    })
  })
}

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
