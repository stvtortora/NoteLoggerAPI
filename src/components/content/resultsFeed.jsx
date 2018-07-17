import React from 'react'
import Post from './post';


class ResultsFeed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      postsData: this.props.searchResults,
      startIdx: 0,
      endIdx: 3
    }
  }

  componentDidUpdate(prevProps) {
    if(this.props.searchResults !== prevProps.searchResults) {
      this.setState({
        postsData: this.props.searchResults,
        startIdx: 0,
        endIdx: 3
      });
    }
  }

  handleScroll(offSet) {
    return () => {
      this.setState({
        startIdx: this.state.startIdx + offSet,
        endIdx: this.state.endIdx + offSet
      });
    }
  }

  render() {
    let postsData = this.state.postsData;

    if(postsData.length){
      const posts = postsData.slice(this.state.startIdx, this.state.endIdx).map((postData, i) => {
        return <Post key={i} data={postData} />
      });

      const previousArrow = this.state.startIdx > 0 ? <i className='previous' onClick={ this.handleScroll(-3) }/ > : <div className='arrow-placeholder'/>;
      const nextArrow = this.state.endIdx < postsData.length ? <i className='next' onClick={ this.handleScroll(3) }/ > : <div className='arrow-placeholder'/>;

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



export default ResultsFeed;
