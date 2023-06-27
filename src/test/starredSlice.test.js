import starredSlice from '../data/starredSlice'
import { moviesMock } from './movies.mocks'

describe('starredSlice test', () => {
  const state = { starredMovies: [] }

  it('should set an initial state', () => {
    const initialState = state
    const action = { type: '' }
    const result = starredSlice.reducer(initialState, action)
    expect(result).toEqual({ starredMovies: [] })
  })

  it('should add movie to starred', () => {
    const initialState = { ...state, starredMovies: [] }
    const action = starredSlice.actions.toggleStar(moviesMock[0])
    const result = starredSlice.reducer(initialState, action)
    expect(result.starredMovies[0]).toBe(moviesMock[0])
  })

  it('should remove movie from starred', () => {
    const initialState = { ...state, starredMovies: [] }
    const actionAdd = starredSlice.actions.toggleStar(moviesMock[0])
    const resultAdd = starredSlice.reducer(initialState, actionAdd)
    expect(resultAdd.starredMovies[0]).toBe(moviesMock[0])

    const actionRemove = starredSlice.actions.toggleStar(moviesMock[0])
    const resultRemove = starredSlice.reducer(resultAdd, actionRemove)
    expect(resultRemove.starredMovies[0]).toBe(undefined)
  })

  it('should remove all movies', () => {
    const initialState = { ...state, starredMovies: [] }
    const actionAdd = starredSlice.actions.toggleStar(moviesMock[0])
    const resultAdd = starredSlice.reducer(initialState, actionAdd)
    expect(resultAdd.starredMovies[0]).toBe(moviesMock[0])

    const actionClear = starredSlice.actions.clearAllStarred(state)
    const resultClear = starredSlice.reducer(resultAdd, actionClear)
    expect(Object.keys(resultClear.starredMovies).length).toEqual(0)
  })
})
