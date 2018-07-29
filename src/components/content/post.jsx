import React from 'react';
import RedditIcon from '../../assets/reddit_icon.svg';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { setUpModal } from './../../actions/modal_actions';
import { updateCurrentPost } from './../../actions/sub_reddit_actions';

class Post extends React.Component {
  constructor (props) {
    super(props);
  }

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
    const buttonType = this.props.postId ? '-Remove' : '+Save';
    const modalData = this.props.postId ? this.props.postId : this.props.data;


    return (
     <div className='post'>
       <img src={ thumbnail } alt='Cannot Display'/>
       <div>
         <h2 onClick={this.handleViewPost}>{this.props.data.title}</h2>
         <p className='save-button' onClick={() => this.props.setUpModal(modalData, buttonType)}>{buttonType}</p>
         <p className='author-name' ><strong>Author:</strong> { this.props.data.author }</p>
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
  // addFavorite: (post, user) => dispatch(addFavorite(post, user)),
  // removeFavorite: (postId, user) => dispatch(removeFavorite(postId, user)),
  setUpModal: (modalData, type) => dispatch(setUpModal(modalData, type)),
  updateCurrentPost: (data) => dispatch(updateCurrentPost(data))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Post));





// const favoriteButton = this.props.postId ? <p className='save-button' onClick={() => this.props.removeFavorite(this.props.postId, this.props.user)}>-Remove</p> : <p className='save-button' onClick={() => this.props.addFavorite(this.props.data, this.props.user)}>+Save</p>;
