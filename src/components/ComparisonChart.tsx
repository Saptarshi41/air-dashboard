"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { HourlyRecord } from "@/lib/types";

export default function ComparisonChart({ hourly }: { hourly: HourlyRecord[] }) {
  const chartData = hourly.map((h) => ({
    hour: h.h,
    Uncoupled: h.aqi_uncoupled,
    Coupled: h.aqi_coupled,
  }));

  return (
    <div style={{ marginTop: "1.5rem", maxWidth: 700 }}>
      <h3>72-Hour AQI: Coupled vs Uncoupled</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
          <XAxis dataKey="hour" label={{ value: "Hour", position: "insideBottom", offset: -5 }} />
          <YAxis label={{ value: "AQI", angle: -90, position: "insideLeft" }} />
          <Tooltip contentStyle={{ background: "#1a1a1a", border: "1px solid #444" }} />
          <Legend />
          <Line type="monotone" dataKey="Uncoupled" stroke="#3b82f6" dot={false} strokeWidth={2} />
          <Line type="monotone" dataKey="Coupled" stroke="#dc2626" dot={false} strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}