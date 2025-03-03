import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, onClose, styles = "" }) {
  const dialog = useRef();
  //TODO, PROD to do usuniecia
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const modal = dialog.current;

    //TODO, PROD to do usuniecia
    if (!isOpen) {
      modal.showModal();
      setIsOpen(true); // Ustawiamy flagę, że modal już się pokazał
    }

    return () => {
      //TODO, PROD (to nie dziala w dev przez StrictMode)
      //modal.close()
    };
  }, [isOpen]);

  return createPortal(
    <dialog
      className={styles}
      ref={dialog}
      onClose={onClose}
      onCancel={onClose}
    >
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
