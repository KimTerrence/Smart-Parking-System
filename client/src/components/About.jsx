import caimg from '../assets/free.jpeg';
import Navbar from './Navbar';

function About(){
    return(
        <div id="about" className="h-screen w-full bg-blue-400 sm:px-20 sm:pt-20 pb-5">
            <div className="h-full w-full bg-white rounded-xl flex flex-col items-center justify-center gap-5">
                <div className="flex sm:px-20">
                    <div className="w-1/2 flex flex-col gap-3">
                        <p className="text-4xl font-bold">Smart Parking</p>
                        <p className="pr-20">The use of advanced technologies to improve the  efficiency and convenience of parking systems. It typically involves sensors, cameras, website, mobile apps, and data analytics to monitor parking  spaces and guide drivers to available spots in real-time. Smart parking systems can reduce traffic congestion, lower emissions, and enhance the overall parking experience.</p>
                        <p className="text-2xl font-bold">Features</p>
                        <ul className="flex flex-col gap-2">
                            <li><span className="font-bold">Real-time availability information:</span> Drivers can see which parking spots are open via mobile  apps or website.
                            </li>
                            <li><span className="font-bold">Automated payment systems:</span> Mobile apps or contactless payment methods simplify transactions.</li>
                        </ul>
                    </div>
                    <div className="w-1/2 flex items-center justify-center">
                        <img src={caimg} alt="" className='w-96'/>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default About;