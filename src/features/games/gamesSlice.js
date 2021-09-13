import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import cheapshark from '../../apis/cheapshark';
import rawg from '../../apis/rawg';

const initialState = {
  results: [],
  previewResults: [],
  status: 'idle',
};

export const fetchGames = createAsyncThunk(
  'games/fetchGames',
  async ({ query, fullResultsOnly = false }) => {
    const response = await rawg.get('/games', {
      params: {
        search: query,
      },
    });

    return { results: response.data.results, fullResultsOnly };
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
  },
  extraReducers: {
    [fetchGames.fulfilled]: (state, action) => {
      const { results, fullResultsOnly } = action.payload;

      if (results.length === 0) {
        state.status = 'failed';
      } else {
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

        state.status = 'succeeded';

        if (fullResultsOnly) {
          state.results = parsedResults;
        }

        if (!fullResultsOnly) {
          state.previewResults = parsedResults.slice(0, 7);
        }
      }
    },
    [fetchGames.rejected]: (state, action) => {
      // we need to display an error and a loading spinner on two separate components depending if fullResultsOnly is true. If it is, then we want the error and spinner to show only in the big list. If it is false, then we want them to show only in the preview list component
      // ATTENTION: task GD-23 remained here, take into account paragraph from above
      state.status = 'failed';
    },
    [fetchGames.pending]: (state, action) => {
      state.status = 'loading';
    },
  },
});

export const { fillShownResults, emptyPreviewResults, changeStatusToIdle } =
  gamesSlice.actions;

export default gamesSlice.reducer;

export const selectGamesResults = (state) => state.games.results;

export const selectPreviewResults = (state) => state.games.previewResults;

export const selectResults = (state) => state.games.results;

export const selectFetchGamesStatus = (state) => state.games.status;
