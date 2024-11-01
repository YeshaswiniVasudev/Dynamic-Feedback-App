// LandingPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleAdminClick = () => {
    navigate('/admin-dashboard'); // Route to admin dashboard
  };

  const handleUserClick = () => {
    navigate('/User-Page'); 
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20%' }}>
      <h1>Welcome to the App</h1>
      <button onClick={handleAdminClick} style={{ margin: '10px', padding: '10px 20px' }}>
        Admin
      </button>
      <button onClick={handleUserClick} style={{ margin: '10px', padding: '10px 20px' }}>
        User
      </button>
    </div>
  );
};

export default LandingPage;
