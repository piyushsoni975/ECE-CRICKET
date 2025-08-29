import { useEffect, useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const nav = useNavigate();
  const [teamA, setTeamA] = useState("");
  const [teamB, setTeamB] = useState("");
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);

  async function load() {
    const { data } = await api.get("/matches");
    setMatches(data.items || []);
  }
  useEffect(() => { load(); }, []);

  async function createMatch() {
    if (!teamA || !teamB) { alert("Enter both team names"); return; }
    setLoading(true);
    try {
      await api.post("/matches", { teamA, teamB });
      setTeamA(""); setTeamB("");
      await load();
    } catch (e) {
      alert(e?.response?.data?.error || "CREATE_FAILED");
    } finally { setLoading(false); }
  }

  async function remove(id) {
    if (!confirm("Delete this match?")) return;
    await api.delete(`/matches/${id}`);
    await load();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 p-6 text-white">
      <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
        Admin Match Console
      </h1>

      <div className="grid md:grid-cols-3 gap-3 mb-6">
        <input className="rounded-xl px-3 py-3 bg-white/10 text-white placeholder-white/60"
          placeholder="Team A" value={teamA} onChange={e=>setTeamA(e.target.value)} />
        <input className="rounded-xl px-3 py-3 bg-white/10 text-white placeholder-white/60"
          placeholder="Team B" value={teamB} onChange={e=>setTeamB(e.target.value)} />
        <button onClick={createMatch} disabled={loading}
          className="rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-black font-bold hover:scale-105 transition">
          {loading ? "Creating..." : "Create match"}
        </button>
      </div>

      <div className="space-y-3">
        {matches.map(m=>(
          <div key={m._id} className="p-4 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-between">
            <div>
              <div className="font-semibold">{m.teamA} <span className="text-white/60">vs</span> {m.teamB}</div>
              <div className="text-xs text-white/70 mt-1">
                Innings: {m.innings} • {m.teamA}: {m.runsA}/{m.wicketsA} • {m.teamB}: {m.runsB}/{m.wicketsB}
                {m.finished ? ` • Result: ${m.result}` : ""}
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={()=>nav(`/admin/match/${m._id}`)} className="px-4 py-1 rounded-lg bg-blue-500 hover:bg-blue-600 text-white">Edit/Score</button>
              <button onClick={()=>remove(m._id)} className="px-4 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
