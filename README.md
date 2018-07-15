# Setup

To check out the app, head over to https://www.steventortora.com/SubredditBrowser/ (more on how this was done later).

# Technologies

## React

The subreddit browser is built primarily with React. One of the many reasons that React is great for using creating interactive web applications is that it allows for state management via JavaScript instead of in the DOM directly. It's also component-based, which allows for DOM interaction via a tree structure, rather than the often haphazard interaction you get with jQuery.

##create-react-app

To start up the process, I used create-react-app. Create-react-app is a handy tool for quickly setting up a React project because it pre-configures modules like webpack, babel, and jest.

##jQuery

Okay, so I know I dissed jQuery before, but it has one method that's pretty useful for extracting JSON from a webpage, `$.getSON`. `$.getSON` returns a promise, which I used to update the app's state with either search results or an error message.

##enzyme

Enzyme is a module made specifically for React and contains a ton of useful testing methods. In this project, I used enzyme's `shallow` method to render components for testing. I used `shallow` rather than `mount` because I didn't need to render all of a component's children for the tests.

##gh-pages

To deploy the app, I used `gh-pages `, a module that allows you to deploy a React app via github pages. To complete the setup, I added the following to `package.json`:

``` javascript

"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}

```

#Potential Improvements

##Links

Since a post's text gets cut off if its too large for the component it's wrapped in, it would make sense to turn the post's title into a link to the actual post so we can read the rest of it. If given more time, this could be accomplished by including the post's url in the properties we extract from our JSON response and assigning it as the `src` of a `href` tag.  

##Routing

Alternatively, we can use the post's url to make another call to `$.getJSON`. We can then use the response data to construct our own components, and use `react-router` to simulate moving to another page.  

##Testing

There can be more tests. Specifically, we can test whether componentDidUpdate is called after the `<ResultsFeed> ` receives search results. We could also test whether our error message shows when we enter a non-existent subreddit.  

##Styling

Styling could be improved. In particular, the posts move slightly to the left after clicking the next arrow. This is because the first three posts don't include a previous arrow, and the previous arrow, post, and next arrow are all aligned in a row. Some CSS and HTML reformatting would be required to correct this.
