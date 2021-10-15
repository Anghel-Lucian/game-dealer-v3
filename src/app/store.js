import { configureStore } from "@reduxjs/toolkit";
import gamesSearchSlice from "../features/gamesSearch/gamesSearchSlice";
import displayedGameSlice from "../features/displayedGame/displayedGameSlice";
import librarySlice from "../features/library/librarySlice";
import wishlistSlice from "../features/wishlist/wishlistSlice";

export default configureStore({
  reducer: {
    gamesSearch: gamesSearchSlice,
    displayedGame: displayedGameSlice,
    library: librarySlice,
    wishlist: wishlistSlice,
  },
});
