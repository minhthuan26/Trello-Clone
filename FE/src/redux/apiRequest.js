import axios from 'axios';
import {
  loginFailed,
  loginStart,
  loginSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
} from './authSlice';

export const LoginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    axios.post(`//localhost:3000/api/v1/auth/login`, user).then((res) => {
      const result = res.data;
      dispatch(loginSuccess(result));
      console.log(result);
      alert('login success');
      navigate('/');
    });
  } catch (error) {
    dispatch(loginFailed());
  }
};
export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    axios.post(`//localhost:3000/api/v1/auth/register`, user).then((res) => {
      const result = res.data;
      dispatch(registerSuccess(result));
      console.log(result);
      console.log('register success');
      alert('register success');
      navigate('/login');
    });
  } catch (error) {
    console.log('register failed');
    dispatch(registerFailed());
  }
};
