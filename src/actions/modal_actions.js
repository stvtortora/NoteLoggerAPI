export const SET_UP_MODAL = 'SET_UP_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const setUpModal = (modalData, modalType) => {
  return {type: SET_UP_MODAL, modalData, modalType};
}

export const closeModal = () => {
  return {type: CLOSE_MODAL};
}
