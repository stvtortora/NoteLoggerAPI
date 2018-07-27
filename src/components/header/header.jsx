import React from 'react';
import RedditLogo from './../../assets/frame-logo-nowords.png';
import Menu from './menu'

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

export default Header;
