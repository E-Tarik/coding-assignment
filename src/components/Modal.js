import ReactDOM from 'react-dom';
import '../styles/modal.scss';

export function Modal({ children, closeModal }) {
  return ReactDOM.createPortal(
    <div className="mv-modal">
      <div className="content">
        {children}
        <button className="close" onClick={closeModal}>
          &times;
        </button>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}
