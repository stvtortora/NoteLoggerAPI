import React, { Component } from 'react';
import { connect } from 'react-redux';
import Search from './search';
import ResultsFeed from './resultsFeed';
import { fetchSubReddits } from './../../actions/sub_reddit_actions';
import $ from 'jquery';

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      searchResults: [],
      errorMessage: ''
    }
  }

  componentDidMount () {
    fetchSubReddits(this.props.user);
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.props.favorites !== prevProps.favorites && prevProps.favorites === prevState.searchResults) {
      this.setState({
        searchResults: this.props.favorites
      })
    }
  }

  filterResults = (results) => {
    return results.data.children.map(post => {
      return Object.keys(post.data).reduce((postData, key) => {
        if(["author", "title", "thumbnail", "selftext"].includes(key)){
          postData[key] = post.data[key];
        }

        return postData;
      }, {});
    });
  }

  onInputChange = (event) => {
    this.setState({
      input: event.target.value
    });
  }

  onSubmit = () => {
    this.retrieveData(this.state.input).done(res => {
      this.setState({
        searchResults: this.filterResults(res),
        errorMessage: ''
      });
    }).fail(() => {
      this.setState({
        errorMessage: 'Please enter the name of an existing subreddit.'
      });
    });
  }

  parseInput = (input) => {
    return input.split(' ').join('');
  }

  retrieveData = (input) => {
    return $.getJSON(`https://www.reddit.com/r/${this.parseInput(input)}.json`, res => {
      return res;
    });
  }

  showFavorites = () => {
    this.setState({
      searchResults: this.props.favorites
    })
  }

  render() {
    return (
      <div className="content">
        <Search onInputChange={ this.onInputChange } onSubmit={ this.onSubmit }/>
        <div onClick={ this.showFavorites }>Favorites</div>
        <p>{ this.state.errorMessage }</p>
        <ResultsFeed searchResults={ this.state.searchResults }/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const favorites = Object.keys(state.subRedditFavs).map(id => {
    return state.subRedditFavs[id];
  });

  return ({
    favorites,
    user: state.session
  })

}

const mapDispatchToProps = dispatch => ({
  fetchSubReddits: (user) => dispatch(fetchSubReddits(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(Content);
