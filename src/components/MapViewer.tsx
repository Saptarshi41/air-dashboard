"use client";
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { getForecast, getPlumes } from "@/lib/api";
import { aqiColor } from "@/lib/aqi";
import { ForecastData } from "@/lib/types";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

export default function MapViewer({
  selectedHour,
  coupled,
  onSelectStation,
}: {
  selectedHour: number;
  coupled: boolean;
  onSelectStation: (id: string) => void;
}) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [data, setData] = useState<ForecastData | null>(null);

  // Load the forecast data once when the component mounts
  useEffect(() => {
    getForecast().then(setData);
  }, []);

  // Initialize the map once when the component mounts
  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;
    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [77.209, 28.6139], // Delhi NCR
      zoom: 9.3,
    });
  }, []);

  // Load and render fire/plume overlay once the map has finished loading
  useEffect(() => {
    if (!mapRef.current) return;

    mapRef.current.on("load", async () => {
      const plumes = await getPlumes();

      if (mapRef.current!.getSource("plumes")) return; // guard against double-add in dev mode

      mapRef.current!.addSource("plumes", {
        type: "geojson",
        data: plumes as any,
      });

      mapRef.current!.addLayer({
        id: "smoke-lines",
        type: "line",
        source: "plumes",
        filter: ["==", ["get", "entity"], "smoke_plume"],
        paint: {
          "line-color": "#aaaaaa",
          "line-width": 2,
          "line-dasharray": [2, 2],
        },
      });

      mapRef.current!.addLayer({
        id: "fire-points",
        type: "circle",
        source: "plumes",
        filter: ["==", ["get", "entity"], "active_fire"],
        paint: {
          "circle-radius": ["interpolate", ["linear"], ["get", "frp"], 30, 5, 100, 12],
          "circle-color": "#ff4500",
          "circle-stroke-width": 1,
          "circle-stroke-color": "#ffffff",
        },
      });
    });
  }, []);

  // Re-draw station pins whenever data, hour, or coupled/uncoupled mode changes
  useEffect(() => {
    if (!data || !mapRef.current) return;

    // remove old pins before drawing new ones
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    data.stations.forEach((station) => {
      const hr = station.hourly[selectedHour];
      const aqi = coupled ? hr.aqi_coupled : hr.aqi_uncoupled;

      const el = document.createElement("div");
      el.style.width = "22px";
      el.style.height = "22px";
      el.style.borderRadius = "50%";
      el.style.background = aqiColor(aqi);
      el.style.border = "2px solid white";
      el.style.cursor = "pointer";
      el.title = `${station.station_name}: AQI ${aqi}`;
      el.onclick = () => onSelectStation(station.station_id);

      const marker = new mapboxgl.Marker(el)
        .setLngLat(station.coordinates)
        .addTo(mapRef.current!);
      markersRef.current.push(marker);
    });
  }, [data, selectedHour, coupled]);

  return <div ref={mapContainer} style={{ width: "100%", height: "650px" }} />;
}