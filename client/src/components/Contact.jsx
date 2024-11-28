
const Contact = () => {
    return (
        <div id="contact" className="h-screen w-full bg-blue-400 px-20 pt-20">
            <div className="bg-white h-full w-full px-20 flex items-center justify-center rounded-xl">
                <div className="w-1/2">
                    <form className="flex flex-col bg-black/5 shadow-sm shadow-black/40 rounded-lg p-10 gap-5" action="">
                        <input type="email" placeholder="Email:" required className="h-10 pl-5 placeholder-black" />
                        <textarea name="" id="" placeholder="Message..." className="h-40 pl-5 placeholder-black"></textarea>
                        <button className=" bg-blue-800 rounded-lg text-white h-10">Send</button>
                    </form>
                </div>
                <div className="w-1/2 flex flex-col items-center justify-center p-10  text-center">
                   <p className="text-center text-4xl font-bold">Contact Us</p>
                   <p>Need to get in touch with us? Fill up the form 
                     or message us from one of the links below.
                   </p>
                   <div>
                    
                   </div>
                </div>
            </div>

        </div>
    )
}
export default Contact