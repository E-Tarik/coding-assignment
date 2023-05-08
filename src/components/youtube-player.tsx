import ReactPlayer from 'react-player';

type Props = {
  videoKey: string | null;
};

const YoutubePlayer = ({ videoKey }: Props) => (
  <ReactPlayer
    width='100%'
    // height='520px'
    className='video-player'
    url={`https://www.youtube.com/watch?v=${videoKey}`}
    controls={true}
    playing={true}
    data-testid='youtube-player'
  />
);

export default YoutubePlayer;
