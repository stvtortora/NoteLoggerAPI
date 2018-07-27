import React from 'react';
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
    const form = this.state.signup ? <SignupForm /> : <LoginForm />;
    const message = this.state.signup ? 'Already a member? Login here.' : 'Not a member? Signup instead';

    return (
      <div>
        {form}
        <div onClick={this.toggleState}>{message}</div>
      </div>
    )
  }
}

export default Login;
