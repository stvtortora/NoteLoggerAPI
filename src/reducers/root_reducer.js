import { combineReducers } from 'redux';
import session from './session_reducer';
import subRedditFavs from './sub_reddit_favs';
import errors from './errors_reducer';

const rootReducer = combineReducers({
  session,
  subRedditFavs,
  errors
});

export default rootReducer;
