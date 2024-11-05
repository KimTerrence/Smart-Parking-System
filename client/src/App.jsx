{/*
S M A R T   P A R K I N G   S Y S T E M
Group 5 BSIT 3A = [Kim Terrence Quines, Rodary Tabasan, Guiellie Lorenzo, Jaqueline Mape, Noralyn Saludares] 
Routes File
*/}

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Main from './components/Main';
import Register from './components/Register';
import Login from './components/Login';
import './index.css';
import Test from './components/Test';
import Admin from './components/Admin';


function App() {

  return (

      <Router>
        <Routes>
          <Route path='/' element={<LandingPage/>} />
          <Route path='/main' element={<Main/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/login' element={<Login/>} /> 
          <Route path='/test' element={<Test/>} />
          <Route path='/admin' element={<Admin/>}/>
        </Routes>
      </Router>

  )
}

export default App