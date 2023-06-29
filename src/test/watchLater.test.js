import { screen, waitFor } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import './__mocks__/intersectionObserverMock';
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from './utils'
import App from '../App'

it('Watch Later movies page', async () => {
  const mockState = {
    watchLater: jest.fn(() => ({watchLaterMovies: []})),
    movies: jest.fn(() => ({list: [
      {
        id: 27205,
        overview: 'Through the Eyes of Forrest Gump',
        poster_path: '/8IB2e4r4oVhHnANbnm7O3Tj6tF8.jpg',
        release_date: '2010-07-15',
        title: 'Forrest Gump'
      },
    ], pagination: {page: 1, totalPages: 1}})),
    starred: jest.fn(() => ({starredMovies: []})),
    watchLater: jest.fn(() => ({watchLaterMovies: [
      {
        id: 27205,
        overview: 'Through the Eyes of Forrest Gump',
        poster_path: '/8IB2e4r4oVhHnANbnm7O3Tj6tF8.jpg',
        release_date: '2010-07-15',
        title: 'Forrest Gump'
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
  const watchLaterLink = screen.getAllByTestId('watch-later')[0]
  await waitFor(() => {
    expect(watchLaterLink).toBeInTheDocument()
  })
  await userEvent.click(watchLaterLink)

  const watchLaterDiv = screen.getByTestId('watch-later-div')
  await waitFor(() => {
      expect(watchLaterDiv).toBeInTheDocument()
  })
  await userEvent.click(watchLaterDiv)
})
