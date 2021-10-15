import { configureStore } from '@reduxjs/toolkit';
import gamesSearchSlice from '../features/gamesSearch/gamesSearchSlice';
import displayedGameSlice from '../features/displayedGame/displayedGameSlice';
import librarySlice from '../features/library/librarySlice';

export default configureStore({
  reducer: {
    gamesSearch: gamesSearchSlice,
    displayedGame: displayedGameSlice,
    library: librarySlice,
  },
});
