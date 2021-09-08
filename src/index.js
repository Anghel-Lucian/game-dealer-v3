import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './app/store';
import { fetchGames } from './features/games/gamesSlice';
import { Provider } from 'react-redux';

// store.dispatch(fetchGames('batman'));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
