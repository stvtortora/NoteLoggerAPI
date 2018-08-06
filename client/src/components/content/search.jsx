import React from 'react';
import RedditIcon from '../../assets/reddit_icon.svg';

const Search = ({ onInputChange, handleSubmit, handleKeyPress }) => {
  return (
    <div className='search-wrapper'>
      <div className='search'>
        <img src={ RedditIcon } className='reddit-icon' alt='Cannot Display'/>
        <input onKeyPress={handleKeyPress} type='text' placeholder='Search subreddits here...' onChange={ onInputChange }/>
        <br/>
        <button onClick={ handleSubmit }>Search</button>
      </div>
    </div>
  )
}

export default Search;
