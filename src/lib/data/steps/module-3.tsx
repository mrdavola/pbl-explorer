"use client";

import { useState } from "react";
import { ScenarioQuiz } from "@/components/interactions/scenario-quiz";
import { FlipCardGrid } from "@/components/interactions/flip-card";
import { ContinueButton } from "@/components/learn/lesson-shell";
import { motion } from "framer-motion";

const MODULE_COLOR = "oklch(0.60 0.14 80)";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
};

const scales = [
  {
    name: "Single-day",
    duration: "1 class period",
    complexity: "Low — try it tomorrow",
    elements: "1-2 elements",
    color: "#16A34A",
    emoji: "⚡",
  },
  {
    name: "Micro",
    duration: "3-5 days",
    complexity: "Moderate — manageable scope",
    elements: "3-4 elements",
    color: "#2563EB",
    emoji: "🔬",
  },
  {
    name: "Mini",
    duration: "1-2 weeks",
    complexity: "Medium — clear milestones",
    elements: "4-5 elements",
    color: "#D97706",
    emoji: "📐",
  },
  {
    name: "Full",
    duration: "3+ weeks",
    complexity: "High — authentic audience",
    elements: "5-7 elements",
    color: "#9333EA",
    emoji: "🚀",
  },
];

const singleDayIdeas = [
  {
    icon: "🎤",
    title: "Replace a test",
    description: "Have students teach the concept to someone else instead of taking a traditional test.",
  },
  {
    icon: "❓",
    title: "Need to Know wall",
    description: "Show a hook, then have students generate questions about what they need to learn.",
  },
  {
    icon: "💻",
    title: "Expert Zoom",
    description: "15-minute virtual guest visit — students prepare and ask real questions.",
  },
  {
    icon: "✉️",
    title: "Real audience letter",
    description: "Students write to a real person about what they\u2019re learning.",
  },
  {
    icon: "🎯",
    title: "Choice board",
    description: "Replace one assignment with 3-4 product options students choose from.",
  },
];

/* Step 1 — Hook */
function Step1({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col flex-1">
      <motion.div {...fadeUp}>
        <h2 className="text-2xl font-bold mb-2">Start Small</h2>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          You don&rsquo;t have to redesign your entire year.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="rounded-2xl border-2 p-6 text-white text-center"
        style={{ backgroundColor: MODULE_COLOR, borderColor: MODULE_COLOR }}
      >
        <div className="text-4xl mb-4">🌱</div>
        <h3 className="text-xl font-bold mb-2">
          What if you could try PBL tomorrow &mdash; in a single class period?
        </h3>
        <p className="text-sm opacity-90 leading-relaxed">
          PBL isn&rsquo;t all-or-nothing. You can start with small, low-risk
          activities and grow from there. Let&rsquo;s explore how.
        </p>
      </motion.div>

      <ContinueButton onClick={onNext} moduleColor={MODULE_COLOR} />
    </div>
  );
}

