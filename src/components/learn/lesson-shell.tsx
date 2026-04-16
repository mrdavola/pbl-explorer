"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface LessonShellProps {
  moduleTitle: string;
  moduleColor: string;
  totalSteps: number;
  currentStep: number;
  onStepChange: (step: number) => void;
  children: React.ReactNode;
  onComplete?: () => void;
}

export function LessonShell({
  moduleTitle,
  moduleColor,
  totalSteps,
  currentStep,
  onStepChange,
  children,
  onComplete,
}: LessonShellProps) {
  const [direction, setDirection] = useState(1);
  const progress = ((currentStep + 1) / totalSteps) * 100;
  const isLastStep = currentStep === totalSteps - 1;

  const goNext = useCallback(() => {
    if (isLastStep) {
      onComplete?.();
      return;
    }
    setDirection(1);
    onStepChange(currentStep + 1);
  }, [currentStep, isLastStep, onComplete, onStepChange]);

  const goPrev = useCallback(() => {
    if (currentStep > 0) {
      setDirection(-1);
      onStepChange(currentStep - 1);
    }
  }, [currentStep, onStepChange]);

  return (
    <div className="flex flex-col min-h-[100dvh] bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border/50">
        <div className="flex items-center gap-2 px-4 py-3 max-w-2xl mx-auto w-full">
          {/* Always-visible home button */}
          <Link
            href="/"
            className="p-2 -ml-2 rounded-xl hover:bg-muted transition-colors press-scale"
            aria-label="Back to home"
          >
            <Home className="w-5 h-5 text-muted-foreground" />
          </Link>

          {/* Back button — only when past step 0 */}
          {currentStep > 0 && (
            <button
              onClick={goPrev}
              className="p-2 -ml-1 rounded-xl hover:bg-muted transition-colors press-scale"
              aria-label="Previous step"
            >
              <ArrowLeft className="w-5 h-5 text-muted-foreground" />
            </button>
          )}

          {/* Progress bar */}
          <div className="flex-1 h-2.5 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: moduleColor }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          <span className="text-xs font-medium text-muted-foreground tabular-nums min-w-[3ch] text-right">
            {currentStep + 1}/{totalSteps}
          </span>
        </div>
      </header>

      {/* Content area with step transitions */}
      <main className="flex-1 flex flex-col">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={{
              enter: (d: number) => ({
                x: d > 0 ? 80 : -80,
                opacity: 0,
              }),
              center: { x: 0, opacity: 1 },
              exit: (d: number) => ({
                x: d > 0 ? -80 : 80,
                opacity: 0,
              }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex-1 flex flex-col"
          >
            <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full px-5 py-6 sm:px-8 sm:py-10">
              {children}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Module title footer (subtle) */}
      <div className="text-center py-2 text-xs text-muted-foreground/60 font-medium">
        {moduleTitle}
      </div>
    </div>
  );
}

/* Continue button used inside lesson steps */
interface ContinueButtonProps {
  onClick: () => void;
  disabled?: boolean;
  label?: string;
  moduleColor?: string;
}

export function ContinueButton({
  onClick,
  disabled = false,
  label = "Continue",
  moduleColor,
}: ContinueButtonProps) {
  return (
    <div className="mt-auto pt-6 pb-4">
      <motion.button
        onClick={onClick}
        disabled={disabled}
        whileTap={{ scale: 0.97 }}
        className={cn(
          "w-full py-4 px-6 rounded-2xl font-semibold text-base transition-all duration-200",
          "text-white shadow-sm",
          disabled
            ? "opacity-40 cursor-not-allowed bg-muted-foreground"
            : "press-scale hover:shadow-md active:shadow-sm"
        )}
        style={{
          backgroundColor: disabled ? undefined : (moduleColor || "oklch(0.45 0.15 15)"),
        }}
      >
        {label}
      </motion.button>
    </div>
  );
}
