import React from 'react';

class Comment extends React.Component {
  render () {
    return (
      <div className='comment'>
        <a href={`https://www.reddit.com/user/${this.props.author}`} className='comment-author'>{this.props.author}</a>
        <div className='comment-body'>{this.props.body}</div>
        <div className='comment-replies'>
          <div className='comment-reply'>{this.props.replies}</div>
        </div>
      </div>
    )
  }
}

export default Comment;
