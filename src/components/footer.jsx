import React from 'react';
import RedditLogo from '../assets/reddit_logo.svg.png';
import FrameLogo from '../assets/frame-logo.png';

const Footer = () => {
  return(
    <footer>
      <p>Powered By</p>
      <div className='img-container' alt='Cannot Display'>
        <img className='footer-img' src={RedditLogo} alt='Cannot Display'/>
        <img className='footer-img' src={FrameLogo} alt='Cannot Display'/>
      </div>
    </footer>
  )
}

export default Footer;
