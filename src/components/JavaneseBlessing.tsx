import React from 'react';
import { GununganWayang, FloralDivider } from './Ornaments';

export const JavaneseBlessing: React.FC = () => {
  return (
    <section className="relative py-16 px-4 text-center overflow-hidden">
      <div className="relative z-10 max-w-2xl mx-auto rounded-3xl border border-[#d4af37]/35 bg-[#1b130c]/90 p-8 shadow-2xl backdrop-blur-sm gold-glow-sm">
        <div className="flex justify-center mb-4">
          <GununganWayang size={70} className="text-[#d4af37]" />
        </div>

        <p className="font-cinzel text-xs uppercase tracking-[0.25em] text-[#d4af37] mb-3">
          Tembang Pangayubagya
        </p>

        <p className="font-serif italic text-base sm:text-lg text-[#f7e3a1] leading-relaxed mb-4">
          &ldquo;Mugi Gusti Kang Akarya Jagad tansah paring berkah, rahmat, saha kanugrahan dhumateng temanten kekalih, dados kulawarga ingkang sakinah, mawaddah, warahmah, rahayu kalis ing sambikala.&rdquo;
        </p>

        <FloralDivider className="my-4 opacity-75" />

        <p className="text-xs text-[#eedbb4]/70 tracking-wider">
          Kami yang berbahagia,<br />
          <strong className="text-[#f5df9e]">Kel. Bapak Poniram &amp; Ibu Purwaningsih</strong><br />
          <strong className="text-[#f5df9e]">Kel. Bapak Agus Setiono &amp; Ibu Sukaesih</strong><br />
          Beserta kedua mempelai <strong className="text-[#d4af37]">Wita Mayasari &amp; Noval Bagus Ramadhan</strong>
        </p>
      </div>
    </section>
  );
};
