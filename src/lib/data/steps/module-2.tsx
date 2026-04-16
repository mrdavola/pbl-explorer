"use client";

import { ScenarioQuiz } from "@/components/interactions/scenario-quiz";
import { DragSort } from "@/components/interactions/drag-sort";
import { SequenceBuilder } from "@/components/interactions/sequence-builder";
import { ReflectionPrompt } from "@/components/interactions/reflection-prompt";
import { PBLPhaseFlow } from "@/components/diagrams/pbl-phase-flow";
import { GoDeeper } from "@/components/learn/go-deeper";
import { getResourcesForModule } from "@/lib/data/resources";
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

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="mb-6"
      >
        <PBLPhaseFlow activePhase={undefined} />
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

/* Shared phase deep-dive layout */
interface PhaseData {
  number: number;
  name: string;
  color: string;
  description: string;
  teacherActions: string[];
  studentActions: string[];
  example: string;
  exampleLabel: string;
}

function PhaseDeepDive({ phase, onNext }: { phase: PhaseData; onNext: () => void }) {
  return (
    <div className="flex flex-col flex-1">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="mb-4"
      >
        <PBLPhaseFlow activePhase={phase.number - 1} />
      </motion.div>

      {/* Phase header — big and bold */}
      <motion.div {...fadeUp} className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <span
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold shrink-0"
            style={{ backgroundColor: phase.color }}
          >
            {phase.number}
          </span>
          <div>
            <h2 className="text-2xl font-bold leading-tight">{phase.name}</h2>
            <p className="text-sm text-muted-foreground">{phase.description}</p>
          </div>
        </div>
      </motion.div>

      {/* Teacher card — full width */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="rounded-2xl border-2 border-border p-5 bg-card mb-3"
      >
        <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">
          What the teacher does
        </p>
        <ul className="space-y-2.5">
          {phase.teacherActions.map((action, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed">
              <span className="mt-1 w-1.5 h-1.5 rounded-full shrink-0 bg-muted-foreground/40" />
              {action}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Student card — colored, full width */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.4 }}
        className="rounded-2xl border-2 p-5 text-white mb-4"
        style={{ backgroundColor: phase.color, borderColor: phase.color }}
      >
        <p className="text-sm font-bold uppercase tracking-wider text-white/70 mb-3">
          What students do
        </p>
        <ul className="space-y-2.5">
          {phase.studentActions.map((action, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed text-white/90">
              <span className="mt-1 w-1.5 h-1.5 rounded-full shrink-0 bg-white/50" />
              {action}
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Classroom example */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="rounded-xl bg-muted/60 border border-border px-5 py-4"
      >
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
          {phase.exampleLabel}
        </p>
        <p className="text-sm leading-relaxed italic text-muted-foreground">
          &ldquo;{phase.example}&rdquo;
        </p>
      </motion.div>

      <ContinueButton onClick={onNext} moduleColor={MODULE_COLOR} />
    </div>
  );
}

const phaseDetails: PhaseData[] = [
  {
    number: 1,
    name: "Entry Event",
    color: "#E8634A",
    description: "The hook that sparks curiosity and draws students in.",
    teacherActions: [
      "Present an engaging entry event — a video, mystery, guest speaker, or real-world problem",
      "Facilitate open-ended questioning to capture student curiosity",
      "Document student reactions and initial questions on a visible board",
    ],
    studentActions: [
      "Experience the hook and let curiosity build naturally",
      "Generate authentic questions about what they noticed",
      "Connect the experience to things they already know",
    ],
    example: "Students arrive to find the classroom transformed into a crime scene. Evidence bags, numbered markers, and a mysterious note. Their mission: figure out what happened using science.",
    exampleLabel: "Example: A 5th grade science class",
  },
  {
    number: 2,
    name: "Investigation",
    color: "#4338CA",
    description: "Research, skill-building, and developing empathy for the people involved.",
    teacherActions: [
      "Guide students through structured research from multiple sources",
      "Connect students with real experts, community members, or primary sources",
      "Facilitate empathy-building exercises like interviews or perspective-taking",
    ],
    studentActions: [
      "Research the topic from multiple perspectives and sources",
      "Build the specific skills they\u2019ll need for the project",
      "Develop genuine empathy for the people affected by the problem",
    ],
    example: "Students researching food deserts interview families in their neighborhood, analyze grocery store maps, and read nutrition data from the CDC.",
    exampleLabel: "Example: An 8th grade social studies project",
  },
  {
    number: 3,
    name: "Problem / Design Challenge",
    color: "#0D7377",
    description: "Define the driving question that guides all the work ahead.",
    teacherActions: [
      "Help students refine their raw questions into a focused driving question",
      "Facilitate the creation of \u201cNeed to Know\u201d lists that map out learning gaps",
      "Connect students with subject-matter experts who can add depth",
    ],
    studentActions: [
      "Take ownership of the driving question — make it feel like theirs",
      "Create and maintain a \u201cNeed to Know\u201d list to guide their learning",
      "Identify specific skills and knowledge they need to acquire",
    ],
    example: "After investigating water quality, the class narrows their driving question to: \u2018How can we, as environmental scientists, create a water testing guide for families in our community?\u2019",
    exampleLabel: "Example: A 6th grade science project",
  },
  {
    number: 4,
    name: "Create",
    color: "#D97706",
    description: "Ideate, prototype, test, and refine — the heart of the project.",
    teacherActions: [
      "Provide materials, tools, and workspace for creation",
      "Facilitate structured critique and feedback cycles (not just \u201cnice job!\u201d)",
      "Coach students through the frustration of iteration — normalize revision",
    ],
    studentActions: [
      "Brainstorm multiple ideas before committing to one direction",
      "Build quick, low-fidelity prototypes to test assumptions early",
      "Give and receive honest feedback, then revise based on evidence",
    ],
    example: "Teams build cardboard scale models of their redesigned school cafeteria, test them with younger students, gather feedback, and rebuild. The third version is always the best.",
    exampleLabel: "Example: A 4th grade math + design project",
  },
  {
    number: 5,
    name: "Share",
    color: "#7C3AED",
    description: "Present to an authentic audience and reflect on the learning journey.",
    teacherActions: [
      "Arrange a real audience beyond the classroom — parents, experts, community members",
      "Facilitate structured reflection on both the product and the process",
      "Create space to celebrate effort, growth, and collaboration — not just outcomes",
    ],
    studentActions: [
      "Present their work to people who genuinely care about the topic",
      "Reflect honestly on what they learned, what surprised them, and what they\u2019d change",
      "Celebrate their team\u2019s journey and growth through the project",
    ],
    example: "Students present their water testing guides at a community health fair. A local nonprofit asks to distribute them. Students see their work making a real difference.",
    exampleLabel: "Example: The water quality project finale",
  },
];

/* Step 3 — Phase 1: Entry Event */
function Step3({ onNext }: { onNext: () => void }) {
  return <PhaseDeepDive phase={phaseDetails[0]} onNext={onNext} />;
}

/* Step 4 — Phase 2: Investigation */
function Step4({ onNext }: { onNext: () => void }) {
  return <PhaseDeepDive phase={phaseDetails[1]} onNext={onNext} />;
}

/* Step 5 — Phase 3: Problem / Design Challenge */
function Step5({ onNext }: { onNext: () => void }) {
  return <PhaseDeepDive phase={phaseDetails[2]} onNext={onNext} />;
}

/* Step 6 — Phase 4: Create */
function Step6({ onNext }: { onNext: () => void }) {
  return <PhaseDeepDive phase={phaseDetails[3]} onNext={onNext} />;
}

/* Step 7 — Phase 5: Share */
function Step7({ onNext }: { onNext: () => void }) {
  return <PhaseDeepDive phase={phaseDetails[4]} onNext={onNext} />;
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
            wrongFeedback: "A documentary sparks curiosity and hooks students into the topic — that\u2019s the Entry Event, the very first phase.",
          },
          {
            id: "b",
            label: "Teams research local water quality data from the EPA",
            correctZone: "phase2",
            wrongFeedback: "Gathering data from real sources is research — that\u2019s the Investigation phase, where students dig into the topic.",
          },
          {
            id: "c",
            label: "Class creates a 'Need to Know' list on the whiteboard",
            correctZone: "phase3",
            wrongFeedback: "A \u2018Need to Know\u2019 list helps frame what the class needs to solve — that\u2019s the Problem / Design Challenge phase.",
          },
          {
            id: "d",
            label: "Groups build a water filtration prototype",
            correctZone: "phase4",
            wrongFeedback: "Building a prototype is hands-on making — that\u2019s the Create phase, where students turn ideas into something real.",
          },
          {
            id: "e",
            label: "Students present solutions to a panel of community members",
            correctZone: "phase5",
            wrongFeedback: "Presenting to a real audience is the Share phase — it brings the Learning Narrative full circle.",
          },
          {
            id: "f",
            label: "Students interview a local environmental scientist",
            correctZone: "phase2",
            wrongFeedback: "Interviewing an expert is primary research — that belongs in the Investigation phase alongside other data gathering.",
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

/* Step 9 — Sequence Builder: Order the phases */
function Step9({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col flex-1">
      <motion.div {...fadeUp}>
        <h2 className="text-xl font-bold mb-1">Order the Phases</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Now that you know all 5 phases, put them in the right order.
        </p>
      </motion.div>
      <SequenceBuilder
        items={[
          { id: 'entry', label: 'Entry Event', description: 'Hook students with an engaging launch', correctPosition: 0 },
          { id: 'investigate', label: 'Investigation', description: 'Research, explore, and gather information', correctPosition: 1 },
          { id: 'challenge', label: 'Problem / Challenge', description: 'Define the core problem to solve', correctPosition: 2 },
          { id: 'create', label: 'Create', description: 'Build, prototype, and iterate on solutions', correctPosition: 3 },
          { id: 'share', label: 'Share / Exhibition', description: 'Present to an authentic audience', correctPosition: 4 },
        ]}
        instruction="Put the PBL phases in the right order"
        onComplete={onNext}
        moduleColor={MODULE_COLOR}
      />
    </div>
  );
}

/* Step 10 — Builder: Driving Question */
function Step10({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col flex-1">
      <motion.div {...fadeUp}>
        <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: MODULE_COLOR }}>
          Building your plan
        </div>
        <h2 className="text-2xl font-bold mb-4 font-display">Your Driving Question</h2>
        <p className="text-lg mb-6">
          A great driving question is open-ended, meaningful to students, and connects to real-world issues. Draft one for your class.
        </p>
      </motion.div>
      <ReflectionPrompt
        question="What driving question could launch a PBL unit in your classroom?"
        placeholder="e.g., How can we design a solution to reduce food waste in our school cafeteria?"
        storageKey="module-2-driving-question"
        onComplete={onNext}
        moduleColor={MODULE_COLOR}
      />
    </div>
  );
}

/* Step 11 — Summary Quiz */
function Step11({ onNext }: { onNext: () => void }) {
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

/* Step 12 — Completion Summary + Go Deeper */
function Step12({ onNext }: { onNext: () => void }) {
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
          <li className="flex items-start gap-2">
            <span className="text-success mt-0.5">✓</span>
            <span>You drafted a driving question for your own classroom</span>
          </li>
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="w-full max-w-sm text-left mb-6"
      >
        <GoDeeper resources={getResourcesForModule('learning-narrative')} moduleColor={MODULE_COLOR} />
      </motion.div>

      <ContinueButton
        onClick={onNext}
        moduleColor={MODULE_COLOR}
        label="Complete Module"
      />
    </div>
  );
}

export const module2Steps = [Step1, Step2, Step3, Step4, Step5, Step6, Step7, Step8, Step9, Step10, Step11, Step12];

export const module2NarrateTexts: string[] = [
  "Great PBL units unfold like a narrative — with a hook, rising action, a climax of creation, and a resolution where students share their work with the world. This story structure is called the Learning Narrative.",
  "The Learning Narrative has five phases, like chapters in a story: Entry Event, Investigation, Problem or Design Challenge, Create, and Share. Each phase builds on the last to guide students through a meaningful learning journey.",
  "Phase one is the Entry Event — the hook that sparks curiosity and draws students in. Teachers present something engaging like a mystery or a real-world problem, and students generate authentic questions about what they notice.",
  "Phase two is Investigation. This is where students dig deep — researching from multiple sources, connecting with experts, and building empathy for the people affected by the problem they're exploring.",
  "Phase three is the Problem or Design Challenge. Students refine their questions into a focused driving question and create 'Need to Know' lists that map out what they still need to learn.",
  "Phase four is Create — the heart of the project. Students brainstorm ideas, build quick prototypes, test them, and revise based on feedback. Teachers coach students through the productive struggle of iteration.",
  "Phase five is Share. Students present their work to a real audience beyond the classroom and reflect on their learning journey. This is where the narrative comes full circle and students see their work making a real difference.",
  "Now let's see if you can match classroom activities to the correct phase of the Learning Narrative. Each activity belongs in a specific phase based on what students are doing and why.",
  "Can you put all five phases in the right order? The sequence matters because each phase builds on the one before it, creating a coherent learning experience.",
  "A great driving question is open-ended, meaningful to students, and connects to real-world issues. Try drafting one for your own classroom — it's the engine that powers the entire PBL unit.",
  "Quick check: which phase comes first in the Learning Narrative? Remember, every great story starts with a hook that captures the audience's attention.",
  "Congratulations on completing the Learning Narrative module! You now understand the five-phase story structure, the roles of teachers and students in each phase, and you've drafted your own driving question.",
];
