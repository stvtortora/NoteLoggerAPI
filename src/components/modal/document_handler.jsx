import React from 'react';

class DocumentHandler extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      memo: this.props.data.memo
    }
  }

  handleChange = (e) => {
    this.setState({
      memo: e.target.value
    })
  }

  handleSubmit = () => {
    if (this.props.type === '+Save') {
      this.props.data.memo = this.state.memo;
    }

    this.props.action(this.props.data, this.props.user)
  }

  render () {
    let memoBox
    let message;
    if (this.props.type === '+Save') {
      memoBox = <textarea className='memo-box' value={this.state.memo} onChange={this.handleChange}></textarea>
      message = <div className='document-handler-message'>Write a private memo before saving.<br/>Do not worry, you can change this later!</div>
    } else {
      message = <div className='document-handler-message'>Are you sure you want to unsave this post?</div>
    }
    return (
      <div className='document-handler'>
        {message}
        {memoBox}
        <div className='document-handler-button' onClick={this.handleSubmit}>{this.props.type}</div>
      </div>
    )
  }
}

export default DocumentHandler;
