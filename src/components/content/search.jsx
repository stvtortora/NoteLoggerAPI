import React from 'react';
import RedditIcon from '../../assets/reddit_icon.svg';

const Search = ({ onInputChange, onSubmit }) => {
  return (
    <div>
      <img src={ RedditIcon } className='reddit-icon'/>
        <div className='search'>
          <input type='text' placeholder='Search subreddits here...' onChange={onInputChange}/>
          <br/>
          <button onClick={onSubmit}>Search</button>
        </div>
    </div>
  )
}

export default Search;
