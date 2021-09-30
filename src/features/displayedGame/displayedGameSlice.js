import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import rawg from '../../apis/rawg';

const initialState = {
  game: {},
  gameScreenshots: [],
  fetchingGameDetailStatus: 'idle',
};

export const fetchGameDetail = createAsyncThunk(
  'displayedGame/fetchGameDetail',
  async (gameSlug) => {
    const gameData = await rawg.get(`/games/${gameSlug}`);
    const gameScreenshots = await rawg.get(`/games/${gameSlug}/screenshots`);

    return { ...gameData.data, ...gameScreenshots.data };
  }
);

const displayedGameSlice = createSlice({
  name: 'displayedGame',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchGameDetail.fulfilled]: (state, action) => {
      state.game.backgroundImage = action.payload.background_image;
      state.game.description =
        action.payload.description.length > 200
          ? action.payload.description
          : action.payload.description_raw;
      state.game.shortDescription =
        action.payload.description.length > 200
          ? action.payload.description_raw.substring(0, 200) + '...'
          : null;
      state.game.developers = action.payload.developers
        .map((developer) => developer.name)
        .join(', ');
      state.game.publishers = action.payload.publishers
        .map((publisher) => publisher.name)
        .join(', ');
      state.game.genres = action.payload.genres
        .map((genre) => genre.name)
        .join(', ');
      state.game.metacritic = action.payload.metacritic;
      state.game.name = action.payload.name;
      state.game.tags = action.payload.tags.map((tag) => tag.name);
      state.game.slug = action.payload.slug;
      state.game.released = action.payload.released
        ? `${action.payload.released.split('-')[2]}.${
            action.payload.released.split('-')[1]
          }.${action.payload.released.split('-')[0]}`
        : null;
      state.gameScreenshots = action.payload.results;

      state.fetchingGameDetailStatus = 'succeeded';
    },
    [fetchGameDetail.pending]: (state, action) => {
      state.fetchingGameDetailStatus = 'loading';
    },
    [fetchGameDetail.rejected]: (state, action) => {
      state.fetchingGameDetailStatus = 'failed';
    },
  },
});

export default displayedGameSlice.reducer;

export const selectGame = (state) => state.displayedGame.game;

export const selectFetchingGameDetailStatus = (state) =>
  state.displayedGame.fetchingGameDetailStatus;

export const selectGameScreenshots = (state) =>
  state.displayedGame.gameScreenshots;
