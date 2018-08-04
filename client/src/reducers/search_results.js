import  { RECEIVE_SEARCH_RESULTS } from './../actions/sub_reddit_actions';
import  { LOGOUT_USER } from './../actions/session_actions';

export default (state = [], action) => {
  switch (action.type) {
    case RECEIVE_SEARCH_RESULTS:
      return action.results;
    case LOGOUT_USER:
      return [];
    default:
      return state;
  }
}
