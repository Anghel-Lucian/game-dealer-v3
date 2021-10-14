import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './css/App.css';

import Navbar from './components/Navbar';

import SearchBar from './features/gamesSearch/SearchBar';
import GamesResultsList from './features/gamesSearch/GamesResultsList';
import GameResultsPreview from './features/gamesSearch/GameResultsPreview';
import DisplayedGame from './features/displayedGame/DisplayedGame';
import LibraryList from './features/library/LibraryList';

const App = () => {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <div className="main-view">
          <Route
            path="/"
            render={() => (
              <div className="main-view__top-section">
                <SearchBar />
                {/* <GameResultsPreview /> */}
              </div>
            )}
          />
          <Switch>
            <Route path="/search/:query" exact component={GamesResultsList} />
            <Route path="/games/:gameSlug" exact component={DisplayedGame} />
            <Route
              path={['/library/:category', '/library']}
              strict
              component={LibraryList}
            />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
