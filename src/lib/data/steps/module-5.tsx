"use client";

import { FlipCardGrid } from "@/components/interactions/flip-card";
import { ContinueButton } from "@/components/learn/lesson-shell";
import { motion } from "framer-motion";

const MODULE_COLOR = "oklch(0.60 0.12 60)";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
};

const stages = [
  { name: "Empathize", icon: "💛", desc: "Understand the people you\u2019re designing for", mindset: "Human-centered" },
  { name: "Define", icon: "🎯", desc: "Synthesize into a clear problem statement", mindset: "Mindful of process" },
  { name: "Ideate", icon: "💡", desc: "Generate many ideas, quantity over quality", mindset: "Creative confidence" },
  { name: "Prototype", icon: "📦", desc: "Build quick, low-fi versions", mindset: "Culture of prototyping" },
  { name: "Test", icon: "🧪", desc: "Put prototype in front of real users", mindset: "Fail forward" },
];

/* Step 1 — Hook: GE MRI Case Study */
function Step1({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col flex-1">
      <motion.div {...fadeUp}>
        <h2 className="text-2xl font-bold mb-2">A Design Thinking Story</h2>
        <p className="text-muted-foreground mb-6">A real-world transformation.</p>
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
          <span className="text-xs text-muted-foreground">The Problem</span>
        </div>
        <p className="text-sm leading-relaxed">
          Children screamed and cried during MRI scans. <strong>80% needed sedation</strong> just to hold still. The massive, loud machines terrified them.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="rounded-2xl border-2 p-5 text-white mb-4"
        style={{ backgroundColor: MODULE_COLOR, borderColor: MODULE_COLOR }}
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-md">
            After
          </span>
          <span className="text-xs opacity-80">The Solution</span>
        </div>
        <p className="text-sm leading-relaxed opacity-95">
          GE transformed MRI rooms into pirate ships and jungle adventures. Sedation rates dropped dramatically. Kids actually <strong>asked to come back</strong>.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="rounded-xl bg-muted/60 border border-border px-5 py-4 text-center"
      >
        <p className="text-sm font-semibold" style={{ color: MODULE_COLOR }}>
          They used the exact same process you&rsquo;re about to learn.
        </p>
      </motion.div>

      <ContinueButton onClick={onNext} moduleColor={MODULE_COLOR} />
    </div>
  );
}

