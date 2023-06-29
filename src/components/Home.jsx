import React from 'react'
import PropTypes from 'prop-types'
import Movies from './Movies'
import { useSelector } from 'react-redux'
import '../styles/starred.scss'

function Home ({ children }) {
  const moviesList = useSelector((state) => state.movies.list)

  return (
    <>
      <Movies
        movies={moviesList}
      />

      {children}
    </>
  )
}

Home.defaultProps = {
  children: null
}

Home.propTypes = {
  children: PropTypes.element
}

export default Home
