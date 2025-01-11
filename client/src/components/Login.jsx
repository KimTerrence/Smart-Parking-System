
import axios from 'axios';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2'



function Login(){
    const [uname, setUname] = useState('');
    const [pw, setPw] = useState('');
    const navigate = useNavigate();
   


const handleLogin = async (e) => {
    e.preventDefault();

    try{
      const response = await axios.post('http://localhost:5000/admin-login', { //-----login as admin-----
          uname, pw,
      });
      console.log(response.data);
      if (response.data.code === 200) {
          navigate('/admin');
        } else {
          try{
            const response = await axios.post('http://localhost:5000/login', { //-----login as user-----
                uname, pw,
            });
            console.log(response.data);
            if (response.data.code === 200) {
                navigate('/home');
              } else {
               //  alert(response.data.message);
              Swal.fire({
                text: response.data.message,
                icon: 'error',
                confirmButtonText: 'OK  '
              })
            }
            } catch (error) {
              console.error(error);
            }
        }
      } catch (error) {
        console.error(error);
      }
      
    }
    return(
        <div className="bg-[url('./assets/bg1.jpg')] sm:py-10 h-screen w-full flex items-center justify-center p-6"> 
            <form action="" onSubmit={handleLogin} className='bg-white flex flex-col  items-center  justify-center w-full sm:gap-5 gap-5 py-10 px-6 sm:w-4/12 rounded-xl'>
                <p className='text-4xl font-extrabold'>Login</p>
                <input type="text"  placeholder='Username' value={uname} onChange={(e) => setUname(e.target.value)} className='h-12 px-5 w-full sm:w-80 bg-white/70 placeholder:text-black border-collapse border-gray-400 border-2 rounded-lg text-sm'/>
                <input type="password" name="" placeholder='Password' value={pw} onChange={(e) => setPw(e.target.value)} className='h-12 px-5 w-full sm:w-80 bg-white/70 placeholder:text-black border-collapse border-gray-400 border-2 rounded-lg text-sm'/>
                <button type='submit' className='h-10 w-full sm:w-80 bg-blue-800 border-black/40 border-2 rounded-lg text-white'>Login</button>
                <p>Dont have an account? <a href="/register" className='text-blue-800'>Register</a></p>
            </form>
        </div> 
    )
}

export default Login