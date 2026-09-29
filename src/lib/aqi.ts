export function aqiColor(aqi: number): string {
  if (aqi <= 50) return "#00e400";
  if (aqi <= 100) return "#a3ff00";
  if (aqi <= 200) return "#ffff00";
  if (aqi <= 300) return "#ff9900";
  if (aqi <= 400) return "#ff0000";
  if (aqi <= 450) return "#8f3f97";
  return "#7e0023";
}

export function aqiCategory(aqi: number): string {
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Satisfactory";
  if (aqi <= 200) return "Moderate";
  if (aqi <= 300) return "Poor";
  if (aqi <= 400) return "Very Poor";
  if (aqi <= 450) return "Severe";
  return "Severe+";
}

export function grapColor(stage: number): string {
  return ["#22c55e", "#eab308", "#f97316", "#dc2626", "#7c3aed"][stage] ?? "#666";
}