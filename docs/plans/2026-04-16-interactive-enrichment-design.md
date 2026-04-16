# PBL Explorer: Interactive Enrichment Design

**Date:** 2026-04-16
**Status:** Approved
**Goal:** Teachers walk away with confidence to try PBL tomorrow — a concrete plan they built during the course.

---

## Design Pillars

- **Solo-first with gamification** — self-paced, no cohort dependency
- **Mobile-first** — maximize phone screen real estate, full-viewport lessons
- **Content-driven interactions** — interaction type chosen per module, not one-size-fits-all
- **Builder thread** — every module contributes to a tangible takeaway

---

## Section 1: Icon System & Visual Polish

### Replace all emojis with proper icons

**Lordicon (animated)** for key navigational/decorative icons:
- Module icons on the learning path (7 icons)
- Streak flame in dashboard header
- XP sparkle in dashboard header
- Completion checkmark on finished modules
- Celebration screen icons

**Lucide React (static SVG)** for utility/UI icons:
- Back arrows, close buttons, menu icons
- Step navigation controls
- Interaction UI elements (drag handles, expand arrows, etc.)

### Icon mapping

| Current Emoji | Replacement | Library |
|---|---|---|
| `lightbulb` Module 1 | Animated lightbulb | Lordicon |
| `book` Module 2 | Animated book | Lordicon |
| `sprout` Module 3 | Animated plant/growth | Lordicon |
| `star` Module 4 | Animated star | Lordicon |
| `palette` Module 5 | Animated palette | Lordicon |
| `letters` Module 6 | Animated ABC/text | Lordicon |
| `robot` Module 7 | Animated AI/brain | Lordicon |
| `fire` Streak | Animated flame | Lordicon |
| `sparkle` XP | Animated sparkle | Lordicon |
| `check` Complete | Animated checkmark | Lordicon |

### Configuration

- Lordicon API token stored in `.env.local` as `NEXT_PUBLIC_LORDICON_TOKEN`
- `@lordicon/react` package for React integration
- Icons sized consistently: 20px (badges), 28px (path nodes), 36px (module headers)
- Module-colored using the existing OKLCH palette
- Animate on hover/entrance, not looping

---

## Section 2: New Interaction Types

### 2.1 Sequence Builder

Drag/tap steps into the correct chronological order. Different from drag-sort (ordering vs categorizing).

**Used in:**
- Module 2: Arrange the 5 PBL phases (Entry Event, Investigation, Challenge, Create, Share)
- Module 5: Order the Design Thinking stages

**Behavior:**
- Items start in a shuffled list
- Tap to select, tap position to place (mobile-friendly)
- Visual feedback: correct position locks green, incorrect shakes and returns
- "Continue" blocked until all items correctly ordered

### 2.2 Slider/Spectrum

Rate a scenario on a sliding scale with contextual feedback at different positions.

**Used in:**
- Module 6: "How student-driven is this approach?" comparing PBL variants
- Module 1: Rate classroom scenarios on a traditional-to-PBL scale

**Behavior:**
- Full-width slider with large thumb (mobile-friendly)
- Label and feedback text update as slider moves
- Snap points with descriptions at key positions
- No "wrong" answer — exploratory interaction

### 2.3 Matching Pairs

Two columns — connect items from left to right by tapping.

**Used in:**
- Module 4: Match Gold Standard elements to descriptions
- Module 6: Match acronyms to definitions

**Behavior:**
- Mobile: stacked columns (not side-by-side), tap left item then tap right match
- Desktop: side-by-side with draw-line animation
- Correct matches lock with color + line, incorrect shake
- "Continue" blocked until all pairs matched

### 2.4 Reflection Prompt

Open-ended text input saved to localStorage. Not graded.

**Used in:**
- End of every module: "How could you apply this in your classroom this week?"
- Responses feed into the PBL Plan Builder

**Behavior:**
- Textarea with character count
- Saves on blur/input (debounced) to localStorage
- "Continue" available immediately (reflection is optional but encouraged)
- Subtle visual: "Saved to your plan" confirmation

