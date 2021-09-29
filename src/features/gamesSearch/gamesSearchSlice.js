import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import rawg from '../../apis/rawg';

const initialState = {
  results: [],
  previewResults: [],
  fetchingStatus: 'idle',
  previewStatus: 'idle',
  fullResultsOnly: false,
};

export const fetchGames = createAsyncThunk(
  'gamesSearch/fetchGames',
  async (query) => {
    const response = await rawg.get('/games', {
      params: {
        search: query,
      },
    });

    return response.data.results;
  }
);

const gamesSearchSlice = createSlice({
  name: 'gamesSearch',
  initialState,
  reducers: {
    emptyPreviewResults(state, action) {
      state.previewResults = [];
    },
    changeFetchingStatusToIdle(state, action) {
      state.fetchingStatus = 'idle';
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
        state.fetchingStatus = 'failed';
        return;
      }
      if (!state.fullResultsOnly && results.length === 0) {
        state.previewStatus = 'failed';
        return;
      }

      const parsedResults = results.map((result) => {
        return {
          name: result.name,
          slug: result.slug,
          backgroundImage: result.background_image,
          genres: result.genres.map((genre) => genre.name).join(', '),
          id: result.id,
          released: result.released
            ? `${result.released.split('-')[2]}.${
                result.released.split('-')[1]
              }.${result.released.split('-')[0]}`
            : null,
        };
      });

      if (state.fullResultsOnly) {
        state.results = parsedResults;
        state.fetchingStatus = 'succeeded';
      }

      if (!state.fullResultsOnly) {
        state.previewResults = parsedResults.slice(0, 7);
        state.previewStatus = 'succeeded';
      }
    },
    [fetchGames.rejected]: (state, action) => {
      if (state.fullResultsOnly) {
        state.fetchingStatus = 'failed';
      }

      if (!state.fullResultsOnly) {
        state.previewStatus = 'failed';
      }
    },
    [fetchGames.pending]: (state, action) => {
      if (state.fullResultsOnly) {
        state.fetchingStatus = 'loading';
      }

      if (!state.fullResultsOnly) {
        state.previewStatus = 'loading';
      }
    },
  },
});

export const {
  emptyPreviewResults,
  changeFetchingStatusToIdle,
  changePreviewStatusToIdle,
  changeFullResultsOnly,
} = gamesSearchSlice.actions;

export default gamesSearchSlice.reducer;

export const selectPreviewResults = (state) => state.gamesSearch.previewResults;

export const selectResults = (state) => state.gamesSearch.results;

export const selectFetchingStatus = (state) => state.gamesSearch.fetchingStatus;

export const selectPreviewStatus = (state) => state.gamesSearch.previewStatus;
