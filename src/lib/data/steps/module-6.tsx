"use client";

import { ScenarioQuiz } from "@/components/interactions/scenario-quiz";
import { FlipCardGrid } from "@/components/interactions/flip-card";
import { MatchingPairs } from "@/components/interactions/matching-pairs";
import { SliderSpectrum } from "@/components/interactions/slider-spectrum";
import { ChoiceCards } from "@/components/interactions/choice-cards";
import { ContinueButton } from "@/components/learn/lesson-shell";
import { GoDeeper } from "@/components/learn/go-deeper";
import { ClusterTaxonomy } from "@/components/diagrams/cluster-taxonomy";
import { getResourcesForModule } from "@/lib/data/resources";
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

/* Step 2 — The Big Picture with Cluster Taxonomy diagram */
function Step2({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col flex-1">
      <motion.div {...fadeUp}>
        <h2 className="text-2xl font-bold mb-2">The Big Picture</h2>
        <p className="text-muted-foreground mb-6">
          PBL is the broadest framework. Other approaches fit inside or overlap with it.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-6"
      >
        <ClusterTaxonomy />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-sm text-muted-foreground text-center"
      >
        The approaches inside the circle are subsets or close relatives of PBL.
        The ones outside are lenses or formats &mdash; not teaching methods.
      </motion.p>

      <ContinueButton onClick={onNext} moduleColor={MODULE_COLOR} />
    </div>
  );
}

/* Step 3 — Matching Pairs: match acronyms to definitions */
function Step3({ onNext }: { onNext: () => void }) {
  return (
    <MatchingPairs
      pairs={[
        { id: '1', left: 'PBL', right: 'Extended projects driven by a meaningful question' },
        { id: '2', left: 'PrBL', right: 'Investigating and solving complex, open-ended problems' },
        { id: '3', left: 'IBL', right: 'Student questions drive the learning process' },
        { id: '4', left: 'CBL', right: 'Taking action on real-world challenges' },
        { id: '5', left: 'STEAM', right: 'Hands-on, cross-curricular making and building' },
        { id: '6', left: 'Genius Hour', right: 'Students explore personal curiosity and passions' },
      ]}
      leftTitle="Approach"
      rightTitle="What Drives It"
      onComplete={onNext}
      moduleColor={MODULE_COLOR}
    />
  );
}

/* Step 4 — Key Comparisons Part 1 */
function Step4({ onNext }: { onNext: () => void }) {
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

/* Step 5 — Key Comparisons Part 2 */
function Step5({ onNext }: { onNext: () => void }) {
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

/* Step 6 — Lens vs Method Distinction */
function Step6({ onNext }: { onNext: () => void }) {
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

/* Step 7 — Slider Spectrum: student-driven scale */
function Step7({ onNext }: { onNext: () => void }) {
  return (
    <SliderSpectrum
      question="How student-driven is each approach? Explore the spectrum."
      leftLabel="Teacher-Structured"
      rightLabel="Student-Driven"
      snapPoints={[
        { value: 0, label: 'STEAM Challenges', feedback: 'Often teacher-designed with specific outcomes. Students build, but within defined parameters.' },
        { value: 20, label: 'Problem-Based', feedback: 'Teacher presents the problem, but students drive the investigation and solution.' },
        { value: 40, label: 'Project-Based', feedback: 'Teacher designs the framework, students have voice and choice within it.' },
        { value: 60, label: 'Inquiry-Based', feedback: 'Students generate questions and direct their own research pathways.' },
        { value: 80, label: 'Challenge-Based', feedback: 'Students identify the challenge and take real action in their community.' },
        { value: 100, label: 'Genius Hour', feedback: 'Fully student-driven \u2014 they choose what to explore based on personal passion.' },
      ]}
      onComplete={onNext}
      moduleColor={MODULE_COLOR}
    />
  );
}

/* Step 8 — Sort Quiz */
function Step8({ onNext }: { onNext: () => void }) {
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

/* Step 9 — Builder Moment: Choice Cards */
function Step9({ onNext }: { onNext: () => void }) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: MODULE_COLOR }}>Building your plan</div>
      <ChoiceCards
        question="Which approach flavor best fits your teaching context?"
        options={[
          { id: 'pbl', title: 'Project-Based Learning', description: 'Sustained projects with authentic products and audiences' },
          { id: 'prbl', title: 'Problem-Based Learning', description: 'Deep investigation of complex, open-ended problems' },
          { id: 'ibl', title: 'Inquiry-Based Learning', description: 'Student questions drive the entire learning process' },
          { id: 'cbl', title: 'Challenge-Based Learning', description: 'Taking action on real-world issues in the community' },
          { id: 'dt', title: 'Design Thinking', description: 'Empathy-driven prototyping and iteration' },
          { id: 'genius', title: 'Genius Hour / Passion Projects', description: 'Student-chosen exploration of personal interests' },
        ]}
        mode="single"
        onComplete={() => onNext()}
        moduleColor={MODULE_COLOR}
      />
    </div>
  );
}

