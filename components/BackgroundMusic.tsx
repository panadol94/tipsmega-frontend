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
    
    // Try autoplay muted first (browser policy)
    const playAttempt = async () => {
      try {
        await audio.play();
      } catch (err) {
        console.log('Autoplay blocked');
      }
    };

    playAttempt();

    // Listen for first user interaction to unmute
    const handleInteraction = () => {
      if (hasInteractedRef.current) return;
      hasInteractedRef.current = true;
      
      if (audio) {
        audio.muted = false;
        audio.play().catch(() => {
          console.log('Play failed after interaction');
        });
      }
    };

    // Add listeners for common interaction events
    const events = ['click', 'touchstart', 'keydown'];
    events.forEach(event => {
      document.addEventListener(event, handleInteraction, { once: true });
    });

    return () => {
      events.forEach(event => {
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
