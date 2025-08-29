import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api";

export default function LiveMatchDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const [m, setM] = useState(null);

  async function load() {
    const { data } = await api.get(`/matches/${id}`);
    setM(data.item);
  }

  useEffect(() => {
    load();
    const t = setInterval(load, 4000);  // 4s polling
    return () => clearInterval(t);
  }, [id]);

  if (!m) return <div className="p-6 text-white/80">Loading…</div>;

  const live = !m.finished;
  const batting = m.innings === 1 ? m.teamA : m.teamB;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-800 p-6 text-white">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">
          {m.teamA} <span className="text-white/60">vs</span> {m.teamB}
        </h1>
        <button onClick={()=>nav("/matches/live")} className="px-3 py-1 rounded bg-white/10 border border-white/20 hover:bg-white/20">
          ← Back
        </button>
      </div>

      <div className="rounded-2xl bg-white/10 border border-white/20 p-5">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-white/70">{m.teamA}</div>
            <div className="text-3xl font-bold">{m.runsA}/{m.wicketsA}</div>
            <div className="text-xs text-white/70">Overs: {m.oversA}</div>
          </div>
          <div>
            <div className="text-sm text-white/70">{m.teamB}</div>
            <div className="text-3xl font-bold">{m.runsB}/{m.wicketsB}</div>
            <div className="text-xs text-white/70">Overs: {m.oversB}</div>
          </div>
        </div>

        <div className="mt-3">
          {live ? (
            <div className="text-white/80">
              Innings: <b>{m.innings}</b> • Batting: <b>{batting}</b> 
              <span className="ml-2 px-2 py-0.5 rounded text-xs bg-red-600">LIVE</span>
            </div>
          ) : (
            <div className="text-emerald-400 font-semibold">
              {m.result || "Match finished"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
