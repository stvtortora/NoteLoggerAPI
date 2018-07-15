import React from 'react';
import RedditIcon from '../../assets/reddit_icon.svg';

const Post = ({ data }) => {
  const thumbnail = data.thumbnail ? data.thumbnail : RedditIcon;

  return (
   <div className='post'>
     <img src={ thumbnail } />
     <div>
       <h2>{data.title}</h2>
       <p className='author-name' >Author: {data.author}</p>
       <p className='post-text' >{data.selftext}</p>
     </div>
   </div>
  )
}

export default Post;
