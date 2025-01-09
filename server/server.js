const express = require('express'); //express js
const cors = require('cors');   
const bodyParser = require('body-parser'); 
const mysql = require('mysql2'); //mysql database
const WebSocket = require('ws'); //websocket
const http = require('http');



const app = express();
app.use(cors());

//app.use(express.json()); // To parse JSON bodies
const port = 5000 ;


app.use(cors());
app.use(bodyParser.json());


app.use(cors({
  origin: 'http://localhost:5173' // Allow requests from React app
  //origin: 'http://192.168.8.106:5173'
}));


//-----database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'group5',
    password: 'group5',
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

//update vehicle info 
app.post('/vehicle', (req, res) => {
  const {plate, color, type} = req.body;
  db.query(`update parking_users set plate_num = "${plate}", color = "${color}", type = "${type}" , status = "Updated" , time = current_timestamp where username = "${username}" and password = "${passwd}" and status <>  "admin"  `,
    (err, results) => {
      res.json(results);
      }
);
});

//recent parking user
app.get('/recentReserve', (req, res) => {
  db.query(`select * from history order by created_at desc`,
    (err, results) => {
      res.json(results);
      }
);
});


app.post('/deposit', (req, res) => {
  const {amount , username } = req.body;
  db.query(`update parking_users set balance = balance + "${amount}" where username = "${username}"`,
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
  db.query("select * from parking_users order by time desc", 
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

//---------------------------sensor-data and Reserve
//Reserve
app.post('/reserve', (req, res) => {
  const {sensor ,balance, username, plate  } = req.body;
  var slot =  parseInt(sensor) - 1;
  db.query(`update sensor set sensor${sensor} = 1`);
  db.query(`update parking_users set balance = ${balance} - 50`)
  db.query(`insert into history (firstname , lastname, plate, slot) select firstname, lastname , plate_num , ${slot} from parking_users where username = '${username}' && plate_num = '${plate}'`)
})

//Get Sensor Data
const sensorData = () => {

  let sensorData = {}; // Store latest sensor data

  app.post('/send-data', (req, res) => { ///from react
    const { message } = req.body;
  })
  

  app.post('/sensor-data', (req, res) => {
    var { sensor, value } = req.body;
  
    if (sensor !== undefined && value !== undefined) {
      sensorData[`Sensor ${sensor}`] = value; // Store data
      console.log(`Received data: Sensor ${sensor}, Value: ${value}`);
      res.status(200).send(`Sensor ${sensor} data received.`);
    } else {
      console.log('Invalid data received:', req.body);
      res.status(400).send('Invalid data format');
    }

    if(value == 1){
      db.query(`update sensor set  sensor${sensor} = 0`);
    }else if(value == 0){
      db.query(`update sensor set  sensor${sensor} = 1`);
    }
  
  });

  // Endpoint to send the latest sensor data
app.get('/sensor-data', (req, res) => {
  res.json(sensorData); // Send the latest sensor data as JSON
});

}

sensorData();

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


