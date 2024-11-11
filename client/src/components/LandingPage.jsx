{/*
S M A R T   P A R K I N G   S Y S T E M
Group 5 BSIT 3A = [Kim Terrence Quines, Rodary Tabasan, Guiellie Lorenzo, Jaqueline Mape, Noralyn Saludares] 
Routes File
*/}



import { useNavigate } from 'react-router-dom';
import Background from '../assets/parking.png'

function LandingPage(){
    const navigate = useNavigate();

    const handleLogin  = () => {
        navigate('/login');
    }
    const handleView  = () => {
        navigate('/register');
    }

    return(
        <div className='h-screen w-full sm:p-20 bg-blue-400 px-5 py-20'>
            <div className='flex-col-reverse h-full w-full flex items-center justify-center bg-white rounded-xl sm:flex-row'>
                <div className='px-10 sm:px-0 sm:w-1/2 sm:pl-20 flex flex-col gap-5 '>
                    <h1 className='text-2xl text-center sm:text-5xl font-bold sm:text-left'>
                        Smart Parking System
                    </h1>
                    <h2 className='sm:text-xl text-justify text-sm'>
                        "Optimize your parking experience 
                        with Smart Parking System, offering 
                        real-time space availability, seamless 
                        navigation all designed to reduce congestion 
                        and save time."
                    </h2>
                    <div className='flex gap-5 justify-center sm:justify-start'>
                        <button className='bg-black text-white px-5 py-2 rounded-xl text-sm font-bold' onClick={handleView}>Register</button>
                        <button className='border-2 border-black px-5 py-3 rounded-xl text-sm' onClick={handleLogin}>Login</button>
                    </div>
                </div>
                <div className='sm:w-1/2 sm:pr-20 flex justify-end'>
                    <img src={Background} alt="" className='h-60 sm:h-98 sm:hover:h-99 ease-in duration-300 hover:drop-shadow-blue-drop'/>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;