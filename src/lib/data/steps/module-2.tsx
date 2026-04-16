"use client";

import { ScenarioQuiz } from "@/components/interactions/scenario-quiz";
import { DragSort } from "@/components/interactions/drag-sort";
import { ContinueButton } from "@/components/learn/lesson-shell";
import { motion } from "framer-motion";

const MODULE_COLOR = "oklch(0.45 0.18 280)";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
};

const phases = [
  {
    number: 1,
    name: "Entry Event",
    description: "Sparks curiosity, hooks students into the project",
    color: "#E8634A",
  },
  {
    number: 2,
    name: "Investigation",
    description: "Research, skill-building, and empathy work",
    color: "#4338CA",
  },
  {
    number: 3,
    name: "Problem / Design Challenge",
    description: "Define the driving question that guides the work",
    color: "#0D7377",
  },
  {
    number: 4,
    name: "Create",
    description: "Ideate, prototype, test, and refine solutions",
    color: "#D97706",
  },
  {
    number: 5,
    name: "Share",
    description: "Present to an authentic audience and reflect",
    color: "#7C3AED",
  },
];

/* Step 1 — Hook */
function Step1({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col flex-1">
      <motion.div {...fadeUp}>
        <h2 className="text-2xl font-bold mb-2">A Quick Question</h2>
        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          What do a great novel and a great PBL unit have in common?
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="rounded-2xl border-2 p-6 text-white text-center"
        style={{ backgroundColor: MODULE_COLOR, borderColor: MODULE_COLOR }}
      >
        <div className="text-4xl mb-4">📖</div>
        <h3 className="text-xl font-bold mb-2 text-white">They both follow a story structure.</h3>
        <p className="text-sm text-white/90 leading-relaxed">
          Great PBL units unfold like a narrative &mdash; with a hook, rising action, a
          climax of creation, and a resolution where students share their work
          with the world.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-6"
      >
        <div className="h-1 rounded-full overflow-hidden bg-muted">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: MODULE_COLOR }}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
          />
        </div>
        <p className="text-xs text-muted-foreground text-center mt-2">
          The Learning Narrative &mdash; a 5-phase story arc for PBL
        </p>
      </motion.div>

      <ContinueButton onClick={onNext} moduleColor={MODULE_COLOR} />
    </div>
  );
}

