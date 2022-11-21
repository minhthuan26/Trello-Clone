import axios from 'axios';
import jwt_decode from 'jwt-decode';
// function refreshToken by get accessToken at cookies in browser
export const refreshToken = async () => {
  try {
    await axios
      .post(
        `//localhost:3000/api/v1/auth/refresh`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data);
        const data = res.data;
        return data;
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
        await axios
          .post(
            `//localhost:3000/api/v1/auth/refresh`,
            {},
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            const refreshUser = {
              ...user,
              accessToken: res.data,
            };
            console.log(res.data);
            dispatch(stateSuccess(refreshUser));
            config.headers['token'] = 'Bearer ' + res.data;
          });
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  return newInstance;
};
