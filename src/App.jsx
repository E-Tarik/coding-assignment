import React, { useEffect, useCallback } from 'react'
import { Routes, Route, createSearchParams, useSearchParams, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import 'reactjs-popup/dist/index.css'
import { fetchMovies } from './data/moviesSlice'
import { ENDPOINT_SEARCH, ENDPOINT_DISCOVER } from './constants'
import Header from './components/Header'
import Starred from './components/Starred'
import WatchLater from './components/WatchLater'
import Home from './components/Home'
import PlayerModal from './components/PlayerModal'
import './app.scss'

function App () {
  const dispatch = useDispatch()

  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get('search')
  const navigate = useNavigate()

  const getSearchResults = (query) => {
    if (query !== '') {
      dispatch(fetchMovies(`${ENDPOINT_SEARCH}&query=` + query))
      setSearchParams(createSearchParams({ search: query }))
    } else {
      dispatch(fetchMovies(ENDPOINT_DISCOVER))
      setSearchParams()
    }
  }

  const searchMovies = useCallback((query) => {
    navigate('/')
    getSearchResults(query)
  }, [getSearchResults])

  const getMovies = () => {
    if (searchQuery) {
      dispatch(fetchMovies(`${ENDPOINT_SEARCH}&query=` + searchQuery))
    } else {
      dispatch(fetchMovies(ENDPOINT_DISCOVER))
    }
  }

  useEffect(() => {
    getMovies()
  }, [])

  return (
    <div className="App">
      <Header
        searchMovies={searchMovies}
      />

      <div className="container">
        <Routes>
          <Route
            element={<Home />}
            path="/"
          />

          <Route
            element={<Starred />}
            path="/starred"
          />

          <Route
            element={<WatchLater />}
            path="/watch-later"
          />

          <Route
            element={(
              <h1 className="not-found">
                Page Not Found
              </h1>
            )}
            path="*"
          />
        </Routes>
      </div>

      <PlayerModal />
    </div>
  )
}

export default App
