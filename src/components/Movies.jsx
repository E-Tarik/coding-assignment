import React from 'react'
import PropTypes from 'prop-types'
import Movie from './Movie'
import '../styles/movies.scss'

function Movies ({ movies, viewTrailer, closeCard }) {
  return (
    <div data-testid="movies">
      {movies.movies.results?.map?.((movie) => {
        return (
          <Movie
            closeCard={closeCard}
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
        id: PropTypes.string,
        overview: PropTypes.string,
        release_date: PropTypes.string,
        poster_path: PropTypes.string,
        title: PropTypes.string
      }))
    })
  }),
  viewTrailer: PropTypes.func.isRequired
}

Movies.defaultProps = {
  movies: {
    movies: {}
  }
}

export default Movies
