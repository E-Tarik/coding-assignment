import React from 'react'
import PropTypes from 'prop-types'
import Movies from './Movies'
import { useSelector } from 'react-redux'
import '../styles/starred.scss'

function Home ({ viewTrailer }) {
  const moviesList = useSelector((state) => state.movies.list)

  return (
    <Movies
      movies={moviesList}
      viewTrailer={viewTrailer}
    />
  )
}

Home.propTypes = {
  viewTrailer: PropTypes.func.isRequired
}

export default Home
