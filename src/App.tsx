import { useCallback, useEffect, useRef } from 'react';
import {
  Routes,
  Route,
  createSearchParams,
  useSearchParams,
  useNavigate,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';

import moviesSlice, { fetchMovies } from 'redux/movies-slice';
import { ENDPOINT_SEARCH, ENDPOINT_DISCOVER } from './constants';
import { Header, Spinner } from 'components';
import { MoviesPage, TaggedPage } from 'pages';
import { StoreModel } from 'models';

import './styles/global.scss';

const App = () => {
  let currPage = 1;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const observer = useRef<any>(null);

  const state = useSelector((state: StoreModel) => state);
  const { removeAllMovies } = moviesSlice.actions;
  const { movies } = state;

  const searchQuery = searchParams.get('search');

  useEffect(() => {
    handleGetMovies();
  }, []);

  const handleGetMovies = () => {
    if (searchQuery) {
      dispatch(
        fetchMovies(
          `${ENDPOINT_SEARCH}&query=${searchQuery}&page=${currPage}`
        ) as any
      );
    } else {
      dispatch(fetchMovies(`${ENDPOINT_DISCOVER}&page=${currPage}`) as any);
    }
  };

  const handleSearchMovies = (query: string) => {
    navigate('/');

    if (!query) {
      setSearchParams();
      dispatch(removeAllMovies());
      dispatch(fetchMovies(`${ENDPOINT_DISCOVER}&page=1`) as any);
    } else {
      setSearchParams(createSearchParams({ search: query }));
      dispatch(removeAllMovies());
      dispatch(fetchMovies(`${ENDPOINT_SEARCH}&query=${query}&page=1`) as any);
    }

    currPage = 1;
  };

  const handleSearchWithDebounce = useCallback(
    debounce(handleSearchMovies, 300),
    []
  );

  const handleLoadMoreMovie = useCallback((node: HTMLDivElement) => {
    if (!node) return;
    if (movies.fetchStatus === 'loading') return;
    if (observer.current) observer?.current?.disconnect();

    observer!.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        handleGetMovies();
        currPage++;
      }
    });

    observer?.current.observe(node);
  }, []);

  return (
    <div className='App'>
      <Header searchMovies={handleSearchWithDebounce} />

      <div className='container'>
        <Routes>
          <Route
            path='/'
            element={
              <>
                <MoviesPage movies={movies} />

                {movies.fetchStatus !== 'loading' && (
                  <div ref={handleLoadMoreMovie}></div>
                )}

                <div style={{ height: '200px' }}>
                  {movies.fetchStatus === 'loading' && <Spinner />}
                </div>
              </>
            }
          />
          <Route path='/starred' element={<TaggedPage pageType='starred' />} />
          <Route
            path='/watch-later'
            element={<TaggedPage pageType='watch-later' />}
          />
          <Route
            path='*'
            element={<h1 className='not-found'>Page Not Found</h1>}
          />
        </Routes>
      </div>

      <div id='modal-root'></div>
    </div>
  );
};

export default App;
