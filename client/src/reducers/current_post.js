import  { UPDATE_CURRENT_POST } from './../actions/sub_reddit_actions';

export default (state = null, action) => {
  switch (action.type) {
    case UPDATE_CURRENT_POST:
      return action.data
    default:
      return state;
  }
}
