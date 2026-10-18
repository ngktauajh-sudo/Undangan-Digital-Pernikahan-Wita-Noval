import React from 'react';
import { Mail, Heart, Sparkles } from 'lucide-react';
import { GununganWayang, CornerOrnament, FloralDivider } from './Ornaments';
import confetti from 'canvas-confetti';

interface CoverScreenProps {
  brideName: string;
  groomName: string;
  guestName: string;
  dateStr: string;
  isOpen: boolean;
  onOpenInvitation: () => void;
}

export const CoverScreen: React.FC<CoverScreenProps> = ({
  brideName,
  groomName,
  guestName,
  dateStr,
  isOpen,
  onOpenInvitation,
}) => {
  const handleOpen = () => {
    // Trigger festive gold and rose confetti burst
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#d4af37', '#fceec5', '#8a482c', '#ffffff'],
      });
    } catch {
      // ignore if confetti fails
    }
    onOpenInvitation();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-1000 ease-in-out ${
        isOpen
          ? '-translate-y-full opacity-0 pointer-events-none'
          : 'translate-y-0 opacity-100 pointer-events-auto'
      }`}
      style={{
        background: 'radial-gradient(ellipse at center, #261b13 0%, #17100b 60%, #0d0906 100%)',
      }}
    >
      {/* Background Batik Patterns */}
      <div className="absolute inset-0 bg-batik-subtle opacity-40 pointer-events-none" />

      {/* Subtle Glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#d4af37]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#8a482c]/15 blur-3xl pointer-events-none" />

      {/* Ornate Frame Card */}
      <div className="relative w-full max-w-md sm:max-w-lg rounded-3xl border border-[#d4af37]/40 bg-[#1c140df0] p-6 sm:p-10 text-center shadow-2xl backdrop-blur-md gold-glow overflow-hidden">
        {/* Corner Ornaments */}
        <CornerOrnament position="top-left" className="top-2 left-2 w-12 h-12 text-[#d4af37]/70" />
        <CornerOrnament position="top-right" className="top-2 right-2 w-12 h-12 text-[#d4af37]/70" />
        <CornerOrnament position="bottom-left" className="bottom-2 left-2 w-12 h-12 text-[#d4af37]/70" />
        <CornerOrnament position="bottom-right" className="bottom-2 right-2 w-12 h-12 text-[#d4af37]/70" />

        {/* Gunungan Motif */}
        <div className="flex justify-center mb-2">
          <div className="relative p-2 animate-pulse-gentle">
            <GununganWayang size={95} className="text-[#d4af37] filter drop-shadow-[0_4px_12px_rgba(212,175,55,0.3)]" />
          </div>
        </div>

        {/* Subtitle */}
        <p className="font-cinzel text-xs sm:text-sm tracking-[0.3em] uppercase text-[#eedbb4]/80 mb-2">
          The Wedding of
        </p>

        {/* Names */}
        <h1 className="font-cormorant text-4xl sm:text-5xl font-bold gold-text-gradient tracking-wide mb-1 leading-tight">
          {brideName} &amp; {groomName}
        </h1>

        <FloralDivider className="my-3 opacity-80" />

        <p className="font-serif italic text-sm text-[#f5df9e]/90 mb-5">
          {dateStr}
        </p>

        {/* Guest Greeting Card */}
        <div className="mx-auto max-w-xs rounded-2xl border border-[#d4af37]/30 bg-[#271c13]/80 p-4 mb-6 shadow-inner">
          <p className="text-xs text-[#eedbb4]/70 mb-1">Kepada Yth. Bapak/Ibu/Saudara/i:</p>
          <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#f7e3a1] tracking-wide mb-1 break-words">
            {guestName}
          </h2>
          <p className="text-[11px] leading-relaxed text-[#eedbb4]/60 italic">
            *Mohon maaf bila ada kesalahan penulisan nama/gelar
          </p>
        </div>

        {/* Open Invitation Button */}
        <div className="flex flex-col items-center">
          <button
            onClick={handleOpen}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#b58c30] via-[#e2be5c] to-[#9e7424] text-[#181008] font-semibold text-sm tracking-wider uppercase shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] active:scale-95 cursor-pointer"
          >
            <Mail className="w-4 h-4 transition-transform group-hover:scale-110" />
            <span>Buka Undangan</span>
            <Sparkles className="w-4 h-4 transition-transform group-hover:rotate-45" />
          </button>
          <span className="mt-3 text-[11px] text-[#eedbb4]/50 tracking-wider">
            Sentuh tombol untuk membuka
          </span>
        </div>
      </div>
    </div>
  );
};
