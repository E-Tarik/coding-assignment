import { useEffect, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';

import { fetchMovies, searchMovies as searchMoviesAction } from '../../data/moviesSlice';
import { Movie } from '../../components/Movie';
import { MoviesGrid } from '../../components/MoviesGrid';

import './main.scss';

const Main = () => {
  const movies = useSelector(state => state.movies);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');

  const onSearchMovies = useMemo(
    () => debounce(query => dispatch(searchMoviesAction({ query })), 300),
    [dispatch],
  );

  const getMovies = useCallback(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  useEffect(() => {
    if (searchQuery === null || searchQuery === '' || searchQuery === undefined) {
      getMovies();
    } else {
      onSearchMovies(searchQuery);
    }
  }, [searchQuery, getMovies, onSearchMovies]);

  return (
    <MoviesGrid data-testid="movies">
      {movies.movies.results?.map(movie => {
        return <Movie movie={movie} key={movie.id} />;
      })}
    </MoviesGrid>
  );
};

export { Main };
