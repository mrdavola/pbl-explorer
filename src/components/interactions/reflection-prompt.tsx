"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ContinueButton } from "@/components/learn/lesson-shell";

interface ReflectionPromptProps {
  question: string;
  placeholder?: string;
  storageKey: string;
  onComplete: () => void;
  moduleColor?: string;
  saveToPlan?: { slug: string; field: string };
  onTextChange?: (text: string) => void;
}

const SOFT_MAX = 500;

export function ReflectionPrompt({
  question,
  placeholder = "Share your thoughts...",
  storageKey,
  onComplete,
  moduleColor = "oklch(0.45 0.15 15)",
  onTextChange,
}: ReflectionPromptProps) {
  const fullKey = `pbl-reflection-${storageKey}`;
  const [text, setText] = useState("");
  const [showSaved, setShowSaved] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const savedTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const initializedRef = useRef(false);

  // Load from localStorage on mount
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;
    try {
      const stored = localStorage.getItem(fullKey);
      if (stored) {
        setText(stored);
        onTextChange?.(stored);
      }
    } catch {
      // localStorage unavailable
    }
  }, [fullKey, onTextChange]);

  const saveToStorage = useCallback(
    (value: string) => {
      try {
        localStorage.setItem(fullKey, value);
      } catch {
        // localStorage unavailable
      }
      // Show "Saved" indicator
      setShowSaved(true);
      if (savedTimeoutRef.current) clearTimeout(savedTimeoutRef.current);
      savedTimeoutRef.current = setTimeout(() => setShowSaved(false), 1500);
    },
    [fullKey]
  );

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value;
    setText(value);
    onTextChange?.(value);

    // Debounced save
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => saveToStorage(value), 500);
  }

  // Cleanup timeouts
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (savedTimeoutRef.current) clearTimeout(savedTimeoutRef.current);
    };
  }, []);

  return (
    <div className="flex flex-col flex-1 pb-28">
      {/* Question */}
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold leading-snug text-balance">
          {question}
        </h2>
        <p className="text-base text-muted-foreground mt-2">
          This reflection is optional but encouraged. Your response is saved
          locally on this device.
        </p>
      </div>

      {/* Textarea */}
      <div className="relative mb-2">
        <textarea
          value={text}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full min-h-[150px] p-4 rounded-xl border border-gray-200 bg-white text-base leading-relaxed resize-y focus:outline-none focus:ring-2 transition-shadow"
          style={{
            fontSize: "16px", // Prevent iOS zoom
            // @ts-expect-error -- CSS custom property for focus ring
            "--tw-ring-color": moduleColor,
          }}
        />
      </div>

      {/* Footer row: saved indicator + character count */}
      <div className="flex items-center justify-between px-1 min-h-[1.5rem]">
        <AnimatePresence>
          {showSaved && (
            <motion.span
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25 }}
              className="text-xs font-medium"
              style={{ color: moduleColor }}
            >
              Saved
            </motion.span>
          )}
        </AnimatePresence>
        <span
          className={`text-xs tabular-nums ml-auto ${
            text.length > SOFT_MAX
              ? "text-amber-500"
              : "text-muted-foreground"
          }`}
        >
          {text.length} / {SOFT_MAX}
        </span>
      </div>

      {/* Continue button */}
      <ContinueButton onClick={onComplete} moduleColor={moduleColor} />
    </div>
  );
}
