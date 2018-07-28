import React from 'react';
import Comment from './comment';
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
      if (comment.data.replies !== '') {
        replies = this.formatComments(comment.data.replies);
      }
      return <Comment author={comment.data.author} body={comment.data.body} replies={replies} />
    })
  }

  retrieveData = () => {
    return $.getJSON(`https://www.reddit.com${this.props.permalink}.json`, res => {
      return res;
    });
  }

  render () {
    if (this.state.comments) {
      return (
        <div className='post-wrapper'>
          <div className='full-post'>
            <div>{this.state.comments}</div>
          </div>
        </div>
      )
    }
    return null
  }
}

const mapStateToProps = state => ({
  permalink: state.currentPost
})

export default connect(mapStateToProps)(FullPost);
