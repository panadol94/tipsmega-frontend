'use client';

import { useEffect, useRef } from 'react';

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);

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
