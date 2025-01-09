
import axios from 'axios';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2'


function Register(){
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [uname, setUname] = useState('');
    const [pw, setPw] = useState('');
    const [cpw, setCpw] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {   
            if(fname.length !== 0 && lname.length !== 0 && uname.length !== 0 && pw.length !== 0){
                if(pw == cpw){
                    const response = await axios.post('http://localhost:5000/register', { //-----host-----
                        fname,
                        lname,
                        uname,
                        pw,
                    });
                    if(response.data.code === 201){
                        Swal.fire({
                            text: response.data.message,
                            icon: 'success',
                            confirmButtonText: 'OK'
                          })
                        navigate('/');
                    
                    }else {
                        alert(response.data.message);
                    }
                }else{
                     Swal.fire({
                        text: 'Password did not match',
                        icon: 'error',
                        confirmButtonText: 'OK'
                      })
                }
            }else{
                Swal.fire({
                    text: 'Field must not be empty',
                    icon: 'warning',
                    confirmButtonText: 'OK'
                  })
            }   
            }catch (error){
                console.error(error);
            }
        }
    return(
        <div className='flex h-screen w-full items-center justify-center bg-blue-400 p-5 sm:p-0'>
            <form action="" onSubmit={handleRegister} className='h-5/6 w-full sm:w-4/12 flex flex-col items-center justify-center border-2 gap-5 sm:p-10 sm:px-20 py-10 px-6 bg-white rounded-lg'>
                <p className='text-4xl font-extrabold'>Register</p>
                <input type="text" placeholder="Firstname" value={fname} onChange={(e) => setFname(e.target.value)} className='h-12 w-full border-2 px-5 rounded-lg text-sm placeholder:text-black'/>
                <input type="text" placeholder="Lastname" value={lname} onChange={(e) => setLname(e.target.value)} className='h-12 w-full border-2 px-5 rounded-lg text-sm placeholder:text-black'/>
                <input type="text"  placeholder="Username" value={uname} onChange={(e) => setUname(e.target.value)} className='h-12 w-full border-2 px-5 rounded-lg text-sm placeholder:text-black'/>
                <input type="password" placeholder="Password" value={pw} onChange={(e) => setPw(e.target.value)} className='h-12 w-full border-2 px-5 rounded-lg text-sm placeholder:text-black'/>
                <input type="password" placeholder="Confirm Password" value={cpw} onChange={(e) => setCpw(e.target.value)} className='h-12 w-full border-2 px-5 rounded-lg text-sm placeholder:text-black'/>
                <button type='submit'className='h-10 w-full bg-blue-800 border-black/40 border-2 rounded-lg text-white'>Register</button>
                <p>Already have an account? <a href="/" className='text-blue-800'>Login</a></p>
            </form>
        </div>
    )
}

export default Register