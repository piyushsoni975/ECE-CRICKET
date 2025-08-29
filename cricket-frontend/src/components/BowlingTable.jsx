import React from "react";

export default function BowlingTable({ title, bowling = [] }) {
  return (
    <div className="rounded-2xl border border-green-500 p-5 bg-white/5 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-white text-xl font-semibold">{title}</h3>
      </div>

      <div className="mt-3 overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="text-white/80">
            <tr className="border-b border-white/10">
              <th className="py-2 pr-4">Bowler</th>
              <th className="py-2 px-2 text-right">O</th>
              <th className="py-2 px-2 text-right">R</th>
              <th className="py-2 px-2 text-right">W</th>
              <th className="py-2 pl-2 text-right">Econ</th>
            </tr>
          </thead>
          <tbody className="text-gray-100">
            {bowling.map((p, i) => (
              <tr key={i} className="border-b border-white/5">
                <td className="py-2 pr-4 font-medium">{p.name}</td>
                <td className="py-2 px-2 text-right">{p.o}</td>
                <td className="py-2 px-2 text-right">{p.r}</td>
                <td className="py-2 px-2 text-right">{p.w}</td>
                <td className="py-2 pl-2 text-right">{p.eco}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
