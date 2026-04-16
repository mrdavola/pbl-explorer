# PBL Explorer Interactive Enrichment — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform PBL Explorer from a content viewer into an interactive course that produces a tangible "My First PBL Unit" plan, with rich interactions, animated icons, audio narration, and mobile-first design.

**Architecture:** Client-side SPA with localStorage persistence. New hooks (`usePlanBuilder`, `useSoundEffects`) extend the existing `useProgress` pattern. ElevenLabs TTS proxied through a Next.js API route. Lordicon for animated navigational icons, Lucide for utility icons. All new interaction components follow the existing `{ onNext/onComplete }` callback pattern.

**Tech Stack:** Next.js 16 (App Router), React 19, Framer Motion 12, Tailwind v4, @lordicon/react, @elevenlabs/elevenlabs-js, Lucide React

**Design Doc:** `docs/plans/2026-04-16-interactive-enrichment-design.md`

---

## Phase 1: Foundation (Icons, Sound, Mobile Shell)

These tasks establish the infrastructure that all other features depend on.

---

### Task 1: Install dependencies and configure environment

**Files:**
- Modify: `package.json`
- Create: `.env.local`
- Modify: `.gitignore` (verify `.env.local` is listed)

**Step 1: Install new packages**

Run:
```bash
cd "/Users/md/PBL PD/pbl-explorer"
npm install @lordicon/react @elevenlabs/elevenlabs-js
```

**Step 2: Create `.env.local`**

```env
NEXT_PUBLIC_LORDICON_TOKEN=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBJZCI6NDM4LCJzZWNyZXQiOiJYaHJkNUZpeS1Jd3NfN3VXY2U5WnJKRGxaSjBLUWtHaiIsImlhdCI6MTc3NjMxMzA0Nn0.LzxwjDKxe-9F15pOhpAmV_x_a3tEuJ5oz7ElGEDAzrw
ELEVENLABS_API_KEY=sk_e3ea500b01d8c83dfe8977498011b83e681708b183bb8108
```

**Step 3: Verify `.gitignore` includes `.env.local`**

Check the file — Next.js projects include this by default, but verify.

**Step 4: Run build to verify no breakage**

Run: `npm run build`
Expected: successful build, no new errors

**Step 5: Commit**

```bash
git add package.json package-lock.json .gitignore
git commit -m "chore: add lordicon and elevenlabs dependencies"
```

---

### Task 2: Replace emojis with Lucide icons in module data

**Files:**
- Modify: `src/lib/data/modules.ts`

**Step 1: Update the ModuleData interface to use a component reference instead of emoji string**

Change the `icon` field from `string` to a Lucide icon import. Update all 7 module definitions:

```typescript
import { Lightbulb, BookOpen, Sprout, Star, Palette, Languages, BrainCircuit } from 'lucide-react';
import { type LucideIcon } from 'lucide-react';

export interface ModuleData {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  duration: string;
  stepCount: number;
  color: string;
  colorLight: string;
  icon: LucideIcon;
}
```

Module icon mapping:
- Module 1: `Lightbulb`
- Module 2: `BookOpen`
- Module 3: `Sprout`
- Module 4: `Star`
- Module 5: `Palette`
- Module 6: `Languages`
- Module 7: `BrainCircuit`

**Step 2: Update all consumers of `module.icon`**

Search for every place that renders `mod.icon` or `module.icon` as a string/emoji and replace with `<mod.icon size={N} />` component rendering. Key files:
- `src/components/path/learning-path.tsx` — ModuleNode icon circle (line ~105)
- `src/components/learn/celebration.tsx` — celebration icon display (line ~100)
- `src/app/page.tsx` — if used in dashboard

**Step 3: Replace streak/XP emojis in dashboard header**

In `src/app/page.tsx`, replace:
- `🔥` with `<Flame size={18} />` from lucide-react
- `✨` with `<Sparkles size={18} />` from lucide-react

**Step 4: Run build and verify**

Run: `npm run build`
Expected: clean build, no emoji rendering anywhere

**Step 5: Commit**

```bash
git add src/lib/data/modules.ts src/components/path/learning-path.tsx src/components/learn/celebration.tsx src/app/page.tsx
git commit -m "feat: replace all emojis with Lucide SVG icons"
```

---

### Task 3: Add Lordicon animated icons for learning path

**Files:**
- Create: `src/components/ui/animated-icon.tsx`
- Modify: `src/components/path/learning-path.tsx`

**Step 1: Create an AnimatedIcon wrapper component**

