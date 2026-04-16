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
        {/* Subtle radial glow */}
        <div
          style={{
            position: "absolute",
            top: -4,
            left: -4,
            width: 24,
            height: 24,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)",
            display: "flex",
          }}
        />
        {/* Stylized compass/book mark */}
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
        >
          {/* Open book shape */}
          <path
            d="M11 5C11 5 8 3 4 3C4 3 3 3 3 4V16C3 17 4 17 4 17C8 17 11 19 11 19C11 19 14 17 18 17C18 17 19 17 19 16V4C19 3 18 3 18 3C14 3 11 5 11 5Z"
            fill="rgba(255,255,255,0.9)"
          />
          {/* Center spine */}
          <path
            d="M11 5V19"
            stroke="#5C1A25"
            strokeWidth="1.2"
          />
          {/* Compass diamond accent */}
          <path
            d="M11 7L13 9.5L11 12L9 9.5Z"
            fill="#8B2E3B"
          />
          {/* Compass dot */}
          <circle cx="11" cy="9.5" r="1" fill="#D4A574" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
