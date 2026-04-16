"use client";

import { ScenarioQuiz } from "@/components/interactions/scenario-quiz";
import { FlipCardGrid } from "@/components/interactions/flip-card";
import { ContinueButton } from "@/components/learn/lesson-shell";
import { motion } from "framer-motion";

const MODULE_COLOR = "oklch(0.50 0.16 270)";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
};

/* Step 1 — Hook */
function Step1({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col flex-1">
      <motion.div {...fadeUp}>
        <h2 className="text-2xl font-bold mb-2">The Alphabet Soup Explained</h2>
        <p className="text-muted-foreground mb-6">
          PBL, PrBL, CBL, STEM, IBL&hellip; there are SO many acronyms in education.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-2xl border-2 border-border p-6 bg-card mb-6"
      >
        <p className="text-sm leading-relaxed text-muted-foreground">
          Every time you turn around, there&rsquo;s a new acronym for a &ldquo;new&rdquo;
          teaching approach. It can feel overwhelming &mdash; and a little silly. But here&rsquo;s
          the good news: once you understand how they relate to each other, the alphabet
          soup starts to make sense.
        </p>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-sm text-muted-foreground text-center"
      >
        Let&rsquo;s sort them out once and for all.
      </motion.p>

      <ContinueButton onClick={onNext} moduleColor={MODULE_COLOR} />
    </div>
  );
}

/* Step 2 — The Big Picture (visual hierarchy) */
function Step2({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col flex-1">
      <motion.div {...fadeUp}>
        <h2 className="text-2xl font-bold mb-2">The Big Picture</h2>
        <p className="text-muted-foreground mb-6">
          PBL is the broadest framework. Other approaches fit inside or overlap with it.
        </p>
      </motion.div>

      {/* Visual bubble hierarchy */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="relative flex items-center justify-center mb-6"
      >
        {/* Outer ring — PBL */}
        <div
          className="relative rounded-full flex items-center justify-center"
          style={{
            width: 280,
            height: 280,
            backgroundColor: "oklch(0.50 0.16 270 / 0.12)",
            border: "2px solid oklch(0.50 0.16 270 / 0.4)",
          }}
        >
          <span
            className="absolute top-3 left-1/2 -translate-x-1/2 text-xs font-bold uppercase tracking-wider"
            style={{ color: MODULE_COLOR }}
          >
            Project-Based Learning
          </span>

          {/* Inner bubbles */}
          <div className="flex flex-wrap gap-2 justify-center items-center px-4 pt-4">
            {[
              { label: "Problem-Based", delay: 0.3 },
              { label: "Design Thinking", delay: 0.4 },
              { label: "Challenge-Based", delay: 0.5 },
              { label: "Inquiry-Based", delay: 0.6 },
              { label: "Service Learning", delay: 0.7 },
            ].map((item) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: item.delay, type: "spring", stiffness: 200, damping: 15 }}
                className="rounded-full px-3 py-1.5 text-xs font-medium text-white text-center"
                style={{ backgroundColor: MODULE_COLOR }}
              >
                {item.label}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Separate items outside PBL */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex flex-wrap gap-2 justify-center mb-4"
      >
        {["STEM / STEAM", "Genius Hour"].map((label) => (
          <div
            key={label}
            className="rounded-full px-3 py-1.5 text-xs font-medium border-2 border-dashed border-border text-muted-foreground"
          >
            {label} <span className="opacity-60">(not a method)</span>
          </div>
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-sm text-muted-foreground text-center"
      >
        The approaches inside the circle are subsets or close relatives of PBL.
        The ones outside are lenses or formats &mdash; not teaching methods.
      </motion.p>

      <ContinueButton onClick={onNext} moduleColor={MODULE_COLOR} />
    </div>
  );
}

/* Step 3 — Key Comparisons Part 1 */
function Step3({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col flex-1">
      <motion.div {...fadeUp}>
        <h2 className="text-xl font-bold mb-1">Key Comparisons &mdash; Part 1</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Tap each card to see how it differs from PBL.
        </p>
      </motion.div>
      <FlipCardGrid
        cards={[
          {
            front: "How is Problem-Based Learning different from PBL?",
            back: "Problem-Based Learning focuses on solving a specific case or problem (often in days-weeks). PBL is broader: students learn THROUGH a sustained project that results in a public product.",
          },
          {
            front: "How is Design Thinking different from PBL?",
            back: "Design Thinking is a creative PROCESS (empathize, define, ideate, prototype, test). It can be used WITHIN PBL, but it\u2019s a methodology, not a full teaching framework.",
          },
        ]}
        color={MODULE_COLOR}
        onAllFlipped={() => {}}
      />
      <ContinueButton onClick={onNext} moduleColor={MODULE_COLOR} />
    </div>
  );
}

/* Step 4 — Key Comparisons Part 2 */
function Step4({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col flex-1">
      <motion.div {...fadeUp}>
        <h2 className="text-xl font-bold mb-1">Key Comparisons &mdash; Part 2</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Two more approaches that overlap with PBL.
        </p>
      </motion.div>
      <FlipCardGrid
        cards={[
          {
            front: "How is Challenge-Based Learning different from PBL?",
            back: "In CBL, students IDENTIFY the challenge themselves (often a real-world issue). In PBL the teacher typically frames the driving question. CBL is student-driven from the very start.",
          },
          {
            front: "How is Inquiry-Based Learning different from PBL?",
            back: "IBL is about asking questions and investigating \u2014 it doesn\u2019t always result in a product. PBL always produces a public product. Think of IBL as the research engine inside PBL.",
          },
        ]}
        color={MODULE_COLOR}
        onAllFlipped={() => {}}
      />
      <ContinueButton onClick={onNext} moduleColor={MODULE_COLOR} />
    </div>
  );
}

/* Step 5 — Lens vs Method Distinction */
function Step5({ onNext }: { onNext: () => void }) {
  const cards = [
    {
      emoji: "\uD83D\uDD2C",
      title: "STEM / STEAM",
      type: "Content Lens",
      description:
        "STEM describes WHAT content you teach (Science, Technology, Engineering, Math). It\u2019s not a teaching method \u2014 you can teach STEM through PBL, lectures, or anything else.",
    },
    {
      emoji: "\uD83D\uDCA1",
      title: "Genius Hour",
      type: "Dedicated Time",
      description:
        "Genius Hour gives students dedicated time to explore personal interests. It\u2019s a format, not a method \u2014 students might use PBL, inquiry, or independent study during that time.",
    },
    {
      emoji: "\uD83E\uDD1D",
      title: "Service Learning",
      type: "Community Focus",
      description:
        "Service Learning is community-focused \u2014 the goal is civic action. It often uses PBL as the vehicle, but the defining feature is service to others, not the project process.",
    },
  ];

  return (
    <div className="flex flex-col flex-1">
      <motion.div {...fadeUp}>
        <h2 className="text-xl font-bold mb-1">Lens vs. Method</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Not everything with an acronym is a teaching method.
        </p>
      </motion.div>

      <div className="grid gap-3 mb-4">
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 * i }}
            className="rounded-2xl border-2 border-border p-5 bg-card"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{card.emoji}</span>
              <div>
                <h3 className="font-bold text-sm">{card.title}</h3>
                <span
                  className="text-xs font-semibold uppercase tracking-wider"
                  style={{ color: MODULE_COLOR }}
                >
                  {card.type}
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {card.description}
            </p>
          </motion.div>
        ))}
      </div>

      <ContinueButton onClick={onNext} moduleColor={MODULE_COLOR} />
    </div>
  );
}

