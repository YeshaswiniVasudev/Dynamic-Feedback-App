// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./features/LandingPage";
import AdminPanel from "./features/admin/AdminPanel";
import UserPage from "./features/user/UserPage";
import ThankYou from "./features/user/ThankYou";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
        <Route path="/User-Page" element={<UserPage />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
    </Router>
  );
}

export default App;
