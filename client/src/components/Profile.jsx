// Modal.js
import React from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
import Parking from './Parking';
import { useState , useEffect } from 'react';
import Wallet from '../components/Wallet.jsx';
import axios from 'axios';
//modal
const Modal = ({ show, onClose }) => {

    const navigate = useNavigate();
    const [plate, setPlate] = useState('');
    const [type, setType] = useState('');
    const [color, setColor] = useState('');
    const [users, setUsers] = useState([]);
    const logOut = () => {
        navigate('/')
    }
   const openWallet = () =>{
    navigate('/wallet');
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

  //update vehicle info
  const handleVehicle = async (e) => {
    e.preventDefault();
    try {   
                const response = await axios.post('http://localhost:5000/vehicle', { //-----vjivle----
                    plate,
                    type,
                    color,
                });
                alert("Update Sucessfully! Please wait to be verified"); 
                window.location.reload();
        }catch (error){
            console.error(error);
        }
    }




    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center p-2 sm:p-0 z-50">
            <div className=" bg-white rounded-lg shadow-lg w-full sm:w-1/2 h-4/6 p-10 relative flex flex-col justify-center items-center gap-10c">
                <button
                    className="p-5 absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-4xl"
                    onClick={onClose}
                >
                    &times;
                </button>
                {users.map((parking_users) =>
                <div key={parking_users.id}>
                    <p className='text-2xl'>Hi! <span className='font-bold'>{parking_users.firstname} {parking_users.lastname}</span></p>
                {
                    parking_users.status === "Verified" ?  <p className='text-green-500 text-sm'>{parking_users.status}</p> : <p className=''>{parking_users.status}</p> &&
                    parking_users.status === "Declined" ?  <p className='text-red-500 text-sm'>{parking_users.status}</p> : <p className=''>{parking_users.status}</p> &&
                    parking_users.status === "Admin" ?  <p className='text-blue-500 text-sm'>{parking_users.status}</p> : <p className=''>{parking_users.status}</p> &&
                    parking_users.status === "New User" ?  <p className='text-orange-500 text-sm'>{parking_users.status}</p> : <p className=''>{parking_users.status}</p> &&
                    parking_users.status === "Updated" ?  <p className='text-orange-500 text-sm'>{parking_users.status}</p> : <p className=''>{parking_users.status}</p>
                }
            <br />
                <div className='flex gap-10'>
                    <p className='text-lg'>Account Balance: <span className='font-bold text-'> Php {parking_users.balance} </span></p> 
                    <button className=' py-1 px-4 bg-black text-white rounded-lg'  onClick={openWallet}>Deposit</button>
                 
                </div>      
            <br />
                <div className='w-full '>
                    {users.map((parking_users) =>
                        <form key={parking_users.id} action="" onSubmit={handleVehicle}>
                            <table className='text-left'>
                                <tr className='flex gap-2 flex-row items-start'> 
                                    <th className='w-full'>Plate Number</th>
                                    <th className='w-full'>Car Color</th>
                                    <th className='w-full'>Car Type</th>
                                </tr>
                                <tr className='flex gap-2 flex-row items-center'>
                                    <td>
                                      <input type="text" className='w-full  placeholder-black/80 bg-black/10 h-10 rounded-lg' placeholder={parking_users.plate_num} value={plate} onChange={(e) => setPlate(e.target.value)}/>
                                    </td>
                                    <td>
                                      <input type="text" className='w-full placeholder-black/80 bg-black/10 h-10 rounded-lg'placeholder={parking_users.type} value={type} onChange={(e) => setType(e.target.value)}/>
                                    </td>
                                    <td>
                                      <input type="text" className='w-full  placeholder-black/80 bg-black/10 h-10 rounded-lg' placeholder={parking_users.color} value={color} onChange={(e) => setColor(e.target.value)}/>  
                                    </td>
                                    <td>
                                        <button type='submit' className='bg-black text-white px-4 rounded-lg py-1 '>Update</button>
                                    </td>
                                </tr>
                               
                                
                              
                     
                
                          
                              
                            
                      
                            </table>                   
                         </form>
                        )}  
                </div>  
                </div>
                )}
                <button onClick={logOut}  className="w-60 mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >Logout</button>
            </div>
        </div>
    );
};

export default Modal;
