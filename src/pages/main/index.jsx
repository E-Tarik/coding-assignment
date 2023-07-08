import { useEffect, useMemo, useCallback, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';

import { fetchMovies, searchMovies as searchMoviesAction, MODES } from '../../data/moviesSlice';
import { Movie } from '../../components/Movie';
import { MoviesGrid } from '../../components/MoviesGrid';

import { useIntersectionObserver } from './hooks/useIntersectionObserver';
import './main.scss';

const Main = () => {
  const movies = useSelector(state => state.movies);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');

  const moviesGridBottomRef = useRef(null);

  const onSearchMovies = useMemo(
    () =>
      debounce(({ query, page }) => {
        dispatch(searchMoviesAction({ query, page }));
      }, 300),
    [dispatch],
  );

  const onDiscoverMovies = useCallback(
    ({ page }) => {
      dispatch(fetchMovies({ page }));
    },
    [dispatch],
  );

  useIntersectionObserver(moviesGridBottomRef, () =>
    movies.mode === MODES.DISCOVER
      ? onDiscoverMovies({ page: movies.page + 1 })
      : onSearchMovies({ query: searchQuery, page: movies.page + 1 }),
  );

  useEffect(() => {
    if (searchQuery === null || searchQuery === '' || searchQuery === undefined) {
      onDiscoverMovies({ page: 1 });
    } else {
      onSearchMovies({ query: searchQuery, page: 1 });
    }
  }, [searchQuery, onSearchMovies, onDiscoverMovies]);

  return (
    <>
      <MoviesGrid data-testid="movies">
        {movies.data.map(movie => (
          <Movie movie={movie} key={movie.id} />
        ))}
      </MoviesGrid>
      {movies.data.length > 0 && movies.page < movies.pages && movies.fetchStatus !== 'loading' && (
        <div ref={moviesGridBottomRef} />
      )}
    </>
  );
};

export { Main };
