"use client";

import { ScenarioQuiz } from "@/components/interactions/scenario-quiz";
import { FlipCardGrid } from "@/components/interactions/flip-card";
import { DragSort } from "@/components/interactions/drag-sort";
import { ContinueButton } from "@/components/learn/lesson-shell";
import { motion } from "framer-motion";

const MODULE_COLOR = "oklch(0.55 0.14 25)";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
};

/* Step 1 — Scenario Hook */
function Step1({ onNext }: { onNext: () => void }) {
  return (
    <ScenarioQuiz
      question="Your colleague assigns a poster project after a unit on the American Revolution. Students research a topic, create a poster, and present it to the class. Is this PBL?"
      options={[
        { label: "Yes — they're making a project!", correct: false },
        { label: "No — this isn't really PBL", correct: true },
      ]}
      correctFeedback="This is 'doing a project' — the project comes AFTER the learning, not THROUGH it. In PBL, the project IS the unit."
      incorrectFeedback="This is a common misconception. The poster comes after the unit is taught. In true PBL, students learn THROUGH the project, not before it."
      onComplete={onNext}
      moduleColor={MODULE_COLOR}
    />
  );
}

/* Step 2 — Dessert vs Main Course */
function Step2({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col flex-1">
      <motion.div {...fadeUp}>
        <h2 className="text-2xl font-bold mb-2">The Key Distinction</h2>
        <p className="text-muted-foreground mb-8">
          Think of it like a meal...
        </p>
      </motion.div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        {/* Dessert */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="rounded-2xl border-2 border-border p-5 bg-card text-center"
        >
          <div className="text-4xl mb-3">🍰</div>
          <h3 className="font-bold text-sm mb-2">&ldquo;Doing a Project&rdquo;</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            A fun add-on <em>after</em> the &ldquo;real&rdquo; teaching is done. The dessert.
          </p>
        </motion.div>

        {/* Main Course */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="rounded-2xl border-2 p-5 text-center text-white"
          style={{ backgroundColor: MODULE_COLOR, borderColor: MODULE_COLOR }}
        >
          <div className="text-4xl mb-3">🥘</div>
          <h3 className="font-bold text-sm mb-2">Project-Based Learning</h3>
          <p className="text-xs opacity-90 leading-relaxed">
            The project IS how students learn. It&rsquo;s the main course.
          </p>
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-sm text-muted-foreground leading-relaxed text-center"
      >
        In PBL, the project isn&rsquo;t assigned at the end — it drives the entire learning experience from day one.
      </motion.p>

      <ContinueButton onClick={onNext} moduleColor={MODULE_COLOR} />
    </div>
  );
}

/* Steps 3–4 — Flip Cards (2 per step) */
const flipPairs = [
  {
    front: "Comes AFTER the unit is taught",
    back: "IS the unit — learning happens through the project",
  },
  {
    front: "Teacher assigns the topic",
    back: "Students have voice and choice in what they explore",
  },
  {
    front: "Often results in a poster or report",
    back: "Results in a public product shared beyond the classroom",
  },
  {
    front: "Assessed only at the end",
    back: "Ongoing assessment throughout the process",
  },
  {
    front: "Content is learned first, then applied",
    back: "Content is learned as needed to solve the problem",
  },
  {
    front: "Audience is just the teacher",
    back: "Audience extends beyond the classroom",
  },
];

function Step3({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col flex-1">
      <motion.div {...fadeUp}>
        <h2 className="text-xl font-bold mb-1">
          &ldquo;Doing a Project&rdquo; vs. PBL
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          Tap each card to see the PBL difference.
        </p>
      </motion.div>
      <FlipCardGrid
        cards={flipPairs.slice(0, 2)}
        color={MODULE_COLOR}
        onAllFlipped={() => {}}
      />
      <ContinueButton onClick={onNext} moduleColor={MODULE_COLOR} />
    </div>
  );
}

function Step4({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col flex-1">
      <motion.div {...fadeUp}>
        <h2 className="text-xl font-bold mb-1">More Differences</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Keep flipping to build the full picture.
        </p>
      </motion.div>
      <FlipCardGrid
        cards={flipPairs.slice(2, 4)}
        color={MODULE_COLOR}
        onAllFlipped={() => {}}
      />
      <ContinueButton onClick={onNext} moduleColor={MODULE_COLOR} />
    </div>
  );
}

function Step5({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col flex-1">
      <motion.div {...fadeUp}>
        <h2 className="text-xl font-bold mb-1">The Last Two</h2>
        <p className="text-sm text-muted-foreground mb-6">
          These might be the most important distinctions.
        </p>
      </motion.div>
      <FlipCardGrid
        cards={flipPairs.slice(4, 6)}
        color={MODULE_COLOR}
        onAllFlipped={() => {}}
      />
      <ContinueButton onClick={onNext} moduleColor={MODULE_COLOR} />
    </div>
  );
}

/* Step 6 — Real Example Before/After */
function Step6({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col flex-1">
      <motion.div {...fadeUp}>
        <h2 className="text-2xl font-bold mb-6">See It in Action</h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="rounded-2xl border-2 border-border p-5 bg-card mb-4"
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground bg-muted px-2 py-0.5 rounded-md">
            Before
          </span>
          <span className="text-xs text-muted-foreground">Doing a Project</span>
        </div>
        <p className="text-sm leading-relaxed">
          Mrs. Garcia teaches fractions for 3 weeks, then assigns a poster project where students illustrate fraction concepts.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-2xl border-2 p-5 text-white mb-4"
        style={{ backgroundColor: MODULE_COLOR, borderColor: MODULE_COLOR }}
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-md">
            After
          </span>
          <span className="text-xs opacity-80">Project-Based Learning</span>
        </div>
        <p className="text-sm leading-relaxed opacity-95">
          Mrs. Garcia&rsquo;s students run a class bakery. They learn fractions by halving and doubling recipes, pricing items, and making change. The bakery sale IS the unit.
        </p>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-sm text-muted-foreground text-center"
      >
        Same content. Completely different experience.
      </motion.p>

      <ContinueButton onClick={onNext} moduleColor={MODULE_COLOR} />
    </div>
  );
}

/* Step 7 — Knowledge Check (Drag Sort) */
function Step7({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col flex-1">
      <motion.div {...fadeUp}>
        <h2 className="text-xl font-bold mb-1">Knowledge Check</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Sort each scenario into the correct category.
        </p>
      </motion.div>
      <DragSort
        items={[
          {
            id: "a",
            label: "Students build a weather station to learn about climate data",
            correctZone: "pbl",
          },
          {
            id: "b",
            label: "After a biology unit, students make a cell model",
            correctZone: "project",
          },
          {
            id: "c",
            label: "Teams design a school garden to study ecosystems",
            correctZone: "pbl",
          },
          {
            id: "d",
            label: "Teacher assigns a diorama after reading a novel",
            correctZone: "project",
          },
        ]}
        zones={[
          {
            id: "project",
            label: "Doing a Project",
            color: "oklch(0.55 0.005 15)",
          },
          {
            id: "pbl",
            label: "Project-Based Learning",
            color: MODULE_COLOR,
          },
        ]}
        onComplete={onNext}
        moduleColor={MODULE_COLOR}
      />
    </div>
  );
}

/* Step 8 — Completion summary (handled by parent as celebration) */
function Step8({ onNext }: { onNext: () => void }) {
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
        You nailed it!
      </motion.h2>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <p className="text-muted-foreground mb-2">Here&rsquo;s what you learned:</p>
        <ul className="text-sm text-left space-y-2 mb-6 max-w-sm">
          <li className="flex items-start gap-2">
            <span className="text-success mt-0.5">✓</span>
            <span>The difference between &ldquo;doing a project&rdquo; and PBL</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-success mt-0.5">✓</span>
            <span>In PBL, the project IS the unit — not an add-on</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-success mt-0.5">✓</span>
            <span>PBL features student voice, public products, and real audiences</span>
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

export const module1Steps = [Step1, Step2, Step3, Step4, Step5, Step6, Step7, Step8];
