import React from "react";

export default function PageWrapper({ title, onBack, children }) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Night gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-800"></div>

      {/* Stars layers */}
      <div
        className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-50 animate-stars"
        aria-hidden="true"
      ></div>
      <div
        className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/tiny-stars.png')] opacity-70 animate-stars"
        aria-hidden="true"
      ></div>

      {/* Moon */}
      <div className="absolute top-10 right-20 w-32 h-32 rounded-full bg-yellow-300 shadow-[0_0_60px_15px_rgba(255,255,200,0.5)]"></div>

      {/* Foreground */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          {onBack && (
            <button
              onClick={onBack}
              className="rounded-xl border border-gray-300 px-4 py-2 bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm transition"
            >
              ← Back
            </button>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}
