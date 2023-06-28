import React from 'react'
import Movies from './Movies'
import { useSelector } from 'react-redux'
import '../styles/starred.scss'

function Home () {
  const moviesList = useSelector((state) => state.movies.list)

  return (
    <Movies
      movies={moviesList}
    />
  )
}

export default Home
