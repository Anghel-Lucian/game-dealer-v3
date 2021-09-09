import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cheapshark from '../../apis/cheapshark';
import rawg from '../../apis/rawg';

const initialState = {
  results: [],
  shownResults: [],
  previewResults: [],
  status: 'idle',
};

export const fetchGames = createAsyncThunk(
  'games/fetchGames',
  async (query) => {
    const response = await rawg.get('/games', {
      params: {
        search: query,
      },
    });

    return response.data.results;
  }
);

const gamesSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    emptyPreviewResults(state, action) {
      state.previewResults = [];
    },
    fillShownResults(state, action) {
      state.shownResults = state.results;
    },
  },
  extraReducers: {
    [fetchGames.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.results = action.payload;
      state.previewResults = action.payload.slice(0, 10);
    },
    [fetchGames.rejected]: (state, action) => {
      state.status = 'failed';
      state.loading = false;
    },
    [fetchGames.pending]: (state, action) => {
      state.status = 'loading';
    },
  },
});

export const { fillShownResults, emptyPreviewResults } = gamesSlice.actions;

export default gamesSlice.reducer;

export const selectGamesResults = (state) => state.games.results;

export const selectPreviewResults = (state) => state.games.previewResults;

export const selectShownResults = (state) => state.games.shownResults;

export const selectFetchGamesStatus = (state) => state.games.status;
