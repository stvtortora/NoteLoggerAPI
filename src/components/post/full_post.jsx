import React from 'react';
import Comment from './comment';
import { addFavorite, removeFavorite, updateCurrentPost } from './../../actions/sub_reddit_actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import $ from 'jquery';

class FullPost extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      comments: null
    };
  }

  componentDidMount () {
    this.retrieveData().done(res => {
      this.setState({
        comments: this.formatComments(res[1])
      })
    })
  }

  formatComments = (comments) => {
    return comments.data.children.map(comment => {
      let replies;
      if (comment.data.replies && comment.data.replies !== '') {
        replies = this.formatComments(comment.data.replies);
      }
      return <Comment author={comment.data.author} body={comment.data.body} replies={replies} />
    })
  }

  retrieveData = () => {
    return $.getJSON(`https://www.reddit.com${this.props.data.permalink}.json`, res => {
      return res;
    });
  }

  render () {
    let thumbnail;
    if (this.state.comments) {
      const postId = Object.keys(this.props.favorites).find(id => {
        return this.props.favorites[id].title === this.props.data.title;
      })
      const favoriteButton = postId ? <p className='save-button' id='full' onClick={() => this.props.removeFavorite(postId, this.props.user)}>-Remove</p> : <p className='save-button' id='full' onClick={() => this.props.addFavorite(this.props.data, this.props.user).then()}>+Save</p>;
      if (this.props.data.thumbnail.includes('https')) {
        thumbnail = this.props.data.thumbnail
      }

      return (
        <div className='post-wrapper'>
          <div className='full-post'>
            <div className='post-header-container'>
              <div className='post-author'>Posted by {this.props.data.author}</div>
              {favoriteButton}
            </div>
            <div className='post-title'>{this.props.data.title}</div>
            <div className='post-text'>{this.props.data.selftext}</div>
            <img src={thumbnail} />
            <div>{this.state.comments}</div>
          </div>
        </div>
      )
    }
    return null
  }
}

const mapStateToProps = state => ({
  data: state.currentPost,
  user: state.session,
  favorites: state.subRedditFavs
})

const mapDispatchToProps = dispatch => ({
  addFavorite: (post, user) => dispatch(addFavorite(post, user)),
  removeFavorite: (postId, user) => dispatch(removeFavorite(postId, user)),
})


export default connect(mapStateToProps, mapDispatchToProps)(FullPost);
