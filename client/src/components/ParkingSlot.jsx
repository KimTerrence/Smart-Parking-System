import bg from '../assets/parkinglot.png';


function ParkingSlot({status, slot, img}){

    return(
        <div className ='flex flex-col items-center gap-5 text-white rounded-xl pb-10 bg-black/5 shadow-sm shadow-black/40'>
            <div className="h-40 sm:h-80 w-full flex flex-col items-center justify-center gap-5 sm:gap-10">
                <p className='text-black font-bold'>Slot {slot}  </p>
                <div className='relative'>
                    <img src={bg} alt="" className='w-26 sm:w-full px-10 sm:top-12'/>
                    <img src={img} alt="" className='absolute  w-10 top-9 left-16 sm:left-0 sm:w-full sm:px-20 sm:top-14 '/>
                </div>
                <p className='text-center text-l font-bold text-black'>{status}</p>
            </div>
            <button className='bg-black w-24 h-10 rounded-lg text-white'>Reserve</button>
        </div>
    )
}
export default ParkingSlot