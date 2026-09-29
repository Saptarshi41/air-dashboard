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
    <div
      style={{
        border: "1px solid #333",
        padding: "1rem",
        borderRadius: 8,
        marginTop: "1rem",
        maxWidth: 320,
      }}
    >
      <h3 style={{ marginTop: 0 }}>Atmospheric Status</h3>
      <p>PBL Height: <b>{pbl.toFixed(0)} m</b></p>
      <p>Solar Dimming: <b>{hourly.dimming_pct.toFixed(1)}%</b></p>
      <p>Ventilation Index: <b>{vent.toFixed(0)} m²/s</b></p>
      <p>
        Stagnation:{" "}
        <b style={{ color: hourly.stagnation_coupled ? "#ff4d4d" : "#4dff88" }}>
          {hourly.stagnation_coupled ? "CRITICAL" : "Normal"}
        </b>
      </p>
    </div>
  );
}