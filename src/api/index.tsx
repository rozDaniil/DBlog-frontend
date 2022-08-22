import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8888",
});

axiosInstance.interceptors.request.use((config) => {
  if (!config) {
    config = {};
  }
  if (!config.headers) {
    config.headers = {};
  }
  config.headers.Authorization = localStorage.getItem("DToken") || "";
  return config;
});

export default axiosInstance;
