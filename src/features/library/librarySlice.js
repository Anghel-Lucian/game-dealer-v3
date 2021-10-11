import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  libraryGames: [],
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
  reducers: {
    addGameToLibrary(state, action) {
      // state[action.payload.category] = [
      //   ...state[action.payload.category],
      //   action.payload.game,
      // ]; // or something like that
      const addedGame = action.payload;

      state.libraryGames = [...state.libraryGames, addedGame];
    },
    removeGameFromLibrary(state, action) {
      const removedGameSlug = action.payload.slug;

      state.libraryGames = state.libraryGames.filter(
        (game) => game.slug !== removedGameSlug
      );
    },
  },
});

export const { addGameToLibrary, removeGameFromLibrary } = librarySlice.actions;

export default librarySlice.reducer;

export const selectLibraryGames = (state) => state.library.libraryGames;