```tsx
'use client';

import { useRef, useEffect } from 'react';
import lottie from 'lottie-web';

interface AnimatedIconProps {
  src: string;
  size?: number;
  colorize?: string;
  trigger?: 'hover' | 'loop' | 'click' | 'morph';
  className?: string;
}

export function AnimatedIcon({ src, size = 28, colorize, trigger = 'hover', className }: AnimatedIconProps) {
  // Lordicon integration via their web component or lottie player
  // Use NEXT_PUBLIC_LORDICON_TOKEN for API access
}
```

Note: Research Lordicon's exact React integration pattern at build time. The `@lordicon/react` package uses a `<Player>` component with JSON icon data. We may need to fetch icon JSON from their CDN using the API token, or bundle the JSON files locally.

**Step 2: Map module icons to Lordicon animated versions**

Create a mapping object in `animated-icon.tsx` or a separate data file that maps module IDs to Lordicon icon identifiers (lightbulb, book, plant, star, palette, text, brain).

**Step 3: Update learning-path.tsx ModuleNode**

In the icon circle section (~line 105), render `AnimatedIcon` instead of the static Lucide icon for the main module nodes. Keep Lucide as fallback. The animated icon should:
- Play once on entrance (when node scrolls into view)
- Play on hover
- Use the module's OKLCH color via the `colorize` prop

**Step 4: Update celebration.tsx**

Replace the static icon in the celebration screen with the animated version (plays on mount with a spring bounce).

**Step 5: Update dashboard header icons**

Replace the static Flame and Sparkles with animated Lordicon equivalents for streak and XP.

**Step 6: Test on mobile and desktop**

Run: `npm run dev`
Verify: icons animate on hover (desktop) and on entrance (mobile), correct colors, proper sizing at 20/28/36px breakpoints.

**Step 7: Commit**

```bash
git add src/components/ui/animated-icon.tsx src/components/path/learning-path.tsx src/components/learn/celebration.tsx src/app/page.tsx
git commit -m "feat: add Lordicon animated icons for learning path and dashboard"
```

---

### Task 4: Create sound effects system

**Files:**
- Create: `public/sounds/correct.mp3`
- Create: `public/sounds/incorrect.mp3`
- Create: `public/sounds/click.mp3`
- Create: `public/sounds/step-complete.mp3`
- Create: `public/sounds/celebration.mp3`
- Create: `src/lib/hooks/use-sound-effects.ts`

**Step 1: Source or generate 5 feedback sound MP3 files**

Place small (~5-10KB) MP3 files in `public/sounds/`. These should be:
- `correct.mp3` — soft ascending chime
- `incorrect.mp3` — gentle low tone
- `click.mp3` — subtle click
- `step-complete.mp3` — satisfying ding
- `celebration.mp3` — short celebratory flourish

Use royalty-free sources or generate with a TTS/audio API. Keep files small.

**Step 2: Create useSoundEffects hook**

```typescript
'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type SoundName = 'correct' | 'incorrect' | 'click' | 'step-complete' | 'celebration';

const SOUND_PATHS: Record<SoundName, string> = {
  correct: '/sounds/correct.mp3',
  incorrect: '/sounds/incorrect.mp3',
  click: '/sounds/click.mp3',
  'step-complete': '/sounds/step-complete.mp3',
  celebration: '/sounds/celebration.mp3',
};

const STORAGE_KEY = 'pbl-explorer-sound-enabled';

export function useSoundEffects() {
  const [enabled, setEnabled] = useState(true);
  const audioCache = useRef<Record<string, HTMLAudioElement>>({});

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== null) setEnabled(stored === 'true');
  }, []);

  const toggleSound = useCallback(() => {
    setEnabled(prev => {
      const next = !prev;
      localStorage.setItem(STORAGE_KEY, String(next));
      return next;
    });
  }, []);

  const play = useCallback((name: SoundName) => {
    if (!enabled) return;
    const path = SOUND_PATHS[name];
    if (!audioCache.current[path]) {
      audioCache.current[path] = new Audio(path);
    }
    const audio = audioCache.current[path];
    audio.currentTime = 0;
    audio.play().catch(() => {}); // ignore autoplay restrictions
  }, [enabled]);

  return { enabled, toggleSound, play };
}
```

**Step 3: Add sound toggle to dashboard header**

In `src/app/page.tsx`, add a speaker icon button (Lucide `Volume2` / `VolumeX`) next to the streak/XP display that calls `toggleSound()`.

**Step 4: Test toggle persistence**

