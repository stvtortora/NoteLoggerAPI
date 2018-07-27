import { RECEIVE_SUBREDDITS, ADD_SUBREDDIT, REMOVE_SUBREDDIT } from '../actions/sub_reddit_actions';
import { LOGOUT_USER } from '../actions/session_actions';
import merge from 'lodash/merge';

export default (state = {}, action) => {
  let newState;
  switch (action.type) {
    case RECEIVE_SUBREDDITS:
      return action.subReddits.reduce((newState, subReddit) => {
        newState[subReddit._id] = subReddit;
        return newState;
      }, {})
    case ADD_SUBREDDIT:
      newState = merge({}, state);
      newState[action.subReddit._id] = action.subReddit;
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
