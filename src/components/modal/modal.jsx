import React from 'react';
import { connect } from 'react-redux';
import SavePost from './save_post_container';
import RemovePost from './remove_post_container';
import EditPost from './edit_post_container';
import {closeModal } from './../../actions/modal_actions';

const Modal = ({modal, closeModal}) => {
  if (!modal) {
    return null;
  }

  let display;
  if (modal.modalType === '+Save') {
    display = <SavePost />
  } else if (modal.modalType === '-Remove') {
    display = <RemovePost />
  } else {
    display = <EditPost />
  }

  return (
    <div className="modal-background" onClick={closeModal}>
      <div className="modal-child" onClick={e => e.stopPropagation()}>
        {display}
      </div>
    </div>
  );
}

const mapStateToProps = state => {

  return {
    modal: state.modal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
