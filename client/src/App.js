// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AdminPanel from './components/AdminPanel';
import UserPage from './components/UserPage';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
        <Route path="/User-Page" element={<UserPage/>} />
     
      </Routes>
    </Router>
  );
}

export default App;
