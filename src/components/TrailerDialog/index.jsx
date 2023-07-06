import { Modal } from '../Modal';
import { YoutubePlayer } from '../YoutubePlayer';

import s from './TrailerDialog.module.scss';

const TrailerDialog = ({ isOpen, close, videoKey }) => (
  <Modal isOpen={isOpen} onClose={close}>
    {videoKey ? (
      <YoutubePlayer videoKey={videoKey} />
    ) : (
      <div className={s.errorMessage}>
        <h6>No trailer available. Try another movie</h6>
      </div>
    )}
  </Modal>
);

export { TrailerDialog };
