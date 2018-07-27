import React from 'react';
import RedditLogo from './../../assets/frame-logo-nowords.png';
import Menu from './menu'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { logout } from './../../actions/session_actions';

class Header extends React.Component {

  render() {
    return(
      <header>
        <img className='header-img' src={RedditLogo} alt='Cannot Display'/>
        <Menu/>
      </header>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.session
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: (user) => dispatch(logout(user))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
