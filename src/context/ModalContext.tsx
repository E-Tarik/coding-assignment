import type { FC, PropsWithChildren, ReactNode } from "react";
import { createContext, useState } from "react";

import Modal from "../components/Modal";

type ContextProps = {
  modal: ReactNode | null;
  renderModal: (el: ReactNode) => void;
  closeModal: () => void;
};

export const ModalContext = createContext<ContextProps>({
  modal: null,
  renderModal: () => {},
  closeModal: () => {},
});

const ModalProvider: FC<PropsWithChildren> = ({ children }) => {
  const [modal, setModal] = useState<ReactNode | null>(null);

  const renderModal = (el: ReactNode) => setModal(el);
  const closeModal = () => setModal(null);

  return (
    <ModalContext.Provider value={{ modal, renderModal, closeModal }}>
      {modal && <Modal modal={modal} />}
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
