import Navbar from "./Navbar"


const Contact = () => {
    return (

        <div>
            <Navbar/>
        <div id="contact" className="h-screen w-full bg-[url('./assets/bg5.jpg')] bg-cover px-20 pt-20 pb-10">
            <div className=" h-full w-full px-20 flex items-center justify-center rounded-xl">
                
                <div className="w-1/2">
                <div className="w-full flex flex-col items-center justify-center p-10  text-center">
                   <p className="text-center text-6xl font-bold text-white">Contact Us</p>
                </div>
                    <form className="flex flex-col bg-white/100 shadow-sm shadow-white/90 rounded-lg p-10 gap-5" action="">
                        <input type="email" placeholder="Email:" required className="h-10 pl-5 placeholder-black bg-black/10"/>
                        <textarea name="" id="" placeholder="Message..." className="h-40 pl-5 placeholder-black bg-black/10"></textarea>
                        <button className=" bg-blue-800 rounded-lg text-white h-10">Send</button>
                    </form>
                </div>
              
            </div>
        </div>
        </div>
    )
}
export default Contact;