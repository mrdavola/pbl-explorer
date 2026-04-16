"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useCallback, useMemo } from "react";
import { LessonShell } from "@/components/learn/lesson-shell";
import { Celebration } from "@/components/learn/celebration";
import { modules, getModuleBySlug } from "@/lib/data/modules";
import { useProgress } from "@/lib/hooks/use-progress";

/* Step loaders per module */
import { module1Steps } from "@/lib/data/steps/module-1";
import { module2Steps } from "@/lib/data/steps/module-2";
import { module3Steps } from "@/lib/data/steps/module-3";
import { module4Steps } from "@/lib/data/steps/module-4";
import { module5Steps } from "@/lib/data/steps/module-5";
import { module6Steps } from "@/lib/data/steps/module-6";
import { module7Steps } from "@/lib/data/steps/module-7";

const stepsBySlug: Record<string, React.ComponentType<{ onNext: () => void }>[]> = {
  "what-is-pbl": module1Steps,
  "learning-narrative": module2Steps,
  "start-small": module3Steps,
  "gold-standard": module4Steps,
  "design-thinking": module5Steps,
  "alphabet-soup": module6Steps,
  "pbl-and-ai": module7Steps,
};

function getStepsForModule(slug: string) {
  return stepsBySlug[slug] || null;
}

export default function ModulePage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const mod = getModuleBySlug(slug);
  const { completeModule, addXp, setModuleStep, progress, loaded } = useProgress();

  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);

  const steps = useMemo(() => getStepsForModule(slug), [slug]);

  const handleStepChange = useCallback(
    (step: number) => {
      setCurrentStep(step);
      setModuleStep(slug, step);
    },
    [slug, setModuleStep]
  );

  const handleComplete = useCallback(() => {
    if (mod) {
      completeModule(mod.id);
      addXp(50);
      setCompleted(true);
    }
  }, [mod, completeModule, addXp]);

  if (!mod) {
    return (
      <div className="flex items-center justify-center min-h-[100dvh] text-muted-foreground">
        Module not found.
      </div>
    );
  }

  if (!steps) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[100dvh] gap-4 px-6 text-center">
        <div className="text-5xl">{mod.icon}</div>
        <h1 className="text-2xl font-bold">{mod.title}</h1>
        <p className="text-muted-foreground">This module is coming soon!</p>
        <button
          onClick={() => router.push("/")}
          className="mt-4 px-6 py-3 rounded-2xl font-semibold text-white press-scale"
          style={{ backgroundColor: mod.color }}
        >
          Back to Home
        </button>
      </div>
    );
  }

  if (completed) {
    const currentIndex = modules.findIndex((m) => m.slug === slug);
    const nextModule = modules[currentIndex + 1];
    return (
      <Celebration
        moduleTitle={mod.title}
        moduleColor={mod.color}
        moduleIcon={mod.icon}
        xpEarned={50}
        nextModuleSlug={nextModule?.slug}
        nextModuleTitle={nextModule?.title}
      />
    );
  }

  const StepComponent = steps[currentStep];

  return (
    <LessonShell
      moduleTitle={mod.title}
      moduleColor={mod.color}
      totalSteps={steps.length}
      currentStep={currentStep}
      onStepChange={handleStepChange}
      onComplete={handleComplete}
    >
      <StepComponent
        onNext={() => {
          if (currentStep < steps.length - 1) {
            handleStepChange(currentStep + 1);
          } else {
            handleComplete();
          }
        }}
      />
    </LessonShell>
  );
}
