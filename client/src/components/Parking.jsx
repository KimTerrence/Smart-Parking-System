import ParkingSlot from "./ParkingSlot"
import React, { useState, useEffect } from 'react';
import car from '../assets/car.png'
import Map from './Map'
import Swal from 'sweetalert2'
import Navbar from "./Navbar";
import { motion } from "framer-motion";

function Parking(){
 
// State variable to store sensor data
const [sensorData, setSensorData] = useState([]);
const [loading, setLoading] = useState(true);
const [isModalOpen, setModalOpen] = useState(false);
const [isNotifOn, setNotifOn] = useState(false);

const openModal = () => setModalOpen(true);
const closeModal = () => setModalOpen(false);

 // Fetch the sensor data when the component mounts
 useEffect(() => {
    async function fetchSensorData() {
        try {
            const response = await fetch('http://localhost:5000/latest-sensor-data');
            const data = await response.json();
            setSensorData(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching sensor data:', error);
            setLoading(false);
        }
    }


    // Fetch sensor data every 5 seconds
    const intervalId = setInterval(fetchSensorData, 2000);

    // Cleanup the interval when the component unmount
    
    return () => clearInterval(intervalId);   

    
    
}, []);



//Sensor state
if(sensorData.sensor2 == 1){ //slot1
  var status1 = "Occupied";
  var carimg1 = car;
}else if (sensorData.sensor2 == 0){
  var status1 = "Available";
  var carimg1 = "";
}
if(sensorData.sensor3 == 1){ //slot2
  var status2 = "Occupied";
  var carimg2 = car;
}else if (sensorData.sensor3 == 0){
  var status2 = "Available";
  var carimg2 = "";
}

if(sensorData.sensor4 == 1){ //slot3
  var status3 = "Occupied";
  var carimg3 = car;
}else if (sensorData.sensor4 == 0){
  var status3 = "Available";
  var carimg3 = "";
}

if(sensorData.sensor5 == 1){ //slot4
  var status4 = "Occupied";
  var carimg4 = car;
}else if (sensorData.sensor5 == 0){
  var status4 = "Available";
  var carimg4 = "";
}

    // Request permission for notifications on page load
    const onNotif = () => {
    if (Notification.permission === "default") {
      Notification.requestPermission().then(permission => {
        if (permission !== "granted") {
          console.log("Notification permission denied.");
        }
      });
    }
  }

  const offNotif = () => {
    if (Notification.permission === "granted") {
      Notification.requestPermission().then(permission => {
        //alert("To fully disable notifications, please go to your browser settings.");
         Swal.fire({
            text: 'To fully disable notifications, please go to your browser settings',
            icon: 'info',
            confirmButtonText: 'OK'
          })
      });
    }
  }

    let notificationTimeout;

    const handleVisibilityChange = () => {
      if (document.hidden ){
        if(status1 ==  "Available" || status2  == "Available" || status3 == "Available" || status4 == "Available") {
        // Delay the notification by 5 seconds
        notificationTimeout = setTimeout(() => {
          sendPushNotification();
        
        }, 5000);
      }
      } else {
        // Clear timeout if the user returns before delay ends
        clearTimeout(notificationTimeout);
      }
    };

    const sendPushNotification = () => {
        new Notification(`Beep! Beep!, Slot  available!`, {
          body: "There are slot available! Click to return.",
          icon: "/path-to-your-icon.png",
        });
    };

    handleVisibilityChange()
  
    

    return(
      <div>
<Navbar/>
     
        <div id="parking" className="  h-screen w-full flex flex-col items-center justify-center gap-10 px-2 sm:px-20 pt-20 pb-5 -top-20 bg-blue-400">
          
          <div className="bg-blue-400 sm:bg-white h-full w-full flex flex-col items-center justify-center gap-5 rounded-xl px-2 sm:px-20">
            <motion.p 
              initial={{ y: -200 }} // Start fully transparent
              animate={{ y: 0 }} // Fade in to fully visible
              transition={{ duration: 0.1 , delay: 2}} // Duration in seconds   
            className="sm:visible hidden w-5/6 sm:text-3xl font-bold text-center">Parking Slots</motion.p>
            <div className="w-full px-5 flex gap-5 ">
              <motion.button
              initial={{ y: -200 }} // Start fully transparent
              animate={{ y:  0}} // Fade in to fully visible
              transition={{ duration: 0.5 , delay: 2.5}} // Duration in seconds 
              className="px-5 py-2 border-2 border-black bg-black text-xs font-bold text-white rounded-lg sm:text-sm" onClick={openModal}>View Map</motion.button>
              <Map show={isModalOpen} onClose={closeModal}/>
              
              <motion.button
                initial={{ y: -200 }} // Start fully transparent
                animate={{ y:  0}} // Fade in to fully visible
                transition={{ duration: 0.5 , delay: 2.2}} // Duration in seconds 
               className="px-5 py-2 border-2 border-black rounded-lg text-xs font-bold sm:text-sm" onClick={Notification.permission === "granted" ? offNotif :  onNotif}>{Notification.permission === "granted" ? "Disable Notification" : "Enable Notification"}</motion.button>
            </div>
            <div className="flex w-full justify-center gap-2 sm:gap-5 items-center sm:flex flex-col sm:flex-row sm:px-5">
              <div className="flex w-full gap-2 sm:gap-5 sm:justify-end justify-center">

              <motion.div
                initial={{ opacity: 0 }} // Start fully transparent
                animate={{ opacity: 100 }} // Fade in to fully visible
                transition={{ duration: 1 , delay: 2.6}} // Duration in seconds    
              >
                  <ParkingSlot
                  slot={1}
                  status={status1}
                  img={carimg1}
                  sensor={2}
                  />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }} // Start fully transparent
                animate={{ opacity: 100 }} // Fade in to fully visible
                transition={{ duration: 1 , delay: 2.2}} // Duration in seconds    
              >
                  <ParkingSlot
                  slot={2}
                  status={status2}
                  img={carimg2}
                  sensor={3}
                  />
              </motion.div>
              
              </div>
              
              
              <div className="flex w-full gap-2 sm:gap-5 sm:justify-end justify-center">

              <motion.div
                initial={{ opacity: 0 }} // Start fully transparent
                animate={{ opacity: 100 }} // Fade in to fully visible
                transition={{ duration: 1 , delay: 2.4}} // Duration in seconds    
              >
                <ParkingSlot
                slot={3}
                status={status3}
                img={carimg3}
                sensor={4}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }} // Start fully transparent
                animate={{ opacity: 100 }} // Fade in to fully visible
                transition={{ duration: 1 , delay: 2.6}} // Duration in seconds    
              >
                <ParkingSlot
                slot={4}
                status={status4}
                img={carimg4}
                sensor={5}
                />
                 </motion.div>
              </div>
           
            </div>
            </div>
        </div>
        </div>
    )
}

export default Parking;