import React, { useEffect, useCallback, useRef } from 'react'
import { Routes, Route, createSearchParams, useSearchParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
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
  const moreRef = useRef()
  // eslint-disable-next-line react/hook-use-state
  const navigate = useNavigate()
  const { page, totalPages } = useSelector(state => state.movies.pagination)

  const observeMovies = (entries) => {
    if (entries[0].intersectionRatio <= 0) return
    getMovies(page + 1)
  }

  const getSearchResults = (query) => {
    if (query !== '') {
      dispatch(fetchMovies(`${ENDPOINT_SEARCH}&query=` + query))
      setSearchParams(createSearchParams({ search: query }))
    } else {
      dispatch(fetchMovies(`${ENDPOINT_DISCOVER}&page=1`))
      setSearchParams()
    }
  }

  const searchMovies = useCallback((query) => {
    navigate('/')
    getSearchResults(query)
  }, [getSearchResults])

  const getMovies = (page) => {
    if (searchQuery) {
      dispatch(fetchMovies(`${ENDPOINT_SEARCH}&page=${page}&query=` + searchQuery))
    } else {
      dispatch(fetchMovies(`${ENDPOINT_DISCOVER}&page=${page}`))
    }
  }

  const options = {
    root: null
  }

  useEffect(() => {
    // eslint-disable-next-line no-undef
    const observer = new IntersectionObserver(observeMovies, options)

    if (moreRef.current) {
      observer.observe(moreRef.current)
    }

    return () => {
      if (moreRef.current) {
        observer.unobserve(moreRef.current)
      }
    }
  }, [moreRef, options])

  return (
    <div className="App">
      <Header
        searchMovies={searchMovies}
      />

      <div className="container">
        <Routes>
          <Route
            element={(
              <Home>
                {totalPages > page
                  ? (
                    <div
                      className="more"
                      ref={moreRef}
                    >
                      <p className="virtual" />
                      loading ...
                    </div>
                  )
                  : null}
              </Home>
            )}
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
