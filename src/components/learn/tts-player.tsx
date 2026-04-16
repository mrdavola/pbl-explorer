"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Loader2 } from "lucide-react";

interface TTSPlayerProps {
  text: string;
  stepKey: string; // e.g. "what-is-pbl-step-0"
}

type PlayerState = "idle" | "loading" | "playing" | "paused" | "error";
type TTSMode = "elevenlabs" | "browser";

export function TTSPlayer({ text, stepKey }: TTSPlayerProps) {
  const [state, setState] = useState<PlayerState>("idle");
  const [mode, setMode] = useState<TTSMode>("elevenlabs");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const blobUrlRef = useRef<string | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

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
      if (typeof window !== "undefined" && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      utteranceRef.current = null;
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
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    utteranceRef.current = null;
  }, [stepKey]);

  // Try ElevenLabs, return blob URL on success
  const tryElevenLabs = useCallback(async (): Promise<string | null> => {
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
        return URL.createObjectURL(blob);
      }
    } catch {
      // Cache miss
    }

    // Fetch from API
    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        console.warn("TTS API failed:", res.status, errData);
        return null;
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
        localStorage.setItem(cacheKey, btoa(binary));
      } catch {
        // localStorage full, continue
      }

      return URL.createObjectURL(blob);
    } catch {
      return null;
    }
  }, [stepKey, text]);

  // Browser Speech Synthesis fallback
  const playBrowserTTS = useCallback(() => {
    if (!window.speechSynthesis) return false;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1;

    // Prefer a natural-sounding English voice
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find(
      (v) =>
        v.lang.startsWith("en") &&
        (v.name.includes("Microsoft") ||
          v.name.includes("Google") ||
          v.name.includes("Samantha") ||
          v.name.includes("Daniel"))
    ) || voices.find((v) => v.lang.startsWith("en") && v.localService);

    if (preferred) utterance.voice = preferred;

    utterance.onend = () => setState("idle");
    utterance.onerror = () => {
      setState("error");
      setTimeout(() => setState("idle"), 2000);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    return true;
  }, [text]);

  const handlePlay = useCallback(async () => {
    // If paused with browser TTS, resume
    if (state === "paused" && mode === "browser") {
      window.speechSynthesis?.resume();
      setState("playing");
      return;
    }

    // If paused with audio element, resume
    if (state === "paused" && audioRef.current) {
      audioRef.current.play();
      setState("playing");
      return;
    }

    // If playing, pause
    if (state === "playing") {
      if (mode === "browser") {
        window.speechSynthesis?.pause();
      } else if (audioRef.current) {
        audioRef.current.pause();
      }
      setState("paused");
      return;
    }

    // Start fresh
    setState("loading");

    // Try ElevenLabs first
    const url = await tryElevenLabs();

    if (url) {
      // ElevenLabs succeeded
      setMode("elevenlabs");
      if (blobUrlRef.current) URL.revokeObjectURL(blobUrlRef.current);
      blobUrlRef.current = url;

      const audio = new Audio(url);
      audioRef.current = audio;
      audio.addEventListener("ended", () => setState("idle"));
      audio.addEventListener("error", () => {
        setState("error");
        setTimeout(() => setState("idle"), 2000);
      });

      try {
        await audio.play();
        setState("playing");
      } catch {
        setState("error");
        setTimeout(() => setState("idle"), 2000);
      }
    } else {
      // Fallback to browser Speech Synthesis
      setMode("browser");
      const ok = playBrowserTTS();
      if (ok) {
        setState("playing");
      } else {
        setState("error");
        setTimeout(() => setState("idle"), 2000);
      }
    }
  }, [state, mode, tryElevenLabs, playBrowserTTS]);

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
