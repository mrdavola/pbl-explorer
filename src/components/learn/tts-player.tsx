"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Loader2 } from "lucide-react";

interface TTSPlayerProps {
  text: string;
  stepKey: string; // e.g. "what-is-pbl-step-0"
}

type PlayerState = "idle" | "loading" | "playing" | "paused" | "error";

export function TTSPlayer({ text, stepKey }: TTSPlayerProps) {
  const [state, setState] = useState<PlayerState>("idle");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const blobUrlRef = useRef<string | null>(null);

  // Clean up on unmount or step change
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
      }
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = null;
      }
    };
  }, [stepKey]);

  // Reset state when step changes
  useEffect(() => {
    setState("idle");
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current = null;
    }
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
      blobUrlRef.current = null;
    }
  }, [stepKey]);

  const getAudio = useCallback(async (): Promise<string> => {
    const cacheKey = `tts-cache-${stepKey}`;

    // Check localStorage cache
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const binary = atob(cached);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
          bytes[i] = binary.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: "audio/mpeg" });
        const url = URL.createObjectURL(blob);
        return url;
      }
    } catch {
      // Cache miss or error, proceed to fetch
    }

    // Fetch from API
    const res = await fetch("/api/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    if (!res.ok) {
      throw new Error("TTS generation failed");
    }

    const arrayBuffer = await res.arrayBuffer();
    const blob = new Blob([arrayBuffer], { type: "audio/mpeg" });

    // Cache as base64
    try {
      const bytes = new Uint8Array(arrayBuffer);
      let binary = "";
      for (let i = 0; i < bytes.length; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      const base64 = btoa(binary);
      localStorage.setItem(cacheKey, base64);
    } catch {
      // localStorage full or unavailable, continue without caching
    }

    return URL.createObjectURL(blob);
  }, [stepKey, text]);

  const handlePlay = useCallback(async () => {
    // If paused, resume
    if (state === "paused" && audioRef.current) {
      audioRef.current.play();
      setState("playing");
      return;
    }

    // If already playing, pause
    if (state === "playing" && audioRef.current) {
      audioRef.current.pause();
      setState("paused");
      return;
    }

    // Start fresh
    setState("loading");
    try {
      const url = await getAudio();
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
      }
      blobUrlRef.current = url;

      const audio = new Audio(url);
      audioRef.current = audio;

      audio.addEventListener("ended", () => {
        setState("idle");
      });

      audio.addEventListener("error", () => {
        setState("error");
        setTimeout(() => setState("idle"), 2000);
      });

      await audio.play();
      setState("playing");
    } catch {
      setState("error");
      setTimeout(() => setState("idle"), 2000);
    }
  }, [state, getAudio]);

  // Hide during error after brief display
  if (state === "error") {
    return (
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0.5 }}
        className="flex items-center justify-center w-9 h-9 rounded-full bg-red-50/70 backdrop-blur-sm shadow-sm"
      >
        <span className="text-[10px] text-red-400 font-medium">err</span>
      </motion.div>
    );
  }

  return (
    <button
      onClick={handlePlay}
      disabled={state === "loading"}
      className="flex items-center gap-1.5 h-9 rounded-full bg-white/70 backdrop-blur-sm shadow-sm press-scale hover:bg-white/90 transition-colors px-2"
      aria-label={
        state === "playing"
          ? "Pause narration"
          : state === "paused"
            ? "Resume narration"
            : "Play narration"
      }
    >
      <div className="flex items-center justify-center w-5 h-5">
        <AnimatePresence mode="wait">
          {state === "loading" ? (
            <motion.div
              key="loader"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
            >
              <Loader2 size={16} className="text-muted-foreground animate-spin" />
            </motion.div>
          ) : state === "playing" ? (
            <motion.div
              key="pause"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
            >
              <Pause size={16} className="text-muted-foreground" />
            </motion.div>
          ) : (
            <motion.div
              key="play"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
            >
              <Play size={16} className="text-muted-foreground ml-0.5" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Waveform visualization while playing */}
      <AnimatePresence>
        {state === "playing" && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-[3px] h-4 overflow-hidden"
          >
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="w-[3px] rounded-full bg-muted-foreground/60"
                animate={{
                  height: ["4px", "14px", "6px", "10px", "4px"],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
