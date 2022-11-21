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
    await axios
      .post(`//localhost:3000/api/v1/auth/login`, user, {
        withCredentials: true,
      })
      .then((res) => {
        const result = res.data;
        dispatch(loginSuccess(result));
        console.log(res);
        console.log('Login Success');
        alert('Login Success');
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
        console.log('Register Success');
        alert('Register Success');
        navigate('/login');
      });
  } catch (err) {
    console.log(err);
    alert(err.response.data.msg);
    dispatch(registerFailed());
  }
};

export const getAllUser = async (accessToken, dispatch, axiosJWTgetUsers) => {
  dispatch(getUserStart());
  try {
    await axiosJWTgetUsers
      .get(`//localhost:3000/api/v1/user/`, {
        headers: { token: `Bearer ${accessToken}` },
      })
      .then((res) => {
        const result = res.data;
        console.log(result);
        dispatch(getUserSuccess(result));
      });
  } catch (error) {
    alert('Get User Failed');
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
    dispatch(logOutFailed());
  }
};
