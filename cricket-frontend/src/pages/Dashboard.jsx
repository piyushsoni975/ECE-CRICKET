import React from "react";
import { useNavigate } from "react-router-dom";
import { authStore } from "../auth";
import PageWrapper from "../components/PageWrapper";

export default function Dashboard() {
  const nav = useNavigate();
  const auth = authStore.get();
  const name = auth?.user?.name || auth?.user?.email?.split("@")[0] || "User";
  const role = (auth?.user?.role || "user").toUpperCase();
  const isAdmin = role.toLowerCase() === "admin";

  function logout() { authStore.clear(); nav("/", { replace: true }); }

  const card =
    "w-full rounded-2xl py-16 px-8 text-center text-2xl font-bold text-white shadow-xl transform transition hover:scale-105 hover:shadow-2xl";

  return (
    <PageWrapper title="">
      {/* top row */}
      <div className="max-w-7xl mx-auto px-6 py-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl px-6 py-3 bg-gradient-to-r from-green-400 to-emerald-600 text-white shadow-xl backdrop-blur-md">
            <span className="text-lg">
              <span className="font-bold">{name}</span> &nbsp;Welcome to{" "}
              <span className="font-bold">ECE</span> cricket tournament
            </span>
          </div>
          <span className="rounded-full px-3 py-1 text-xs font-semibold bg-white/15 text-white border border-white/20">
            {role}
          </span>
        </div>

        <button
          onClick={logout}
          className="rounded-2xl px-6 py-3 text-lg font-semibold bg-gradient-to-r from-red-400 to-pink-600 text-white hover:scale-105 shadow-lg transition"
        >
          Logout
        </button>
      </div>

      {/* three big cards */}
      <div className="max-w-5xl mx-auto px-6 space-y-10">
        <button onClick={() => nav("/matches/live")} className={`${card} bg-gradient-to-r from-red-500 to-pink-600`}>
          Live Match
        </button>

        <button onClick={() => nav("/matches/past")} className={`${card} bg-gradient-to-r from-blue-500 to-indigo-600`}>
          Past Match
        </button>

        <button onClick={() => nav("/matches/upcoming")} className={`${card} bg-gradient-to-r from-yellow-400 to-orange-500 text-black`}>
          Upcoming Match
        </button>
      </div>

      {/* Admin Panel (only admin) */}
      {isAdmin && (
        <div className="max-w-5xl mx-auto px-6 mt-10">
          <button
            onClick={() => nav("/admin")}
            className="w-full rounded-2xl py-16 px-8 text-center text-2xl font-bold text-white shadow-xl transform transition hover:scale-105 hover:shadow-2xl bg-gradient-to-r from-emerald-500 to-teal-600"
          >
            Admin Panel
          </button>
        </div>
      )}
    </PageWrapper>
  );
}
