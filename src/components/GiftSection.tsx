import React, { useState } from 'react';
import { Gift, Copy, Check, MapPin, Send } from 'lucide-react';
import { CornerOrnament, FloralDivider } from './Ornaments';
import type { BankAccount, PhysicalGiftAddress } from '../types/wedding';

interface GiftSectionProps {
  bankAccounts: BankAccount[];
  physicalGift: PhysicalGiftAddress;
}

export const GiftSection: React.FC<GiftSectionProps> = ({ bankAccounts, physicalGift }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2500);
  };

  return (
    <section id="amplop" className="relative py-20 px-4 text-center overflow-hidden">
      <div className="absolute inset-0 bg-batik-card opacity-30 pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="flex justify-center mb-2">
          <Gift className="w-8 h-8 text-[#d4af37]" />
        </div>
        <p className="font-cinzel text-xs uppercase tracking-[0.3em] text-[#d4af37] mb-2">
          Tanda Kasih
        </p>
        <h2 className="font-cormorant text-4xl sm:text-5xl font-bold gold-text-gradient mb-3">
          Amplop Digital &amp; Kado
        </h2>
        <p className="font-serif italic text-sm sm:text-base text-[#eedbb4]/85 max-w-lg mx-auto mb-10">
          Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika memberi adalah ungkapan tanda kasih, Anda dapat memberi kado cashless melalui transfer bank di bawah ini:
        </p>

        {/* Bank Account Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10 text-left">
          {bankAccounts.map((account) => {
            const isCopied = copiedId === account.id;

            return (
              <div
                key={account.id}
                className="relative rounded-2xl bg-[#20160f]/95 border border-[#d4af37]/40 p-5 sm:p-6 shadow-xl backdrop-blur-sm gold-glow-sm flex flex-col justify-between"
              >
                <CornerOrnament position="top-right" className="top-2 right-2 w-6 h-6 text-[#d4af37]/30" />

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-sm tracking-wider uppercase text-[#f5df9e]">
                      {account.bankName}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#d4af37]/15 text-[#eedbb4] border border-[#d4af37]/30">
                      Transfer Bank
                    </span>
                  </div>

                  <p className="text-xs text-[#eedbb4]/70 mb-1">Nomor Rekening:</p>
                  <p className="font-mono text-lg sm:text-xl font-bold tracking-wider text-white mb-2">
                    {account.accountNumber}
                  </p>
                  <p className="text-xs text-[#eedbb4]/80">
                    a.n <span className="font-semibold text-[#f5df9e]">{account.accountHolder}</span>
                  </p>
                </div>

                <div className="mt-5">
                  <button
                    onClick={() => handleCopy(account.accountNumber.replace(/\D/g, '') || account.accountNumber, account.id)}
                    className={`w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                      isCopied
                        ? 'bg-emerald-700 text-white shadow-lg'
                        : 'bg-[#2e1f14] hover:bg-[#3d2a1b] text-[#f5df9e] border border-[#d4af37]/40 hover:scale-[1.01]'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-4 h-4 text-white" />
                        <span>No. Rekening Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#d4af37]" />
                        <span>Salin No. Rekening</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Physical Gift Section */}
        <div className="rounded-2xl bg-[#20160f]/95 border border-[#d4af37]/40 p-6 text-left shadow-xl gold-glow-sm">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-5 h-5 text-[#d4af37]" />
            <h3 className="font-cormorant text-2xl font-bold text-[#f7e3a1]">
              Kirim Kado Fisik
            </h3>
          </div>
          <p className="text-xs text-[#eedbb4]/80 mb-4">
            Bagi yang ingin mengirimkan kado berupa bingkisan atau paket tanda kasih, dapat dikirimkan ke alamat kedua mempelai:
          </p>
          <div className="bg-[#170f0a] p-4 rounded-xl border border-[#d4af37]/25 mb-4">
            <p className="font-semibold text-sm text-[#f5df9e] mb-1">
              Penerima: {physicalGift.recipientName}
            </p>
            <p className="text-xs text-[#eedbb4]/90 mb-1">
              No. Handphone: <span className="font-mono font-semibold text-[#f5df9e]">{physicalGift.phone}</span>
            </p>
            <p className="text-xs text-[#eedbb4]/90 leading-relaxed mb-1">
              Alamat: {physicalGift.fullAddress}
            </p>
            <p className="text-xs text-[#eedbb4]/75">
              Kode Pos: {physicalGift.postalCode}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() =>
                handleCopy(
                  `${physicalGift.recipientName} (${physicalGift.phone}) - ${physicalGift.fullAddress}, Kode Pos ${physicalGift.postalCode}`,
                  'address'
                )
              }
              className={`inline-flex items-center gap-2 py-2 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                copiedId === 'address'
                  ? 'bg-emerald-700 text-white shadow'
                  : 'bg-[#2e1f14] hover:bg-[#3d2a1b] text-[#f5df9e] border border-[#d4af37]/40'
              }`}
            >
              {copiedId === 'address' ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Alamat Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Salin Alamat Lengkap</span>
                </>
              )}
            </button>

            <a
              href={`https://wa.me/${physicalGift.phone.replace(/\D/g, '').replace(/^0/, '62')}?text=${encodeURIComponent(
                `Halo ${physicalGift.recipientName}, saya ingin mengonfirmasi pengiriman tanda kasih / kado pernikahan untuk pernikahan Selasa 17 November 2026.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 py-2 px-4 rounded-xl bg-[#2e1f14] hover:bg-[#3d2a1b] text-[#eedbb4] border border-[#d4af37]/40 text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              <Send className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Konfirmasi via WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
