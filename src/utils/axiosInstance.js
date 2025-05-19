import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://torii-gate-backend.onrender.com/api",
});
