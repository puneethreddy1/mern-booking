
import './App.css';
import Navbar from './components/Navbar';

import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'

import Homescreen from "./screens/Homescreen";

import Bookingscreen from './screens/Bookingscreen';
import Loginscreen from './screens/Loginscreen';
import Register from './screens/Register';
import Profilescreen from './screens/Profilescreen';
import Landingscreen from './screens/Landingscreen';
import Newloading from './Newloading';

function App() {
  return (

    <div>

      {/* <Navbar /> */}
      {/* :fromdate/:todate */}
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Homescreen />} />
          <Route path="/book/:id/:fromdate/:todate" element={<Bookingscreen />} exact />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Loginscreen />} />
          <Route path="/profile" element={<Profilescreen />} />
          {/* <Route path="/" element={<Landingscreen />} /> */}
          <Route path='/' element={<Newloading />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
