import { RECEIVE_SUBREDDITS, ADD_SUBREDDIT, REMOVE_SUBREDDIT, UPDATE_DOCUMENT } from '../actions/sub_reddit_actions';
import { LOGOUT_USER } from '../actions/session_actions';
import merge from 'lodash/merge';

export default (state = {}, action) => {
  let newState;
  switch (action.type) {
    case RECEIVE_SUBREDDITS:
      return action.favorites.subreddits.reduce((newState, subReddit) => {
        if (subReddit.docType === 'post') {
          newState[subReddit._id] = subReddit;
        }
        return newState;
      }, {});
    case ADD_SUBREDDIT:
      newState = merge({}, state);
      if (action.subReddit.docType === 'post') {
        newState[action.subReddit._id] = action.subReddit;
      }
      return newState;
    case UPDATE_DOCUMENT:
      newState = merge({}, state);
      if (action.doc.docType === 'post') {
        newState[action.doc._id] = action.doc;
      }
      console.log(newState)
      return newState;
    case REMOVE_SUBREDDIT:
      newState = merge({}, state);
      delete newState[action.postId]
      return newState;
    case LOGOUT_USER:
      return {};
    default:
      return state;
  }
}