/* Step 2 — The 4 Scales (Tab Selector) */
function Step2({ onNext }: { onNext: () => void }) {
  const [activeTab, setActiveTab] = useState(0);
  const active = scales[activeTab];

  return (
    <div className="flex flex-col flex-1">
      <motion.div {...fadeUp}>
        <h2 className="text-2xl font-bold mb-1">The 4 Scales of PBL</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Tap each scale to explore what it looks like.
        </p>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 mb-5 overflow-x-auto">
        {scales.map((scale, i) => (
          <button
            key={scale.name}
            onClick={() => setActiveTab(i)}
            className="px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all shrink-0 press-scale"
            style={{
              borderColor: activeTab === i ? scale.color : "var(--color-border)",
              backgroundColor: activeTab === i ? scale.color : "transparent",
              color: activeTab === i ? "white" : "var(--color-muted-foreground)",
            }}
          >
            {scale.emoji} {scale.name}
          </button>
        ))}
      </div>

      {/* Active Card */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-2xl border-2 p-6 text-white"
        style={{ backgroundColor: active.color, borderColor: active.color }}
      >
        <h3 className="text-xl font-bold mb-4">
          {active.emoji} {active.name}
        </h3>
        <div className="space-y-3">
          <div>
            <p className="text-xs uppercase tracking-wider opacity-70 font-semibold">Duration</p>
            <p className="text-sm font-medium">{active.duration}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider opacity-70 font-semibold">Complexity</p>
            <p className="text-sm font-medium">{active.complexity}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider opacity-70 font-semibold">
              Gold Standard Elements
            </p>
            <p className="text-sm font-medium">{active.elements}</p>
          </div>
        </div>
      </motion.div>

      <ContinueButton onClick={onNext} moduleColor={MODULE_COLOR} />
    </div>
  );
}

/* Step 3 — 5 Single-Day Ideas */
function Step3({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col flex-1">
      <motion.div {...fadeUp}>
        <h2 className="text-xl font-bold mb-1">5 Things You Can Try Tomorrow</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Single-day PBL activities that require zero prep overhaul.
        </p>
      </motion.div>

      <div className="flex flex-col gap-3">
        {singleDayIdeas.map((idea, i) => (
          <motion.div
            key={idea.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
            className="rounded-2xl border-2 border-border p-4 bg-card flex items-start gap-3"
          >
            <span className="text-2xl shrink-0">{idea.icon}</span>
            <div>
              <p className="font-semibold text-sm">{idea.title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {idea.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <ContinueButton onClick={onNext} moduleColor={MODULE_COLOR} />
    </div>
  );
}

/* Step 4 — Micro-Project Examples (Flip Cards) */
function Step4({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col flex-1">
      <motion.div {...fadeUp}>
        <h2 className="text-xl font-bold mb-1">Micro-Project Examples</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Tap each card to see the details.
        </p>
      </motion.div>
      <FlipCardGrid
        cards={[
          {
            front: "Infographic Campaign (Gr 4-6)",
            back: "Students create infographics to teach younger students about math concepts. 3-5 days, Math/ELA.",
          },
          {
            front: "Letter to a Decision-Maker (Gr 6-8)",
            back: "Research a local issue, write persuasive letters to real officials. 3-5 days, ELA/SS.",
          },
          {
            front: "Shark Tank Pitch (Gr 8-12)",
            back: "Develop and pitch solutions to real problems. 5 days, Cross-curricular.",
          },
        ]}
        color={MODULE_COLOR}
        onAllFlipped={() => {}}
      />
      <ContinueButton onClick={onNext} moduleColor={MODULE_COLOR} />
    </div>
  );
}

/* Step 5 — Growth Path Quiz */
function Step5({ onNext }: { onNext: () => void }) {
  return (
    <ScenarioQuiz
      question="What's the BEST way to start with PBL?"
      options={[
        { label: "Jump straight into a 6-week project", correct: false },
        {
          label: "Start with a single-day activity and build up",
          correct: true,
        },
      ]}
      correctFeedback="Starting small lets you build confidence and refine your approach. Try a single-day activity, then grow to micro-projects, mini-projects, and eventually full PBL units."
      incorrectFeedback="Jumping into a full project without experience can be overwhelming for both you and your students. Start with a single-day activity, build confidence, and scale up from there."
      onComplete={onNext}
      moduleColor={MODULE_COLOR}
    />
  );
}

/* Step 6 — Completion */
function Step6({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col flex-1 items-center justify-center text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="text-6xl mb-6"
      >
        🎉
      </motion.div>
      <motion.h2
        {...fadeUp}
        className="text-2xl font-bold mb-3"
      >
        You&rsquo;re ready to start!
      </motion.h2>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <p className="text-muted-foreground mb-2">Key takeaways:</p>
        <ul className="text-sm text-left space-y-2 mb-6 max-w-sm">
          <li className="flex items-start gap-2">
            <span className="text-success mt-0.5">✓</span>
            <span>PBL comes in 4 scales &mdash; from single-day to full units</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-success mt-0.5">✓</span>
            <span>You can try 5 low-prep activities in your next class</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-success mt-0.5">✓</span>
            <span>Micro-projects (3-5 days) are a great next step</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-success mt-0.5">✓</span>
            <span>Start small, build confidence, then scale up</span>
          </li>
        </ul>
      </motion.div>
      <ContinueButton
        onClick={onNext}
        moduleColor={MODULE_COLOR}
        label="Complete Module"
      />
    </div>
  );
}

export const module3Steps = [Step1, Step2, Step3, Step4, Step5, Step6];