/* Step 2 — Overview: The 5 Phases */
function Step2({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col flex-1">
      <motion.div {...fadeUp}>
        <h2 className="text-2xl font-bold mb-1">The Learning Narrative</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Every great PBL unit follows these 5 phases &mdash; like chapters in a story.
        </p>
      </motion.div>

      <div className="flex flex-col gap-3">
        {phases.map((phase, i) => (
          <motion.div
            key={phase.number}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.1, duration: 0.4 }}
            className="flex items-start gap-4"
          >
            {/* Timeline line + dot */}
            <div className="flex flex-col items-center">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                style={{ backgroundColor: phase.color }}
              >
                {phase.number}
              </div>
              {i < phases.length - 1 && (
                <div className="w-0.5 h-8 bg-border mt-1" />
              )}
            </div>
            {/* Content */}
            <div className="pt-1.5">
              <p className="font-semibold text-sm" style={{ color: phase.color }}>
                {phase.name}
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {phase.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <ContinueButton onClick={onNext} moduleColor={MODULE_COLOR} />
    </div>
  );
}

/* Step 3 — Phase 1 Deep Dive: Entry Event */
function Step3({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col flex-1">
      <motion.div {...fadeUp}>
        <div className="flex items-center gap-2 mb-3">
          <span
            className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
            style={{ backgroundColor: "#E8634A" }}
          >
            1
          </span>
          <h2 className="text-xl font-bold">Entry Event</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-6">
          The hook that sparks curiosity and draws students in.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="rounded-2xl border-2 border-border p-5 bg-card"
        >
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
            🧑‍🏫 Teacher
          </p>
          <ul className="text-xs text-muted-foreground space-y-2 leading-relaxed">
            <li>Present the entry event</li>
            <li>Facilitate questions</li>
            <li>Capture student reactions</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="rounded-2xl border-2 p-5 text-white"
          style={{ backgroundColor: "#E8634A", borderColor: "#E8634A" }}
        >
          <p className="text-xs font-bold uppercase tracking-wider opacity-80 mb-3">
            🎒 Student
          </p>
          <ul className="text-xs opacity-90 space-y-2 leading-relaxed">
            <li>Experience the hook</li>
            <li>Generate questions</li>
            <li>Connect to prior knowledge</li>
          </ul>
        </motion.div>
      </div>

      <ContinueButton onClick={onNext} moduleColor={MODULE_COLOR} />
    </div>
  );
}

/* Step 4 — Phase 2 Deep Dive: Investigation */
function Step4({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col flex-1">
      <motion.div {...fadeUp}>
        <div className="flex items-center gap-2 mb-3">
          <span
            className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
            style={{ backgroundColor: "#4338CA" }}
          >
            2
          </span>
          <h2 className="text-xl font-bold">Investigation</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-6">
          Research, skill-building, and developing empathy.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="rounded-2xl border-2 border-border p-5 bg-card"
        >
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
            🧑‍🏫 Teacher
          </p>
          <ul className="text-xs text-muted-foreground space-y-2 leading-relaxed">
            <li>Guide research processes</li>
            <li>Connect with resources &amp; experts</li>
            <li>Facilitate empathy exercises</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="rounded-2xl border-2 p-5 text-white"
          style={{ backgroundColor: "#4338CA", borderColor: "#4338CA" }}
        >
          <p className="text-xs font-bold uppercase tracking-wider opacity-80 mb-3">
            🎒 Student
          </p>
          <ul className="text-xs opacity-90 space-y-2 leading-relaxed">
            <li>Research from multiple perspectives</li>
            <li>Build new skills</li>
            <li>Develop empathy</li>
          </ul>
        </motion.div>
      </div>

      <ContinueButton onClick={onNext} moduleColor={MODULE_COLOR} />
    </div>
  );
}

/* Step 5 — Phase 3 Deep Dive: Problem / Design Challenge */
function Step5({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col flex-1">
      <motion.div {...fadeUp}>
        <div className="flex items-center gap-2 mb-3">
          <span
            className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
            style={{ backgroundColor: "#0D7377" }}
          >
            3
          </span>
          <h2 className="text-xl font-bold">Problem / Design Challenge</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-6">
          Define the driving question that guides all the work.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="rounded-2xl border-2 border-border p-5 bg-card"
        >
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
            🧑‍🏫 Teacher
          </p>
          <ul className="text-xs text-muted-foreground space-y-2 leading-relaxed">
            <li>Help refine the driving question</li>
            <li>Facilitate Need to Know lists</li>
            <li>Connect students with experts</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="rounded-2xl border-2 p-5 text-white"
          style={{ backgroundColor: "#0D7377", borderColor: "#0D7377" }}
        >
          <p className="text-xs font-bold uppercase tracking-wider opacity-80 mb-3">
            🎒 Student
          </p>
          <ul className="text-xs opacity-90 space-y-2 leading-relaxed">
            <li>Refine and own the driving question</li>
            <li>Create a Need to Know list</li>
            <li>Identify what they need to learn</li>
          </ul>
        </motion.div>
      </div>

      <ContinueButton onClick={onNext} moduleColor={MODULE_COLOR} />
    </div>
  );
}

/* Step 6 — Phase 4 Deep Dive: Create */
function Step6({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col flex-1">
      <motion.div {...fadeUp}>
        <div className="flex items-center gap-2 mb-3">
          <span
            className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
            style={{ backgroundColor: "#D97706" }}
          >
            4
          </span>
          <h2 className="text-xl font-bold">Create</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-6">
          Ideate, prototype, test, and refine solutions.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="rounded-2xl border-2 border-border p-5 bg-card"
        >
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
            🧑‍🏫 Teacher
          </p>
          <ul className="text-xs text-muted-foreground space-y-2 leading-relaxed">
            <li>Provide materials and tools</li>
            <li>Facilitate critique cycles</li>
            <li>Coach through iteration</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="rounded-2xl border-2 p-5 text-white"
          style={{ backgroundColor: "#D97706", borderColor: "#D97706" }}
        >
          <p className="text-xs font-bold uppercase tracking-wider opacity-80 mb-3">
            🎒 Student
          </p>
          <ul className="text-xs opacity-90 space-y-2 leading-relaxed">
            <li>Ideate and brainstorm</li>
            <li>Build and test prototypes</li>
            <li>Give/receive feedback and revise</li>
          </ul>
        </motion.div>
      </div>

      <ContinueButton onClick={onNext} moduleColor={MODULE_COLOR} />
    </div>
  );
}

/* Step 7 — Phase 5 Deep Dive: Share */
function Step7({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col flex-1">
      <motion.div {...fadeUp}>
        <div className="flex items-center gap-2 mb-3">
          <span
            className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold"
            style={{ backgroundColor: "#7C3AED" }}
          >
            5
          </span>
          <h2 className="text-xl font-bold">Share</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-6">
          Present to an authentic audience and reflect on learning.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="rounded-2xl border-2 border-border p-5 bg-card"
        >
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
            🧑‍🏫 Teacher
          </p>
          <ul className="text-xs text-muted-foreground space-y-2 leading-relaxed">
            <li>Arrange an authentic audience</li>
            <li>Facilitate reflection</li>
            <li>Celebrate student work</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="rounded-2xl border-2 p-5 text-white"
          style={{ backgroundColor: "#7C3AED", borderColor: "#7C3AED" }}
        >
          <p className="text-xs font-bold uppercase tracking-wider opacity-80 mb-3">
            🎒 Student
          </p>
          <ul className="text-xs opacity-90 space-y-2 leading-relaxed">
            <li>Present to an authentic audience</li>
            <li>Reflect on learning</li>
            <li>Celebrate achievements</li>
          </ul>
        </motion.div>
      </div>

      <ContinueButton onClick={onNext} moduleColor={MODULE_COLOR} />
    </div>
  );
}

/* Step 8 — Drag-and-Drop Exercise */
function Step8({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col flex-1">
      <motion.div {...fadeUp}>
        <h2 className="text-xl font-bold mb-1">Match the Activity</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Place each classroom activity into the correct phase of the Learning Narrative.
        </p>
      </motion.div>
      <DragSort
        items={[
          {
            id: "a",
            label: "Students watch a documentary about ocean pollution",
            correctZone: "phase1",
          },
          {
            id: "b",
            label: "Teams research local water quality data from the EPA",
            correctZone: "phase2",
          },
          {
            id: "c",
            label: "Class creates a 'Need to Know' list on the whiteboard",
            correctZone: "phase3",
          },
          {
            id: "d",
            label: "Groups build a water filtration prototype",
            correctZone: "phase4",
          },
          {
            id: "e",
            label: "Students present solutions to a panel of community members",
            correctZone: "phase5",
          },
          {
            id: "f",
            label: "Students interview a local environmental scientist",
            correctZone: "phase2",
          },
        ]}
        zones={[
          { id: "phase1", label: "Phase 1: Entry Event", color: "#E8634A" },
          { id: "phase2", label: "Phase 2: Investigation", color: "#4338CA" },
          { id: "phase3", label: "Phase 3: Problem / Design Challenge", color: "#0D7377" },
          { id: "phase4", label: "Phase 4: Create", color: "#D97706" },
          { id: "phase5", label: "Phase 5: Share", color: "#7C3AED" },
        ]}
        onComplete={onNext}
        moduleColor={MODULE_COLOR}
      />
    </div>
  );
}

/* Step 9 — Summary Quiz */
function Step9({ onNext }: { onNext: () => void }) {
  return (
    <ScenarioQuiz
      question="In the Learning Narrative, which phase comes FIRST?"
      options={[
        { label: "Investigation", correct: false },
        { label: "Entry Event", correct: true },
        { label: "Create", correct: false },
        { label: "Share", correct: false },
      ]}
      correctFeedback="The Entry Event kicks off the Learning Narrative by sparking curiosity and hooking students into the project before any research or creation begins."
      incorrectFeedback="The Learning Narrative always starts with the Entry Event — the hook that sparks curiosity and draws students into the project."
      onComplete={onNext}
      moduleColor={MODULE_COLOR}
    />
  );
}

/* Step 10 — Completion Summary */
function Step10({ onNext }: { onNext: () => void }) {
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
        Module Complete!
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
            <span>PBL units follow a 5-phase story structure</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-success mt-0.5">✓</span>
            <span>Each phase has clear roles for teachers and students</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-success mt-0.5">✓</span>
            <span>The Entry Event hooks students; the Share phase brings it full circle</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-success mt-0.5">✓</span>
            <span>You can match classroom activities to the correct phase</span>
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

export const module2Steps = [Step1, Step2, Step3, Step4, Step5, Step6, Step7, Step8, Step9, Step10];
