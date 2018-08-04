import  { UPDATE_PAGINATION, RESET_PAGINATION } from './../actions/ui_actions';

export default (state = {startIdx: 0, endIdx: 3}, action) => {
  switch (action.type) {
    case UPDATE_PAGINATION:
      return {startIdx: state.startIdx + action.offSet, endIdx: state.endIdx + action.offSet}
    case RESET_PAGINATION:
      return {startIdx: 0, endIdx: 3};
    default:
      return state;
  }
}
