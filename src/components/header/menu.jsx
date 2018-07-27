import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { logout } from './../../actions/session_actions';
import { showFavorites } from './../../actions/ui_actions';

class Menu extends React.Component {
  constructor(props) {
    super(props);
  }

  handleLogout = () => {
    this.props.logout(this.props.user).then(() => {
      this.props.history.push('./');
    });
  }

  // handleRedirect = (path) => {
  //   () => {
  //     this.props.history.push(path)
  //   }
  // }

  render () {
    if (this.props.user) {
      return (
        <div className='menu'>
          <div className='menu-display'></div>
          <div className='menu-display'></div>
          <div className='menu-display'></div>
          <div className='menu-dropdown'>
            <p className='menu-option' onClick={() => this.props.showFavorites()}>Favorite Posts</p>
            <p className='menu-option' onClick={this.handleLogout}>Logout</p>
          </div>
        </div>
      )
    }

    return null;
  }
}

const mapStateToProps = state => {
  return {
    user: state.session
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: (user) => dispatch(logout(user)),
    showFavorites: () => dispatch(showFavorites())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Menu));


// <p className='menu-option' onClick={this.handleRedirect('./search')}>Search</p>
