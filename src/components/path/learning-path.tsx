"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ModuleData } from "@/lib/data/modules";

interface LearningPathProps {
  modules: ModuleData[];
  completedModules: number[];
}

export function LearningPath({ modules, completedModules }: LearningPathProps) {
  return (
    <div className="relative flex flex-col items-center py-4">
      {modules.map((mod, index) => {
        const isComplete = completedModules.includes(mod.id);
        // All modules unlocked for v1
        const isCurrent = !isComplete;
        const isLocked = false;

        return (
          <div key={mod.id} className="relative flex flex-col items-center">
            {/* Connector line */}
            {index > 0 && (
              <div
                className={cn(
                  "w-0.5 h-10",
                  isComplete || isCurrent
                    ? "bg-gradient-to-b from-border to-border"
                    : "bg-border/40"
                )}
                style={
                  isComplete
                    ? {
                        background: `linear-gradient(to bottom, ${modules[index - 1].color}, ${mod.color})`,
                        opacity: 0.3,
                      }
                    : undefined
                }
              />
            )}

            {/* Module node */}
            <ModuleNode
              module={mod}
              index={index}
              isComplete={isComplete}
              isCurrent={isCurrent}
              isLocked={isLocked}
            />
          </div>
        );
      })}
    </div>
  );
}

function ModuleNode({
  module: mod,
  index,
  isComplete,
  isCurrent,
  isLocked,
}: {
  module: ModuleData;
  index: number;
  isComplete: boolean;
  isCurrent: boolean;
  isLocked: boolean;
}) {
  // Alternate left/right with a subtle zigzag
  const offsetX = index % 2 === 0 ? -24 : 24;

  const inner = (
    <motion.div
      initial={{ opacity: 0, y: 20, x: 0 }}
      animate={{ opacity: 1, y: 0, x: offsetX }}
      transition={{ delay: index * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
      className={cn(
        "relative flex items-center gap-4 p-4 rounded-2xl transition-all w-[300px] sm:w-[340px]",
        isComplete && "bg-card border-2 border-border",
        isCurrent && "bg-card border-2 shadow-lg",
        isLocked && "bg-muted/50 border-2 border-transparent opacity-60",
        !isLocked && "press-scale"
      )}
      style={
        isCurrent
          ? { borderColor: mod.color, boxShadow: `0 4px 20px color-mix(in oklch, ${mod.color} 20%, transparent)` }
          : undefined
      }
    >
      {/* Icon circle */}
      <div
        className={cn(
          "flex items-center justify-center w-14 h-14 rounded-2xl text-2xl shrink-0 transition-colors",
          isLocked && "grayscale"
        )}
        style={{
          backgroundColor: isComplete || isCurrent ? mod.colorLight : undefined,
        }}
      >
        {isComplete ? (
          <div
            className="flex items-center justify-center w-8 h-8 rounded-full text-white"
            style={{ backgroundColor: mod.color }}
          >
            <Check className="w-4 h-4" strokeWidth={3} />
          </div>
        ) : (
          <span>{mod.icon}</span>
        )}
      </div>

      {/* Text */}
      <div className="min-w-0 flex-1">
        <h3
          className={cn(
            "font-bold text-base leading-tight truncate",
            isLocked && "text-muted-foreground"
          )}
        >
          {mod.title}
        </h3>
        <p
          className={cn(
            "text-xs mt-0.5 truncate",
            isLocked ? "text-muted-foreground/60" : "text-muted-foreground"
          )}
        >
          {mod.subtitle}
        </p>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-[10px] font-medium text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
            {mod.duration}
          </span>
          {isComplete && (
            <span className="text-[10px] font-bold text-success">
              Complete
            </span>
          )}
        </div>
      </div>

      {/* Play indicator for current */}
      {isCurrent && (
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex items-center justify-center w-10 h-10 rounded-full text-white shrink-0"
          style={{ backgroundColor: mod.color }}
        >
          <Play className="w-4 h-4 ml-0.5" fill="white" />
        </motion.div>
      )}
    </motion.div>
  );

  if (isLocked) {
    return inner;
  }

  return (
    <Link href={`/learn/${mod.slug}`} className="no-underline">
      {inner}
    </Link>
  );
}
