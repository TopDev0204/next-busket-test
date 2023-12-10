import React from "react";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ onClose, children, title }) => {
  const handleCloseClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div
        className="bg-white p-4 rounded shadow-lg relative"
        style={{ width: "502px" }}
      >
        <div className="absolute top-0 right-0 p-4">
          <button
            onClick={handleCloseClick}
            className="text-black hover:text-gray-700"
          >
            X
          </button>
        </div>
        {title && (
          <h1 className="font-rubik text-md font-medium leading-[21.33px] text-left text-darkGray">
            {title}
          </h1>
        )}
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
