import bg from '../assets/parkinglot.png';
import Reserve from '../components/Reserve'


import { useState } from 'react';

function ParkingSlot({status, slot, img, sensor}){

    const [isReserveOpen, setReserveOpen] = useState(false);

    const openReserve = () => setReserveOpen(true);
    const closeReserve = () => setReserveOpen(false);

   

    return(
        <div className ='flex flex-col items-center gap-5 text-white rounded-xl pb-10 bg-white sm:bg-black/5 shadow-sm shadow-black/40'>
            <div className="h-40 sm:h-80 w-full flex flex-col items-center justify-center gap-5 sm:gap-10">
                <p className='text-black font-bold'>Slot {slot}  </p>
                <div className='relative'>
                    <img src={bg} alt="" className='w-26 sm:w-full px-10 sm:top-12'/>
                    <img src={img} alt="" className='absolute  w-10 top-8 left-16 sm:left-4 sm:w-full  sm:px-20 sm:top-14'/>
                </div>
                <p className='text-center text-l font-bold text-black'>{status}</p>
            </div>
            {status === "Available" ? <button className='bg-blue-800 w-24 h-10 rounded-lg text-white' onClick={openReserve}>Reserve</button> : <button className='bg-blue-800/60 w-24 h-10 rounded-lg text-white'>Reserve</button>}
            
            <Reserve show={isReserveOpen} onClose={closeReserve} sensor={sensor}/>
        </div>
    )
}
export default ParkingSlot