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
      const addedGame = action.payload.gameData;
      const category = action.payload.libraryCategory;

      if (
        state.libraryGames.filter((game) => game.slug === addedGame.slug)
          .length !== 0
      )
        return;

      state.libraryGames = [...state.libraryGames, addedGame];

      state.categories[category] = [...state.categories[category], addedGame];
    },
    removeGameFromLibrary(state, action) {
      const removedGameSlug = action.payload.gameData.slug;
      const category = action.payload.libraryCategory;

      state.libraryGames = state.libraryGames.filter(
        (game) => game.slug !== removedGameSlug
      );
      state.categories[category] = state.categories[category].filter(
        (game) => game.slug !== removedGameSlug
      );
    },
  },
});

export const { addGameToLibrary, removeGameFromLibrary } = librarySlice.actions;

export default librarySlice.reducer;

export const selectLibraryGames = (state) => state.library.libraryGames;

export const selectCategorizedGames = (state) => state.library.categories;
