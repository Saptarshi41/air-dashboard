"use client";
import { useEffect, useState } from "react";
import MapViewer from "@/components/MapViewer";
import TimeSlider from "@/components/TimeSlider";
import InversionGauge from "@/components/InversionGauge";
import GrapAdvisory from "@/components/GrapAdvisory";
import ComparisonChart from "@/components/ComparisonChart";
import CurrentConditions from "@/components/CurrentConditions";
import { getForecast } from "@/lib/api";
import { ForecastData } from "@/lib/types";
import { aqiColor } from "@/lib/aqi";

export default function Home() {
  const [hour, setHour] = useState(0);
  const [selectedStation, setSelectedStation] = useState("Anand_Vihar");
  const [coupled, setCoupled] = useState(true);
  const [data, setData] = useState<ForecastData | null>(null);

  useEffect(() => {
    getForecast().then(setData);
  }, []);

if (!data)
  return (
    <main style={{ padding: "1rem", color: "#aaa" }}>
      <h1>Delhi NCR 72h Coupled AQI Forecast</h1>
      <p>Waking up the live forecast server (can take up to 30s on first load)...</p>
    </main>
  );

  const station = data.stations.find((s) => s.station_id === selectedStation);
  const hourly = station?.hourly[hour];
  const currentAqi = hourly ? (coupled ? hourly.aqi_coupled : hourly.aqi_uncoupled) : 0;

  return (
    <main style={{ padding: "1rem" }}>
      <h1>Delhi NCR 72h Coupled AQI Forecast</h1>

      <button
        onClick={() => setCoupled(!coupled)}
        style={{
          padding: "0.6rem 1.2rem",
          borderRadius: 8,
          border: "none",
          fontWeight: 600,
          cursor: "pointer",
          marginBottom: "1rem",
          background: coupled ? "#dc2626" : "#3b82f6",
          color: "white",
        }}
      >
        Mode: {coupled ? "Coupled (Real Physics)" : "Uncoupled (Standard Baseline)"}
      </button>

      <MapViewer
        selectedHour={hour}
        coupled={coupled}
        onSelectStation={setSelectedStation}
      />
      <TimeSlider hour={hour} onChange={setHour} />
      <p>
        Selected station: {station?.station_name} — Current AQI:{" "}
        <b style={{ color: aqiColor(currentAqi) }}>{currentAqi}</b>
      </p>

      {station && <CurrentConditions station={station} />}

      {hourly && (
        <>
          <InversionGauge hourly={hourly} coupled={coupled} />
          <GrapAdvisory stage={hourly.grap_stage} action={hourly.grap_action} />
          {station && <ComparisonChart hourly={station.hourly} />}
        </>
      )}
    </main>
  );
}