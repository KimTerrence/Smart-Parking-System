
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
        <div className='bg-blue-400 p-10 rounded-lg h-screen w-full flex items-center justify-center'> 
            <form action="" onSubmit={handleLogin} className='bg-white flex flex-col  items-center  justify-center gap-10 py-10 w-4/12 rounded-xl'>
                <p className='text-4xl font-extrabold'>Login</p>
                <input type="text"  placeholder='Username' value={uname} onChange={(e) => setUname(e.target.value)} className='h-12 px-5 w-80 bg-white/70 placeholder:text-black border-collapse border-gray-400 border-2 rounded-lg'/>
                <input type="password" name="" placeholder='Password' value={pw} onChange={(e) => setPw(e.target.value)} className='h-12 px-5 w-80 bg-white/70 placeholder:text-black border-collapse border-gray-400 border-2 rounded-lg'/>
                <button type='submit' className='h-10 w-80 bg-blue-800 border-black/40 border-2 rounded-lg text-white'>Login</button>
                <p>Dont have an account? <a href="/register" className='text-blue-800'>Register</a></p>
            </form>
        </div> 
    )
}

export default Login