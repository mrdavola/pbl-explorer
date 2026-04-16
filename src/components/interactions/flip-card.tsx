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
  const { play } = useSoundEffects();

  function handleFlip() {
    if (!flipped) {
      setFlipped(true);
      play('click');
      onFlip?.();
    }
  }

  return (
    <div
      className="perspective-[1000px] w-full cursor-pointer"
      onClick={handleFlip}
      onKeyDown={(e) => e.key === "Enter" && handleFlip()}
      tabIndex={0}
      role="button"
      aria-label={flipped ? "Card revealed" : "Tap to reveal"}
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
            "w-full rounded-2xl border-2 border-border p-6 min-h-[160px] flex flex-col justify-between",
            "bg-card backface-hidden"
          )}
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="text-base font-medium leading-relaxed">{front}</div>
          <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1.5">
            <span className="inline-block w-4 h-4 rounded-full border-2 border-current" />
            {frontLabel}
          </p>
        </div>

        {/* Back */}
        <div
          className={cn(
            "absolute inset-0 w-full rounded-2xl border-2 p-6 min-h-[160px] flex flex-col justify-between",
            "backface-hidden text-white"
          )}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            backgroundColor: color,
            borderColor: color,
          }}
        >
          <div className="text-base font-medium leading-relaxed">{back}</div>
          {backLabel && (
            <p className="text-xs opacity-70 mt-3">{backLabel}</p>
          )}
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
    <div className="grid gap-4">
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
