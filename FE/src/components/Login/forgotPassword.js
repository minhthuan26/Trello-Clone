import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { resetPassword } from '../../redux/apiRequest';
import './forgot.css';
const ForgotForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setpasswordConfirm] = useState('');

  const navigate = useNavigate();

  const handleReset = (event) => {
    // Prevent page reload
    event.preventDefault();
    const newPassword = {
      email: email,
      password: password,
      confirmPassword: passwordConfirm,
    };
    console.log(newPassword);
    resetPassword(newPassword, navigate);
  };
  return (
    <div className="register1">
      <h1>Reset Password</h1>
      <form className="formSubmitRegister" onSubmit={handleReset}>
        <div className="txtfield">
          <input
            type={'text'}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Email</label>
        </div>
        <div className="txtfield">
          <input
            type={'text'}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>New Password</label>
        </div>
        <div className="txtfield">
          <input
            type={'text'}
            onChange={(e) => setpasswordConfirm(e.target.value)}
            required
          />
          <label>Confirm Password</label>
        </div>
        <div>
          <button className="signupButton" type="submit">
            Sign Up
          </button>
        </div>
        <div className="already">
          Return to login page
          <Link to={'/Login'}>
            <a>Login</a>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotForm;
