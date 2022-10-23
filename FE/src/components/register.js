import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../redux/apiRequest';

const Register = () => {
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
    <div>
      <h2>Register Form</h2>
      <form onSubmit={handleRegister}>
        <label>Email</label>
        <input
          type={'text'}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
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

export default Register;
