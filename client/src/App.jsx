{/*
S M A R T   P A R K I N G   S Y S T E M
Group 5 BSIT 3A = [Kim Terrence Quines, Rodary Tabasan, Guiellie Lorenzo, Jaqueline Mape, Noralyn Saludares] 
Routes File
*/}


import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import LandingPage from './components/LandingPage';
import Main from './components/Main';
import Register from './components/Register';
import Login from './components/Login';
import './index.css';
import Test from './components/Test';
import Admin from './components/Admin';
import Wallet from './components/Wallet';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import AnimationWrapper from "./components/AnimationWrapper";
import { AnimatePresence } from "framer-motion";
import bg from './assets/bg1.jpg'
import PageTransition from "./components/PageTransition";
import Parking from "./components/Parking";


const AnimatedRoutes = () => {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleTransitionComplete = () => setIsTransitioning(false);

  return (
    <AnimatePresence mode="wait">
  

      {/* Routes */}
      <Routes location={location} key={location.pathname}>
      <Route
          path="/"
          element={
              <LandingPage />
          }
        />
        <Route
          path="/main"
          element={
              <Main />
          }
        />
         <Route
          path="/admin"
          element={  
              <Admin />
          }
        />
         <Route
          path="/wallet"
          element={
            
              <Wallet />
          
          }
        />
        <Route
          path="/login"
          element={
           
              <Login />
           
          }
        />
        <Route
          path="/register"
          element={
           
              <Register />
            
          }
        />
        <Route
          path="/home"
          element={
            <AnimationWrapper>
              <Home />
            </AnimationWrapper>
          }
        />
        <Route
          path="/parking"
          element={
            <AnimationWrapper>
              <Parking />
            </AnimationWrapper>
          }
        />
        <Route
          path="/about"
          element={
            <AnimationWrapper>
              <About />
            </AnimationWrapper>
          }
        />
        <Route
          path="/contact"
          element={
            <AnimationWrapper>
              <Contact />
            </AnimationWrapper>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
};
/*
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

*/

export default App