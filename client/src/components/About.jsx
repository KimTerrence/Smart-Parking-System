

function About(){
    return(
        <div id="about" className="h-screen w-full bg-blue-400 px-20 pt-20 pb-5">
            <div className="h-full w-full bg-white rounded-xl flex flex-col items-center justify-center gap-5">
                <p className="text-center text-4xl font-bold">About</p>
                <div className="flex px-20">
                    <div className="w-1/2 flex flex-col gap-5">
                        <p className="text-xl font-bold">Smart Parking</p>
                        <p className="pr-20">The use of advanced technologies to improve the  efficiency and convenience of parking systems. It typically involves sensors, cameras, website, mobile apps, and data analytics to monitor parking  spaces and guide drivers to available spots in real-time. Smart parking systems can reduce traffic congestion, lower emissions, and enhance the overall parking experience.</p>
                    </div>
                    <div className="w-1/2 flex flex-col gap-5">
                        <p className="text-xl font-bold">Features</p>
                        <ul className="flex flex-col gap-2">
                            <li><span className="font-bold">Real-time availability information:</span> Drivers can see which parking spots are open via mobile  apps or website.
                            </li>
                            <li><span className="font-bold">Automated payment systems:</span> Mobile apps or contactless payment methods simplify transactions.</li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default About