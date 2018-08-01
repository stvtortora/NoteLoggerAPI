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

TDD was also used on the backend to build out express routes. Below is the GET method  of the `/subreddits` route, along with tests written with supertest.

## Securing Routes

In order to prevent users from saving, updating, or editing posts that don't belong to them, it was necessary to secure express routes with JSON web tokens (jwt). Below are the methods for generating tokens and finding the user that matches the token sent from the client. The latter is used whenever a user signs in, and the former whenever a user makes a post, patch, or delete request.

## Retrieving and Parsing JSON from Reddit

By appending any reddit url with `.json`, you can access the JSON data for that url. This application leverages this API to display subreddits and posts. Below is the code for retrieving and parsing subreddit information.  



And here is the code for parsing post information:
<!-- ## Technologies



### React

The subreddit browser is built primarily with React. One of the reasons that React is great for creating interactive web applications is that it allows for state management via JavaScript instead of in the DOM directly. It's also component-based, which allows for DOM interaction via a clear tree structure that you don't get with jQuery.

### create-react-app

To start up the process, I used create-react-app. Create-react-app is a handy tool for quickly setting up a React project because it pre-configures webpack and babel along with modules like jest, which I used for testing.

### jQuery

Okay, so I know I criticized jQuery before, but it has one method that's pretty useful for extracting JSON from a webpage, `$.getJSON`. `$.getJSON` returns a promise, which I used to update the app's state with either search results or an error message.

### enzyme

Enzyme is a module made specifically for React and contains a ton of useful testing methods. In this project, I used enzyme's `shallow` method to render components for testing. I used `shallow` rather than `mount` because I didn't need to render all of a component's children for the tests. -->
