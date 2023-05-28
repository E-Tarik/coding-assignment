import { createSlice } from '@reduxjs/toolkit';

export const starredSlice = createSlice({
	name: 'starred',
	initialState: {
		starredMovies: [] as any,
	},
	reducers: {
		starMovie: (state, action: { payload: any; type: any }) => {
			state.starredMovies = [action.payload, ...state.starredMovies];
		},
		unstarMovie: (state, action) => {
			const indexOfId = state.starredMovies.findIndex(
				(key: any) => key.id === action.payload.id,
			);
			state.starredMovies.splice(indexOfId, 1);
		},
		clearAllStarred: (state) => {
			state.starredMovies = [];
		},
	},
});