/* Step 6 — Sort Quiz */
function Step6({ onNext }: { onNext: () => void }) {
  return (
    <ScenarioQuiz
      question="STEM is a ___."
      options={[
        { label: "Teaching method like PBL", correct: false },
        { label: "Content lens that can be used WITH PBL", correct: true },
      ]}
      correctFeedback="Exactly! STEM describes WHAT content you teach. PBL describes HOW you teach it. You can absolutely teach STEM through PBL."
      incorrectFeedback="Not quite. STEM describes WHAT content you teach (Science, Technology, Engineering, Math). PBL describes HOW you teach it. They\u2019re different categories entirely."
      onComplete={onNext}
      moduleColor={MODULE_COLOR}
    />
  );
}

/* Step 7 — Completion */
function Step7({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col flex-1 items-center justify-center text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="text-6xl mb-6"
      >
        {"\uD83E\uDDE9"}
      </motion.div>
      <motion.h2
        {...fadeUp}
        className="text-2xl font-bold mb-3"
      >
        Alphabet Soup — Decoded!
      </motion.h2>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <p className="text-muted-foreground mb-2">Here&rsquo;s the takeaway:</p>
        <div
          className="rounded-2xl p-5 mb-6 max-w-sm text-left text-white"
          style={{ backgroundColor: MODULE_COLOR }}
        >
          <p className="text-sm leading-relaxed font-medium">
            PBL is the broadest framework. Everything else is either a subset, a
            lens, or a specific process that can be used within PBL.
          </p>
        </div>
        <ul className="text-sm text-left space-y-2 mb-6 max-w-sm">
          <li className="flex items-start gap-2">
            <span className="text-success mt-0.5">{"\u2713"}</span>
            <span>Problem-Based, Challenge-Based, and Inquiry-Based are close relatives of PBL</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-success mt-0.5">{"\u2713"}</span>
            <span>Design Thinking is a process you can use inside PBL</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-success mt-0.5">{"\u2713"}</span>
            <span>STEM/STEAM is a content lens, not a teaching method</span>
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

export const module6Steps = [Step1, Step2, Step3, Step4, Step5, Step6, Step7];
