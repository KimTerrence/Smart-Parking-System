import { motion } from "framer-motion";
import bg from '../assets/bg1.jpg'

const PageTransition = ({ imageSrc, onComplete }) => {
  return (
    <motion.div
      className="fixed inset-0 w-full h-full "
      initial={{ y: "100%" }} // Start below the screen
      animate={{ y: "0%" }}   // Slide up to cover the screen
      exit={{ y: "-100%" }}   // Slide out above the screen
      transition={{ duration: 1, ease: "easeInOut" }}
      onAnimationComplete={onComplete}
    >
    </motion.div>
  );
};

export default PageTransition;
