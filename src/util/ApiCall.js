import axios from 'axios';

const baseUrl = 'http://localhost:3000';

const axiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true',
  },
});

const request = async (method, endPoint, data = null) => {
  try {
    const response = await axiosInstance[method](`${baseUrl}/${endPoint}`, data);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getRequest = async (endPoint) => {
  return request('get', endPoint);
};

export const postRequest = async (endPoint, data) => {
  return request('post', endPoint, data);
};

export const putRequest = async (endPoint, data) => {
  return request('put', endPoint, data);
};

export const deleteRequest = async (endPoint) => {
  return request('delete', endPoint);
};
