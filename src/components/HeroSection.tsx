import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { GununganWayang, FloralDivider } from './Ornaments';
import { calculateCountdown, CountdownResult } from '../utils/invitation';
import type { WeddingData } from '../types/wedding';

interface HeroSectionProps {
  weddingData: WeddingData;
  onOpenCalendar: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ weddingData, onOpenCalendar }) => {
  const [countdown, setCountdown] = useState<CountdownResult>(() =>
    calculateCountdown(weddingData.countdownTarget)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(calculateCountdown(weddingData.countdownTarget));
    }, 1000);
    return () => clearInterval(timer);
  }, [weddingData.countdownTarget]);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-28 px-4 text-center overflow-hidden">
      {/* Background Batik & Atmosphere */}
      <div className="absolute inset-0 bg-batik-subtle opacity-50 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#d4af37]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
        {/* Gunungan Wayang Centerpiece */}
        <div className="mb-4">
          <GununganWayang size={110} className="text-[#d4af37] filter drop-shadow-[0_4px_16px_rgba(212,175,55,0.35)]" />
        </div>

        <p className="font-cinzel text-xs sm:text-sm tracking-[0.3em] uppercase text-[#eedbb4]/80 mb-2">
          Walimatul Ursy
        </p>

        <h1 className="font-cormorant text-5xl sm:text-6xl md:text-7xl font-bold gold-text-gradient tracking-wide mb-2">
          {weddingData.bride.shortName} &amp; {weddingData.groom.shortName}
        </h1>

        <p className="font-serif italic text-base sm:text-lg text-[#f5df9e]/90 mb-6">
          {weddingData.hashtag}
        </p>

        {/* Ayat Suci & Mukaddimah */}
        <div className="rounded-2xl border border-[#d4af37]/25 bg-[#211811]/90 p-6 sm:p-8 mb-8 shadow-xl max-w-xl mx-auto backdrop-blur-sm">
          {/* Basmalah */}
          <p className="text-2xl sm:text-3xl text-[#f7e3a1] mb-4 font-normal tracking-wide" style={{ fontFamily: "'Amiri', 'Traditional Arabic', 'Scheherazade New', serif" }} dir="rtl">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
          <p className="font-serif text-xs sm:text-sm text-[#eedbb4]/85 leading-relaxed italic mb-4">
            &ldquo;Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berpikir.&rdquo;
          </p>
          <p className="text-xs font-semibold tracking-wider text-[#d4af37] uppercase">
            — QS. Ar-Rum : 21 —
          </p>
        </div>

        <FloralDivider className="my-2" />

        {/* Date & Location Highlight */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm text-[#eedbb4] mb-8">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#271d15] border border-[#d4af37]/30">
            <Calendar className="w-4 h-4 text-[#d4af37]" />
            <span>{weddingData.events.akad.dateStr}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#271d15] border border-[#d4af37]/30">
            <MapPin className="w-4 h-4 text-[#d4af37]" />
            <span>{weddingData.venueLocationSummary || 'Desa Klaten, Pringsewu, Lampung'}</span>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="w-full max-w-md mb-8">
          <p className="text-xs font-cinzel uppercase tracking-[0.2em] text-[#d4af37] mb-3">
            Menghitung Hari Menuju Hari Bahagia
          </p>
          <div className="grid grid-cols-4 gap-2 sm:gap-4">
            {[
              { label: 'Hari', value: countdown.days },
              { label: 'Jam', value: countdown.hours },
              { label: 'Menit', value: countdown.minutes },
              { label: 'Detik', value: countdown.seconds },
            ].map((unit, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-gradient-to-b from-[#2a1e14] to-[#1c130d] border border-[#d4af37]/40 shadow-lg gold-glow-sm"
              >
                <span className="font-cormorant text-2xl sm:text-3xl font-bold gold-text-gradient">
                  {String(unit.value).padStart(2, '0')}
                </span>
                <span className="text-[10px] sm:text-xs text-[#eedbb4]/70 uppercase tracking-wider mt-0.5">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Add to Calendar Button */}
        <button
          onClick={onOpenCalendar}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2c1e13] hover:bg-[#382618] border border-[#d4af37]/50 text-[#f5df9e] text-xs sm:text-sm font-medium tracking-wider uppercase transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg cursor-pointer"
        >
          <Calendar className="w-4 h-4 text-[#d4af37]" />
          <span>Simpan Tanggal ke Google Calendar</span>
        </button>
      </div>
    </section>
  );
};
