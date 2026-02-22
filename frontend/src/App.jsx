import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import TVDisplay from './pages/TVDisplay';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="/display/:roomId" element={<TVDisplay />} />
    </Routes>
  );
}

export default App;
