import { useCallback, useContext, useEffect } from "react";

import { ModalContext } from "../context/ModalContext";

const useModal = () => {
  const ctx = useContext(ModalContext);

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        ctx.closeModal();
      }
    },
    [ctx]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    if (ctx.modal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "inherit";
    }
  }, [ctx.modal]);

  return ctx;
};

export default useModal;
