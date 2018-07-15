import React from 'react';
import RedditLogo from '../assets/frame-logo-nowords.png';

const Header = () => {
  return(
    <header>
      <img className='header-img' src={RedditLogo} />
    </header>
  )
}

export default Header;
