import axios from 'axios';

const ApiManager = axios.create({
  baseURL: 'https://multigames.azurewebsites.net/api',
  responseType: 'json',
  withCredentials: false,
});

export default ApiManager;
