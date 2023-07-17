import debounce from 'lodash.debounce'
import { useDispatch } from 'react-redux'

import { fetchMovies, searchMovies } from '../data/moviesSlice'

export const useMovies = () => {
  const dispatch = useDispatch()

  const loadMovies = debounce((page, search) => {
    if (search) {
      dispatch(searchMovies({ page, search }))
      return
    }
    dispatch(fetchMovies({ page }))
  }, 400)

  return { loadMovies }
}
