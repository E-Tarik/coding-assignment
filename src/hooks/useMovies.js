import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../data/moviesSlice';
import { useEffect, useRef } from 'react';
import { getDiscoverURl, getSearchUrl } from '../service';

export function useMovies(page) {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const initialRender = useRef(true);

  const searchQuery = searchParams.get('search');

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false
    } else {
      dispatch(
        fetchMovies(
          searchQuery
            ? { apiUrl: getSearchUrl(searchQuery), append: false }
            : { apiUrl: getDiscoverURl(page), append: true }
        )
      );
    }
  }, [dispatch, page, searchQuery]);

  const movies = useSelector((state) => state.movies);

  return { movies, isSearchMode: !!searchQuery };
}
