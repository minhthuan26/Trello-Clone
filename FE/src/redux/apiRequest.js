import axios from 'axios';
import {
  loginFailed,
  loginStart,
  loginSuccess,
  logOutFailed,
  logOutStart,
  logOutSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
} from './authSlice';
import { getUserStart, getUserFailed, getUserSuccess } from './userSlice';

export const LoginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    await axios.post(`//localhost:3000/api/v1/auth/login`, user).then((res) => {
      const result = res.data;
      dispatch(loginSuccess(result));
      console.log(result);
      alert('login success');
      navigate('/');
    });
  } catch (err) {
    alert(err.response.data.msg);
    dispatch(loginFailed());
  }
};
export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    await axios
      .post(`//localhost:3000/api/v1/auth/register`, user)
      .then((res) => {
        const result = res.data;
        dispatch(registerSuccess(result));
        console.log(result);
        console.log('register success');
        alert('register success');
        navigate('/login');
      });
  } catch (err) {
    console.log(err);
    alert(err.response.data.msg);
    dispatch(registerFailed());
  }
};

export const getAllUser = async (accessToken, dispatch, axiosJWT) => {
  dispatch(getUserStart());
  try {
    await axiosJWT
      .get(`//localhost:3000/api/v1/user/`, {
        headers: { token: `Bearer ${accessToken}` },
      })
      .then((res) => {
        const result = res.data;
        dispatch(getUserSuccess(result));
        console.log(result);
        alert('Get all user success');
      });
  } catch (error) {
    alert('Get user failed');
    dispatch(getUserFailed());
  }
};
export const logOutUser = async (
  dispatch,
  id,
  navigate,
  accessToken,
  axiosJWT
) => {
  dispatch(logOutStart());
  try {
    await axiosJWT
      .post(`//localhost:3000/api/v1/auth/logout`, id, {
        headers: { token: `Bearer ${accessToken}` },
      })
      .then((res) => {
        console.log(res);
        alert(res.data.msg);
        dispatch(logOutSuccess());
        navigate('/login');
      });
  } catch (error) {
    console.log(error);
    // alert(error.res.data.msg);
    dispatch(logOutFailed());
  }
};
