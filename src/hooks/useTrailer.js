import { useState, useCallback } from 'react';
import { getMovieUrl } from '../service';

export function useTrailer(movieId) {
  const [videoKey, setVideoKey] = useState(null);

  const getMovie = useCallback(async () => {
    setVideoKey(null);
    const videoData = await fetch(getMovieUrl(movieId)).then((response) =>
      response.json()
    );

    if (videoData?.videos?.results?.length) {
      const results = videoData.videos.results;
      const videoKey =
        results.find((vid) => vid.type === 'Trailer')?.key ?? results[0].key;
      setVideoKey(videoKey);
    }
  }, [movieId]);

  return { getMovie, videoKey };
}
