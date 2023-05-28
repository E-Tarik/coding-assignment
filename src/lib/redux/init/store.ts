import { configureStore } from '@reduxjs/toolkit';
import { moviesSlice, starredSlice, watchLaterSlice } from '../slices';

const store = configureStore({
	reducer: {
		movies: moviesSlice.reducer,
		starred: starredSlice.reducer,
		watchLater: watchLaterSlice.reducer,
	},
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
