export interface HourlyRecord {
  h: number;
  time: string;
  pm25_uncoupled: number;
  pm25_coupled: number;
  aqi_uncoupled: number;
  aqi_coupled: number;
  aqi_source: string;
  pbl_uncoupled: number;
  pbl_coupled: number;
  dimming_pct: number;
  ventilation_uncoupled: number;
  ventilation_coupled: number;
  stagnation_coupled: boolean;
  inversion_gamma: number;
  grap_stage: number;
  grap_action: string;
}

export interface Station {
  station_id: string;
  station_name: string;
  coordinates: [number, number]; // [lon, lat]
  current_conditions: {
    inversion_delta_c: number;
    ventilation_index: number;
    dispersion: string;
  } | null;
  hourly: HourlyRecord[];
}

export interface ForecastData {
  meta: Record<string, any>;
  stations: Station[];
}