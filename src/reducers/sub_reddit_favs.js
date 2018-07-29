import { RECEIVE_SUBREDDITS, ADD_SUBREDDIT, REMOVE_SUBREDDIT } from '../actions/sub_reddit_actions';
import { LOGOUT_USER } from '../actions/session_actions';
import merge from 'lodash/merge';

export default (state = {}, action) => {
  let newState;
  switch (action.type) {
    case RECEIVE_SUBREDDITS:
    console.log(action.type)
    debugger
      const nextState = action.favorites.subreddits.reduce((newState, subReddit) => {
        newState[subReddit._id] = subReddit;
        return newState;
      }, {});
      console.log(nextState);
      return nextState;
    case ADD_SUBREDDIT:
      newState = merge({}, state);
      newState[action.subReddit._id] = action.subReddit;
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
