import React from 'react';
import RedditIcon from '../../assets/reddit_icon.svg';
import { connect } from 'react-redux';
import { addFavorite, removeFavorite } from './../../actions/sub_reddit_actions';

const Post = ({ data, user, postId, addFavorite, removeFavorite }) => {
  const thumbnail = data.thumbnail && data.thumbnail.includes('https') ? data.thumbnail : RedditIcon;
  const favoriteButton = postId ? <p onClick={() => removeFavorite(postId, user)}>Remove From Favorites</p> : <p onClick={() => addFavorite(data, user)}>Add To Favorites</p>;

  return (
   <div className='post'>
     <img src={ thumbnail } alt='Cannot Display'/>
     <div>
       <h2>{data.title}</h2>
       {favoriteButton}
       <p className='author-name' ><strong>Author:</strong> { data.author }</p>
       <p className='post-text' >{data.selftext}</p>
     </div>
   </div>
  )
}

const mapStateToProps = state => ({
  user: state.session
})

const mapDispatchToProps = dispatch => ({
  addFavorite: (post, user) => dispatch(addFavorite(post, user)),
  removeFavorite: (postId, user) => dispatch(removeFavorite(postId, user))
})

export default connect(mapStateToProps, mapDispatchToProps)(Post);
