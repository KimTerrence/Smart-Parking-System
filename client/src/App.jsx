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
import Wallet from './components/Wallet';
import Paking from './components/Parking';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Navbar from './components/Navbar';

function App() {

  return (

      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<LandingPage/>} />
          <Route path='/main' element={<Main/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/login' element={<Login/>} /> 
          <Route path='/test' element={<Test/>} />
          <Route path='/admin' element={<Admin/>}/>
          <Route path='/wallet' element={<Wallet/>}/>
          <Route path='/parking' element={<Paking/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/contact' element={<Contact/>}/>
        </Routes>
      </Router>

  )
}

export default App