// src/auth.js
import { setToken } from "./api";

const LS_AUTH = "auth";

export const authStore = {
  token: null,
  role: null,     // "admin" | "user"
  user: null,     // { id, name, email, role }

  // Load from localStorage into in-memory fields (so App.jsx useAuth works)
  load() {
    try {
      const saved = JSON.parse(localStorage.getItem(LS_AUTH));
      this.token = saved?.token || null;
      this.user  = saved?.user  || null;
      this.role  = saved?.user?.role || null;
      setToken(this.token); // set axios header if present
    } catch {
      this.token = null; this.user = null; this.role = null;
      setToken(null);
    }
  },

  // Handy getter for components that prefer a single read
  get() {
    return { token: this.token, user: this.user, role: this.role };
  },

  // Expect data from backend: { token, user: { id, name, email, role } }
  set(data) {
    this.token = data?.token || null;
    this.user  = data?.user  || null;
    this.role  = data?.user?.role || null;

    localStorage.setItem(LS_AUTH, JSON.stringify({ token: this.token, user: this.user }));
    setToken(this.token);
  },

  clear() {
    this.token = null;
    this.user = null;
    this.role = null;
    localStorage.removeItem(LS_AUTH);
    setToken(null);
  },
};

// initialize on import
authStore.load();

// ❌ remove the old LS_ADMIN helpers — no longer needed:
// export function isAuthed() {...}
// export function loginAdmin(...) {...}
// export function logoutAdmin() {...}
