'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const phases = [
  'Entry Event',
  'Investigation',
  'Challenge',
  'Create',
  'Share',
];

const BASE_COLOR = 'oklch(0.45 0.18 280)';
const ACTIVE_COLOR = 'oklch(0.60 0.22 280)';
const MUTED_COLOR = 'oklch(0.35 0.10 280)';
const TEXT_COLOR = 'oklch(0.95 0.02 280)';

interface PBLPhaseFlowProps {
  activePhase?: number;
}

export function PBLPhaseFlow({ activePhase }: PBLPhaseFlowProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  if (isMobile) {
    return <PBLPhaseFlowVertical activePhase={activePhase} />;
  }

  return <PBLPhaseFlowHorizontal activePhase={activePhase} />;
}

function PBLPhaseFlowHorizontal({ activePhase }: PBLPhaseFlowProps) {
  const nodeW = 130;
  const nodeH = 50;
  const gap = 40;
  const totalW = phases.length * nodeW + (phases.length - 1) * gap;
  const svgW = totalW + 40;
  const svgH = nodeH + 40;
  const startY = (svgH - nodeH) / 2;

  return (
    <svg
      viewBox={`0 0 ${svgW} ${svgH}`}
      className="w-full max-w-3xl mx-auto"
      role="img"
      aria-label="PBL Phase Flow diagram showing 5 phases: Entry Event, Investigation, Challenge, Create, Share"
    >
      {/* Arrows */}
      {phases.slice(0, -1).map((_, i) => {
        const x1 = 20 + i * (nodeW + gap) + nodeW;
        const x2 = 20 + (i + 1) * (nodeW + gap);
        const y = startY + nodeH / 2;
        return (
          <motion.line
            key={`arrow-${i}`}
            x1={x1}
            y1={y}
            x2={x2}
            y2={y}
            stroke={BASE_COLOR}
            strokeWidth={2}
            markerEnd="url(#arrowhead)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.2, duration: 0.4 }}
          />
        );
      })}

      {/* Arrow marker */}
      <defs>
        <marker
          id="arrowhead"
          markerWidth="8"
          markerHeight="6"
          refX="8"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 8 3, 0 6" fill={BASE_COLOR} />
        </marker>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Nodes */}
      {phases.map((label, i) => {
        const x = 20 + i * (nodeW + gap);
        const isActive = activePhase === i;
        return (
          <motion.g
            key={label}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.15, duration: 0.4, type: 'spring' }}
            filter={isActive ? 'url(#glow)' : undefined}
          >
            <rect
              x={x}
              y={startY}
              width={nodeW}
              height={nodeH}
              rx={12}
              fill={isActive ? ACTIVE_COLOR : MUTED_COLOR}
              stroke={isActive ? ACTIVE_COLOR : BASE_COLOR}
              strokeWidth={isActive ? 2.5 : 1.5}
            />
            <text
              x={x + nodeW / 2}
              y={startY + nodeH / 2}
              textAnchor="middle"
              dominantBaseline="central"
              fill={TEXT_COLOR}
              fontSize={12}
              fontWeight={isActive ? 700 : 500}
              fontFamily="system-ui, sans-serif"
            >
              {label}
            </text>
          </motion.g>
        );
      })}
    </svg>
  );
}

function PBLPhaseFlowVertical({ activePhase }: PBLPhaseFlowProps) {
  const nodeW = 160;
  const nodeH = 44;
  const gap = 30;
  const svgW = nodeW + 40;
  const svgH = phases.length * (nodeH + gap) + 20;

  return (
    <svg
      viewBox={`0 0 ${svgW} ${svgH}`}
      className="w-full max-w-xs mx-auto"
      role="img"
      aria-label="PBL Phase Flow diagram"
    >
      <defs>
        <marker
          id="arrowhead-v"
          markerWidth="8"
          markerHeight="6"
          refX="3"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 6 3, 0 6" fill={BASE_COLOR} />
        </marker>
        <filter id="glow-v">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {phases.map((label, i) => {
        const x = (svgW - nodeW) / 2;
        const y = 10 + i * (nodeH + gap);
        const isActive = activePhase === i;

        return (
          <motion.g
            key={label}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12, duration: 0.35 }}
            filter={isActive ? 'url(#glow-v)' : undefined}
          >
            <rect
              x={x}
              y={y}
              width={nodeW}
              height={nodeH}
              rx={10}
              fill={isActive ? ACTIVE_COLOR : MUTED_COLOR}
              stroke={isActive ? ACTIVE_COLOR : BASE_COLOR}
              strokeWidth={isActive ? 2.5 : 1.5}
            />
            <text
              x={svgW / 2}
              y={y + nodeH / 2}
              textAnchor="middle"
              dominantBaseline="central"
              fill={TEXT_COLOR}
              fontSize={12}
              fontWeight={isActive ? 700 : 500}
              fontFamily="system-ui, sans-serif"
            >
              {label}
            </text>
            {i < phases.length - 1 && (
              <motion.line
                x1={svgW / 2}
                y1={y + nodeH}
                x2={svgW / 2}
                y2={y + nodeH + gap}
                stroke={BASE_COLOR}
                strokeWidth={2}
                markerEnd="url(#arrowhead-v)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.3 }}
              />
            )}
          </motion.g>
        );
      })}
    </svg>
  );
}
