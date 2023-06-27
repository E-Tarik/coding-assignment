import { createSlice } from '@reduxjs/toolkit'

const watchLaterSlice = createSlice({
  name: 'watch-later',
  initialState: {
    watchLaterMovies: []
  },
  reducers: {
    toggleWatchLater: (state, action) => {
      const indexOfId = state.watchLaterMovies.findIndex(key => key.id === action.payload.id)

      if (indexOfId < 0) {
        state.watchLaterMovies = [action.payload, ...state.watchLaterMovies]
      } else {
        state.watchLaterMovies.splice(indexOfId, 1)
      }
    },
    removeAllWatchLater: (state) => {
      state.watchLaterMovies = []
    }
  }
})

export default watchLaterSlice
