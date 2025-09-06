import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Should be http://localhost:5000
  withCredentials: true,
});

export default api;