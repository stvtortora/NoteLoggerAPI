import React from 'react';

class Comment extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className='comment'>
        <p className='comment-author'>{this.props.author}</p>
        <div className='comment-body'>{this.props.body}</div>
        <div className='comment-replies'>
          <div className='comment-reply'>{this.props.replies}</div>
        </div>
      </div>
    )
  }
}

export default Comment;
