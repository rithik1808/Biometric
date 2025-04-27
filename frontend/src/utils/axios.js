import axios from "axios";

const BaseUrl = "https://biometric-nine.vercel.app";

const axiosInstance = axios.create({
  baseURL: `${BaseUrl}/api`,
  withCredentials: true,
});

export default axiosInstance;
