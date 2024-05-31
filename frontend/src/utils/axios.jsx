import axios from "axios";

const axiosInstance = axios.create({
  withCredentials: true, // to allow your API to set cookies on the browser
});

export default axiosInstance;
