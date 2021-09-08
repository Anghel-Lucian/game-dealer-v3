import { configureStore } from '@reduxjs/toolkit';
import gamesSlice from '../features/games/gamesSlice';

export default configureStore({
  reducer: {
    games: gamesSlice,
  },
});
