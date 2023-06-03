import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../data/moviesSlice';
import { useEffect } from 'react';
import { discoverUrl, getSearchUrl } from '../service';

export function useMovies() {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const searchQuery = searchParams.get('search');

  useEffect(() => {
    dispatch(
      fetchMovies(searchQuery ? getSearchUrl(searchQuery) : discoverUrl)
    );
  }, [dispatch, searchQuery]);

  const movies = useSelector((state) => state.movies);

  return { movies };
}
