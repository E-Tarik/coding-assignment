import { screen, waitFor } from '@testing-library/react'
import './test/__mocks__/intersectionObserverMock';
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from './test/utils'
import { BrowserRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import App from './App'

beforeEach(() => {
  fetch.resetMocks()
})

it('renders watch later link', () => {
  const mockState = {
    watchLater: jest.fn(() => ({watchLaterMovies: []})),
    movies: jest.fn(() => ({list: [], pagination: {page: 1, totalPages: 1}})),
    starred: jest.fn(() => ({starredMovies: []})),
    watchLater: jest.fn(() => ({watchLaterMovies: []})),
    player: jest.fn(() => ({currentMovieId: null})),
  }
  renderWithProviders(<App />, {
    store: configureStore({reducer: mockState, preloadedState: {}})
  })
  const linkElement = screen.getByText(/watch later/i)
  expect(linkElement).toBeInTheDocument()
})

it('search for movies', async () => {
  fetch.mockResponseOnce(JSON.stringify({ videos: {results: [
    {type: 'Trailer', key: '1234567890'}
  ]} }))

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
    watchLater: jest.fn(() => ({watchLaterMovies: []})),
    player: jest.fn(() => ({currentMovieId: 27205})),
  }

  renderWithProviders(<App />, {
    store: configureStore({reducer: mockState, preloadedState: {}})
  })
  await userEvent.type(screen.getByTestId('search-movies'), 'forrest gump')
  await waitFor(() => {
    expect(screen.getAllByText('Through the Eyes of Forrest Gump')[0]).toBeInTheDocument()
  })
  const viewTrailerBtn = screen.getAllByText('View Trailer')[0]
  await userEvent.click(viewTrailerBtn)
  await waitFor(() => {
    expect(screen.getByTestId('youtube-player')).toBeInTheDocument()
  })
})

it('renders watch later component', async () => {
  const mockState = {
    watchLater: jest.fn(() => ({watchLaterMovies: []})),
    movies: jest.fn(() => ({list: [], pagination: {page: 1, totalPages: 1}})),
    starred: jest.fn(() => ({starredMovies: []})),
    watchLater: jest.fn(() => ({watchLaterMovies: []})),
    player: jest.fn(() => ({currentMovieId: null})),
  }

  renderWithProviders(<App />, {
    store: configureStore({reducer: mockState, preloadedState: {}})
  })
  const user = userEvent.setup()
  await user.click(screen.getByText(/watch later/i))
  expect(screen.getByText(/You have no movies saved to watch later/i)).toBeInTheDocument()
})

it('renders starred component', async () => {
  renderWithProviders(<App />, {store: configureStore({
    reducer: {
      movies: jest.fn(() => ({
        list: [
          {
            id: 27205,
            overview: 'Cobb, a skilled thief who commits corporate espionage by infiltrating...',
            poster_path: '/8IB2e4r4oVhHnANbnm7O3Tj6tF8.jpg',
            release_date: '2010-07-15',
            title: 'Inception'
          },
          {
            id: 157336,
            overview: 'The adventures of a group of explorers who make use of...',
            poster_path: '/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
            release_date: '2014-11-05',
            title: 'Interstellar'
          }
        ],
        pagination: {
          page: 1,
          totalPages: 1
        },
        fetchStatus: ''
      })),
      starred: jest.fn(() => ({starredMovies: []})),
      watchLater: jest.fn(() => ({watchLaterMovies: []})),
      player: jest.fn(() => ({currentMovieId: null}))
    },
    preloadedState: {}
  })})
  const user = userEvent.setup()
  await user.click(screen.getByTestId('nav-starred'))
  expect(screen.getByText(/There are no starred movies/i)).toBeInTheDocument()
  await waitFor(() => {
    expect(screen.getByTestId('starred')).toBeInTheDocument()
  })
})