### 2.5 Choice Cards

Tap to select from visual option cards. Choices persist into the plan.

**Used in:**
- Module 3: Pick your PBL scale (single-day, micro, mini, full)
- Module 4: Choose which Gold Standard elements to prioritize
- Module 5: Select a Design Thinking entry point

**Behavior:**
- Full-width stacked cards on mobile
- Single or multi-select depending on context
- Selected cards get accent border + checkmark
- Choices saved to plan state

### 2.6 Enriched Module 6 Taxonomy

Adapted from mrdavolaedu.com/pbl-explained cluster visualization:

**Data structure (4 clusters):**
1. Driven by Project/Problem: Project-Based, Problem-Based, Inquiry-Based
2. Driven by Making/Design: Design Thinking, Maker, STEAM Challenges
3. Driven by Interest: Genius Hour, Passion Projects
4. Driven by Purpose: Service Learning, Challenge-Based, Interdisciplinary

**Each approach card includes:**
- Icon (Lucide)
- Name + driver category
- Student description
- Teacher role
- Quick example

**Layout:**
- Mobile: stacked clusters, tap-to-expand cards
- Desktop: adapted concentric circle layout with 4 quadrants around "Authentic Student Learning" core

---

## Section 3: PBL Plan Builder Thread

### Concept

As teachers progress through modules, they make real choices that accumulate into "My First PBL Unit" — a concrete plan they built during the course.

### Builder moments per module

| Module | Builder Moment | Data Saved |
|---|---|---|
| 1: What IS PBL? | "What subject/class would you try PBL in first?" | `subject`, `gradeLevel` |
| 2: Learning Narrative | "Draft a driving question for your class" | `drivingQuestion` |
| 3: Start Small | Choice cards: pick your PBL scale | `projectScale` |
| 4: Gold Standard | Choose 3 elements to prioritize first | `priorityElements[]` |
| 5: Design Thinking | "What real-world problem could students tackle?" | `problemStatement`, `dtEntryPoint` |
| 6: Alphabet Soup | Pick which approach flavor fits your context | `approachType` |
| 7: PBL + AI | Select where AI helps in your plan | `aiIntegrationPoints[]` |

### State management

- New `planChoices` object in localStorage alongside existing progress state
- Keyed by module slug: `{ "what-is-pbl": { subject: "Science", gradeLevel: "7th" }, ... }`
- Exposed via a `usePlanBuilder()` hook with `setPlanChoice(slug, key, value)` and `getPlan()`

### Visual distinction in lesson flow

- Builder steps have a subtle accent left-border and a small "Building your plan" chip
- Distinct from regular content steps but not jarring

### My Plan page (`/my-plan`)

- Accessible from dashboard (visible after first builder choice is made)
- Clean one-pager assembling all choices into a cohesive PBL unit outline
- Sections: Subject & Grade, Driving Question, Project Scale, Priority Elements, Problem Statement, Approach Type, AI Integration
- Empty sections show "Complete Module X to fill this in"
- Print-friendly CSS (`@media print`) for PDF export
- Mobile: full-bleed card layout

---

## Section 4: Richer Content & Embedded Resources

### Animated SVG Diagrams

Built with SVG + Framer Motion (sharp at any size, meaningful animation):

| Module | Diagram | Description |
|---|---|---|
| 2 | PBL Phase Flow | 5 phases as connected nodes, animate in sequence |
| 4 | Gold Standard Wheel | 7 elements in a circle, each lights up at its step |
| 5 | Design Thinking Loop | 5-stage loop with animated iteration arrows |
| 6 | Cluster Taxonomy | Concentric circles with 4 quadrants (from mrdavolaedu.com) |

### HTH Embedded Resources ("Go Deeper")

- Collapsible accordion at the bottom of relevant steps
- Links to: HTH Unboxed videos, Kaleidoscope framework (EN/ES/etc), practice guides
- Card format: thumbnail, title, source badge, external link icon
- Not required to progress — optional enrichment

### Resource Toolkit Page (`/toolkit`)

