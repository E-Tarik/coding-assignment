import { configureStore } from '@reduxjs/toolkit'
import moviesSlice from './moviesSlice'
import starredSlice from './starredSlice'
import watchLaterSlice from './watchLaterSlice'
import playerSlice from './playerSlice'

const store = configureStore({
  reducer: {
    movies: moviesSlice.reducer,
    starred: starredSlice.reducer,
    watchLater: watchLaterSlice.reducer,
    player: playerSlice.reducer
  }
})

export default store
