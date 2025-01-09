// Modal.js
import React from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
import Parking from './Parking';
import { useState , useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'

//modal
const Reserve = ({ show, onClose, sensor }) => {

  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

//fetch and display current user
const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/login');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);



   var balance;
   var username;
   var plate;

   users.map((CUser) => {
    balance = CUser.balance;
    username = CUser.username;
    plate = CUser.plate_num;
   })

   const Reserve = () => {
    if(balance <= 50){
      Swal.fire({
        text: 'Not enough balance',
        icon: 'error',
        confirmButtonText: 'OK'
      })
    }else{
      handleReserve(e)
    }
   }
  const handleReserve = async (e) => {
   
    e.preventDefault();
    if(balance <= 49){
      Swal.fire({
        text: 'Not enough balance',
        icon: 'error',
        confirmButtonText: 'OK'
      }).then((result) => {
        if(result.isConfirmed){
            window.location.reload();
        }
      })
    }else{
      Swal.fire({
        text: 'Success',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then((result) => {
        if(result.isConfirmed){
            window.location.reload();
        }
      })
    try {   
        const response = await axios.post('http://localhost:5000/reserve', { //-----reserve----
        sensor, balance, username, plate,
       });
        }catch (error){
            console.error(error);
        }
      }
     
    }

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
                <div key={parking_users.id} className='h-full w-full flex items-center justify-center'>
                    {
                      
                    parking_users.status == "New User" ? <p>Your a new user! Please update more information</p> : <div></div> &&
                    parking_users.status == "Declined" ? <p className='text-center'>Your application declined <br /> Please update your information </p>  : <div></div> &&
                    parking_users.status == "Updated" ? <p className='font-bold text-2xl'>Your application is being reviewed </p> : <div></div> &&
                    parking_users.status == "Verified" ? 
                    

                    <div className='w-full h-full bg-slate-50 p-10 m-10 text-center flex flex-col items-center justify-between'>
                    <div className='flex flex-col  gap-5'>
                      <p className='text-2xl text-center font-bold'>Drivers Information</p>
                      <p>Driver: {parking_users.firstname} {parking_users.lastname}</p>
                      <p></p>
                      <p>Account Balance: Php {parking_users.balance}</p>
                      <p>Plate Number: {parking_users.plate_num}</p>  
                      <p>Car Color: {parking_users.color}</p>
                      <p>Car Type: {parking_users.type}</p>
                    </div>
                      <button onClick={handleReserve} className="mt-4 bg-black text-white px-4 py-2 rounded-md w-1/2  hover:bg-red-600"
                         >Reserve
                      </button>
                    </div>     : <div> {balance = parking_users.balance}</div>
                      
                  
                    }
                </div>
                )}
            </div>
        </div>
    );
};

export default Reserve;
