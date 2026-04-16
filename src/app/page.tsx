"use client";

import { motion } from "framer-motion";
import { Flame, Sparkles } from "lucide-react";
import { modules } from "@/lib/data/modules";
import { useProgress } from "@/lib/hooks/use-progress";
import { LearningPath } from "@/components/path/learning-path";
import { ProgressRing } from "@/components/learn/progress-ring";

export default function Home() {
  const { progress, loaded, completedCount } = useProgress();
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
              <Flame className="w-4 h-4 text-[oklch(0.60_0.14_80)]" />
              <span className="tabular-nums">{progress.streak}</span>
            </div>
            {/* XP */}
            <div className="flex items-center gap-1 text-sm font-bold" title="Experience points">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="tabular-nums">{progress.xp}</span>
            </div>
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
