
const Contact = () => {
    return (
        <div id="contact" className="h-screen w-full bg-blue-400 px-20 pt-20">
            <div className="bg-white h-full w-full px-20 flex items-center justify-center rounded-xl">
                <div className="w-1/2">
                    <form className="flex flex-col bg-blue-200 p-10 gap-5" action="">
                        <input type="email" placeholder="Email:" required className="h-10 pl-5"/>
                        <textarea name="" id="" placeholder="Message..." className="h-40 pl-5"></textarea>
                        <button className="border-2 border-black rounded-lg h-10">Send</button>
                    </form>
                </div>
                <div className="w-1/2 flex flex-col items-center justify-center p-10  text-center">
                   <p className="text-center text-2xl font-bold">Contact Us</p>
                   <p>Need to get in touch with us? Fill up the form 
                     or message us from one of the links below.
                   </p>
                   <div>
                    logo
                   </div>
                </div>
            </div>

        </div>
    )
}
export default Contact