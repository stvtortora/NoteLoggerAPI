import React from 'react';
import Comment from './comment';
// import { addFavorite, removeFavorite, updateCurrentPost } from './../../actions/sub_reddit_actions';
import { setUpModal } from './../../actions/modal_actions';
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

      let buttonType;
      let editButton;
      let modalData;

      if (postId) {
        buttonType = '-Remove';
        modalData = postId;
        editButton = <p className='save-button' onClick={() => this.props.setUpModal(this.props.favorites[postId], 'Edit')}>Edit</p>
      } else {
        modalData = this.props.data;
        modalData.docType = 'post';
        buttonType = '+Save';
        editButton = null;
      }

      if (this.props.data.thumbnail.includes('https')) {
        thumbnail = this.props.data.thumbnail;
      }

      return (
        <div className='post-wrapper'>
          <div className='full-post'>
            <div className='post-header-container'>
              <div className='post-author'>Posted by {this.props.data.author}</div>
               <p className='save-button' id='full' onClick={() => this.props.setUpModal(modalData, buttonType)}>{buttonType}</p>
               {editButton}
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
  setUpModal: (modalData, type) => dispatch(setUpModal(modalData, type))
})

export default connect(mapStateToProps, mapDispatchToProps)(FullPost);
