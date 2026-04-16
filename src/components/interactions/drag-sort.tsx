"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSoundEffects } from "@/lib/hooks/use-sound-effects";

interface DragSortItem {
  id: string;
  label: string;
  correctZone: string;
  wrongFeedback?: string;
}

interface DragSortProps {
  items: DragSortItem[];
  zones: { id: string; label: string; color: string }[];
  onComplete: () => void;
  moduleColor?: string;
}

export function DragSort({
  items: initialItems,
  zones,
  onComplete,
  moduleColor = "oklch(0.45 0.15 15)",
}: DragSortProps) {
  const [placed, setPlaced] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<Record<string, "correct" | "wrong">>({});
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [wrongMessage, setWrongMessage] = useState<string | null>(null);
  const { play } = useSoundEffects();
  const allPlaced = Object.keys(placed).length === initialItems.length;
  const allCorrect = allPlaced && Object.values(feedback).every((f) => f === "correct");

  const unplacedItems = initialItems.filter((item) => !placed[item.id]);

  const handlePlace = useCallback(
    (itemId: string, zoneId: string) => {
      const item = initialItems.find((i) => i.id === itemId);
      if (!item) return;

      const isCorrect = item.correctZone === zoneId;
      play(isCorrect ? 'correct' : 'incorrect');
      setPlaced((prev) => ({ ...prev, [itemId]: zoneId }));
      setFeedback((prev) => ({
        ...prev,
        [itemId]: isCorrect ? "correct" : "wrong",
      }));
      setActiveItem(null);

      // If wrong, show feedback and remove after a delay so they can retry
      if (!isCorrect) {
        const correctZone = zones.find((z) => z.id === item.correctZone);
        setWrongMessage(
          item.wrongFeedback ||
            `That belongs in "${correctZone?.label ?? item.correctZone}." Try again!`
        );
        setTimeout(() => {
          setPlaced((prev) => {
            const next = { ...prev };
            delete next[itemId];
            return next;
          });
          setFeedback((prev) => {
            const next = { ...prev };
            delete next[itemId];
            return next;
          });
          setWrongMessage(null);
        }, 2400);
      }
    },
    [initialItems, zones, play]
  );

  const handleReset = useCallback(() => {
    setPlaced({});
    setFeedback({});
    setActiveItem(null);
  }, []);

  return (
    <div className="flex flex-col flex-1">
      {/* Unplaced items */}
      <div className="mb-6">
        <p className="text-base font-medium text-muted-foreground mb-3">
          Tap an item, then tap where it belongs:
        </p>
        <div className="flex flex-wrap gap-2">
          <AnimatePresence>
            {unplacedItems.map((item) => (
              <motion.button
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                onClick={() => setActiveItem(activeItem === item.id ? null : item.id)}
                className={cn(
                  "px-4 py-3 rounded-xl text-base font-medium border-2 transition-all press-scale",
                  activeItem === item.id
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-border bg-card hover:border-primary/30"
                )}
              >
                {item.label}
              </motion.button>
            ))}
          </AnimatePresence>
          {unplacedItems.length === 0 && !allCorrect && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Drop zones */}
      <div className="grid gap-3">
        {zones.map((zone) => {
          const zoneItems = initialItems.filter(
            (item) => placed[item.id] === zone.id
          );
          return (
            <motion.button
              key={zone.id}
              onClick={() => {
                if (activeItem) handlePlace(activeItem, zone.id);
              }}
              disabled={!activeItem}
              className={cn(
                "w-full text-left rounded-2xl border-2 border-dashed p-4 min-h-[72px] transition-all",
                activeItem
                  ? "border-primary/40 cursor-pointer hover:border-primary hover:bg-primary/5"
                  : "border-border/60 cursor-default"
              )}
            >
              <p
                className="text-base font-bold mb-2"
                style={{ color: zone.color }}
              >
                {zone.label}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {zoneItems.map((item) => (
                  <motion.span
                    key={item.id}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={cn(
                      "inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium",
                      feedback[item.id] === "correct"
                        ? "bg-success-light text-[oklch(0.30_0.08_155)]"
                        : "bg-error-light text-[oklch(0.30_0.08_25)] shake"
                    )}
                  >
                    {feedback[item.id] === "correct" && (
                      <Check className="w-3 h-3" />
                    )}
                    {item.label}
                  </motion.span>
                ))}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Wrong answer feedback */}
      <AnimatePresence>
        {wrongMessage && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="mt-3 rounded-xl bg-error-light px-4 py-3 text-base text-[oklch(0.30_0.08_25)]"
          >
            <span className="font-semibold">Not quite!</span> {wrongMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Complete */}
      {allCorrect && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-auto pt-6 pb-4"
        >
          <div className="text-center mb-4">
            <p className="text-success font-semibold text-lg">All correct! Well done.</p>
          </div>
          <button
            onClick={onComplete}
            className="w-full py-4 px-6 rounded-2xl font-semibold text-lg text-white shadow-sm press-scale hover:shadow-md transition-shadow"
            style={{ backgroundColor: moduleColor }}
          >
            Continue
          </button>
        </motion.div>
      )}
    </div>
  );
}
