import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { getAllUser, logOutUser} from '../../redux/apiRequest';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import jwt_decode from 'jwt-decode';
import { loginSuccess } from '../../redux/authSlice';
// import { createAxios } from '../../service';
import './AppBar.scss';
import styles from './AppBar.scss';

function AppBar() {
  const user = useSelector((state) => state.auth.login.currentUser);
  // const userList = useSelector((state) => state.users.users?.allUsers);
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  // const token = user?.accessToken;
  let axiosJWT = axios.create();
  // const handleLogout = () => {
  //   logOutUser(dispatch, navigate, token, axiosJWT);
  // };
  // let axiostJWTlogout = createAxios(user, dispatch, logoutSuccess);
  // let axiosJWT = createAxios(user, dispatch, loginSuccess);

  const refreshToken = async () => {
    try {
      await axios
        .post(`//localhost:3000/api/v1/auth/refresh/`, {
          withCredentials: true,
        })
        .then((res) => {
          return res.data;
        });
    } catch (error) {
      console.log(error);
    }
  };

  axiosJWT.interceptors.request.use(
    async (config) => {
      let date = new Date();
      const decodedToken = jwt_decode(user?.accessToken);
      if (decodedToken.exp < date.getTime() / 1000) {
        const data = await refreshToken();
        const refreshUser = {
          ...user,
          accessToken: data.accessToken,
        };
        dispatch(loginSuccess(refreshUser));
        config.headers['token'] = 'Bearer' + data.accessToken;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  // useEffect(() => {
  //    if (!user) {
  //       navigate('/login');
  //    }
  //    if (user?.accessToken) {
  //       getAllUser(user?.accessToken, dispatch, axiosJWT);
  //    }

  // }, []);

  const LogOut = (e) => {};

  return (
    <div>
      {user ? (
        <nav className="navbar-app">
          <a className="logo">Trello Clone</a>
          <div className="nav-actions">
            <a className="account-name">Hi, {user.username}</a>
            <Button
              className="logout-button"
              variant="success"
              size="sm"
              onClick={LogOut}
            >
              LogOut
            </Button>
          </div>
        </nav>
      ) : (
        <>
          <nav className="navbar-app">
            <a className="logo">Trello Clone</a>
            <div className="nav-actions">
              <Link to={'/login'}>
                <Button>Login</Button>
              </Link>

              <Link to={'/register'}>
                <Button>Register</Button>
              </Link>
            </div>
          </nav>
        </>
      )}
    </div>
  );
}

export default AppBar;