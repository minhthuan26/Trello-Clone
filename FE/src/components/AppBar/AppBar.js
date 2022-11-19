import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container as BoostrapContainer, Button, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
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
          <BoostrapContainer className="trello-container">
            <Row>
              <Col sm={5} xs={12} className="col-no-padding">
                <div className="app-actions">
                  <div className="item all"><i className="fa fa-th" /></div>
                  <div className="item home"><i className="fa fa-home" /></div>
                  <div className="item boards"><i className="fa fa-columns" />&nbsp;&nbsp;<strong>Boards</strong></div>
                  <div className="item search">
                    <InputGroup className="group-search">
                      <FormControl
                        className="input-search"
                        placeholder="Jump to..."
                      />
                      <InputGroup.Text className="input-icon-search"><i className="fa fa-search" /></InputGroup.Text>  
                    </InputGroup>
                  </div>
                </div>
              </Col>
              
              <Col sm={2} xs={12} className="col-no-padding">
                <div className="logo">
                  <Link to={'/'}>
                    {/* eslint-disable-next-line */}
                    <a className="page-name">Trello</a>
                  </Link>
                </div>
              </Col>

              <Col sm={5} xs={12} className="col-no-padding">
                <div className="user-actions">
                  {/* eslint-disable-next-line */}
                  <div><a className="account-name">Hi, {user.username}</a></div>
                  <div>
                  <Button
                    className="logout-button"
                    size="sm"
                    onClick={LogOutUser}
                  >
                    LogOut
                  </Button>
                  </div>
                  <div>
                    {/* <img></img> */}
                  </div>
                </div>
              </Col>
            </Row>
          </BoostrapContainer>
        </nav>
      ) : (
        <>
          <nav className="navbar-app">
            <BoostrapContainer className="trello-container">
              <Row>
                <Col sm={5} xs={12} className="col-no-padding"></Col>
                <Col sm={2} xs={12} className="col-no-padding">
                  <div className="logo">
                    <Link to={'/'}>
                      {/* eslint-disable-next-line */}
                      <a className="page-name">Trello</a>
                    </Link>
                  </div>
                </Col>

                <Col sm={5} xs={12} className="col-no-padding">
                  {/* eslint-disable-next-line */}
                  <div className="user-actions">
                    <Link className="link" to={'/login'}>
                    <Button
                          className="re-button"
                        >
                          Login
                        </Button>
                    </Link>
                    <Link className="link" to={'/register'}>
                    <Button
                          className="re-button"
                        >
                          Register
                        </Button>
                    </Link>
                  </div>
                </Col>
              </Row>
            </BoostrapContainer>  
          </nav>
        </>
      )}
    </div>
  )
}

export default AppBar;
