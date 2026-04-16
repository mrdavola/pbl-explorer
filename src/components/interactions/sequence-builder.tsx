"use client";

import { useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSoundEffects } from "@/lib/hooks/use-sound-effects";
import { ContinueButton } from "@/components/learn/lesson-shell";

interface SequenceItem {
  id: string;
  label: string;
  description?: string;
  correctPosition: number;
}

interface SequenceBuilderProps {
  items: SequenceItem[];
  instruction?: string;
  onComplete: () => void;
  moduleColor?: string;
}

/** Fisher-Yates shuffle that guarantees a different order from the sorted input */
function shuffleAwayFromCorrect(items: SequenceItem[]): SequenceItem[] {
  const sorted = [...items].sort((a, b) => a.correctPosition - b.correctPosition);
  let shuffled = [...sorted];
  // Keep shuffling until at least one item is out of its correct position
  let attempts = 0;
  do {
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    attempts++;
  } while (
    attempts < 20 &&
    shuffled.every((item, idx) => item.id === sorted[idx].id)
  );
  return shuffled;
}

export function SequenceBuilder({
  items: rawItems,
  instruction,
  onComplete,
  moduleColor = "oklch(0.45 0.15 15)",
}: SequenceBuilderProps) {
  const { play } = useSoundEffects();

  // Shuffle once on mount
  const shuffledItems = useMemo(() => shuffleAwayFromCorrect(rawItems), [rawItems]);

  // Map from slot position (1-indexed) to the placed item id
  const [slotMap, setSlotMap] = useState<Record<number, string>>({});
  // Set of item ids that are locked (correctly placed)
  const [lockedIds, setLockedIds] = useState<Set<string>>(new Set());
  // Currently selected (tapped) unplaced item id
  const [selectedId, setSelectedId] = useState<string | null>(null);
  // Slot currently showing shake animation
  const [shakingSlot, setShakingSlot] = useState<number | null>(null);

  // Sorted slot positions
  const slotPositions = useMemo(
    () => rawItems.map((item) => item.correctPosition).sort((a, b) => a - b),
    [rawItems]
  );

  // Items that haven't been locked into a slot yet
  const unplacedItems = shuffledItems.filter((item) => !lockedIds.has(item.id));

  const allCorrect = lockedIds.size === rawItems.length;

  const handleSlotTap = useCallback(
    (position: number) => {
      if (!selectedId) return;
      // Don't allow placing into an already-locked slot
      if (slotMap[position] && lockedIds.has(slotMap[position])) return;

      const item = rawItems.find((i) => i.id === selectedId);
      if (!item) return;

      const isCorrect = item.correctPosition === position;

      if (isCorrect) {
        play("correct");
        setSlotMap((prev) => ({ ...prev, [position]: selectedId }));
        setLockedIds((prev) => new Set(prev).add(selectedId));
        setSelectedId(null);
      } else {
        play("incorrect");
        // Briefly place the item in the slot to show shake, then remove
        setSlotMap((prev) => ({ ...prev, [position]: selectedId }));
        setShakingSlot(position);
        setSelectedId(null);

        setTimeout(() => {
          setSlotMap((prev) => {
            const next = { ...prev };
            // Only remove if the item in this slot is still the wrong one
            if (next[position] === selectedId) {
              delete next[position];
            }
            return next;
          });
          setShakingSlot(null);
        }, 1200);
      }
    },
    [selectedId, rawItems, lockedIds, slotMap, play]
  );

  return (
    <div className="flex flex-col flex-1 pb-24">
      {/* Instruction */}
      <p className="text-sm font-medium text-muted-foreground mb-4">
        {instruction || "Tap an item, then tap a slot to place it in order:"}
      </p>

      {/* Unplaced items pool */}
      <div className="mb-6">
        <div className="flex flex-col gap-2">
          <AnimatePresence mode="popLayout">
            {unplacedItems.map((item, idx) => {
              const isSelected = selectedId === item.id;
              // Don't render items that are temporarily in a wrong slot (shaking)
              const isInShakingSlot = Object.values(slotMap).includes(item.id) && !lockedIds.has(item.id);
              if (isInShakingSlot) return null;

              return (
                <motion.button
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0, transition: { delay: idx * 0.06 } }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  onClick={() =>
                    setSelectedId(isSelected ? null : item.id)
                  }
                  className={cn(
                    "w-full text-left px-4 py-3 rounded-xl text-sm font-medium border-2 transition-all press-scale min-h-[48px]",
                    isSelected
                      ? "bg-primary/5 shadow-sm"
                      : "border-border bg-card hover:border-primary/30"
                  )}
                  style={
                    isSelected
                      ? { borderColor: moduleColor }
                      : undefined
                  }
                >
                  <span>{item.label}</span>
                  {item.description && (
                    <span className="block text-xs text-muted-foreground mt-0.5">
                      {item.description}
                    </span>
                  )}
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Numbered slots */}
      <div className="flex flex-col gap-3">
        {slotPositions.map((position) => {
          const placedItemId = slotMap[position];
          const placedItem = placedItemId
            ? rawItems.find((i) => i.id === placedItemId)
            : null;
          const isLocked = placedItemId ? lockedIds.has(placedItemId) : false;
          const isShaking = shakingSlot === position;
          const isEmpty = !placedItem;

          return (
            <motion.button
              key={position}
              onClick={() => handleSlotTap(position)}
              disabled={isLocked || !selectedId}
              className={cn(
                "w-full text-left rounded-2xl border-2 border-dashed p-4 min-h-[56px] transition-all flex items-center gap-3",
                isLocked
                  ? "border-solid bg-success-light border-[oklch(0.55_0.15_155)]"
                  : isShaking
                    ? "border-solid border-[oklch(0.55_0.15_25)] bg-error-light shake"
                    : selectedId
                      ? "border-primary/40 cursor-pointer hover:border-primary hover:bg-primary/5"
                      : "border-border/60 cursor-default"
              )}
            >
              {/* Slot number */}
              <span
                className={cn(
                  "flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold",
                  isLocked
                    ? "bg-[oklch(0.55_0.15_155)] text-white"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {isLocked ? (
                  <Check className="w-3.5 h-3.5" />
                ) : (
                  position
                )}
              </span>

              {/* Slot content */}
              {placedItem ? (
                <motion.span
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={cn(
                    "text-sm font-medium",
                    isLocked
                      ? "text-[oklch(0.30_0.08_155)]"
                      : "text-[oklch(0.30_0.08_25)]"
                  )}
                >
                  {placedItem.label}
                </motion.span>
              ) : (
                <span className="text-sm text-muted-foreground/50">
                  Step {position}
                </span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Completion */}
      {allCorrect && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 text-center"
        >
          <p className="text-success font-semibold">
            Perfect sequence! Well done.
          </p>
        </motion.div>
      )}

      {allCorrect && (
        <ContinueButton onClick={onComplete} moduleColor={moduleColor} />
      )}
    </div>
  );
}
