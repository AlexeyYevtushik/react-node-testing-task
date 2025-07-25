import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Items from './pages/Items.jsx';
import EditItem from './pages/EditItem.jsx';

function App() {
  const [token, setToken] = useState(() => localStorage.getItem('token'));

  return (
    <Routes>
      {}
      <Route path="/" element={token ? <Navigate to="/items" replace /> : <Navigate to="/login" replace />} />
      <Route path="/login" element={<Login setToken={(tok) => { setToken(tok); }} />} />
      {}
      <Route path="/items" element={token ? <Items token={token} /> : <Navigate to="/login" replace />} />
      <Route path="/items/:id/edit" element={token ? <EditItem token={token} /> : <Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
