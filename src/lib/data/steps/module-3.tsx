"use client";

import { useState } from "react";
import { ScenarioQuiz } from "@/components/interactions/scenario-quiz";
import { FlipCardGrid } from "@/components/interactions/flip-card";
import { ChoiceCards } from "@/components/interactions/choice-cards";
import { ReflectionPrompt } from "@/components/interactions/reflection-prompt";
import { GoDeeper } from "@/components/learn/go-deeper";
import { ContinueButton } from "@/components/learn/lesson-shell";
import { motion } from "framer-motion";
import { Zap, Clock, Calendar, CalendarRange } from "lucide-react";
import type { Resource } from "@/lib/data/resources";

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
    emoji: "",
  },
  {
    name: "Micro",
    duration: "3-5 days",
    complexity: "Moderate — manageable scope",
    elements: "3-4 elements",
    color: "#2563EB",
    emoji: "",
  },
  {
    name: "Mini",
    duration: "1-2 weeks",
    complexity: "Medium — clear milestones",
    elements: "4-5 elements",
    color: "#D97706",
    emoji: "",
  },
  {
    name: "Full",
    duration: "3+ weeks",
    complexity: "High — authentic audience",
    elements: "5-7 elements",
    color: "#9333EA",
    emoji: "",
  },
];

const singleDayIdeas = [
  {
    icon: "",
    title: "Replace a test",
    description: "Have students teach the concept to someone else instead of taking a traditional test.",
  },
  {
    icon: "",
    title: "Need to Know wall",
    description: "Show a hook, then have students generate questions about what they need to learn.",
  },
  {
    icon: "",
    title: "Expert Zoom",
    description: "15-minute virtual guest visit — students prepare and ask real questions.",
  },
  {
    icon: "",
    title: "Real audience letter",
    description: "Students write to a real person about what they\u2019re learning.",
  },
  {
    icon: "",
    title: "Choice board",
    description: "Replace one assignment with 3-4 product options students choose from.",
  },
];

const module3Resources: Resource[] = [
  {
    title: "Getting Started with PBL",
    source: "PBLWorks",
    type: "article",
    url: "https://www.pblworks.org/blog/getting-started-with-pbl",
    description: "Practical tips for teachers launching their first project-based learning experience.",
    moduleSlug: "start-small",
    stepIndex: 2,
  },
  {
    title: "Micro-PBL: Small Steps to Big Impact",
    source: "Edutopia",
    type: "article",
    url: "https://www.edutopia.org/article/micro-pbl-small-steps-big-impact",
    description: "How to use micro-projects to build PBL confidence before committing to longer units.",
    moduleSlug: "start-small",
    stepIndex: 2,
  },
  {
    title: "PBL Starter Kit",
    source: "PBLWorks",
    type: "tool",
    url: "https://www.pblworks.org/shop/pbl-starter-kit",
    description: "A curated toolkit with templates, rubrics, and planning guides for your first PBL unit.",
    moduleSlug: "start-small",
    stepIndex: 2,
  },
];

