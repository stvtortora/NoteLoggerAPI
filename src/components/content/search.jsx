import React from 'react';
import RedditIcon from '../../assets/reddit_icon.svg';

const Search = ({ onInputChange, onSubmit }) => {
  return (
    <div className='search-wrapper'>
      <div className='search'>
        <img src={ RedditIcon } className='reddit-icon' alt='Cannot Display'/>
        <input type='text' placeholder='Search subreddits here...' onChange={ onInputChange }/>
        <br/>
        <button onClick={ onSubmit }>Search</button>
      </div>
    </div>
  )
}

export default Search;
