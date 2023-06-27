import React from 'react'
import PropTypes from 'prop-types'
import Movie from './Movie'
import '../styles/movies.scss'

function Movies ({ movies, viewTrailer, closeCard, starredIds, watchLaterIds }) {
  return (
    <div data-testid="movies">
      {movies.movies.results?.map?.((movie) => {
        const isStarred = starredIds.includes(movie.id)
        const isSavedToWatchLater = watchLaterIds.includes(movie.id)
        return (
          <Movie
            closeCard={closeCard}
            isSavedToWatchLater={isSavedToWatchLater}
            isStarred={isStarred}
            key={movie.id}
            movie={movie}
            viewTrailer={viewTrailer}
          />
        )
      })}
    </div>
  )
}

Movies.propTypes = {
  closeCard: PropTypes.func.isRequired,
  movies: PropTypes.shape({
    movies: PropTypes.shape({
      results: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        overview: PropTypes.string,
        release_date: PropTypes.string,
        poster_path: PropTypes.string,
        title: PropTypes.string
      }))
    })
  }),
  starredIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  viewTrailer: PropTypes.func.isRequired,
  watchLaterIds: PropTypes.arrayOf(PropTypes.number).isRequired
}

Movies.defaultProps = {
  movies: {
    movies: {}
  }
}

export default Movies
