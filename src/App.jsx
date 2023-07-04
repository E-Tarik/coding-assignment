import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import 'reactjs-popup/dist/index.css';
import { Main } from './pages/main';
import { Starred } from './pages/starred';
import { WatchLater } from './pages/watch-later';
import { Layout } from './components/Layout';
import { YoutubePlayer } from './components/YoutubePlayer';
import './app.scss';
import { api } from './api';

const App = () => {
  const [videoKey, setVideoKey] = useState();
  const [isOpen, setOpen] = useState(false);

  const closeModal = () => setOpen(false);

  const closeCard = () => {};

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

  return (
    <Layout>
      <>
        {videoKey ? (
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
