import { RECEIVE_USER, LOGOUT_USER } from '../actions/session_actions';

export default (state = null, action) => {
  switch (action.type) {
    case RECEIVE_USER:
      return action.user
    case LOGOUT_USER:
      return null;
    default:
      return state;
  }
}
