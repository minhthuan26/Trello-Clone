import React from 'react';
import Dashboard from './components/dashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/Login/login';
import RegisterForm from './components/Register/register';
import ForgotForm from './components/Login/forgotPassword';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/forgotPassword" element={<ForgotForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
