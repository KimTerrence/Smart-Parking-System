
import axios from 'axios';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';



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
                navigate('/main');
              } else {
                alert(response.data.message);
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
        <div className='bg-gray-50/70 p-10 rounded-lg '> 
            <form action="" onSubmit={handleLogin} className='flex flex-col  items-center  justify-center gap-10'>
                <p className='text-4xl font-extrabold'>Login</p>
                <input type="text"  placeholder='Username' value={uname} onChange={(e) => setUname(e.target.value)} className='h-16 px-5 w-80 bg-white/70 placeholder:text-black border-collapse border-gray-400 border-2 rounded-lg'/>
                <input type="password" name="" placeholder='Password' value={pw} onChange={(e) => setPw(e.target.value)} className='h-16 px-5 w-80 bg-white/70 placeholder:text-black border-collapse border-gray-400 border-2 rounded-lg'/>
                <button type='submit' className='h-12 w-24 bg-slate-50 border-black border-2 rounded-lg'>Login</button>
                <p>Dont have an account? <a href="/register" className='text-blue-800'>Register</a></p>
            </form>
        </div> 
    )
}

export default Login