Run dev server. Toggle sound off, refresh page, verify it stays off.

**Step 5: Commit**

```bash
git add public/sounds/ src/lib/hooks/use-sound-effects.ts src/app/page.tsx
git commit -m "feat: add sound effects system with global toggle"
```

---

### Task 5: Mobile-first lesson shell redesign

**Files:**
- Modify: `src/components/learn/lesson-shell.tsx`
- Modify: `src/app/globals.css`

**Step 1: Redesign lesson shell for full-viewport mobile layout**

Update `lesson-shell.tsx`:
- Progress bar: 3px thin strip at very top of viewport (fixed position)
- Back button + step counter: minimal floating overlay (top-left, semi-transparent background)
- Content area: edge-to-edge with 16px horizontal padding, fills remaining viewport
- "Continue" button: full-width sticky bar pinned to bottom with safe area inset padding
- Remove the footer module title (saves vertical space)

Key layout changes:
```tsx
// Outer container
<div className="min-h-[100dvh] flex flex-col">
  {/* 3px progress bar - fixed top */}
  <div className="fixed top-0 left-0 right-0 h-[3px] bg-gray-200 z-50">
    <motion.div className="h-full" style={{ width: `${progress}%`, backgroundColor: moduleColor }} />
  </div>

  {/* Floating nav overlay */}
  <div className="fixed top-2 left-2 right-2 z-40 flex justify-between items-center">
    {/* Home + Back buttons, step counter */}
  </div>

  {/* Content - fills viewport */}
  <div className="flex-1 pt-14 pb-20 px-4 overflow-y-auto">
    {children}
  </div>

  {/* Sticky bottom continue bar */}
  <div className="fixed bottom-0 left-0 right-0 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] bg-white/80 backdrop-blur-md border-t z-40">
    {/* ContinueButton */}
  </div>
</div>
```

**Step 2: Add swipe gesture support**

Add horizontal swipe detection using touch events or Framer Motion's `drag` prop:
- Swipe left → next step (same as Continue)
- Swipe right → previous step (same as Back)
- Only trigger on horizontal swipes >80px with velocity threshold to avoid accidental triggers

**Step 3: Update globals.css**

Add safe-area-inset support:
```css
:root {
  --safe-area-bottom: env(safe-area-inset-bottom, 0px);
}
```

**Step 4: Test on mobile viewport**

Run dev server, open Chrome DevTools mobile emulation (iPhone 14, Pixel 7). Verify:
- Content fills full viewport
- Progress bar is thin and unobtrusive
- Continue button is always reachable with thumb
- Swipe works in both directions
- No content hidden behind fixed elements

**Step 5: Commit**

```bash
git add src/components/learn/lesson-shell.tsx src/app/globals.css
git commit -m "feat: mobile-first lesson shell with full-viewport layout and swipe navigation"
```

---

## Phase 2: New Interaction Components

Each interaction component follows the existing pattern: receives content props + `onComplete` callback. Build each as a standalone component, then wire into module content in Phase 4.

---

### Task 6: Sequence Builder interaction

**Files:**
- Create: `src/components/interactions/sequence-builder.tsx`

**Step 1: Build the SequenceBuilder component**

```typescript
interface SequenceBuilderProps {
  items: { id: string; label: string; correctPosition: number }[];
  instruction?: string;
  onComplete: () => void;
  moduleColor?: string;
}
```

Behavior:
- Items start in a shuffled vertical list
- Numbered slots (1, 2, 3...) shown as drop targets
- Tap an item to select it (highlight), tap a slot to place it
- Correct placement: locks green with checkmark, item can't be moved
- Incorrect placement: shake animation, item returns to unplaced pool
- Play `correct`/`incorrect` sound on placement (use `useSoundEffects`)
- "Continue" appears when all items correctly placed
- Mobile: full-width items, large tap targets (min 48px height)

**Step 2: Test manually**

Run dev server. Create a temporary test page or render the component in an existing step to verify:
- Shuffled order differs from correct order
- Tap-to-select + tap-to-place works on mobile
- Correct/incorrect feedback animations
- All-correct triggers onComplete

**Step 3: Commit**

```bash
git add src/components/interactions/sequence-builder.tsx
git commit -m "feat: add sequence builder interaction component"
```

---

### Task 7: Slider/Spectrum interaction

**Files:**
- Create: `src/components/interactions/slider-spectrum.tsx`

**Step 1: Build the SliderSpectrum component**

