// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AdminDashboard from './components/AdminDashboard';
import UserPage from './components/UserPage';
import ViewFeedbacks from './components/ViewFeedbacks';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/User-Page" element={<UserPage/>} />
        <Route path="/view-feedbacks" element={<ViewFeedbacks />} />
      </Routes>
    </Router>
  );
}

export default App;