/* Step 2 — Overview: 5 Stages */
function Step2({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col flex-1">
      <motion.div {...fadeUp}>
        <h2 className="text-2xl font-bold mb-2">The 5 Stages</h2>
        <p className="text-muted-foreground mb-6">
          Design Thinking is a human-centered process with five stages.
        </p>
      </motion.div>

      <div className="flex flex-col gap-3 mb-4">
        {stages.map((stage, i) => (
          <motion.div
            key={stage.name}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className="flex items-center gap-3 rounded-2xl border-2 border-border bg-card px-4 py-3"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-xl text-xl bg-muted shrink-0">
              {stage.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm">{stage.name}</p>
              <p className="text-xs text-muted-foreground">{stage.desc}</p>
            </div>
            <span className="text-xs font-medium text-muted-foreground tabular-nums shrink-0">
              {i + 1}
            </span>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-xs text-muted-foreground text-center"
      >
        It&rsquo;s not always linear &mdash; teams often loop back between stages.
      </motion.p>

      <ContinueButton onClick={onNext} moduleColor={MODULE_COLOR} />
    </div>
  );
}

/* Step 3 — Deep Dive: Empathize */
function Step3({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col flex-1">
      <motion.div {...fadeUp}>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">💛</span>
          <h2 className="text-xl font-bold">Empathize</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-6">Understand the people you&rsquo;re designing for.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="rounded-2xl border-2 p-5 text-white mb-4"
        style={{ backgroundColor: MODULE_COLOR, borderColor: MODULE_COLOR }}
      >
        <h3 className="font-bold text-sm mb-2">What teachers do</h3>
        <p className="text-sm opacity-90 leading-relaxed">
          Set up real encounters &mdash; interviews, observations, surveys &mdash; so students can see the problem through someone else&rsquo;s eyes.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-2xl border-2 border-border bg-card p-5 mb-4"
      >
        <h3 className="font-bold text-sm mb-2">What students do</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Interview community members about park improvements. Observe how people actually use the space. Take notes on pain points and wishes.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45 }}
        className="rounded-xl bg-muted/60 border border-border px-4 py-3"
      >
        <p className="text-xs text-muted-foreground">
          <strong>Mindset:</strong> Human-centered &mdash; the user&rsquo;s needs come first, always.
        </p>
      </motion.div>

      <ContinueButton onClick={onNext} moduleColor={MODULE_COLOR} />
    </div>
  );
}

/* Step 4 — Deep Dive: Define */
function Step4({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col flex-1">
      <motion.div {...fadeUp}>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">🎯</span>
          <h2 className="text-xl font-bold">Define</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-6">Synthesize into a clear problem statement.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="rounded-2xl border-2 p-5 text-white mb-4"
        style={{ backgroundColor: MODULE_COLOR, borderColor: MODULE_COLOR }}
      >
        <h3 className="font-bold text-sm mb-2">The &ldquo;How Might We...&rdquo; format</h3>
        <p className="text-sm opacity-90 leading-relaxed">
          Take everything you learned in Empathize and craft a focused question:
        </p>
        <p className="text-base font-semibold mt-3 opacity-95">
          &ldquo;How might we redesign the park entrance for families with strollers?&rdquo;
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-2xl border-2 border-border bg-card p-5 mb-4"
      >
        <h3 className="font-bold text-sm mb-2">Why it matters</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          A good problem statement is specific enough to act on but broad enough for creative solutions. It keeps the team focused throughout the project.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45 }}
        className="rounded-xl bg-muted/60 border border-border px-4 py-3"
      >
        <p className="text-xs text-muted-foreground">
          <strong>Mindset:</strong> Mindful of process &mdash; resist jumping to solutions too soon.
        </p>
      </motion.div>

      <ContinueButton onClick={onNext} moduleColor={MODULE_COLOR} />
    </div>
  );
}

/* Step 5 — Deep Dive: Ideate */
function Step5({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col flex-1">
      <motion.div {...fadeUp}>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">💡</span>
          <h2 className="text-xl font-bold">Ideate</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-6">Generate many ideas &mdash; quantity over quality.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="rounded-2xl border-2 p-5 text-white mb-4"
        style={{ backgroundColor: MODULE_COLOR, borderColor: MODULE_COLOR }}
      >
        <h3 className="font-bold text-sm mb-2">Crazy 8s</h3>
        <p className="text-sm opacity-90 leading-relaxed">
          8 ideas in 8 minutes. Fold a piece of paper into 8 sections. One idea per section, one minute each. No judging &mdash; just draw and write.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-2xl border-2 border-border bg-card p-5 mb-4"
      >
        <h3 className="font-bold text-sm mb-2">The rules</h3>
        <ul className="text-sm text-muted-foreground leading-relaxed space-y-1">
          <li>&#8226; Defer judgment &mdash; no bad ideas during brainstorming</li>
          <li>&#8226; Go for volume &mdash; the first ideas are obvious, the best come later</li>
          <li>&#8226; Build on others&rsquo; ideas &mdash; &ldquo;Yes, and...&rdquo;</li>
          <li>&#8226; Be visual &mdash; sketch, don&rsquo;t just write</li>
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45 }}
        className="rounded-xl bg-muted/60 border border-border px-4 py-3"
      >
        <p className="text-xs text-muted-foreground">
          <strong>Mindset:</strong> Creative confidence &mdash; everyone is creative when given the right conditions.
        </p>
      </motion.div>

      <ContinueButton onClick={onNext} moduleColor={MODULE_COLOR} />
    </div>
  );
}

