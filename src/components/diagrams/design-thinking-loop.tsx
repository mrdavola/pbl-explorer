'use client';

import { motion } from 'framer-motion';

const stages = ['Empathize', 'Define', 'Ideate', 'Prototype', 'Test'];

const BASE_COLOR = 'oklch(0.60 0.12 60)';
const ACTIVE_COLOR = 'oklch(0.72 0.16 60)';
const MUTED_COLOR = 'oklch(0.45 0.08 60)';
const TEXT_COLOR = 'oklch(0.98 0.01 60)';
const ARROW_COLOR = 'oklch(0.55 0.10 60)';
const ITERATE_COLOR = 'oklch(0.50 0.06 60)';

interface DesignThinkingLoopProps {
  activeStage?: number;
}

export function DesignThinkingLoop({ activeStage }: DesignThinkingLoopProps) {
  const cx = 220;
  const cy = 220;
  const r = 150;
  const nodeR = 42;

  const nodes = stages.map((label, i) => {
    const angle = (i * 2 * Math.PI) / stages.length - Math.PI / 2;
    return {
      label,
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
      angle,
    };
  });

  // Generate curved arrow path between two points along the circle
  function arcPath(from: { x: number; y: number }, to: { x: number; y: number }) {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    // Offset start/end to node edge
    const startX = from.x + (dx / dist) * nodeR;
    const startY = from.y + (dy / dist) * nodeR;
    const endX = to.x - (dx / dist) * nodeR;
    const endY = to.y - (dy / dist) * nodeR;
    return `M ${startX} ${startY} L ${endX} ${endY}`;
  }

  // Iterate (backward) arrow: curved outward
  function iteratePath(from: { x: number; y: number }, to: { x: number; y: number }) {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const startX = from.x + (dx / dist) * nodeR;
    const startY = from.y + (dy / dist) * nodeR;
    const endX = to.x - (dx / dist) * nodeR;
    const endY = to.y - (dy / dist) * nodeR;
    // Control point pushes outward from center
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;
    const offX = midX - cx;
    const offY = midY - cy;
    const offDist = Math.sqrt(offX * offX + offY * offY);
    const ctrlX = midX + (offX / offDist) * 60;
    const ctrlY = midY + (offY / offDist) * 60;
    return `M ${startX} ${startY} Q ${ctrlX} ${ctrlY} ${endX} ${endY}`;
  }

  // Forward arrows: 0->1, 1->2, 2->3, 3->4
  const forwardArrows = stages.slice(0, -1).map((_, i) => ({
    from: nodes[i],
    to: nodes[i + 1],
  }));
  // Also 4->0 (Test back to Empathize as forward continuation)
  forwardArrows.push({ from: nodes[4], to: nodes[0] });

  // Iterate arrows: Test->Define, Prototype->Ideate
  const iterateArrows = [
    { from: nodes[4], to: nodes[1] },
    { from: nodes[3], to: nodes[2] },
  ];

  return (
    <svg
      viewBox="0 0 440 440"
      className="w-full max-w-md mx-auto"
      role="img"
      aria-label="Design Thinking Loop: Empathize, Define, Ideate, Prototype, Test"
    >
      <defs>
        <marker
          id="dt-arrow"
          markerWidth="8"
          markerHeight="6"
          refX="7"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 8 3, 0 6" fill={ARROW_COLOR} />
        </marker>
        <marker
          id="dt-arrow-iter"
          markerWidth="8"
          markerHeight="6"
          refX="7"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 8 3, 0 6" fill={ITERATE_COLOR} />
        </marker>
        <filter id="dt-glow">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Forward arrows */}
      {forwardArrows.map((a, i) => (
        <motion.path
          key={`fwd-${i}`}
          d={arcPath(a.from, a.to)}
          stroke={ARROW_COLOR}
          strokeWidth={2}
          fill="none"
          markerEnd="url(#dt-arrow)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.8 }}
          transition={{ delay: 0.8 + i * 0.15, duration: 0.4 }}
        />
      ))}

      {/* Iterate arrows (dotted) */}
      {iterateArrows.map((a, i) => (
        <motion.path
          key={`iter-${i}`}
          d={iteratePath(a.from, a.to)}
          stroke={ITERATE_COLOR}
          strokeWidth={1.5}
          strokeDasharray="5 4"
          fill="none"
          markerEnd="url(#dt-arrow-iter)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ delay: 1.6 + i * 0.2, duration: 0.5 }}
        />
      ))}

      {/* Nodes */}
      {nodes.map((node, i) => {
        const isActive = activeStage === i;
        return (
          <motion.g
            key={node.label}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: i * 0.12,
              duration: 0.45,
              type: 'spring',
            }}
            style={{ transformOrigin: `${node.x}px ${node.y}px` }}
            filter={isActive ? 'url(#dt-glow)' : undefined}
          >
            <circle
              cx={node.x}
              cy={node.y}
              r={nodeR}
              fill={isActive ? ACTIVE_COLOR : MUTED_COLOR}
              stroke={isActive ? ACTIVE_COLOR : BASE_COLOR}
              strokeWidth={isActive ? 2.5 : 1.5}
            />
            <text
              x={node.x}
              y={node.y}
              textAnchor="middle"
              dominantBaseline="central"
              fill={TEXT_COLOR}
              fontSize={12}
              fontWeight={isActive ? 700 : 500}
              fontFamily="system-ui, sans-serif"
            >
              {node.label}
            </text>
          </motion.g>
        );
      })}

      {/* Center label */}
      <motion.text
        x={cx}
        y={cy}
        textAnchor="middle"
        dominantBaseline="central"
        fill={BASE_COLOR}
        fontSize={11}
        fontWeight={600}
        fontFamily="system-ui, sans-serif"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1.0 }}
      >
        iterate
      </motion.text>
    </svg>
  );
}
