import axios from "axios";

const BaseUrl = import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create({
  baseURL: `${BaseUrl}/api`,
  withCredentials: true,
});

export default axiosInstance;
