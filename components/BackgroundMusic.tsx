'use client';

import { useEffect, useRef } from 'react';

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const hasInteractedRef = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.3;
    audio.loop = true;

    const playAttempt = async (unmute = false) => {
      if (unmute) {
        audio.muted = false;
      }
      try {
        await audio.play();
      } catch {
        console.log(unmute ? 'Play failed after interaction' : 'Autoplay blocked, waiting for interaction');
      }
    };

    // Delay to ensure hydration is complete
    const timer = setTimeout(() => {
      playAttempt(false);
    }, 100);

    const handleInteraction = () => {
      if (hasInteractedRef.current) return;
      hasInteractedRef.current = true;
      playAttempt(true);
    };

    const events = ['click', 'touchstart', 'keydown'];
    events.forEach((event) => {
      document.addEventListener(event, handleInteraction, { once: true });
    });

    return () => {
      clearTimeout(timer);
      events.forEach((event) => {
        document.removeEventListener(event, handleInteraction);
      });
    };
  }, []);

  return (
    <audio
      ref={audioRef}
      src="/audio/background-music.m4a"
      loop
      muted
      preload="auto"
      style={{ display: 'none' }}
    />
  );
}
