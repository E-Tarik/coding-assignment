import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { ENDPOINT_DISCOVER, ENDPOINT_SEARCH } from '../constants'

export const fetchMovies = createAsyncThunk(
  'fetch-movies',
  async ({ page }) => {
    const response = await fetch(`${ENDPOINT_DISCOVER}&page=${page}`)
    return response.json()
  }
)
export const searchMovies = createAsyncThunk(
  'search-movies',
  async ({ page, search }) => {
    const response = await fetch(
      `${ENDPOINT_SEARCH}&query=${search}&page=${page}`
    )
    return response.json()
  }
)

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    page: 0,
    hasMore: true,
    movies: [],
    fetchStatus: '',
    searchQuery: '',
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.movies = [...state.movies, ...action.payload.results]
        state.page = action.payload.page
        state.hasMore = action.payload.page < action.payload.total_pages
        state.fetchStatus = 'success'
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.movies = [...state.movies, ...action.payload.results]
        state.page = action.payload.page
        state.hasMore = action.payload.page < action.payload.total_pages
        state.fetchStatus = 'success'
      })
      .addCase(fetchMovies.pending, (state, action) => {
        state.fetchStatus = 'loading'
        if (state.searchQuery !== action.meta.arg.search) {
          state.movies = []
          state.searchQuery = action.meta.arg.search
        }
      })
      .addCase(searchMovies.pending, (state, action) => {
        state.fetchStatus = 'loading'
        if (state.searchQuery !== action.meta.arg.search) {
          state.movies = []
        }
        state.searchQuery = action.meta.arg.search
      })
      .addCase(fetchMovies.rejected, (state) => {
        state.fetchStatus = 'error'
      })
  },
})

export default moviesSlice
