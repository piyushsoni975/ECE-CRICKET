import React from "react";

export default function MatchCard({ type, m, onClick }) {
  const badge =
    type === "live" ? "bg-red-600 text-white"
    : type === "past" ? "bg-blue-600 text-white"
    : "bg-yellow-400 text-black";

  return (
    <div
      onClick={onClick}
      className="rounded-2xl border border-green-500 p-5 md:p-6 cursor-pointer hover:bg-white/5 transition"
    >
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h3 className="text-lg md:text-xl font-semibold text-white">
          {m.teamA} <span className="text-gray-400">vs</span> {m.teamB}
        </h3>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badge}`}>
          {type === "live" ? "LIVE" : type === "past" ? "RESULT" : "UPCOMING"}
        </span>
      </div>

      <div className="mt-1 text-sm md:text-base text-gray-300">
        {m.time} {m.venue ? `• ${m.venue}` : ""}
      </div>

      {type === "live" && (
        <div className="mt-3 grid md:grid-cols-2 gap-2">
          <div className="font-medium text-white">
            {m.teamA}: {m.scoreA} ({m.oversA} ov)
          </div>
          <div className="font-medium text-white">
            {m.teamB}: {m.scoreB} ({m.oversB} ov)
          </div>
          <div className="md:col-span-2 text-sm text-red-400 font-semibold flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            {m.status || "Live • refreshing every over"}
          </div>
        </div>
      )}

      {type === "past" && (
        <div className="mt-3 text-base md:text-lg font-medium text-gray-100">
          {m.result}
        </div>
      )}

      {type === "upcoming" && (
        <div className="mt-3 text-base md:text-lg font-medium text-yellow-300">
          Coming soon
        </div>
      )}
    </div>
  );
}
