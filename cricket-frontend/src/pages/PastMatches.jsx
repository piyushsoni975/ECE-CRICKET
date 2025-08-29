import React, { useEffect, useState } from "react";
import { api } from "../api";
import PageWrapper from "../components/PageWrapper";

export default function PastMatches() {
  const [items, setItems] = useState([]);
  useEffect(() => { (async () => {
    const { data } = await api.get("/matches"); setItems((data.items||[]).filter(m=>m.finished));
  })(); }, []);

  return (
    <PageWrapper title="Results" onBack={() => history.back()}>
      <div className="space-y-4">
        {items.map(m => (
          <div key={m._id} className="p-4 rounded-2xl bg-white/10 border border-white/20 text-white">
            <div className="font-semibold text-lg">{m.teamA} <span className="text-white/60">vs</span> {m.teamB}</div>
            <div className="mt-1 text-sm text-white/80">
              {m.teamA}: <b>{m.runsA}/{m.wicketsA}</b> ({m.oversA} ov) • {m.teamB}: <b>{m.runsB}/{m.wicketsB}</b> ({m.oversB} ov)
            </div>
            <div className="mt-1 text-emerald-400 font-semibold">{m.result}</div>
          </div>
        ))}
      </div>
    </PageWrapper>
  );
}
