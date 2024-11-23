// Modal.js
import React from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
import Parking from './Parking';
import { useState , useEffect } from 'react';
import axios from 'axios';
//modal
const Reserve = ({ show, onClose }) => {

    const [users, setUsers] = useState([]);
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
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50 text-black  ">
            <div className=" bg-white rounded-lg shadow-lg w-1/2 h-4/6 p-10 relative">
                <button
                    className="p-5 absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-4xl"
                    onClick={onClose}
                >
                    &times;
                </button>
               
                {users.map((parking_users) =>
                <div key={parking_users.id} className='h-full w-full'>
                    {
                    parking_users.status == "New User" ? <p>Please wait for your account to be verified</p> : <div></div> &&
                    parking_users.status == "Declined" ? <p>Youre aplication declined </p> : <div></div> &&
                    parking_users.status == "Verified" ? 
                    
                    <div className='w-full h-full bg-red-100'>

                      <button  className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                         >Reserve
                      </button>
                    </div>     : <div></div>
                    }
                </div>
                )}
            </div>
        </div>
    );
};

export default Reserve;
