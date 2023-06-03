import { useDispatch, useSelector } from 'react-redux'
import starredSlice from '../../data/starredSlice'

const { starMovie, unstarMovie } = starredSlice.actions


export function StarButton({ movie }) {
  const dispatch = useDispatch()
  const isStarred = useSelector((state) => !!state.starred.starredMovies.find(({id}) => id === movie.id))

  if (isStarred) {
    return (
      <span
        className="btn-star"
        data-testid="unstar-link"
        onClick={() => dispatch(unstarMovie(movie.id))}
      >
        <i className="bi bi-star-fill" data-testid="star-fill" />
      </span>
    );
  } else {
    return (
      <span
        className="btn-star"
        data-testid="starred-link"
        onClick={() => dispatch(starMovie(movie))}
      >
        <i className="bi bi-star" />
      </span>
    );
  }
}
