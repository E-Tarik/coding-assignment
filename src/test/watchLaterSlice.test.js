import watchLaterSlice from '../data/watchLaterSlice'
import { moviesMock } from './movies.mocks'

describe('watchLaterSlice test', () => {
  const state = { watchLaterMovies: [] }

  it('should set initial state', () => {
    const initialState = state
    const action = { type: '' }
    const result = watchLaterSlice.reducer(initialState, action)
    expect(result).toEqual({ watchLaterMovies: [] })
  })

  it('should add movie to watch later', () => {
    const initialState = { ...state, watchLaterMovies: [] }
    const action = watchLaterSlice.actions.toggleWatchLater(moviesMock[0])
    const result = watchLaterSlice.reducer(initialState, action)
    expect(result.watchLaterMovies[0]).toBe(moviesMock[0])
  })

  it('should remove movie from watch later', () => {
    const initialState = { ...state, watchLaterMovies: [] }
    const actionAdd = watchLaterSlice.actions.toggleWatchLater(moviesMock[0])
    const resultAdd = watchLaterSlice.reducer(initialState, actionAdd)
    expect(resultAdd.watchLaterMovies[0]).toBe(moviesMock[0])

    const actionRemove = watchLaterSlice.actions.toggleWatchLater(moviesMock[0])
    const resultRemove = watchLaterSlice.reducer(resultAdd, actionRemove)
    expect(resultRemove.watchLaterMovies[0]).toBe(undefined)
  })

  it('should remove all movies', () => {
    const initialState = { ...state, watchLaterMovies: [] }
    const actionAdd = watchLaterSlice.actions.toggleWatchLater(moviesMock[0])
    const resultAdd = watchLaterSlice.reducer(initialState, actionAdd)
    expect(resultAdd.watchLaterMovies[0]).toBe(moviesMock[0])

    const actionClear = watchLaterSlice.actions.removeAllWatchLater(state)
    const resultClear = watchLaterSlice.reducer(resultAdd, actionClear)
    expect(Object.keys(resultClear.watchLaterMovies).length).toEqual(0)
  })
})
