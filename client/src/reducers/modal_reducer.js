import { SET_UP_MODAL, CLOSE_MODAL } from '../actions/modal_actions';

export default (state = null, action) => {
  switch (action.type) {
    case SET_UP_MODAL:
      return {modalData: action.modalData, modalType: action.modalType};
    case CLOSE_MODAL:
      return null;
    default:
      return state;
  }
}
