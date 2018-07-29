import React from 'react';
import RedditLogo from '../assets/reddit_logo.svg.png';

const Footer = () => {
  return(
    <footer>
      <p>Powered By</p>
      <div className='img-container' alt='Cannot Display'>
        <img className='footer-img' src={RedditLogo} alt='Cannot Display'/>
      </div>
    </footer>
  )
}

export default Footer;
