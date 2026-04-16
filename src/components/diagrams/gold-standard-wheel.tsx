'use client';

import { motion } from 'framer-motion';

const elements = [
  'Challenging Problem / Question',
  'Sustained Inquiry',
  'Authenticity',
  'Student Voice & Choice',
  'Reflection',
  'Critique & Revision',
  'Public Product',
];

const BASE_COLOR = 'oklch(0.45 0.15 15)';
const ACTIVE_COLOR = 'oklch(0.60 0.20 15)';
const MUTED_COLOR = 'oklch(0.35 0.10 15)';
const HUB_COLOR = 'oklch(0.50 0.18 15)';
const TEXT_COLOR = 'oklch(0.95 0.02 15)';
const SPOKE_COLOR = 'oklch(0.40 0.08 15)';

interface GoldStandardWheelProps {
  highlightElement?: string;
}

export function GoldStandardWheel({ highlightElement }: GoldStandardWheelProps) {
  const cx = 250;
  const cy = 250;
  const hubR = 55;
  const outerR = 170;
  const nodeR = 48;

  const nodes = elements.map((label, i) => {
    const angle = (i * 2 * Math.PI) / elements.length - Math.PI / 2;
    return {
      label,
      x: cx + outerR * Math.cos(angle),
      y: cy + outerR * Math.sin(angle),
      angle,
    };
  });

  return (
    <svg
      viewBox="0 0 500 500"
      className="w-full max-w-lg mx-auto"
      role="img"
      aria-label="Gold Standard PBL wheel showing 7 essential elements"
    >
      <defs>
        <filter id="gs-glow">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Spokes */}
      {nodes.map((node, i) => (
        <motion.line
          key={`spoke-${i}`}
          x1={cx}
          y1={cy}
          x2={node.x}
          y2={node.y}
          stroke={SPOKE_COLOR}
          strokeWidth={1.5}
          strokeDasharray="4 3"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ delay: 0.6 + i * 0.08, duration: 0.4 }}
        />
      ))}

      {/* Center hub */}
      <motion.circle
        cx={cx}
        cy={cy}
        r={hubR}
        fill={HUB_COLOR}
        stroke={BASE_COLOR}
        strokeWidth={2.5}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
      />
      <motion.text
        x={cx}
        y={cy - 8}
        textAnchor="middle"
        dominantBaseline="central"
        fill={TEXT_COLOR}
        fontSize={11}
        fontWeight={700}
        fontFamily="system-ui, sans-serif"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Gold Standard
      </motion.text>
      <motion.text
        x={cx}
        y={cy + 10}
        textAnchor="middle"
        dominantBaseline="central"
        fill={TEXT_COLOR}
        fontSize={11}
        fontWeight={700}
        fontFamily="system-ui, sans-serif"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        PBL
      </motion.text>

      {/* Outer nodes */}
      {nodes.map((node, i) => {
        const isHighlighted = highlightElement === node.label;
        const words = node.label.split(' ');
        const lines: string[] = [];
        let current = '';
        for (const w of words) {
          if ((current + ' ' + w).trim().length > 12 && current) {
            lines.push(current);
            current = w;
          } else {
            current = current ? current + ' ' + w : w;
          }
        }
        if (current) lines.push(current);

        return (
          <motion.g
            key={node.label}
            initial={{ opacity: 0, scale: 0.3, rotate: -30 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{
              delay: 0.4 + i * 0.1,
              duration: 0.5,
              type: 'spring',
            }}
            style={{ transformOrigin: `${node.x}px ${node.y}px` }}
            filter={isHighlighted ? 'url(#gs-glow)' : undefined}
          >
            <circle
              cx={node.x}
              cy={node.y}
              r={nodeR}
              fill={isHighlighted ? ACTIVE_COLOR : MUTED_COLOR}
              stroke={isHighlighted ? ACTIVE_COLOR : BASE_COLOR}
              strokeWidth={isHighlighted ? 2.5 : 1.5}
            />
            {lines.map((line, li) => (
              <text
                key={li}
                x={node.x}
                y={node.y + (li - (lines.length - 1) / 2) * 13}
                textAnchor="middle"
                dominantBaseline="central"
                fill={TEXT_COLOR}
                fontSize={10}
                fontWeight={isHighlighted ? 700 : 500}
                fontFamily="system-ui, sans-serif"
              >
                {line}
              </text>
            ))}
          </motion.g>
        );
      })}
    </svg>
  );
}
