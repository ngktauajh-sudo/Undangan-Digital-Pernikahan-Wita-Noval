import React, { useState } from 'react';
import { X, Copy, Check, Share2, MessageCircle } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  brideName: string;
  groomName: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  brideName,
  groomName,
}) => {
  const [guestName, setGuestName] = useState('Merta Silviana');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentOrigin = window.location.origin + window.location.pathname;
  const invitationLink = `${currentOrigin}?to=${encodeURIComponent(guestName.trim() || 'Tamu Undangan')}`;

  const whatsappMessage = `Kepada Yth. Bapak/Ibu/Saudara/i ${guestName.trim() || 'Tamu Undangan'},

Tanpa mengurangi rasa hormat, perkenankan kami mengundang Anda untuk menghadiri acara pernikahan kami:

*${brideName} & ${groomName}*

Berikut tautan undangan pernikahan kami untuk informasi lengkap acara:
${invitationLink}

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Anda berkenan hadir dan memberikan doa restu.

Terima kasih.`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(invitationLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareWhatsApp = () => {
    const waUrl = `https://wa.me/?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-2xl bg-[#1e140d] border border-[#d4af37]/60 p-6 shadow-2xl text-left text-[#eedbb4]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4 border-b border-[#d4af37]/25 pb-3">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-[#d4af37]" />
            <h3 className="font-cormorant text-xl font-bold text-[#f7e3a1]">
              Bagikan Undangan Digital
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-white/70 hover:text-white"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs">
          <div>
            <label className="block text-[#eedbb4]/80 mb-1.5 font-medium">
              Nama Tamu yang Diundang:
            </label>
            <input
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="Contoh: Merta Silviana"
              className="w-full px-3 py-2 rounded-xl bg-[#160f09] border border-[#d4af37]/40 text-sm text-[#f5df9e] focus:outline-none focus:border-[#d4af37]"
            />
            <p className="text-[11px] text-[#eedbb4]/60 mt-1">
              Nama ini akan muncul otomatis di sampul dan formulir RSVP undangan.
            </p>
          </div>

          <div>
            <label className="block text-[#eedbb4]/80 mb-1 font-medium">
              Link Khusus Tamu:
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={invitationLink}
                className="w-full px-3 py-2 rounded-xl bg-[#160f09] border border-[#d4af37]/25 text-xs text-[#eedbb4]/80 truncate select-all"
              />
              <button
                onClick={handleCopyLink}
                className="px-3 py-2 rounded-xl bg-[#2e1f14] hover:bg-[#3d2a1b] text-[#f5df9e] border border-[#d4af37]/40 text-xs font-semibold shrink-0 cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-[#d4af37]" />}
              </button>
            </div>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={handleShareWhatsApp}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs tracking-wider uppercase shadow-md transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Bagikan Langsung ke WhatsApp</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#2e1f14] hover:bg-[#3d2a1b] border border-[#d4af37]/40 text-[#f5df9e] font-semibold text-xs tracking-wider uppercase transition-colors cursor-pointer"
            >
              {copied ? 'Link Tersalin!' : 'Salin Tautan Undangan'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
