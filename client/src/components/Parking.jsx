import ParkingSlot from "./ParkingSlot"
import React, { useState, useEffect } from 'react';
import car from '../assets/car.png'


function Parking(){
 
// State variable to store sensor data
const [sensorData, setSensorData] = useState([]);
const [loading, setLoading] = useState(true);
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
    const intervalId = setInterval(fetchSensorData, 1000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
}, []);


if(sensorData.sensor2 == 1){ //sensor1
    var status1 = "Occupied";
    var carimg1 = car;
}else if (sensorData.sensor2 == 0){
    var status1 = "Available";
    var carimg1 = "";
}
if(sensorData.sensor3 == 1){ //senro3
    var status2 = "Occupied";
    var carimg2 = car;
}else if (sensorData.sensor3 == 0){
    var status2 = "Available";
    var carimg2 = "";
}

if(sensorData.sensor4 == 1){
    var status3 = "Occupied";
    var carimg3 = car;
}else if (sensorData.sensor4 == 0){
    var status3 = "Available";
    var carimg3 = "";
}

if(sensorData.sensor5 == 1){
    var status4 = "Occupied";
    var carimg4 = car;
}else if (sensorData.sensor5 == 0){
    var status4 = "Available";
    var carimg4 = "";
}



    return(
        <div id="parking" className="  h-screen w-full flex flex-col items-center justify-center gap-10 px-20">
            <p className="w-5/6 text-3xl font-bold text-center">Parking Slots</p>
            <div className="flex flex-row gap-12">
              <ParkingSlot
              slot={1}
              status={status1}
              img={carimg1}
              />

             <ParkingSlot
              slot={2}
              status={status2}
              img={carimg2}
              />

              <ParkingSlot
              slot={3}
              status={status3}
              img={carimg3}
              />

              <ParkingSlot
              slot={4}
              status={status4}
              img={carimg4}
              />
            </div>
        </div>
    )
}

export default Parking;