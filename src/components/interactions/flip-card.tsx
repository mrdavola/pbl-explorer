"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useSoundEffects } from "@/lib/hooks/use-sound-effects";

interface FlipCardProps {
  front: React.ReactNode;
  back: React.ReactNode;
  frontLabel?: string;
  backLabel?: string;
  color?: string;
  onFlip?: () => void;
}

export function FlipCard({
  front,
  back,
  frontLabel = "Tap to reveal",
  backLabel,
  color = "oklch(0.45 0.15 15)",
  onFlip,
}: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);
  const [hasFlippedOnce, setHasFlippedOnce] = useState(false);
  const { play } = useSoundEffects();

  function handleFlip() {
    const next = !flipped;
    setFlipped(next);
    play("click");
    if (!hasFlippedOnce && next) {
      setHasFlippedOnce(true);
      onFlip?.();
    }
  }

  return (
    <div
      className="perspective-[1000px] w-full cursor-pointer select-none"
      onClick={handleFlip}
      onKeyDown={(e) => e.key === "Enter" && handleFlip()}
      tabIndex={0}
      role="button"
      aria-label={flipped ? "Tap to see the original" : frontLabel}
    >
      <motion.div
        className="relative w-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Front */}
        <div
          className={cn(
            "w-full rounded-2xl border-2 border-border min-h-[140px] flex",
            "bg-card backface-hidden"
          )}
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="flex-1 flex items-center p-5 pr-3">
            <p className="text-lg font-medium leading-snug">{front}</p>
          </div>
          <div className="flex items-center pr-4 pl-2 border-l border-border/50">
            <div className="flex flex-col items-center gap-1.5">
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-8 h-8 rounded-full border-2 flex items-center justify-center"
                style={{ borderColor: color, color }}
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M5 3L9 7L5 11"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
              <span className="text-[10px] font-medium text-muted-foreground leading-tight text-center w-12">
                Tap
              </span>
            </div>
          </div>
        </div>

        {/* Back */}
        <div
          className={cn(
            "absolute inset-0 w-full rounded-2xl border-2 min-h-[140px] flex",
            "backface-hidden text-white"
          )}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            backgroundColor: color,
            borderColor: color,
          }}
        >
          <div className="flex-1 flex items-center p-5 pr-3">
            <p className="text-lg font-medium leading-snug">{back}</p>
          </div>
          <div className="flex items-center pr-4 pl-2 border-l border-white/20">
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-8 h-8 rounded-full border-2 border-white/50 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M9 3L5 7L9 11"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="text-[10px] font-medium opacity-60 leading-tight text-center w-12">
                Flip
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

interface FlipCardGridProps {
  cards: { front: React.ReactNode; back: React.ReactNode }[];
  color?: string;
  onAllFlipped?: () => void;
}

export function FlipCardGrid({
  cards,
  color,
  onAllFlipped,
}: FlipCardGridProps) {
  const [flippedCount, setFlippedCount] = useState(0);

  function handleFlip() {
    const next = flippedCount + 1;
    setFlippedCount(next);
    if (next === cards.length) {
      onAllFlipped?.();
    }
  }

  return (
    <div className="grid gap-5">
      {cards.map((card, i) => (
        <FlipCard
          key={i}
          front={card.front}
          back={card.back}
          color={color}
          onFlip={handleFlip}
          frontLabel="Tap to see the PBL version"
          backLabel="PBL approach"
        />
      ))}
    </div>
  );
}
