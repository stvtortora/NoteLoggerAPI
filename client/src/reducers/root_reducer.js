import { combineReducers } from 'redux';
import session from './session_reducer';
import subRedditFavs from './sub_reddit_favs';
import searchResults from './search_results';
import currentPost from './current_post';
import modal from './modal_reducer';
import errors from './errors_reducer';
import pagination from './pagination';
import ui from './ui_reducer';

const rootReducer = combineReducers({
  session,
  subRedditFavs,
  searchResults,
  currentPost,
  modal,
  errors,
  pagination,
  ui
});

export default rootReducer;
