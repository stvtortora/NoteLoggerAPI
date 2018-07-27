import * as APIUtil from './../util/api_util';

export const RECEIVE_SUBREDDITS = 'RECEIVE_SUBREDDITS';
export const ADD_SUBREDDIT = 'ADD_SUBREDDIT';
export const REMOVE_SUBREDDIT = 'REMOVE_SUBREDDIT';
export const UPDATE_CURRENT_POST = 'UPDATE_CURRENT_POST';

export const fetchSubReddits = (user) => dispatch => (
  APIUtil.fetchSubReddits(user).then((favorites) => dispatch({type: RECEIVE_SUBREDDITS, favorites}))
)

export const addFavorite = (post, user) => dispatch => (
  APIUtil.addSubReddit(post, user).then((subReddit) => dispatch({type: ADD_SUBREDDIT, subReddit}))
)

export const removeFavorite = (postId, user) => dispatch => (
  APIUtil.removeSubReddit(postId, user).then(() => dispatch({type: REMOVE_SUBREDDIT, postId}))
)

export const updateCurrentPost = permalink => ({
  type: UPDATE_CURRENT_POST, permalink
})