/* Step 6 — Deep Dive: Prototype */
function Step6({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col flex-1">
      <motion.div {...fadeUp}>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">📦</span>
          <h2 className="text-xl font-bold">Prototype</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-6">Build quick, low-fi versions.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="rounded-2xl border-2 p-5 text-white mb-4"
        style={{ backgroundColor: MODULE_COLOR, borderColor: MODULE_COLOR }}
      >
        <h3 className="font-bold text-sm mb-2">Low-fi is key</h3>
        <p className="text-sm opacity-90 leading-relaxed">
          The goal is to make ideas tangible fast. If a student spends a week perfecting a model, they won&rsquo;t want to change it after feedback.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-2xl border-2 border-border bg-card p-5 mb-4"
      >
        <h3 className="font-bold text-sm mb-2">Classroom examples</h3>
        <div className="grid grid-cols-3 gap-2 mt-3">
          {[
            { icon: "📄", label: "Paper mock-ups" },
            { icon: "📦", label: "Cardboard models" },
            { icon: "🎭", label: "Role-play" },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <div className="text-2xl mb-1">{item.icon}</div>
              <p className="text-xs text-muted-foreground">{item.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45 }}
        className="rounded-xl bg-muted/60 border border-border px-4 py-3"
      >
        <p className="text-xs text-muted-foreground">
          <strong>Mindset:</strong> Culture of prototyping &mdash; build to think, not to impress.
        </p>
      </motion.div>

      <ContinueButton onClick={onNext} moduleColor={MODULE_COLOR} />
    </div>
  );
}

/* Step 7 — Deep Dive: Test */
function Step7({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col flex-1">
      <motion.div {...fadeUp}>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">🧪</span>
          <h2 className="text-xl font-bold">Test</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-6">Put your prototype in front of real users.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="rounded-2xl border-2 p-5 text-white mb-4"
        style={{ backgroundColor: MODULE_COLOR, borderColor: MODULE_COLOR }}
      >
        <h3 className="font-bold text-sm mb-2">Real users, real feedback</h3>
        <p className="text-sm opacity-90 leading-relaxed">
          Present your cardboard model of the park entrance to community members. Watch how they react. Ask questions. Listen more than you talk.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-2xl border-2 border-border bg-card p-5 mb-4"
      >
        <h3 className="font-bold text-sm mb-2">What happens next?</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Based on feedback, teams go back to Prototype (or even Ideate) and iterate. The cycle repeats until the solution truly works for the user.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45 }}
        className="rounded-xl bg-muted/60 border border-border px-4 py-3"
      >
        <p className="text-xs text-muted-foreground">
          <strong>Mindset:</strong> Fail forward &mdash; every &ldquo;failure&rdquo; is data that makes the next version better.
        </p>
      </motion.div>

      <ContinueButton onClick={onNext} moduleColor={MODULE_COLOR} />
    </div>
  );
}

