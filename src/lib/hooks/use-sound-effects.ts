'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

type SoundName = 'correct' | 'incorrect' | 'click' | 'step-complete' | 'celebration';

const SOUND_PATHS: Record<SoundName, string> = {
  correct: '/sounds/correct.mp3',
  incorrect: '/sounds/incorrect.mp3',
  click: '/sounds/click.mp3',
  'step-complete': '/sounds/step-complete.mp3',
  celebration: '/sounds/celebration.mp3',
};

const STORAGE_KEY = 'pbl-explorer-sound-enabled';

export function useSoundEffects() {
  const [enabled, setEnabled] = useState(true);
  const audioCache = useRef<Record<string, HTMLAudioElement>>({});

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== null) setEnabled(stored === 'true');
  }, []);

  const toggleSound = useCallback(() => {
    setEnabled(prev => {
      const next = !prev;
      localStorage.setItem(STORAGE_KEY, String(next));
      return next;
    });
  }, []);

  const play = useCallback((name: SoundName) => {
    if (!enabled) return;
    const path = SOUND_PATHS[name];
    if (!audioCache.current[path]) {
      audioCache.current[path] = new Audio(path);
    }
    const audio = audioCache.current[path];
    audio.currentTime = 0;
    audio.play().catch(() => {}); // ignore autoplay restrictions
  }, [enabled]);

  return { enabled, toggleSound, play };
}
