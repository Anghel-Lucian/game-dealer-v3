import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cheapshark from '../../apis/cheapshark';
import rawg from '../../apis/rawg';

const initialState = {
  results: [],
  previewResults: [],
  status: 'idle',
  previewStatus: 'idle',
  fullResultsOnly: false,
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
    changeStatusToIdle(state, action) {
      state.status = 'idle';
    },
    changePreviewStatusToIdle(state, action) {
      state.previewStatus = 'idle';
    },
    changeFullResultsOnly(state, action) {
      state.fullResultsOnly = action.payload;
    },
  },
  extraReducers: {
    [fetchGames.fulfilled]: (state, action) => {
      const results = action.payload;

      if (state.fullResultsOnly && results.length === 0) {
        state.status = 'failed';
        return;
      }
      if (!state.fullResultsOnly && results.length === 0) {
        state.previewStatus = 'failed';
        return;
      }

      const parsedResults = results.map((result) => {
        return {
          name: result.name,
          backgroundImage: result.background_image,
          genres: result.genres.map((genre) => genre.name).join(', '),
          id: result.id,
          released: result.released
            ? `${result.released.split('-')[2]}/${
                result.released.split('-')[1]
              }/${result.released.split('-')[0]}`
            : null,
        };
      });

      if (state.fullResultsOnly) {
        state.results = parsedResults;
        state.status = 'succeeded';
      }

      if (!state.fullResultsOnly) {
        state.previewResults = parsedResults.slice(0, 7);
        state.previewStatus = 'succeeded';
      }
    },
    [fetchGames.rejected]: (state, action) => {
      if (state.fullResultsOnly) {
        state.status = 'failed';
      }

      if (!state.fullResultsOnly) {
        state.previewStatus = 'failed';
      }
    },
    [fetchGames.pending]: (state, action) => {
      if (state.fullResultsOnly) {
        state.status = 'loading';
      }

      if (!state.fullResultsOnly) {
        state.previewStatus = 'loading';
      }
    },
  },
});

export const {
  emptyPreviewResults,
  changeStatusToIdle,
  changePreviewStatusToIdle,
  changeFullResultsOnly,
} = gamesSlice.actions;

export default gamesSlice.reducer;

export const selectGamesResults = (state) => state.games.results;

export const selectPreviewResults = (state) => state.games.previewResults;

export const selectResults = (state) => state.games.results;

export const selectStatus = (state) => state.games.status;

export const selectPreviewStatus = (state) => state.games.previewStatus;
