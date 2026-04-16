"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSoundEffects } from "@/lib/hooks/use-sound-effects";

interface ScenarioQuizProps {
  question: string;
  options: { label: string; correct: boolean }[];
  correctFeedback: string;
  incorrectFeedback: string;
  onComplete: () => void;
  moduleColor?: string;
}

export function ScenarioQuiz({
  question,
  options,
  correctFeedback,
  incorrectFeedback,
  onComplete,
  moduleColor = "oklch(0.45 0.15 15)",
}: ScenarioQuizProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const isCorrect = selected !== null && options[selected]?.correct;
  const { play } = useSoundEffects();

  function handleSelect(index: number) {
    if (answered) return;
    setSelected(index);
    setAnswered(true);
    play(options[index]?.correct ? 'correct' : 'incorrect');
  }

  return (
    <div className="flex flex-col flex-1">
      {/* Question */}
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold leading-snug text-balance">
          {question}
        </h2>
      </div>

      {/* Options */}
      <div className="flex flex-col gap-3 mb-6">
        {options.map((option, i) => {
          const isThis = selected === i;
          const showCorrect = answered && option.correct;
          const showWrong = answered && isThis && !option.correct;

          return (
            <motion.button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={answered}
              whileTap={answered ? {} : { scale: 0.97 }}
              className={cn(
                "relative w-full text-left px-5 py-4 rounded-2xl border-2 font-medium text-lg transition-all duration-200",
                !answered && "hover:border-primary/30 hover:bg-muted/50 press-scale cursor-pointer",
                answered && "cursor-default",
                !answered && !isThis && "border-border bg-card",
                showCorrect && "border-success bg-success-light",
                showWrong && "border-error bg-error-light shake",
                answered && !showCorrect && !showWrong && "border-border/50 bg-card opacity-50"
              )}
            >
              <span className="flex items-center gap-3">
                <span
                  className={cn(
                    "flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold shrink-0 transition-colors",
                    !answered && "bg-muted text-muted-foreground",
                    showCorrect && "bg-success text-white",
                    showWrong && "bg-error text-white",
                    answered && !showCorrect && !showWrong && "bg-muted text-muted-foreground"
                  )}
                >
                  {showCorrect ? (
                    <Check className="w-4 h-4" />
                  ) : showWrong ? (
                    <X className="w-4 h-4" />
                  ) : (
                    String.fromCharCode(65 + i)
                  )}
                </span>
                <span>{option.label}</span>
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Feedback */}
      <AnimatePresence>
        {answered && (
          <motion.div
            initial={{ opacity: 0, y: 10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "rounded-2xl px-5 py-4 text-base leading-relaxed",
              isCorrect
                ? "bg-success-light text-[oklch(0.30_0.08_155)]"
                : "bg-error-light text-[oklch(0.30_0.08_25)]"
            )}
          >
            <p className="font-semibold mb-1">
              {isCorrect ? "That\u2019s right!" : "Not quite!"}
            </p>
            <p>{isCorrect ? correctFeedback : incorrectFeedback}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Continue */}
      {answered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-auto pt-6 pb-4"
        >
          <button
            onClick={onComplete}
            className="w-full py-4 px-6 rounded-2xl font-semibold text-lg text-white shadow-sm press-scale hover:shadow-md transition-shadow"
            style={{ backgroundColor: moduleColor }}
          >
            Continue
          </button>
        </motion.div>
      )}
    </div>
  );
}
