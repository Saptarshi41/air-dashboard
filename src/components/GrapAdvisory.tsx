"use client";

const STAGE_STYLES = [
  "bg-green-900/40 border-green-700 text-green-300",
  "bg-yellow-900/40 border-yellow-700 text-yellow-300",
  "bg-orange-900/40 border-orange-700 text-orange-300",
  "bg-red-900/40 border-red-700 text-red-300",
  "bg-purple-900/40 border-purple-700 text-purple-300",
];

export default function GrapAdvisory({ stage, action }: { stage: number; action: string }) {
  const style = STAGE_STYLES[stage] ?? STAGE_STYLES[0];

  return (
    <div className={`rounded-xl border p-4 ${style}`}>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xs font-bold uppercase tracking-wide opacity-70">
          GRAP Status
        </span>
        {stage >= 3 && <span className="text-lg">⚠️</span>}
      </div>
      <p className="font-semibold">{action}</p>
    </div>
  );
}