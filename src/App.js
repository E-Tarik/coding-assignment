import 'reactjs-popup/dist/index.css'

import './app.scss'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Route,
  Routes,
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom'

import Header from './components/Header'
import { Modal } from './components/Modal'
import Movies from './components/Movies'
import Starred from './components/Starred'
import WatchLater from './components/WatchLater'
import {
  API_KEY,
  ENDPOINT,
  ENDPOINT_DISCOVER,
  ENDPOINT_SEARCH,
} from './constants'
import modalSlice from './data/modalSlice'
import { fetchMovies } from './data/moviesSlice'

const App = () => {
  const { movies } = useSelector((state) => state)
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get('search')
  const navigate = useNavigate()
  const { showModal, setVideoKey } = modalSlice.actions

  const closeCard = () => {}

  const getSearchResults = (query) => {
    if (query) {
      dispatch(fetchMovies(`${ENDPOINT_SEARCH}&query=` + query))
      setSearchParams(createSearchParams({ search: query }))
      return
    }
    dispatch(fetchMovies(ENDPOINT_DISCOVER))
    setSearchParams()
  }

  const searchMovies = (query) => {
    navigate('/')
    getSearchResults(query)
  }

  const getMovies = () => {
    if (searchQuery) {
      dispatch(fetchMovies(`${ENDPOINT_SEARCH}&query=` + searchQuery))
      return
    }
    dispatch(fetchMovies(ENDPOINT_DISCOVER))
  }

  const viewTrailer = (movie) => {
    getMovie(movie.id)
  }

  const getMovie = async (id) => {
    const URL = `${ENDPOINT}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`

    setVideoKey(null)
    const videoData = await fetch(URL).then((response) => response.json())

    if (videoData.videos && videoData.videos.results.length) {
      const trailer = videoData.videos.results.find(
        (vid) => vid.type === 'Trailer'
      )
      dispatch(
        setVideoKey(trailer ? trailer.key : videoData.videos.results[0].key)
      )
    }
    dispatch(showModal())
  }

  useEffect(() => {
    getMovies()
  }, [])

  return (
    <div className="App">
      <Header
        searchMovies={searchMovies}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <Movies
                movies={movies}
                viewTrailer={viewTrailer}
                closeCard={closeCard}
              />
            }
          />
          <Route
            path="/starred"
            element={<Starred viewTrailer={viewTrailer} />}
          />
          <Route
            path="/watch-later"
            element={<WatchLater viewTrailer={viewTrailer} />}
          />
          <Route
            path="*"
            element={<h1 className="not-found">Page Not Found</h1>}
          />
        </Routes>
      </div>
      <Modal />
    </div>
  )
}

export default App
