import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import 'reactjs-popup/dist/index.css';
import { Main } from './pages/main';
import { Starred } from './pages/starred';
import { WatchLater } from './pages/watch-later';
import { Layout } from './components/Layout';
import { YoutubePlayer } from './components/YoutubePlayer';
import { getMovieTrailer } from './data/moviesSlice';
import './app.scss';

const App = () => {
  const [videoKey, setVideoKey] = useState();
  const [isOpen, setOpen] = useState(false);
  const dispatch = useDispatch();

  const closeModal = () => setOpen(false);

  const closeCard = () => {};

  const viewTrailer = async (movie) => {
    const trailerKey = await dispatch(getMovieTrailer({ id: movie.id })).unwrap();

    setOpen(true);

    if (trailerKey) {
      setVideoKey(trailerKey);
    }
  };

  return (
    <Layout>
      <>
        {isOpen && videoKey ? (
          <YoutubePlayer videoKey={videoKey} />
        ) : (
          <div style={{ padding: '30px' }}>
            <h6>no trailer available. Try another movie</h6>
          </div>
        )}

        <Routes>
          <Route path="/" element={<Main viewTrailer={viewTrailer} closeCard={closeCard} />} />
          <Route path="/starred" element={<Starred viewTrailer={viewTrailer} />} />
          <Route path="/watch-later" element={<WatchLater viewTrailer={viewTrailer} />} />
          <Route path="*" element={<h1 className="not-found">Page Not Found</h1>} />
        </Routes>
      </>
    </Layout>
  );
};

export default App;
