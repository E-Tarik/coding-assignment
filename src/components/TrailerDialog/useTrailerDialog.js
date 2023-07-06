import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { getMovieTrailer } from '../../data/moviesSlice';
import { TrailerDialog } from '.';

const useTrailerDialog = () => {
  const [videoKey, setVideoKey] = useState(null);
  const [isOpen, setOpen] = useState(false);
  const dispatch = useDispatch();

  const closeModal = () => setOpen(false);

  const viewTrailer = useCallback(async movie => {
    const trailerKey = await dispatch(getMovieTrailer({ id: movie.id })).unwrap();

    if (trailerKey) {
      setVideoKey(trailerKey);
    }

    setOpen(true);
  }, [dispatch]);

  return {
    component: <TrailerDialog isOpen={isOpen} videoKey={videoKey} close={closeModal} />,
    viewTrailer,
  };
};

export { useTrailerDialog };
