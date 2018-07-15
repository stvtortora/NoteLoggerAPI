import React from 'react';
import './App.css';
import Content from './components/content/content';
import Header from './components/header';
import Footer from './components/footer';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Content />
        <Footer />
      </div>
    );
  }
}

export default App;
