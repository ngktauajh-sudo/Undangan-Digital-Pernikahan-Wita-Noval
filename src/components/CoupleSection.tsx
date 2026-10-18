import React from 'react';
import { Camera, Heart, Sparkles } from 'lucide-react';
import { FloralDivider, CornerOrnament } from './Ornaments';
import type { CouplePerson } from '../types/wedding';

interface CoupleSectionProps {
  bride: CouplePerson;
  groom: CouplePerson;
  onEditPhoto: (role: 'bride' | 'groom') => void;
}

export const CoupleSection: React.FC<CoupleSectionProps> = ({ bride, groom, onEditPhoto }) => {
  return (
    <section id="mempelai" className="relative py-20 px-4 text-center overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-batik-card opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <p className="font-cinzel text-xs uppercase tracking-[0.3em] text-[#d4af37] mb-2">
          Penyatuan Dua Jiwa
        </p>
        <h2 className="font-cormorant text-4xl sm:text-5xl font-bold gold-text-gradient mb-3">
          Mempelai Pengantin
        </h2>
        <p className="font-serif italic text-sm sm:text-base text-[#eedbb4]/80 max-w-lg mx-auto mb-12">
          Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud melangsungkan akad pernikahan putra-putri kami tercinta:
        </p>

        {/* Couple Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Mempelai Wanita (Bride) */}
          <div className="relative flex flex-col items-center p-6 sm:p-8 rounded-3xl bg-[#1f1610]/90 border border-[#d4af37]/35 shadow-2xl backdrop-blur-sm gold-glow-sm transition-transform duration-300 hover:-translate-y-1">
            <CornerOrnament position="top-left" className="top-2 left-2 w-8 h-8 text-[#d4af37]/50" />
            <CornerOrnament position="bottom-right" className="bottom-2 right-2 w-8 h-8 text-[#d4af37]/50" />

            {/* Photo Arch Frame */}
            <div className="relative group mb-6">
              <div className="w-48 h-64 sm:w-52 sm:h-72 rounded-t-[100px] rounded-b-2xl overflow-hidden border-2 border-[#d4af37] shadow-xl relative bg-[#2a1d13]">
                <img
                  src={bride.photoUrl}
                  alt={bride.fullName}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Edit Photo Quick Button */}
              <button
                onClick={() => onEditPhoto('bride')}
                className="absolute bottom-2 right-2 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1b120c]/90 hover:bg-[#d4af37] text-[#eedbb4] hover:text-[#181008] border border-[#d4af37] text-xs font-medium shadow-lg transition-all duration-200 cursor-pointer"
                title="Ganti Foto Mempelai Wanita"
                aria-label="Ganti Foto Mempelai Wanita"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Ganti Foto</span>
              </button>
            </div>

            {/* Names & Parents */}
            <h3 className="font-cormorant text-2xl sm:text-3xl font-bold text-[#f7e3a1] mb-1">
              {bride.fullName}
            </h3>
            <p className="font-serif italic text-sm text-[#d4af37] mb-3">
              ({bride.shortName})
            </p>

            <p className="text-xs text-[#eedbb4]/70 mb-1">
              {bride.childOrderText}:
            </p>
            <p className="text-sm font-medium text-[#eedbb4] mb-4">
              {bride.fatherName} &amp; {bride.motherName}
            </p>

            {bride.bio && (
              <p className="text-xs italic text-[#eedbb4]/75 leading-relaxed max-w-xs mb-2">
                &ldquo;{bride.bio}&rdquo;
              </p>
            )}
          </div>

          {/* Mempelai Pria (Groom) */}
          <div className="relative flex flex-col items-center p-6 sm:p-8 rounded-3xl bg-[#1f1610]/90 border border-[#d4af37]/35 shadow-2xl backdrop-blur-sm gold-glow-sm transition-transform duration-300 hover:-translate-y-1">
            <CornerOrnament position="top-right" className="top-2 right-2 w-8 h-8 text-[#d4af37]/50" />
            <CornerOrnament position="bottom-left" className="bottom-2 left-2 w-8 h-8 text-[#d4af37]/50" />

            {/* Photo Arch Frame */}
            <div className="relative group mb-6">
              <div className="w-48 h-64 sm:w-52 sm:h-72 rounded-t-[100px] rounded-b-2xl overflow-hidden border-2 border-[#d4af37] shadow-xl relative bg-[#2a1d13]">
                <img
                  src={groom.photoUrl}
                  alt={groom.fullName}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Edit Photo Quick Button */}
              <button
                onClick={() => onEditPhoto('groom')}
                className="absolute bottom-2 right-2 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1b120c]/90 hover:bg-[#d4af37] text-[#eedbb4] hover:text-[#181008] border border-[#d4af37] text-xs font-medium shadow-lg transition-all duration-200 cursor-pointer"
                title="Ganti Foto Mempelai Pria"
                aria-label="Ganti Foto Mempelai Pria"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Ganti Foto</span>
              </button>
            </div>

            {/* Names & Parents */}
            <h3 className="font-cormorant text-2xl sm:text-3xl font-bold text-[#f7e3a1] mb-1">
              {groom.fullName}
            </h3>
            <p className="font-serif italic text-sm text-[#d4af37] mb-3">
              ({groom.shortName})
            </p>

            <p className="text-xs text-[#eedbb4]/70 mb-1">
              {groom.childOrderText}:
            </p>
            <p className="text-sm font-medium text-[#eedbb4] mb-4">
              {groom.fatherName} &amp; {groom.motherName}
            </p>

            {groom.bio && (
              <p className="text-xs italic text-[#eedbb4]/75 leading-relaxed max-w-xs mb-2">
                &ldquo;{groom.bio}&rdquo;
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
