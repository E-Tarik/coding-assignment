import ReactPlayer from "react-player";
import Popup from "reactjs-popup";

export const YouTubePlayerModal = ({ videoKey, isOpen }) => (
  <Popup open={isOpen} closeOnDocumentClick={true}>
    <ReactPlayer
      className="video-player"
      url={`https://www.youtube.com/watch?v=${videoKey}`}
      controls={true}
      playing={true}
      data-testid="youtube-player"
    />
  </Popup>
);
