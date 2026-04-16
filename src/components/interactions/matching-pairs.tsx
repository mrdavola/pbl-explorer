"use client";

import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSoundEffects } from "@/lib/hooks/use-sound-effects";

interface MatchingPairsProps {
  pairs: { id: string; left: string; right: string }[];
  leftTitle?: string;
  rightTitle?: string;
  onComplete: () => void;
  moduleColor?: string;
}

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function MatchingPairs({
  pairs,
  leftTitle,
  rightTitle,
  onComplete,
  moduleColor = "oklch(0.45 0.15 15)",
}: MatchingPairsProps) {
  const { play } = useSoundEffects();

  // Shuffle each column independently, once on mount
  const shuffledLeft = useMemo(() => shuffleArray(pairs), [pairs]);
  const shuffledRight = useMemo(() => shuffleArray(pairs), [pairs]);

  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<Set<string>>(new Set());
  const [shakingIds, setShakingIds] = useState<Set<string>>(new Set());

  const allMatched = matchedIds.size === pairs.length;

  const handleLeftTap = useCallback(
    (id: string) => {
      if (matchedIds.has(id) || shakingIds.size > 0) return;
      setSelectedLeft((prev) => (prev === id ? null : id));
    },
    [matchedIds, shakingIds]
  );

  const handleRightTap = useCallback(
    (rightId: string) => {
      if (!selectedLeft || matchedIds.has(rightId) || shakingIds.size > 0) return;

      if (selectedLeft === rightId) {
        // Correct match
        play("correct");
        setMatchedIds((prev) => new Set(prev).add(rightId));
        setSelectedLeft(null);
      } else {
        // Incorrect match
        play("incorrect");
        const shaking = new Set([selectedLeft, rightId]);
        setShakingIds(shaking);
        setTimeout(() => {
          setShakingIds(new Set());
          setSelectedLeft(null);
        }, 600);
      }
    },
    [selectedLeft, matchedIds, shakingIds, play]
  );

  return (
    <div className="flex flex-col flex-1">
      {/* Instructions */}
      <p className="text-sm font-medium text-muted-foreground mb-4">
        Tap an item on the left, then tap its match on the right.
      </p>

      {/* Mobile: stacked layout / Desktop: side-by-side */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        {/* Left column */}
        <div className="flex-1">
          {leftTitle && (
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
              {leftTitle}
            </h3>
          )}
          <div className="flex flex-col gap-2">
            {shuffledLeft.map((pair, i) => {
              const isMatched = matchedIds.has(pair.id);
              const isSelected = selectedLeft === pair.id;
              const isShaking = shakingIds.has(pair.id);

              return (
                <motion.button
                  key={pair.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                  onClick={() => handleLeftTap(pair.id)}
                  disabled={isMatched}
                  className={cn(
                    "w-full text-left px-4 py-3 min-h-[48px] rounded-xl border-2 font-medium text-sm transition-all duration-200",
                    isShaking && "shake",
                    isMatched &&
                      "opacity-50 cursor-default border-transparent",
                    !isMatched &&
                      !isSelected &&
                      "border-border bg-card hover:border-primary/30 press-scale cursor-pointer",
                    isSelected && "shadow-sm"
                  )}
                  style={
                    isMatched
                      ? {
                          backgroundColor: `color-mix(in oklch, ${moduleColor} 15%, transparent)`,
                          borderColor: moduleColor,
                        }
                      : isSelected
                        ? {
                            borderColor: moduleColor,
                            backgroundColor: `color-mix(in oklch, ${moduleColor} 8%, transparent)`,
                          }
                        : undefined
                  }
                >
                  <span className="flex items-center gap-2">
                    {isMatched && (
                      <Check
                        className="w-4 h-4 shrink-0"
                        style={{ color: moduleColor }}
                      />
                    )}
                    <span>{pair.left}</span>
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Right column */}
        <div className="flex-1">
          {rightTitle && (
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
              {rightTitle}
            </h3>
          )}
          <div className="flex flex-col gap-2">
            {shuffledRight.map((pair, i) => {
              const isMatched = matchedIds.has(pair.id);
              const isShaking = shakingIds.has(pair.id);
              const isActive = selectedLeft !== null && !isMatched;

              return (
                <motion.button
                  key={pair.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                  onClick={() => handleRightTap(pair.id)}
                  disabled={isMatched || !selectedLeft}
                  className={cn(
                    "w-full text-left px-4 py-3 min-h-[48px] rounded-xl border-2 font-medium text-sm transition-all duration-200",
                    isShaking && "shake",
                    isMatched &&
                      "opacity-50 cursor-default border-transparent",
                    !isMatched &&
                      !isActive &&
                      "border-border bg-card cursor-default",
                    !isMatched &&
                      isActive &&
                      "border-border bg-card hover:border-primary/30 press-scale cursor-pointer"
                  )}
                  style={
                    isMatched
                      ? {
                          backgroundColor: `color-mix(in oklch, ${moduleColor} 15%, transparent)`,
                          borderColor: moduleColor,
                        }
                      : undefined
                  }
                >
                  <span className="flex items-center gap-2">
                    {isMatched && (
                      <Check
                        className="w-4 h-4 shrink-0"
                        style={{ color: moduleColor }}
                      />
                    )}
                    <span>{pair.right}</span>
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Complete */}
      <AnimatePresence>
        {allMatched && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-auto pt-6 pb-4"
          >
            <div className="text-center mb-4">
              <p className="text-success font-semibold">
                All pairs matched! Great work.
              </p>
            </div>
            <button
              onClick={onComplete}
              className="w-full py-4 px-6 rounded-2xl font-semibold text-base text-white shadow-sm press-scale hover:shadow-md transition-shadow"
              style={{ backgroundColor: moduleColor }}
            >
              Continue
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
