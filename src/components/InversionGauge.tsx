"use client";
import { HourlyRecord } from "@/lib/types";

export default function InversionGauge({
  hourly,
  coupled,
}: {
  hourly: HourlyRecord;
  coupled: boolean;
}) {
  const pbl = coupled ? hourly.pbl_coupled : hourly.pbl_uncoupled;
  const vent = coupled ? hourly.ventilation_coupled : hourly.ventilation_uncoupled;

  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4">
      <h3 className="text-sm font-medium text-neutral-400 mb-3">Atmospheric Status</h3>
      <div className="space-y-1.5 text-sm">
        <p className="flex justify-between">
          <span className="text-neutral-400">PBL Height</span>
          <span className="font-semibold text-white">{pbl.toFixed(0)} m</span>
        </p>
        <p className="flex justify-between">
          <span className="text-neutral-400">Solar Dimming</span>
          <span className="font-semibold text-white">{hourly.dimming_pct.toFixed(1)}%</span>
        </p>
        <p className="flex justify-between">
          <span className="text-neutral-400">Ventilation Index</span>
          <span className="font-semibold text-white">{vent.toFixed(0)} m²/s</span>
        </p>
        <p className="flex justify-between items-center">
          <span className="text-neutral-400">Stagnation</span>
          <span
            className={`text-xs font-bold px-2 py-0.5 rounded ${
              hourly.stagnation_coupled
                ? "bg-red-950 text-red-400"
                : "bg-green-950 text-green-400"
            }`}
          >
            {hourly.stagnation_coupled ? "CRITICAL" : "NORMAL"}
          </span>
        </p>
      </div>
    </div>
  );
}