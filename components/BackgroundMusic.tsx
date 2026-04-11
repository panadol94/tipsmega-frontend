'use client';

import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Try to autoplay muted (browser policy)
    audio.volume = 0.5;
    audio.loop = true;
    
    const playAttempt = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (err) {
        // Autoplay blocked, wait for user interaction
        console.log('Autoplay blocked, waiting for user interaction');
      }
    };

    playAttempt();

    // Resume on first user interaction
    const handleInteraction = () => {
      if (audio.paused && !isPlaying) {
        audio.play().then(() => setIsPlaying(true));
      }
    };

    document.addEventListener('click', handleInteraction, { once: true });
    
    return () => {
      document.removeEventListener('click', handleInteraction);
    };
  }, []);

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    if (isMuted) {
      audio.muted = false;
      setIsMuted(false);
      if (audio.paused) {
        audio.play().then(() => setIsPlaying(true));
      }
    } else {
      audio.muted = true;
      setIsMuted(true);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/background-music.m4a"
        loop
        muted
        preload="auto"
      />
      <button
        onClick={toggleMute}
        className="fixed bottom-4 right-4 z-50 flex items-center gap-2 px-4 py-2 bg-black/80 backdrop-blur-sm border border-amber-500/30 rounded-full text-amber-400 hover:bg-black/90 hover:border-amber-500/50 transition-all duration-300 shadow-lg"
        aria-label={isMuted ? 'Unmute background music' : 'Mute background music'}
      >
        {isMuted ? (
          <>
            <VolumeX className="w-4 h-4" />
            <span className="text-xs font-medium">Music Off</span>
          </>
        ) : (
          <>
            <Volume2 className="w-4 h-4" />
            <span className="text-xs font-medium">Music On</span>
          </>
        )}
      </button>
    </>
  );
}
