import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../redux/apiRequest';
import './register.css';
const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (event) => {
    // Prevent page reload
    event.preventDefault();
    const newUser = {
      username: username,
      password: password,
      email: email,
    };
    registerUser(newUser, dispatch, navigate);
  };
  return (
    <div className="register1">
      <h1>Register Form</h1>
      <form className="formSubmitRegister" onSubmit={handleRegister}>
        <div className="txtfield">
          <input
            type={'text'}
            // placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Email</label>
        </div>
        <div className="txtfield">
          <input
            type={'text'}
            // placeholder="Tên đăng nhập"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label>Username</label>
        </div>
        <div className="txtfield">
          <input
            type={'password'}
            // placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>Password</label>
        </div>
        <div>
          <button className="signupButton" type="submit">
            Sign Up
          </button>
        </div>
        <div className="already">
          Already a member?
          <Link to={'/Login'}>
            <a>Login</a>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
