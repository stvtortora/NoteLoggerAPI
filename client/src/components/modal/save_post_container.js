import DocumentHandler from './document_handler';
import { connect } from 'react-redux';
import { addFavorite } from './../../actions/posts_actions';


const mapStateToProps = state => ({
  data: state.modal.modalData,
  type: state.modal.modalType,
  user: state.session
})

const mapDispatchToProps = dispatch => ({
  action: (post, user) => dispatch(addFavorite(post, user))
})

export default connect(mapStateToProps, mapDispatchToProps)(DocumentHandler);
