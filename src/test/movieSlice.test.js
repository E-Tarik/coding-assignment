import moviesSlice, { fetchMovies } from '../data/moviesSlice'
import { moviesMock } from './movies.mocks'

const initialState = {
  list: [],
  pagination: {
    page: 1,
    totalPages: 1
  },
  fetchStatus: ''
};

describe('MovieSlice test', () => {
  it('should set loading true while action is pending', () => {
    const action = { type: fetchMovies.pending }
    moviesSlice.reducer(initialState, action)
    expect(action).toEqual({ type: fetchMovies.pending })
  })

  it('should return payload when action is fulfilled', () => {
    const action = {
      type: fetchMovies.fulfilled,
      payload: { page: 1, results: moviesMock }
    }
    moviesSlice.reducer(initialState, action)
    expect(action.payload).toBeTruthy()
  })

  it('should set error when action is rejected', () => {
    const action = { type: fetchMovies.rejected }
    moviesSlice.reducer(initialState, action)
    expect(action).toEqual({ type: fetchMovies.rejected })
  })
})
