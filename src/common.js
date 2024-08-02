import axios from "axios";

export const todoRestApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});


