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
 // origin: 'http://192.168.8.105:5173'
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


//-----User Register
app.post('/register', (req, res) => {
    const {fname, lname, uname, pw} = req.body;
    db.query(`insert into parking_users(firstname, lastname, username, password , status) values ( "${fname}", "${lname}" ,"${uname}", "${pw}" , "New User")`,
        (err) => {
            if (err) {
              return res.json({ code: 500, message: 'Error registering user' });
            }
            return res.json({ code: 201, message: 'User registered successfully' });
          }
        );
      });


//-----User Login
const UserLogin = () => {
var username;
var passwd;
app.post('/login', (req, res) => {
    const { uname , pw} = req.body;
    username = uname;
    passwd = pw;
    db.query(`select * from parking_users where username = "${uname}" and password = "${pw}" and status <>  "admin"`,
        (err, results) => {
        if (err) {
            return res.json({ code: 500, message: 'Error logging in' });
          }
        if (results.length > 0) {
            return res.json({ code: 200, message: 'Login successful' });
            console.log(mysql.QueryResult);
        } else {
              return res.json({ code: 401, message: 'Invalid credentials' });
        }
        }
  );
});

app.get('/login', (req, res) => {
  db.query(`select * from parking_users where username = "${username}" and password = "${passwd}" and status <>  "admin"`,
    (err, results) => {
      res.json(results);
      }
);
});
}

UserLogin()

//-----Admin Login
app.post('/admin-login', (req, res) => {
  const { uname , pw} = req.body;
  db.query(`select * from parking_users where username = "${uname}" and password = "${pw}" and status = "admin"`,
      (err, results) => {
      if (err) {
          return res.json({ code: 500, message: 'Error logging in' });
        }
      if (results.length > 0) {
          return res.json({ code: 200, message: 'Login successful' });
          console.log(mysql.QueryResult);
      } else {
            return res.json({ code: 401, message: 'Invalid credentials' });
      }
      }
);
});

//----- admin dashboard get user
app.get('/admin', (req,res) => {
  db.query("select * from parking_users", 
  (err, results) => {
      res.json(results);
  }
  )
})

//----- admin user post
app.put('/admin/:id', (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  db.query('UPDATE parking_users SET status = ? WHERE id = ?', [status, id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ message: 'User updated successfully' });
  });
});

//-----sensor
app.get('/sensor', (req,res) => {
  db.query("select * from sensor",
  (err, results) => {
    res.json(results);

    }
);
});

// delete user 
// DELETE route
app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  const deleteQuery = 'DELETE FROM parking_users WHERE id = ?';

  db.query(deleteQuery, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to delete data' });
    }
    res.json({ message: 'Data deleted successfully' });
  });
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


