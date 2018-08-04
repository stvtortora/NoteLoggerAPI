import { connect } from 'react-redux';
import { signUp } from './../../actions/session_actions';
import SessionForm from './session_form';

const mapStateToProps = state => {
  return ({
    errors: state.errors
  })
}

const mapDispatchToProps = dispatch => {
  return {
    action: (user) => dispatch(signUp(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
