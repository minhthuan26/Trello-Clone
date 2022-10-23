import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LoginUser } from '../redux/apiRequest';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
    <div>
      <h2>Login Form</h2>
      <form onSubmit={handleLogin}>
        <label>Tên đăng nhập</label>
        <input
          type={'text'}
          placeholder="Tên đăng nhập"
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <label>Password</label>
        <input
          type={'text'}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Đăng nhập</button>
      </form>
    </div>
  );
};

export default Login;
