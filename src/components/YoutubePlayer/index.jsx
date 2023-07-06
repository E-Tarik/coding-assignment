import ReactPlayer from 'react-player/lazy';

const YoutubePlayer = ({ videoKey }) => (
  <ReactPlayer
    className="video-player"
    url={`https://www.youtube.com/watch?v=${videoKey}`}
    controls={true}
    playing={true}
    data-testid="youtube-player"
  />
);

export { YoutubePlayer };
