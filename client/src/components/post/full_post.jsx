import React from 'react';
import Comment from './comment';
import { setUpModal } from './../../actions/modal_actions';
import { connect } from 'react-redux';
import $ from 'jquery';

class FullPost extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      comments: null
    };
  }

  componentDidMount () {
    if (this.props.user) {
      this.retrieveData().done(res => {
        this.setState({
          comments: this.formatComments(res[1])
        })
      })
    } else {
      this.redirectToLogin();
    }
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

  redirectToLogin = () => {
    this.props.history.push('/');
  }

  render () {
    if (this.state.comments) {
      let buttonType = 'Save';
      let modalData = this.props.data;
      let memo;
      let thumbnail;
      const postId = Object.keys(this.props.favorites).find(id => {
        return this.props.favorites[id].title === this.props.data.title;
      })

      if (postId) {
        buttonType = 'Remove';
        modalData = postId;
        const editButton = <p className='save-button' id='edit-button' onClick={() => this.props.setUpModal(this.props.favorites[postId], 'Edit')}>Edit</p>
        memo = (
          <div className='memo-wrapper'>
            <span>
              <div>Private memo</div>
              {editButton}
            </span>

            <div onClick={() => this.props.setUpModal(this.props.favorites[postId], 'Edit')} className='memo-display'>{this.props.favorites[postId].memo}</div>
          </div>
        );
      }
      if (this.props.data.thumbnail.includes('https')) {
        thumbnail = this.props.data.thumbnail
      }

      return (
        <div className='post-wrapper'>
          <div className='full-post'>
              {memo}
            <div className='post-header-container'>
              <a href={`https://www.reddit.com/user/${this.props.data.author}`} className='post-author'>{this.props.data.author}</a>
               <p className='save-button' id='full' onClick={() => this.props.setUpModal(modalData, buttonType)}>{buttonType}</p>
            </div>
            <a href={`https://www.reddit.com${this.props.data.permalink}`} className='post-title'>{this.props.data.title}</a>
            <div className='post-text'>{this.props.data.selftext}</div>
            <img src={thumbnail} alt='thumbnail'/>
            <div>{this.state.comments}</div>
          </div>
        </div>
      )
    }

    return (
      <div className='loader-container'>
        <div className='loader'></div>;
      </div>
    )
  }
}

const mapStateToProps = state => ({
  data: state.currentPost,
  user: state.session,
  favorites: state.savedPosts
})

const mapDispatchToProps = dispatch => ({
  setUpModal: (modalData, type) => dispatch(setUpModal(modalData, type))
})

export default connect(mapStateToProps, mapDispatchToProps)(FullPost);
