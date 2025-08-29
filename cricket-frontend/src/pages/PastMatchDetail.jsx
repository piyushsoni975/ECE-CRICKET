import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import BattingTable from "../components/BattingTable";
import BowlingTable from "../components/BowlingTable";
import { getPastById } from "../data/matches";

export default function PastMatchDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const m = getPastById(id);

  if (!m) {
    return (
      <PageWrapper title="Past Match" onBack={() => nav("/matches/past")}>
        <div className="text-white">Match not found.</div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper title={`${m.teamA} vs ${m.teamB}`} onBack={() => nav("/matches/past")}>
      <div className="rounded-2xl border border-green-500 p-5 bg-white/5 backdrop-blur-sm mb-5">
        <div className="flex items-center justify-between">
          <h3 className="text-white text-xl font-semibold">Result</h3>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-600 text-white">FINAL</span>
        </div>
        <div className="mt-3 text-lg font-semibold text-white">{m.result}</div>
        <div className="mt-3 grid grid-cols-2 gap-3 text-white/90">
          <div>Time</div><div className="text-right">{m.time}</div>
          <div>Venue</div><div className="text-right">{m.venue}</div>
          <div>Umpires</div><div className="text-right">{m.umpires}</div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {/* Innings 1 */}
        <div className="space-y-5">
          <BattingTable
            title={`Batting — ${m.innings1.team} (${m.innings1.total})`}
            batting={m.innings1.batting}
            extras={m.innings1.extras}
          />
          <BowlingTable
            title={`Bowling vs ${m.innings1.team}`}
            bowling={m.innings1.bowling}
          />
        </div>

        {/* Innings 2 */}
        <div className="space-y-5">
          <BattingTable
            title={`Batting — ${m.innings2.team} (${m.innings2.total})`}
            batting={m.innings2.batting}
            extras={m.innings2.extras}
          />
          <BowlingTable
            title={`Bowling vs ${m.innings2.team}`}
            bowling={m.innings2.bowling}
          />
        </div>
      </div>
    </PageWrapper>
  );
}
