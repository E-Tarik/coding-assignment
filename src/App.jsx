import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { Routes, Route, createSearchParams, useSearchParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import 'reactjs-popup/dist/index.css'
import { fetchMovies } from './data/moviesSlice'
import watchLaterSlice from './data/watchLaterSlice'
import starredSlice from './data/starredSlice'
import { ENDPOINT_SEARCH, ENDPOINT_DISCOVER, ENDPOINT, API_KEY } from './constants'
import Header from './components/Header'
import Movies from './components/Movies'
import Starred from './components/Starred'
import WatchLater from './components/WatchLater'
import YouTubePlayer from './components/YoutubePlayer'
import './app.scss'

const { removeAllWatchLater, toggleWatchLater } = watchLaterSlice.actions
const { clearAllStarred, toggleStar } = starredSlice.actions

function App () {
  const moviesList = useSelector((state) => state.movies.list)
  const starredList = useSelector((state) => state.starred.starredMovies)
  const watchLaterList = useSelector((state) => state.watchLater.watchLaterMovies)

  const starredCount = starredList.length

  const starredIds = useMemo(() => starredList.map(movie => movie.id), [starredList])
  const watchLaterIds = useMemo(() => watchLaterList.map(movie => movie.id), [watchLaterList])

  const dispatch = useDispatch()

  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get('search')
  const [videoKey, setVideoKey] = useState()
  const [isOpened, setIsOpened] = useState()
  const navigate = useNavigate()

  const onRemoveAllWatchLater = useCallback(() => {
    dispatch(removeAllWatchLater())
  }, [dispatch])

  const onClearStarred = useCallback(() => {
    dispatch(clearAllStarred())
  }, [dispatch])

  const onStarClick = useCallback((movie) => {
    dispatch(toggleStar(movie))
  }, [dispatch])

  const onWatchLaterButtonClick = useCallback((movie) => {
    dispatch(toggleWatchLater(movie))
  }, [dispatch])

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
  }, [navigate, getSearchResults])

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
        starredCount={starredCount}
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
              <Movies
                closeCard={closeCard}
                movies={moviesList}
                onStarClick={onStarClick}
                onWatchLaterButtonClick={onWatchLaterButtonClick}
                starredIds={starredIds}
                viewTrailer={viewTrailer}
                watchLaterIds={watchLaterIds}
              />
            )}
            path="/"
          />

          <Route
            element={(
              <Starred
                onRemoveAll={onClearStarred}
                starredCount={starredList.length}
              >
                <Movies
                  closeCard={closeCard}
                  movies={starredList}
                  onStarClick={onStarClick}
                  onWatchLaterButtonClick={onWatchLaterButtonClick}
                  starredIds={starredIds}
                  viewTrailer={viewTrailer}
                  watchLaterIds={watchLaterIds}
                />
              </Starred>
            )}
            path="/starred"
          />

          <Route
            element={(
              <WatchLater
                onRemoveAll={onRemoveAllWatchLater}
                watchLaterCount={watchLaterList.length}
              >
                <Movies
                  closeCard={closeCard}
                  movies={watchLaterList}
                  onStarClick={onStarClick}
                  onWatchLaterButtonClick={onWatchLaterButtonClick}
                  starredIds={starredIds}
                  viewTrailer={viewTrailer}
                  watchLaterIds={watchLaterIds}
                />
              </WatchLater>
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
