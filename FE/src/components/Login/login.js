import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LoginUser } from '../../redux/apiRequest';
import './login.css';
const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState({
    password: '',
    showPassword: false,
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (event) => {
    event.preventDefault();
    const newUser = {
      username: username,
      password: password,
    };
    LoginUser(newUser, dispatch, navigate);
  };

  return (
    <div className="login1">
      <h1>Login Form</h1>
      <form className="formSubmit" onSubmit={handleLogin}>
        <div className="txtfield">
          <input
            type={'text'}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label>Username</label>
        </div>
        <div className="txtfield">
          <input
            type={password.showPassword ? 'text' : 'password'}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>Password</label>
        </div>
        <button className="loginButton" type="submit">
          Login
        </button>
        <div className="notformember">
          <div className="notAMember">
            Not a member ?
            <Link to={'/register'}>
              {/* eslint-disable-next-line */}
              <a className="signup">Register</a>
            </Link>
          </div>
          <div className="notAMember">
            Forgot password ?
            <Link to={'/forgotPassword'}>
              {/* eslint-disable-next-line */}
              <a className="signup">Click here</a>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
