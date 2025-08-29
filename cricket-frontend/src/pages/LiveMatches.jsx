import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import PageWrapper from "../components/PageWrapper";

export default function LiveMatches() {
  const nav = useNavigate();
  const [items, setItems] = useState([]);
  useEffect(() => { (async () => {
    const { data } = await api.get("/matches"); setItems((data.items||[]).filter(m=>!m.finished));
  })(); }, []);

  return (
    <PageWrapper title="Live Matches" onBack={() => nav("/dashboard")}>
      <div className="space-y-4">
        {items.map(m => (
          <div key={m._id}
               onClick={()=>nav(`/matches/live/${m._id}`)}
               className="cursor-pointer p-4 rounded-2xl bg-white/10 border border-white/20 hover:bg-white/20 transition text-white">
            <div className="flex items-center justify-between">
              <div className="font-semibold text-lg">{m.teamA} <span className="text-white/60">vs</span> {m.teamB}</div>
              <span className="px-2 py-0.5 text-xs rounded bg-red-600">LIVE</span>
            </div>
            <div className="mt-2 text-sm text-white/90">
              {m.teamA}: <b>{m.runsA}/{m.wicketsA}</b> ({m.oversA} ov) • {m.teamB}: <b>{m.runsB}/{m.wicketsB}</b> ({m.oversB} ov)
            </div>
          </div>
        ))}
      </div>
    </PageWrapper>
  );
}
