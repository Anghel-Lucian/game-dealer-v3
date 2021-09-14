import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  released: '',
};

const displayedGameSlice = createSlice({
  name: 'displayedGame',
  initialState,
  reducers: {
    testReducer(state, action) {
      console.log('delete me');
    },
  },
});

export const { testReducer } = displayedGameSlice.actions;

export default displayedGameSlice.reducer;
