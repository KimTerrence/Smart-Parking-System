import React, { useState, useEffect } from 'react';
import axios from 'axios';
import delete_svg from '../assets/delete_b.svg';
import Message from './Message';

function Admin(){


    const [users, setUsers] = useState([]);
    const [history, setHistory] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
  

  
    //get and display users information
    const fetchUsers = async () => {
        try {
          const response = await axios.get('http://localhost:5000/admin');
          setUsers(response.data);
          if(response.data.length == 0){
            navigate('/');
          }
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };;

      const recentUsers = async () => {
        try {
          const response = await axios.get('http://localhost:5000/recentReserve');
            setHistory(response.data);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };;

      useEffect(() => {
        fetchUsers();
        recentUsers();
      }, []);
  

    // edit user
    const handleEdit = (parking_users) => {
    setEditingUser(parking_users);
    };

    const handleSave = () => {
        axios.put(`http://localhost:5000/admin/${editingUser.id}`, {
            status: editingUser.status,
        })
        .then((response) => {
            setUsers(users.map(u => u.id === editingUser.id ? editingUser : u));
            setEditingUser(null);
        })
        .catch((error) => console.error("Error updating data:", error));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditingUser((prevUser) => ({ ...prevUser, [name]: value }));
    };

    //delete user
    const handleDelete = async (id) => {
        try {
          await axios.delete(`http://localhost:5000/delete/${id}`);
          alert('Data deleted successfully');
        fetchUsers()
        } catch (error) {
          console.error('There was an error deleting the data!', error);
        }
      };

    return(
        <>
            <div className='flex  flex-col items-center justify-center bg-gray-300 h-screen w-full'>
               
                <div className='p-5 bg-white flex flex-col rounded-lg items-center justify-center shadow-lg'>

                    <nav className='flex gap-10 py-5 w-100'>
                    <p className='text-4xl'>Admin Dashboard</p>
                    {
                        //  <Message/> 
                      }
                    </nav>

                    <div className='h-10 flex flex-row w-full justify-between items-end p-1'>
                      <p className='text-l p-0 m-0'>Users</p>
                      <a href="./" className='className="w-60 mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600'>Logout</a>
                    </div>
                    <div className='h-60 overflow-auto  ' >
                        <table className='shadow bg-slate-50 table-auto text-left h-10 w-full  text-sm overflow-auto '>
                            <thead className='bg-black text-white  w-full'> 
                                <tr>
                                    <th className='sm:px-10'>Id</th>
                                    <th className='sm:px-10'>Name</th>
                                    <th className='sm:px-10'>Lastname</th>
                                    <th className='sm:px-10'>Plate</th>
                                    <th className='sm:px-10'>Type</th>
                                    <th className='sm:px-10'>Color</th>
                                    <th className='sm:px-10'>Status</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody> 
                                {users.map((parking_users) => 
                                <tr key={parking_users.id } className='shadow'> 
                                    <td className='sm:px-10 py-2'>
                                    {parking_users.id}
                                    </td>
                                    <td className='sm:px-10 py-2'>
                                    {parking_users.firstname}
                                    </td>
                                    <td className='sm:px-10 py-2'>
                                    {parking_users.lastname}
                                    </td>
                                    <td className='sm:px-10 py-2'>
                                    {parking_users.plate_num}
                                    </td>
                                    <td className='sm:px-10 py-2'>
                                    {parking_users.type}
                                    </td>
                                    <td className='sm:px-10 py-2'>
                                    {parking_users.color}
                                    </td>
                                    <td className='sm:px-10 py-2'>
                                    {editingUser && editingUser.id === parking_users.id ? (
                                            <select name="status" onChange={handleChange}>
                                            <option value="">{parking_users.status}</option>
                                            <option value="Verified">Verify</option>
                                            <option value="Declined">Decline</option>
                                            <option value="Admin">Admin</option>
                                        </select>
                                        
                                        ) : (
                                        
                                            parking_users.status === "Verified" ?  <p className='text-green-500'>{parking_users.status}</p> : <p className=''>{parking_users.status}</p> &&
                                            parking_users.status === "Declined" ?  <p className='text-red-500'>{parking_users.status}</p> : <p className=''>{parking_users.status}</p> &&
                                            parking_users.status === "Admin" ?  <p className='text-blue-500'>{parking_users.status}</p> : <p className=''>{parking_users.status}</p> &&
                                            parking_users.status === "New User" ?  <p className='text-orange-500'>{parking_users.status}</p> : <p className=''>{parking_users.status}</p>

                                            
                                        )}
                                    </td>   
                                    <td className='sm:px-10'>
                                    {editingUser && editingUser.id === parking_users.id ? (
                                            <button onClick={handleSave} className='bg-blue-800 w-20 py-2 rounded m-1 text-white'>Save</button>
                                        ) : (
                                            <button onClick={() => handleEdit(parking_users)} className='bg-red-600 w-20 py-2 rounded m-1 text-white'>Edit</button>
                                        )}
                                    </td>
                                {/* <td className='sm:px-10'>
                                        <button className='flex items-center justify-center w-5' onClick={() => handleDelete(parking_users.id)}>
                                            <img src={delete_svg} alt=""/>
                                        </button>
                                    </td>*/}
                                </tr>
                                )}
                            </tbody>    
                        </table>
                    </div>
{/*  ---recent reserve user----  */}
                    <div className='h-10 flex flex-row w-full justify-between items-end p-1'>
                        <p>Recent Parking Slot User</p>
                    </div>
                    <div className='w-full h-72 overflow-auto  shadow' >
                        <table className='shadow bg-slate-50  text-left w-full sm:w-full text-sm overflow-auto'>
                            <thead className='bg-black text-white w-full' > 
                                <tr className=''>
                                    <th className='sm:px-10'>Firtsname</th>
                                    <th className='sm:px-10'>Lastname</th>
                                    <th className='sm:px-10'>Plate</th>
                                    <th className='sm:px-10'>Slot </th>
                                    <th className='sm:px-10'>Date</th>
                                </tr>
                            </thead>
                            <tbody> 
                                {history.map((history) => 
                                <tr key={history.id } className='shadow'> 
                                    <td className='sm:px-10 py-2'>
                                    {history.firstname}
                                    </td>
                                    <td className='sm:px-10 py-2'>
                                    {history.lastname}
                                    </td>
                                    <td className='sm:px-10 py-2'>
                                    {history.plate}
                                    </td>
                                    <td className='sm:px-10 py-2'>
                                    {history.slot}
                                    </td>
                                    <td className='sm:px-10 py-2'>
                                    {history.created_at}
                                    </td>
                                    
                                </tr>
                                )}
                            </tbody>    
                        </table>
                  </div>
                </div>
            </div>
        </>
    )
}

export default Admin;