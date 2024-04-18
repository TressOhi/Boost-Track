import axios from "axios";
import { config } from "../config";

let http = axios.create({
  baseURL: `${config.apiUrl}`,
});

const token = localStorage.getItem("token");

http.interceptors.request.use(
  function (config) {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

export { http as axios };
