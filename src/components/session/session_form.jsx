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
    return (
      <form className='session-form' onSubmit={this.handleSubmit}>
        <h1>{this.props.formName}</h1>
        <div>{this.state.errorMessge}</div>
        <div className='form-field'>
          <label>Username</label>
          <input type="text" value={this.state.user} onChange={this.handleChange('username')}/>
        </div>
        <div className='form-field'>
          <label>Password</label>
          <input type="password" value={this.state.user} onChange={this.handleChange('password')}/>
        </div>
        <button type='submit'>{this.props.formName}</button>
      </form>
    )
  }
}

export default withRouter(SessionForm);
