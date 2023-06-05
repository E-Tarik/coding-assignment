import moviesSlice, { fetchMovies } from '../../data/moviesSlice';
import { moviesMock } from '../movies.mocks';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

describe('MovieSlice', () => {
  const state = { movies: [], fetchStatus: '' };

  it('should set fetch status to loading while request is pending', () => {
    // Arrange
    const initialState = state;
    const action = { type: fetchMovies.pending };
    // Act
    const result = moviesSlice.reducer(initialState, action);
    // Assert
    expect(result.fetchStatus).toBe('loading');
  });

  it('should set fetch status to error while request is rejected', () => {
    // Arrange
    const initialState = state;
    const action = { type: fetchMovies.rejected };
    // Act
    const result = moviesSlice.reducer(initialState, action);
    // Assert
    expect(result.fetchStatus).toBe('error');
  });

  it('should return payload when action is fulfilled', () => {
    // Arrange
    const initialState = state;
    const action = {
      type: fetchMovies.fulfilled,
      payload: moviesMock,
    };
    // Act
    const result = moviesSlice.reducer(initialState, action);
    // Assert
    expect(result.fetchStatus).toBe('success');
    expect(result.movies).toBe(moviesMock);
  });
});

describe('fetchMovies', () => {
  const state = {
    movies: {
      movies: { results: [moviesMock[0]] },
      fetchStatus: 'sucssasdasdcess',
    },
  };
  const mockStore = configureMockStore([thunk]);

  global.fetch = () =>
    Promise.resolve({
      json: () => Promise.resolve({ results: [moviesMock[1]] }),
    });

  it('should return only the search result', async () => {
    // Arrange
    const store = mockStore(state);
    const action = fetchMovies({
      apiUrl: 'search/url/to/service',
      append: false,
    });

    // Act
    await store.dispatch(action);

    // Assert
    expect(store.getActions()[0].type).toContain('pending');
    expect(store.getActions()[1].type).toContain('fulfilled');
    expect(store.getActions()[1].payload.results).toEqual([moviesMock[1]]);
  });

  it('should append results with the right flag', async () => {
    // Arrange
    const store = mockStore(state);
    const action = fetchMovies({
      apiUrl: 'search/url/to/service',
      append: true,
    });

    // Act
    await store.dispatch(action);

    // Assert
    expect(store.getActions()[0].type).toContain('pending');
    expect(store.getActions()[1].type).toContain('fulfilled');
    expect(store.getActions()[1].payload.results).toEqual([moviesMock[0], moviesMock[1]]);
  });
});
