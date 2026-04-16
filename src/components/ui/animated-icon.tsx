"use client";

import { useRef, useState, useEffect, type ComponentType } from "react";
import { motion, useInView } from "framer-motion";
import { type LucideProps } from "lucide-react";

/**
 * Animation presets for icons.
 * Each preset defines entrance + hover behavior.
 */
const presets = {
  /** Gentle bounce-in, pulse on hover */
  bounce: {
    entrance: {
      initial: { scale: 0, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      transition: { type: "spring" as const, stiffness: 400, damping: 15 },
    },
    hover: { scale: 1.15, rotate: 0 },
    idle: undefined,
  },
  /** Pop in with rotation, wiggle on hover */
  pop: {
    entrance: {
      initial: { scale: 0, rotate: -45, opacity: 0 },
      animate: { scale: 1, rotate: 0, opacity: 1 },
      transition: { type: "spring" as const, stiffness: 300, damping: 12 },
    },
    hover: { scale: 1.2, rotate: 8 },
    idle: undefined,
  },
  /** Slide up + fade, lift on hover */
  rise: {
    entrance: {
      initial: { y: 12, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      transition: { type: "spring" as const, stiffness: 200, damping: 20 },
    },
    hover: { y: -3, scale: 1.1 },
    idle: undefined,
  },
  /** Flame flicker effect - continuous subtle animation */
  flame: {
    entrance: {
      initial: { scale: 0.8, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      transition: { type: "spring" as const, stiffness: 300, damping: 15 },
    },
    hover: { scale: 1.3 },
    idle: {
      scale: [1, 1.12, 0.95, 1.08, 1],
      rotate: [0, -3, 3, -2, 0],
      transition: {
        duration: 1.8,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  },
  /** Sparkle twinkle - continuous rotate + scale */
  sparkle: {
    entrance: {
      initial: { scale: 0, rotate: -90, opacity: 0 },
      animate: { scale: 1, rotate: 0, opacity: 1 },
      transition: { type: "spring" as const, stiffness: 250, damping: 12 },
    },
    hover: { scale: 1.3, rotate: 15 },
    idle: {
      scale: [1, 1.1, 1],
      rotate: [0, 10, -5, 0],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  },
  /** Trophy / celebration - dramatic entrance */
  trophy: {
    entrance: {
      initial: { scale: 0, rotate: -30, opacity: 0 },
      animate: { scale: 1, rotate: 0, opacity: 1 },
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 10,
        delay: 0.2,
      },
    },
    hover: { scale: 1.15, rotate: -5 },
    idle: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  },
};

export type AnimationPreset = keyof typeof presets;

interface AnimatedIconProps {
  /** The Lucide icon component to render */
  icon: ComponentType<LucideProps>;
  /** Icon size in pixels */
  size?: number;
  /** Animation preset name */
  animation?: AnimationPreset;
  /** Delay before entrance animation (seconds) */
  delay?: number;
  /** Additional className for the wrapper */
  className?: string;
  /** Color override (CSS color string) */
  color?: string;
  /** Lucide strokeWidth override */
  strokeWidth?: number;
  /** Whether to animate on entrance (when scrolling into view) */
  animateOnView?: boolean;
  /** Whether icon should continuously animate (for flame/sparkle presets) */
  continuous?: boolean;
}

export function AnimatedIcon({
  icon: Icon,
  size = 24,
  animation = "bounce",
  delay = 0,
  className,
  color,
  strokeWidth,
  animateOnView = true,
  continuous = false,
}: AnimatedIconProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [isHovered, setIsHovered] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  const preset = presets[animation];

  // Track when entrance animation completes
  useEffect(() => {
    if (animateOnView && isInView) {
      const timer = setTimeout(() => setHasEntered(true), (delay + 0.5) * 1000);
      return () => clearTimeout(timer);
    }
    if (!animateOnView) {
      const timer = setTimeout(() => setHasEntered(true), (delay + 0.5) * 1000);
      return () => clearTimeout(timer);
    }
  }, [isInView, animateOnView, delay]);

  const shouldAnimate = animateOnView ? isInView : true;

  // Build the animate state
  const animateState = shouldAnimate
    ? {
        ...preset.entrance.animate,
        ...(isHovered ? preset.hover : {}),
        ...(continuous && hasEntered && !isHovered && preset.idle
          ? preset.idle
          : {}),
      }
    : preset.entrance.initial;

  // Build transition - use idle transition for continuous, else entrance
  const transition =
    continuous && hasEntered && !isHovered && preset.idle?.transition
      ? preset.idle.transition
      : { ...preset.entrance.transition, delay };

  return (
    <motion.div
      ref={ref}
      initial={preset.entrance.initial}
      animate={animateState}
      transition={transition}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "default",
        lineHeight: 0,
      }}
    >
      <Icon size={size} color={color} strokeWidth={strokeWidth} />
    </motion.div>
  );
}
