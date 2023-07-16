import { createSlice } from '@reduxjs/toolkit'

import { formMovieObject } from '../utils'

const watchLaterSlice = createSlice({
  name: 'watch-later',
  initialState: {
    watchLaterMovies: [],
  },
  reducers: {
    addToWatchLater: (state, action) => {
      state.watchLaterMovies = [
        formMovieObject(action.payload),
        ...state.watchLaterMovies,
      ]
    },
    removeFromWatchLater: (state, action) => {
      state.watchLaterMovies = state.watchLaterMovies.filter(
        (movie) => movie.id !== action.payload.id
      )
    },
    remveAllWatchLater: (state) => {
      state.watchLaterMovies = []
    },
  },
})

export default watchLaterSlice
