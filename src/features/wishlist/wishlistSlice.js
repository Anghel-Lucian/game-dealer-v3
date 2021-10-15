import { createSlice } from "react-redux";

const initialState = {
  wishlistGames: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addGameToWishlist(state, action) {
      const addedGame = action.payload;

      state.wishlistGames = [...state.wishlistGames, addedGame];
    },
    removeGameFromWishlist(state, action) {
      const removedGameSlug = action.payload.slug;

      state.wishlistGames = state.wishlistGames.filter(
        (game) => game.slug !== removedGameSlug
      );
    },
  },
});

export const { addGameToWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;
