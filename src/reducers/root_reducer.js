import { combineReducers } from 'redux';
import session from './session_reducer';
import subRedditFavs from './sub_reddit_favs';
import currentPost from './current_post';
import modal from './modal_reducer';
import errors from './errors_reducer';
import ui from './ui_reducer';

const rootReducer = combineReducers({
  session,
  subRedditFavs,
  currentPost,
  modal,
  errors,
  ui
});

export default rootReducer;
