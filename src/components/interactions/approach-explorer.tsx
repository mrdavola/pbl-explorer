"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useSoundEffects } from "@/lib/hooks/use-sound-effects";
import { ContinueButton } from "@/components/learn/lesson-shell";

interface Approach {
  name: string;
  category: string;
  studentsDo: string;
  example: string;
}

interface ApproachExplorerProps {
  title: string;
  subtitle: string;
  approaches: Approach[];
  onComplete: () => void;
  moduleColor?: string;
}

export function ApproachExplorer({
  title,
  subtitle,
  approaches,
  onComplete,
  moduleColor = "oklch(0.50 0.16 270)",
}: ApproachExplorerProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [explored, setExplored] = useState<Set<number>>(new Set());
  const { play } = useSoundEffects();

  function handleTap(index: number) {
    play("click");
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
      setExplored((prev) => new Set(prev).add(index));
    }
  }

  const allExplored = explored.size >= approaches.length;

  return (
    <div className="flex flex-col flex-1 pb-28">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="text-2xl font-bold mb-1">{title}</h2>
        <p className="text-base text-muted-foreground mb-6">{subtitle}</p>
      </motion.div>

      <div className="grid gap-3">
        {approaches.map((approach, i) => {
          const isExpanded = expandedIndex === i;
          const hasBeenExplored = explored.has(i);

          return (
            <motion.div
              key={approach.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 * i, duration: 0.35 }}
              layout
            >
              <button
                onClick={() => handleTap(i)}
                className={cn(
                  "w-full text-left rounded-2xl border-2 transition-all duration-200 overflow-hidden",
                  isExpanded
                    ? "border-transparent shadow-md"
                    : hasBeenExplored
                      ? "border-border/60 bg-card"
                      : "border-border bg-card hover:border-primary/30"
                )}
                style={isExpanded ? { backgroundColor: moduleColor, borderColor: moduleColor } : undefined}
              >
                {/* Header row */}
                <div className={cn("flex items-center justify-between px-4 py-3.5", isExpanded && "pb-2")}>
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={cn(
                        "w-2.5 h-2.5 rounded-full shrink-0 transition-colors",
                        hasBeenExplored && !isExpanded ? "opacity-40" : ""
                      )}
                      style={{ backgroundColor: isExpanded ? "white" : moduleColor }}
                    />
                    <span className={cn(
                      "font-semibold text-base",
                      isExpanded ? "text-white" : "text-foreground"
                    )}>
                      {approach.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={cn(
                      "text-xs font-medium uppercase tracking-wider",
                      isExpanded ? "text-white/70" : "text-muted-foreground"
                    )}>
                      {approach.category}
                    </span>
                    <motion.svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className={isExpanded ? "text-white/70" : "text-muted-foreground"}
                    >
                      <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </motion.svg>
                  </div>
                </div>

                {/* Expandable content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 pt-1 text-white">
                        <div className="mb-3">
                          <p className="text-xs font-semibold uppercase tracking-wider text-white/60 mb-1">
                            Students primarily
                          </p>
                          <p className="text-base leading-relaxed text-white/95">
                            {approach.studentsDo}
                          </p>
                        </div>
                        <div className="rounded-xl bg-white/15 px-3.5 py-2.5">
                          <p className="text-xs font-semibold uppercase tracking-wider text-white/60 mb-1">
                            Quick example
                          </p>
                          <p className="text-sm leading-relaxed text-white/90 italic">
                            &ldquo;{approach.example}&rdquo;
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Progress hint */}
      {!allExplored && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-sm text-muted-foreground text-center mt-4"
        >
          Tap each approach to learn about it ({explored.size} / {approaches.length})
        </motion.p>
      )}

      {allExplored && (
        <ContinueButton onClick={onComplete} moduleColor={moduleColor} />
      )}
    </div>
  );
}
