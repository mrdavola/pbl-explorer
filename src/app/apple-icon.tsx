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
        {/* Top-left radial highlight for depth */}
        <div
          style={{
            position: "absolute",
            top: -20,
            left: -20,
            width: 120,
            height: 120,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Bottom ambient glow */}
        <div
          style={{
            position: "absolute",
            bottom: -30,
            right: -30,
            width: 100,
            height: 100,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(212,165,116,0.15) 0%, transparent 70%)",
            display: "flex",
          }}
        />

        {/* Main icon — open book with compass */}
        <svg
          width="100"
          height="100"
          viewBox="0 0 100 100"
          fill="none"
        >
          {/* Book shadow */}
          <path
            d="M50 28C50 28 38 18 18 18C18 18 12 18 12 24V76C12 82 18 82 18 82C38 82 50 92 50 92C50 92 62 82 82 82C82 82 88 82 88 76V24C88 18 82 18 82 18C62 18 50 28 50 28Z"
            fill="rgba(0,0,0,0.15)"
            transform="translate(1, 2)"
          />
          {/* Book body */}
          <path
            d="M50 28C50 28 38 18 18 18C18 18 12 18 12 24V76C12 82 18 82 18 82C38 82 50 92 50 92C50 92 62 82 82 82C82 82 88 82 88 76V24C88 18 82 18 82 18C62 18 50 28 50 28Z"
            fill="rgba(255,255,255,0.92)"
          />
          {/* Left page lines */}
          <path d="M22 34H42" stroke="rgba(107,38,49,0.2)" strokeWidth="2" strokeLinecap="round" />
          <path d="M22 42H40" stroke="rgba(107,38,49,0.15)" strokeWidth="2" strokeLinecap="round" />
          <path d="M22 50H38" stroke="rgba(107,38,49,0.1)" strokeWidth="2" strokeLinecap="round" />
          {/* Right page lines */}
          <path d="M58 34H78" stroke="rgba(107,38,49,0.2)" strokeWidth="2" strokeLinecap="round" />
          <path d="M60 42H78" stroke="rgba(107,38,49,0.15)" strokeWidth="2" strokeLinecap="round" />
          <path d="M62 50H78" stroke="rgba(107,38,49,0.1)" strokeWidth="2" strokeLinecap="round" />
          {/* Center spine */}
          <path
            d="M50 28V92"
            stroke="rgba(107,38,49,0.3)"
            strokeWidth="2"
          />
          {/* Compass rose */}
          <path
            d="M50 38L56 52L50 66L44 52Z"
            fill="#6B2631"
            opacity="0.9"
          />
          <path
            d="M50 38L56 52L50 52Z"
            fill="#8B3A48"
          />
          <path
            d="M50 52L50 66L44 52Z"
            fill="#4A1520"
          />
          {/* Compass center */}
          <circle cx="50" cy="52" r="4" fill="#D4A574" />
          <circle cx="50" cy="52" r="2" fill="#6B2631" />
          {/* North indicator */}
          <circle cx="50" cy="40" r="1.5" fill="#D4A574" />
        </svg>

        {/* App name below icon */}
        <div
          style={{
            display: "flex",
            marginTop: -4,
            fontSize: 14,
            fontWeight: 700,
            color: "rgba(255,255,255,0.9)",
            letterSpacing: 3,
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
