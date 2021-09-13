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
  async (query, resultsNumber = '') => {
    const response = await rawg.get('/games', {
      params: {
        search: query,
      },
    });

    return response.data.results;
  }
);

// export const fetchPreviews = createAsyncThunk(
//   'games/fetchGames',
//   async (query, resultsNumber = 7) => {
//     const response = await rawg.get('/games', {
//       params: {
//         search: query,
//         page_size: resultsNumber,
//       },
//     });

//     return response.data.results;
//   }
// );

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
    changeStatusToIdle(state, action) {
      state.status = 'idle';
    },
  },
  extraReducers: {
    [fetchGames.fulfilled]: (state, action) => {
      console.log(action.payload);

      if (action.payload.length === 0) {
        state.status = 'failed';
      } else {
        const parsedResults = action.payload.map((result) => {
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
        state.results = parsedResults;
        state.previewResults = parsedResults.slice(0, 7);
      }
    },
    [fetchGames.rejected]: (state, action) => {
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

export const selectShownResults = (state) => state.games.shownResults;

export const selectFetchGamesStatus = (state) => state.games.status;
