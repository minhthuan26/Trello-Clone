// import React from 'react';
import '../../src/App.scss';
import AppBar from '../components/AppBar/AppBar';
import BoardBar from '../components/BoardBar/BoardBar';
import BoardContent from '../components/BoardContent/BoardContent';
import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
import './dashboard.css';
// import { getAllUser, logOutUser } from '../redux/apiRequest';
// import axios from 'axios';
// import jwt_decode from 'jwt-decode';
// import { loginSuccess, logoutSuccess } from '../redux/authSlice';
// import { createAxios } from '../service';
function Dashboard() {
  // const user = useSelector((state) => state.auth.login.currentUser);
  // // const userList = useSelector((state) => state.users.users?.allUsers);
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // // const token = user?.accessToken;
  // let axiosJWT = axios.create();
  // const handleLogout = () => {
  //   logOutUser(dispatch, navigate, token, axiosJWT);
  // };
  // let axiostJWTlogout = createAxios(user, dispatch, logoutSuccess);
  // let axiosJWT = createAxios(user, dispatch, loginSuccess);
  // const refreshToken = async () => {
  //   try {
  //     await axios
  //       .post(`//localhost:3000/api/v1/auth/refresh/`, {
  //         withCredentials: true,
  //       })
  //       .then((res) => {
  //         return res.data;
  //       });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // axiosJWT.interceptors.request.use(
  //   async (config) => {
  //     let date = new Date();
  //     const decodedToken = jwt_decode(user?.accessToken);
  //     if (decodedToken.exp < date.getTime() / 1000) {
  //       const data = await refreshToken();
  //       const refreshUser = {
  //         ...user,
  //         accessToken: data.accessToken,
  //       };
  //       dispatch(loginSuccess(refreshUser));
  //       config.headers['token'] = 'Bearer' + data.accessToken;
  //     }
  //     return config;
  //   },
  //   (err) => {
  //     return Promise.reject(err);
  //   }
  // );

  // useEffect(() => {
  //   if (!user) {
  //     navigate('/login');
  //   }
  //   if (user?.accessToken) {
  //     getAllUser(user?.accessToken, dispatch, axiosJWT);
  //   }
  // }, []);

  return (
    <div className="wrapper">
      <AppBar />
      <BoardBar />
      <BoardContent />
      {/* <div>
        {userList.map((user) => {
          return (
            <div>
              <p>{user.username}</p>
              <button>delete</button>
            </div>
          );
        })}
      </div> */}
    </div>
  );
}

export default Dashboard;
