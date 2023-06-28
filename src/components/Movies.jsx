import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import Movie from './Movie'
import { useSelector } from 'react-redux'
import '../styles/movies.scss'

function Movies ({ movies }) {
  const starredList = useSelector((state) => state.starred.starredMovies)
  const watchLaterList = useSelector((state) => state.watchLater.watchLaterMovies)

  const starredIds = useMemo(() => starredList.map(movie => movie.id), [starredList])
  const watchLaterIds = useMemo(() => watchLaterList.map(movie => movie.id), [watchLaterList])

  return (
    <div
      className="movies-grid"
      data-testid="movies"
    >
      {movies.map((movie) => (
        <Movie
          isSavedToWatch={watchLaterIds.includes(movie.id)}
          isStarred={starredIds.includes(movie.id)}
          key={movie.id}
          movie={movie}
        />
      ))}
    </div>
  )
}

Movies.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    overview: PropTypes.string,
    releaseDate: PropTypes.string,
    posterPath: PropTypes.string,
    title: PropTypes.string
  })).isRequired
}

export default Movies
