import DocumentHandler from './document_handler';
import { connect } from 'react-redux';
import { updateDocument } from './../../actions/sub_reddit_actions';


const mapStateToProps = state => ({
  data: state.modal.modalData,
  type: 'Update',
  user: state.session
})

const mapDispatchToProps = dispatch => ({
  action: (post, user) => dispatch(updateDocument(post, user))
})

export default connect(mapStateToProps, mapDispatchToProps)(DocumentHandler);
