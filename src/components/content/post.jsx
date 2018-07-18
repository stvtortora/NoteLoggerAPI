import React from 'react';
import RedditIcon from '../../assets/reddit_icon.svg';

const Post = ({ data }) => {
  debugger
  const thumbnail = data.thumbnail && data.thumbnail.includes('https') ? data.thumbnail : RedditIcon;

  return (
   <div className='post'>
     <img src={ thumbnail } alt='Cannot Display'/>
     <div>
       <h2>{data.title}</h2>
       <p className='author-name' ><strong>Author:</strong> { data.author }</p>
       <p className='post-text' >{data.selftext}</p>
     </div>
   </div>
  )
}

export default Post;
