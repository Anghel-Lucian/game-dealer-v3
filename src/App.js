import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './css/App.css';

import Navbar from './app/Navbar';

import SearchBar from './features/games/SearchBar';
import GamesResultsList from './features/games/GamesResultsList';
import GameResultsPreview from './features/games/GameResultsPreview';

const App = () => {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <div className="main-view">
          <Switch>
            <Route
              path="/"
              render={() => (
                <React.Fragment>
                  <div className="main-view__top-section">
                    <SearchBar />
                    <GameResultsPreview />
                  </div>
                  <div className="main-view__bottom-section">
                    <GamesResultsList />
                  </div>
                </React.Fragment>
              )}
            />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
