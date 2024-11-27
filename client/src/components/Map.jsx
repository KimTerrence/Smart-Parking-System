// Modal.js
import React from 'react';

const Modal = ({ show, onClose }) => {
    if (!show) return null;

    return (
        <div className="w-full h-screen  fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center p-2 sm:p-0 z-50">
            <div className=" bg-white rounded-lg shadow-lg w-full sm:w-1/2 h-4/6 sm:p-10 relative">
                <button
                    className="p-5 absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-4xl"
                    onClick={onClose}
                >
                    &times;
                </button>
                <div className="flex flex-col items-center justify-between w-full h-full">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m21!1m12!1m3!1d796.512767579458!2d121.99720079279564!3d18.261562053848372!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m6!3e6!4m3!3m2!1d18.2619669!2d121.9976293!4m0!5e0!3m2!1sen!2sph!4v1730643264487!5m2!1sen!2sph"  loading="lazy" referrerPolicy="no-referrer-when-downgrade" className='h-full w-5/6'></iframe>
                </div>
            </div>
        </div>
    );
};

export default Modal;
