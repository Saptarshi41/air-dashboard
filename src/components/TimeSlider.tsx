"use client";
export default function TimeSlider({
  hour,
  onChange,
}: {
  hour: number;
  onChange: (h: number) => void;
}) {
  return (
    <div style={{ padding: "1rem 0" }}>
      <label>Forecast Hour: +{hour}h</label>
      <input
        type="range"
        min={0}
        max={72}
        value={hour}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: "100%" }}
      />
    </div>
  );
}