```typescript
interface SliderSpectrumProps {
  question: string;
  leftLabel: string;
  rightLabel: string;
  snapPoints: { value: number; label: string; feedback: string }[];
  onComplete: () => void;
  moduleColor?: string;
}
```

Behavior:
- Full-width slider with large circular thumb (44px for touch)
- Left and right end labels
- As slider moves, snaps to defined points and shows contextual feedback text below
- Feedback text animates in (fade + slide up)
- No "wrong" answer — exploratory interaction
- "Continue" appears after user has interacted (moved slider at least once)
- Mobile: full-width, feedback text below slider

**Step 2: Test manually**

Verify slider is easy to grab on mobile, feedback updates smoothly, snap points work.

**Step 3: Commit**

```bash
git add src/components/interactions/slider-spectrum.tsx
git commit -m "feat: add slider/spectrum interaction component"
```

---

### Task 8: Matching Pairs interaction

**Files:**
- Create: `src/components/interactions/matching-pairs.tsx`

**Step 1: Build the MatchingPairs component**

```typescript
interface MatchingPairsProps {
  pairs: { id: string; left: string; right: string }[];
  leftTitle?: string;
  rightTitle?: string;
  onComplete: () => void;
  moduleColor?: string;
}
```

Behavior:
- Two columns of items (shuffled independently)
- Mobile layout: stacked vertically — left items on top, right items below, tap one from each to attempt a match
- Desktop layout: side-by-side columns with connecting line animation on match
- Tap left item (highlights), tap right item to attempt match
- Correct match: both items lock with moduleColor highlight + connecting line + `correct` sound
- Incorrect match: both shake + `incorrect` sound, deselect
- "Continue" appears when all pairs matched
- Matched items move to top/stay in place with reduced opacity variation to show progress

**Step 2: Test on both mobile and desktop viewports**

Verify stacked layout on mobile, side-by-side on desktop (breakpoint at `md`).

**Step 3: Commit**

```bash
git add src/components/interactions/matching-pairs.tsx
git commit -m "feat: add matching pairs interaction component"
```

---

### Task 9: Reflection Prompt interaction

**Files:**
- Create: `src/components/interactions/reflection-prompt.tsx`

**Step 1: Build the ReflectionPrompt component**

```typescript
interface ReflectionPromptProps {
  question: string;
  placeholder?: string;
  storageKey: string; // unique key for localStorage persistence
  onComplete: () => void;
  moduleColor?: string;
  saveToPlan?: { slug: string; field: string }; // optional plan builder integration
}
```

Behavior:
- Large textarea with character count
- Auto-saves to localStorage on input (debounced 500ms)
- Shows "Saved" confirmation briefly after save
- "Continue" available immediately (reflection is optional but encouraged)
- If `saveToPlan` is provided, also saves the value to the plan builder state
- Pre-fills from localStorage if returning to this step
- Mobile: full-width textarea, min-height 120px, keyboard-aware (scrolls into view)

**Step 2: Test persistence**

Type a reflection, navigate away, come back — verify text is restored.

**Step 3: Commit**

```bash
git add src/components/interactions/reflection-prompt.tsx
git commit -m "feat: add reflection prompt interaction with localStorage persistence"
```

---

### Task 10: Choice Cards interaction

**Files:**
- Create: `src/components/interactions/choice-cards.tsx`

**Step 1: Build the ChoiceCards component**

```typescript
interface ChoiceCardsProps {
  question: string;
  options: { id: string; title: string; description: string; icon?: LucideIcon }[];
  mode: 'single' | 'multi';
  maxSelections?: number; // for multi mode, e.g. "choose 3"
  onComplete: (selected: string[]) => void;
  moduleColor?: string;
  saveToPlan?: { slug: string; field: string };
}
```

Behavior:
- Full-width stacked cards on mobile
- Each card: icon (optional) + title + description
- Tap to select: accent border in moduleColor + checkmark overlay + `click` sound
- Single mode: selecting one deselects others
- Multi mode: toggle selection, show count ("2 of 3 selected")
- "Continue" appears when valid selection made (1 for single, minSelections for multi)
- If `saveToPlan` provided, saves selected IDs to plan state

**Step 2: Test both single and multi modes**

**Step 3: Commit**

```bash
git add src/components/interactions/choice-cards.tsx
git commit -m "feat: add choice cards interaction component"
```

---

## Phase 3: PBL Plan Builder

---

### Task 11: Create the Plan Builder hook and data model

**Files:**
- Create: `src/lib/hooks/use-plan-builder.ts`

**Step 1: Define the plan data model and hook**

