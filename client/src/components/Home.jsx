import Background from '../assets/parking.png';
import andsvg from '../assets/android_b.svg' ;

function Home(){

    return(
      <div id='home' className=' h-screen w-full sm:p-20 px-2 py-20 pb-20 bg-blue-400 z-10'>
        <div className='h-full w-full flex flex-col-reverse sm:flex-row items-center justify-center bg-white rounded-xl'>
          <div className='px-5 sm:px-0 sm:w-1/2 sm:pl-20 flex flex-col gap-5 '>
            <h1 className='text-2xl sm:text-5xl font-bold text-center sm:text-left'>
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
              <a href='#parking' className='flex items-center bg-black text-white px-4 py-4 rounded-xl text-sm font-bold' >View Parking</a>
              <button onClick={""} className='hidden border-2 border-black px-2 py-3 rounded-xl text-sm sm:flex'>
                <img src={andsvg} alt="androis icon" />
                Android Version
              </button>
            </div>
          </div>

          <div className='sm:w-1/2 sm:pr-20 flex justify-end'>
            <img src={Background} alt="" className='h-60 sm:h-98 ease-in duration-300 hover:drop-shadow-blue-drop'/>
          </div>
      </div>
    </div>
    )
}
export default Home