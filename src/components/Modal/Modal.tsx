import type { FC } from "react";
import { ReactNode } from "react";
import FocusTrap from "focus-trap-react";

import useModal from "../../hooks/useModal";

import "./Modal.scss";

type ModalProps = {
  modal: ReactNode;
};

const Modal: FC<ModalProps> = ({ modal }) => {
  const { modal: activeModal, closeModal } = useModal();

  return (
    <FocusTrap active={!!activeModal}>
      <div className="modal">
        <div className="modal__inner">
          <div className="modal__content">
            {modal}
            <button
              className="modal__btn"
              aria-label="Close Modal"
              onClick={closeModal}
            >
              &times;
            </button>
          </div>
        </div>
      </div>
    </FocusTrap>
  );
};

export default Modal;
