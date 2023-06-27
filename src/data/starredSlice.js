import { createSlice } from '@reduxjs/toolkit'

const starredSlice = createSlice({
  name: 'starred',
  initialState: {
    starredMovies: []
  },
  reducers: {
    toggleStar: (state, action) => {
      const indexOfId = state.starredMovies.findIndex(key => key.id === action.payload.id)

      if (indexOfId < 0) {
        state.starredMovies = [action.payload, ...state.starredMovies]
      } else {
        state.starredMovies.splice(indexOfId, 1)
      }
    },
    clearAllStarred: (state) => {
      state.starredMovies = []
    }
  }
})

export default starredSlice
