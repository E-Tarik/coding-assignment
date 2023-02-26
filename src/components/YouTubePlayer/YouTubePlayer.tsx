import type { FC } from "react";
import ReactPlayer from "react-player";
import { Blocks } from "react-loader-spinner";

import { useGetMovieVideoByIdQuery } from "../../store/api/movies.api";

import "./YouTubePlayer.scss";

type YouTubePlayerProps = {
  movieId: number;
};

const YouTubePlayer: FC<YouTubePlayerProps> = ({ movieId }) => {
  const { data: trailerKey, isLoading } = useGetMovieVideoByIdQuery(movieId);

  if (isLoading) return <Blocks />;

  return (
    <ReactPlayer
      className="video-player"
      url={`https://www.youtube.com/watch?v=${trailerKey}`}
      controls={true}
      playing={true}
      data-testid="youtube-player"
    />
  );
};

export default YouTubePlayer;