```typescript
'use client';

import { useCallback, useEffect, useState } from 'react';

export interface PBLPlan {
  subject?: string;
  gradeLevel?: string;
  drivingQuestion?: string;
  projectScale?: string;
  priorityElements?: string[];
  problemStatement?: string;
  dtEntryPoint?: string;
  approachType?: string;
  aiIntegrationPoints?: string[];
  reflections?: Record<string, string>; // keyed by module slug
}

const STORAGE_KEY = 'pbl-explorer-plan';

export function usePlanBuilder() {
  const [plan, setPlan] = useState<PBLPlan>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setPlan(JSON.parse(stored));
    }
    setLoaded(true);
  }, []);

  const updatePlan = useCallback((updates: Partial<PBLPlan>) => {
    setPlan(prev => {
      const next = { ...prev, ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const setReflection = useCallback((slug: string, text: string) => {
    setPlan(prev => {
      const next = { ...prev, reflections: { ...prev.reflections, [slug]: text } };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const hasPlanData = Object.keys(plan).some(k => {
    const val = plan[k as keyof PBLPlan];
    if (Array.isArray(val)) return val.length > 0;
    if (typeof val === 'object') return Object.keys(val || {}).length > 0;
    return val !== undefined && val !== '';
  });

  return { plan, loaded, updatePlan, setReflection, hasPlanData };
}
```

**Step 2: Test hook isolation**

Verify it loads/saves independently from the progress hook. Test updatePlan merges correctly.

**Step 3: Commit**

```bash
git add src/lib/hooks/use-plan-builder.ts
git commit -m "feat: add PBL plan builder hook with localStorage persistence"
```

---

### Task 12: Create My Plan page

**Files:**
- Create: `src/app/my-plan/page.tsx`
- Modify: `src/app/page.tsx` (add link to My Plan)

**Step 1: Build the My Plan page**

A clean one-pager that assembles all plan choices into a cohesive PBL unit outline.

Sections (each in a card):
1. **Subject & Grade** — from Module 1 builder moment
2. **Driving Question** — from Module 2
3. **Project Scale** — from Module 3
4. **Priority Elements** — from Module 4
5. **Problem Statement & Design Entry** — from Module 5
6. **Approach Type** — from Module 6
7. **AI Integration** — from Module 7
8. **My Reflections** — collected from all modules

Each section:
- If data exists: display it with module color accent
- If empty: show "Complete Module X to fill this in" with muted styling and link to module

Layout:
- Mobile: full-bleed stacked cards, edge-to-edge
- Print: `@media print` styles for clean PDF output (hide nav, full-width, page breaks between sections)

**Step 2: Add "My Plan" link to dashboard**

In `src/app/page.tsx`, add a button/link to `/my-plan` that appears after `hasPlanData` is true. Position it near the progress ring or below the header.

**Step 3: Test print output**

Open `/my-plan`, use Ctrl+P / Cmd+P, verify the print preview looks like a clean one-pager.

**Step 4: Commit**

```bash
git add src/app/my-plan/page.tsx src/app/page.tsx
git commit -m "feat: add My Plan page with print-friendly layout"
```

---

## Phase 4: Audio System

---

### Task 13: Create TTS API route

**Files:**
- Create: `src/app/api/tts/route.ts`

**Step 1: Build the API route**

```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { text } = await req.json();

  if (!text || typeof text !== 'string') {
    return NextResponse.json({ error: 'text is required' }, { status: 400 });
  }

  // Truncate to reasonable length for TTS
  const truncated = text.slice(0, 2000);

  const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/JBFqnCBsd6RMkjVDRZzb', {
    method: 'POST',
    headers: {
      'xi-api-key': process.env.ELEVENLABS_API_KEY!,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: truncated,
      model_id: 'eleven_v3',
      output_format: 'mp3_44100_128',
    }),
  });

  if (!response.ok) {
    return NextResponse.json({ error: 'TTS generation failed' }, { status: 500 });
  }

  const audioBuffer = await response.arrayBuffer();
  return new NextResponse(audioBuffer, {
    headers: {
      'Content-Type': 'audio/mpeg',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
```

**Step 2: Test the API route**

Run dev server, use curl or a test page to POST text and verify audio is returned.

**Step 3: Commit**

```bash
git add src/app/api/tts/route.ts
git commit -m "feat: add ElevenLabs TTS API route"
```

---

### Task 14: Create TTS player component and integrate into lesson shell

**Files:**
- Create: `src/components/learn/tts-player.tsx`
- Modify: `src/components/learn/lesson-shell.tsx`

