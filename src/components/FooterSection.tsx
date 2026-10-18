import React from 'react';
import { ArrowUp, Share2, ShieldCheck, Heart } from 'lucide-react';

interface FooterSectionProps {
  onBackToTop: () => void;
  onOpenShareModal: () => void;
  onOpenEditor: () => void;
  onOpenAdmin: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  onBackToTop,
  onOpenShareModal,
  onOpenEditor,
  onOpenAdmin,
}) => {
  return (
    <footer className="relative pt-12 pb-24 px-4 text-center border-t border-[#d4af37]/20 bg-[#120b07] text-[#eedbb4]/80 text-xs">
      <div className="max-w-xl mx-auto flex flex-col items-center">
        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <button
            onClick={onBackToTop}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#20150e] hover:bg-[#2e1f14] border border-[#d4af37]/40 text-[#f5df9e] text-xs transition-transform hover:scale-105 cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Kembali ke Atas</span>
          </button>

          <button
            onClick={onOpenShareModal}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#20150e] hover:bg-[#2e1f14] border border-[#d4af37]/40 text-[#f5df9e] text-xs transition-transform hover:scale-105 cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Bagikan Undangan</span>
          </button>

          <button
            onClick={onOpenEditor}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#d4af37]/20 hover:bg-[#d4af37] text-[#f5df9e] hover:text-[#181109] border border-[#d4af37] text-xs font-semibold transition-transform hover:scale-105 cursor-pointer"
          >
            <span>Edit Foto &amp; Undangan</span>
          </button>

          <button
            onClick={onOpenAdmin}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2a1d13] hover:bg-[#3d2a1b] border border-[#d4af37]/40 text-[#f5df9e] text-xs font-semibold transition-transform hover:scale-105 cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Buku Tamu &amp; RSVP (Admin)</span>
          </button>
        </div>

        <p className="font-serif text-sm text-[#f5df9e] mb-1">
          The Wedding of Wita &amp; Noval
        </p>
        <p className="text-[11px] text-[#eedbb4]/60">
          Nuansa Adat Jawa Modern &bull; Desa Klaten, Kec. Gading Rejo, Kab. Pringsewu, Lampung &bull; 2026
        </p>
      </div>
    </footer>
  );
};
