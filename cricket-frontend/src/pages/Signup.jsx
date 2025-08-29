import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { api } from "../api";
import { authStore } from "../auth";

export default function Signup() {
  const nav = useNavigate();
  const loc = useLocation();
  const presetEmail = loc.state?.email || "";
  const [name, setName] = useState("");
  const [email, setEmail] = useState(presetEmail);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/auth/register", { name, email, password });
      authStore.set(data);
      nav("/dashboard", { replace: true });
    } catch (err) {
      const code = err?.response?.data?.error;
      alert(code === "USER_EXISTS" ? "User already exists, please login" : (code || "SIGNUP_FAILED"));
    } finally { setLoading(false); }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* night bg */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-800" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-50 animate-stars" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/tiny-stars.png')] opacity-70 animate-stars" />
      <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-yellow-300/90 blur-[2px] shadow-[0_0_80px_20px_rgba(255,255,180,0.5)]" />

      {/* card */}
      <div className="relative z-10 min-h-screen grid place-items-center px-4">
        <div className="w-full max-w-sm rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl p-6">
          <h1 className="text-2xl font-bold text-white text-center">Create account</h1>
          <p className="text-sm text-white/70 text-center mt-1">Join ECE Cricket</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm text-white/80 mb-1">Name</label>
              <input
                className="w-full rounded-xl bg-white/10 text-white placeholder-white/60 border border-white/20 focus:border-blue-400 focus:ring-0 px-4 py-3 outline-none"
                placeholder="pk kumar"
                value={name}
                onChange={e=>setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm text-white/80 mb-1">Email</label>
              <input
                className="w-full rounded-xl bg-white/10 text-white placeholder-white/60 border border-white/20 focus:border-blue-400 focus:ring-0 px-4 py-3 outline-none"
                placeholder="you@college.com"
                value={email}
                onChange={e=>setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm text-white/80 mb-1">Password</label>
              <input
                type="password"
                className="w-full rounded-xl bg-white/10 text-white placeholder-white/60 border border-white/20 focus:border-blue-400 focus:ring-0 px-4 py-3 outline-none"
                placeholder="••••••••"
                value={password}
                onChange={e=>setPassword(e.target.value)}
              />
            </div>

            <button
              className="w-full rounded-xl bg-gradient-to-r from-blue-400 to-indigo-500 text-black font-semibold py-3 hover:brightness-110 transition disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Creating..." : "Sign up"}
            </button>
          </form>

          <button
            onClick={()=>nav("/")}
            className="w-full mt-4 text-sm text-white/80 hover:text-white underline underline-offset-4"
          >
            Already have an account? Login
          </button>
        </div>
      </div>
    </div>
  );
}
