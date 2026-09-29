"use client";
import { grapColor } from "@/lib/aqi";

export default function GrapAdvisory({
  stage,
  action,
}: {
  stage: number;
  action: string;
}) {
  return (
    <div
      style={{
        background: grapColor(stage),
        padding: "0.75rem 1rem",
        borderRadius: 8,
        color: "white",
        marginTop: "1rem",
        maxWidth: 500,
        fontWeight: 500,
      }}
    >
       {action}
    </div>
  );
}