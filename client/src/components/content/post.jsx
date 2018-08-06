import React from 'react';
import RedditIcon from '../../assets/reddit_icon.svg';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { setUpModal } from './../../actions/modal_actions';
import { updateCurrentPost } from './../../actions/posts_actions';

export class Post extends React.Component {
  handleViewPost = () => {
    this.props.updateCurrentPost(this.props.data)
    this.props.history.push(`/post/${this.parseTitle(this.props.data.title)}`)
  }

  parseTitle = (title) => {
    return title.split(' ').join('-').split('').filter(char => {
      return !("!#&*',.?%$".split('').includes(char))
    }).join('').toLowerCase()
  }

  render () {
    const thumbnail = this.props.data.thumbnail && this.props.data.thumbnail.includes('https') ? this.props.data.thumbnail : RedditIcon;
    let buttonType = 'Remove';
    let editButton =  <p className='save-button' onClick={() => this.props.setUpModal(this.props.data, 'Edit')}>Edit</p>
    let modalData = this.props.postId;
    if (!this.props.postId) {
      modalData = this.props.data;
      modalData.docType = 'post';
      buttonType = 'Save';
      editButton = null
    }

    return (
     <div className='post'>
       <img src={ thumbnail } alt='Cannot Display'/>
       <div>
         <h2 onClick={this.handleViewPost}>{this.props.data.title}</h2>
         <div>
           <p className='save-button' onClick={() => this.props.setUpModal(modalData, buttonType)}>{buttonType}</p>
           {editButton}
         </div>
         <strong className='author-name'>Author:</strong>
         <a href={`https://www.reddit.com/user/${this.props.data.author}`} className='post-author'>{this.props.data.author}</a>
         <p className='post-text' >{this.props.data.selftext}</p>
       </div>
     </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.session
})

const mapDispatchToProps = dispatch => ({
  setUpModal: (modalData, type) => dispatch(setUpModal(modalData, type)),
  updateCurrentPost: (data) => dispatch(updateCurrentPost(data))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post));
