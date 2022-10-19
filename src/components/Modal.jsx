import React from "react";
import { createPortal } from "react-dom";
import { VscChromeClose } from "react-icons/vsc";

const Modal = ({ openModal, setOpenModal, children, title, width }) => {
  if (!openModal) {
    return null;
  }

  const closeModal = () => {
    setOpenModal(false);
  };

  return createPortal(
    // modal overlay
    <div className="centerXY modal transition" onClick={closeModal}>
      {/* modal body */}
      <div
        className="h-fit rounded-xl card opacity-100"
        style={{ width: width }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* modals header */}
        <header className="border-b border-blue-100 flex justify-between p-3">
          <h1 className="text-xl mx-auto text-white font-bold uppercase">{title}</h1>
          <button
            className="w-[30px] h-[30px] rounded-full hover:bg-gray-600 bg-gray-400 centerXY
            text-white buble"
            onClick={closeModal}
          >
            {<VscChromeClose className="text-xl" />}
          </button>
        </header>
        <div className="modalBody mt-5">{children}</div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;
