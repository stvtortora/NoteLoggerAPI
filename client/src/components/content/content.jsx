import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Search from './search';
import ResultsFeed from './resultsFeed';
import { fetchSubReddits } from './../../actions/sub_reddit_actions';
import { showSearchResults } from './../../actions/ui_actions';
import { receiveSearchResults } from './../../actions/sub_reddit_actions';
import $ from 'jquery';

export class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      errorMessage: '',
      subRedditTitle: ''
    }
  }

  componentDidMount () {
    if (this.props.user) {
      this.props.fetchSubReddits(this.props.user);
    } else {
      this.redirectToLogin();
    }
  }

  componentDidUpdate (prevProps) {
    if (prevProps.showFavorites !== this.props.showFavorites) {
      this.setState({
        errorMessage: ''
      })
    }
  }

  onInputChange = (event) => {
    this.setState({
      input: event.target.value
    });
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


  onSubmit = () => {
    this.retrieveData(this.state.input).done(res => {
      this.setState({
        subRedditTitle: this.state.input,
        errorMessage: ''
      });
      this.props.receiveSearchResults(this.filterResults(res))
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

  redirectToLogin = () => {
    this.props.history.push('/');
  }

  render() {
    const feedData = this.props.showFavorites ? this.props.favorites : this.props.searchResults;

    let displayTitle;
    if (this.props.showFavorites) {
      displayTitle = Object.keys(this.props.favorites).length ? 'Saved Posts' : "You haven't saved any posts yet.";
    } else {
      displayTitle = this.state.subRedditTitle;
    }

    return (
      <div className="content">
        <Search onInputChange={ this.onInputChange } onSubmit={ this.onSubmit }/>
        <p>{this.state.errorMessage}</p>
        <p>{ displayTitle }</p>
        <ResultsFeed searchResults={ feedData } />
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
    showFavorites: state.ui,
    searchResults: state.searchResults
  })
}

const mapDispatchToProps = dispatch => ({
  fetchSubReddits: (user) => dispatch(fetchSubReddits(user)),
  showSearchResults: () => dispatch(showSearchResults()),
  receiveSearchResults: (results) => dispatch(receiveSearchResults(results))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Content));