**Step 1: Build the TTS player component**

```typescript
interface TTSPlayerProps {
  text: string; // the text content of the current step to narrate
  stepKey: string; // unique cache key, e.g. "module-slug-step-0"
}
```

Behavior:
- Small play/pause button (floating in lesson shell top-right area)
- On play: check localStorage cache for `tts-${stepKey}`
  - If cached: play from cache
  - If not cached: POST to `/api/tts`, receive audio, cache as base64 in localStorage, play
- Visual: animated waveform bars while playing, static play icon when idle
- Pause resumes from current position
- Auto-stops when step changes

**Step 2: Integrate into lesson shell**

Add the TTSPlayer to the floating overlay area (top-right, alongside back button on top-left). Pass the current step's text content and a step key.

The step text extraction: each step component needs to expose its narration text. Options:
- Add a `narrateText` export alongside each step component array
- Or extract text from the step's DOM after render (simpler but less controlled)

Recommended: add a `narrateTexts` array export from each module data file (e.g., `module1NarrateTexts: string[]`) that maps step index to narration text.

**Step 3: Test narration flow**

Play a step's audio, advance to next step (audio should stop), go back (should play cached version instantly).

**Step 4: Commit**

```bash
git add src/components/learn/tts-player.tsx src/components/learn/lesson-shell.tsx
git commit -m "feat: add TTS narration player in lesson shell"
```

---

### Task 15: Wire sound effects into existing interactions

**Files:**
- Modify: `src/components/interactions/scenario-quiz.tsx`
- Modify: `src/components/interactions/flip-card.tsx`
- Modify: `src/components/interactions/drag-sort.tsx`
- Modify: `src/components/learn/celebration.tsx`
- Modify: `src/components/learn/lesson-shell.tsx`

**Step 1: Add sound effects to each interaction**

Import and use `useSoundEffects` in each component:

- **scenario-quiz.tsx**: play `correct` on right answer, `incorrect` on wrong answer
- **flip-card.tsx**: play `click` on flip
- **drag-sort.tsx**: play `correct` on correct placement, `incorrect` on wrong placement
- **lesson-shell.tsx**: play `step-complete` on step advance (in goNext handler)
- **celebration.tsx**: play `celebration` on mount

Also add sounds to the new Phase 2 interaction components (sequence-builder, matching-pairs, etc.).

**Step 2: Test with sound toggle**

Verify sounds play when enabled, are silent when disabled.

**Step 3: Commit**

```bash
git add src/components/interactions/ src/components/learn/
git commit -m "feat: wire sound effects into all interactions"
```

---

## Phase 5: Rich Content & Diagrams

---

### Task 16: Animated SVG diagrams

**Files:**
- Create: `src/components/diagrams/pbl-phase-flow.tsx`
- Create: `src/components/diagrams/gold-standard-wheel.tsx`
- Create: `src/components/diagrams/design-thinking-loop.tsx`
- Create: `src/components/diagrams/cluster-taxonomy.tsx`

**Step 1: PBL Phase Flow (Module 2)**

Animated SVG showing 5 phases as connected nodes in a horizontal flow:
Entry Event → Investigation → Challenge → Create → Share

- Each node is a rounded rect with icon and label
- Connecting arrows animate in sequence (draw-on effect)
- Nodes highlight one at a time with a pulse when active
- Accepts `activePhase?: number` prop to highlight current phase
- Responsive: wraps to 2 rows on mobile (3+2 or flows vertically)
- Use Framer Motion for draw animations (strokeDashoffset)

**Step 2: Gold Standard Wheel (Module 4)**

7 elements arranged in a circle around a center hub:
- Center: "Gold Standard PBL"
- Spokes radiate outward to 7 element nodes
- Each element animates in with a stagger (rotate + fade)
- Accepts `highlightElement?: string` to light up one element
- Color-coded segments using module 4's color palette

**Step 3: Design Thinking Loop (Module 5)**

The classic 5-stage loop (Empathize → Define → Ideate → Prototype → Test) with iteration arrows:
- Circular/pentagonal layout
- Animated arrows show forward progression
- Dotted "iterate" arrows show backward loops
- Each stage can highlight independently

**Step 4: Cluster Taxonomy (Module 6)**

Adapted from the mrdavolaedu.com code the user provided:
- Concentric circles with "Authentic Student Learning" at center
- 4 quadrants for the 4 cluster types
- Each approach card is tap-to-expand on mobile
- Uses the full data model (name, driver, icon, teacher role, example)
- Animated entrance: center circle first, then quadrants stagger outward

