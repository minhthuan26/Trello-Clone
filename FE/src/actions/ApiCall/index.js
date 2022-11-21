import axios from 'axios';
import { API_ROOT } from '../../uitilities/constants';

export const fetchBoardDetails = async (id) => {
  const request = await axios.get(`${API_ROOT}/api/v1/boards/${id}`);
  const data = request.data;
  const dataArray = data[0];
  return dataArray;
};

export const createNewColumn = async (data) => {
  const request = await axios.post(`${API_ROOT}/api/v1/columns/create`, data);
  return request.data;
};

//update or remove column
export const updateColumn = async (id, data) => {
  const request = await axios.patch(
    `${API_ROOT}/api/v1/columns/update/${id}`,
    data
  );
  console.log(request);
  return request.data;
};

export const createNewCard = async (data) => {
  const request = await axios.post(`${API_ROOT}/api/v1/cards/create`, data);
  return request.data;
};
