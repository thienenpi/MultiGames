import axios from "axios";
import { BASE_URL } from "../utils/config";

const ApiManager = axios.create({
  baseURL: BASE_URL,
  // baseURL: 'http://localhost:3000/api',
  //   baseURL: "http://192.168.100.132:3000/api",
  responseType: "json",
  withCredentials: true,
});

export default ApiManager;
