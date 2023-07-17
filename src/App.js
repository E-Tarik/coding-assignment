import 'reactjs-popup/dist/index.css'

import './app.scss'

import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'

import Header from './components/Header'
import { Modal } from './components/Modal'
import Movies from './components/Movies'
import Starred from './components/Starred'
import WatchLater from './components/WatchLater'
import { API_KEY, ENDPOINT } from './constants'
import modalSlice from './data/modalSlice'

const App = () => {
  const { movies } = useSelector((state) => state)
  const dispatch = useDispatch()

  const { showModal, setVideoKey } = modalSlice.actions

  const closeCard = () => {}

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

  return (
    <div className="App">
      <Header />
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
