import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login.js';
import Dashboard from './pages/Dashboard.js';
import SharedBook from './components/SharedBook.js';
import PublicProfile from './components/PublicProfile.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/shared/book/:id" element={<SharedBook />} />
        <Route path="/profile/:username" element={<PublicProfile />} />
      </Routes>
    </Router>
  );
}

export default App;