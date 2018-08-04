import React from 'react';
import { signUp } from './../../actions/session_actions';
import { connect } from 'react-redux';
import {withRouter} from 'react-router';

class SessionForm extends React.Component {
  constructor() {
      super();
      this.state = {
        username: '',
        password: '',
        errorMessge: ''
      };
      this.handleClick = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.action({username: this.state.username, password: this.state.password}).then(res => {
      this.props.history.push('/search');
    })
  }



  render() {
    let usernameError = <div className='blankerrmsg'></div>;
    let passwordError = <div className='blankerrmsg'></div>;
    if (this.props.errors) {
      if (this.state.password.length < 8) {
        passwordError = <div className='errmsg'>Your password must contain at least 8 characters.</div>
      }
      if (this.state.username.length < 4) {
        usernameError = <div className='errmsg'>Your username must contain at least 4 characters.</div>
      }
      if (this.props.errors.errmsg && this.props.errors.errmsg.includes("duplicate key error")) {
        usernameError = <div className='errmsg'>Username already in use.</div>
      }
    }
    return (
      <form className='session-form' onSubmit={this.handleSubmit}>
        <h1>{this.props.formName}</h1>
        <div>{this.state.errorMessge}</div>
        <div className='form-field'>
          <label>Username</label>
          <input type="text" value={this.state.user} onChange={this.handleChange('username')}/>
          {usernameError}
        </div>
        <div className='form-field'>
          <label>Password</label>
          <input type="password" value={this.state.user} onChange={this.handleChange('password')}/>
          {passwordError}
        </div>
        <button type='submit'>{this.props.formName}</button>
      </form>
    )
  }
}

export default withRouter(SessionForm);
