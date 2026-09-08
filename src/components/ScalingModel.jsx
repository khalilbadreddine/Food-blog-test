import React from 'react';

export default function ScalingModel({ modelAsset, title, servings = 4 }) {
  return (
    <div className="p-8 rounded-2xl bg-[#0a192f] border border-sky-500/30 text-sky-200 font-mono text-center my-6">
      <div className="inline-block px-3 py-1 bg-sky-950 text-cyan-400 border border-cyan-500/30 rounded text-xs uppercase mb-3">
        Milestone 5 Blueprint Component Stub
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title} — Servings-Linked Model Scaler</h3>
      <p className="text-sm text-sky-300 max-w-md mx-auto mb-4">
        Servings modifier: dynamically scaling component geometry and ingredient yields ({servings} servings base).
      </p>
      <div className="text-xs text-sky-400 bg-[#0f2b48] p-3 rounded max-w-sm mx-auto border border-sky-600/30">
        Asset Path: {modelAsset || 'None specified'}
      </div>
    </div>
  );
}
