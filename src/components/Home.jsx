import React from 'react'
import PropTypes from 'prop-types'
import Movies from './Movies'
import { useSelector } from 'react-redux'
import '../styles/starred.scss'

function Home ({ viewTrailer, onCloseCard }) {
  const moviesList = useSelector((state) => state.movies.list)

  return (
    <Movies
      closeCard={onCloseCard}
      movies={moviesList}
      viewTrailer={viewTrailer}
    />
  )
}

Home.propTypes = {
  onCloseCard: PropTypes.func.isRequired,
  viewTrailer: PropTypes.func.isRequired
}

export default Home
