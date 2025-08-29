import axios from "axios";

// In prod, set Vercel env: VITE_API_URL=https://<your-backend>.vercel.app/api
// In dev, it falls back to localhost:5000/api
const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const api = axios.create({ baseURL });

export function setToken(token) {
  if (token) api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete api.defaults.headers.common["Authorization"];
}
