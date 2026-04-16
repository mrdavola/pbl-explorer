'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Cluster {
  label: string;
  color: string;
  activeFill: string;
  approaches: string[];
}

const clusters: Cluster[] = [
  {
    label: 'Driven by Project / Problem',
    color: 'oklch(0.45 0.14 240)',
    activeFill: 'oklch(0.55 0.16 240)',
    approaches: ['Project-Based', 'Problem-Based', 'Inquiry-Based'],
  },
  {
    label: 'Driven by Making / Design',
    color: 'oklch(0.45 0.14 145)',
    activeFill: 'oklch(0.55 0.16 145)',
    approaches: ['Design Thinking', 'Maker', 'STEAM'],
  },
  {
    label: 'Driven by Interest',
    color: 'oklch(0.45 0.14 300)',
    activeFill: 'oklch(0.55 0.16 300)',
    approaches: ['Genius Hour', 'Passion Projects'],
  },
  {
    label: 'Driven by Purpose',
    color: 'oklch(0.50 0.14 70)',
    activeFill: 'oklch(0.60 0.16 70)',
    approaches: ['Service Learning', 'Challenge-Based', 'Interdisciplinary'],
  },
];

const CENTER_COLOR = 'oklch(0.50 0.16 270)';
const TEXT_COLOR = 'oklch(0.95 0.02 270)';

export function ClusterTaxonomy() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  if (isMobile) {
    return <ClusterTaxonomyMobile />;
  }

  return <ClusterTaxonomyDesktop />;
}

function ClusterTaxonomyDesktop() {
  const cx = 300;
  const cy = 300;
  const hubR = 60;
  const sectorR = 200;

  // Quadrant angles (in radians): top-right, bottom-right, bottom-left, top-left
  const quadrantAngles = [
    { start: -Math.PI / 2, mid: -Math.PI / 4 },
    { start: 0, mid: Math.PI / 4 },
    { start: Math.PI / 2, mid: (3 * Math.PI) / 4 },
    { start: Math.PI, mid: (-3 * Math.PI) / 4 },
  ];

  return (
    <svg
      viewBox="0 0 600 600"
      className="w-full max-w-xl mx-auto"
      role="img"
      aria-label="Cluster Taxonomy showing learning approaches organized by driver"
    >
      <defs>
        <filter id="ct-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Quadrant sectors */}
      {clusters.map((cluster, qi) => {
        const { mid } = quadrantAngles[qi];
        const clusterCx = cx + (sectorR * 0.48) * Math.cos(mid);
        const clusterCy = cy + (sectorR * 0.48) * Math.sin(mid);

        // Spread approaches around the cluster center
        const approachR = 58;
        const approachAngleSpan = Math.PI * 0.4;

        return (
          <motion.g
            key={cluster.label}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.5 + qi * 0.15,
              duration: 0.5,
              type: 'spring',
            }}
            style={{ transformOrigin: `${clusterCx}px ${clusterCy}px` }}
          >
            {/* Cluster label circle */}
            <circle
              cx={clusterCx}
              cy={clusterCy}
              r={32}
              fill={cluster.color}
              stroke={cluster.activeFill}
              strokeWidth={1.5}
              opacity={0.9}
            />
            {(() => {
              const words = cluster.label.split(' ');
              const lines: string[] = [];
              let cur = '';
              for (const w of words) {
                if ((cur + ' ' + w).trim().length > 10 && cur) {
                  lines.push(cur);
                  cur = w;
                } else {
                  cur = cur ? cur + ' ' + w : w;
                }
              }
              if (cur) lines.push(cur);
              return lines.map((line, li) => (
                <text
                  key={li}
                  x={clusterCx}
                  y={clusterCy + (li - (lines.length - 1) / 2) * 11}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={TEXT_COLOR}
                  fontSize={8}
                  fontWeight={600}
                  fontFamily="system-ui, sans-serif"
                >
                  {line}
                </text>
              ));
            })()}

            {/* Approach nodes */}
            {cluster.approaches.map((approach, ai) => {
              const aAngle =
                mid + (ai - (cluster.approaches.length - 1) / 2) * (approachAngleSpan / Math.max(cluster.approaches.length - 1, 1));
              const ax = clusterCx + approachR * Math.cos(aAngle);
              const ay = clusterCy + approachR * Math.sin(aAngle);

              return (
                <motion.g
                  key={approach}
                  initial={{ opacity: 0, scale: 0.3 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 0.8 + qi * 0.15 + ai * 0.08,
                    duration: 0.35,
                  }}
                >
                  {/* Connector line */}
                  <line
                    x1={clusterCx}
                    y1={clusterCy}
                    x2={ax}
                    y2={ay}
                    stroke={cluster.color}
                    strokeWidth={1}
                    opacity={0.4}
                  />
                  <rect
                    x={ax - 38}
                    y={ay - 12}
                    width={76}
                    height={24}
                    rx={12}
                    fill={cluster.activeFill}
                    opacity={0.85}
                  />
                  <text
                    x={ax}
                    y={ay}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill={TEXT_COLOR}
                    fontSize={8}
                    fontWeight={500}
                    fontFamily="system-ui, sans-serif"
                  >
                    {approach}
                  </text>
                </motion.g>
              );
            })}

            {/* Connector from hub to cluster */}
            <motion.line
              x1={cx}
              y1={cy}
              x2={clusterCx}
              y2={clusterCy}
              stroke={cluster.color}
              strokeWidth={1.5}
              strokeDasharray="4 3"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.5 }}
              transition={{ delay: 0.4 + qi * 0.1, duration: 0.4 }}
            />
          </motion.g>
        );
      })}

      {/* Center hub */}
      <motion.circle
        cx={cx}
        cy={cy}
        r={hubR}
        fill={CENTER_COLOR}
        stroke="oklch(0.60 0.18 270)"
        strokeWidth={2.5}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
      />
      <motion.text
        x={cx}
        y={cy - 10}
        textAnchor="middle"
        dominantBaseline="central"
        fill={TEXT_COLOR}
        fontSize={10}
        fontWeight={700}
        fontFamily="system-ui, sans-serif"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Authentic Student
      </motion.text>
      <motion.text
        x={cx}
        y={cy + 6}
        textAnchor="middle"
        dominantBaseline="central"
        fill={TEXT_COLOR}
        fontSize={10}
        fontWeight={700}
        fontFamily="system-ui, sans-serif"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Learning
      </motion.text>
    </svg>
  );
}

function ClusterTaxonomyMobile() {
  return (
    <div className="w-full max-w-sm mx-auto space-y-4 px-2">
      {/* Center label */}
      <motion.div
        className="text-center py-4 rounded-xl font-bold text-sm"
        style={{ background: CENTER_COLOR, color: TEXT_COLOR }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        Authentic Student Learning
      </motion.div>

      {/* Cluster sections */}
      {clusters.map((cluster, i) => (
        <motion.div
          key={cluster.label}
          className="rounded-xl p-3"
          style={{ background: cluster.color }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + i * 0.12, duration: 0.4 }}
        >
          <div
            className="text-xs font-semibold mb-2"
            style={{ color: TEXT_COLOR }}
          >
            {cluster.label}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {cluster.approaches.map((approach, ai) => (
              <motion.span
                key={approach}
                className="inline-block px-2.5 py-1 rounded-full text-xs font-medium"
                style={{
                  background: cluster.activeFill,
                  color: TEXT_COLOR,
                }}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.12 + ai * 0.06, duration: 0.3 }}
              >
                {approach}
              </motion.span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
