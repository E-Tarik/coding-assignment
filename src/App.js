import { useEffect, useState } from 'react';
import {
  Routes,
  Route,
  createSearchParams,
  useSearchParams,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import 'reactjs-popup/dist/index.css';
import { fetchMovies, searchMovies as searchMoviesAction } from './data/moviesSlice';
import { Movies } from './pages/main';
import { Starred } from './pages/starred';
import { WatchLater } from './pages/watch-later';
import { Layout } from './components/Layout';
import { YoutubePlayer } from './components/YoutubePlayer';
import './app.scss';
import { api } from './api';

const App = () => {
  const state = useSelector(state => state);
  const { movies } = state;
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');
  const [videoKey, setVideoKey] = useState();
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const closeModal = () => setOpen(false);

  const closeCard = () => {};

  const getSearchResults = query => {
    if (query !== '') {
      dispatch(searchMoviesAction({ query }));
      setSearchParams(createSearchParams({ search: query }));
    } else {
      dispatch(fetchMovies());
      setSearchParams();
    }
  };

  const searchMovies = query => {
    if (location.pathname !== '/') {
      navigate('/');
    }

    getSearchResults(query);
  };

  const getMovies = () => {
    if (searchQuery) {
      dispatch(searchMoviesAction({ searchQuery }));
    } else {
      dispatch(fetchMovies());
    }
  };

  const viewTrailer = movie => {
    getMovie(movie.id);
    if (!videoKey) setOpen(true);
    setOpen(true);
  };

  const getMovie = async id => {
    setVideoKey(null);
    const videoData = await api.movies.movieDetails({ movieId: id });

    if (videoData.videos && videoData.videos.results.length) {
      const trailer = videoData.videos.results.find(vid => vid.type === 'Trailer');
      setVideoKey(trailer ? trailer.key : videoData.videos.results[0].key);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <Layout
      searchMovies={searchMovies}
      searchParams={searchParams}
      setSearchParams={setSearchParams}
    >
      <>
        {videoKey ? (
          <YoutubePlayer videoKey={videoKey} />
        ) : (
          <div style={{ padding: '30px' }}>
            <h6>no trailer available. Try another movie</h6>
          </div>
        )}

        <Routes>
          <Route
            path="/"
            element={<Movies movies={movies} viewTrailer={viewTrailer} closeCard={closeCard} />}
          />
          <Route path="/starred" element={<Starred viewTrailer={viewTrailer} />} />
          <Route path="/watch-later" element={<WatchLater viewTrailer={viewTrailer} />} />
          <Route path="*" element={<h1 className="not-found">Page Not Found</h1>} />
        </Routes>
      </>
    </Layout>
  );
};

export default App;
