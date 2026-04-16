"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useSoundEffects } from "@/lib/hooks/use-sound-effects";
import { ContinueButton } from "@/components/learn/lesson-shell";

interface SnapPoint {
  value: number;
  label: string;
  feedback: string;
}

interface SliderSpectrumProps {
  question: string;
  leftLabel: string;
  rightLabel: string;
  snapPoints: SnapPoint[];
  onComplete: () => void;
  moduleColor?: string;
}

export function SliderSpectrum({
  question,
  leftLabel,
  rightLabel,
  snapPoints,
  onComplete,
  moduleColor = "oklch(0.45 0.15 15)",
}: SliderSpectrumProps) {
  const { play } = useSoundEffects();

  // Sort snap points by value for consistent behavior
  const sorted = useMemo(
    () => [...snapPoints].sort((a, b) => a.value - b.value),
    [snapPoints]
  );

  const min = sorted[0]?.value ?? 0;
  const max = sorted[sorted.length - 1]?.value ?? 100;

  // Start in the middle
  const midValue = (min + max) / 2;
  const [value, setValue] = useState(midValue);
  const [hasMoved, setHasMoved] = useState(false);
  const [activeSnap, setActiveSnap] = useState<SnapPoint | null>(null);
  const lastSnapRef = useRef<number | null>(null);

  const findNearestSnap = useCallback(
    (v: number): SnapPoint => {
      let nearest = sorted[0];
      let nearestDist = Math.abs(v - nearest.value);
      for (const sp of sorted) {
        const dist = Math.abs(v - sp.value);
        if (dist < nearestDist) {
          nearest = sp;
          nearestDist = dist;
        }
      }
      return nearest;
    },
    [sorted]
  );

  function handleChange(rawValue: number) {
    const snap = findNearestSnap(rawValue);

    // Snap the value to the nearest snap point
    setValue(snap.value);
    setActiveSnap(snap);

    if (!hasMoved) setHasMoved(true);

    // Play click sound when crossing to a new snap point
    if (lastSnapRef.current !== snap.value) {
      lastSnapRef.current = snap.value;
      play("click");
    }
  }

  // Calculate the fill percentage for the track
  const fillPercent = ((value - min) / (max - min)) * 100;

  return (
    <div className="w-full space-y-8 pb-28">
      {/* Question */}
      <p className="text-xl font-semibold leading-snug text-foreground">
        {question}
      </p>

      {/* Slider area */}
      <div className="px-0">
        {/* End labels */}
        <div className="flex justify-between items-end mb-3 px-1">
          <span className="text-base font-medium text-muted-foreground max-w-[40%] leading-tight">
            {leftLabel}
          </span>
          <span className="text-base font-medium text-muted-foreground max-w-[40%] leading-tight text-right">
            {rightLabel}
          </span>
        </div>

        {/* Custom slider track */}
        <div className="relative w-full h-12 flex items-center">
          {/* Track background */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-2 rounded-full bg-muted" />

          {/* Track fill */}
          <div
            className="absolute top-1/2 -translate-y-1/2 left-0 h-2 rounded-full transition-[width] duration-75"
            style={{
              width: `${fillPercent}%`,
              backgroundColor: moduleColor,
              opacity: 0.5,
            }}
          />

          {/* Snap point dots */}
          {sorted.map((sp) => {
            const left = ((sp.value - min) / (max - min)) * 100;
            const isActive = activeSnap?.value === sp.value;
            return (
              <div
                key={sp.value}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                style={{ left: `${left}%` }}
              >
                <div
                  className={cn(
                    "w-3 h-3 rounded-full border-2 transition-colors duration-150",
                    isActive ? "border-transparent" : "border-muted-foreground/30 bg-background"
                  )}
                  style={
                    isActive
                      ? { backgroundColor: moduleColor, borderColor: moduleColor }
                      : undefined
                  }
                />
              </div>
            );
          })}

          {/* Native range input (invisible but handles interaction) */}
          <input
            type="range"
            min={min}
            max={max}
            step={1}
            value={value}
            onChange={(e) => handleChange(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            aria-label={question}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={value}
            aria-valuetext={activeSnap?.label}
          />

          {/* Custom thumb */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none z-20"
            style={{ left: `${fillPercent}%` }}
            animate={{ scale: hasMoved ? 1 : [1, 1.1, 1] }}
            transition={
              hasMoved
                ? { duration: 0.15 }
                : { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
            }
          >
            <div
              className={cn(
                "w-11 h-11 rounded-full shadow-lg border-4 border-white",
                "flex items-center justify-center"
              )}
              style={{ backgroundColor: moduleColor, minWidth: 44, minHeight: 44 }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="text-white"
              >
                <path
                  d="M4 6L2 8L4 10M12 6L14 8L12 10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </motion.div>
        </div>

        {/* Snap point labels below slider */}
        <div className="relative w-full mt-2 h-6">
          {sorted.map((sp) => {
            const left = ((sp.value - min) / (max - min)) * 100;
            return (
              <span
                key={sp.value}
                className={cn(
                  "absolute text-[11px] -translate-x-1/2 transition-colors duration-150",
                  activeSnap?.value === sp.value
                    ? "font-semibold text-foreground"
                    : "text-muted-foreground/60"
                )}
                style={{ left: `${left}%` }}
              >
                {sp.label}
              </span>
            );
          })}
        </div>
      </div>

      {/* Feedback text */}
      <div className="min-h-[80px]">
        <AnimatePresence mode="wait">
          {activeSnap && (
            <motion.div
              key={activeSnap.value}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="rounded-xl border border-border bg-card p-4"
            >
              <p className="text-base leading-relaxed text-foreground/90">
                {activeSnap.feedback}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Continue button — appears after user has moved the slider */}
      {hasMoved && (
        <ContinueButton onClick={onComplete} moduleColor={moduleColor} />
      )}
    </div>
  );
}
