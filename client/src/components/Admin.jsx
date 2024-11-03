import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Admin(){


    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
  

  
    //get and display users information
    const fetchUsers = async () => {
        try {
          const response = await axios.get('http://localhost:5000/admin');
          setUsers(response.data);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };;

      useEffect(() => {
        fetchUsers();
      }, []);
  
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
    return(
        <>
            <div>
                <p>admin</p>
                <table className='border-2 border-black table-auto text-left'>
                    <thead>
                        <tr>
                            <th className='px-10'>Id</th>
                            <th className='px-10'>Name</th>
                            <th className='px-10'>Lastname</th>
                            <th className='px-10'>Info</th>
                            <th className='px-10'>Status</th>
                        </tr>
                    </thead>
                    <tbody> 
                        {users.map((parking_users) => 
                        <tr key={parking_users.id }> 
                            <td className='px-10 py-2'>
                            {parking_users.id}
                            </td>
                            <td className='px-10'>
                            {parking_users.firstname}
                            </td>
                            <td className='px-10'>
                            {parking_users.lastname}
                            </td>
                            <td className='px-10'>
                            Info
                            </td>
                            <td className='px-10'>
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
                            <td className='px-10'>
                               {editingUser && editingUser.id === parking_users.id ? (
                                    <button onClick={handleSave}>Save</button>
                                ) : (
                                    <button onClick={() => handleEdit(parking_users)}>Edit</button>
                                )}
                            </td>
                        </tr>
                        )}
                    </tbody>
                </table>
                
            </div>
        </>
    )
}

export default Admin;