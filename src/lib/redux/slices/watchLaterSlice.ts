import { createSlice } from '@reduxjs/toolkit';

export const watchLaterSlice = createSlice({
	name: 'watch-later',
	initialState: {
		watchLaterMovies: [] as any,
	},
	reducers: {
		addToWatchLater: (state, action) => {
			state.watchLaterMovies = [action.payload, ...state.watchLaterMovies];
		},
		removeFromWatchLater: (state, action) => {
			const indexOfId = state.watchLaterMovies.findIndex(
				(key: any) => key.id === action.payload.id,
			);
			state.watchLaterMovies.splice(indexOfId, 1);
		},
		removeAllWatchLater: (state) => {
			state.watchLaterMovies = [];
		},
	},
});
