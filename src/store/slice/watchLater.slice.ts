import { createSlice } from "@reduxjs/toolkit";

import { Movie } from "../../core/types/movie.type";

type WatchLaterState = { watchLaterMovies: Movie[] };

const initialState: WatchLaterState = {
  watchLaterMovies: [],
};

const watchLaterSlice = createSlice({
  name: "watch-later",
  initialState,
  reducers: {
    addToWatchLater: (state, action) => {
      state.watchLaterMovies = [action.payload, ...state.watchLaterMovies];
    },
    removeFromWatchLater: (state, action) => {
      const indexOfId = state.watchLaterMovies.findIndex(
        (key) => key.id === action.payload.id
      );
      state.watchLaterMovies.splice(indexOfId, 1);
    },
    removeAllWatchLater: (state) => {
      state.watchLaterMovies = [];
    },
  },
});

export const { addToWatchLater, removeAllWatchLater, removeFromWatchLater } =
  watchLaterSlice.actions;
export const watchLaterReducer = watchLaterSlice.reducer;

export default watchLaterSlice;
