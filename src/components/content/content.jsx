import React, { Component } from 'react';
import { connect } from 'react-redux';
import Search from './search';
import ResultsFeed from './resultsFeed';
import { fetchSubReddits } from './../../actions/sub_reddit_actions';
import { showSearchResults } from './../../actions/ui_actions';
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
    console.log(this.props.user)
    this.props.fetchSubReddits(this.props.user);
  }

  filterResults = (results) => {
    return results.data.children.map(post => {
      return Object.keys(post.data).reduce((postData, key) => {
        if(["author", "title", "thumbnail", "selftext", "permalink"].includes(key)){
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
      this.props.showSearchResults()
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

  render() {
    const feedData = this.props.showFavorites ? this.props.favorites : this.state.searchResults;

    return (
      <div className="content">
        <Search onInputChange={ this.onInputChange } onSubmit={ this.onSubmit }/>
        <p>{ this.state.errorMessage }</p>
        <ResultsFeed searchResults={ feedData }/>
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
    user: state.session,
    showFavorites: state.ui
  })

}

const mapDispatchToProps = dispatch => ({
  fetchSubReddits: (user) => dispatch(fetchSubReddits(user)),
  showSearchResults: () => dispatch(showSearchResults())
})

export default connect(mapStateToProps, mapDispatchToProps)(Content);
