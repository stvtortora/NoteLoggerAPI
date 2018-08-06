import React from 'react'
import Post from './post';
import { connect } from 'react-redux';
import { resetPagination, updatePagination } from './../../actions/ui_actions';


export class ResultsFeed extends React.Component {
  componentDidUpdate(prevProps) {
    if(this.props.searchResults !== prevProps.searchResults && prevProps.startIdx !== 0) {
      this.props.resetPagination()
    }
  }

  handleScroll (offSet) {
    return () => {
      this.props.updatePagination(offSet)
    }
  }

  render() {
    let postsData = this.props.searchResults;

    if(postsData.length){
      const posts = postsData.slice(this.props.startIdx, this.props.endIdx).map((postData, i) => {
        const postId = Object.keys(this.props.favorites).find(id => {
          return this.props.favorites[id].title === postData.title;
        })
        if (postId) {
          postData = this.props.favorites[postId]
        }
        return <Post key={i} data={postData} postId={postId}/>
      });

    const previousArrow = this.props.startIdx > 0 ? <i className='previous' onClick={ this.handleScroll(-3) }/ > : <div className='arrow-placeholder'/>;
    const nextArrow = this.props.endIdx < postsData.length ? <i className='next' onClick={ this.handleScroll(3) }/ > : <div className='arrow-placeholder'/>;

      return(
        <div className='feed'>
          <div>{previousArrow}</div>
          <div>
            {posts}
          </div>
          <div>{nextArrow}</div>
        </div>
      )
    }

    return null;
  }
}

const mapStateToProps = state => ({
  favorites: state.savedPosts,
  user: state.session,
  startIdx: state.pagination.startIdx,
  endIdx: state.pagination.endIdx
})

const mapDispatchToProps = dispatch => ({
  updatePagination: (offSet) => dispatch(updatePagination(offSet)),
  resetPagination: () => dispatch(resetPagination())
})

export default connect(mapStateToProps, mapDispatchToProps)(ResultsFeed);
