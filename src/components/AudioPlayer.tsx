import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

interface AudioPlayerProps {
  isPlaying: boolean;
  onToggle: () => void;
  audioUrl?: string;
  songTitle?: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  isPlaying,
  onToggle,
  audioUrl,
  songTitle = 'Alunan Kasmaran Tradisional Jawa',
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (!audioRef.current && audioUrl) {
      const audio = new Audio(audioUrl);
      audio.loop = true;
      audio.volume = 0.65;
      audioRef.current = audio;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [audioUrl]);

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current
        .play()
        .then(() => {
          setHasInteracted(true);
        })
        .catch(() => {
          // Autoplay blocked by browser policy until user click, which is expected
        });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <div className="fixed top-5 right-5 z-40 flex items-center gap-2">
      {/* Song title badge on hover / active */}
      <div
        className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1e150ee0] border border-[#d4af37]/40 text-xs text-[#eedbb4] backdrop-blur-md transition-all duration-300 shadow-lg ${
          showTooltip || isPlaying ? 'opacity-90 translate-x-0' : 'opacity-0 translate-x-3 pointer-events-none'
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-ping" />
        <span className="max-w-[150px] truncate">{songTitle}</span>
      </div>

      {/* Floating Rotating Disc Button */}
      <button
        onClick={onToggle}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`relative w-12 h-12 rounded-full flex items-center justify-center border-2 shadow-xl transition-transform duration-300 active:scale-95 cursor-pointer backdrop-blur-md ${
          isPlaying
            ? 'bg-[#2b1d12]/90 border-[#d4af37] text-[#d4af37] gold-glow-sm'
            : 'bg-[#1b120c]/80 border-[#8a703d]/50 text-[#8a703d]'
        }`}
        aria-label={isPlaying ? 'Jeda Musik Latar' : 'Putar Musik Latar'}
        title={isPlaying ? 'Jeda Musik' : 'Putar Musik'}
      >
        {/* Vinyl disc rings */}
        <div
          className={`absolute inset-1 rounded-full border border-dashed border-[#d4af37]/30 ${
            isPlaying ? 'animate-spin-slow' : ''
          }`}
        />
        <div className="relative z-10">
          {isPlaying ? (
            <Volume2 className="w-5 h-5 text-[#f5df9e]" />
          ) : (
            <VolumeX className="w-5 h-5 opacity-70" />
          )}
        </div>
      </button>
    </div>
  );
};
