const express = require('express'); //express js
const cors = require('cors');   
const bodyParser = require('body-parser'); 
const mysql = require('mysql2'); //mysql database
const WebSocket = require('ws'); //websocket
const http = require('http');
const { Server } = require('socket.io');


const app = express();
app.use(cors());

//app.use(express.json()); // To parse JSON bodies
const port = 5000 ;


app.use(cors());
app.use(bodyParser.json());


app.use(cors({
  origin: 'http://localhost:5173' // Allow requests from React app
}));


//-----database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'smart_parking'
}); 

db.connect(err => {
  if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
  }
  console.log('Connected to MySQL');
});


//-----Register
app.post('/register', (req, res) => {
    const {fname, lname, uname, pw} = req.body;
    db.query(`insert into parking_users(firstname, lastname, username, password) values ( "${fname}", "${lname}" ,"${uname}", "${pw}")`,
        (err) => {
            if (err) {
              return res.json({ code: 500, message: 'Error registering user' });
            }
            return res.json({ code: 201, message: 'User registered successfully' });
          }
        );
      });


//-----Login
app.post('/login', (req, res) => {
    const { uname , pw} = req.body;
    db.query(`select * from parking_users where username = "${uname}" and password = "${pw}" `,
        (err, results) => {
        if (err) {
            return res.json({ code: 500, message: 'Error logging in' });
        }
        if (results.length > 0) {
            return res.json({ code: 200, message: 'Login successful' });
        } else {
              return res.json({ code: 401, message: 'Invalid credentials' });
        }
        }
    );
});


//-----sensor
app.get('/sensor', (req,res) => {
  db.query("select * from sensor",
  (err, results) => {
    res.json(results);
    }
);
});

//-----esp8266-websocket---------------------------------
const wss = new WebSocket.Server({ port: 8080});

// Variable to store the sensor state
let sensorData = { motionDetected: false };

// WebSocket connections
wss.on('connection', (ws) => {
  console.log('ESP8266 connected via WebSocket');

  // Receive data from ESP8266
  ws.on('message', (message) => {
    console.log(`Received from ESP8266: ${message}`);
    
    // Update sensor data
    if (message == 'NO_SLOT') {
      console.log("No Slot Available");
      sensorData = true;
      console.log(sensorData);
      db.query('update sensor set sensor1 = 1;');
    }else  if (message == 'SLOT_AVAILABLE') {
      console.log("Slot Available");
      sensorData = false;
      console.log(sensorData);
      db.query('update sensor set sensor1 = 0;');
    }
    if(message == "ir2"){
      db.query('update sensor set sensor2 = 1;');
    }else if(message == "noir2"){
      db.query('update sensor set sensor2 = 0;');
    }
    if(message == "ir3"){
      db.query('update sensor set sensor3 = 1;');
    }else if(message == "noir3"){
      db.query('update sensor set sensor3 = 0;');
    }
    if(message == "ir4"){
      db.query('update sensor set sensor4 = 1;');
    }else if(message == "noir4"){
      db.query('update sensor set sensor4 = 0;');
    }
    if(message == "ir5"){
      db.query('update sensor set sensor5 = 1;');
    }else if(message == "noir5"){
      db.query('update sensor set sensor5 = 0;');
    }
    
    console.log(message);
  });

  ws.on('close', () => {
    console.log('ESP8266 disconnected');
  });
});

const server = http.createServer(app);


// Create a Socket.IO server
const io = new Server(server, {
  cors: {
      origin: "http://localhost:5173", // Allow React frontend to connect
      methods: ["GET", "POST"]
  }
});

// Listen for new socket connections
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Send initial data when a client connects
  sendDataToClients();

  // You can also listen for specific events from clients if needed
  socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
  });
});

// Function to send data to connected clients
function sendDataToClients() {
  const query = 'SELECT * FROM sensor';
  db.query(query, (err, results) => {
      if (err) {
          console.error('Error querying MySQL:', err);
          return;
      }
      // Emit the data to all connected clients
      io.emit('updateData', results);
  });
}

// Periodically check for updates in the database and notify clients
setInterval(() => {
  sendDataToClients(); // Fetch and send data every X milliseconds (e.g., every 5 seconds)
}, 1000); // Check every 1 seconds


// API Route to fetch the latest sensor data
app.get('/latest-sensor-data', (req, res) => {
  const query = 'SELECT * FROM sensor'; // Fetch the latest record
  db.query(query, (err, result) => {
      if (err) {
          console.error('Error fetching data from MySQL:', err);
          res.status(500).send('Error fetching data');
          return;
      }
      res.json(result[0]); // Return the latest record as JSON
  });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


