import React, { useEffect, useState, useCallback } from 'react'
import { Routes, Route, createSearchParams, useSearchParams, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import 'reactjs-popup/dist/index.css'
import { fetchMovies } from './data/moviesSlice'
import { ENDPOINT_SEARCH, ENDPOINT_DISCOVER, ENDPOINT, API_KEY } from './constants'
import Header from './components/Header'
import Starred from './components/Starred'
import WatchLater from './components/WatchLater'
import Home from './components/Home'
import YouTubePlayer from './components/YoutubePlayer'

import './app.scss'

function App () {
  const dispatch = useDispatch()

  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get('search')
  const [videoKey, setVideoKey] = useState()
  const [isOpened, setIsOpened] = useState()
  const navigate = useNavigate()

  const closeCard = useCallback(() => {
    console.log('On card close', isOpened)
  })

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

  const getMovie = async (id) => {
    const URL = `${ENDPOINT}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`

    setVideoKey(null)
    const videoData = await fetch(URL)
      .then((response) => response.json())

    if (videoData.videos && videoData.videos.results.length) {
      const trailer = videoData.videos.results.find(vid => vid.type === 'Trailer')
      setVideoKey(trailer ? trailer.key : videoData.videos.results[0].key)
    }
  }

  const viewTrailer = useCallback((movie) => {
    getMovie(movie.id)
    if (!videoKey) setIsOpened(true)
    setIsOpened(true)
  }, [getMovie, setIsOpened])

  useEffect(() => {
    getMovies()
  }, [])

  return (
    <div className="App">
      <Header
        searchMovies={searchMovies}
      />

      <div className="container">
        {videoKey
          ? (
            <YouTubePlayer
              videoKey={videoKey}
            />
          )
          : (
            <div style={{ padding: '30px' }}>
              <h6>
                no trailer available. Try another movie
              </h6>
            </div>
          )}

        <Routes>
          <Route
            element={(
              <Home
                onCloseCard={closeCard}
                viewTrailer={viewTrailer}
              />
            )}
            path="/"
          />

          <Route
            element={(
              <Starred
                onCloseCard={closeCard}
                viewTrailer={viewTrailer}
              />
            )}
            path="/starred"
          />

          <Route
            element={(
              <WatchLater
                onCloseCard={closeCard}
                viewTrailer={viewTrailer}
              />
            )}
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
    </div>
  )
}

export default App
