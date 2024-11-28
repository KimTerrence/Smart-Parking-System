//Wallet 
import { useState } from "react";
import axios from "axios";
import {Navigate, useNavigate} from 'react-router-dom';
    
const Wallet = () => {

    const [amount, setAmount] = useState('');
    const navigate = useNavigate();

  //update vehicle info
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {   
                const response = await axios.post('http://localhost:5000/deposit', { //-----vjivle----
                    amount,
                });
                alert("Deposit Sucessful"); 
                navigate('/main');
        }catch (error){
            console.error(error);
        }
    }

    return(
        <div className="w-full h-screen  fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center p-2 sm:p-0 z-50">
            <div className=" bg-white rounded-lg shadow-lg w-full sm:w-1/2  h-40 sm:p-10 flex items-center flex-col justify-center"> 
            <p className="text-2xl font-bold text-center"></p>
                <div className="flex flex-col items-center justify-between w-full h-full">
                   <form className="flex gap-10 items-center h-full" onSubmit={handleSubmit}>
                    <p className="text-lg">Input Amount</p> 
                    <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} className="bg-black/10 h-10 rounded-lg" />
                    <button className="bg-blue-400 px-2 py-2 text-white rounded-lg">Deposit</button>
                   </form>
                </div>
            </div>
        </div>
    )
}

export default Wallet;