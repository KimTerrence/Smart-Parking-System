import { motion } from "framer-motion";
import bg from '../assets/bg3.jpg'

const AnimationWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 100, }}
      animate={{ opacity: 100,}}
      exit={{ opacity: 100,}}
      transition={{ duration: 1, ease: "easeOut" }}
      className="h-screen w-full"
    >
       
                
       {children}
      <motion.img 
                src={bg}
                alt="Transition"
                className="w-full h-100vh bg-black fixed z-50"
        
                initial={{ y: "-100%"  }} // Start below the screen
                animate={{ y: "0%" }}   // Slide up to cover the screen
                exit={{ y: "-100%" }}   // Slide out above the screen
                transition={{ duration: 1, ease: "easeInOut" }}
              />
    </motion.div>
    
  );
};

export default AnimationWrapper;
