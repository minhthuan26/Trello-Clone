import React from 'react';
import Dashboard from './components/dashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/Login/login';
import RegisterForm from './components/Register/register';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