**Step 5: Commit**

```bash
git add src/components/diagrams/
git commit -m "feat: add animated SVG diagrams for modules 2, 4, 5, 6"
```

---

### Task 17: "Go Deeper" accordion for HTH resources

**Files:**
- Create: `src/components/learn/go-deeper.tsx`
- Create: `src/lib/data/resources.ts`

**Step 1: Create resource data**

```typescript
export interface Resource {
  title: string;
  source: string;
  type: 'video' | 'pdf' | 'article' | 'tool';
  url: string;
  description: string;
  moduleSlug: string; // which module this belongs to
  stepIndex?: number; // optional: which step to show it on
}

export const resources: Resource[] = [
  {
    title: 'The Kaleidoscope Framework',
    source: 'HTH GSE',
    type: 'pdf',
    url: 'https://hthgse.edu/...',
    description: '9-component visual design system for transformative PBL.',
    moduleSlug: 'gold-standard',
  },
  // ... more resources from HTH Unboxed, etc.
];
```

**Step 2: Build GoDeeper component**

```typescript
interface GoDeeperProps {
  resources: Resource[];
  moduleColor?: string;
}
```

Collapsible accordion at the bottom of a step:
- "Go Deeper" header with chevron icon
- Expands to show resource cards
- Each card: type badge (video/pdf/article/tool), title, source, description, external link icon
- Collapsed by default to not distract from main content
- Smooth expand animation (Framer Motion layout)

**Step 3: Commit**

```bash
git add src/components/learn/go-deeper.tsx src/lib/data/resources.ts
git commit -m "feat: add Go Deeper resource accordion with HTH content"
```

---

### Task 18: Resource Toolkit page

**Files:**
- Create: `src/app/toolkit/page.tsx`
- Modify: `src/app/page.tsx` (add toolkit link to dashboard)

**Step 1: Build the Toolkit page**

Route: `/toolkit`

Layout:
- Header with back-to-home link
- Category filter tabs: All, Frameworks, Protocols, Templates, Videos
- Grid of resource cards (reuse card style from GoDeeper)
- Mobile: single-column, full-width cards
- Desktop: 2-3 column grid

Data: import from `src/lib/data/resources.ts`, filter by type.

**Step 2: Add toolkit link to dashboard**

Add a "Toolkit" link/button in the dashboard, either in the header or below the learning path. Use Lucide `Library` or `FolderOpen` icon.

**Step 3: Commit**

```bash
git add src/app/toolkit/page.tsx src/app/page.tsx
git commit -m "feat: add resource toolkit page with category filtering"
```

---

## Phase 6: Module Content Enrichment

This phase updates the actual step content in each module to use the new interactions, diagrams, plan builder moments, and resources.

---

### Task 19: Enrich Module 1 (What IS PBL?)

**Files:**
- Modify: `src/lib/data/steps/module-1.tsx`

**Changes:**
- Step 1: Keep scenario quiz (already works well)
- Step 3: Add slider/spectrum — "Rate this scenario: how PBL is it?" (traditional → full PBL scale)
- Step 5: Replace or enhance flip cards with richer content
- Step 7: Keep drag-sort (works well)
- NEW Step 8 (or modify existing): **Builder moment** — reflection prompt: "What subject/class would you try PBL in first?" + text input for grade level. Saves to plan via `saveToPlan: { slug: 'what-is-pbl', field: 'subject' }`
- End: Reflection prompt for end-of-module reflection

Wire `useSoundEffects` into step content where interactions are used.

**Commit after testing each module.**

---

### Task 20: Enrich Module 2 (Learning Narrative)

**Files:**
- Modify: `src/lib/data/steps/module-2.tsx`

**Changes:**
- Add PBL Phase Flow diagram to the phase overview step
- Add **sequence builder**: arrange the 5 phases in correct order
- **Builder moment**: reflection prompt — "Draft a driving question for your class"
- Add Go Deeper resources for relevant HTH content
- End-of-module reflection

---

### Task 21: Enrich Module 3 (Start Small)

**Files:**
- Modify: `src/lib/data/steps/module-3.tsx`

**Changes:**
- **Builder moment**: choice cards — pick your PBL scale (single-day, micro, mini, full)
- End-of-module reflection

---

### Task 22: Enrich Module 4 (Gold Standard)

**Files:**
- Modify: `src/lib/data/steps/module-4.tsx`