/* Step 1 — Hook */
function Step1({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col flex-1">
      <motion.div {...fadeUp}>
        <h2 className="text-3xl font-bold mb-2">Start Small</h2>
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
        <h3 className="text-3xl font-bold mb-2">
          What if you could try PBL tomorrow &mdash; in a single class period?
        </h3>
        <p className="text-base opacity-90 leading-relaxed">
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
        <h2 className="text-3xl font-bold mb-1">The 4 Scales of PBL</h2>
        <p className="text-base text-muted-foreground mb-6">
          Tap each scale to explore what it looks like.
        </p>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 mb-5 overflow-x-auto">
        {scales.map((scale, i) => (
          <button
            key={scale.name}
            onClick={() => setActiveTab(i)}
            className="px-4 py-2 rounded-xl text-base font-medium border-2 transition-all shrink-0 press-scale"
            style={{
              borderColor: activeTab === i ? scale.color : "var(--color-border)",
              backgroundColor: activeTab === i ? scale.color : "transparent",
              color: activeTab === i ? "white" : "var(--color-muted-foreground)",
            }}
          >
            {scale.name}
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
        <h3 className="text-2xl font-bold mb-4">
          {active.name}
        </h3>
        <div className="space-y-3">
          <div>
            <p className="text-xs uppercase tracking-wider opacity-70 font-semibold">Duration</p>
            <p className="text-base font-medium">{active.duration}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider opacity-70 font-semibold">Complexity</p>
            <p className="text-base font-medium">{active.complexity}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wider opacity-70 font-semibold">
              Gold Standard Elements
            </p>
            <p className="text-base font-medium">{active.elements}</p>
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
        <h2 className="text-2xl font-bold mb-1">5 Things You Can Try Tomorrow</h2>
        <p className="text-base text-muted-foreground mb-6">
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
            className="rounded-2xl border-2 border-border p-4 bg-card"
          >
            <div>
              <p className="font-semibold text-base">{idea.title}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {idea.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <GoDeeper
        resources={module3Resources}
        moduleColor={MODULE_COLOR}
      />

      <ContinueButton onClick={onNext} moduleColor={MODULE_COLOR} />
    </div>
  );
}

/* Step 4 — Micro-Project Examples (Flip Cards) */
function Step4({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col flex-1">
      <motion.div {...fadeUp}>
        <h2 className="text-2xl font-bold mb-1">Micro-Project Examples</h2>
        <p className="text-base text-muted-foreground mb-6">
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

/* Step 6 — Choose Your PBL Scale (Builder Moment) */
function Step6({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col flex-1">
      <motion.div {...fadeUp}>
        <div
          className="text-xs font-semibold uppercase tracking-wider mb-2"
          style={{ color: MODULE_COLOR }}
        >
          Building your plan
        </div>
        <ChoiceCards
          question="What scale feels right for your first PBL experience?"
          options={[
            {
              id: "single-day",
              title: "Single-Day Challenge",
              description:
                "A focused, one-class-period PBL experience. Low risk, high energy.",
              icon: Zap,
            },
            {
              id: "micro",
              title: "Micro Project (2-3 days)",
              description:
                "A short project that fits within a week. Good for testing the waters.",
              icon: Clock,
            },
            {
              id: "mini",
              title: "Mini Unit (1-2 weeks)",
              description:
                "A structured project with multiple phases. Real PBL momentum.",
              icon: Calendar,
            },
            {
              id: "full",
              title: "Full Unit (3+ weeks)",
              description:
                "A sustained, deep-dive PBL unit with all the phases. The full experience.",
              icon: CalendarRange,
            },
          ]}
          mode="single"
          onComplete={() => onNext()}
          moduleColor={MODULE_COLOR}
        />
      </motion.div>
    </div>
  );
}

/* Step 7 — End-of-Module Reflection */
function Step7({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col flex-1">
      <motion.div {...fadeUp}>
        <ReflectionPrompt
          question="What's one thing you could try in your classroom this week using PBL at any scale?"
          placeholder="Think about a lesson coming up that could become a mini project..."
          storageKey="module-3-reflection"
          onComplete={onNext}
          moduleColor={MODULE_COLOR}
        />
      </motion.div>
    </div>
  );
}

/* Step 8 — Completion */
function Step8({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col flex-1 items-center justify-center text-center">
      <motion.h2
        {...fadeUp}
        className="text-3xl font-bold mb-3"
      >
        You&rsquo;re ready to start!
      </motion.h2>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <p className="text-muted-foreground mb-2">Key takeaways:</p>
        <ul className="text-base text-left space-y-2 mb-6 max-w-sm">
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

export const module3Steps = [Step1, Step2, Step3, Step4, Step5, Step6, Step7, Step8];

export const module3NarrateTexts: string[] = [
  "You don't have to redesign your entire year to do PBL. What if you could try it tomorrow, in a single class period? PBL isn't all-or-nothing — you can start with small, low-risk activities and grow from there.",
  "PBL comes in four scales. Single-day activities take just one class period. Micro-projects run three to five days. Mini-projects span one to two weeks. And full PBL units go three weeks or more. Each scale includes more Gold Standard elements.",
  "Here are five things you can try tomorrow with zero prep overhaul: replace a test with student teaching, create a Need to Know wall, invite an expert for a quick Zoom, have students write to a real person, or offer a choice board instead of one assignment.",
  "Micro-projects are a great next step after single-day activities. They run three to five days and give students a real taste of PBL — like creating infographics for younger students or writing persuasive letters to local officials.",
  "The best way to start with PBL is to begin small and build up. Starting with a single-day activity lets you build confidence and refine your approach before scaling to longer projects.",
  "Think about which scale feels right for your first PBL experience. There's no wrong answer — what matters is choosing a starting point that feels manageable and exciting for you.",
  "What's one thing you could try in your classroom this week? It doesn't have to be a full PBL unit — even a small shift toward student-driven learning counts.",
  "Well done! You now know that PBL comes in four scales, you have five low-prep activities to try, and the key is to start small, build confidence, and scale up over time.",
];
