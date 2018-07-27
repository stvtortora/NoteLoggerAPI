import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import configureStore from './store/store';

// const preloadedState = () => {
//   return {
//     session: loadUser(),
//     subRedditFavs: loadFavorites()
//   }
// }
//
// let store = configureStore(preloadedState());
let store = configureStore({});
// store.subscribe(() => {
//   saveFavorites(store.getState().subRedditFavs)
// })
window.getState = store.getState;
ReactDOM.render(<App store={store}/>, document.getElementById('root'));
registerServiceWorker();
