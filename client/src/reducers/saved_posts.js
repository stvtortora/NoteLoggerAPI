import { RECEIVE_POSTS, ADD_POST, REMOVE_POST, UPDATE_DOCUMENT } from '../actions/posts_actions';
import { LOGOUT_USER } from '../actions/session_actions';
import merge from 'lodash/merge';

export default (state = {}, action) => {
  let newState;
  switch (action.type) {
    case RECEIVE_POSTS:
      return action.favorites.subreddits.reduce((newState, post) => {
        if (post.docType === 'post') {
          newState[post._id] = post;
        }
        return newState;
      }, {});
    case ADD_POST:
      newState = merge({}, state);
      if (action.post.docType === 'post') {
        newState[action.post._id] = action.post;
      }
      return newState;
    case UPDATE_DOCUMENT:
      newState = merge({}, state);
      if (action.doc.docType === 'post') {
        newState[action.doc._id] = action.doc;
      }
      console.log(newState)
      return newState;
    case REMOVE_POST:
      newState = merge({}, state);
      delete newState[action.postId]
      return newState;
    case LOGOUT_USER:
      return {};
    default:
      return state;
  }
}
