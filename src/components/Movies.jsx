import React from 'react'
import PropTypes from 'prop-types'
import Movie from './Movie'
import '../styles/movies.scss'

function Movies ({ movies, viewTrailer, closeCard, starredIds, watchLaterIds, onStarClick, onWatchLaterButtonClick }) {
  return (
    <div data-testid="movies">
      {movies.map((movie) => (
        <Movie
          closeCard={closeCard}
          isSavedToWatch={watchLaterIds.includes(movie.id)}
          isStarred={starredIds.includes(movie.id)}
          key={movie.id}
          movie={movie}
          onStarClick={onStarClick}
          onWatchLaterButtonClick={onWatchLaterButtonClick}
          viewTrailer={viewTrailer}
        />
      ))}
    </div>
  )
}

Movies.propTypes = {
  closeCard: PropTypes.func.isRequired,
  movies: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    overview: PropTypes.string,
    releaseDate: PropTypes.string,
    posterPath: PropTypes.string,
    title: PropTypes.string
  })).isRequired,
  onStarClick: PropTypes.func.isRequired,
  onWatchLaterButtonClick: PropTypes.func.isRequired,
  starredIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  viewTrailer: PropTypes.func.isRequired,
  watchLaterIds: PropTypes.arrayOf(PropTypes.number).isRequired
}

export default Movies
