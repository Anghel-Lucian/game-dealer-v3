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
      const addedGameSlug = action.payload;

      state.libraryGames = [...state.libraryGames, addedGameSlug];
    },
    removeGameFromLibrary(state, action) {
      const removedGameSlug = action.payload;

      state.libraryGames = state.libraryGames.filter(
        (slug) => slug !== removedGameSlug
      );
    },
  },
});

export const { addGameToLibrary, removeGameFromLibrary } = librarySlice.actions;

export default librarySlice.reducer;

export const selectLibraryGames = (state) => state.library.libraryGames;
