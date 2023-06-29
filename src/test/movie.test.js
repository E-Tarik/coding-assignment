import { screen, waitFor, fireEvent } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import starredSlice from '../data/starredSlice'
import './__mocks__/intersectionObserverMock';
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from './utils'
import App from '../App'

it('movies starred and saved to watch later', async () => {
  const mockState = {
    watchLater: jest.fn(() => ({watchLaterMovies: []})),
    movies: jest.fn(() => ({list: [
      {
        id: 27205,
        overview: 'Through the Eyes of Forrest Gump',
        poster_path: '/8IB2e4r4oVhHnANbnm7O3Tj6tF8.jpg',
        release_date: '2010-07-15',
        title: 'HELLO WORLD'
      },
    ], pagination: {page: 1, totalPages: 1}})),
    starred: starredSlice.reducer,
    watchLater: jest.fn(() => ({watchLaterMovies: [
      {
        id: 27205,
        overview: 'Through the Eyes of Forrest Gump',
        poster_path: '/8IB2e4r4oVhHnANbnm7O3Tj6tF8.jpg',
        release_date: '2010-07-15',
        title: 'HELLO WORLD'
      }
    ]})),
    player: jest.fn(() => ({currentMovieId: null})),
  }

  renderWithProviders(<App />, {
    store: configureStore({reducer: mockState, preloadedState: {}})
  })

  await userEvent.type(screen.getByTestId('search-movies'), 'forrest gump')
  await waitFor(() => {
    expect(screen.getAllByText('Through the Eyes of Forrest Gump')[0]).toBeInTheDocument()
  })
  const starMovieLink = screen.getAllByTestId('starred-link')[0]
  await waitFor(() => {
    expect(starMovieLink).toBeInTheDocument()
  })

  fireEvent.click(starMovieLink)
  await waitFor(() => {
    expect(screen.getByTestId('star-fill')).toBeInTheDocument()
  })
  await waitFor(() => {
    expect(screen.getByTestId('unstar-link')).toBeInTheDocument()
  })

  const watchLaterLink = screen.getAllByTestId('watch-later')[0]
  await waitFor(() => {
    expect(watchLaterLink).toBeInTheDocument()
  })

  fireEvent.click(watchLaterLink)
  await waitFor(() => {
    expect(screen.getByTestId('remove-watch-later')).toBeInTheDocument()
  })

  await userEvent.click(screen.getAllByTestId('remove-watch-later')[0])
})
