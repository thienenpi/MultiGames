import axios from 'axios';

const ApiManager = axios.create({
  //   baseURL: 'https://multigames.azurewebsites.net/api',
  //   baseURL: 'http://localhost:3000/api',
  baseURL: 'http://192.168.100.159:3000/api',
  responseType: 'json',
  withCredentials: true,
});

export default ApiManager;
