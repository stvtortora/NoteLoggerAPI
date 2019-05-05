# SubRedditBrowser

 SubRedditBrowser allows users to browse posts on reddit by subreddit, save posts, and record private memos about them. It's built with a MERN stack (MongoDB, Express, React+Redux, Node). Check it out at https://subredditbrowser.herokuapp.com/#/

## Retrieving and parsing JSON from Reddit

 One crucial feature of this app is displaying post information from Reddit. By appending any Reddit url with `.json`, you can access the JSON data for that url. This application leverages this API to display posts. Below is the code for retrieving and parsing post data. Since reddit comments follow a tree structure where each subtree is arbitrarily deep, `formatComments` recursively generates instances of `Comment` components, where comments are passed as props to the comment they're replying to.

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

## Authenticating Express Routes

 Once post information is rendered, users are able to record private memos about them. In order to prevent users from performing CRUD operations on post memos that don't belong to them, it was necessary to add user authentication. As a result, in addition to a post model to store post information, there is also a user model.

 Whenever a user begins a new session, a JSON web token is generated. The token is stored both in the database under the current user and on the frontend in local storage for the duration of the session. Whenever a request is sent to the server, Express middleware queries the database for the user that matches the token. If the user is found, the client receives access to documents associated with the user. Below is the user authentication middleware.

 ```javascript
 const authenticate = (req, res, next) => {
   const token = req.header('x-auth');

   User.findByToken(token).then(user => {
     if(!user) {
       return Promise.reject();
     }

     req.user = user;
     req.token = token;
     next();
   }).catch(e => {
     res.status(401).send();
   })
 }
 ```

 Notice the call to `findByToken`. This is a static method defined on the User schema. It passes a JWT_SECRET environment variable to verify and the token to the```jwt.verify``` method. If its a valid token, it returns the user associated with it. Here's the code:

 ```javascript
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
 ```

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
      //...more tests
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
//more tests
 });
 ```
