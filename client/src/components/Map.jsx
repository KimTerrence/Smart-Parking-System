// Modal.js
import React from 'react';

const Modal = ({ show, onClose }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
            <div className=" bg-white rounded-lg shadow-lg w-1/2 h-4/6 p-10 relative">
                <button
                    className="p-5 absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-4xl"
                    onClick={onClose}
                >
                    &times;
                </button>
                <div>
                    <p>Location</p>
                </div>
                <button onClick={onClose}  className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >close</button>
            </div>
        </div>
    );
};

export default Modal;
