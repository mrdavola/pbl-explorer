"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface CelebrationProps {
  moduleTitle: string;
  moduleColor: string;
  moduleIcon: string;
  xpEarned?: number;
  nextModuleSlug?: string;
  nextModuleTitle?: string;
}

function Confetti() {
  const [particles, setParticles] = useState<
    { id: number; x: number; delay: number; color: string; size: number; rotation: number }[]
  >([]);

  useEffect(() => {
    const colors = [
      "oklch(0.55 0.14 25)",
      "oklch(0.45 0.18 280)",
      "oklch(0.60 0.14 80)",
      "oklch(0.45 0.15 15)",
      "oklch(0.60 0.12 60)",
      "oklch(0.50 0.16 270)",
      "oklch(0.55 0.15 155)",
    ];
    setParticles(
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 4 + Math.random() * 8,
        rotation: Math.random() * 360,
      }))
    );
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            x: `${p.x}vw`,
            y: -20,
            rotate: p.rotation,
            opacity: 1,
          }}
          animate={{
            y: "110vh",
            rotate: p.rotation + 720,
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: 2.5 + Math.random(),
            delay: p.delay,
            ease: "easeIn",
          }}
          style={{
            position: "absolute",
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: p.size > 8 ? "2px" : "50%",
          }}
        />
      ))}
    </div>
  );
}

export function Celebration({
  moduleTitle,
  moduleColor,
  moduleIcon,
  xpEarned = 50,
  nextModuleSlug,
  nextModuleTitle,
}: CelebrationProps) {
  return (
    <>
      <Confetti />
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center min-h-[100dvh]">
        {/* Big icon */}
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.2,
          }}
          className="text-7xl mb-6"
        >
          {moduleIcon}
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-3xl font-bold mb-2"
        >
          Module Complete!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-lg text-muted-foreground mb-8"
        >
          You finished &ldquo;{moduleTitle}&rdquo;
        </motion.p>

        {/* XP Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 300 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-lg mb-10"
          style={{
            backgroundColor: moduleColor,
            color: "white",
          }}
        >
          +{xpEarned} XP
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col gap-3 w-full max-w-xs"
        >
          {nextModuleSlug && (
            <Link
              href={`/learn/${nextModuleSlug}`}
              className="w-full py-4 px-6 rounded-2xl font-semibold text-base text-white text-center shadow-sm press-scale hover:shadow-md transition-shadow"
              style={{ backgroundColor: moduleColor }}
            >
              Next: {nextModuleTitle}
            </Link>
          )}
          <Link
            href="/"
            className="w-full py-4 px-6 rounded-2xl font-semibold text-base text-center border-2 border-border hover:bg-muted transition-colors press-scale"
          >
            Back to Home
          </Link>
        </motion.div>
      </div>
    </>
  );
}
