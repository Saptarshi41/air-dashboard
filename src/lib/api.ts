import forecastData from "@/data/forecast_merged.json";
import plumesData from "@/data/plumes_merged.json";
import type { ForecastData } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const TIMEOUT_MS = 5000;

async function fetchWithTimeout(url: string, timeoutMs: number) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(id);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

export async function getForecast(): Promise<ForecastData> {
  if (API_URL) {
    try {
      return await fetchWithTimeout(`${API_URL}/api/v1/forecast`, TIMEOUT_MS);
    } catch (err) {
      console.warn("Live forecast fetch failed, falling back to local data:", err);
      return forecastData as unknown as ForecastData;
    }
  }
  return forecastData as unknown as ForecastData;
}

export async function getPlumes(): Promise<typeof plumesData> {
  if (API_URL) {
    try {
      return await fetchWithTimeout(`${API_URL}/api/v1/plumes`, TIMEOUT_MS);
    } catch (err) {
      console.warn("Live plumes fetch failed, falling back to local data:", err);
      return plumesData;
    }
  }
  return plumesData;
}