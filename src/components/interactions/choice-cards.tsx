"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSoundEffects } from "@/lib/hooks/use-sound-effects";
import { ContinueButton } from "@/components/learn/lesson-shell";
import { type LucideIcon } from "lucide-react";

interface ChoiceCardsProps {
  question: string;
  options: { id: string; title: string; description: string; icon?: LucideIcon }[];
  mode: "single" | "multi";
  maxSelections?: number;
  onComplete: (selected: string[]) => void;
  moduleColor?: string;
}

export function ChoiceCards({
  question,
  options,
  mode,
  maxSelections,
  onComplete,
  moduleColor = "oklch(0.45 0.15 15)",
}: ChoiceCardsProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const { play } = useSoundEffects();

  const isValid =
    mode === "single" ? selected.size === 1 : selected.size >= 1;

  function handleSelect(id: string) {
    play("click");

    if (mode === "single") {
      setSelected(new Set([id]));
      return;
    }

    // Multi mode
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (maxSelections && next.size >= maxSelections) return prev;
        next.add(id);
      }
      return next;
    });
  }

  return (
    <div className="flex flex-col flex-1 pb-24">
      {/* Question */}
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-bold leading-snug text-balance">
          {question}
        </h2>
      </div>

      {/* Selection count for multi mode */}
      {mode === "multi" && maxSelections && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-4"
        >
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-white"
            style={{ backgroundColor: moduleColor }}
          >
            {selected.size} of {maxSelections} selected
          </span>
        </motion.div>
      )}

      {/* Cards */}
      <div className="flex flex-col gap-3">
        {options.map((option, i) => {
          const isSelected = selected.has(option.id);
          const Icon = option.icon;
          const atMax =
            mode === "multi" &&
            maxSelections !== undefined &&
            selected.size >= maxSelections &&
            !isSelected;

          return (
            <motion.button
              key={option.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: i * 0.07,
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={() => handleSelect(option.id)}
              disabled={atMax}
              whileTap={atMax ? {} : { scale: 0.97 }}
              whileHover={atMax ? {} : { scale: 1.01 }}
              className={cn(
                "relative w-full text-left px-5 py-4 rounded-2xl border-2 transition-all duration-200",
                !isSelected &&
                  !atMax &&
                  "border-border bg-card hover:shadow-md cursor-pointer",
                !isSelected && atMax && "border-border/40 bg-card opacity-40 cursor-not-allowed",
                isSelected && "bg-card shadow-md cursor-pointer"
              )}
              style={
                isSelected
                  ? { borderColor: moduleColor }
                  : undefined
              }
            >
              {/* Checkmark overlay */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 25,
                  }}
                  className="absolute top-3 right-3 flex items-center justify-center w-7 h-7 rounded-full text-white"
                  style={{ backgroundColor: moduleColor }}
                >
                  <Check className="w-4 h-4" strokeWidth={3} />
                </motion.div>
              )}

              <span className="flex items-start gap-4 pr-8">
                {Icon && (
                  <span
                    className={cn(
                      "flex items-center justify-center w-10 h-10 rounded-xl shrink-0 mt-0.5 transition-colors",
                      isSelected ? "text-white" : "bg-muted text-muted-foreground"
                    )}
                    style={
                      isSelected
                        ? { backgroundColor: moduleColor }
                        : undefined
                    }
                  >
                    <Icon className="w-5 h-5" />
                  </span>
                )}
                <span className="flex flex-col gap-0.5 min-w-0">
                  <span className="font-semibold text-base leading-snug">
                    {option.title}
                  </span>
                  <span className="text-sm text-muted-foreground leading-relaxed">
                    {option.description}
                  </span>
                </span>
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Continue button */}
      {isValid && (
        <ContinueButton
          onClick={() => onComplete(Array.from(selected))}
          moduleColor={moduleColor}
        />
      )}
    </div>
  );
}
