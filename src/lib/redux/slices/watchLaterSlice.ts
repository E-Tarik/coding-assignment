import { createSlice } from '@reduxjs/toolkit';
import { IMovieItemModel } from '../../../types';

export const watchLaterSlice = createSlice({
	name: 'watch-later',
	initialState: {
		watchLaterMovies: [] as IMovieItemModel[],
	},
	reducers: {
		addToWatchLater: (state, action) => {
			state.watchLaterMovies = [action.payload, ...state.watchLaterMovies];
		},
		removeFromWatchLater: (state, action) => {
			const indexOfId = state.watchLaterMovies.findIndex(
				(key) => key.id === action.payload.id,
			);
			state.watchLaterMovies.splice(indexOfId, 1);
		},
		removeAllWatchLater: (state) => {
			state.watchLaterMovies = [];
		},
	},
});
