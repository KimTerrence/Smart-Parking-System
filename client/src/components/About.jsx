import caimg from '../assets/free.jpeg';
import Navbar from './Navbar';
import { motion } from 'framer-motion';

function About(){
    return(
        <div>
            <Navbar/>
        <div id="about" className="h-screen w-full bg-[url('./assets/bg4.jpg')] bg-cover sm:px-20 sm:pt-20 pb-5">
            <div className="h-full w-full rounded-xl flex flex-col items-center justify-center gap-5">
                <div className="flex sm:px-0 justify-between">
                    <motion.div
                      initial={{ opacity: 0 }} 
                      animate={{ opacity:  100}} 
                      transition={{ duration: 1 , delay: 1.8    }} 
                      className="w-1/2 flex items-center justify-center">
                        <img src={caimg} alt="" className='w-100'/>
                    </motion.div>
                    <motion.div 
                    initial={{ x: -1000 }} 
                    animate={{ x:  0}} 
                    transition={{ duration: 1 , delay: 1}} 
                    className="w-1/2 flex flex-col gap-3 justify-center text-justify text-white">
                        <p className="text-6xl font-bold">Smart Parking</p>
                        <p className="pr-20 text-xl">The use of advanced technologies to improve the  efficiency and convenience of parking systems. It typically involves sensors, cameras, website, mobile apps, and data analytics to monitor parking  spaces and guide drivers to available spots in real-time. Smart parking systems can reduce traffic congestion, lower emissions, and enhance the overall parking experience.</p>
                        <p className="text-4xl font-bold">Features</p>
                        <ul className="pr-20 flex flex-col gap-2">
                            <li className='text-xl'><span className="font-bold ">Real-time availability information:</span> Drivers can see which parking spots are open via mobile  apps or website.
                            </li>
                            <li className='text-xl'><span className="font-bold">Automated payment systems:</span> Mobile apps or contactless payment methods simplify transactions.</li>
                        </ul>
                    </motion.div>
                </div>

            </div>
        </div>
        </div>
    )
}
export default About;