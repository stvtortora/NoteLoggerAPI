import { RECEIVE_SESSION_ERRORS, CLEAR_SESSION_ERRORS } from '../actions/session_actions';

export default (state = null, action) => {
  switch (action.type) {
    case RECEIVE_SESSION_ERRORS:
      return action.errors
    case CLEAR_SESSION_ERRORS:
      return null;
    default:
      return null;
  }
}
