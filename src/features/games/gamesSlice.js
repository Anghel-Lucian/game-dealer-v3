import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cheapshark from '../../apis/cheapshark';

const initialState = {
  results: [],
  status: 'idle',
  typing: false,
};

export const fetchGames = createAsyncThunk(
  'games/fetchGames',
  async (query) => {
    const response = await cheapshark.get('/games', {
      params: {
        title: query,
      },
    });

    return response.data;
  }
);

const gamesSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    changeTypingValue(state, action) {
      state.typing = action.payload;
    },
  },
  extraReducers: {
    [fetchGames.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.results = action.payload;
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

export const { changeTypingValue } = gamesSlice.actions;

export default gamesSlice.reducer;

export const selectAllGamesResults = (state) => state.games.results;

export const selectLimitedGamesResults = (state) => {
  return state.games.results.slice(0, 10);
};

export const selectTyping = (state) => state.games.typing;

export const selectFetchGamesStatus = (state) => state.games.status;
