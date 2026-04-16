import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: "linear-gradient(135deg, #8B2E3B 0%, #5C1A25 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle glow */}
        <div
          style={{
            position: "absolute",
            top: -6,
            left: -6,
            width: 20,
            height: 20,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)",
            display: "flex",
          }}
        />
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          {/* Compass outer ring */}
          <circle cx="11" cy="11" r="9" stroke="rgba(255,255,255,0.85)" strokeWidth="1.2" fill="none" />
          {/* Cardinal tick marks */}
          <path d="M11 2.5V4.5" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
          <path d="M11 17.5V19.5" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
          <path d="M2.5 11H4.5" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
          <path d="M17.5 11H19.5" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
          {/* Compass needle — north (gold) */}
          <path d="M11 4.5L13 11L11 9.5L9 11Z" fill="#D4A574" />
          {/* Compass needle — south (white) */}
          <path d="M11 17.5L9 11L11 12.5L13 11Z" fill="rgba(255,255,255,0.7)" />
          {/* Center dot */}
          <circle cx="11" cy="11" r="1.5" fill="#D4A574" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
