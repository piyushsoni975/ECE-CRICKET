import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../auth";

export default function AdminLogin() {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    const res = loginAdmin(u.trim(), p);
    if (res.ok) nav("/admin", { replace: true });
    else setErr(res.error);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white">
      <form onSubmit={onSubmit} className="w-full max-w-sm bg-white p-6 rounded-2xl shadow border">
        <h1 className="text-2xl font-semibold mb-4 text-center">Admin Login</h1>
        <label className="block text-sm mb-1">Username</label>
        <input value={u} onChange={e=>setU(e.target.value)}
          className="w-full mb-3 rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-green-500" placeholder="admin" />
        <label className="block text-sm mb-1">Password</label>
        <input type="password" value={p} onChange={e=>setP(e.target.value)}
          className="w-full mb-4 rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-green-500" placeholder="admin123" />
        {err && <p className="text-red-600 text-sm mb-3">{err}</p>}
        <button className="w-full rounded-xl bg-green-600 text-white py-2 font-medium hover:opacity-95">
          Sign in
        </button>
      </form>
    </div>
  );
}
