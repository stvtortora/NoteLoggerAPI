import React from 'react';
import RedditLogo from '../assets/frame-logo-nowords.png';

const Header = () => {
  return(
    <header>
      <img className='header-img' src={RedditLogo} alt='Cannot Display'/>
    </header>
  )
}

export default Header;
