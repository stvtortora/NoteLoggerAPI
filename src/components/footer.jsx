import React from 'react';
import RedditLogo from '../assets/reddit_logo.svg.png';
import FrameLogo from '../assets/frame-logo.png';

const Footer = () => {
  return(
    <footer>
      <p>Powered By</p>
      <div className='img-container'>
        <img className='footer-img' src={RedditLogo} />
        <img className='footer-img' src={FrameLogo} />
      </div>
    </footer>
  )
}

export default Footer;
