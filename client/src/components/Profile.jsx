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
                {users.map((parking_users) =>
                <div key={parking_users.id}>
                    <p className='text-2xl'>Hi! {parking_users.firstname} {parking_users.lastname}</p>
                {
                    parking_users.status === "Verified" ?  <p className='text-green-500 text-sm'>{parking_users.status}</p> : <p className=''>{parking_users.status}</p> &&
                    parking_users.status === "Declined" ?  <p className='text-red-500 text-sm'>{parking_users.status}</p> : <p className=''>{parking_users.status}</p> &&
                    parking_users.status === "Admin" ?  <p className='text-blue-500 text-sm'>{parking_users.status}</p> : <p className=''>{parking_users.status}</p> &&
                    parking_users.status === "New User" ?  <p className='text-orange-500 text-sm'>{parking_users.status}</p> : <p className=''>{parking_users.status}</p>
                }
            <br />
                <div className='flex gap-10'>
                    <p className='text-lg'>Account Balance: <span className='font-bold text-'> Php {parking_users.balance} </span></p> 
                    <button className=' py-1 px-4 bg-black text-white rounded-lg'>Deposit</button>
                </div>      
            <br />
                <div>
                    <p className='text-lg'>Vehicle Info</p>
                        <table className='text-left'>
                            <tr>
                                <th>Plate Number</th>
                                <th>Type</th>
                                <th>Color</th>
                            </tr>
                            <tr>
                                <td>
                                    <input type="text" />
                                </td>
                                <td>
                                 <input type="text" />
                                </td>
                                <td>
                                 <input type="text" />  
                                </td>
                                <td>
                                    <button className='bg-black text-white px-4 rounded-lg py-1'>Edit</button>  
                                </td>
                            </tr>
                        </table>
                </div>
                    
                </div>
          
                )}
                <button onClick={logOut}  className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >Logout</button>
            </div>
        </div>
    );
};

export default Modal;
