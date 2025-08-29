import axios from "axios";

// use env var in prod, fallback to local for dev
const baseURL =
  import.meta.env.VITE_API_BASE || "https://ece-cricket-kf9n.vercel.app/";

export const api = axios.create({ baseURL });

export function setToken(token) {
  if (token) api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else delete api.defaults.headers.common["Authorization"];
}
