import ReactPlayer from "react-player";
import Popup from "reactjs-popup";

import "../styles/movies.scss";

export const YouTubePlayerModal = ({ videoKey, isOpen, onCloseModal }) => (
  <Popup open={isOpen} closeOnDocumentClick={true} modal={true}>
    <div className="play-modal">
      <button type="button" className="close" onClick={onCloseModal}>
        &times;
      </button>
      <ReactPlayer
        className="video-player"
        url={`https://www.youtube.com/watch?v=${videoKey}`}
        controls={true}
        playing={true}
        data-testid="youtube-player"
      />
    </div>
  </Popup>
);
