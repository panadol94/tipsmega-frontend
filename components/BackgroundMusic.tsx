'use client';

import { useEffect, useRef } from 'react';

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.3;
    audio.loop = true;
    audio.preload = 'auto';
    audio.setAttribute('playsinline', 'true');

    const startPlayback = async () => {
      if (hasStartedRef.current) return;
      hasStartedRef.current = true;

      try {
        audio.pause();
        audio.currentTime = 0;
        audio.muted = false;
        await audio.play();
      } catch {
        hasStartedRef.current = false;
        console.log('Background music play failed after user interaction');
      }
    };

    const handleInteraction = () => {
      startPlayback();
    };

    const events = ['pointerdown', 'touchstart', 'click', 'keydown'];
    events.forEach((event) => {
      document.addEventListener(event, handleInteraction, { passive: true });
    });

    return () => {
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
      preload="auto"
      playsInline
      style={{ display: 'none' }}
    />
  );
}
