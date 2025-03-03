import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, onClose, styles }) {
  const dialog = useRef();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const modal = dialog.current;

    if (!isOpen) {
      modal.showModal();
      setIsOpen(true);
    }

    return () => {
      // modal.close();
    };
  }, [isOpen]);

  return createPortal(
    <div className="fixed inset-0 bg-black/50 backdrop-blur-[1px] flex justify-center items-center z-50">
      <dialog
        className={
          styles ??
          "border-secondary border-2 rounded-[15px] shadow-sm p-8 bg-white"
        }
        ref={dialog}
        onClose={onClose}
        onCancel={onClose}
      >
        {children}
      </dialog>
    </div>,
    document.getElementById("modal")
  );
}
