import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchMovies = createAsyncThunk('fetch-movies', async (apiUrl) => {
  const response = await fetch(apiUrl)
  return response.json()
})

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    list: [],
    fetchStatus: ''
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.list = action.payload.results.map((movie) => {
        return {
          id: movie.id,
          title: movie.title,
          overview: movie.overview,
          releaseDate: movie.release_date.substring(0, 4),
          posterPath: movie.poster_path
        }
      })
      state.fetchStatus = 'success'
    }).addCase(fetchMovies.pending, (state) => {
      state.fetchStatus = 'loading'
    }).addCase(fetchMovies.rejected, (state) => {
      state.fetchStatus = 'error'
    })
  }
})

export default moviesSlice
