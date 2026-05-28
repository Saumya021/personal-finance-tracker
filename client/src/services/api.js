import axios from "axios";

const API = axios.create({
  baseURL: "https://personal-finance-tracker-z5bq.onrender.com",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = token;
  }

  return req;
});

export default API;