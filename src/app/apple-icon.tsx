import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          borderRadius: 40,
          background: "linear-gradient(145deg, #9B3A48 0%, #6B2631 40%, #4A1520 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Top-left highlight */}
        <div
          style={{
            position: "absolute",
            top: -20,
            left: -20,
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Bottom-right warm glow */}
        <div
          style={{
            position: "absolute",
            bottom: -30,
            right: -30,
            width: 100,
            height: 100,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(212,165,116,0.12) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Compass icon */}
        <svg width="110" height="110" viewBox="0 0 110 110" fill="none">
          {/* Outer ring */}
          <circle cx="55" cy="55" r="48" stroke="rgba(255,255,255,0.8)" strokeWidth="2.5" fill="none" />
          {/* Inner ring */}
          <circle cx="55" cy="55" r="42" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none" />

          {/* Cardinal tick marks */}
          <path d="M55 7V18" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" />
          <path d="M55 92V103" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" />
          <path d="M7 55H18" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" />
          <path d="M92 55H103" stroke="rgba(255,255,255,0.5)" strokeWidth="2" strokeLinecap="round" />

          {/* Intercardinal ticks */}
          <path d="M21.5 21.5L28 28" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M88.5 21.5L82 28" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M21.5 88.5L28 82" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M88.5 88.5L82 82" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeLinecap="round" />

          {/* Compass needle — NE quadrant (gold) */}
          <path d="M55 20L70 55L55 47Z" fill="#D4A574" />
          {/* Compass needle — SW quadrant (gold darker) */}
          <path d="M55 90L40 55L55 63Z" fill="#B8895A" />
          {/* Compass needle — NW quadrant (white) */}
          <path d="M55 20L40 55L55 47Z" fill="rgba(255,255,255,0.85)" />
          {/* Compass needle — SE quadrant (white dimmer) */}
          <path d="M55 90L70 55L55 63Z" fill="rgba(255,255,255,0.5)" />

          {/* Center ring */}
          <circle cx="55" cy="55" r="6" fill="#D4A574" />
          <circle cx="55" cy="55" r="3.5" fill="#6B2631" />
          <circle cx="55" cy="55" r="1.5" fill="#D4A574" />

        </svg>

        {/* App name */}
        <div
          style={{
            display: "flex",
            marginTop: -6,
            fontSize: 13,
            fontWeight: 700,
            color: "rgba(255,255,255,0.85)",
            letterSpacing: 4,
            textTransform: "uppercase" as const,
          }}
        >
          PBL
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
