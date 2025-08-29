import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api";

export default function AdminEditMatch() {
  const { id } = useParams();
  const nav = useNavigate();
  const [m, setM] = useState(null);
  const [loading, setLoading] = useState(false);

  async function load() {
    const { data } = await api.get(`/matches/${id}`);
    setM(data.item);
  }
  useEffect(() => { load(); }, [id]);

  async function bump(addRuns = 0, addWicket = false) {
    if (m?.finished) return;
    setLoading(true);
    try {
      await api.patch(`/matches/${id}/score`, { addRuns, addWicket });
      await load();
    } finally { setLoading(false); }
  }

  async function nextInnings() {
    setLoading(true);
    try {
      await api.post(`/matches/${id}/next-innings`);
      await load();
    } catch (e) {
      alert(e?.response?.data?.error || "NEXT_INNINGS_FAILED");
    } finally { setLoading(false); }
  }

  async function finish() {
    const res = prompt("Result (optional, auto if blank):", m?.result || "");
    setLoading(true);
    try {
      await api.post(`/matches/${id}/finish`, { result: res || undefined });
      await load();
    } finally { setLoading(false); }
  }

  if (!m) {
    return (
      <div className="min-h-screen grid place-items-center bg-gradient-to-br from-gray-900 via-black to-gray-800">
        <div className="text-white/80">Loading…</div>
      </div>
    );
  }

  const battingTeam = m.innings === 1 ? m.teamA : m.teamB;
  const scoreStrA = `${m.runsA}/${m.wicketsA}`;
  const scoreStrB = `${m.runsB}/${m.wicketsB}`;

  const btn = "rounded-xl px-4 py-3 font-semibold bg-white/10 border border-white/20 hover:bg-white/20";
  const btnPrimary = "rounded-xl px-4 py-3 font-semibold bg-gradient-to-r from-emerald-400 to-teal-500 text-black";

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800" />
      <div className="relative z-10 max-w-3xl mx-auto p-6 md:p-10 text-white">
        <div className="flex items-center justify-between mb-6">
          <div className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
            {m.teamA} <span className="text-white/60">vs</span> {m.teamB}
          </div>
          <button onClick={()=>nav("/admin")} className="rounded-xl px-4 py-2 border border-white/20 bg-white/10 hover:bg-white/20">← Back</button>
        </div>

        <div className="rounded-2xl bg-white/10 p-5 border border-white/15 mb-5">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-sm text-white/70">{m.teamA}</div>
              <div className="text-3xl font-bold">{scoreStrA}</div>
            </div>
            <div>
              <div className="text-sm text-white/70">{m.teamB}</div>
              <div className="text-3xl font-bold">{scoreStrB}</div>
            </div>
          </div>
          <div className="mt-3 text-center text-white/80">
            Innings: <b>{m.innings}</b> • Batting: <b>{battingTeam}</b>
            {m.finished ? <span className="ml-2 text-emerald-400 font-semibold">• {m.result}</span> : null}
          </div>
        </div>

        {!m.finished && (
          <>
            <div className="rounded-2xl bg-white/10 p-5 border border-white/15">
              <div className="text-white/80 mb-3 font-semibold">Add runs</div>
              <div className="grid grid-cols-5 gap-3">
                {[1,2,3,4,6].map(r => (
                  <button key={r} onClick={()=>bump(r,false)} disabled={loading} className={btn}>
                    +{r}
                  </button>
                ))}
                <button onClick={()=>bump(0,true)} disabled={loading} className={`${btn} border-red-500/40`}>
                  WICKET
                </button>
              </div>

              {m.innings === 1 && m.wicketsA >= 10 && (
                <div className="mt-5">
                  <button onClick={nextInnings} disabled={loading} className={btnPrimary}>
                    Start 2nd Innings
                  </button>
                </div>
              )}
            </div>

            <div className="mt-5 flex justify-end">
              <button onClick={finish} disabled={loading} className="rounded-xl px-4 py-3 font-semibold bg-gradient-to-r from-blue-500 to-indigo-600">
                Finish Match
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