- New route: `/toolkit`
- Curated grid of resources organized by category:
  - Frameworks (Kaleidoscope, Gold Standard)
  - Protocols (Tuning, Critique, Peer Feedback)
  - Templates (PBL planning docs, rubrics)
  - Videos (HTH Unboxed selections)
- Each resource: card with title, source, type badge, external link
- Static data array — no CMS, no bookmarking
- Mobile: single-column card list
- Accessible from dashboard navigation

---

## Section 5: Audio System

### A) Step Narration (ElevenLabs TTS)

- Play/pause button pinned to top of each step in lesson shell
- Sends step's key text content to ElevenLabs API via Next.js API route (`/api/tts`)
- API key stored server-side in `.env.local` as `ELEVENLABS_API_KEY`
- Model: `eleven_v3`, output: `mp3_44100_128`
- Voice: warm, professional selection from ElevenLabs library
- Cached after first generation in localStorage (base64) to avoid re-generation
- Visual: small waveform animation while playing, play/pause icon when idle

### D) Feedback Sounds

Lightweight static MP3 files (~5-10KB each):
- Correct answer: soft ascending chime
- Incorrect answer: gentle low tone
- Flip card reveal: subtle click
- Step complete: satisfying ding
- Module complete: celebratory flourish (pairs with confetti)

**Global toggle:**
- Speaker icon in dashboard header
- On by default
- Preference saved to localStorage alongside progress data
- Accessible via a `useSoundEffects()` hook

### Future voice recording architecture

- Audio files follow naming convention: `module-{slug}-step-{n}.mp3`
- Flag in module data: `useRecordedAudio: boolean`
- When true, loads pre-recorded file instead of calling TTS
- Drop-in replacement when recordings are ready

---

## Section 6: Mobile-First Layout

### Lesson Shell

- Full viewport height (`100dvh`)
- Progress bar: 3px thin strip at very top
- Back button + step counter: minimal floating overlay (top-left)
- Audio play button: floating overlay (top-right)
- Content: edge-to-edge with 16px horizontal padding
- "Continue" button: full-width sticky bar pinned to bottom (thumb-friendly)
- Swipe gestures: left for next step, right for previous

### Interaction sizing

- Flip cards: full-width single column, large tap targets
- Drag-sort: tap-to-select + tap-to-place (no tiny drag handles)
- Sequence builder: vertical stack, tap-to-grab + tap-position-to-drop
- Matching pairs: stacked columns on mobile, side-by-side on desktop
- Slider: full-width with large thumb, label below
- Choice cards: full-width stacked, checkmark overlay on selection
- Cluster taxonomy: mobile stacked layout from existing code

### Dashboard

- Progress ring centered and prominent
- Learning path nodes: large, thumb-friendly tap targets
- Stats (streak, XP): compact top bar
- Toolkit link in navigation

### Print/Export

- `@media print` styles for My Plan page
- Clean single-column layout for PDF export

---

## Technical Dependencies

### New packages
- `@lordicon/react` — animated icon player
- `@elevenlabs/elevenlabs-js` — TTS API SDK

### Environment variables (`.env.local`)
```
NEXT_PUBLIC_LORDICON_TOKEN=<lordicon_token>
ELEVENLABS_API_KEY=<elevenlabs_api_key>
```

### New routes
- `/my-plan` — PBL Plan Builder summary
- `/toolkit` — Resource library
- `/api/tts` — ElevenLabs TTS proxy (API route)

### New hooks
- `usePlanBuilder()` — plan state management
- `useSoundEffects()` — feedback sound playback + toggle

### New data
- Feedback sound MP3 files in `/public/sounds/`
- Module 6 cluster taxonomy data (adapted from mrdavolaedu.com component)
- Toolkit resource data array
- HTH resource links and metadata

---

## Out of Scope (Future Phases)

- Leaderboard and social sharing
- Facilitator/admin dashboard
- User accounts and server-side persistence
- Cohort progress tracking
- Module prerequisite locking
- Dark mode
- Service worker / offline mode
- Recording your own voice narration (architecture ready, content deferred)
