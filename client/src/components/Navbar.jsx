import {Navigate, useNavigate} from 'react-router-dom';
import Profile from './Profile';
import Login from './Login';
import profsvg from '../assets/prof_b.svg';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Navbar()    {

    const navigate = useNavigate();
    const [isProfileOpen, setProfileOpen] = useState(false);

    const openProfile = () => setProfileOpen(true);
    const closeProfile = () => setProfileOpen(false);
    const [users, setUsers] = useState([]);

//fetch and display current user
const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/login');
      setUsers(response.data);
      if(response.data.length == 0){
        navigate('/');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };;

  useEffect(() => {
    fetchUsers();
  }, []);

   
    return(
        <div id="navbar" className="flex fixed bg-white h-16 w-full px-5 sm:px-20 flex-row items-center justify-between sm:justify-between z-20">
            <div className='w-60 flex items-center justify-start'>SPS</div>
            <nav className="text-l  gap-10 hidden sm:flex">
                <Link to= "/home"  className="px-3 py-2 hover:bg-black hover:text-white rounded-lg duration-300 ease-in">Home</Link>
                <Link to= "/parking"  className="px-3 py-2 hover:bg-black hover:text-white rounded-lg duration-300 ease-in">Parking</Link>
                <Link to= "/about"  className="px-3 py-2 hover:bg-black hover:text-white rounded-lg duration-300 ease-in">About</Link>
                <Link to= "/contact"  className="px-3 py-2 hover:bg-black hover:text-white rounded-lg duration-300 ease-in">Contact</Link>
            </nav>
            {users.map((parking_users) => 
            <div key={parking_users.id} onClick={openProfile} className='flex gap-2 cursor-pointer w-60 justify-end'>
                <img src={profsvg} alt="Profile"/>
                <p className='hidden sm:visible'>{parking_users.firstname} {parking_users.lastname}</p>
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
