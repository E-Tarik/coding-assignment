import React, { useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'
import Movie from './Movie'
import { useDispatch, useSelector } from 'react-redux'
import watchLaterSlice from '../data/watchLaterSlice'
import starredSlice from '../data/starredSlice'
import '../styles/movies.scss'

const { toggleWatchLater } = watchLaterSlice.actions
const { toggleStar } = starredSlice.actions

function Movies ({ movies, viewTrailer, closeCard }) {
  const starredList = useSelector((state) => state.starred.starredMovies)
  const watchLaterList = useSelector((state) => state.watchLater.watchLaterMovies)

  const dispatch = useDispatch()

  const starredIds = useMemo(() => starredList.map(movie => movie.id), [starredList])
  const watchLaterIds = useMemo(() => watchLaterList.map(movie => movie.id), [watchLaterList])

  const onStarClick = useCallback((movie) => {
    dispatch(toggleStar(movie))
  }, [dispatch])

  const onWatchLaterButtonClick = useCallback((movie) => {
    dispatch(toggleWatchLater(movie))
  }, [dispatch])

  return (
    <div
      className="movies-grid"
      data-testid="movies"
    >
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
  viewTrailer: PropTypes.func.isRequired
}

export default Movies
