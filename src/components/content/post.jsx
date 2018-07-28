import React from 'react';
import RedditIcon from '../../assets/reddit_icon.svg';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { addFavorite, removeFavorite, updateCurrentPost } from './../../actions/sub_reddit_actions';

class Post extends React.Component {
  constructor (props) {
    super(props);
  }

  handleViewPost = () => {
    this.props.updateCurrentPost(this.props.data.permalink)
    this.props.history.push(`/post/${this.props.data.title}`)
  }

  render () {
    const thumbnail = this.props.data.thumbnail && this.props.data.thumbnail.includes('https') ? this.props.data.thumbnail : RedditIcon;
    const favoriteButton = this.props.postId ? <p onClick={() => this.props.removeFavorite(this.props.postId, this.props.user)}>Remove From Favorites</p> : <p onClick={() => this.props.addFavorite(this.props.data, this.props.user)}>Add To Favorites</p>;

    return (
     <div className='post'>
       <img src={ thumbnail } alt='Cannot Display'/>
       <div>
         <h2 onClick={this.handleViewPost}>{this.props.data.title}</h2>
         {favoriteButton}
         <p className='author-name' ><strong>Author:</strong> { this.props.data.author }</p>
         <p className='post-text' >{this.props.data.selftext}</p>
       </div>
     </div>
    )
  }
}
// ({ data, user, postId, addFavorite, removeFavorite }) => {
//   const thumbnail = data.thumbnail && data.thumbnail.includes('https') ? data.thumbnail : RedditIcon;
//   const favoriteButton = postId ? <p onClick={() => removeFavorite(postId, user)}>Remove From Favorites</p> : <p onClick={() => addFavorite(data, user)}>Add To Favorites</p>;
//
//   return (
//    <div className='post'>
//      <img src={ thumbnail } alt='Cannot Display'/>
//      <div>
//        <h2>{data.title}</h2>
//        {favoriteButton}
//        <p className='author-name' ><strong>Author:</strong> { data.author }</p>
//        <p className='post-text' >{data.selftext}</p>
//      </div>
//    </div>
//   )
// }

const mapStateToProps = state => ({
  user: state.session
})

const mapDispatchToProps = dispatch => ({
  addFavorite: (post, user) => dispatch(addFavorite(post, user)),
  removeFavorite: (postId, user) => dispatch(removeFavorite(postId, user)),
  updateCurrentPost: (permalink) => dispatch(updateCurrentPost(permalink))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post));
