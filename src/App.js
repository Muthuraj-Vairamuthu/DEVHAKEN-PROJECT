import './App.css';
import StartPage from './Components/StartPage/StartPage';
import Macros from './Components/Macros/Macros';

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Assuming this is the component where you use useNavigate

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/macros" element={<Macros />} />
      </Routes>
    </Router>
  );
}

export default App;
