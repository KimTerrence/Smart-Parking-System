// Modal.js
import React from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
import Parking from './Parking';
import { useState , useEffect } from 'react';
import axios from 'axios';
//modal
const Modal = ({ show, onClose }) => {

    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const logOut = () => {
        navigate('/')
    }
//fetch and display current user
const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/login');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };;

  useEffect(() => {
    fetchUsers();
  }, []);


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
               
                <button onClick={logOut}  className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >Reserve</button>
            </div>
        </div>
    );
};

export default Modal;
