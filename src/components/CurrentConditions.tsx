"use client";
import { Station } from "@/lib/types";

export default function CurrentConditions({ station }: { station: Station }) {
  const cc = station.current_conditions;

  if (!cc) {
    return (
      <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4 text-neutral-500 text-sm">
        No current-conditions snapshot available for this station.
      </div>
    );
  }

  const isCritical = cc.dispersion.toLowerCase().includes("critical");

  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4">
      <h3 className="text-sm font-medium text-neutral-400 mb-3">
        Current Conditions (Live Snapshot)
      </h3>
      <div className="space-y-1.5 text-sm">
        <p className="flex justify-between">
          <span className="text-neutral-400">Inversion ΔT</span>
          <span className="font-semibold text-white">{cc.inversion_delta_c}°C</span>
        </p>
        <p className="flex justify-between">
          <span className="text-neutral-400">Ventilation Index</span>
          <span className="font-semibold text-white">{cc.ventilation_index} m²/s</span>
        </p>
        <p className="flex justify-between">
          <span className="text-neutral-400">Dispersion Status</span>
          <span className={`font-semibold ${isCritical ? "text-red-400" : "text-green-400"}`}>
            {cc.dispersion}
          </span>
        </p>
      </div>
    </div>
  );
}