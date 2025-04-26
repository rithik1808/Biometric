import axios from "axios";

const BaseUrl = "http://localhost:5001";

const axiosInstance = axios.create({
  baseURL: `${BaseUrl}/api`,
  withCredentials: true,
});

export default axiosInstance;
