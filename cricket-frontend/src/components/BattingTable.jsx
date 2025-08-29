import React from "react";

export default function BattingTable({ title, batting = [], extras, yetToBat = [] }) {
  return (
    <div className="rounded-2xl border border-green-500 p-5 bg-white/5 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-white text-xl font-semibold">{title}</h3>
      </div>

      <div className="mt-3 overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="text-white/80">
            <tr className="border-b border-white/10">
              <th className="py-2 pr-4">Batsman</th>
              <th className="py-2 px-2 text-right">R</th>
              <th className="py-2 px-2 text-right">B</th>
              <th className="py-2 px-2 text-right">4s</th>
              <th className="py-2 px-2 text-right">6s</th>
              <th className="py-2 pl-2 text-right">SR</th>
            </tr>
          </thead>
          <tbody className="text-gray-100">
            {batting.map((p, i) => (
              <tr key={i} className="border-b border-white/5">
                <td className="py-2 pr-4">
                  <div className="font-medium">{p.name}{p.out === "not out" ? " *" : ""}</div>
                  <div className="text-xs text-white/60">{p.out}</div>
                </td>
                <td className="py-2 px-2 text-right">{p.r}</td>
                <td className="py-2 px-2 text-right">{p.b}</td>
                <td className="py-2 px-2 text-right">{p._4}</td>
                <td className="py-2 px-2 text-right">{p._6}</td>
                <td className="py-2 pl-2 text-right">{p.sr}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {extras && <div className="mt-3 text-sm text-white/80">Extras: {extras}</div>}
      {yetToBat?.length > 0 && (
        <div className="mt-1 text-xs text-white/60">Yet to bat: {yetToBat.join(", ")}</div>
      )}
    </div>
  );
}