/* Step 10 — Go Deeper */
function Step10({ onNext }: { onNext: () => void }) {
  return (
    <div className="flex flex-col flex-1">
      <motion.div {...fadeUp}>
        <h2 className="text-xl font-bold mb-4">Go Deeper</h2>
      </motion.div>
      <GoDeeper resources={getResourcesForModule('alphabet-soup')} moduleColor={MODULE_COLOR} />
      <ContinueButton onClick={onNext} moduleColor={MODULE_COLOR} />
    </div>
  );
}

/* Step 11 — Completion */
function Step11({ onNext }: { onNext: () => void }) {
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

export const module6Steps = [Step1, Step2, Step3, Step4, Step5, Step6, Step7, Step8, Step9, Step10, Step11];

export const module6NarrateTexts: string[] = [
  "PBL, PrBL, CBL, STEM, IBL — there are so many acronyms in education. It can feel overwhelming, but once you understand how they relate to each other, the alphabet soup starts to make sense.",
  "Here's the big picture: PBL is the broadest framework. Other approaches either fit inside it, overlap with it, or are something different entirely — like a content lens or a time format rather than a teaching method.",
  "Let's match each acronym to what drives it. PBL is driven by meaningful questions. Problem-Based Learning focuses on solving complex problems. Inquiry-Based Learning follows student questions. Challenge-Based Learning is about taking action on real issues.",
  "How is Problem-Based Learning different from PBL? It focuses on solving a specific case, often in days to weeks. PBL is broader — students learn through a sustained project that results in a public product. Design Thinking is a creative process that can be used within PBL.",
  "Challenge-Based Learning differs because students identify the challenge themselves — it's student-driven from the very start. Inquiry-Based Learning is the research engine inside PBL — it's about asking questions and investigating, but doesn't always result in a product.",
  "Not everything with an acronym is a teaching method. STEM is a content lens describing what you teach. Genius Hour is a time format. Service Learning is about civic action. They can all be combined with PBL, but they're different categories.",
  "These approaches exist on a spectrum from teacher-structured to student-driven. STEAM challenges tend to be more teacher-designed, while Genius Hour is fully student-driven. PBL sits in the middle with structured teacher frameworks and student voice and choice.",
  "Here's a key distinction: STEM describes what content you teach, while PBL describes how you teach it. You can absolutely teach STEM through PBL — they're complementary, not competing.",
  "Think about which approach flavor best fits your teaching context. Your answer might be pure PBL, or it might be a blend — and that's perfectly fine. The frameworks are tools, not religions.",
  "Explore these resources to go deeper into the relationships between these different approaches and how they can work together in your classroom.",
  "Alphabet Soup decoded! PBL is the broadest framework. Problem-Based, Challenge-Based, and Inquiry-Based are close relatives. Design Thinking is a process inside PBL. And STEM is a content lens, not a teaching method.",
];
