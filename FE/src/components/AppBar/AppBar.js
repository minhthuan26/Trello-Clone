import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { logOutUser } from '../../redux/apiRequest';
import { createAxios } from '../../createInstance';
import { logOutSuccess } from '../../redux/authSlice';
import './AppBar.scss';

function AppBar() {
  const user = useSelector((state) => state.auth.login.currentUser);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const accessToken = user?.accessToken;
  // const [newAccessToken, setNewAccessToken] = useState('');
  const id = user?._id;

  let axiosJWT = createAxios(user, dispatch, logOutSuccess);
  const LogOutUser = () => {
    // setNewAccessToken(refreshToken(accessToken));
    // console.log(newAccessToken);
    logOutUser(dispatch, id, navigate, accessToken, axiosJWT);
    // navigate('/login');
  };

  // useEffect(() => {
  //   if (!user) {
  //     navigate('/login');
  //   }
  //   if (user?.accessToken) {
  //     getAllUser(user?.accessToken, dispatch, axiostJWTgetUser);
  //   }
  // });

  return (
    <div>
      {user ? (
        <nav className="navbar-app">
          {/* eslint-disable-next-line */}
          <a className="logo">Trello Clone</a>
          <div className="nav-actions">
            {/* eslint-disable-next-line */}
            <a className="account-name">Hi, {user.username}</a>
            <Button
              className="logout-button"
              variant="success"
              size="sm"
              onClick={LogOutUser}
            >
              LogOut
            </Button>
          </div>
        </nav>
      ) : (
        <>
          <nav className="navbar-app">
            {/* eslint-disable-next-line */}
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
