export interface ModuleData {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  duration: string;
  stepCount: number;
  color: string;
  colorLight: string;
  icon: string;
}

export const modules: ModuleData[] = [
  {
    id: 1,
    slug: "what-is-pbl",
    title: "What IS PBL?",
    subtitle: "Dessert vs. Main Course",
    duration: "~5 min",
    stepCount: 8,
    color: "var(--color-module-1)",
    colorLight: "var(--color-module-1-light)",
    icon: "💡",
  },
  {
    id: 2,
    slug: "learning-narrative",
    title: "The Learning Narrative",
    subtitle: "The 5-Phase Story",
    duration: "~7 min",
    stepCount: 10,
    color: "var(--color-module-2)",
    colorLight: "var(--color-module-2-light)",
    icon: "📖",
  },
  {
    id: 3,
    slug: "start-small",
    title: "Start Small",
    subtitle: "Try It Tomorrow",
    duration: "~3 min",
    stepCount: 6,
    color: "var(--color-module-3)",
    colorLight: "var(--color-module-3-light)",
    icon: "🌱",
  },
  {
    id: 4,
    slug: "gold-standard",
    title: "The Gold Standard",
    subtitle: "7 Elements of Quality PBL",
    duration: "~7 min",
    stepCount: 10,
    color: "var(--color-module-4)",
    colorLight: "var(--color-module-4-light)",
    icon: "⭐",
  },
  {
    id: 5,
    slug: "design-thinking",
    title: "Design Thinking 101",
    subtitle: "The Creative Engine",
    duration: "~7 min",
    stepCount: 10,
    color: "var(--color-module-5)",
    colorLight: "var(--color-module-5-light)",
    icon: "🎨",
  },
  {
    id: 6,
    slug: "alphabet-soup",
    title: "The Alphabet Soup",
    subtitle: "PBL vs. Everything Else",
    duration: "~5 min",
    stepCount: 7,
    color: "var(--color-module-6)",
    colorLight: "var(--color-module-6-light)",
    icon: "🔤",
  },
  {
    id: 7,
    slug: "pbl-and-ai",
    title: "PBL + AI",
    subtitle: "Start Human, End Human",
    duration: "~5 min",
    stepCount: 7,
    color: "var(--color-module-7)",
    colorLight: "var(--color-module-7-light)",
    icon: "🤖",
  },
];

export function getModuleBySlug(slug: string): ModuleData | undefined {
  return modules.find((m) => m.slug === slug);
}
