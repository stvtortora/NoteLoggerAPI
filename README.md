# Setup

To check out the app, head over to https://www.steventortora.com/SubredditBrowser/ (more on how this was done later).

# Technologies

## React

The subreddit browser is built primarily with React. One of the reasons that React is great for creating interactive web applications is that it allows for state management via JavaScript instead of in the DOM directly. It's also component-based, which allows for DOM interaction via a clear tree structure that you don't get with jQuery.

## create-react-app

To start up the process, I used create-react-app. Create-react-app is a handy tool for quickly setting up a React project because it pre-configures webpack and babel along with modules like jest, which I used for testing.

## jQuery

Okay, so I know I criticized jQuery before, but it has one method that's pretty useful for extracting JSON from a webpage, `$.getJSON`. `$.getJSON` returns a promise, which I used to update the app's state with either search results or an error message.

## enzyme

Enzyme is a module made specifically for React and contains a ton of useful testing methods. In this project, I used enzyme's `shallow` method to render components for testing. I used `shallow` rather than `mount` because I didn't need to render all of a component's children for the tests.

## gh-pages

To deploy the app, I used `gh-pages `, which leverages github pages. To complete the setup, I added the following to `package.json`:

``` javascript

"homepage": "https://www.steventortora.com/SubredditBrowser/",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}

```

# Potential Improvements

## Links

Since a post's text gets cut off if its too large, it would make sense to turn the post's title into a link to the actual post so we can read the rest of it. If given more time, this could be accomplished by including the post's url in the properties we extract from our JSON response and assigning it as the `src` of a `href` tag.  

## Routing

Alternatively, we can use the post's url to make another call to `$.getJSON`. We can then use the response data to construct our own components, and use `react-router` to simulate moving to another page.  

## Testing

There can be more tests. Specifically, we can test whether `componentDidUpdate` is called after the `<ResultsFeed> ` receives search results. We could also test if our error message shows when we enter a non-existent subreddit.   

Another route we can go is testing the methods we use to fetch and filter JSON. More specifically, we could test if `parseInput` returns its input with spaces removed, and if `filterResults` outputs the specific data we want.
