import { configureStore } from '@reduxjs/toolkit';
import gamesSearchSlice from '../features/gamesSearch/gamesSearchSlice';
import displayedGameSlice from '../features/displayedGame/displayedGameSlice';

export default configureStore({
  reducer: {
    gamesSearch: gamesSearchSlice,
    displayedGame: displayedGameSlice,
  },
});
