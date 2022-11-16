import axios from 'axios';
import jwt_decode from 'jwt-decode';
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
        // console.log(res.data);
        console.log(res.data);
        const data = res.data;
        return data;
      });
  } catch (error) {
    console.log(error);
  }
  // const data = refreshToken();
  // try {
  //   await axios
  //     .get(`//localhost:3000/api/v1/boards/635e30fbb1a6972cdc26aeb9`)
  //     .then((res) => {
  //       const result = res.data;
  //       let boards = result[0].columns;
  //       let board = boards[0];
  //       console.log(board);
  //     });
  // } catch (err) {
  //   console.log(err);
  // }
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
            // console.log(res.data);
            // console.log(res.data);
            // const data = res.data;
            // return data;
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
