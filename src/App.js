import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './app/Navbar';

import SearchBar from './features/games/SearchBar';
import GamesResultsList from './features/games/GamesResultsList';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="app-container">
        <Switch>
          <Route
            path="/"
            render={() => (
              <React.Fragment>
                <SearchBar />
                <GamesResultsList />
              </React.Fragment>
            )}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
