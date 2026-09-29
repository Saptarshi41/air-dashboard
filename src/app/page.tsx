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
import { aqiColor, aqiCategory } from "@/lib/aqi";

export default function Home() {
  const [hour, setHour] = useState(0);
  const [selectedStation, setSelectedStation] = useState("Anand_Vihar");
  const [coupled, setCoupled] = useState(true);
  const [data, setData] = useState<ForecastData | null>(null);

  useEffect(() => {
    getForecast().then(setData);
  }, []);

  if (!data) {
    return (
      <main className="min-h-screen bg-neutral-950 text-neutral-200 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-2">Delhi NCR 72h Coupled AQI Forecast</h1>
          <p className="text-neutral-400">Waking up the live forecast server (can take up to 30s)...</p>
        </div>
      </main>
    );
  }

  const station = data.stations.find((s) => s.station_id === selectedStation);
  const hourly = station?.hourly[hour];
  const currentAqi = hourly ? (coupled ? hourly.aqi_coupled : hourly.aqi_uncoupled) : 0;

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-200">
      {/* Header */}
      <header className="border-b border-neutral-800 px-6 py-4 flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-semibold text-white">Delhi NCR 72h Coupled AQI Forecast</h1>
          <p className="text-sm text-neutral-500">Two-way aerosol–PBL feedback model · MoES / NCMRWF Problem Statement</p>
        </div>
        <button
          onClick={() => setCoupled(!coupled)}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
            coupled ? "bg-red-600 hover:bg-red-500" : "bg-blue-600 hover:bg-blue-500"
          } text-white`}
        >
          Mode: {coupled ? "Coupled (Real Physics)" : "Uncoupled (Standard Baseline)"}
        </button>
      </header>

      {/* Main two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-4 p-4">
        {/* Left column: map + slider */}
        <div className="space-y-3">
          <div className="rounded-xl overflow-hidden border border-neutral-800">
            <MapViewer
              selectedHour={hour}
              coupled={coupled}
              onSelectStation={setSelectedStation}
            />
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 text-xs text-neutral-400 px-1">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-orange-600 inline-block" /> Stubble fire (FRP-scaled)
            </span>
            <span className="flex items-center gap-1">
              <span className="w-4 h-0 border-t-2 border-dashed border-neutral-500 inline-block" /> Smoke plume trajectory
            </span>
          </div>

          <div className="rounded-xl border border-neutral-800 p-4 bg-neutral-900">
            <TimeSlider hour={hour} onChange={setHour} />
          </div>

          <div className="rounded-xl border border-neutral-800 p-4 bg-neutral-900">
            
          </div>
        </div>

        {/* Right column: station details */}
        <div className="space-y-3">
          <div className="rounded-xl border border-neutral-800 p-4 bg-neutral-900">
            <p className="text-sm text-neutral-400">Selected station</p>
            <div className="flex items-baseline justify-between mt-1">
              <h2 className="text-lg font-semibold text-white">{station?.station_name}</h2>
              <div className="text-right">
                <span className="text-2xl font-bold" style={{ color: aqiColor(currentAqi) }}>
                  {currentAqi}
                </span>
                <p className="text-xs text-neutral-500">{aqiCategory(currentAqi)}</p>
              </div>
            </div>
          </div>

          {station && <CurrentConditions station={station} />}
          {hourly && <InversionGauge hourly={hourly} coupled={coupled} />}
          {hourly && <GrapAdvisory stage={hourly.grap_stage} action={hourly.grap_action} />}
        </div>
      </div>
    </main>
  );
}