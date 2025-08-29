import axios from "axios";

// use env var in prod, fallback to local for dev
const baseURL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const api = axios.create({ baseURL });

export function setToken(token) {
  if (token) api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete api.defaults.headers.common["Authorization"];
}
