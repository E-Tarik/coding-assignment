import ReactPlayer from 'react-player';

export const YouTubePlayer = ({ videoKey }) => (
	<ReactPlayer
		width="100%"
		className="video-player"
		url={`https://www.youtube.com/watch?v=${videoKey}`}
		controls={true}
		playing={true}
		data-testid="youtube-player"
	/>
);
