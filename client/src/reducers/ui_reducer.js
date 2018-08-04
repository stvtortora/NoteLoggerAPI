import { SHOW_FAVORITES, SHOW_SEARCH_RESULTS } from '../actions/ui_actions';
import { LOGOUT_USER } from '../actions/session_actions';

export default (state = false, action) => {
  switch (action.type) {
    case SHOW_FAVORITES:
      return true;
    case SHOW_SEARCH_RESULTS:
      return false;
    case LOGOUT_USER:
      return false;
    default:
      return state;
  }
}
