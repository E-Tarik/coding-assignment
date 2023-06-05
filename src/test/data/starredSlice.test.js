import starredSlice from '../../data/starredSlice'
import { moviesMock } from '../movies.mocks'

describe('starredSlice', () => {

    const state = { starredMovies: [] }

    it('should set an initial state', () => {
        // Arrange
        const initialState = state
        const action = { type: '' }
        // Act
        const result = starredSlice.reducer(initialState, action)
        // Assert
        expect(result).toEqual({ starredMovies: []})
      })    

      it('should add movie to starred', () => {
        // Arrange
        const initialState = { ...state, starredMovies: [] }
        const movie = moviesMock[0]
        const action = starredSlice.actions.starMovie(movie)
        // Act
        const result = starredSlice.reducer(initialState, action)
        // Assert
        expect(result.starredMovies).toEqual([movie])
      })

      it('should remove movie from starred', () => {
        // Arrange
        const initialState = { ...state, starredMovies: moviesMock }
        const action = starredSlice.actions.unstarMovie(moviesMock[0].id)
        // Act
        const result = starredSlice.reducer(initialState, action)
        // Assert
        expect(result.starredMovies).not.toContain([moviesMock[0]])
      })

      it('should remove all movies', () => {
        // Arrange
        const initialState = { ...state, starredMovies: moviesMock }
        const action = starredSlice.actions.clearAllStarred(state)
        // Act
        const result = starredSlice.reducer(initialState, action)
        // Assert
        expect(result.starredMovies).toEqual([])
      })
})