/* Step 8 — DT → Learning Narrative Mapping */
function Step8({ onNext }: { onNext: () => void }) {
  const mappings = [
    { dt: "Empathize", phase: "Phase 2", phaseLabel: "Research & Discovery", icon: "💛" },
    { dt: "Define", phase: "Phase 3", phaseLabel: "Problem Framing", icon: "🎯" },
    { dt: "Ideate + Prototype + Test", phase: "Phase 4", phaseLabel: "Create & Iterate", icon: "💡📦🧪" },
  ];

  return (
    <div className="flex flex-col flex-1">
      <motion.div {...fadeUp}>
        <h2 className="text-xl font-bold mb-1">DT Meets the Learning Narrative</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Design Thinking maps naturally to the PBL phases.
        </p>
      </motion.div>

      <div className="grid gap-3 mb-6">
        {mappings.map((m, i) => (
          <motion.div
            key={m.dt}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.12 }}
            className="rounded-2xl border-2 border-border bg-card p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">{m.icon}</span>
                <span className="font-bold text-sm">{m.dt}</span>
              </div>
              <span className="text-lg">&#8594;</span>
            </div>
            <div
              className="rounded-xl px-3 py-2 text-sm font-medium text-white"
              style={{ backgroundColor: MODULE_COLOR }}
            >
              {m.phase}: {m.phaseLabel}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-xs text-muted-foreground text-center"
      >
        Design Thinking gives you the &ldquo;how&rdquo; &mdash; PBL gives you the &ldquo;why&rdquo; and &ldquo;what.&rdquo;
      </motion.p>

      <ContinueButton onClick={onNext} moduleColor={MODULE_COLOR} />
    </div>
  );
}

/* Step 9 — Mindset Flip Cards */
function Step9({ onNext }: { onNext: () => void }) {
  const mindsetCards = [
    { front: "Human-centered", back: "Always start with the people you\u2019re designing for. Their needs, not your assumptions, drive every decision." },
    { front: "Creative confidence", back: "Everyone is creative. The right environment \u2014 safety, time, and encouragement \u2014 unlocks it." },
    { front: "Culture of prototyping", back: "Build to think. A rough model in your hands is worth more than a perfect idea in your head." },
    { front: "Fail forward", back: "Every \u2018failure\u2019 is feedback. Test early, learn fast, and iterate \u2014 that\u2019s how great solutions emerge." },
  ];

  return (
    <div className="flex flex-col flex-1">
      <motion.div {...fadeUp}>
        <h2 className="text-xl font-bold mb-1">The DT Mindsets</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Tap each card to reveal the mindset behind Design Thinking.
        </p>
      </motion.div>
      <FlipCardGrid
        cards={mindsetCards}
        color={MODULE_COLOR}
        onAllFlipped={() => {}}
      />
      <ContinueButton onClick={onNext} moduleColor={MODULE_COLOR} />
    </div>
  );
}

/* Step 10 — Completion */
function Step10({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col flex-1 items-center justify-center text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="text-6xl mb-6"
      >
        🎨
      </motion.div>
      <motion.h2
        {...fadeUp}
        className="text-2xl font-bold mb-3"
      >
        Design Thinking unlocked!
      </motion.h2>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <p className="text-muted-foreground mb-2">Here&rsquo;s what you learned:</p>
        <ul className="text-sm text-left space-y-2 mb-6 max-w-sm">
          <li className="flex items-start gap-2">
            <span className="text-success mt-0.5">&#10003;</span>
            <span>The 5 stages: Empathize, Define, Ideate, Prototype, Test</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-success mt-0.5">&#10003;</span>
            <span>How DT maps to the PBL learning narrative phases</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-success mt-0.5">&#10003;</span>
            <span>The 4 key mindsets that make DT work</span>
          </li>
        </ul>

        {/* Venn diagram concept */}
        <div className="flex items-center justify-center gap-0 mb-4">
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="w-28 h-28 rounded-full border-2 flex items-center justify-center text-xs font-bold text-center px-2"
            style={{ borderColor: "oklch(0.45 0.15 15)", color: "oklch(0.45 0.15 15)" }}
          >
            PBL<br />Why &amp; What
          </motion.div>
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="w-28 h-28 rounded-full border-2 flex items-center justify-center text-xs font-bold text-center px-2 -ml-8"
            style={{ borderColor: MODULE_COLOR, color: MODULE_COLOR }}
          >
            DT<br />How
          </motion.div>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-sm font-semibold"
          style={{ color: MODULE_COLOR }}
        >
          PBL + Design Thinking = PBL by Design
        </motion.p>
      </motion.div>
      <ContinueButton
        onClick={onNext}
        moduleColor={MODULE_COLOR}
        label="Complete Module"
      />
    </div>
  );
}

export const module5Steps = [Step1, Step2, Step3, Step4, Step5, Step6, Step7, Step8, Step9, Step10];
