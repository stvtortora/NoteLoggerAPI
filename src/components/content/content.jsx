import React, { Component } from 'react';
import Search from './search';
import ResultsFeed from './resultsFeed';
import $ from 'jquery';

class Content extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      searchResults: []
    }
  }

  onInputChange = (event) => {
    this.setState({
      input: event.target.value
    })
  }

  onSubmit = () => {
    this.retrieveData(this.state.input).done(res => {
      this.setState({
        searchResults: this.filterResults(res)
      })
    }).fail(errors => {
      this.renderErrors(errors)
    });;
  }

  retrieveData = (input) => {
    return $.getJSON(`https://www.reddit.com/r/${this.parseInput(input)}.json`, res => {
      return res;
    })
  }

  filterResults = (results) => {
    return results.data.children.map(post => {
      return Object.keys(post.data).reduce((postData, key) => {
        if(["author", "title", "thumbnail", "selftext"].includes(key)){
          postData[key] = post.data[key];
        }

        return postData;
      }, {})
    });
  }

  parseInput = (input) => {
    return input.split(' ').join('');
  }

  renderErrors = (err) => {

  }

  render() {
    return (
      <div className="content">
        <Search onInputChange={ this.onInputChange } onSubmit={ this.onSubmit }/>
        <ResultsFeed searchResults={ this.state.searchResults }/>
      </div>
    );
  }
}

export default Content;
