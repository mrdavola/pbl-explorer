"use client";

import { useState, useEffect, useCallback } from "react";

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
  reflections?: Record<string, string>;
}

const STORAGE_KEY = "pbl-explorer-plan";

function loadPlan(): PBLPlan {
  if (typeof window === "undefined") return {};
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return {};
    return JSON.parse(stored);
  } catch {
    return {};
  }
}

function savePlan(plan: PBLPlan) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
}

export function usePlanBuilder() {
  const [plan, setPlan] = useState<PBLPlan>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const state = loadPlan();
    setPlan(state);
    setLoaded(true);
  }, []);

  const updatePlan = useCallback((updates: Partial<PBLPlan>) => {
    setPlan((prev) => {
      const next = { ...prev, ...updates };
      savePlan(next);
      return next;
    });
  }, []);

  const setReflection = useCallback((slug: string, text: string) => {
    setPlan((prev) => {
      const next = {
        ...prev,
        reflections: { ...prev.reflections, [slug]: text },
      };
      savePlan(next);
      return next;
    });
  }, []);

  const hasPlanData = Object.keys(plan).some((k) => {
    const val = plan[k as keyof PBLPlan];
    if (Array.isArray(val)) return val.length > 0;
    if (typeof val === "object" && val !== null)
      return Object.keys(val).length > 0;
    return val !== undefined && val !== "";
  });

  return { plan, loaded, updatePlan, setReflection, hasPlanData };
}
