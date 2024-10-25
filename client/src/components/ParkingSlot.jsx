import bg from '../assets/parkinglot.png';


function ParkingSlot({status, slot, img}){

    return(
        <div className="flex flex-col items-center gap-5 text-white bg-blue-400 rounded-xl pb-10">
            <div className="h-80 w-80 flex flex-col items-center justify-center relative">
                <img src={bg} alt="" />
                <img src={img} alt="" className='absolute h-60 top-12'/>
                <p className='text-center text-xl text-black'>Slot {slot} : {status}</p>
            </div>
            <button className='bg-black w-24 h-10 rounded-lg text-white'>Reserve</button>
        </div>
    )
}
export default ParkingSlot