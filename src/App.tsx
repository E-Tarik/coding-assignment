import 'styles/global.scss';

import { useCallback, useRef, useState } from 'react';
import {
  Routes,
  Route,
  useSearchParams,
  createSearchParams,
  useNavigate,
} from 'react-router-dom';
import debounce from 'lodash.debounce';

import { Header } from 'components';
import { TaggedPage, MoviesPage } from 'pages';
import { useAppDispatch, useMovies } from 'hooks';
import { removeAllMovies } from 'redux/slices/movies-slice';

const App = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const searchQuery = searchParams.get('search');
  const intObserver = useRef<any>(null);

  // Local states
  const [pageNum, setPageNum] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string>(searchQuery ?? '');

  const { isLoading, hasNextPage } = useMovies(pageNum, searchValue);

  const lastMovieRef = useCallback(
    (post: HTMLDivElement) => {
      if (isLoading) return;

      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((posts) => {
        if (posts[0].isIntersecting && hasNextPage) {
          setPageNum((prev) => prev + 1);
        }
      });

      if (post) intObserver.current.observe(post);
    },
    [isLoading, hasNextPage]
  );

  const handleSearch = (query: string) => {
    navigate('/');
    setPageNum(1);
    dispatch(removeAllMovies());
    setSearchValue(query);

    if (!!query) {
      setSearchParams(createSearchParams({ search: query }));
    } else {
      setSearchParams();
    }
  };

  const handleSearchWithDebounce = debounce(handleSearch, 300);

  return (
    <div className='App'>
      <Header searchMovies={handleSearchWithDebounce} />

      <div className='container'>
        <Routes>
          <Route
            path='/'
            element={
              <MoviesPage
                isLoading={isLoading}
                hasNextPage={hasNextPage}
                lastMovieRef={lastMovieRef}
              />
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
