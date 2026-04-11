'use client';

import { useEffect, useRef, useState } from 'react';

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const hasInteractedRef = useRef(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.3;
    audio.loop = true;
    
    // Delay to ensure hydration is complete
    const timer = setTimeout(() => {
      const playAttempt = async () => {
        try {
          await audio.play();
        } catch (err) {
          console.log('Autoplay blocked, waiting for interaction');
        }
      };
      playAttempt();
    }, 100);

    return () => clearTimeout(timer);

    // Listen for first user interaction to unmute
    const handleInteraction = () => {
      if (hasInteractedRef.current) return;
      hasInteractedRef.current = true;
      
      if (audioRef.current) {
        audioRef.current.muted = false;
        audioRef.current.play().catch(() => {
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
  }, [isMounted]);

  // Don't render on server
  if (!isMounted) return null;

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
