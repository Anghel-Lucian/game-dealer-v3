import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './app/store';
import { fetchGames } from './features/games/gamesSlice';
import { Provider } from 'react-redux';
import { app } from './firebase/firebaseConfig';
// store.dispatch(fetchGames('batman'));
console.log(app);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
