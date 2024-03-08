import axios from 'axios';

const ApiManager = axios.create({
  baseURL: 'http://localhost:3000/api',
  responseType: 'json',
  withCredentials: false,
});

export default ApiManager;
