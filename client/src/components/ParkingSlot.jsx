import bg from '../assets/parkinglot.png';


function ParkingSlot({status, slot, img}){

    return(
        <div className ='flex flex-col items-center gap-5 text-white rounded-xl pb-10 bg-black/5 shadow-sm shadow-black/40'>
            <div className="h-40 sm:h-80 w-full flex flex-col items-center justify-center relative">
                <p className='text-black font-bold'>Slot {slot}  </p>
                <img src={bg} alt="" className='h-26 sm:h-60 sm:top-12'/>
                <img src={img} alt="" className='absolute h-26 top-7 sm:h-60 sm:top-14 left-3'/>
                <p className='text-center text-l font-bold text-black'>{status}</p>
            </div>
            <button className='bg-black w-24 h-10 rounded-lg text-white'>Reserve</button>
        </div>
    )
}
export default ParkingSlot