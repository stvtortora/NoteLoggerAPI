import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';
import { loadCachedState, cacheState } from './util/local_storage_util';
import configureStore from './store/store';

const preloadedState = loadCachedState()

let store = configureStore(preloadedState);

store.subscribe(() => {
  cacheState(store.getState())
})
window.getState = store.getState;
ReactDOM.render(<App store={store}/>, document.getElementById('root'));
// registerServiceWorker();
