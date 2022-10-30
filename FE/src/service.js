import axios from 'axios';
import jwt_decode from 'jwt-decode';

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

export const createAxios = (user, dispatch, stateSuccess) => {
  const newInstance = axios.create();
  newInstance.interceptors.request.use(
    async (config) => {
      let date = new Date();
      const decodedToken = jwt_decode(user?.accessToken);
      if (decodedToken.exp < date.getTime() / 1000) {
        const data = await refreshToken();
        const refreshUser = {
          ...user,
          accessToken: data.accessToken,
          // refreshToken:data.refreshToken
        };
        dispatch(stateSuccess(refreshUser));
        config.headers['token'] = 'Bearer' + data.accessToken;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  return newInstance;
};
