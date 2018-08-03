import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import SignupForm from './signup_form_container';
import LoginForm from './login_form_container';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {signup: true}
  }

  toggleState = () => {
    this.setState({
      signup: !this.state.signup
    });
  }

  render() {
    if (this.props.user) {
      this.props.history.push('/search');
      return null;
    }
    const form = this.state.signup ? <SignupForm formName={'Signup'}/> : <LoginForm formName={'Login'}/>;
    const message = this.state.signup ? 'Already a member? Login here.' : 'Not a member? Signup instead';

    return (
      <div className='login'>
        {form}
        <div onClick={this.toggleState}>{message}</div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.session
})

export default withRouter(connect(mapStateToProps)(Login));
