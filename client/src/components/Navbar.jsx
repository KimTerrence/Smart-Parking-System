import {useNavigate} from 'react-router-dom';
import Profile from './Profile';
import { useState } from 'react';

function Navbar()    {
    const navigate = useNavigate();
    const [isProfileOpen, setProfileOpen] = useState(false);

    const openProfile = () => setProfileOpen(true);
    const closeProfile = () => setProfileOpen(false);



    const handleUser = () => {
        navigate('/')
    }
    return(
        <div id="navbar" className="fixed bg-white h-16 w-full px-20 flex flex-row items-center justify-between z-20">
            <p>logo</p>
            <nav className="text-l flex gap-10">
                <a href="#home" className="px-3 py-2 hover:bg-black hover:text-white rounded-lg duration-300 ease-in">Home</a>
                <a href="#parking" className="px-3 py-2 hover:bg-black hover:text-white rounded-lg duration-300 ease-in">Parking</a>
                <a href="#about" className="px-3 py-2 hover:bg-black hover:text-white rounded-lg duration-300 ease-in">About</a>
                <a href="#contact" className="px-3 py-2 hover:bg-black hover:text-white rounded-lg duration-300 ease-in">Contact</a>
            </nav>
            <p onClick={openProfile}>Log out</p>
            <Profile show={isProfileOpen} onClose={closeProfile} />
        </div>
    )
}
export default Navbar
