import axios from "axios";

/* 🔓 Public API (no auth) */
export const PublicAPI = axios.create({
  baseURL: "http://127.0.0.1:8000/api/users/",
});

/* 🔒 Private API (JWT auth) */
const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/users/",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("access");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
