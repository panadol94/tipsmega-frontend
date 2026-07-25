'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const hasStartedRef = useRef(false);
  const pathname = usePathname();
  const disabled = pathname.startsWith('/trusted');

  useEffect(() => {
    if (disabled) return;

    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.3;
    audio.loop = true;
    audio.preload = 'none';
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
  }, [disabled]);

  if (disabled) return null;

  return (
    <audio
      ref={audioRef}
      src="/audio/background-music.m4a"
      loop
      preload="none"
      playsInline
      style={{ display: 'none' }}
    />
  );
}
