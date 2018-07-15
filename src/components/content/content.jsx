import React, { Component } from 'react';
import Search from './search';
import ResultsFeed from './resultsFeed';


class Content extends Component {

  render() {
    return (
      <div className="content">
        <Search/>
        <ResultsFeed/>
      </div>
    );
  }
}

export default Content;
