import React, { useState } from 'react';
import { Send, Heart, CheckCircle2, XCircle, HelpCircle, Users, MessageSquareHeart, ShieldCheck, Phone } from 'lucide-react';
import { CornerOrnament, FloralDivider } from './Ornaments';
import { validateRsvpInput, getWishesStats } from '../utils/invitation';
import type { GuestWish } from '../types/wedding';

interface RsvpSectionProps {
  initialGuestName: string;
  wishes: GuestWish[];
  ownerEmail: string;
  onSubmitWish: (newWish: { name: string; phone?: string; status: 'hadir' | 'tidak' | 'ragu'; guestCount: number; message: string }) => void;
  onLikeWish: (wishId: string) => void;
  onOpenAdmin: () => void;
}

export const RsvpSection: React.FC<RsvpSectionProps> = ({
  initialGuestName,
  wishes,
  ownerEmail,
  onSubmitWish,
  onLikeWish,
  onOpenAdmin,
}) => {
  const [name, setName] = useState(initialGuestName);
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<'hadir' | 'tidak' | 'ragu'>('hadir');
  const [guestCount, setGuestCount] = useState<number>(2);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState(false);

  const stats = getWishesStats(wishes);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const validation = validateRsvpInput({
      name,
      status,
      guestCount,
      message,
    });

    if (!validation.isValid) {
      setErrorMessage(validation.errorMessage || 'Mohon lengkapi formulir dengan benar.');
      return;
    }

    onSubmitWish({
      name,
      phone: phone.trim() || undefined,
      status,
      guestCount,
      message,
    });

    setMessage('');
    setPhone('');
    setSuccessToast(true);
    setTimeout(() => {
      setSuccessToast(false);
    }, 5000);
  };

  return (
    <section id="ucapan" className="relative py-20 px-4 text-center overflow-hidden">
      <div className="absolute inset-0 bg-batik-subtle opacity-35 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="flex justify-center mb-2">
          <MessageSquareHeart className="w-8 h-8 text-[#d4af37]" />
        </div>
        <p className="font-cinzel text-xs uppercase tracking-[0.3em] text-[#d4af37] mb-2">
          Konfirmasi Kehadiran &amp; Doa Restu
        </p>
        <h2 className="font-cormorant text-4xl sm:text-5xl font-bold gold-text-gradient mb-3">
          RSVP &amp; Buku Tamu
        </h2>
        <p className="font-serif italic text-sm sm:text-base text-[#eedbb4]/85 max-w-lg mx-auto mb-10">
          Kehadiran dan doa restu panjenengan sedaya dados kanugrahan ingkang tanpa upami kagem lembaran enggal gesang kawula kekalih.
        </p>

        {/* RSVP Form Card */}
        <div className="relative rounded-3xl bg-[#20160f]/95 border border-[#d4af37]/40 p-6 sm:p-8 text-left shadow-2xl backdrop-blur-sm gold-glow-sm max-w-2xl mx-auto mb-16">
          <CornerOrnament position="top-left" className="top-2 left-2 w-7 h-7 text-[#d4af37]/40" />
          <CornerOrnament position="bottom-right" className="bottom-2 right-2 w-7 h-7 text-[#d4af37]/40" />

          <div className="flex items-center justify-between mb-6">
            <h3 className="font-cormorant text-2xl font-bold text-[#f7e3a1]">
              Formulir Konfirmasi Kehadiran
            </h3>

            {/* Admin Host Shortcut */}
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2a1e15] hover:bg-[#382619] border border-[#d4af37]/40 text-[#f5df9e] text-xs font-medium cursor-pointer transition-colors"
              title="Buka Rekap RSVP & Buku Tamu (Admin Tuan Rumah)"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
              <span className="hidden sm:inline">Rekap Buku Tamu</span>
              <span className="sm:hidden">Admin</span>
            </button>
          </div>

          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-red-900/40 border border-red-500/50 text-red-200 text-xs">
              {errorMessage}
            </div>
          )}

          {successToast && (
            <div className="mb-5 p-4 rounded-xl bg-emerald-900/50 border border-emerald-500/60 text-emerald-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-lg">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Matur nuwun! Konfirmasi kehadiran dan doa restu Anda telah tercatat dalam buku tamu.</span>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Guest Name */}
            <div>
              <label htmlFor="rsvp-name" className="block text-xs font-medium text-[#eedbb4] uppercase tracking-wider mb-1.5">
                Nama Lengkap / Tamu Undangan
              </label>
              <input
                id="rsvp-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Merta Silviana"
                className="w-full px-4 py-2.5 rounded-xl bg-[#160f09] border border-[#d4af37]/35 text-[#f5df9e] placeholder-[#8a7657] text-sm focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]"
                required
              />
            </div>

            {/* WhatsApp / Phone (Optional) */}
            <div>
              <label htmlFor="rsvp-phone" className="block text-xs font-medium text-[#eedbb4] uppercase tracking-wider mb-1.5">
                Nomor WhatsApp / Kontak (Opsional)
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-[#8a7657] absolute left-3.5 top-3" />
                <input
                  id="rsvp-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Contoh: 081234567890"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#160f09] border border-[#d4af37]/35 text-[#f5df9e] placeholder-[#8a7657] text-sm focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>

            {/* Attendance Radios */}
            <div>
              <label className="block text-xs font-medium text-[#eedbb4] uppercase tracking-wider mb-2">
                Konfirmasi Kehadiran
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setStatus('hadir')}
                  className={`flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl border text-xs font-medium transition-all duration-200 cursor-pointer ${
                    status === 'hadir'
                      ? 'bg-emerald-900/50 border-emerald-400 text-emerald-200 shadow-md ring-1 ring-emerald-400/50'
                      : 'bg-[#160f09] border-[#d4af37]/25 text-[#eedbb4]/70 hover:bg-[#22160d]'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 mb-1 text-emerald-400" />
                  <span>Akan Hadir</span>
                </button>

                <button
                  type="button"
                  onClick={() => setStatus('ragu')}
                  className={`flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl border text-xs font-medium transition-all duration-200 cursor-pointer ${
                    status === 'ragu'
                      ? 'bg-amber-900/50 border-amber-400 text-amber-200 shadow-md ring-1 ring-amber-400/50'
                      : 'bg-[#160f09] border-[#d4af37]/25 text-[#eedbb4]/70 hover:bg-[#22160d]'
                  }`}
                >
                  <HelpCircle className="w-4 h-4 mb-1 text-amber-400" />
                  <span>Masih Ragu</span>
                </button>

                <button
                  type="button"
                  onClick={() => setStatus('tidak')}
                  className={`flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-xl border text-xs font-medium transition-all duration-200 cursor-pointer ${
                    status === 'tidak'
                      ? 'bg-rose-900/50 border-rose-400 text-rose-200 shadow-md ring-1 ring-rose-400/50'
                      : 'bg-[#160f09] border-[#d4af37]/25 text-[#eedbb4]/70 hover:bg-[#22160d]'
                  }`}
                >
                  <XCircle className="w-4 h-4 mb-1 text-rose-400" />
                  <span>Tidak Hadir</span>
                </button>
              </div>
            </div>

            {/* Guest Count (if attending) */}
            {status === 'hadir' && (
              <div>
                <label htmlFor="rsvp-count" className="block text-xs font-medium text-[#eedbb4] uppercase tracking-wider mb-1.5">
                  Jumlah Tamu yang Akan Hadir
                </label>
                <div className="flex items-center gap-3">
                  <select
                    id="rsvp-count"
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="px-4 py-2.5 rounded-xl bg-[#160f09] border border-[#d4af37]/35 text-[#f5df9e] text-sm focus:outline-none focus:border-[#d4af37]"
                  >
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n} className="bg-[#1e150f] text-white">
                        {n} Orang
                      </option>
                    ))}
                  </select>
                  <span className="text-xs text-[#eedbb4]/70">
                    Maksimal 2-6 orang per rombongan keluarga
                  </span>
                </div>
              </div>
            )}

            {/* Message / Prayer */}
            <div>
              <label htmlFor="rsvp-message" className="block text-xs font-medium text-[#eedbb4] uppercase tracking-wider mb-1.5">
                Ucapan &amp; Doa Restu
              </label>
              <textarea
                id="rsvp-message"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tuliskan ucapan selamat, doa restu, atau pesan hangat Anda di sini..."
                className="w-full px-4 py-2.5 rounded-xl bg-[#160f09] border border-[#d4af37]/35 text-[#f5df9e] placeholder-[#8a7657] text-sm focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#946522] via-[#cca33b] to-[#8a5b1c] text-[#160e07] font-semibold text-sm uppercase tracking-wider shadow-lg hover:scale-[1.01] active:scale-95 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Kirim Konfirmasi &amp; Ucapan</span>
            </button>
          </form>
        </div>

        {/* Wishes Statistics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
          <div className="p-4 rounded-2xl bg-[#1f1610]/90 border border-[#d4af37]/30 text-center">
            <span className="font-cormorant text-2xl sm:text-3xl font-bold text-[#f7e3a1]">
              {stats.total}
            </span>
            <p className="text-[11px] text-[#eedbb4]/70 uppercase tracking-wider mt-0.5">Total Konfirmasi</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#1f1610]/90 border border-emerald-500/30 text-center">
            <span className="font-cormorant text-2xl sm:text-3xl font-bold text-emerald-400">
              {stats.hadir}
            </span>
            <p className="text-[11px] text-[#eedbb4]/70 uppercase tracking-wider mt-0.5">
              Hadir ({stats.totalAttendingGuests} Pax)
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#1f1610]/90 border border-amber-500/30 text-center">
            <span className="font-cormorant text-2xl sm:text-3xl font-bold text-amber-400">
              {stats.ragu}
            </span>
            <p className="text-[11px] text-[#eedbb4]/70 uppercase tracking-wider mt-0.5">Masih Ragu</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#1f1610]/90 border border-rose-500/30 text-center">
            <span className="font-cormorant text-2xl sm:text-3xl font-bold text-rose-400">
              {stats.tidak}
            </span>
            <p className="text-[11px] text-[#eedbb4]/70 uppercase tracking-wider mt-0.5">Tidak Hadir</p>
          </div>
        </div>

        {/* Wishes Stream Feed */}
        <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 text-left">
          {wishes.map((wish) => {
            const isAttending = wish.status === 'hadir';
            const isUnsure = wish.status === 'ragu';

            return (
              <div
                key={wish.id}
                className="p-5 rounded-2xl bg-[#20160f]/90 border border-[#d4af37]/30 shadow-md backdrop-blur-sm"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <h4 className="font-semibold text-sm sm:text-base text-[#f5df9e]">
                      {wish.name}
                    </h4>
                    <span className="text-[11px] text-[#eedbb4]/60">{wish.createdAt}</span>
                  </div>

                  {/* Status Badge */}
                  <span
                    className={`inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-full font-medium ${
                      isAttending
                        ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-500/40'
                        : isUnsure
                        ? 'bg-amber-900/60 text-amber-300 border border-amber-500/40'
                        : 'bg-rose-900/60 text-rose-300 border border-rose-500/40'
                    }`}
                  >
                    {isAttending ? (
                      <>
                        <CheckCircle2 className="w-3 h-3" /> Hadir ({wish.guestCount} org)
                      </>
                    ) : isUnsure ? (
                      <>
                        <HelpCircle className="w-3 h-3" /> Ragu
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3 h-3" /> Tidak Hadir
                      </>
                    )}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#eedbb4]/90 font-serif leading-relaxed mb-3">
                  &ldquo;{wish.message}&rdquo;
                </p>

                {/* Like / Heart Reaction Button */}
                <div className="flex items-center justify-between text-xs text-[#eedbb4]/60">
                  <span className="text-[11px]">Doa restu tersimpan di buku tamu</span>
                  <button
                    onClick={() => onLikeWish(wish.id)}
                    className="inline-flex items-center gap-1.5 text-xs text-[#d4af37] hover:text-[#f7e3a1] transition-transform active:scale-125 cursor-pointer"
                  >
                    <Heart className="w-3.5 h-3.5 fill-[#d4af37]/30" />
                    <span>{wish.likes} Suka</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
