import { Movie, Video } from "../types/state";
import { API_KEY, ENDPOINT } from "../constants";
import axios from "axios";

export const getMovieMetadata = (movie: Movie) => {
  const { id, title, poster_path, release_date, vote_average, overview } =
    movie;
  return {
    id,
    title,
    poster_path,
    release_date: release_date?.substring(0, 4),
    vote_average,
    overview,
  };
};

export const loadTrailer = async (
  setVideoKeyCallback: (key: string | null) => void,
  movieId: number
) => {
  const URL = `${ENDPOINT}/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos`;

  setVideoKeyCallback(null);
  await axios(URL)
    .then((response) => response.data)
    .then((videoData) => {
      const { videos } = videoData;
      if (videos?.results.length) {
        const trailer = videos.results.find(
          (vid: Video) => vid.type === "Trailer"
        );
        setVideoKeyCallback(trailer ? trailer.key : videos.results[0].key);
      }
    })
    .catch((error) =>
      // todo show error message in UI
      console.log(error)
    );
};
