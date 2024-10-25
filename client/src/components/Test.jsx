import React, { useState, useEffect } from 'react';

function SensorData() {
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
        const intervalId = setInterval(fetchSensorData, 3000);
    
        // Cleanup the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []);
    
    return (
        <div>
            <h1>Latest IR Sensor Data</h1>
            {loading ? (
                <p>Loading...</p>
            ) : sensorData ? (
                <div>
                    <p>Sensor1: {sensorData.sensor1}</p>
                    <p>Sensor2: {sensorData.sensor2}</p>
                    <p>Sensor3: {sensorData.sensor3}</p>
                    <p>Sensor4: {sensorData.sensor4}</p>
                </div>
            ) : (
                <p>No sensor data available</p>
            )}
        </div>
    );
}

export default SensorData;