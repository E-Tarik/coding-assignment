import { createSlice } from '@reduxjs/toolkit';
import { IMovieItemModel } from '../../../types';

export const starredSlice = createSlice({
	name: 'starred',
	initialState: {
		starredMovies: [] as IMovieItemModel[],
	},
	reducers: {
		starMovie: (state, action) => {
			state.starredMovies = [action.payload, ...state.starredMovies];
		},
		unstarMovie: (state, action) => {
			const indexOfId = state.starredMovies.findIndex(
				(key) => key.id === action.payload.id,
			);
			state.starredMovies.splice(indexOfId, 1);
		},
		clearAllStarred: (state) => {
			state.starredMovies = [];
		},
	},
});
