import { configureStore } from '@reduxjs/toolkit';

import moviesSlice from './movies-slice';
import starredSlice from './starred-slice';
import watchLaterSlice from './watch-later-slice';

const store = configureStore({
  reducer: {
    movies: moviesSlice.reducer,
    starred: starredSlice.reducer,
    watchLater: watchLaterSlice.reducer,
  },
});

export default store;
