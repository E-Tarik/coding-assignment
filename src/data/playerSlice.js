import { createSlice } from '@reduxjs/toolkit'

const plyerSlice = createSlice({
  name: 'player',
  initialState: {
    currentMovieId: null
  },
  reducers: {
    setCurrentMovieId: (state, action) => {
      state.currentMovieId = action.payload
    }
  }
})

export default plyerSlice
