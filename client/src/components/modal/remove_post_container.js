import DocumentHandler from './document_handler';
import { connect } from 'react-redux';
import { removeFavorite } from './../../actions/posts_actions';


const mapStateToProps = state => ({
  data: state.modal.modalData,
  type: state.modal.modalType,
  user: state.session
})

const mapDispatchToProps = dispatch => ({
  action: (postId, user) => dispatch(removeFavorite(postId, user))
})

export default connect(mapStateToProps, mapDispatchToProps)(DocumentHandler);
