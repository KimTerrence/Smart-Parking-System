import {useNavigate} from 'react-router-dom';
import Profile from './Profile';
import Login from './Login';
import profsvg from '../assets/prof_b.svg';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Navbar()    {

    const [isProfileOpen, setProfileOpen] = useState(false);

    const openProfile = () => setProfileOpen(true);
    const closeProfile = () => setProfileOpen(false);
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

   
    return(
        <div id="navbar" className="fixed bg-white h-16 w-full px-20 flex flex-row items-center justify-between z-20">
            <div className='w-60'>logo</div>
            <nav className="text-l flex gap-10">
                <a href="#home" className="px-3 py-2 hover:bg-black hover:text-white rounded-lg duration-300 ease-in">Home</a>
                <a href="#parking" className="px-3 py-2 hover:bg-black hover:text-white rounded-lg duration-300 ease-in">Parking</a>
                <a href="#about" className="px-3 py-2 hover:bg-black hover:text-white rounded-lg duration-300 ease-in">About</a>
                <a href="#contact" className="px-3 py-2 hover:bg-black hover:text-white rounded-lg duration-300 ease-in">Contact</a>
            </nav>
            {users.map((parking_users) => 
            <div key={parking_users.id} onClick={openProfile} className='flex gap-2 cursor-pointer w-60 justify-end'>
                <img src={profsvg} alt="Profile"/>
                <p>{parking_users.firstname} {parking_users.lastname}</p>
            </div>
            )}
{
    //-----profile pop up
}
            <Profile show={isProfileOpen} onClose={closeProfile} />
        </div>
    )
}
export default Navbar
