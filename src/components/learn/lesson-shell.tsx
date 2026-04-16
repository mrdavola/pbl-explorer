"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { TTSPlayer } from "./tts-player";
import { useSoundEffects } from "@/lib/hooks/use-sound-effects";

interface LessonShellProps {
  moduleTitle: string;
  moduleColor: string;
  totalSteps: number;
  currentStep: number;
  onStepChange: (step: number) => void;
  children: React.ReactNode;
  onComplete?: () => void;
  narrateText?: string;
  lessonSlug?: string;
}

export function LessonShell({
  moduleTitle,
  moduleColor,
  totalSteps,
  currentStep,
  onStepChange,
  children,
  onComplete,
  narrateText,
  lessonSlug,
}: LessonShellProps) {
  const [direction, setDirection] = useState(1);
  const progress = ((currentStep + 1) / totalSteps) * 100;
  const isLastStep = currentStep === totalSteps - 1;
  const { play } = useSoundEffects();

  // Swipe gesture tracking
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const isScrollingRef = useRef(false);

  const goNext = useCallback(() => {
    if (isLastStep) {
      onComplete?.();
      return;
    }
    play('step-complete');
    setDirection(1);
    onStepChange(currentStep + 1);
  }, [currentStep, isLastStep, onComplete, onStepChange, play]);

  const goPrev = useCallback(() => {
    if (currentStep > 0) {
      setDirection(-1);
      onStepChange(currentStep - 1);
    }
  }, [currentStep, onStepChange]);

  // Touch handlers for swipe navigation
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY, time: Date.now() };
    isScrollingRef.current = false;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const touch = e.touches[0];
    const dy = Math.abs(touch.clientY - touchStartRef.current.y);
    const dx = Math.abs(touch.clientX - touchStartRef.current.x);
    // If vertical movement exceeds horizontal, user is scrolling
    if (dy > dx && dy > 10) {
      isScrollingRef.current = true;
    }
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchStartRef.current || isScrollingRef.current) {
      touchStartRef.current = null;
      return;
    }
    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStartRef.current.x;
    const elapsed = Date.now() - touchStartRef.current.time;
    const velocity = Math.abs(dx) / elapsed; // px/ms

    // Threshold: >80px horizontal movement AND sufficient velocity (>0.3 px/ms)
    if (Math.abs(dx) > 80 && velocity > 0.3) {
      if (dx < 0) {
        // Swipe left → next step
        goNext();
      } else {
        // Swipe right → previous step
        goPrev();
      }
    }
    touchStartRef.current = null;
  }, [goNext, goPrev]);

  return (
    <div
      className="min-h-[100dvh] flex flex-col relative bg-background"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* 3px progress bar - fixed top */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-gray-100 z-50">
        <motion.div
          className="h-full rounded-r-full"
          style={{ backgroundColor: moduleColor }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {/* Floating nav overlay - left */}
      <div className="fixed top-3 left-3 z-40 flex items-center gap-2">
        <Link
          href="/"
          className="flex items-center justify-center w-9 h-9 rounded-full bg-white/70 backdrop-blur-sm shadow-sm press-scale hover:bg-white/90 transition-colors"
          aria-label="Back to home"
        >
          <Home size={18} className="text-muted-foreground" />
        </Link>
        {currentStep > 0 && (
          <button
            onClick={goPrev}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-white/70 backdrop-blur-sm shadow-sm press-scale hover:bg-white/90 transition-colors"
            aria-label="Previous step"
          >
            <ChevronLeft size={18} className="text-muted-foreground" />
          </button>
        )}
      </div>

      {/* Floating nav overlay - right (step counter + TTS) */}
      <div className="fixed top-3 right-3 z-40 flex items-center gap-2">
        {narrateText && (
          <TTSPlayer
            text={narrateText}
            stepKey={`${lessonSlug || "lesson"}-step-${currentStep}`}
          />
        )}
        <span className="text-xs font-medium bg-white/70 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm tabular-nums">
          {currentStep + 1} / {totalSteps}
        </span>
      </div>

      {/* Scrollable content - fills viewport */}
      <main className="flex-1 pt-14 pb-24 px-4 overflow-y-auto">
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
            className="flex-1 flex flex-col max-w-2xl mx-auto w-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

/* Continue button used inside lesson steps — fixed to bottom of viewport */
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
    <div className="fixed bottom-0 left-0 right-0 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-white/80 backdrop-blur-md border-t border-gray-100 z-40">
      <div className="max-w-2xl mx-auto">
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
    </div>
  );
}
