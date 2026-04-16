"use client";

import { FlipCardGrid } from "@/components/interactions/flip-card";
import { DragSort } from "@/components/interactions/drag-sort";
import { ContinueButton } from "@/components/learn/lesson-shell";
import { motion } from "framer-motion";

const MODULE_COLOR = "oklch(0.45 0.15 15)";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
};

const elements = [
  { name: "Challenging Problem or Question", icon: "❓", desc: "A meaningful question that drives the entire project" },
  { name: "Sustained Inquiry", icon: "🔍", desc: "Students investigate over time, not in a single session" },
  { name: "Authenticity", icon: "🌍", desc: "Real-world context + real audience + real impact" },
  { name: "Student Voice & Choice", icon: "🗣️", desc: "Structured choice within teacher\u2019s framework" },
  { name: "Reflection", icon: "🪞", desc: "Think about learning throughout, not just at the end" },
  { name: "Critique & Revision", icon: "✏️", desc: "Give and receive feedback, then use it" },
  { name: "Public Product", icon: "🎤", desc: "Shared beyond the classroom" },
];

/* Step 1 — Hook */
function Step1({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col flex-1">
      <motion.div {...fadeUp}>
        <h2 className="text-2xl font-bold mb-2">The Gold Standard</h2>
        <p className="text-muted-foreground mb-6">
          7 elements define high-quality PBL. The good news? You can start with just 2.
        </p>
      </motion.div>

      <div className="flex flex-wrap gap-2 mb-6">
        {elements.map((el, i) => (
          <motion.div
            key={el.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + i * 0.08, duration: 0.3 }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border bg-card text-sm"
          >
            <span>{el.icon}</span>
            <span className="font-medium">{el.name}</span>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-sm text-muted-foreground text-center"
      >
        Let&rsquo;s explore each one.
      </motion.p>

      <ContinueButton onClick={onNext} moduleColor={MODULE_COLOR} />
    </div>
  );
}

/* Step 2 — Elements 1-2: Challenging Problem + Sustained Inquiry */
function Step2({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col flex-1">
      <motion.div {...fadeUp}>
        <h2 className="text-xl font-bold mb-1">Elements 1 &amp; 2</h2>
        <p className="text-sm text-muted-foreground mb-6">The foundation of every PBL unit.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="rounded-2xl border-2 p-5 text-white mb-4"
        style={{ backgroundColor: MODULE_COLOR, borderColor: MODULE_COLOR }}
      >
        <div className="text-2xl mb-2">❓</div>
        <h3 className="font-bold mb-1">Challenging Problem or Question</h3>
        <p className="text-sm opacity-90 leading-relaxed mb-3">
          A meaningful question that drives the entire project. It should be open-ended, engaging, and aligned to learning goals.
        </p>
        <p className="text-xs opacity-70 italic">
          Example (Gr 3): &ldquo;How can we reduce food waste in our school cafeteria?&rdquo;
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-2xl border-2 p-5 text-white mb-4"
        style={{ backgroundColor: MODULE_COLOR, borderColor: MODULE_COLOR }}
      >
        <div className="text-2xl mb-2">🔍</div>
        <h3 className="font-bold mb-1">Sustained Inquiry</h3>
        <p className="text-sm opacity-90 leading-relaxed mb-3">
          Students investigate over time, not in a single session. They ask questions, find resources, and apply what they learn.
        </p>
        <p className="text-xs opacity-70 italic">
          Example: Students spend weeks researching, interviewing experts, and testing solutions &mdash; not just one class period.
        </p>
      </motion.div>

      <ContinueButton onClick={onNext} moduleColor={MODULE_COLOR} />
    </div>
  );
}

/* Step 3 — Elements 3-4: Authenticity + Student Voice & Choice */
function Step3({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col flex-1">
      <motion.div {...fadeUp}>
        <h2 className="text-xl font-bold mb-1">Elements 3 &amp; 4</h2>
        <p className="text-sm text-muted-foreground mb-6">Making it real and giving students ownership.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="rounded-2xl border-2 p-5 text-white mb-4"
        style={{ backgroundColor: MODULE_COLOR, borderColor: MODULE_COLOR }}
      >
        <div className="text-2xl mb-2">🌍</div>
        <h3 className="font-bold mb-1">Authenticity</h3>
        <p className="text-sm opacity-90 leading-relaxed mb-3">
          Real-world context + real audience + real impact. The work matters beyond the classroom.
        </p>
        <p className="text-xs opacity-70 italic">
          Example (Gr 5): Students design solutions for a local creek&rsquo;s pollution problem and present to the city council.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-2xl border-2 p-5 text-white mb-4"
        style={{ backgroundColor: MODULE_COLOR, borderColor: MODULE_COLOR }}
      >
        <div className="text-2xl mb-2">🗣️</div>
        <h3 className="font-bold mb-1">Student Voice &amp; Choice</h3>
        <p className="text-sm opacity-90 leading-relaxed mb-3">
          Structured choice within the teacher&rsquo;s framework. Students make decisions about topics, methods, and products.
        </p>
        <p className="text-xs opacity-70 italic">
          Example: Teacher sets the driving question; students choose their research focus, team roles, and final product format.
        </p>
      </motion.div>

      <ContinueButton onClick={onNext} moduleColor={MODULE_COLOR} />
    </div>
  );
}

/* Step 4 — Elements 5-6: Reflection + Critique & Revision */
function Step4({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col flex-1">
      <motion.div {...fadeUp}>
        <h2 className="text-xl font-bold mb-1">Elements 5 &amp; 6</h2>
        <p className="text-sm text-muted-foreground mb-6">The growth engine of PBL.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="rounded-2xl border-2 p-5 text-white mb-4"
        style={{ backgroundColor: MODULE_COLOR, borderColor: MODULE_COLOR }}
      >
        <div className="text-2xl mb-2">🪞</div>
        <h3 className="font-bold mb-1">Reflection</h3>
        <p className="text-sm opacity-90 leading-relaxed mb-3">
          Think about learning throughout, not just at the end. Students reflect on what they&rsquo;re learning, how they&rsquo;re working, and what they need next.
        </p>
        <p className="text-xs opacity-70 italic">
          Example: Weekly journal entries, exit tickets, and team check-ins throughout the project.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-2xl border-2 p-5 text-white mb-4"
        style={{ backgroundColor: MODULE_COLOR, borderColor: MODULE_COLOR }}
      >
        <div className="text-2xl mb-2">✏️</div>
        <h3 className="font-bold mb-1">Critique &amp; Revision</h3>
        <p className="text-sm opacity-90 leading-relaxed mb-3">
          Give and receive feedback, then use it. Students learn that quality work requires multiple drafts and honest peer review.
        </p>
        <p className="text-xs opacity-70 italic">
          Example: Gallery walks, peer feedback protocols, and revision cycles before the final product.
        </p>
      </motion.div>

      <ContinueButton onClick={onNext} moduleColor={MODULE_COLOR} />
    </div>
  );
}

/* Step 5 — Element 7: Public Product (featured) */
function Step5({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col flex-1">
      <motion.div {...fadeUp}>
        <h2 className="text-xl font-bold mb-1">Element 7</h2>
        <p className="text-sm text-muted-foreground mb-6">The most distinguishing feature of PBL.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="rounded-2xl border-2 p-6 text-white mb-4"
        style={{ backgroundColor: MODULE_COLOR, borderColor: MODULE_COLOR }}
      >
        <div className="text-4xl mb-3 text-center">🎤</div>
        <h3 className="text-xl font-bold mb-2 text-center">Public Product</h3>
        <p className="text-sm opacity-90 leading-relaxed text-center mb-4">
          Students create something that is shared beyond the classroom &mdash; with real people, for a real purpose.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="rounded-xl bg-muted/60 border border-border px-5 py-4 text-center"
      >
        <p className="text-sm font-semibold mb-1" style={{ color: MODULE_COLOR }}>
          This is what separates PBL from everything else.
        </p>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Presentations to the class don&rsquo;t count. A public product reaches a real audience &mdash; parents, community members, experts, or the public.
        </p>
      </motion.div>

      <ContinueButton onClick={onNext} moduleColor={MODULE_COLOR} />
    </div>
  );
}

/* Step 6 — The Driving Question Formula */
function Step6({ onNext }: { onNext: () => void }) {
  const parts = [
    { label: "ROLE", example: "animal experts", color: "oklch(0.55 0.14 25)" },
    { label: "ACTION", example: "create", color: "oklch(0.50 0.15 150)" },
    { label: "PRODUCT", example: "a field guide", color: "oklch(0.50 0.15 250)" },
    { label: "AUDIENCE", example: "our families", color: "oklch(0.50 0.15 310)" },
    { label: "PURPOSE", example: "to learn about local animals", color: "oklch(0.50 0.15 60)" },
  ];

  return (
    <div className="flex flex-col flex-1">
      <motion.div {...fadeUp}>
        <h2 className="text-2xl font-bold mb-2">The Driving Question Formula</h2>
        <p className="text-muted-foreground mb-6">
          Every great PBL unit starts with a driving question. Here&rsquo;s a formula that works.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-2xl border-2 border-border bg-card p-5 mb-6 text-center"
      >
        <p className="text-sm text-muted-foreground mb-3">The template:</p>
        <p className="text-base font-semibold leading-relaxed">
          &ldquo;How can we, as{" "}
          <span className="underline decoration-2" style={{ textDecorationColor: parts[0].color, color: parts[0].color }}>[ROLE]</span>
          ,{" "}
          <span className="underline decoration-2" style={{ textDecorationColor: parts[1].color, color: parts[1].color }}>[ACTION]</span>
          {" "}a{" "}
          <span className="underline decoration-2" style={{ textDecorationColor: parts[2].color, color: parts[2].color }}>[PRODUCT]</span>
          {" "}for{" "}
          <span className="underline decoration-2" style={{ textDecorationColor: parts[3].color, color: parts[3].color }}>[AUDIENCE]</span>
          {" "}to{" "}
          <span className="underline decoration-2" style={{ textDecorationColor: parts[4].color, color: parts[4].color }}>[PURPOSE]</span>
          ?&rdquo;
        </p>
      </motion.div>

      <div className="grid gap-2 mb-4">
        {parts.map((part, i) => (
          <motion.div
            key={part.label}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35 + i * 0.08 }}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-border bg-card"
          >
            <span
              className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-md text-white"
              style={{ backgroundColor: part.color }}
            >
              {part.label}
            </span>
            <span className="text-sm text-muted-foreground">e.g. {part.example}</span>
          </motion.div>
        ))}
      </div>

      <ContinueButton onClick={onNext} moduleColor={MODULE_COLOR} />
    </div>
  );
}

/* Step 7 — Example Driving Questions */
const drivingQuestions = [
  { grade: "Gr 1", question: "How can we, as animal experts, create a field guide for our families?", role: "animal experts", product: "field guide", audience: "families" },
  { grade: "Gr 3", question: "How can we, as community planners, design a park within $500?", role: "community planners", product: "park design", audience: "community" },
  { grade: "Gr 8", question: "How can we, as journalists, create a multimedia news magazine?", role: "journalists", product: "news magazine", audience: "school community" },
  { grade: "Gr 10", question: "How can we, as museum curators, design a virtual exhibit?", role: "museum curators", product: "virtual exhibit", audience: "public" },
];

function Step7({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col flex-1">
      <motion.div {...fadeUp}>
        <h2 className="text-xl font-bold mb-1">Example Driving Questions</h2>
        <p className="text-sm text-muted-foreground mb-6">
          See the formula in action across grade levels.
        </p>
      </motion.div>

      <div className="grid gap-3 mb-4">
        {drivingQuestions.map((dq, i) => (
          <motion.div
            key={dq.grade}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.1 }}
            className="rounded-2xl border-2 border-border bg-card p-4"
          >
            <span
              className="inline-block text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-md text-white mb-2"
              style={{ backgroundColor: MODULE_COLOR }}
            >
              {dq.grade}
            </span>
            <p className="text-sm font-medium leading-relaxed mb-2">
              &ldquo;{dq.question}&rdquo;
            </p>
            <div className="flex flex-wrap gap-1.5">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">
                Role: {dq.role}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">
                Product: {dq.product}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">
                Audience: {dq.audience}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <ContinueButton onClick={onNext} moduleColor={MODULE_COLOR} />
    </div>
  );
}

/* Step 8 — Knowledge Check: Match Game (DragSort) */
function Step8({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col flex-1">
      <motion.div {...fadeUp}>
        <h2 className="text-xl font-bold mb-1">Knowledge Check</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Match each description to the correct Gold Standard element.
        </p>
      </motion.div>
      <DragSort
        items={[
          { id: "a", label: "A question that drives the whole project", correctZone: "challenging" },
          { id: "b", label: "Shared beyond the classroom", correctZone: "public" },
          { id: "c", label: "Give and receive feedback", correctZone: "critique" },
          { id: "d", label: "Investigate over time", correctZone: "inquiry" },
        ]}
        zones={[
          { id: "challenging", label: "Challenging Problem", color: MODULE_COLOR },
          { id: "public", label: "Public Product", color: "oklch(0.50 0.15 250)" },
          { id: "critique", label: "Critique & Revision", color: "oklch(0.50 0.15 150)" },
          { id: "inquiry", label: "Sustained Inquiry", color: "oklch(0.50 0.15 60)" },
        ]}
        onComplete={onNext}
        moduleColor={MODULE_COLOR}
      />
    </div>
  );
}

/* Step 9 — Key Takeaway */
function Step9({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col flex-1 items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="rounded-2xl border-2 p-8 text-white max-w-sm"
        style={{ backgroundColor: MODULE_COLOR, borderColor: MODULE_COLOR }}
      >
        <p className="text-lg font-bold leading-snug mb-4">
          You don&rsquo;t need all 7.
        </p>
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="bg-white/20 rounded-xl px-3 py-2 text-sm font-medium">
            Driving Question
          </span>
          <span className="text-xl font-bold">+</span>
          <span className="bg-white/20 rounded-xl px-3 py-2 text-sm font-medium">
            Public Product
          </span>
        </div>
        <p className="text-sm opacity-90 leading-relaxed">
          = your minimum viable PBL. Start here, then layer in more elements over time.
        </p>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-sm text-muted-foreground mt-6"
      >
        Start small. Grow from there.
      </motion.p>

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
        🏅
      </motion.div>
      <motion.h2
        {...fadeUp}
        className="text-2xl font-bold mb-3"
      >
        Gold Standard unlocked!
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
            <span>The 7 Gold Standard PBL design elements</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-success mt-0.5">&#10003;</span>
            <span>The driving question formula: Role + Action + Product + Audience + Purpose</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-success mt-0.5">&#10003;</span>
            <span>Your minimum viable PBL = driving question + public product</span>
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

export const module4Steps = [Step1, Step2, Step3, Step4, Step5, Step6, Step7, Step8, Step9, Step10];
