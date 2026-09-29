"use client";
import { Station } from "@/lib/types";

export default function CurrentConditions({ station }: { station: Station }) {
  const cc = station.current_conditions;

  if (!cc) {
    return (
      <div
        style={{
          border: "1px solid #333",
          padding: "1rem",
          borderRadius: 8,
          marginTop: "1rem",
          maxWidth: 320,
          color: "#888",
        }}
      >
        No current-conditions snapshot available for this station.
      </div>
    );
  }

  const isCritical = cc.dispersion.toLowerCase().includes("critical");

  return (
    <div
      style={{
        border: "1px solid #333",
        padding: "1rem",
        borderRadius: 8,
        marginTop: "1rem",
        maxWidth: 320,
        background: "#111",
      }}
    >
      <h3 style={{ marginTop: 0, marginBottom: "0.5rem" }}>
        Current Conditions (Live Snapshot)
      </h3>
      <p>
        Inversion ΔT: <b>{cc.inversion_delta_c}°C</b>
      </p>
      <p>
        Ventilation Index: <b>{cc.ventilation_index} m²/s</b>
      </p>
      <p>
        Dispersion Status:{" "}
        <b style={{ color: isCritical ? "#ff4d4d" : "#4dff88" }}>
          {cc.dispersion}
        </b>
      </p>
    </div>
  );
}