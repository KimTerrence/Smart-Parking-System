import Background from '../assets/parking.png';
import andsvg from '../assets/android_b.svg' ;

function Home(){

    return(
      <div id='home' className=' h-90vh w-full p-20 pb-4 bg-blue-400 z-10'>
        <div className='h-full w-full flex items-center justify-center bg-white rounded-xl'>
          <div className='w-1/2 pl-20 flex flex-col gap-5 '>
            <h1 className='text-5xl font-bold'>
                    Smart Parking System
            </h1>
            <h2 className='text-xl text-justify'>
                    "Optimize your parking experience 
                    with Smart Parking System, offering 
                    real-time space availability, seamless 
                    navigation all designed to reduce congestion 
                    and save time."
            </h2>
            <div className='flex gap-5'>
              <a href='#parking' className='bg-black text-white px-5 py-3 border-2 border-black rounded-xl hover:bg-white hover:text-black ease-in duration-200 text-sm font-bold' >View Parking</a>
              <button onClick={""} className='border-2 px-5 py-3 rounded-xl border-black text-sm flex gap-2'>
                <img src={andsvg} alt="androis icon" />
                Android Version
              </button>
            </div>
          </div>

          <div className='w-1/2 pr-20 flex justify-end'>
            <img src={Background} alt="" className='h-98 hover:h-99 ease-in duration-300 hover:drop-shadow-blue-drop'/>
          </div>
      </div>
    </div>
    )
}
export default Home