"use client";

import { ScenarioQuiz } from "@/components/interactions/scenario-quiz";
import { DragSort } from "@/components/interactions/drag-sort";
import { ContinueButton } from "@/components/learn/lesson-shell";
import { motion } from "framer-motion";

const MODULE_COLOR = "oklch(0.50 0.15 310)";

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
        <h2 className="text-2xl font-bold mb-2">PBL + AI</h2>
        <p className="text-muted-foreground mb-6">
          AI can help you plan PBL faster. But it can&rsquo;t replace what makes PBL
          work: <strong>you</strong>.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-2xl border-2 border-border p-6 bg-card mb-6"
      >
        <p className="text-sm leading-relaxed text-muted-foreground">
          The best PBL happens when teachers use AI as a thought partner &mdash; not a
          replacement. AI can generate ideas, draft materials, and save you hours of
          planning. But the magic of PBL lives in the human moments: the relationships
          you build, the judgment calls you make, and the way you know your students.
        </p>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-sm text-muted-foreground text-center"
      >
        Let&rsquo;s explore the human + AI partnership.
      </motion.p>

      <ContinueButton onClick={onNext} moduleColor={MODULE_COLOR} />
    </div>
  );
}

/* Step 2 — The Philosophy: Start Human > Use AI > End Human */
function Step2({ onNext }: { onNext: () => void }) {
  const steps = [
    {
      emoji: "\uD83E\uDDD1\u200D\uD83C\uDFEB",
      title: "Start Human",
      description:
        "You choose the topic, framework, and driving question structure. Your expertise sets the direction.",
      color: MODULE_COLOR,
      textColor: "text-white",
    },
    {
      emoji: "\uD83E\uDD16",
      title: "Use AI",
      description:
        "AI generates content within your framework \u2014 narratives, calendars, rubrics, and variations.",
      color: "oklch(0.65 0.12 310)",
      textColor: "text-white",
    },
    {
      emoji: "\uD83E\uDDD1\u200D\uD83C\uDFEB",
      title: "End Human",
      description:
        "You review, edit, and adapt everything to YOUR students. The final call is always yours.",
      color: MODULE_COLOR,
      textColor: "text-white",
    },
  ];

  return (
    <div className="flex flex-col flex-1">
      <motion.div {...fadeUp}>
        <h2 className="text-2xl font-bold mb-2">The Philosophy</h2>
        <p className="text-muted-foreground mb-6">
          Start Human &rarr; Use AI &rarr; End Human
        </p>
      </motion.div>

      <div className="grid gap-4 mb-4">
        {steps.map((step, i) => (
          <motion.div
            key={step.title + i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.15 }}
            className="rounded-2xl border-2 p-5 text-white"
            style={{ backgroundColor: step.color, borderColor: step.color }}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{step.emoji}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-md">
                  Step {i + 1}
                </span>
                <h3 className="font-bold text-sm">{step.title}</h3>
              </div>
            </div>
            <p className="text-sm opacity-90 leading-relaxed">{step.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Flow arrows between steps */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-sm text-muted-foreground text-center"
      >
        AI is the powerful middle step. Humans own the beginning and the end.
      </motion.p>

      <ContinueButton onClick={onNext} moduleColor={MODULE_COLOR} />
    </div>
  );
}

/* Step 3 — AI vs Human Strengths */
function Step3({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col flex-1">
      <motion.div {...fadeUp}>
        <h2 className="text-2xl font-bold mb-2">AI vs. Human Strengths</h2>
        <p className="text-muted-foreground mb-6">
          Each brings something the other can&rsquo;t.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* AI Column */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="rounded-2xl border-2 p-5 bg-card"
          style={{ borderColor: "oklch(0.65 0.12 310)" }}
        >
          <div className="text-2xl mb-3">{"\uD83E\uDD16"}</div>
          <h3 className="font-bold text-sm mb-3" style={{ color: "oklch(0.65 0.12 310)" }}>
            AI is great at&hellip;
          </h3>
          <ul className="text-xs text-muted-foreground space-y-2 leading-relaxed">
            <li className="flex items-start gap-1.5">
              <span style={{ color: "oklch(0.65 0.12 310)" }}>{"\u2022"}</span>
              Generating ideas quickly
            </li>
            <li className="flex items-start gap-1.5">
              <span style={{ color: "oklch(0.65 0.12 310)" }}>{"\u2022"}</span>
              Creating first drafts
            </li>
            <li className="flex items-start gap-1.5">
              <span style={{ color: "oklch(0.65 0.12 310)" }}>{"\u2022"}</span>
              Formatting content
            </li>
            <li className="flex items-start gap-1.5">
              <span style={{ color: "oklch(0.65 0.12 310)" }}>{"\u2022"}</span>
              Finding connections
            </li>
          </ul>
        </motion.div>

        {/* Human Column */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="rounded-2xl border-2 p-5 text-white"
          style={{ backgroundColor: MODULE_COLOR, borderColor: MODULE_COLOR }}
        >
          <div className="text-2xl mb-3">{"\uD83E\uDDD1\u200D\uD83C\uDFEB"}</div>
          <h3 className="font-bold text-sm mb-3">Humans are great at&hellip;</h3>
          <ul className="text-xs opacity-90 space-y-2 leading-relaxed">
            <li className="flex items-start gap-1.5">
              <span>{"\u2022"}</span>
              Understanding students
            </li>
            <li className="flex items-start gap-1.5">
              <span>{"\u2022"}</span>
              Building relationships
            </li>
            <li className="flex items-start gap-1.5">
              <span>{"\u2022"}</span>
              Making judgment calls
            </li>
            <li className="flex items-start gap-1.5">
              <span>{"\u2022"}</span>
              Facilitating learning
            </li>
          </ul>
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-sm text-muted-foreground text-center"
      >
        The goal isn&rsquo;t to replace one with the other &mdash; it&rsquo;s to combine them.
      </motion.p>

      <ContinueButton onClick={onNext} moduleColor={MODULE_COLOR} />
    </div>
  );
}

/* Step 4 — AI Role Sorter (DragSort) */
function Step4({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col flex-1">
      <motion.div {...fadeUp}>
        <h2 className="text-xl font-bold mb-1">AI Role Sorter</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Sort each PBL task into the right zone.
        </p>
      </motion.div>
      <DragSort
        items={[
          { id: "a", label: "Write the driving question", correctZone: "human", wrongFeedback: "The driving question shapes the entire project\u2019s direction and meaning. It needs your vision of what matters for your students — AI can\u2019t make that call." },
          { id: "b", label: "Generate research topic ideas", correctZone: "ai", wrongFeedback: "Brainstorming a list of research angles is a great use of AI — it can suggest dozens of ideas quickly for you to curate." },
          { id: "c", label: "Decide the public product format", correctZone: "human", wrongFeedback: "Choosing the product format requires knowing your students, community, and context. That\u2019s a human judgment call." },
          { id: "d", label: "Create a rubric", correctZone: "ai", wrongFeedback: "AI can draft a rubric from your criteria and standards quickly — you review and refine, but the initial generation saves time." },
          { id: "e", label: "Facilitate peer critique", correctZone: "human", wrongFeedback: "Peer critique requires reading the room, managing emotions, and building trust between students. That\u2019s deeply human work." },
          { id: "f", label: "Draft a day-by-day calendar", correctZone: "ai", wrongFeedback: "A project calendar is structured planning work — AI can lay out a timeline from your milestones, which you then adjust." },
          { id: "g", label: "Build relationships with community partners", correctZone: "human", wrongFeedback: "Community partnerships depend on trust, empathy, and real human connection. AI can\u2019t build those relationships for you." },
          { id: "h", label: "Generate reflection prompts", correctZone: "either", wrongFeedback: "Reflection prompts can be written by you or generated by AI and refined. Either approach works — it\u2019s flexible." },
        ]}
        zones={[
          { id: "human", label: "Human", color: MODULE_COLOR },
          { id: "ai", label: "AI", color: "oklch(0.65 0.12 310)" },
          { id: "either", label: "Either", color: "oklch(0.55 0.02 270)" },
        ]}
        onComplete={onNext}
        moduleColor={MODULE_COLOR}
      />
    </div>
  );
}

/* Step 5 — Practical Tips */
function Step5({ onNext }: { onNext: () => void }) {
  const tips = [
    {
      number: "1",
      text: "Give AI your driving question framework, let it generate 5 variations. Then pick and refine the best one.",
    },
    {
      number: "2",
      text: "Use AI to draft rubrics, then edit for YOUR students \u2014 their reading levels, interests, and needs.",
    },
    {
      number: "3",
      text: "Have AI create a day-by-day calendar, then adjust for your schedule, pacing, and school events.",
    },
    {
      number: "4",
      text: "Never let AI replace student voice, critique sessions, or community partnerships. Those are human-only.",
    },
  ];

  return (
    <div className="flex flex-col flex-1">
      <motion.div {...fadeUp}>
        <h2 className="text-2xl font-bold mb-2">Practical Tips</h2>
        <p className="text-muted-foreground mb-6">
          Four concrete ways to use AI in your PBL planning.
        </p>
      </motion.div>

      <div className="grid gap-3 mb-4">
        {tips.map((tip, i) => (
          <motion.div
            key={tip.number}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 * i }}
            className="rounded-2xl border-2 border-border p-5 bg-card flex items-start gap-4"
          >
            <span
              className="flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold shrink-0 text-white"
              style={{ backgroundColor: MODULE_COLOR }}
            >
              {tip.number}
            </span>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {tip.text}
            </p>
          </motion.div>
        ))}
      </div>

      <ContinueButton onClick={onNext} moduleColor={MODULE_COLOR} />
    </div>
  );
}

/* Step 6 — Knowledge Check */
function Step6({ onNext }: { onNext: () => void }) {
  return (
    <ScenarioQuiz
      question="Which task should ALWAYS stay with the human teacher?"
      options={[
        { label: "Generating reflection prompts", correct: false },
        {
          label:
            "Facilitating peer critique and building community partnerships",
          correct: true,
        },
      ]}
      correctFeedback="Peer critique requires reading the room, managing emotions, and building trust. Community partnerships depend on real human relationships. These can\u2019t be automated."
      incorrectFeedback="Reflection prompts can be generated by AI (and edited by you). But facilitating peer critique and building community partnerships require human connection, empathy, and trust that AI simply can\u2019t replicate."
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
        {"\uD83D\uDE80"}
      </motion.div>
      <motion.h2
        {...fadeUp}
        className="text-2xl font-bold mb-3"
      >
        You did it!
      </motion.h2>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <p className="text-muted-foreground mb-4">
          You now have the complete PBL toolkit.
        </p>
        <div
          className="rounded-2xl p-5 mb-6 max-w-sm text-left text-white"
          style={{ backgroundColor: MODULE_COLOR }}
        >
          <p className="text-sm leading-relaxed font-medium">
            Go make something amazing with your students. Use AI to plan faster,
            but never forget &mdash; the magic happens because of you.
          </p>
        </div>
        <ul className="text-sm text-left space-y-2 mb-6 max-w-sm">
          <li className="flex items-start gap-2">
            <span className="text-success mt-0.5">{"\u2713"}</span>
            <span>AI is a powerful planning partner, not a replacement</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-success mt-0.5">{"\u2713"}</span>
            <span>Start Human &rarr; Use AI &rarr; End Human</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-success mt-0.5">{"\u2713"}</span>
            <span>Human connection, judgment, and relationships can&rsquo;t be automated</span>
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

export const module7Steps = [Step1, Step2, Step3, Step4, Step5, Step6, Step7];
