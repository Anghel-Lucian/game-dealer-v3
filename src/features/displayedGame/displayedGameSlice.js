import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import rawg from '../../apis/rawg';

const initialState = {
  game: {},
  gameDetailStatus: 'idle',
};

export const fetchGameDetail = createAsyncThunk(
  'displayedGame/fetchGameDetail',
  async (gameSlug) => {
    const response = await rawg.get(`/games/${gameSlug}`);

    return response.data;
  }
);

export const fetchGameScreenshots = createAsyncThunk(
  'displayedGame/fetchGameScreenshots',
  async (gameSlug) => {
    const response = await rawg.get(`/games/${gameSlug}/screenshots`);

    return response.data;
  }
);

const displayedGameSlice = createSlice({
  name: 'displayedGame',
  initialState,
  reducers: {
    testReducer(state, action) {
      console.log('delete me');
    },
  },
  extraReducers: {
    [fetchGameDetail.fulfilled]: (state, action) => {
      state.game.backgroundImage = action.payload.background_image;
      state.game.description = action.payload.description;
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

      state.status = 'succeeded';
    },
    [fetchGameDetail.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchGameDetail.rejected]: (state, action) => {
      state.status = 'failed';
    },
  },
});

export const { testReducer } = displayedGameSlice.actions;

export default displayedGameSlice.reducer;

export const selectGame = (state) => state.displayedGame.game;

export const selectGameDetailStatus = (state) =>
  state.displayedGame.gameDetailStatus;
