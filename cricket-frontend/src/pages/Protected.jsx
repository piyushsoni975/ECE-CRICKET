import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { api } from "../api";
import { authStore } from "../auth";
import { setToken } from "../api";

export default function Protected({ children }) {
  const [ok, setOk] = useState(null);

  useEffect(() => {
    const saved = authStore.get();
    if (!saved?.token) { setOk(false); return; }
    setToken(saved.token);
    api.get("/auth/me")
      .then(() => setOk(true))
      .catch(() => { authStore.clear(); setOk(false); });
  }, []);

  if (ok === null) return <div className="p-6">Loading...</div>;
  return ok ? children : <Navigate to="/" replace />;
}
