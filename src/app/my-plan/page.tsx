"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Home, Printer, BookOpen, CheckCircle2 } from "lucide-react";
import { usePlanBuilder } from "@/lib/hooks/use-plan-builder";
import { modules } from "@/lib/data/modules";

/** Map module id (1-7) to which plan fields belong to it */
const sectionConfig: {
  moduleId: number;
  label: string;
  render: (plan: ReturnType<typeof usePlanBuilder>["plan"]) => React.ReactNode | null;
  isEmpty: (plan: ReturnType<typeof usePlanBuilder>["plan"]) => boolean;
}[] = [
  {
    moduleId: 1,
    label: "Subject & Grade Level",
    isEmpty: (p) => !p.subject && !p.gradeLevel,
    render: (p) => (
      <div className="space-y-1">
        {p.subject && (
          <p>
            <span className="font-medium">Subject:</span> {p.subject}
          </p>
        )}
        {p.gradeLevel && (
          <p>
            <span className="font-medium">Grade Level:</span> {p.gradeLevel}
          </p>
        )}
      </div>
    ),
  },
  {
    moduleId: 2,
    label: "Driving Question",
    isEmpty: (p) => !p.drivingQuestion,
    render: (p) => (
      <p className="italic text-lg leading-relaxed">&ldquo;{p.drivingQuestion}&rdquo;</p>
    ),
  },
  {
    moduleId: 3,
    label: "Project Scale",
    isEmpty: (p) => !p.projectScale,
    render: (p) => <p>{p.projectScale}</p>,
  },
  {
    moduleId: 4,
    label: "Priority Elements",
    isEmpty: (p) => !p.priorityElements || p.priorityElements.length === 0,
    render: (p) => (
      <ul className="space-y-1">
        {p.priorityElements?.map((el) => (
          <li key={el} className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 opacity-70" />
            <span>{el}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    moduleId: 5,
    label: "Problem Statement & Design Entry",
    isEmpty: (p) => !p.problemStatement && !p.dtEntryPoint,
    render: (p) => (
      <div className="space-y-1">
        {p.problemStatement && (
          <p>
            <span className="font-medium">Problem Statement:</span> {p.problemStatement}
          </p>
        )}
        {p.dtEntryPoint && (
          <p>
            <span className="font-medium">Design Thinking Entry Point:</span> {p.dtEntryPoint}
          </p>
        )}
      </div>
    ),
  },
  {
    moduleId: 6,
    label: "Approach Type",
    isEmpty: (p) => !p.approachType,
    render: (p) => <p>{p.approachType}</p>,
  },
  {
    moduleId: 7,
    label: "AI Integration",
    isEmpty: (p) => !p.aiIntegrationPoints || p.aiIntegrationPoints.length === 0,
    render: (p) => (
      <ul className="space-y-1">
        {p.aiIntegrationPoints?.map((pt) => (
          <li key={pt} className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 opacity-70" />
            <span>{pt}</span>
          </li>
        ))}
      </ul>
    ),
  },
];

export default function MyPlanPage() {
  const { plan, loaded } = usePlanBuilder();

  if (!loaded) {
    return (
      <div className="flex items-center justify-center min-h-[100dvh]">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const reflectionEntries = plan.reflections
    ? Object.entries(plan.reflections).filter(([, v]) => v && v.trim().length > 0)
    : [];

  return (
    <div className="min-h-[100dvh] bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border/50 print:hidden">
        <div className="flex items-center justify-between px-5 py-3 max-w-2xl mx-auto">
          <Link
            href="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Home className="w-4 h-4" />
            <span className="text-sm">Home</span>
          </Link>
          <h1 className="text-lg font-bold font-[family-name:var(--font-display)] tracking-tight">
            My PBL Plan
          </h1>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span className="hidden sm:inline">Print</span>
          </button>
        </div>
      </header>

      {/* Print-only header */}
      <div className="hidden print:block px-5 pt-8 pb-4 max-w-2xl mx-auto border-b border-border">
        <h1 className="text-2xl font-bold font-[family-name:var(--font-display)]">
          My First PBL Unit
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Generated from PBL Explorer</p>
      </div>

      {/* Content */}
      <main className="px-5 py-6 max-w-2xl mx-auto space-y-4">
        {sectionConfig.map((section, i) => {
          const mod = modules.find((m) => m.id === section.moduleId)!;
          const empty = section.isEmpty(plan);

          return (
            <motion.div
              key={section.moduleId}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              className="rounded-xl border border-border bg-card p-5 print:break-inside-avoid"
              style={
                !empty
                  ? { borderLeftWidth: 4, borderLeftColor: mod.color }
                  : undefined
              }
            >
              <div className="flex items-center gap-2 mb-2">
                <mod.icon
                  className="w-4 h-4 shrink-0"
                  style={{ color: mod.color }}
                />
                <h2 className="text-sm font-semibold uppercase tracking-wide" style={{ color: mod.color }}>
                  {section.label}
                </h2>
              </div>

              {empty ? (
                <div className="text-muted-foreground text-sm">
                  <span>Complete </span>
                  <Link
                    href={`/learn/${mod.slug}`}
                    className="underline hover:text-foreground transition-colors print:no-underline"
                  >
                    Module {mod.id}: {mod.title}
                  </Link>
                  <span> to fill this in.</span>
                </div>
              ) : (
                <div className="text-foreground text-sm leading-relaxed">
                  {section.render(plan)}
                </div>
              )}
            </motion.div>
          );
        })}

        {/* Reflections */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: sectionConfig.length * 0.06 }}
          className="rounded-xl border border-border bg-card p-5 print:break-inside-avoid"
        >
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-4 h-4 shrink-0 text-primary" />
            <h2 className="text-sm font-semibold uppercase tracking-wide text-primary">
              My Reflections
            </h2>
          </div>

          {reflectionEntries.length === 0 ? (
            <p className="text-muted-foreground text-sm">
              Your reflections from each module will appear here as you complete them.
            </p>
          ) : (
            <div className="space-y-3">
              {reflectionEntries.map(([slug, text]) => {
                const mod = modules.find((m) => m.slug === slug);
                return (
                  <div key={slug} className="text-sm">
                    <p className="font-medium text-muted-foreground mb-0.5">
                      {mod ? `Module ${mod.id}: ${mod.title}` : slug}
                    </p>
                    <p className="text-foreground leading-relaxed">{text}</p>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>

        <div className="h-12 print:hidden" />
      </main>

      {/* Print styles */}
      <style jsx global>{`
        @media print {
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:block {
            display: block !important;
          }
          .print\\:break-inside-avoid {
            break-inside: avoid;
          }
          .print\\:no-underline {
            text-decoration: none;
          }
        }
      `}</style>
    </div>
  );
}
