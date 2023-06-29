import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
export function renderWithProviders (
  ui,
  {
    preloadedState = {},
    store = configureStore({
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
        starred: jest.fn(() => ({starredMovies: [
          {
            id: 27205,
            overview: 'Cobb, a skilled thief who commits corporate espionage by infiltrating...',
            poster_path: '/8IB2e4r4oVhHnANbnm7O3Tj6tF8.jpg',
            release_date: '2010-07-15',
            title: 'Inception'
          }
        ]})),
        watchLater: jest.fn(() => ({watchLaterMovies: []})),
        player: jest.fn(() => ({currentMovieId: null}))
      },
      preloadedState
    }),
    ...renderOptions
  } = {}
) {
  setupListeners(store.dispatch)

  function Wrapper ({ children }) {
    return <Provider store={store}><BrowserRouter>{children}</BrowserRouter></Provider>
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}
