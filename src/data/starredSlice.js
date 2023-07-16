import { createSlice } from '@reduxjs/toolkit'

import { formMovieObject } from '../utils'

const starredSlice = createSlice({
  name: 'starred',
  initialState: {
    starredMovies: [],
  },
  reducers: {
    starMovie: (state, action) => {
      state.starredMovies = [
        formMovieObject(action.payload),
        ...state.starredMovies,
      ]
    },
    unstarMovie: (state, action) => {
      state.starredMovies = state.starredMovies.filter(
        (movie) => movie.id !== action.payload.id
      )
    },
    clearAllStarred: (state) => {
      state.starredMovies = []
    },
  },
})

export default starredSlice