**Changes:**
- Add Gold Standard Wheel diagram
- Add **matching pairs**: match elements to descriptions
- **Builder moment**: choice cards (multi, pick 3) — prioritize Gold Standard elements
- Add Go Deeper resources (HTH Kaleidoscope framework)
- End-of-module reflection

---

### Task 23: Enrich Module 5 (Design Thinking)

**Files:**
- Modify: `src/lib/data/steps/module-5.tsx`

**Changes:**
- Add Design Thinking Loop diagram
- Add **sequence builder**: order the 5 DT stages
- **Builder moment**: reflection prompt — "What real-world problem could students tackle?" + choice cards for DT entry point
- End-of-module reflection

---

### Task 24: Enrich Module 6 (Alphabet Soup)

**Files:**
- Modify: `src/lib/data/steps/module-6.tsx`

**Changes:**
- Replace existing content with the Cluster Taxonomy diagram (adapted from mrdavolaedu.com code)
- Full cluster data: 4 categories, 11 approaches, each with teacher role + example
- Add **matching pairs**: match acronyms to definitions
- Add **slider/spectrum**: "How student-driven is this approach?" comparing approaches
- **Builder moment**: choice cards — pick which approach flavor fits your context
- End-of-module reflection

---

### Task 25: Enrich Module 7 (PBL + AI)

**Files:**
- Modify: `src/lib/data/steps/module-7.tsx`

**Changes:**
- **Builder moment**: choice cards (multi) — select where AI helps in your plan
- End-of-module reflection

---

### Task 26: Add narration text arrays for TTS

**Files:**
- Modify: `src/lib/data/steps/module-1.tsx` through `module-7.tsx`

**Step 1: Add narrateTexts export to each module**

Each module file exports a `string[]` alongside its steps array:

```typescript
export const module1NarrateTexts: string[] = [
  "Welcome to Module 1. Let's start with a question...",
  "Think of PBL like a main course, not dessert...",
  // ... one per step
];
```

Extract the key learning content from each step into a concise narration script (2-4 sentences per step). This is what gets sent to ElevenLabs.

**Step 2: Update the lesson page to pass narration text**

In `src/app/learn/[slug]/page.tsx`, import the narrateTexts arrays and pass the current step's text to the TTSPlayer component.

**Step 3: Commit**

```bash
git add src/lib/data/steps/ src/app/learn/[slug]/page.tsx
git commit -m "feat: add TTS narration text for all modules"
```

---

## Phase 7: Final Polish

---

### Task 27: Integration testing and mobile QA

**Step 1: Full flow test**

Walk through all 7 modules start to finish:
- Verify every interaction works (quiz, flip card, drag-sort, sequence builder, slider, matching pairs, reflection prompt, choice cards)
- Verify plan builder accumulates data correctly
- Verify My Plan page shows all collected data
- Verify celebration screen works with animated icons and sound
- Verify TTS plays and caches correctly

**Step 2: Mobile testing**

Test on mobile viewport (Chrome DevTools + real device if possible):
- Full-viewport lessons fill the screen
- Swipe navigation works
- All interactions are thumb-friendly (min 44px tap targets)
- Continue button is always reachable
- No horizontal scroll issues
- Keyboard doesn't obscure reflection prompts

**Step 3: Print testing**

Test Cmd+P on `/my-plan` page — verify clean output.

**Step 4: Performance check**

Run: `npm run build`
Check: no build warnings, reasonable bundle size, no unnecessary re-renders.

**Step 5: Commit any fixes**

---

### Task 28: Final build and deploy verification

**Step 1: Production build**

Run:
```bash
npm run build
npm run start
```

Verify the production build works correctly — all routes, interactions, audio, icons.

**Step 2: Commit all remaining changes**

```bash
git add -A
git commit -m "feat: complete interactive enrichment — new interactions, plan builder, audio, animated icons"
```

---

## Execution Order Summary

| Phase | Tasks | Dependencies |
|---|---|---|
| 1: Foundation | 1-5 | None |
| 2: Interactions | 6-10 | Task 4 (sound effects) |
| 3: Plan Builder | 11-12 | None (can parallel with Phase 2) |
| 4: Audio | 13-15 | Task 1 (env vars), Task 5 (lesson shell) |
| 5: Rich Content | 16-18 | None (can parallel with Phase 2-4) |
| 6: Module Content | 19-26 | All of Phases 2-5 |
| 7: Polish | 27-28 | All previous phases |

**Parallelizable:** Phases 2, 3, and 5 can run concurrently. Phase 4 can start after Phase 1 completes. Phase 6 requires all component work done. Phase 7 is final.
