import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { clearSessionErrors } from '../../actions/session_actions';
import SignupForm from './signup_form_container';
import LoginForm from './login_form_container';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {signup: true}
    this.toggleState = this.toggleState.bind(this)
  }

  componentWillMount () {
    if (this.props.user) {
      this.props.history.push('/search');
    }
  }

  toggleState() {
    this.props.clearSessionErrors()
    this.setState({
      signup: !this.state.signup
    });
  }

  render() {
    const form = this.state.signup ? <SignupForm formName={'Sign Up'}/> : <LoginForm formName={'Login'}/>;
    const message = this.state.signup ? 'Already a member? Login.' : 'Not a member? Signup.';

    return (
      <div className='login-background'>
        <div className='login'>
        {form}
        <div className='toggleLogin' onClick={this.toggleState}>{message}</div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.session
})

const mapDispatchToProps = dispatch => {
  return {
    clearSessionErrors: () => dispatch(clearSessionErrors())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
