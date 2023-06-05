import watchLaterSlice from '../../data/watchLaterSlice'
import { moviesMock } from '../movies.mocks'

describe('watchLaterSlice', () => {

    const state = { watchLaterMovies: [] }

    it('should set initial state', () => {
        // Arrange
        const initialState = state
        const action = { type: '' }
        // Act
        const result = watchLaterSlice.reducer(initialState, action)
        // Assert
        expect(result).toEqual({ watchLaterMovies: []})
      })    

      it('should add movie to watch later', () => {
        // Arrange
        const initialState = { ...state, watchLaterMovies: [] }
        const movie = moviesMock[0]
        const action = watchLaterSlice.actions.addToWatchLater(movie)
        // Act
        const result = watchLaterSlice.reducer(initialState, action)
        // Assert
        expect(result.watchLaterMovies).toEqual([movie])
      })

      it('should remove movie from watch later', () => {
        // Arrage
        const initialState = { ...state, watchLaterMovies: moviesMock }
        const action = watchLaterSlice.actions.removeFromWatchLater(moviesMock[0].id)
        // Act
        const result = watchLaterSlice.reducer(initialState, action)
        // Assert
        expect(result.watchLaterMovies).not.toContain(moviesMock[0])
      })

      it('should remove all movies', () => {
        // Arrange
        const initialState = { ...state, watchLaterMovies: moviesMock }
        const action = watchLaterSlice.actions.removeAllWatchLater()
        // Act
        const result = watchLaterSlice.reducer(initialState, action)
        // Assert
        expect(result.watchLaterMovies).toEqual([])
      })
})