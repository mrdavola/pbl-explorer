"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ClipboardList, Flame, Library, Sparkles, Volume2, VolumeX } from "lucide-react";
import { modules } from "@/lib/data/modules";
import { useProgress } from "@/lib/hooks/use-progress";
import { usePlanBuilder } from "@/lib/hooks/use-plan-builder";
import { useSoundEffects } from "@/lib/hooks/use-sound-effects";
import { LearningPath } from "@/components/path/learning-path";
import { ProgressRing } from "@/components/learn/progress-ring";
import { AnimatedIcon } from "@/components/ui/animated-icon";

export default function Home() {
  const { progress, loaded, completedCount } = useProgress();
  const { hasPlanData, loaded: planLoaded } = usePlanBuilder();
  const { enabled: soundEnabled, toggleSound } = useSoundEffects();
  const totalModules = modules.length;
  const progressPercent = (completedCount / totalModules) * 100;

  if (!loaded) {
    return (
      <div className="flex items-center justify-center min-h-[100dvh]">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border/50">
        <div className="flex items-center justify-between px-5 py-3 max-w-2xl mx-auto">
          <div>
            <h1 className="text-lg font-bold font-[family-name:var(--font-display)] tracking-tight">
              PBL Explorer
            </h1>
          </div>
          <div className="flex items-center gap-3">
            {/* Streak */}
            <div className="flex items-center gap-1 text-sm font-bold" title="Daily streak">
              <AnimatedIcon
                icon={Flame}
                size={16}
                animation="flame"
                color="oklch(0.60 0.14 80)"
                continuous
                animateOnView={false}
              />
              <span className="tabular-nums">{progress.streak}</span>
            </div>
            {/* XP */}
            <div className="flex items-center gap-1 text-sm font-bold" title="Experience points">
              <AnimatedIcon
                icon={Sparkles}
                size={16}
                animation="sparkle"
                color="var(--color-primary)"
                continuous
                animateOnView={false}
              />
              <span className="tabular-nums">{progress.xp}</span>
            </div>
            {/* Sound toggle */}
            <button
              onClick={toggleSound}
              className="p-1 rounded-md text-muted-foreground hover:text-foreground transition-colors"
              title={soundEnabled ? "Mute sounds" : "Unmute sounds"}
              aria-label={soundEnabled ? "Mute sounds" : "Unmute sounds"}
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero area with progress ring */}
      <section className="px-5 pt-8 pb-4 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center mb-8"
        >
          <ProgressRing progress={progressPercent} size={100} strokeWidth={7}>
            <div className="text-center">
              <span className="text-2xl font-bold tabular-nums">{completedCount}</span>
              <span className="text-xs text-muted-foreground block -mt-0.5">
                of {totalModules}
              </span>
            </div>
          </ProgressRing>

          <h2 className="text-2xl font-bold mt-5 mb-1 font-[family-name:var(--font-display)]">
            {completedCount === 0
              ? "Welcome to PBL Explorer"
              : completedCount === totalModules
                ? "You\u2019re a PBL Expert!"
                : "Keep going!"}
          </h2>
          <p className="text-muted-foreground text-sm max-w-xs">
            {completedCount === 0
              ? "Learn Project-Based Learning through interactive lessons."
              : completedCount === totalModules
                ? "You\u2019ve completed all modules. Amazing work!"
                : `${totalModules - completedCount} module${totalModules - completedCount === 1 ? "" : "s"} remaining`}
          </p>

          <div className="flex items-center gap-3 mt-4">
            {planLoaded && hasPlanData && (
              <Link
                href="/my-plan"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
              >
                <ClipboardList className="w-4 h-4" />
                My Plan
              </Link>
            )}
            <Link
              href="/toolkit"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg border border-border text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            >
              <Library className="w-4 h-4" />
              Toolkit
            </Link>
          </div>
        </motion.div>

        {/* Learning path */}
        <LearningPath
          modules={modules}
          completedModules={progress.completedModules}
        />

        <div className="h-20" />
      </section>
    </div>
  );
}
