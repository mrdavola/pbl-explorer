"use client";

import { useState, useEffect, useCallback } from "react";

interface ProgressState {
  completedModules: number[];
  currentStep: Record<string, number>; // slug -> step index
  xp: number;
  streak: number;
  lastSessionDate: string | null;
}

const STORAGE_KEY = "pbl-explorer-progress";

const defaultState: ProgressState = {
  completedModules: [],
  currentStep: {},
  xp: 0,
  streak: 0,
  lastSessionDate: null,
};

function loadProgress(): ProgressState {
  if (typeof window === "undefined") return defaultState;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultState;
    return { ...defaultState, ...JSON.parse(stored) };
  } catch {
    return defaultState;
  }
}

function saveProgress(state: ProgressState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function getToday(): string {
  return new Date().toISOString().split("T")[0];
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressState>(defaultState);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const state = loadProgress();
    const today = getToday();

    // Update streak
    if (state.lastSessionDate) {
      const last = new Date(state.lastSessionDate);
      const now = new Date(today);
      const diffDays = Math.floor(
        (now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24)
      );
      if (diffDays > 1) {
        state.streak = 1; // Reset streak if more than 1 day gap
      } else if (diffDays === 1) {
        state.streak += 1; // Increment if consecutive day
      }
      // If same day, keep streak as-is
    } else {
      state.streak = 1;
    }
    state.lastSessionDate = today;
    saveProgress(state);
    setProgress(state);
    setLoaded(true);
  }, []);

  const completeModule = useCallback((moduleId: number) => {
    setProgress((prev) => {
      if (prev.completedModules.includes(moduleId)) return prev;
      const next = {
        ...prev,
        completedModules: [...prev.completedModules, moduleId],
        xp: prev.xp + 50,
      };
      saveProgress(next);
      return next;
    });
  }, []);

  const setModuleStep = useCallback((slug: string, step: number) => {
    setProgress((prev) => {
      const next = {
        ...prev,
        currentStep: { ...prev.currentStep, [slug]: step },
      };
      saveProgress(next);
      return next;
    });
  }, []);

  const addXp = useCallback((amount: number) => {
    setProgress((prev) => {
      const next = { ...prev, xp: prev.xp + amount };
      saveProgress(next);
      return next;
    });
  }, []);

  const isModuleComplete = useCallback(
    (moduleId: number) => progress.completedModules.includes(moduleId),
    [progress.completedModules]
  );

  const completedCount = progress.completedModules.length;

  return {
    progress,
    loaded,
    completeModule,
    setModuleStep,
    addXp,
    isModuleComplete,
    completedCount,
  };
}
