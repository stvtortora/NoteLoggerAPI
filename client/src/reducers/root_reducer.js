import { combineReducers } from 'redux';
import session from './session_reducer';
import savedPosts from './saved_posts';
import searchResults from './search_results';
import currentPost from './current_post';
import modal from './modal_reducer';
import errors from './errors_reducer';
import pagination from './pagination';
import ui from './ui_reducer';

const rootReducer = combineReducers({
  session,
  savedPosts,
  searchResults,
  currentPost,
  modal,
  errors,
  pagination,
  ui
});

export default rootReducer;
