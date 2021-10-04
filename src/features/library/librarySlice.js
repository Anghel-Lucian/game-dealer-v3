import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  games: [],
  categories: {
    uncategorized: [],
    finished: [],
    bought: [],
    dropped: [],
  },
};

const librarySlice = createSlice({
  name: 'library',
  initialState,
  reducer: {
    addGameToLibrary(state, action) {
      state[action.payload.category] = [
        ...state[action.payload.category],
        action.payload.game,
      ]; // or something like that
    },
  },
});

export const { addGameToLibrary } = librarySlice.actions;

export default librarySlice.reducer;

export const selectGames = (state) => state.library.games;
