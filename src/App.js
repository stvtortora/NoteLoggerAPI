import React from 'react';
import { Provider } from 'react-redux';
import {HashRouter, Route} from 'react-router-dom';
import './App.css';
import Content from './components/content/content';
import FavoritePosts from './components/favorite_posts/favorite_posts';
import Login from './components/session/login';
import Header from './components/header/header';
import Footer from './components/footer';
import FullPost from './components/post/full_post';

const App = ({store}) => {
  return (
    <Provider store={store}>
      <HashRouter>
        <div className="App">
          <Header />
            <Route exact path='/' component={Login}/>
            <Route exact path='/search' component={Content}/>
            <Route exact path='./favorites' component={FavoritePosts}/>
            <Route path='./post' component={FullPost}/>
          <Footer />
        </div>
      </HashRouter>
    </Provider>
  )
}

export default App;
